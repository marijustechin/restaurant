import { Link } from "react-router";

export const Footer = () => {
  return (
    <div className="flex gap-4 items-center justify-center text-sm my-4 p-2 border-t border-slate-300">
      <Link to={"/"}>&copy; MarijusTechin {new Date().getFullYear()} m.</Link>
    </div>
  );
};
