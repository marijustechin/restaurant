import { useEffect, useState } from 'react';
import { apiGetAllMenuItems } from '../api/menu';
import { Counter } from '../components/temp/Counter';
import { IMenuItem } from '../types/MenuItem';
import { MenuItemCard } from '../components/MenuItemCard';

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
    <main>
      <h1 className="text-center shadow-text text-3xl">Visi patiekalai</h1>
      <div className="flex">
        <aside>cia bus visokie filtrai</aside>
        <section className="grid grid-cols-3">
          {allMenu &&
            allMenu.map((item) => (
              <div key={item.name}>
                <MenuItemCard menuItem={item} />
              </div>
            ))}
        </section>
      </div>
      {/* laikinas counter pavyzdys */}
      <Counter />
    </main>
  );
};
