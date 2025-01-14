import { Link } from "react-router";
import { MenuLinks } from "./MenuLinks";

export const MainMenu = () => {
  return (
    <nav className="flex gap-3 items-center justify-center">
      {MenuLinks.map((link) => (
        <div key={link.title}>
          <Link to={link.href}>{link.title}</Link>
        </div>
      ))}
    </nav>
  );
};
