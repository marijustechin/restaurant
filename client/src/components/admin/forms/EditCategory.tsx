import { IoMdClose } from "react-icons/io";
import { ICategory } from "../../../types/Category";
import { CategoryForm } from "./CategoryForm";

interface EditCategoryProps {
  open: boolean;
  onClose: () => void;
  editCat: ICategory | undefined;
}

export const EditCategory = ({ open, onClose, editCat }: EditCategoryProps) => {
  return (
    /** overlejus */
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-slate-800/50" : "invisible"
      }`}
      onClick={onClose}
    >
      {/* langas */}
      <div
        // reikia sustabdyti is tevo
        // paveldeta onclik funkcija
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-100 rounded-xl shadow p-6 transition-all text-lg max-w-lg ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-200 hover:text-slate-600"
        >
          <IoMdClose />
        </button>
        <h1 className="text-center text-2xl font-semibold">
          Kategorijos redagavimas
        </h1>
        <CategoryForm onSave={() => {}} category={editCat} />
      </div>
    </div>
  );
};
