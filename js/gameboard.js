function buildHeader() {
  $header = $("header");
  $h1 = $("<h1>");
  $p = $("<p>");
  $start = $("<button>", {text: "START GAME", class: "start ui-button ui-widget ui-corner-all"});
  $reset = $("<button>", {text: "RESET GAME", class: "reset ui-button ui-widget ui-corner-all"});
  $playAI = $("<button>", {text: "PLAY AI", class: "vsai ui-button ui-widget ui-corner-all"});
  $h1.text("CHECKERS");
  $header.append($h1);
  $header.append($p);
  $header.append($start).append($reset).append($playAI);
}
function buildMain() {
  game.players.forEach(function(player) {
    generateBoard(player, game.gameboard.cols, game.gameboard.rows);
  });
}
function buildFooter() {
  $footer = $("footer");
  $h4 = $("<h4>");
  $h4.html("&copy;" + " 2017 - FOOZIE3MOONS - MATTHEW BELL");
  $footer.append($h4);
}

function generateBoard(player, cols, rows) {

  // this is built for a two-board game eventually (you can build a second board
  // by adding the red player to the game.players array), but right now really
  // only supports a one board game.

  var getLetters = function(cols, reverse) {
    if (reverse) {
      return "abcdefghijklmnopqrstuvwxyz".split("").slice(0,cols).reverse();
    } else {
      return "abcdefghijklmnopqrstuvwxyz".split("").slice(0,cols);
    }
  }

  var $main = $("main");
  var $table = $("<table>", {class: "gameboard gameboard-" + player});
  var $caption = $("<caption>");
  var $thead = $("<thead>", {class: "thead"});
  var $tbody = $("<tbody>", {class: "tbody"});
  var $theadtr = $("<tr>", {class: "thead-tr"});
  var $graveyard = $("<div>", {class: "graveyard"});

  $main.append($table);
  $table.append($caption);
  $table.append($thead).append($tbody);
  $thead.append($theadtr);
  $tbody.append($tbodytr);
  $main.append($graveyard);

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
    // TODO: use rowsOfPieces to set how many pieces get generated
    // if this gets implemented, will need to update win condition (currently
    // statically set to 12 pieces).
    $this = $(this);
    $row = $this.data("row");
    $col = $this.data("col");
    if ($row === 1 || $row === 2 || $row === 3) {
      $this.wrapInner("<div class='gamepiece red pawn'>");
    } else if ($row === 6 || $row === 7 || $row === 8) {
      $this.wrapInner("<div class='gamepiece black pawn'>");
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
}
