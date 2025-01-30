import { IoIosSearch } from 'react-icons/io';
import { Logo } from '../header/Logo';
import { AiOutlineAppstore, AiOutlineExpand } from 'react-icons/ai';
import { MdNotificationsNone } from 'react-icons/md';
import { HiOutlineCog8Tooth } from 'react-icons/hi2';
import userAvatar from '/user.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link } from 'react-router';

export const AdminNavbar = () => {
  const activeUser = useSelector((state: RootState) => state.user);

  return (
    <nav className="py-2 flex items-center justify-between">
      <Logo />
      <div className="flex gap-10 items-center">
        <div className="flex gap-3 items-center">
          <IoIosSearch size={26} />
          <AiOutlineAppstore size={26} />
          <AiOutlineExpand size={24} />
        </div>
        <div className="relative">
          <MdNotificationsNone size={24} />
          <span className="rounded-full bg-rose-500 text-white w-5 h-5 text-sm absolute -top-3 -right-3 flex items-center justify-center">
            3
          </span>
        </div>
        <Link className="flex gap-1 items-center" to={'/pirkejo-paskyra'}>
          <img className="h-8" src={userAvatar} alt="user avatar" />
          <span>{activeUser.first_name}</span>
        </Link>

        <div>
          <HiOutlineCog8Tooth size={24} />
        </div>
      </div>
    </nav>
  );
};
