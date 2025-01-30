import { Link } from 'react-router';

export const AdminFooter = () => {
  return (
    <footer className="text-sm border-t border-slate-300 my-4 p-2 text-center">
      <Link to={'/'}>
        <p>&copy; MarijusTechin {new Date().getFullYear()} m.</p>
      </Link>
    </footer>
  );
};
