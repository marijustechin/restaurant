import { useEffect, useState } from "react";
import { apiGetAllMenuItems } from "../api/menu";
import { Counter } from "../components/temp/Counter";

export const HomePage = () => {
  const [allMenu, setAllMenu] = useState([]);

  useEffect(() => {
    allMenuItems();
  }, []);

  const allMenuItems = async () => {
    const menuItems = await apiGetAllMenuItems();
    setAllMenu(menuItems);
  };

  return (
    <main>
      <h1 className="text-center shadow-text text-3xl">Visi patiekalai</h1>
      {/* laikinas counter pavyzdys */}
      <Counter />
      <section className="grid grid-cols-3">
        {allMenu &&
          allMenu.map((item) => (
            <div key={item.name}>
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p>{item.description}</p>
              <p>
                Kaina: <span className="font-semibold">{item.price}</span>
              </p>
              <img src={item.image} alt={item.name} className="w-60" />
            </div>
          ))}
      </section>
    </main>
  );
};
