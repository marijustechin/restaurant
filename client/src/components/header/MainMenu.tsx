import { Link } from "react-router";
import { MenuLinks } from "./MenuLinks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const MainMenu = () => {
  const activeUser = useSelector((state: RootState) => state.user);

  return (
    <nav className="flex gap-2 items-center justify-center">
      {MenuLinks.map((link) => (
        <div
          className="border border-slate-300 py-1 px-2 rounded-lg uppercase font-semibold bg-slate-200 hover:bg-slate-300"
          key={link.title}
        >
          <Link to={link.href}>{link.title}</Link>
        </div>
      ))}
      {activeUser.role === "ADMIN" && (
        <div className="border border-slate-300 py-1 px-2 rounded-lg uppercase font-semibold bg-slate-200 hover:bg-slate-300">
          <Link to={"/suvestine"}>Suvestinė</Link>
        </div>
      )}
    </nav>
  );
};
