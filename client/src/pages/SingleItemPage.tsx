import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IMenuItem } from '../types/MenuItem';
import MenuService from '../services/MenuService';
import axios from 'axios';
import HelperService from '../services/HelperService';
import { PageTitle } from '../components/PageTitle';
import { ButtonToCart } from '../components/ButtonToCart';

export const SingleItemPage = () => {
  const menuItemId = useParams().id;
  const [menuItem, setMenuItem] = useState<IMenuItem>();
  //
  const [apiErrors, setApiErrors] = useState<string>();

  useEffect(() => {
    getMenuItem();
  });

  const getMenuItem = async () => {
    if (menuItemId === undefined) {
      // opapa
      setApiErrors('Nepavyko gauti patiekalo ID');
    } else {
      try {
        const res = await MenuService.getMenuItemById(+menuItemId);
        setMenuItem(res.data);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setApiErrors(e.response?.data.message);
          return;
        }

        if (e instanceof Error) setApiErrors(e.message);
      }
    }
  };
  return (
    <main>
      {menuItem && (
        <section className="grid grid-cols-2 px-10 mx-auto my-3">
          <div>
            <img className="rounded-lg" src={menuItem.image} alt="prod image" />
          </div>
          <div className="flex flex-col">
            <PageTitle>{menuItem.name}</PageTitle>
            <div className="flex gap-4 my-10">
              <div className="flex gap-2 items-center justify-center">
                <div className="w-8 h-8 bg-slate-200 rounded-full cursor-pointer flex items-center justify-center">
                  ➖
                </div>
                <div className="w-6 h-6 rounded-full text-xl font-semibold text-center">
                  1
                </div>
                <div className="w-8 h-8 bg-slate-200 rounded-full cursor-pointer flex items-center justify-center">
                  ➕
                </div>
              </div>
              <div className="font-semibold text-lg">
                {HelperService.formatCurrency(menuItem.price)}
              </div>
            </div>
            <ButtonToCart />
            <p className="text-xl">{menuItem.description}</p>
          </div>
        </section>
      )}
    </main>
  );
};
