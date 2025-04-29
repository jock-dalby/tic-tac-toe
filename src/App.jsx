import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";

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
        <GameBoard
          onSelectSquare={handleSelectSquare}
          symbol={activePlayer}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
