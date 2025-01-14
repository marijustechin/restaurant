import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router";

export const UserMenu = () => {
  return (
    <div className="flex gap-2 items-center">
      <FaRegUser size={30} />
      <Link className="text-sm" to={"/registracija"}>
        <div>Prisijungti</div>
        <div>Užsiregistruoti</div>
      </Link>
    </div>
  );
};
