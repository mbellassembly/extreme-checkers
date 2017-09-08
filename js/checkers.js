$(document).ready(function() {

  function wtf() {
    return console.log("What the fuck");
  }
  console.log("document loaded");

  var $wrapper = $(".wrapper");
  var $table = $("<table>", {class: "gameboard"});
  var $thead = $("<thead>", {class: "thead"});
  var $tbody = $("<tbody>", {class: "tbody"});
  var $theadtr = $("<tr>", {class: "thead-tr"});
  var $theadth = $("<th>", {class: "thead-th"});
  var $tbodytr = $("<tr>", {class: "tbody-tr"});
  var $tbodyth = $("<tr>", {class: "tbody-th"});
  var $tbodytd = $("<td", {class: "tbody-td"});

  $(function() {
    generateBoard();
  });

  function generateBoard() {

    var rows = 9;
    var cols = 9;

    $wrapper.append($table.clone());
    $table.append($thead).append($tbody);
    $thead.append($theadtr);
    $tbody.append($tbodytr);

    // head X row
    for (var i = 0; i < cols; i++) {
      $theadtr.append($theadth.clone());
    }
    wtf();
    for (var i = 0; i < rows; i++) {
      $thisRow = $tbody.append($tbodytr.clone());
      console.log($thisRow);
      $thisRow.append($tbodyth.clone());
      for (var j = 0; j < cols-1; j++) {
        $thisRow.append($tbodytd.clone());
      }
    }
  }

});


    // thead tr th
    // tbody tr th td
