//create players with Factory function
const Player = (sign, isActive) => {
  const getSign = function () {
    return sign;
  };
  return { getSign, isActive };
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

//displayController as module
const displayController = (() => {
  Gameboard.createBoard();

  const cells = document.getElementsByClassName("board_cells");

  const putSign = (player, pStatus) => {
    for (const cell of cells) {
      cell.addEventListener("click", () => {
        if (pStatus == true) {
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

const player1 = Player("X", true);
const player2 = Player("0", false);
displayController.putSign(player1, true);
displayController.putSign(player2, false);

//gamelogic needed to stop overwriting on the gameboard
