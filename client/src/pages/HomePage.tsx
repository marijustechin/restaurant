import { useEffect, useState } from "react";
import { apiGetAllMenuItems } from "../api/menu";

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
      <h1 className="text-center shadow-text">Visi patiekalai</h1>
      <section className="grid grid-cols-3">
        {allMenu.map((item) => (
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
