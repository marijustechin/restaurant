import { Logo } from './Logo';
import { MainMenu } from './MainMenu';
import { UserMenu } from './UserMenu';

export const Header = () => {
  return (
    <header className="flex justify-between items-center border-b border-slate-300 py-2">
      <Logo />
      <MainMenu />
      <UserMenu />
    </header>
  );
};
