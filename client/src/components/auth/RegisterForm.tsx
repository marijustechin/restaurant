import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { RegisterSchema } from '../../schemas/RegisterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { AuthContext } from '../../App';

export const RegisterForm = () => {
  const { store } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (
    formData
  ) => {
    const validatedFields = RegisterSchema.safeParse(formData);

    if (!validatedFields.success) {
      setError('Neteisingi formos laukai');
      return;
    }

    const { first_name, email, password } = validatedFields.data;

    store.registration(first_name, email, password);

    if (store.isAuth) navigate('/prisijungimas');
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto"
    >
      <div className="h-10">
        <p className="text-sm text-center text-rose-500">{error}</p>
      </div>
      {errors.first_name && (
        <span className="text-xs text-rose-500">
          {errors.first_name.message}
        </span>
      )}
      <fieldset className="border border-slate-300 px-1 rounded-lg flex flex-col gap-2">
        <legend
          className={`${
            errors.first_name ? 'text-rose-500' : 'text-slate-600'
          } ml-4 p-1`}
        >
          Vardas
        </legend>
        <input
          className="form-input"
          type="text"
          autoComplete="on"
          {...register('first_name')}
        />
      </fieldset>
      {errors.email && (
        <span className="text-xs text-rose-500">{errors.email.message}</span>
      )}
      <fieldset className="border border-slate-300 p-1 rounded-lg flex flex-col gap-2">
        <legend
          className={`${
            errors.email ? 'text-rose-500' : 'text-slate-600'
          } ml-4 p-1`}
        >
          El. paštas
        </legend>
        <input
          className="form-input"
          type="email"
          autoComplete="on"
          {...register('email')}
        />
      </fieldset>
      {errors.password && (
        <span className="text-xs text-rose-500">{errors.password.message}</span>
      )}
      <fieldset className="border border-slate-300 p-1 rounded-lg">
        <legend
          className={`${
            errors.password ? 'text-rose-500' : 'text-slate-600'
          } ml-4 p-1`}
        >
          Slaptažodis
        </legend>
        <input
          className="form-input"
          type="password"
          autoComplete="off"
          {...register('password')}
        />
      </fieldset>
      <div className="flex flex-col gap-2 mt-2">
        <button
          className="btn-generic bg-slate-500 text-slate-50 rounded-lg p-2 hover:bg-slate-700"
          type="submit"
        >
          Užsiregistruoti
        </button>
        <p>
          Ne pirmas kartas?{' '}
          <Link
            className="text-slate-700 underline underline-offset-8"
            to={'/prisijungimas'}
          >
            Prašome prisijungti
          </Link>
        </p>
      </div>
    </form>
  );
};
