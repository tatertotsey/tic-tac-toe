//Player Factory function
const Player = (sign, isActive, name) => {
  const getSign = function () {
    return sign;
  };

  const getName = function () {
    return name;
  };
  return { getSign, isActive, getName };
};

// Gameboard as module
const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const board = document.getElementById("gameboard");
  const cells = document.getElementsByClassName("board_cells");

  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      board.append(cell);
      cell.className = "board_cells";
      cell.id = i;
    }
  };
  const render = () => {
    for (const [index, value] of gameboard.entries()) {
      {
        cells[index].innerHTML = `<p>${value}</p>`;
      }
    }
  };
  return { gameboard, createBoard, render, board };
})();
Gameboard.createBoard();

//displayController as module
const displayController = (() => {
  const cells = document.getElementsByClassName("board_cells");

  const putSign = (player, pStatus) => {
    for (const cell of cells) {
      cell.addEventListener("click", () => {
        //make sure that other player cannot overwrite the sign of other player
        if (cell.innerText == "" && pStatus == true) {
          Gameboard.gameboard[cell.id] = player.getSign();
          Gameboard.render();
          GameLogic.checkWinner();
          pStatus = false;
        } else {
          pStatus = true;
        }
      });
    }
  };

  const reset = () => {};
  return { cells, putSign };
})();

// //gamelogic as module
const GameLogic = (() => {
  //create players here
  const player1 = Player("X", true, "I am X");
  const player2 = Player("O", false, "I am O");
  displayController.putSign(player1, true);
  displayController.putSign(player2, false);

  //3-in-a-row game
  const winConditions = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  //check winner
  const checkWinner = () => {
    //get DOM
    const winnerText = document.getElementById("winnerText");
    const modal = document.getElementById("modal");
    const p1Score = document.getElementById("player-score");
    const p2Score = document.getElementById("comp-score");
    const restartBtn = document.getElementById("restart");
    const cells = document.getElementById("gameboard").querySelectorAll("p");

    winConditions.forEach((condition) => {
      //map the gameboard, check the indexes
      const p1Wins = condition.every((r) =>
        Gameboard.gameboard
          .map((cel, i) => (cel === "X" ? i : null))
          .includes(r)
      );
      const p2Wins = condition.every((r) =>
        Gameboard.gameboard
          .map((cel, i) => (cel === "O" ? i : null))
          .includes(r)
      );

      if (p1Wins) {
        winnerText.innerText = "Player1 wins!";
        modal.style.display = "block";
        Gameboard.board.style.zIndex = "-1";
        p1Score.innerText += 1;
      }

      if (p2Wins) {
        winnerText.innerText = "Player2 wins!";
        modal.style.display = "block";
        Gameboard.board.style.zIndex = "-1";
        p2Score.innerText += 1;
      }
      if (Gameboard.gameboard.filter((x) => x == "").length == 0) {
        winnerText.innerText = "Draw!";
        modal.style.display = "block";
        Gameboard.board.style.zIndex = "-1";
      }
    });

    restartBtn.onclick = () => {
      modal.style.display = "none";
      p1Score.innerText = 0;
      p2Score.innerText = 0;
      Gameboard.board.style.zIndex = "1";

      for (let i = 0; i < Gameboard.gameboard.length; i++) {
        Gameboard.gameboard[i] = "";
      }
      Gameboard.render();
    };
  };
  return { checkWinner, winConditions };
})();
