import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptValue }) {
  const {
    board,
    setCorrectLetters,
    setExistedLetters,
    setDisabledLetters,
    currentAttempt,
    correctWord,
  } = useContext(AppContext);
  const letter = board[attemptValue][letterPosition];
  const correct = correctWord.toUpperCase()[letterPosition] === letter;
  const exist =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : exist ? "present" : "absent");

  useEffect(() => {
    if (letter !== "" && !correct && !exist) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
    if (letter !== "" && exist) {
      console.log("exists ", letter);
      setExistedLetters((prev) => [...prev, letter]);
    }
    if (letter !== "" && correct) {
      console.log("correct: ", letter);
      setCorrectLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
