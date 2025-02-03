import { Link } from 'react-router';
import logo from '/favicons/favicon-32x32.png';

export const Logo = () => {
  return (
    <Link to={'/'} className="flex items-center text-2xl font-semibold">
      <img src={logo} alt={'logo image'} />
      arijusTechin
    </Link>
  );
};
