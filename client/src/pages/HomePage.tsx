import { useEffect, useState } from "react";
import { apiGetAllMenuItems } from "../api/menu";
import { Counter } from "../components/temp/Counter";
import { IMenuItem } from "../types/MenuItem";
import { MenuItemCard } from "../components/MenuItemCard";

export const HomePage = () => {
  const [allMenu, setAllMenu] = useState<IMenuItem[]>([]);

  useEffect(() => {
    allMenuItems();
  }, []);

  const allMenuItems = async () => {
    const menuItems = await apiGetAllMenuItems();
    setAllMenu(menuItems);
  };

  return (
    <div>
      <h1 className="text-center shadow-text text-3xl">Visi patiekalai</h1>
      <div className="flex">
        <aside>cia bus visokie filtrai</aside>
        <div className="flex grow">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {allMenu &&
              allMenu.map((item) => (
                <div key={item.name}>
                  <MenuItemCard menuItem={item} />
                </div>
              ))}
          </section>
        </div>
      </div>
      {/* laikinas counter pavyzdys */}
      <Counter />
    </div>
  );
};
