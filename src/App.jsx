import { useState } from "react";

import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
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

const PLAYERS = {
  [CROSS_SYMBOL]: "Player 1",
  [NOUGHT_SYMBOL]: "Player 2",
};

function getGameBoard(gameTurns) {
  const gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function getActivePlayer(turns) {
  return turns[0]?.player === CROSS_SYMBOL ? NOUGHT_SYMBOL : CROSS_SYMBOL;
}

function getWinner(board) {
  let winner;
  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSquareSymbol = board[combination[0].row][combination[0].col];
    const secondSquareSymbol = board[combination[1].row][combination[1].col];
    const thirdSquareSymbol = board[combination[2].row][combination[2].col];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  });
  return winner;
}

function App() {
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = getGameBoard(gameTurns);
  const activePlayer = getActivePlayer(gameTurns);
  const winner = getWinner(gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {Object.entries(PLAYERS).map(([symbol, name]) => (
            <Player
              key={name}
              name={name}
              symbol={symbol}
              isActive={activePlayer === symbol}
              onNameChange={handlePlayerNameChange}
            />
          ))}
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={playerNames[winner]}
            onRematch={() => setGameTurns([])}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
