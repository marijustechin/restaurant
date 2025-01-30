import { Outlet } from 'react-router';
import { AdminFooter } from '../components/admin/AdminFooter';
import { Sidebar } from '../components/admin/Sidebar';
import { AdminNavbar } from '../components/admin/AdminNavbar';

export const AdminLayout = () => {
  return (
    <div className="p-1 md:p-2">
      <AdminNavbar />

      <div className="flex gap-2">
        <aside className="p-2 rounded-lg bg-slate-100">
          <Sidebar />
        </aside>
        <main className="grow bg-slate-100 rounded-lg p-2">
          <Outlet />
        </main>
      </div>

      <AdminFooter />
    </div>
  );
};
