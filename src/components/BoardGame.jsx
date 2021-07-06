import useSwitch from "../Hooks/mode";
export default function GameStart() {
  const mode = useSwitch((store) => store.mode);
  return (
    <div className={`board ${mode === "Light" ? "board-light" : "board-dark"}`}>
      <section className="grid-board"></section>
    </div>
  );
}
