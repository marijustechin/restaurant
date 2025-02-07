import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { PageTitle } from "../components/PageTitle";
import { Link } from "react-router";
import HelperService from "../services/HelperService";
import { ButtonToCart } from "../components/ButtonToCart";

export const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div>
      <PageTitle>Pirkinių krepšelis</PageTitle>
      {cart.totalCount === 0 ? (
        <div>
          <p className="text-lg font-semibold">Pirkinių krešelis tuščias</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <table className="">
            <thead>
              <tr>
                <th>ID</th>
                <th></th>
                <th>Pavadinimas</th>
                <th>Kiekis</th>
                <th>Kaina</th>
                <th>Suma</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.allItems.map((item) => (
                <tr key={item.singleItem.id}>
                  <td>{item.singleItem.id}</td>
                  <td>
                    <img
                      className="w-12 h-12 rounded-full"
                      src={item.singleItem.image}
                    />
                  </td>
                  <td>
                    <Link
                      className="font-semibold"
                      to={`/patiekalas/${item.singleItem.id}`}
                    >
                      {item.singleItem.name}
                    </Link>
                  </td>
                  <td>{item.count}</td>
                  <td>{HelperService.formatCurrency(item.singleItem.price)}</td>
                  <td>
                    {HelperService.formatCurrency(
                      item.singleItem.price * item.count
                    )}
                  </td>
                  <td>
                    <ButtonToCart menuItem={item.singleItem} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-slate-100 p-2 rounded-lg">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold">Viso mokėti:</h3>
              <p className="font-semibold text-lg">
                {HelperService.formatCurrency(cart.totalSum)}
              </p>
              <div className="flex gap-4">
                <Link
                  className="border border-slate-300 bg-slate-200 hover:bg-slate-300 py-1 px-2 rounded-lg"
                  to={"/"}
                >
                  Tęsti apsipirkimą
                </Link>
                <Link
                  className="border border-slate-300 bg-slate-200 hover:bg-slate-300 py-1 px-2 rounded-lg"
                  to={"/mokejimas"}
                >
                  Mokėti
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
