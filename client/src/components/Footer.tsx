import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="flex gap-4 items-center justify-center text-sm my-4 p-2 border-t border-slate-500">
      <Link to={"/"}>&copy; MarijusTechin {new Date().getFullYear()} m.</Link>
      <Link to={"/suvestine"}>Admin</Link>
    </footer>
  );
};
