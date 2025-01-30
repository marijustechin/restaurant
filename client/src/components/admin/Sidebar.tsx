import { Link, useLocation } from 'react-router';
import { sidebarLinks } from './sidebarLinks';
import { IoLogOutOutline } from 'react-icons/io5';

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="min-w-48 flex flex-col gap-5">
      <div className="border-b border-slate-400 flex gap-2 items-center py-1 px-3 cursor-pointer hover:bg-slate-200 rounded-lg">
        <IoLogOutOutline size={26} />
        <span>Atsijungti</span>
      </div>
      <div className="flex flex-col gap-3">
        {sidebarLinks.map((link) => (
          <Link
            key={link.title}
            to={link.link}
            className={`${
              link.link === pathname ? 'bg-slate-200' : 'bg-slate-100'
            } flex gap-2 items-center hover:bg-slate-200 rounded-lg py-1 px-3`}
            // className="flex gap-2 items-center hover:bg-slate-200 rounded-lg py-1 px-3"
          >
            {link.icon}
            <span>{link.title}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};
