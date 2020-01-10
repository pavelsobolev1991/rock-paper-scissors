//DOM-elements
const choices = document.querySelectorAll(".choice"); //put all choices in an array
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");

const scoreboard = {
  player: 0,
  computer: 0
};

//Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

//Event Listeners
choices.forEach(choice => choice.addEventListener("click", play)); //When a user click on a choice icon play function is invoked
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);

//Play game
function play(e) {
  restart.style.display = "inline-block"; //when a user click on an icon, the function changes styles of the restart button
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

//Get computers choice
function getComputerChoice() {
  const number = Math.random();
  if (number < 0.34) {
    return "rock";
  } else if (number <= 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
}
//Get Winner
function getWinner(p, c) {
  if (p === c) {
    return "draw";
  } else if (p === "rock") {
    if (c === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "paper") {
    if (c === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "scissors") {
    if (c === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

//Show Winner
function showWinner(winner, computerChoice) {
  if (winner === "player") {
    // Inc player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else if (winner === "computer") {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  }

  //Show score
  score.innerHTML = `
   <p>Player:${scoreboard.player}</p>
   <p>Player:${scoreboard.computer}</p>
  `;

  modal.style.display = "block";
}
