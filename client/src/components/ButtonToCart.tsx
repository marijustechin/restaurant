import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IMenuItem } from "../types/MenuItem";
import { addItem, removeItem } from "../store/features/cart/cartSlice";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import HelperService from "../services/HelperService";

export const ButtonToCart = ({ menuItem }: { menuItem: IMenuItem }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const getItemsCount = () => {
    const currentItem = cart.allItems.find(
      (item) => item.singleItem.id === menuItem.id
    );

    if (currentItem) {
      return currentItem.count;
    } else {
      return 0;
    }
  };

  const [itemCount, setItemCount] = useState(getItemsCount);

  const handleAddToCart = () => {
    dispatch(addItem(menuItem));
    setItemCount(itemCount + 1);
  };

  const removeFromCart = () => {
    dispatch(removeItem(menuItem));
    setItemCount(itemCount - 1);
  };

  return (
    <div>
      {itemCount === 0 ? (
        <button onClick={handleAddToCart} type="button" className="btn-generic">
          Į krepšelį
        </button>
      ) : (
        <div className="flex">
          <button
            onClick={removeFromCart}
            className="flex items-center justify-center bg-slate-200 w-8 h-8 rounded-full"
          >
            <FaMinus />
          </button>
          <span className="flex items-center justify-center px-3 text-lg font-semibold">
            {itemCount}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-slate-200 w-8 h-8 rounded-full"
          >
            <FaPlus />
          </button>
          <span className="flex items-center justify-center text-xl font-semibold pl-4">
            {HelperService.formatCurrency(menuItem.price * itemCount)}
          </span>
        </div>
      )}
    </div>
  );
};
