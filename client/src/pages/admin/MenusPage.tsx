import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuService from '../../services/MenuService';
import HelperService from '../../services/HelperService';
import { PageTitle } from '../../components/PageTitle';
import { MenuForm } from '../../components/admin/forms/MenuForm';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { IMenuItem } from '../../types/MenuItem';

export const MenusPage = () => {
  // patiekalai
  const [menus, setMenus] = useState<IMenuItem[]>([]);
  // rodyti patiekalo pridejimo/redagavimo forma
  const [modalOpen, setModalOpen] = useState(false);
  // redaguojamas patiekalas
  const [itemToEdit, setItemToEdit] = useState<IMenuItem>();
  // patiekalo istrynimo patvirtinimo dialogas
  const [confirm, setConfirm] = useState(false);
  // patvirtinimo dialogo antraste
  const [confirmPrompt, setConfirmPrompt] = useState('');
  // patiekalas, kuri reikia istrinti
  const [menuItemToDelete, setMenuItemToDelete] = useState<IMenuItem>();
  // backend klaidos
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    getAllMenus();
  });

  const getAllMenus = async () => {
    const res = await MenuService.getAllMenus();
    setMenus(res.data);
  };

  const handleEditMenuItem = (menuItem: IMenuItem) => {
    setItemToEdit(menuItem);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setItemToEdit(undefined);
    setModalOpen(false);
  };

  const handleMenuItemUpdate = (menuItem: IMenuItem) => {
    const updatedMenus = menus.filter((item) => item.id !== menuItem.id);
    setMenus([...updatedMenus, menuItem]);
    setItemToEdit(menuItem);
    setModalOpen(false);
  };

  // paruosia patiekala pasalinimui
  // ir atidaro patvirtinimo dialoga
  const handleConfirmOpen = (menuItem: IMenuItem) => {
    setConfirm(true);
    setConfirmPrompt(`Ar tikrai norite ištrinti "${menuItem.name}"?`);
    setMenuItemToDelete(menuItem);
  };

  // istrina arba ne patiekala
  const handleConfirmDelete = async (yes: boolean) => {
    if (yes && menuItemToDelete) {
      try {
        await MenuService.deleteMenuItem(menuItemToDelete.id.toString());
        const filteredMenuItems = menus.filter(
          (item) => item.id !== menuItemToDelete.id
        );
        setMenus([...filteredMenuItems]);
        setMenuItemToDelete(undefined);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setApiError(e.response?.data.message);
          return;
        }

        if (e instanceof Error) setApiError(e.message);
      }
    }
    setMenuItemToDelete(undefined);
    setConfirm(false);
    setConfirmPrompt('');
  };

  return (
    <main>
      <PageTitle>Patiekalai</PageTitle>
      <div className="flex gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
        >
          + Pridėti patiekalą
        </button>
      </div>
      {menus ? (
        <div className="relative overflow-x-auto p-3">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Pavadinimas
                </th>
                <th scope="col" className="px-6 py-3">
                  Aprašymas
                </th>
                <th scope="col" className="px-6 py-3">
                  Kaina
                </th>
                <th scope="col" className="px-6 py-3">
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody>
              {menus.map((item) => (
                <tr
                  key={item.name}
                  className="border-b border-slate-300 last:border-none"
                >
                  <td>
                    <div className="flex gap-2 items-center justify-center">
                      <div>{item.id}</div>
                      <div>
                        <img
                          className="w-10 h-10 border border-slate-300 rounded-full"
                          src={item.image}
                          alt="menuitem image"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{HelperService.formatCurrency(item.price)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleConfirmOpen(item)}
                        className="border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
                      >
                        ❌&nbsp;Ištrinti
                      </button>
                      <button
                        onClick={() => handleEditMenuItem(item)}
                        className="border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
                      >
                        ✍️&nbsp;Redaguoti
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>
          Patiekalų nėra. Norėdami pridėti patiekalą, paspauskite mygtuką
          "+Pridėti patieklą"
        </p>
      )}

      {modalOpen && (
        <MenuForm
          onSave={(menuItem) => handleMenuItemUpdate(menuItem)}
          menuItem={itemToEdit}
          open={modalOpen}
          onClose={handleModalClose}
        />
      )}
      {confirm && (
        <ConfirmModal
          open={confirm}
          onAnswer={(yes) => handleConfirmDelete(yes)}
          prompt={confirmPrompt}
        />
      )}
    </main>
  );
};
