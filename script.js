// Gameboard as module
(function () {
  var Gameboard = {
    gameboard: ["", "", "", "", "", "", "", "", ""],
    init: function () {
      this.cacheDOM();
      this.createBoard();
      this.render();
      this.putSign();
    },
    cacheDOM: function () {
      this.board = document.getElementById("gameboard");
      this.cells = document.getElementsByClassName("board_cells");
    },
    createBoard: function () {
      for (let i = 0; i <= 9; i++) {
        const cell = document.createElement("div");
        this.board.append(cell);
        cell.className = "board_cells";
        cell.id = i;
      }
    },
    render: function () {
      for (const [index, value] of this.gameboard.entries()) {
        {
          this.cells[index].innerHTML = `<p>${value}</p>`;
        }
      }
    },
    putSign: function () {
      for (const cell of this.cells) {
        cell.addEventListener("click", () => {
          console.log(cell.id); //delete later
          this.gameboard[cell.id] = player1.sign;
          this.render();
        });
      }
    },
  };

  Gameboard.init();
})();

//create players with Factory function
const Player = (sign) => {
  const getSign = function () {
    return { sign };
  };

  return { getSign };
};

const player1 = Player("X");
const player2 = Player("O");
player1.getSign();
player2.getSign();
