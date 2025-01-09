import * as z from 'zod';
import { RegisterSchema } from '../schemas/RegisterSchema';
import axios, { AxiosResponse } from 'axios';

const USERS_API = 'http://localhost:3003/api/v1/users';

export const apiRegisterUser = async (
  formValues: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(formValues);

  if (!validatedFields.success) return { error: 'Neteisingi formos laukai' };

  try {
    const res: AxiosResponse = await axios.post(USERS_API, formValues);
  } catch (e) {
    console.log(e);
  }
};
