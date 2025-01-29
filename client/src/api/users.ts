import * as z from "zod";
import { RegisterSchema } from "../schemas/RegisterSchema";
import axios from "axios";
import { LoginSchema } from "../schemas/LoginSchema";
import { API_URL } from ".";

const USERS_API = `${API_URL}/users`;

// interface IApiError {
//   error: string;
// }

export const apiRegisterUser = async (
  formValues: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(formValues);

  if (!validatedFields.success) return { error: "Neteisingi formos laukai" };

  try {
    await axios.post(USERS_API, formValues);
    return { success: "registracija sekminga" };
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return { error: e.response?.data.message };
    }
    return { error: "Įvyko nenumatyta klaida" };
  }
};

export const apiUserLogin = async (formValues: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(formValues);

  if (!validatedFields.success) return { error: "Neteisingi formos laukai" };

  try {
    const res = await axios.post(`${USERS_API}/login`, formValues);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return { error: e.response?.data.message };
    }
    return { error: "Įvyko nenumatyta klaida" };
  }
};

export const apiGetAllUsers = async () => {
  try {
    const res = await axios.get(USERS_API);
    return res.data;
  } catch (e: unknown) {
    return { error: e };
  }
};

export const apiDeleteUser = async (id: string) => {
  try {
    return await axios.delete(`${USERS_API}/${id}`);
  } catch (e: unknown) {
    return { error: e };
  }
};
