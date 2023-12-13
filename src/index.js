import "./index.css";
import playRoundView from "./views/playRoundView";
import gameStartView from "./views/gameStartView";

const body = document.querySelector("body");

body.appendChild(gameStartView());
