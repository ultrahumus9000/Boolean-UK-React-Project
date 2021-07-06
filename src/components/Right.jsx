export default function ControlPanel() {
  return (
    <div>
      <h2 className="game-name">Tetris</h2>
      <section className="control-panel">
        <button className="rotate">Rotate</button>
        <button className="right">Right</button>
        <button className="left">Left</button>
        <button className="down">Down</button>
      </section>
    </div>
  );
}
