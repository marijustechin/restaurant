import { useEffect, useState } from "react";
import { apiGetAllMenuItems } from "../api/menu";
import { IMenuItem } from "../types/MenuItem";
import { MenuItemCard } from "../components/MenuItemCard";
import { Pagination } from "../components/Pagination";

export const HomePage = () => {
  const [allMenu, setAllMenu] = useState<IMenuItem[]>([]);
  const [menusPerPage, setMenusPerPage] = useState(9);

  useEffect(() => {
    allMenuItems();
  }, []);

  const allMenuItems = async () => {
    const menuItems = await apiGetAllMenuItems();
    setAllMenu(menuItems);
  };

  return (
    <div>
      <h1 className="text-center shadow-text text-3xl">
        Restoranas &bdquo;Trys dručkiai&rdquo;
      </h1>
      <div>Redux testas: </div>
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
      <div>
        <Pagination />
      </div>
    </div>
  );
};
