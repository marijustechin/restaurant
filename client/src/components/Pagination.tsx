import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export const Pagination = () => {
  const tipoPages = [1, 2, 3, 4, 5, 6];
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (tipoPages.length > currentPage) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full flex justify-center items-center gap-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="btn-generic flex gap-2 items-center"
      >
        <AiFillCaretLeft />
        Ankstesnis
      </button>
      {tipoPages.map((page) => (
        <div
          className={`${
            currentPage === page ? "bg-slate-300 font-semibold" : "bg-slate-200"
          } flex items-center justify-center border border-slate-300 w-8 h-8 rounded-md`}
          key={page}
        >
          {page}
        </div>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === tipoPages.length}
        className="btn-generic flex gap-2 items-center"
      >
        Paskenis
        <AiFillCaretRight />
      </button>
    </div>
  );
};
