import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/" class="active">
            Home
          </Link>
        </li>
        <li>
          <Link to="/game/normal">Normal difficulty</Link>
        </li>
        <li>
          <Link to="/game/hard">Hard difficulty</Link>
        </li>
      </ul>
      <div className="instruction">
        <h1 id="wordle">Wordle</h1>
        <p>
          Traditional wordle
          <a href="https://www.nytimes.com/games/wordle/index.html">
            nytimes wordle
          </a>
        </p>
        <h2 id="how-to-play">How To Play</h2>
        <h3 id="normal-difficulty">Normal difficulty</h3>
        <p>
          Guess the Wordle in 6 tries. Each guess must be a valid{" "}
          <strong>6-letter valid</strong> word.
        </p>
        <h3 id="hard-difficulty">Hard difficulty</h3>
        <p>
          Guess the Wordle in <strong>5</strong> tries. Each guess must be a
          valid <strong>7-letter valid</strong> word.
        </p>
        <p>
          The color of the tiles will change to show how close your guess was to
          the word.
        </p>
        <div className="example" id="correct">
          A
        </div>
        <p>shows letter in the correct spot.</p>
        <div className="example" id="present">
          A
        </div>
        <p>shows letter exist in the word but in the wrong spot.</p>{" "}
        <div className="example" id="absent">
          A
        </div>
        <p>shows letter not exist in any spot.</p>
      </div>
    </div>
  );
}

export default Home;
