import { useState } from "react";
import { randomTetriminos } from "./tetrominos";

export const usePiece = () => {
  const [piece, setPiece] = useState({
    ...randomTetriminos(),
    collided: false,
  });
  return [piece, setPiece];
};
