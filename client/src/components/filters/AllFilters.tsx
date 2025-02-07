import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";

export const AllFilters = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-center">Filtravimas</h2>
      <CategoryFilter />
      <PriceFilter />
    </div>
  );
};
