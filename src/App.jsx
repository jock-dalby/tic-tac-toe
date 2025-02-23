import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";

const CROSS_SYMBOL = "X";
const NOUGHT_SYMBOL = "X";

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

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState(CROSS_SYMBOL);

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((prevState) =>
      prevState === CROSS_SYMBOL ? NOUGHT_SYMBOL : CROSS_SYMBOL,
    );
    setGameTurns((prevTurns) => {
      let currentPlayer = CROSS_SYMBOL;
      if (prevTurns[0]?.player === CROSS_SYMBOL) {
        currentPlayer = NOUGHT_SYMBOL;
      }
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
        <GameBoard onSelectSquare={handleSelectSquare} symbol={activePlayer} />
      </div>
      <Log />
    </main>
  );
}

export default App;
