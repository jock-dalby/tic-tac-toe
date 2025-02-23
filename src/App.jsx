import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

const PLAYERS = [
  {
    name: "Player 1",
    symbol: "X",
  },
  {
    name: "Player 2",
    symbol: "O",
  },
];

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    setActivePlayer((prevState) => (prevState === "X" ? "O" : "X"));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {PLAYERS.map((props) => (
            <Player {...props} isActive={activePlayer === props.symbol} />
          ))}
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} symbol={activePlayer} />
      </div>
    </main>
  );
}

export default App;
