import { IoMdClose } from "react-icons/io";

interface ConfirmModalProps {
  open: boolean;
  onYes: () => void;
  onNo: () => void;
  prompt: string;
}

export const ConfirmModal = ({
  open,
  onYes,
  onNo,
  prompt,
}: ConfirmModalProps) => {
  return (
    /** overlejus */
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-slate-800/50" : "invisible"
      }`}
      onClick={onNo}
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
          onClick={onNo}
          className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-200 hover:text-slate-600"
        >
          <IoMdClose />
        </button>
        <h1 className="text-center text-2xl font-semibold my-3">{prompt}</h1>
        <div className="flex gap-3">
          <button className="min-w-[200px] border border-emerald-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300">
            Taip
          </button>
          <button
            onClick={onYes}
            className="min-w-[200px] border border-rose-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300"
          >
            Ne
          </button>
        </div>
      </div>
    </div>
  );
};
