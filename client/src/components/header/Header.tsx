import { Logo } from "./Logo";
import { MainMenu } from "./MainMenu";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  return (
    <div className="flex justify-between items-center border-b border-slate-300 py-2">
      <Logo />
      <MainMenu />
      <UserMenu />
    </div>
  );
};
