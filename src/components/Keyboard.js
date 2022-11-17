import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    correctLetters,
    existedLetters,
    disabledLetters,
    currentAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext);

  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver) return;

      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    // eslint-disable-next-line
    [currentAttempt]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  // console.log("correctLetters", correctLetters);
  // console.log("existedLetters", existedLetters);
  // console.log("disabledLetters", disabledLetters);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line">
        {keys1.map((key) => {
          return (
            <Key
              keyVal={key}
              correct={correctLetters.includes(key)}
              present={existedLetters.includes(key)}
              absent={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line">
        {keys2.map((key) => {
          return (
            <Key
              keyVal={key}
              correct={correctLetters.includes(key)}
              present={existedLetters.includes(key)}
              absent={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line">
        <Key keyVal={"ENTER"} functionKey />
        {keys3.map((key) => {
          return (
            <Key
              keyVal={key}
              correct={correctLetters.includes(key)}
              present={existedLetters.includes(key)}
              absent={disabledLetters.includes(key)}
            />
          );
        })}
        <Key keyVal={"DEL"} functionKey />
      </div>
    </div>
  );
}

export default Keyboard;
