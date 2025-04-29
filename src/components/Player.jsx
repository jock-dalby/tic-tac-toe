import { useState } from "react";

function Player({ name, symbol, isActive, onNameChange }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
    onNameChange(symbol, e.target.value);
  };

  let playerNameCmpt = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameCmpt = (
      <input type="text" value={playerName} onChange={handleChange} required />
    );
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerNameCmpt}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
