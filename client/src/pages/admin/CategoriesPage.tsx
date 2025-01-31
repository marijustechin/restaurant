import { useEffect, useState } from "react";
import { PageTitle } from "../../components/PageTitle";
import { ICategory } from "../../types/Category";
import CategoryService from "../../services/CategoryService";
import { CategoryForm } from "../../components/admin/forms/CategoryForm";
import { EditCategory } from "../../components/admin/forms/EditCategory";
import { ConfirmModal } from "../../components/admin/ConfirmModal";

export const CategoriesPage = () => {
  const [cats, setCats] = useState<ICategory[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editCat, setEditCat] = useState<ICategory | undefined>();

  useEffect(() => {
    allCategories();
  }, []);

  const allCategories = async () => {
    const res = await CategoryService.getAllCategories();
    setCats(res.data);
  };

  const handleEditCategory = (catId: string) => {
    setEditCat(cats.find((cat) => cat.id === catId));
    setEditOpen(true);
  };

  const handleDeleteCategory = async (catId: string) => {
    setEditCat(cats.find((cat) => cat.id === catId));
    setConfirm(true);
  };

  return (
    <div>
      <PageTitle>Patiekalų kategorijos</PageTitle>
      <CategoryForm onSave={(newCat) => setCats([...cats, newCat])} />

      <div className="relative overflow-x-auto p-3">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Kategorijos pavadinimas
              </th>
              <th scope="col" className="px-6 py-3">
                Patiekalai
              </th>
              <th scope="col" className="px-6 py-3">
                Veiksmai
              </th>
            </tr>
          </thead>
          <tbody>
            {cats.map((cat) => (
              <tr
                key={cat.id}
                className="border-b border-slate-300 last:border-none"
              >
                <td scope="col" className="px-6 py-4">
                  {cat.id}
                </td>
                <td scope="col" className="px-6 py-4">
                  {cat.category_name}
                </td>
                <td scope="col" className="px-6 py-4">
                  {cat.menus_count}
                </td>

                <td scope="col" className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
                    >
                      ❌ Ištrinti
                    </button>
                    <button
                      onClick={() => handleEditCategory(cat.id)}
                      className="border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
                    >
                      ✍️ Redaguoti
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editOpen && (
        <EditCategory
          editCat={editCat}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
      {confirm && (
        <ConfirmModal
          onNo={() => setConfirm(false)}
          onYes={() => {}}
          open={confirm}
          prompt="Ar tikrai?"
        />
      )}
    </div>
  );
};
