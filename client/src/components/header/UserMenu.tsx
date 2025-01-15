import { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../../main";

export const UserMenu = () => {
  const { store } = useContext(AuthContext);

  console.log("store usermenu: ", store.isAuth);

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-2 items-center">
        <FiShoppingCart size={30} />
        <p className="text-lg">0</p>
      </div>
      <div className="flex gap-2 items-center">
        <FaRegUser size={30} />
        {store.isAuth ? (
          <Link to={"/"}>Atsijungti</Link>
        ) : (
          <Link className="text-sm" to={"/registracija"}>
            <div>Prisijungti</div>
            <div>Užsiregistruoti</div>
          </Link>
        )}
      </div>
    </div>
  );
};
