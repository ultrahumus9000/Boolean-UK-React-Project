import { useState } from "react";
import createGrids from "../helper";

export const useBoard = () => {
  const [board, setBoard] = useState(createGrids());
  return [board, setBoard];
};
