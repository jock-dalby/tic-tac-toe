const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, symbol, turns }) {
  const gameBoard = INITIAL_GAME_BOARD;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  //   const [gameBoard, setGameBoard] = useState(INITIAL_GAME_BOARD);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updatedBoard[rowIndex][colIndex] = symbol;
  //       return updatedBoard;
  //     });
  //     onSelectSquare();
  //   }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cellValue, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {cellValue}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
