import { useEffect, useState } from "react";
import createGrids from "../helper";
import useSwitch from "../Hooks/mode";
import { useBoard } from "../Hooks/useBoard";
import { usePiece } from "../Hooks/usePiece";
import Cell from "./Cell";

export default function GameStart() {
  const mode = useSwitch((store) => store.mode);
  const [board, setBoard] = useBoard();
  const [piece, setPiece] = usePiece();

  useEffect(() => {
    let newBoard = board.map((row, y) => {
      return board[y].map((cell, x) => {
        if (x === piece.x && y === piece.y) {
        }
        return cell;
      });
    });
  }, [piece.x, piece.y]);
  console.log(piece);
  return (
    <div className={`board ${mode === "Light" ? "board-light" : "board-dark"}`}>
      <section className="grid-board">
        {board.map((row, y) => {
          return row.map((col, x) => <Cell key={`${y},${x}`}></Cell>);
        })}
      </section>
    </div>
  );
}
// need to keep track pieces and already played
