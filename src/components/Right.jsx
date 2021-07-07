import createGrids from "../helper";

import useSwitch from "../Hooks/mode";

export default function ControlPanel() {
  const mode = useSwitch((store) => store.mode);
  return (
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
        >
          Right
        </button>
        <button
          value="left"
          className={`left ${mode === "Light" ? "light-left" : "dark-left"} `}
        >
          Left
        </button>
        <button
          value="down"
          className={`down ${mode === "Light" ? "light-down" : "dark-down"} `}
        >
          Down
        </button>
      </section>
    </div>
  );
}
