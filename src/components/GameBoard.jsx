const INITIAL_GAME_BOARD = [
  ["X", null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  return (
    <ol id="game-board">
      {INITIAL_GAME_BOARD.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cellValue, colIndex) => (
              <li key={colIndex}>
                <button>{cellValue}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
