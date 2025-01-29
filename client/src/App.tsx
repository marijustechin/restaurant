import { BrowserRouter, Route, Routes } from "react-router";
import { AdminLayout } from "./layouts/AdminLayout";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { UserProfilePage } from "./pages/UserProfilePage";

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
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
