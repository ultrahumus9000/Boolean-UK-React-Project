import { useState } from "react";
import useSwitch from "../Hooks/mode";
import Cell from "./Cell";
export default function GameStart() {
  const mode = useSwitch((store) => store.mode);
  let arrayColumn = Array(10).fill("");
  let arrayRows = Array(25).fill("");
  let innitialBoard = arrayRows.map((row) => {
    return arrayColumn.map((col) => "");
  });
  const [board, setBoard] = useState(innitialBoard);
  console.log(board);
  return (
    <div className={`board ${mode === "Light" ? "board-light" : "board-dark"}`}>
      <section className="grid-board">
        {board.map((row, rowIndex) => {
          return row.map((col, colIndex) => (
            <Cell key={`${rowIndex},${colIndex}`}></Cell>
          ));
        })}
      </section>
    </div>
  );
}
