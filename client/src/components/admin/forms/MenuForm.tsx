import * as z from 'zod';
import { IoMdClose } from 'react-icons/io';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MenusSchema } from '../../../schemas/MenusSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { ICategory } from '../../../types/Category';
import CategoryService from '../../../services/CategoryService';
import axios from 'axios';
import MenuService from '../../../services/MenuService';
import { IMenuItem } from '../../../types/MenuItem';

interface MenuFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (menuItem: IMenuItem) => void;
  menuItem?: IMenuItem;
}

export const MenuForm = ({
  open,
  onClose,
  onSave,
  menuItem,
}: MenuFormProps) => {
  // redagavimas ar naujas patiekalas?
  const [editMode, setEditMode] = useState(false);
  // api response klaidos
  const [apiError, setApiError] = useState('');
  // kategorijos
  const [cats, setCats] = useState<ICategory[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await CategoryService.getAllCategories();
    setCats(res.data);
    if (menuItem) setEditMode(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof MenusSchema>>({
    resolver: zodResolver(MenusSchema),
    defaultValues: {
      name: menuItem?.name || '',
      description: menuItem?.description || '',
      price: menuItem?.price || undefined,
      image: menuItem?.image || '',
      category_id: menuItem?.category_id || undefined,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof MenusSchema>> = async (
    formData
  ) => {
    if (menuItem?.id === undefined) {
      //sukuriam nauja
      try {
        const res = await MenuService.createMenu(
          formData.name,
          formData.description,
          formData.image,
          formData.category_id,
          formData.price
        );
        reset();
        onSave(res.data);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setApiError(e.response?.data.message);
          return;
        }

        if (e instanceof Error) setApiError(e.message);
      }
    } else {
      // redaguojam
      try {
        const res = await MenuService.updateMenuItem(
          menuItem.id,
          formData.name,
          formData.description,
          formData.image,
          formData.category_id,
          formData.price
        );
        reset();
        onSave(res.data);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setApiError(e.response?.data.message);
          return;
        }

        if (e instanceof Error) setApiError(e.message);
      }
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    console.log(e.target.value);
  };

  return (
    /** overlejus */
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? 'visible bg-slate-800/50' : 'invisible'
      }`}
      onClick={() => {}}
    >
      {/* langas */}
      <div
        // reikia sustabdyti is tevo
        // paveldeta onclik funkcija
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-100 rounded-xl shadow p-6 transition-all text-lg w-[50rem] ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-200 hover:text-slate-600"
        >
          <IoMdClose />
        </button>
        <h1 className="text-center text-2xl font-semibold">
          {editMode ? 'Patiekalo redagavimas' : 'Naujas patiekalas'}
        </h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="h-10">
            <p className="text-sm text-center text-rose-500">{apiError}</p>
          </div>

          {/* Pavadinimas */}
          <fieldset className="border border-slate-300 px-1 rounded-lg flex flex-col gap-2 bg-white">
            {errors.name && (
              <span className="text-xs text-rose-500">
                {errors.name.message}
              </span>
            )}
            <legend className="ml-4 p-1 bg-white text-sm rounded-md">
              Patiekalo pavadinimas
            </legend>
            <input
              className="focus:outline-none"
              type="text"
              autoComplete="on"
              {...register('name')}
            />
          </fieldset>
          {errors.description && (
            <span className="text-xs text-rose-500">
              {errors.description.message}
            </span>
          )}
          {/* Aprasymas */}
          <fieldset className="border border-slate-300 p-1 rounded-lg flex flex-col gap-2 bg-white">
            <legend className="ml-4 p-1 bg-white text-sm rounded-md">
              Patiekalo aprašymas
            </legend>
            <textarea
              className="focus:outline-none"
              {...register('description')}
            />
          </fieldset>
          <div className="flex gap-3">
            {errors.price && (
              <span className="text-xs text-rose-500">
                {errors.price.message}
              </span>
            )}
            {/* Kaina */}
            <fieldset className="border border-slate-300 p-1 rounded-lg">
              <legend className="ml-4 p-1 bg-white text-sm rounded-md">
                Kaina
              </legend>
              <input
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                autoComplete="off"
                {...register('price')}
              />
            </fieldset>
            {errors.category_id && (
              <span className="text-xs text-rose-500">
                {errors.category_id.message}
              </span>
            )}
            {/* Kategorija *********************************************** */}
            <fieldset className="border border-slate-300 bg-white p-1 rounded-lg">
              <legend className="ml-4 p-1 bg-white text-sm rounded-md">
                Kategorija
              </legend>
              <select
                className="border border-slate-400 w-full p-2 rounded-lg"
                id="category_id"
                value={menuItem?.category_id}
                {...register('category_id', {
                  required: 'Prašome pasirinkti kategoriją',
                })}
                onChange={(e) => setValue('category_id', +e.target.value)}
              >
                <option className="bg-rose-500" value={''}>
                  --pasirinkite kategoriją--
                </option>
                {cats.map((cat) => (
                  <option key={cat.category_name} value={cat.id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>

          {/* Nuotrauka **************************************/}
          <fieldset className="border border-slate-300 px-1 rounded-lg flex flex-col gap-2 bg-white">
            {errors.image && (
              <span className="text-xs text-rose-500">
                {errors.image.message}
              </span>
            )}
            <legend className="ml-4 p-1 bg-white text-sm rounded-md">
              Nuotrauka
            </legend>
            <input
              className="focus:outline-none"
              type="text"
              autoComplete="off"
              {...register('image')}
            />
          </fieldset>

          <div className="flex gap-2 mt-2">
            <button
              className="border border-emerald-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
              type="submit"
            >
              {editMode ? 'Atnaujinti patiekalą' : 'Išsaugoti patiekalą'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-rose-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
            >
              Atsisakyti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
