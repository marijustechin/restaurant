import * as z from "zod";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { UserSchema } from "../schemas/UserSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "../store/store";
import { IUser } from "../types/User";
import UserService from "../services/UserService";
import { update } from "../store/features/user/userSlice";
import toast from "react-hot-toast";
import axios from "axios";

export const UserEditForm = () => {
  const activeUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userChangedData, setUserChangedData] = useState(false);
  const [currUser, setCurrUser] = useState<IUser>(activeUser);

  useEffect(() => {
    if (activeUser.id === "0") {
      navigate("/prisijungimas");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      first_name: currUser.first_name,
      email: currUser.email,
      address: currUser.address,
      phone_number: currUser.phone_number,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserSchema>> = async (
    formData
  ) => {
    try {
      const res = await UserService.updateUser(
        activeUser.id,
        formData.address,
        formData.phone_number,
        formData.first_name
      );

      dispatch(
        update({
          first_name: res.data.first_name,
          address: res.data.address,
          phone_number: res.data.phone_number,
        })
      );

      setCurrUser(res.data);
      setUserChangedData(false);

      toast.success("Paskyros duomenys atnaujinti sėkmingai");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data);
        return null;
      }

      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  const handleChangedData = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "first_name":
        if (activeUser.first_name !== e.target.value) {
          setUserChangedData(true);
        } else {
          setUserChangedData(false);
        }
        break;
      case "address":
        if (activeUser.address !== e.target.value) {
          setUserChangedData(true);
        } else {
          setUserChangedData(false);
        }
        break;
      case "phone_number":
        if (activeUser.phone_number !== e.target.value) {
          setUserChangedData(true);
        } else {
          setUserChangedData(false);
        }
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="border border-slate-300 px-1 rounded-lg flex flex-col gap-2">
          <legend
            className={`${
              errors.first_name ? "text-rose-500" : "text-slate-600"
            } ml-4 p-1`}
          >
            Vardas
          </legend>
          <input
            className="form-input"
            type="text"
            autoComplete="on"
            onKeyUp={(e) => handleChangedData(e)}
            {...register("first_name")}
          />
        </fieldset>
        {errors.first_name && (
          <span className="text-xs text-rose-500">
            {errors.first_name.message}
          </span>
        )}
        <fieldset className="border border-slate-300 px-1 rounded-lg flex flex-col gap-2">
          <legend
            className={`${
              errors.email ? "text-rose-500" : "text-slate-600"
            } ml-4 p-1`}
          >
            El. paštas
          </legend>
          <input
            disabled
            className="form-input"
            type="text"
            autoComplete="on"
            {...register("email")}
          />
        </fieldset>
        {errors.email && (
          <span className="text-xs text-rose-500">{errors.email.message}</span>
        )}
        <fieldset className="border border-slate-300 px-1 rounded-lg flex flex-col gap-2">
          <legend
            className={`${
              errors.address ? "text-rose-500" : "text-slate-600"
            } ml-4 p-1`}
          >
            Adresas
          </legend>
          <input
            className="form-input"
            type="text"
            autoComplete="on"
            onKeyUp={(e) => handleChangedData(e)}
            placeholder="Palaukės g. 5, Vilnius"
            {...register("address")}
          />
        </fieldset>
        {errors.address && (
          <span className="text-xs text-rose-500">
            {errors.address.message}
          </span>
        )}
        <fieldset className="border border-slate-300 px-1 rounded-lg flex flex-col gap-2">
          <legend
            className={`${
              errors.phone_number ? "text-rose-500" : "text-slate-600"
            } ml-4 p-1`}
          >
            Telefonas
          </legend>
          <input
            className="form-input"
            type="text"
            autoComplete="on"
            onKeyUp={(e) => handleChangedData(e)}
            placeholder="61234567"
            {...register("phone_number")}
          />
        </fieldset>
        {errors.phone_number && (
          <span className="text-xs text-rose-500">
            {errors.phone_number.message}
          </span>
        )}
        <div className="flex flex-col gap-2 mt-2">
          <button
            disabled={!userChangedData}
            className={`${
              !userChangedData
                ? "hover:bg-slate-300 bg-slate-300"
                : "hover:bg-slate-700 bg-slate-500"
            } text-slate-50 rounded-lg p-2`}
            type="submit"
          >
            Atnaujinti
          </button>
        </div>
      </form>
    </div>
  );
};
