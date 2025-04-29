import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const CROSS_SYMBOL = "X";
const NOUGHT_SYMBOL = "O";

const PLAYERS = [
  {
    name: "Player 1",
    symbol: CROSS_SYMBOL,
  },
  {
    name: "Player 2",
    symbol: NOUGHT_SYMBOL,
  },
];

function getActivePlayer(turns) {
  return turns[0]?.player === CROSS_SYMBOL ? NOUGHT_SYMBOL : CROSS_SYMBOL;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getActivePlayer(gameTurns);

  const gameBoard = INITIAL_GAME_BOARD;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let hasWinner = null;

  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      hasWinner = firstSquareSymbol;
    }
  });

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {PLAYERS.map((props) => (
            <Player
              key={props.name}
              {...props}
              isActive={activePlayer === props.symbol}
            />
          ))}
        </ol>
        {hasWinner && <p>You won, {hasWinner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
