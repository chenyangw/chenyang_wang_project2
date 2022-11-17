import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <nav>
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
    </nav>
  );
}

export default Home;
