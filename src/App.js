import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const difficulty = 6;
  const maxAttempts = 6;

  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letter: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [existedLetters, setExistedLetters] = useState([]);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.wordOfTheDay);
    });
  }, []);

  const onEnter = () => {
    if (currentAttempt.letter !== difficulty) {
      alert("word too short.");
      return;
    }

    let currentWord = "";
    for (let i = 0; i < difficulty; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }
    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letter: 0 });
    } else {
      alert("invalid word.");
      return;
    }

    if (currentWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    console.log(currentAttempt);
    if (currentAttempt.attempt === maxAttempts - 1) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const onDelete = () => {
    if (currentAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({ ...currentAttempt, letter: currentAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currentAttempt.letter >= difficulty) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letter] = key;
    setBoard(newBoard);
    setCurrentAttempt({
      attempt: currentAttempt.attempt,
      letter: currentAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>

      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setCorrectLetters,
          correctLetters,
          setExistedLetters,
          existedLetters,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
