import { Route } from "react-router";
import Aside from "./components/Aside";
import Board from "./components/Board";
import GameStart from "./components/BoardGame";
import ControlPanel from "./components/Right";
import useSwitch from "./Hooks/mode";

function App() {
  const mode = useSwitch((store) => store.mode);
  return (
    <div className={`App ${mode}`}>
      <Aside />
      <Route path="/" exact>
        <Board />
      </Route>
      <Route path="/tetris">
        <GameStart />
      </Route>
      <ControlPanel />
    </div>
  );
}

export default App;
