import { BrowserRouter, Route, Routes } from "react-router";

// isdestymas
import { AdminLayout } from "./layouts/AdminLayout";
import { MainLayout } from "./layouts/MainLayout";

// puslapiai
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { UsersPage } from "./pages/admin/UsersPage";
import { MenusPage } from "./pages/admin/MenusPage";
import { OrdersPage } from "./pages/admin/OrdersPage";
import { CategoriesPage } from "./pages/admin/CategoriesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pirkejo-paskyra" element={<UserProfilePage />} />
          <Route path="prisijungimas" element={<LoginPage />} />
          <Route path="registracija" element={<RegisterPage />} />
        </Route>
        <Route path="/suvestine" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="naudotojai" element={<UsersPage />} />
          <Route path="patiekalai" element={<MenusPage />} />
          <Route path="patiekalu-kategorijos" element={<CategoriesPage />} />
          <Route path="uzsakymai" element={<OrdersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
