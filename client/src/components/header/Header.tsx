import { Logo } from "./Logo";
import { MainMenu } from "./MainMenu";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <MainMenu />
      <UserMenu />
    </header>
  );
};
