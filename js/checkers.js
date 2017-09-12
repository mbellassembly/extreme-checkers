$(document).ready(function() {

  console.log("document loaded");
  var game = {
    cols: 8,
    rows: 8,
    rowsOfPieces: 3,
    players: ["black", "red"],
    player: "black",
    currentMove: {
      prevPos: {col: 0, row: 0},
      nextPos: {col: 0, row: 0},
      validMoves: {
        pawn: {
          left: {col: 0, row: 0},
          right: {col: 0, row: 0},
          jumpLeft: {col: 0, row: 0},
          jumpRight: {col: 0, row: 0}
        },
        king: {
          frontLeft: {col: 0, row: 0},
          frontRight: {col: 0, row: 0},
          backLeft: {col: 0, row: 0},
          backRight: {col: 0, row: 0},
          jumpFrontLeft: {col: 0, row: 0},
          jumpFrontRight: {col: 0, row: 0},
          jumpBackLeft: {col: 0, row: 0},
          jumpBackRight: {col: 0, row: 0}
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
    dragAndDrop();
    startGame();
  }
  function buildFooter() {
    $footer = $("footer");
    $h4 = $("<h4>");
    $h4.html("&copy;" + " Matthew Bell aka Foozie3Moons");
    $footer.append($h4);
  }

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

    // head X row

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
          $tbodytd.attr("data-col", letters[Math.abs(j - cols)]);
        } else {
          $tbodytd.attr("data-col", letters[j-1]);
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
    // if black:
    // red rows = 1, 2, 3
    // black rows = 6, 7, 8
    var $table = $("table");
    var $trs = $table.find("tr");
    var $tdValid = $(".tbody-tr:nth-child(even) td:nth-child(odd), .tbody-tr:nth-child(odd) td:nth-child(even)");
    $tdValid.each(function(index) {
      $this = $(this);
      $row = $this.data("row");
      $col = $this.data("col");
      if ($row === 1 || $row === 2 || $row === 3) {
        $this.wrapInner("<div class='gamepiece red-gamepiece red-pawn'>");
      } else if ($row === 6 || $row === 7 || $row === 8) {
        $this.wrapInner("<div class='gamepiece black-gamepiece black-pawn'>");
      }
    });
    $gamepieces = $(".gamepiece");
    $gamepieces.each(function() {
      $this = $(this);
      // console.log(this);
      $thisParent = $this.parent();
      $this.data("col", $thisParent.data("col"));
      $this.data("row", $thisParent.data("row"));
      //
      // console.log("Parent:");
      // console.log($thisParent[0])
      // console.log($thisParent.data("col"));
      // console.log($thisParent.data("row"));
      // console.log("Child:");
      // console.log($this[0])
      // console.log($this.data("col"));
      // console.log($this.data("row"));
      // wtf("Gamepiece: " + $this.className.split(/\s+/) + ", Col: " + $this.data("col") + ", Row: " + $this.data("row"));
    });
  }

  function startGame() {
    $gamepieces = $(".gamepiece");
    $gamepieces.on("dragstart", function() {
      $this = $(this);
      prev = game.currentMove.prevPos;
      prev.col = $this.data("col");
      prev.row = $this.data("row")
    })

    $gamepieces.on( "dragstop", function( event, ui ) {
      $this = $(this);
      $thisParent = $this.parent();
      $this.data("col", $thisParent.data("col"));
      $this.data("row", $thisParent.data("row"));
      next = game.currentMove.nextPos;
      next.col = $this.data("col");
      next.row = $this.data("row");
      console.log("prev:");
      wtf(prev);
      console.log("next:");
      wtf(next);
      generateValidMoves();
      var validMoves = game.currentMove.validMoves;
      takeTurn(prev, next, validMoves);
    });

    function takeTurn(prev, next) {
      if (prev.col === next.col && prev.row === next.row) {
        alert("no move attempted")
      } else {
        alert("moved from: " + [prev.col, prev.row] + " to: " + [next.col, next.row]);
        for (var key in )
      }
      $redPieces = $(".red-gamepiece");
      $redBoard = $(".red .gamepiece");
      $blackPieces = $(".black-gamepiece");
      $blackBoard = $(".black .gamepiece");
      // if (game.player === "black") {
      //   $redBoard.draggable("disable");
      //   $blackBoard.draggable("enable");
      //   $redPieces.draggable("disable");
      // } else if (game.player === "red") {
      //   $blackBoard.draggable("disable");
      //   $redBoard.draggable("enable");
      //   $blackPieces.draggable("disable");
      // }
      if (game.player === "red") {
        game.player = "black";
      } else if (game.player === "black") {
        game.player = "red";
      }
    }
  }

  function dragAndDrop() {
    var $tdValid = $(".tbody-tr:nth-child(even) td:nth-child(odd), .tbody-tr:nth-child(odd) td:nth-child(even)");
    var $tdInvalid = $(".tbody-tr:nth-child(odd) td:nth-child(odd), .tbody-tr:nth-child(even) td:nth-child(even)");
    var outside = false;
    $(".gamepiece").draggable({
      revert: "invalid",
      cursor: "move"
    });

    $("tdbody-td").droppable();

    $(".gamepiece").droppable({});

    $tdValid.droppable({
      accept: ".gamepiece",
      drop: function(event, ui) {

        var $this = $(this);
        $this.append(ui.draggable);

        var width = $this.width();
        var height = $this.height();

        var cntrLeft = width / 2 - ui.draggable.width() / 2;// + left;
        var cntrTop = height / 2 - ui.draggable.height() / 2;// + top;

        ui.draggable.css({
            left: cntrLeft + "px",
            top: cntrTop + "px"
        });
      },
    });

  }

});
