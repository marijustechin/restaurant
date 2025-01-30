import { Outlet } from "react-router";
import { AdminFooter } from "../components/admin/AdminFooter";
import { Sidebar } from "../components/admin/Sidebar";

export const AdminLayout = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3 border border-sky-400">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <Outlet />
        </div>
      </div>

      <AdminFooter />
    </>
  );
};
