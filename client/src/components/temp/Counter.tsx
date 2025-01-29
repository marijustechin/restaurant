import { useDispatch } from "react-redux";
import {
  inc,
  dec,
  reset,
  incByAmount,
} from "../../store/features/counter/counterSlice";
import { useState } from "react";

export const Counter = () => {
  //const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [incAmount, setIncAmount] = useState(0);

  const addValue = Number(incAmount) || 0;

  const resetAll = () => {
    setIncAmount(0);
    dispatch(reset());
  };

  return (
    <div className="flex gap-6 items-center justify-center">
      {/* <div>Skaitliukas: {count}</div> */}
      <div className="flex gap-5 p-3 text-2xl">
        <button onClick={() => dispatch(inc())}>+</button>
        <button onClick={() => dispatch(dec())}>-</button>
      </div>
      <div>
        <button onClick={resetAll}>Reset</button>
      </div>
    </div>
  );
};
