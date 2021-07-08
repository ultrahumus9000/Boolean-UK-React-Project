const colors = {
  1: "white",
  2: "pink",
  3: "cyan",
  4: "yellow",
  5: "red",
  6: "green",
  7: "purple",
};
export default function MiniCell({ color, nextPiece, miniBoardX, miniBoardY }) {
  let cellColor = colors[color];

  //   if (piece.x === boardX && piece.y === boardY) {
  //     cellColor = piece.color;
  //   }

  for (let y = 0; y < nextPiece.shape.length; y++) {
    for (let x = 0; x < nextPiece.shape[0].length; x++) {
      let offsetX = nextPiece.x + x;
      let offsetY = nextPiece.y + y;
      // 1 if cell in shape isnt empty 2 it matches the coodinate matched the board then we can have the matched color of piece
      if (
        nextPiece.shape[y][x] !== "" &&
        offsetX === miniBoardX &&
        offsetY === miniBoardY
      ) {
        cellColor = nextPiece.color;
      }
    }
  }

  return <div className={`cell ${cellColor}`}></div>;
}
