import { useBoard } from "../Hooks/useBoard";
import { usePiece } from "../Hooks/usePiece";
import createGrids from "../helper";
import useGame from "../Hooks/useGame";

export default function ControlPanel() {
  const gameOver = useGame((store) => store.gameOver);

  const [board, setBoard] = useBoard();
  const [piece, setPiece] = usePiece();
  function willColide() {
    return true;
  }

  function movePiece(e) {
    if (!gameOver) {
      if (!willColide()) {
        if (e.target.value === "left") {
        }
        if (e.target.value === "right") {
        }
        if (e.target.value === "down") {
        }
      }
    }
    return;
  }

  function rotatePiece() {
    if (!gameOver) {
      if (!willColide()) {
      }
    }
    return;
  }

  return (
    <div>
      <h2 className="game-name">Tetris</h2>
      <section className="control-panel">
        <button value="Rotate" className="rotate">
          Rotate
        </button>
        <button value="Right" className="right">
          Right
        </button>
        <button value="Left" className="left">
          Left
        </button>
        <button
          value="down"
          className="down"
          onClick={(e) => {
            console.log(e.target.value);
          }}
        >
          Down
        </button>
      </section>
    </div>
  );
}
