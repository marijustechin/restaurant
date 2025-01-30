import * as z from 'zod';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserSchema } from '../schemas/UserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

export const UserProfilePage = () => {
  const activeUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [userChangedData, setUserChangedData] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      first_name: activeUser.first_name,
      email: activeUser.email,
      address: activeUser.address,
      phone_number: activeUser.phone_number,
    },
  });

  useEffect(() => {
    if (activeUser.id === '0') navigate('/prisijungimas');
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserSchema>> = async (
    formData
  ) => {
    toast.success(formData.first_name);
  };

  const handleChangedData = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'first_name':
        if (activeUser.first_name !== e.target.value) {
          setUserChangedData(true);
        } else {
          setUserChangedData(false);
        }
        break;
      case 'address':
        if (activeUser.address !== e.target.value) {
          setUserChangedData(true);
        } else {
          setUserChangedData(false);
        }
        break;
      case 'phone_number':
        if (activeUser.phone_number !== e.target.value) {
          setUserChangedData(true);
        } else {
          setUserChangedData(false);
        }
        break;
    }
  };

  return (
    <main className="max-w-md mx-auto">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            onKeyUp={(e) => handleChangedData(e)}
            {...register('first_name')}
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
              errors.email ? 'text-rose-500' : 'text-slate-600'
            } ml-4 p-1`}
          >
            El. paštas
          </legend>
          <input
            disabled
            className="form-input"
            type="text"
            autoComplete="on"
            {...register('email')}
          />
        </fieldset>
        {errors.email && (
          <span className="text-xs text-rose-500">{errors.email.message}</span>
        )}
        <fieldset className="border border-slate-300 px-1 rounded-lg flex flex-col gap-2">
          <legend
            className={`${
              errors.address ? 'text-rose-500' : 'text-slate-600'
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
            {...register('address')}
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
              errors.phone_number ? 'text-rose-500' : 'text-slate-600'
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
            {...register('phone_number')}
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
                ? 'hover:bg-slate-300 bg-slate-300'
                : 'hover:bg-slate-700 bg-slate-500'
            } text-slate-50 rounded-lg p-2`}
            type="submit"
          >
            Atnaujinti
          </button>
        </div>
      </form>
    </main>
  );
};
