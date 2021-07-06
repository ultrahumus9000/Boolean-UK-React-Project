import { useHistory } from "react-router-dom";
import useSwitch from "../Hooks/mode";

export default function Board() {
  const mode = useSwitch((store) => store.mode);
  let arrayColumn = Array(12).fill("");
  let arrayRows = Array(20).fill("");
  const history = useHistory();
  return (
    <div className={`board ${mode === "Light" ? "board-light" : "board-dark"}`}>
      <section className="modal">
        <h1>Tetris</h1>
        <button
          className="play"
          onClick={() => {
            history.push("/tetris");
          }}
        >
          Play
        </button>
      </section>
      <section className="grid-board">
        {arrayRows.map((row, rowIndex) => {
          return arrayColumn.map((col, colIndex) => (
            <div className="cell"></div>
          ));
        })}
      </section>
    </div>
  );
}
