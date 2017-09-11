$(document).ready(function() {

  function wtf() {
    return console.log("What the fuck");
  }
  console.log("document loaded");


  $(function() {
    buildHeader();
    buildMain();
    buildFooter();
    $('footer').append("<div>", {class: "gamepiece black-king"});

  });

  function generateBoard(player, cols, rows) {

    var getLetters = function(cols, reverse) {
      if (reverse) {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0,cols).reverse();
      } else {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0,cols);
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
      for (var j = 1; j < cols+1; j++) {
        var letters = 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0,cols)
        var $tbodytd = $("<td>", {class: "tbody-td"});
        $tbodytr.append($tbodytd);
        if (player === "black") {
          // reverses col for player black
          $tbodytd.attr("data-col", letters[Math.abs(j - cols)]);
        } else {
          $tbodytd.attr("data-col", letters[j]);
        }
        $tbodytd.attr("data-row", i+1);
      }
    }
  }

  function generateGamePieces() {
    // if black:
    // red rows = 1, 2, 3
    // black rows = 6, 7, 8
    var $table = $("table");
    var $trs = $table.find('tr');
    var $tdValid = $(".tbody-tr:nth-child(even) td:nth-child(odd), .tbody-tr:nth-child(odd) td:nth-child(even)");
    console.log($tdValid);
    $tdValid.each(function(index) {
      $this = $(this);
      $row = $this.data("row");
      $col = $this.data("col");
      if ($row === 1 || $row === 2 || $row === 3) {
        $this.wrapInner("<div class='gamepiece red-pawn'>");
      } else if ($row === 6 || $row === 7 || $row === 8) {
        $this.wrapInner("<div class='gamepiece black-pawn'>");
      }
    });
  }

  function dragAndDrop() {
    var $tdValid = $(".tbody-tr:nth-child(even) td:nth-child(odd), .tbody-tr:nth-child(odd) td:nth-child(even)");
    var $tdInvalid = $(".tbody-tr:nth-child(odd) td:nth-child(odd), .tbody-tr:nth-child(even) td:nth-child(even)");
    var outside = false;

    $(".gamepiece").draggable({
      revert: "invalid",
      cursor: "move"
    });

    $('tdbody-td').droppable();

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

  function buildHeader() {
    $header = $("header");
    $h1 = $("<h1>");
    $h1.text("LET'S PLAY SOME CHECKERS");
    $header.append($h1);
  }
  function buildMain() {
    var cols = 8;
    var rows = 8;
    generateBoard("black", cols, rows);
    // generateBoard("red", cols, rows);
    generateGamePieces();
    dragAndDrop();
  }
  function buildFooter() {
    $footer = $("footer");
    $h4 = $("<h4>");
    $h4.html("&copy;" + " Matthew Bell aka Foozie3Moons");
    $footer.append($h4);
  }

});
