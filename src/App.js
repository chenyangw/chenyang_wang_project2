import "./App.css";
import Board from "./components/Board";
import BoardHard from "./components/BoardHard";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./components/Words";
import { boardHardDefault, generateWordSet7 } from "./components/WordsHard";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import { useParams, Link } from "react-router-dom";

export const AppContext = createContext();

function App() {
  const { gameDifficulty } = useParams();
  const isHard = gameDifficulty === "hard" ? true : false;

  const difficulty = isHard ? 7 : 6;
  const maxAttempts = isHard ? 5 : 6;
  console.log(difficulty, maxAttempts);

  const [board, setBoard] = useState(isHard ? boardHardDefault : boardDefault);
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
    if (isHard) {
      generateWordSet7().then((words) => {
        setWordSet(words.wordSet);
        setCorrectWord(words.wordOfTheDay);
      });
    } else {
      generateWordSet().then((words) => {
        setWordSet(words.wordSet);
        setCorrectWord(words.wordOfTheDay);
      });
    }
  }, []);
  console.log("today's word: ", correctWord);

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
        <ul>
          <li>
            <Link to="/">Back to Home</Link>
          </li>
        </ul>
      </nav>

      <h3>Difficulty: {gameDifficulty}</h3>
      <AppContext.Provider
        value={{
          isHard,
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
          {isHard ? <BoardHard /> : <Board />}
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
