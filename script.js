//Player Factory function
const Player = (sign, isActive, name) => {
  const getSign = function () {
    return sign;
  };

  const getName = function () {
    return name;
  };
  return { getSign, isActive, name };
};

// Gameboard as module
const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const board = document.getElementById("gameboard");
  const cells = document.getElementsByClassName("board_cells");

  const createBoard = () => {
    for (let i = 0; i <= 9; i++) {
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
  return { gameboard, createBoard, render };
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
          pStatus = false;
        } else {
          pStatus = true;
        }
      });
    }
  };
  return { putSign };
})();

// //gamelogic as Factory Function
const GameLogic = () => {
  //create players here
  const player1 = Player("X", true, "I am X");
  const player2 = Player("0", false, "I am Y");
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

  //check rows

  //put scores

  //check game is over
};

const game = GameLogic();
