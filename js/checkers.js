$(document).ready(function() {

  function wtf() {
    return console.log("What the fuck");
  }
  console.log("document loaded");


  $(function() {
    buildHeader();
    buildMain();
    buildFooter();
  });

  function generateBoard(player, cols, rows) {

    var $main = $("main");
    var $table = $("<table>", {class: "gameboard " + player});
    var $caption = $("<caption>");
    var $thead = $("<thead>", {class: "thead"});
    var $tbody = $("<tbody>", {class: "tbody"});
    var $theadtr = $("<tr>", {class: "thead-tr"});

    $main.append($table);
    $table.append($caption);
    $caption.append($("<h2>" + player + "'s board</h2>"));
    $table.append($thead).append($tbody);
    $thead.append($theadtr);
    $tbody.append($tbodytr);

    // head X row
    for (var i = 0; i < cols + 1; i++) {
      var letters = 'abcdefghijklmnopqrstuvwxyz'.split('').slice(0,cols)
      var $theadth = $("<th>", {class: "thead-th"});
      $theadtr.append($theadth);
      if (player === "black") {
        letters = letters.reverse();
      }
      if (i !== 0) {
        $theadth.text(letters[i-1]);
      }
    }

    for (var i = 0; i < rows; i++) {
      var $tbodytr = $("<tr>", {class: "tbody-tr"});
      var $tbodyth = $("<th>", {class: "tbody-th"});
      $tbody.append($tbodytr);
      $tbodytr.append($tbodyth);
      if (player === "red") {
        var revI = cols - i;
        $tbodyth.text(revI);
      } else {
        $tbodyth.text(i+1);
      }
      for (var j = 0; j < cols; j++) {
        var $tbodytd = $("<td>", {class: "tbody-td"});
        $tbodytr.append($tbodytd);
      }
    }
  }

  function addPieces() {
    var $table = $("<table>", {class: "gameboard " + player});
    var $trs = $table.find('tr');
    for (let i = 0; i < $trs.length; i++) {
      $table.find('tr').each(function (i, el) {
        var $tds = $(this).find('td');

      });
    }
      var $tds = $(this).find('td');
      $td.data("col", i);
      // do something with productId, product, Quantity
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
    generateBoard("red", cols, rows);
    addPieces();
  }
  function buildFooter() {
    $footer = $("footer");
    $h4 = $("<h4>");
    $h4.html("<sup>&copy;</sup>" + " Matthew Bell");
    $footer.append($h4);
  }

});
