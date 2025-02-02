import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import CategoryService from '../../../services/CategoryService';
import MenuService from '../../../services/MenuService';

interface FormInputs {
  menuItemCount: number;
}

interface MenuItemsGeneratorFormProps {
  onWorking: (creatingMenus: boolean) => void;
}

export const MenuItemsGeneratorForm = ({
  onWorking,
}: MenuItemsGeneratorFormProps) => {
  // generavimo klaidos
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      menuItemCount: 1000,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    onWorking(true);
    let catsIds: number[] = [];

    // 1. gaunam kategoriju masyva
    const cats = await CategoryService.getAllCategories();

    for (const cat of cats.data) {
      catsIds.push(+cat.id);
    }

    // tikrinam ar yra reikalingos kategorijos
    // Pagrindiniai patiekalai, Desertai, Užkandžiai
    if (
      !cats.data.some((el) => el.category_name === 'Pagrindiniai patiekalai')
    ) {
      const catId = await CategoryService.addCategory(
        'Pagrindiniai patiekalai'
      );
      catsIds.push(+catId.data.id);
    }

    if (!cats.data.some((el) => el.category_name === 'Desertai')) {
      const catId = await CategoryService.addCategory('Desertai');
      catsIds.push(+catId.data.id);
    }
    if (!cats.data.some((el) => el.category_name === 'Užkandžiai')) {
      const catId = await CategoryService.addCategory('Užkandžiai');
      catsIds.push(+catId.data.id);
    }

    // generuojam patiekalus
    // random nuotauka API be registracijos
    const image = 'https://picsum.photos/500/400';
    for (let i = 0; i <= formData.menuItemCount; i++) {
      const randomNames = uuidv4().split('-');
      const name = 'Patiekalas ' + randomNames[0];
      const description =
        'Patieklo aprašymas ' +
        randomNames[0] +
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum, diam sed accumsan tincidunt, nisl ante sodales justo, non tincidunt elit est sed ex. Quisque consectetur tincidunt elit vehicula aliquet.';
      const category_id = catsIds[Math.floor(Math.random() * 4)];
      const price = Math.round((Math.random() * (18 - 3 + 1) + 3) * 100) / 100;

      try {
        const resMenuItem = await MenuService.createMenu(
          name,
          description,
          image,
          category_id,
          price
        );
        console.log(resMenuItem.data);
      } catch (e: unknown) {
        console.log(e);
      }
    }

    onWorking(false);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      {errors.menuItemCount ? (
        <span className="text-xs text-rose-500">
          {errors.menuItemCount.message}
        </span>
      ) : error ? (
        <span className="text-xs text-rose-500">{error}</span>
      ) : (
        <span className="text-xs text-emerald-500">
          Norėdami sugeneruoti patiekalus, įveskite norimą skaičių ir
          paspauskite "Generuoti patiekalus"
        </span>
      )}
      <fieldset className="flex-row border border-slate-300 p-1 rounded-lg flex gap-2">
        <input
          className="form-input"
          min="0"
          max="10000"
          step="1"
          type="number"
          autoComplete="on"
          placeholder="Kategorijos pavadinimas"
          {...register('menuItemCount')}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="min-w-[200px] border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
          >
            Generuoti patiekaus
          </button>
        </div>
      </fieldset>
    </form>
  );
};
