import { Outlet } from "react-router";
import { Footer } from "../components/Footer";
import { Header } from "../components/header/Header";

export const MainLayout = () => {
  return (
    <>
      <header className="max-w-screen-xl mx-auto px-1 md:px-2">
        <Header />
      </header>

      <main className="max-w-screen-xl mx-auto px-1 md:px-2">
        <Outlet />
      </main>
      <footer className="max-w-screen-xl mx-auto px-1 md:px-2">
        <Footer />
      </footer>
    </>
  );
};
