import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const {
    board,
    setBoard,
    currentAttempt,
    gameOver,
    onSelectLetter,
    correctWord,
    onDelete,
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h2>{gameOver.guessedWord ? "Congratulation! " : "You failed..."}</h2>
      <h1>
        Correct Word: {correctWord.toUpperCase()}{" "}
        {console.log(gameOver.guessedWord)}
      </h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currentAttempt.attempt} attempts</h3>
      )}
      <h3>
        <button onClick={() => window.location.reload(false)}>
          Start New Game
        </button>
      </h3>
    </div>
  );
}

export default GameOver;
