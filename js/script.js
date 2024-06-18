"use strict";

const numElement = document.querySelector(".number");
let secretNumber = randomNumber();
let userScore = 20;
let highScore = 0;

function randomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function changeMessage(message) {
  document.querySelector(".message").textContent = message;
}

function changeScore(score) {
  document.querySelector(".score").textContent = score;
}

document.querySelector(".again").addEventListener("click", function () {
  userScore = 20;
  changeScore(userScore);
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
  changeMessage("Comece a advinhar~");
  secretNumber = randomNumber();
});

document.querySelector(".check").addEventListener("click", function () {
  const userGuess = Number(document.querySelector(".guess").value);
  // Confere se o usuario botou um numero
  if (!userGuess || userGuess > 20) {
    changeMessage(">Numero entre 1 e 20.");
  }
  // confere se o input do user está igual ao numero secreto
  else if (userGuess === secretNumber) {
    numElement.textContent = secretNumber;
    numElement.classList.add("win");
    changeMessage("Parabéns~ Você venceu!");
    document.querySelector("body").style.backgroundColor = "#17a2b8";
    document.querySelector(".check").disabled = true;
    if (userScore > highScore) {
      highScore = document.querySelector(".highscore").textContent = userScore;
    }
  }

  //Quando o input do usuario for diferente do numero secreto
  else if (userGuess !== secretNumber) {
    if (userScore > 1) {
      changeMessage(
        userGuess > secretNumber
          ? "O número secreto é menor~"
          : "O número secreto é maior~"
      );
      userScore--;
      changeScore(userScore);
    } else {
      changeMessage("Você perdeu :(");
      changeScore(0);
    }
  }
});
