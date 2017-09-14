$(document).ready(function() {

  console.log("document loaded");
  var game = {
    cols: 8,
    rows: 8,
    rowsOfPieces: 3,
    players: ["black"],
    player: "black",
    currentMove: {
      currentPiece: 0,
      initial: 0,
      target: {col: 0, letter: 0, row: 0},
      valid: false,
      validMoves: {
        pawn: {
          left: {col: 6, row: 5},
          right: {col: 4, row: 5},
        },
        king: {
          frontLeft: {col: 0, row: 0},
          frontRight: {col: 0, row: 0},
          backLeft: {col: 0, row: 0},
          backRight: {col: 0, row: 0},

        }
      },
      validJumps: {
        pawn: {
          left: {col: 0, row: 0},
          right: {col: 0, row: 0}
        },
        king: {
          frontLeft: {col: 0, row: 0},
          frontRight: {col: 0, row: 0},
          backLeft: {col: 0, row: 0},
          backRight: {col: 0, row: 0}
        }
      }
    }
  }

  if (localStorage.game === undefined) {
    localStorage.game = JSON.stringify(game);
  }

  function wtf(isThis) {
    ಠ_ಠ = JSON.stringify(isThis, null, 1);
    return console.log("Wtf is " + ಠ_ಠ);
  }

  $(function() {
    buildHeader();
    buildMain();
    buildFooter();
  });

  function buildHeader() {
    $header = $("header");
    $h1 = $("<h1>");
    $p = $("<p>");
    $aiButton = $("<button>", {class: "vsAi"});
    $h1.text("EXTREME CHECKERS");
    $p.text("SELECT YOUR GAME-MODE");
    $aiButton;
    $header.append($h1);
    $header.append($p);
  }
  function buildMain() {
    game.players.forEach(function(player) {
      generateBoard(player, game.cols, game.rows);
    });
    generateGamePieces();
  }
  function buildFooter() {
    $footer = $("footer");
    $h4 = $("<h4>");
    $h4.html("&copy;" + " Matthew Bell aka Foozie3Moons");
    $footer.append($h4);
  }

  // everything above this line is good

  function generateBoard(player, cols, rows) {

    var getLetters = function(cols, reverse) {
      if (reverse) {
        return "abcdefghijklmnopqrstuvwxyz".split("").slice(0,cols).reverse();
      } else {
        return "abcdefghijklmnopqrstuvwxyz".split("").slice(0,cols);
      }
    }

    var $main = $("main");
    var $table = $("<table>", {class: "gameboard " + player});
    var $caption = $("<caption>");
    var $thead = $("<thead>", {class: "thead"});
    var $tbody = $("<tbody>", {class: "tbody"});
    var $theadtr = $("<tr>", {class: "thead-tr"});

    $main.append($table);
    $table.append($caption);
    $caption.append($("<h2>" + player.toUpperCase() + "'S BOARD</h2>"));
    $table.append($thead).append($tbody);
    $thead.append($theadtr);
    $tbody.append($tbodytr);

    if (player === "black") {
      for (var i = 0; i < cols + 1; i++) {
        var $theadth = $("<th>", {class: "thead-th"});
        $theadtr.append($theadth);
        var letters = getLetters(cols, true);
        if (i !== 0) {
          $theadth.text(letters[i-1]);
        }
      }
    } else if (player === "red") {
      for (var i = 0; i < cols + 1; i++) {
        var $theadth = $("<th>", {scope: "col", class: "thead-th"});
        $theadtr.append($theadth);
        var letters = getLetters(cols, false);
        if (i !== 0) {
          $theadth.text(letters[i-1]);
        }
      }
    }

    for (var i = 0; i < rows; i++) {
      var $tbodytr = $("<tr>", {class: "tbody-tr"});
      var $tbodyth = $("<th>", {scope: "row", class: "tbody-th"});
      $tbody.append($tbodytr);
      $tbodytr.append($tbodyth);
      if (player === "red") {
        var revI = cols - i;
        $tbodyth.text(revI);
      } else {
        $tbodyth.text(i+1);
      }
      for (let j = 1; j < cols + 1; j++) {
        var letters = "abcdefghijklmnopqrstuvwxyz".split("").slice(0,cols)
        var $tbodytd = $("<td>", {class: "tbody-td"});
        $tbodytr.append($tbodytd);
        if (player === "black") {
          // reverses col for player black
          $tbodytd.attr("data-letter", letters[Math.abs(j - cols)]);
          $tbodytd.attr("data-col", Math.abs(j - cols - 1));
        } else {
          $tbodytd.attr("data-letter", letters[j-1]);
          $tbodytd.attr("data-col", j - 2);
        }
        if (player === "red") {
          // reverses row for player red
          $tbodytd.attr("data-row", Math.abs(i - rows));
        } else {
          $tbodytd.attr("data-row", i+1);
        }
      }
    }
  }

  function generateGamePieces() {
    var $table = $("table");
    var $trs = $table.find("tr");
    var $tdValid = $(".tbody-tr:nth-child(even) td:nth-child(odd), .tbody-tr:nth-child(odd) td:nth-child(even)");
    $tdValid.each(function(index) {
      // TODO: dynamically generate from game.rowsOfPieces
      $this = $(this);
      $row = $this.data("row");
      $col = $this.data("col");
      if ($row === 1 || $row === 2 || $row === 3) {
        $this.wrapInner("<div class='gamepiece pawn red-gamepiece red-pawn'>");
      } else if ($row === 6 || $row === 7 || $row === 8) {
        $this.wrapInner("<div class='gamepiece pawn black-gamepiece black-pawn'>");
      }
    });
    $gamepieces = $(".gamepiece");
    $gamepieces.each(function() {
      $this = $(this);
      $thisParent = $this.parent();
      $this.data("col", $thisParent.data("col"));
      $this.data("letter", $thisParent.data("letter"));
      $this.data("row", $thisParent.data("row"));
    });

    function takeTurn($elem) {
      // check current move against valid moves
      // set player if legal move
      // set draggable gamepieces if legal move

      var initial = game.currentMove.initial;
      var target = game.currentMove.target;

    }

    function getValidMoves() {
      var currentPiece = game.currentMove.currentPiece;
      if (game.player === "black") {
        if (currentPiece.hasClass("black-pawn")) {
          var pawn = game.currentMove.validMoves.pawn;
          pawn.right = {col: currentPiece.data("col") - 1, row: currentPiece.data("row") - 1};
          pawn.left = {col: currentPiece.data("col") + 1, row: currentPiece.data("row") - 1};
          return pawn;
        } else if ($currentPiece.hasClass("black-king")) {
          var king = game.currentMove.validMoves.king;
          // king.frontRight = {col: , row:};
          // king.frontLeft = {col: , row:};
          // king.backRight = {col: , row:};
          // king.backLeft = {col: , row:};
          return king;
        }
      }
      // else if (game.player === "red") {
      //   if ($elem.hasClass("red-pawn")) {
      //     var initial = game.currentMove.initial;
      //     var pawn = game.currentMove.validMoves.pawn;
      //     pawn.right = {col: initial.col - 1, row: initial.row + 1};
      //     pawn.left = {col: initial.col + 1, row: initial.row + 1};
      //     return pawn;
      //   } else if ($elem.hasClass("red-king")) {
      //     var king = game.currentMove.ValidMoves.king;
      //     // king.frontRight = {col: , row:};
      //     // king.frontLeft = {col: , row:};
      //     // king.backRight = {col: , row:};
      //     // king.backLeft = {col: , row:};
      //     return king;
      //   }
      // } else {
      //   console.log("did nothing");
      // }
    }

    // EVENTS
    // 1. Dragstart
    $gamepieces.on("mousedown", function() {
      game.currentMove.currentPiece = $(this);
      game.currentMove.initial = $(this).parent();
      getValidMoves();
      $(this).detach();
    });

    // 2. Hover
    //    Log target
    //    Compare target with Valid Moves
    $tdValid.hover(function() {
      var validMoves = game.currentMove.validMoves.pawn
      var target = game.currentMove.target
      target = {col: $(this).data("col"), row: $(this).data("row"), letter: $(this).data("letter")}
      var validMove = function() {
        for (var move in validMoves) {
          // console.log([validMoves[move].col, validMoves[move].row])
          // console.log([target.col, target.row])
          if (validMoves[move].col === target.col && validMoves[move].row === target.row) {
            wtf("did something");
            return true;
          }
        }
        return false;
      }
      game.currentMove.valid = validMove();
    })

    // 4. Dragstop
    //    This will fire if dropped

    $tdValid.on("mouseup", function() {
      if (game.currentMove.valid) {
        piece = game.currentMove.currentPiece;
        piece.data("col", $(this).data("col"));
        piece.data("row", $(this).data("row"));
        piece.data("letter", $(this).data("letter"));
        $(this).append(game.currentMove.currentPiece);
      } else {
        wtf(game.currentMove.validMoves.pawn);
        game.currentMove.initial.append(game.currentMove.currentPiece);
      }
      game.currentMove.currentPiece = 0;
      console.log($(this).data("letter"), $(this).data("row"));
    });

  }

});
