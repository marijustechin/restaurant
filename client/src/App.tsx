import { BrowserRouter, Route, Routes } from 'react-router';
import { AdminLayout } from './layouts/AdminLayout';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminPage } from './pages/AdminPage';
import Store from './store/store';
import { createContext } from 'react';

interface State {
  store: Store;
}

const store = new Store();

export const AuthContext = createContext<State>({ store });

function App() {
  return (
    <AuthContext.Provider value={{ store }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="prisijungimas" element={<LoginPage />} />
            <Route path="registracija" element={<RegisterPage />} />
          </Route>
          <Route path="/suvestine" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
