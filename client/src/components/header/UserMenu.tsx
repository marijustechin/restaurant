import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { RootState } from "../../store/store";
import { logout } from "../../store/features/user/userSlice";

export const UserMenu = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-2 items-center">
        <FiShoppingCart size={30} />
        <p className="text-lg">{count}</p>
      </div>
      <div className="flex gap-2 items-center">
        <FaRegUser size={30} />
        {userId !== 0 ? (
          <div
            className="cursor-pointer p-2"
            onClick={() => dispatch(logout())}
          >
            Atsijungti
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
