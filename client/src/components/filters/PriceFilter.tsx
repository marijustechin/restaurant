import { useState } from "react";

export const PriceFilter = () => {
  const minPrice = 4;
  const maxPrice = 17;
  const [rangeValue, setRangeValue] = useState(maxPrice);

  return (
    <div>
      <h3 className="text-xl text-center">Kaina</h3>
      <div className="flex gap-1">
        <span>{minPrice}</span>
        <input
          onChange={(e) => setRangeValue(+e.target.value)}
          type="range"
          min={minPrice}
          max={maxPrice}
          value={rangeValue}
          id="myRange"
        />
        <span>{rangeValue}</span>
      </div>
    </div>
  );
};
