"use strict";

const numElement = document.querySelector(".number");

// Estado inicial

let highScore = 0;
let difficulty = "easy";
let numberRange = 20;
let userAttempts = 20;
let scoreMultiplier = 1;
let secretNumber = randomNumber();
changeDifficulty("easy");

// Funções

function randomNumber() {
  return Math.trunc(Math.random() * numberRange) + 1;
}

function resetGame() {
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#1c2331";
  numElement.style.width = "15rem";
  numElement.style.height = "15rem";
  numElement.style.fontSize = "6rem";
  numElement.style.backgroundColor = "#ecf0f1";
  numElement.style.color = "#3498db";
  numElement.classList.remove("win");
  numElement.textContent = "?";
  document.querySelector(".check").disabled = false;
  changeMessage("Comece a adivinhar~");
  secretNumber = randomNumber();
}

function changeDifficulty(diff) {
  difficulty = diff;
  if (difficulty === "easy") {
    userAttempts = 20;
    scoreMultiplier = 1;
    numberRange = 20;
  } else if (difficulty === "medium") {
    userAttempts = 15;
    scoreMultiplier = 2.5;
    numberRange = 50;
  } else if (difficulty === "hard") {
    userAttempts = 10;
    scoreMultiplier = 6;
    numberRange = 100;
  }
  changeAttempts(userAttempts);
  changeTextGuess();
  updateMultiplier();
  resetGame();
}

function changeMessage(message) {
  document.querySelector(".message").textContent = message;
}

function updateMultiplier() {
  document.querySelector(
    ".multiplier span"
  ).textContent = `${scoreMultiplier}x`;
}

function changeAttempts(attempts) {
  document.querySelector(".attempts").textContent = attempts;
}

function changeTextGuess() {
  document.querySelector(
    ".between"
  ).textContent = `Adivinhe o número entre 1 e ${numberRange}!`;
  document.querySelector(".guess").setAttribute("max", numberRange);
}

// Event Listeners

document.querySelector(".easy").addEventListener("click", function () {
  changeDifficulty("easy");
});

document.querySelector(".medium").addEventListener("click", function () {
  changeDifficulty("medium");
});

document.querySelector(".hard").addEventListener("click", function () {
  changeDifficulty("hard");
});

document.querySelector(".again").addEventListener("click", function () {
  resetGame();
});

document.querySelector(".check").addEventListener("click", function () {
  const userGuess = Number(document.querySelector(".guess").value);
  // Confere se o input está vazio e se o usuario botou num dentro do range
  if (!userGuess || userGuess < 1 || userGuess > numberRange) {
    changeMessage(`Bote um número entre 1 e ${numberRange}!`);
  }

  // confere se o input do user está igual ao numero secreto
  else if (userGuess === secretNumber) {
    let currentScore = Math.trunc(userAttempts * scoreMultiplier);
    numElement.textContent = secretNumber;
    numElement.classList.add("win");
    changeMessage("Parabéns~ Você venceu!");
    document.querySelector("body").style.backgroundColor = "#66cdaa";
    document.querySelector(".check").disabled = true;
    if (currentScore > highScore) {
      highScore = currentScore;
      document.querySelector(".highscore").textContent = currentScore;
    }
  }

  //Quando o input do usuario for diferente do numero secreto
  else if (userGuess !== secretNumber) {
    changeMessage(
      userGuess > secretNumber
        ? "O número secreto é menor~"
        : "O número secreto é maior~"
    );
    userAttempts--;
    changeAttempts(userAttempts);

    if (userAttempts === 0) {
      changeMessage("Você perdeu :(");
      document.querySelector(".check").disabled = true;
    }
  }
});
