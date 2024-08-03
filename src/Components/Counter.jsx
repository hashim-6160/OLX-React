import React from "react";
import { useContext } from "react";
import { AppContext } from "../DataProvider";

const Counter = () => {
  const { increment, decrement, counter } = useContext(AppContext);
  return (
    <div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <h1>count : {counter}</h1>
    </div>
  );
};

export default Counter;
