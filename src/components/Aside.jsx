import useSwitch from "../Hooks/mode";
import createGrids from "../helper";

import { randomTetriminos } from "../Hooks/tetrominos";

export default function Aside() {
  const { mode, toggleMode } = useSwitch((store) => {
    let { mode, toggleMode } = store;
    return { mode, toggleMode };
  });

  return (
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
        >
          Restart
        </button>
      </div>
    </aside>
  );
}
