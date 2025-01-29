import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas/LoginSchema";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { apiUserLogin } from "../../api/users";
import { login } from "../../store/features/user/userSlice";
import { useDispatch } from "react-redux";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    formData
  ) => {
    const res = await apiUserLogin(formData);
    if (res.error) {
      setError(res.error);
    } else {
      dispatch(login({ id: res.user.id, role: "USER" }));
      navigate("/pirkejo-paskyra");
    }
  };

  return (
    <form
      className="max-w-sm mx-auto"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="h-10">
        <p className="text-sm text-center text-rose-500">{error}</p>
      </div>
      {errors.email && (
        <span className="text-xs text-rose-500">{errors.email.message}</span>
      )}
      <fieldset className="border border-slate-300 p-1 rounded-lg flex flex-col gap-2">
        <legend
          className={`${
            errors.email ? "text-rose-500" : "text-slate-600"
          } ml-4 p-1`}
        >
          El. paštas
        </legend>
        <input
          className="form-input"
          type="email"
          autoComplete="on"
          {...register("email")}
        />
      </fieldset>
      {errors.password && (
        <span className="text-xs text-rose-500">{errors.password.message}</span>
      )}
      <fieldset className="border border-slate-300 p-1 rounded-lg">
        <legend
          className={`${
            errors.password ? "text-rose-500" : "text-slate-600"
          } ml-4 p-1`}
        >
          Slaptažodis
        </legend>
        <input
          className="form-input"
          type="password"
          autoComplete="off"
          {...register("password")}
        />
      </fieldset>
      <div className="flex flex-col gap-2 mt-2">
        <button
          className="btn-generic bg-slate-500 text-slate-50 rounded-lg p-2 hover:bg-slate-700"
          type="submit"
        >
          Prisijungti
        </button>
        <p>
          Pirmas kartas?{" "}
          <Link
            className="text-slate-700 underline underline-offset-8"
            to={"/registracija"}
          >
            Prašome užsiregistruoti
          </Link>
        </p>
      </div>
    </form>
  );
};
