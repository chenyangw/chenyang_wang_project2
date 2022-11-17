import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, functionKey, correct, present, absent }) {
  const { gameOver, onSelectLetter, onDelete, onEnter } =
    useContext(AppContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DEL") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className="key"
      id={
        functionKey
          ? "functionKey"
          : absent
          ? "absent"
          : correct
          ? "correct"
          : present
          ? "present"
          : undefined
      }
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
