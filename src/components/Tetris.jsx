import { useEffect, useState } from "react";

import createGrids from "../helper";
import useSwitch from "../Hooks/mode";

import { randomTetriminos } from "../Hooks/tetrominos";
import Cell from "./Cell";
import useGame from "../Hooks/useGame";

export default function GameStart() {
  const { mode, toggleMode } = useSwitch((store) => {
    let { mode, toggleMode } = store;
    return { mode, toggleMode };
  });

  const gameOver = useGame((store) => store.gameOver);

  const [piece, setPiece] = useState(randomTetriminos());
  const [board, setBoard] = useState(createGrids());

  useEffect(() => {
    let clearId = setInterval(() => {
      updatePiecePos(0, 1);
    }, 1000);
    return () => {
      clearInterval(clearId);
    };
  }, []);

  function restart() {
    setPiece(randomTetriminos());
    setBoard(createGrids());
  }

  function willCollide(newX, newY) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[0].length; x++) {
        //check we are inside the game boarder, check we are actually on the cell,check we are gonna clear the bottom or not
        if (piece.shape[y][x] !== "") {
          if (!board[y + piece.y + newY][x + piece.x + newX]) {
            return true;
          }
        }
      }
    }
    return false;
  }
  console.log(piece);

  function placeOnBoard() {
    let newBoard = JSON.parse(JSON.stringify(board));
    for (
      let yRelativeToPiece = 0;
      yRelativeToPiece < piece.shape.length;
      yRelativeToPiece++
    ) {
      for (
        let xRelativeToPiece = 0;
        xRelativeToPiece < piece.shape[0].length;
        xRelativeToPiece++
      ) {
        let absoluteBoardX = piece.x + xRelativeToPiece;
        let absoluteBoardY = piece.y + yRelativeToPiece;
        if (piece.shape[yRelativeToPiece][xRelativeToPiece] !== "") {
          newBoard[absoluteBoardY][absoluteBoardX] =
            piece.shape[yRelativeToPiece][xRelativeToPiece];
        }
      }
    }
    setBoard(newBoard);
    setPiece(randomTetriminos());
  }

  function updatePiecePos(newX, newY) {
    if (!willCollide(newX, newY)) {
      setPiece((piece) => ({ ...piece, x: piece.x + newX, y: piece.y + newY }));
    }
    return null;
  }

  function movePiece(e) {
    if (!gameOver) {
      if (e.target.value === "left") {
        updatePiecePos(-1, 0);
      }
      if (e.target.value === "right") {
        updatePiecePos(1, 0);
      }
      if (e.target.value === "down") {
        updatePiecePos(0, 1);
      }
    }
  }

  function rotatePiece(piece, direction) {
    if (!gameOver) {
      if (!willCollide()) {
      }
    }
    return;
  }

  return (
    <>
      <aside>
        <button className={`mode ${mode}`} onClick={toggleMode}>
          {`Current Mode: ${mode}`}
        </button>
        <div
          className={`information-board ${
            mode === "Light"
              ? "information-board-light"
              : "information-board-dark"
          } `}
        >
          <p className="label">Score</p>
          <p className={`actual`}>Score</p>
          <p className="label">Current Row</p>
          <p className={`actual`}>Row</p>
          <p className="label">Level</p>
          <p className={`actual`}>Level</p>
          <p className="label">Next</p>
          <p>Next</p>
          <button onClick={placeOnBoard}>Place </button>
        </div>
        <div className="panel">
          <button
            className={`${mode === "Light" ? "button-light" : "button-dark"}`}
          >
            Next Level
          </button>
          <button
            className={`${mode === "Light" ? "button-light" : "button-dark"}`}
          >
            Pause
          </button>
          <button
            className={`${mode === "Light" ? "button-light" : "button-dark"}`}
            onClick={restart}
          >
            Restart
          </button>
        </div>
      </aside>

      <div
        className={`board ${mode === "Light" ? "board-light" : "board-dark"}`}
      >
        <section className="grid-board">
          {board.map((row, y) => {
            return row.map((color, x) => (
              <Cell
                color={color}
                key={`${y},${x}`}
                piece={piece}
                boardX={x}
                boardY={y}
              ></Cell>
            ));
          })}
        </section>
      </div>
      <div>
        <h2
          className={`game-name ${
            mode === "Light" ? "light-gamename" : "dark-gamename"
          }`}
        >
          Tetris
        </h2>
        <section
          className={`control-panel ${
            mode === "Light" ? "light-control-panel" : "dark-control-panel"
          } `}
        >
          <button
            value="Rotate"
            className={`rotate ${
              mode === "Light" ? "light-rotate" : "dark-rotate"
            } `}
          >
            Rotate
          </button>
          <button
            value="right"
            className={`right ${
              mode === "Light" ? "light-right" : "dark-right"
            } `}
            onClick={movePiece}
          >
            Right
          </button>
          <button
            value="left"
            className={`left ${mode === "Light" ? "light-left" : "dark-left"} `}
            onClick={movePiece}
          >
            Left
          </button>
          <button
            value="down"
            className={`down ${mode === "Light" ? "light-down" : "dark-down"} `}
            onClick={movePiece}
          >
            Down
          </button>
        </section>
      </div>
    </>
  );
}
// need to keep track pieces and already played
