import { FiUsers } from 'react-icons/fi';
import {
  MdOutlineEuroSymbol,
  MdOutlineFoodBank,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';

export const sidebarLinks = [
  {
    title: 'Suvestinė',
    link: '/suvestine',
    icon: <MdOutlineSpaceDashboard size={26} />,
  },
  {
    title: 'Naudotojai',
    link: '/suvestine/naudotojai',
    icon: <FiUsers size={26} />,
  },
  {
    title: 'Patiekalai',
    link: '/suvestine/patiekalai',
    icon: <MdOutlineFoodBank size={26} />,
  },
  {
    title: 'Užsakymai',
    link: '/suvestine/uzsakymai',
    icon: <MdOutlineEuroSymbol size={26} />,
  },
];
