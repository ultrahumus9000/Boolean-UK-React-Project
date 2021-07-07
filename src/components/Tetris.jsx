import { useCallback, useEffect, useState } from "react";

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
  const stopGame = useGame((store) => store.stopGame);
  const startGame = useGame((store) => store.startGame);
  const [piece, setPiece] = useState(randomTetriminos());
  const [board, setBoard] = useState(createGrids());
  const [nextPiece, SetPiece] = useState(randomTetriminos());

  const placeOnBoard = useCallback(() => {
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
    if (newBoard[0].some((ele) => ele !== "")) {
      console.log("stop");
      stopGame();
      return;
    }

    newBoard = newBoard.filter((row) => row.some((cell) => cell === ""));
    let gap = board.length - newBoard.length;
    for (let i = 0; i < gap; i++) {
      newBoard.unshift(Array(12).fill(""));
    }

    setBoard(newBoard);
    setPiece(randomTetriminos());
  }, [piece.shape, piece.x, piece.y, board, stopGame]);

  const willCollide = useCallback(
    (newX, newY, piece) => {
      if (!gameOver) {
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
            //check we are inside the game boarder, check we are actually on the cell,check we are gonna clear the bottom or not
            if (piece.shape[yRelativeToPiece][xRelativeToPiece] !== "") {
              let absoluteBoardX = piece.x + xRelativeToPiece;
              let absoluteBoardY = piece.y + yRelativeToPiece;
              if (
                board[absoluteBoardY + newY] === undefined ||
                board[absoluteBoardY + newY][absoluteBoardX + newX] ===
                  undefined ||
                board[absoluteBoardY + newY][absoluteBoardX + newX] !== ""
              ) {
                return true;
              }
            }
          }
        }
        return false;
      }
    },
    [piece.shape, piece.x, piece.y, board, gameOver]
  );

  const updatePiecePos = useCallback(
    (newX, newY) => {
      if (!gameOver) {
        if (!willCollide(newX, newY, piece)) {
          setPiece((piece) => ({
            ...piece,
            x: piece.x + newX,
            y: piece.y + newY,
          }));
        } else {
          if (newY > 0) {
            placeOnBoard();
          }
        }
        return null;
      }
    },
    [willCollide, gameOver, placeOnBoard]
  );

  useEffect(() => {
    let clearId = setInterval(() => {
      updatePiecePos(0, 1);
    }, 1000);
    console.log(clearId);
    return () => {
      clearInterval(clearId);
    };
  }, [updatePiecePos]);

  function restart() {
    startGame();
    setPiece(randomTetriminos());
    setBoard(createGrids());
  }

  console.log(piece);

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

  function rotatePiece() {
    if (!gameOver) {
      let copyPiece = JSON.parse(JSON.stringify(piece));
      let copyPieceShape = copyPiece.shape;
      let rotatePiece = [];
      for (let x = 0; x < copyPieceShape[0].length; x++) {
        let row = [];
        for (let y = 0; y < copyPieceShape.length; y++) {
          row.unshift(copyPieceShape[y][x]);
        }
        rotatePiece.push(row);
      }
      console.log(rotatePiece);
      if (!willCollide(0, 0, rotatePiece)) {
        setPiece(rotatePiece);
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
          } ${gameOver ? "game-over" : "Tetris"} `}
        >
          {` ${gameOver ? "" : "Tetris"}`}
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
            onClick={rotatePiece}
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
