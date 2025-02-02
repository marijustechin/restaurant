import { Link } from 'react-router';
import HelperService from '../services/HelperService';
import { IMenuItem } from '../types/MenuItem';
import { ButtonToCart } from './ButtonToCart';

interface MenuItemCardProps {
  menuItem: IMenuItem;
}

export const MenuItemCard = ({ menuItem }: MenuItemCardProps) => {
  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        to={`/patiekalas/${menuItem.id}`}
      >
        <img
          className="object-cover"
          src={menuItem.image}
          alt="product image"
        />
      </Link>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">
            {menuItem.name}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {HelperService.formatCurrency(menuItem.price)}
            </span>
          </p>
          <div className="flex items-center">
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
        </div>
        <ButtonToCart />
      </div>
    </div>
  );
};
