import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { RootState } from "../../store/store";
import { logout } from "../../store/features/user/userSlice";
import AuthService from "../../services/AuthService";

export const UserMenu = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AuthService.logout();
    localStorage.removeItem("resToken");
    dispatch(logout());
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-2 items-center">
        <FiShoppingCart size={30} />
        <p className="text-lg">{count}</p>
      </div>
      <div className="flex gap-2 items-center">
        <FaRegUser size={30} />
        {userId !== "0" ? (
          <div className="flex flex-col items-start">
            <div>
              <Link to={"/pirkejo-paskyra"}>Mano paskyra</Link>
            </div>
            <div className="cursor-pointer p-2" onClick={handleLogout}>
              Atsijungti
            </div>
          </div>
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
