import { Outlet } from "react-router";
import { AdminFooter } from "../components/admin/AdminFooter";

export const AdminLayout = () => {
  return (
    <>
      <Outlet />
      <AdminFooter />
    </>
  );
};
