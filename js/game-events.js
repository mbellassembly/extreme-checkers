$(document).ready(function() {
  fireEvents();
  function fireEvents() {

  }
  $(".gamepiece").draggable({
    drag: function(event, ui) {
      if (game.player === "black") {
        if ($(this).hasClass("black")) {
          return true;
        } else {
          return false;
        }
      } else if (game.player === "red") {
        if ($(this).hasClass("red")) {
          return true;
        } else {
          return false;
        }
      }
    },
    cursor: "move",
    containment: ".tdbody",
    scroll: false,
    revert: true,
    start: function(event, ui) {
      startHandler(this);
    },
    stop: function(event, ui) {
      stopHandler(this, ui);
    }
  });

  $("td").droppable({
    over: function(event, ui) {
      if (game.currentMove.currentPiece.hasClass("pawn")) {
        var validMoves = game.currentMove.validMoves.pawn;
        var validJumps = game.currentMove.validJumps.pawn;
      } else if (game.currentMove.currentPiece.hasClass("king")) {
        var validMoves = game.currentMove.validMoves.king;
        var validJumps = game.currentMove.validJumps.king;
      }
      var target = {col: $(this).data("col"), row: $(this).data("row"), letter: $(this).data("letter")};
      game.currentMove.validMove = validMove(validMoves, target);
      game.currentMove.validJump = validJump(validJumps, target)
      game.currentMove.target = target;
      game.currentMove.targetCell = $(this);
      // console.log("over something");
    },
    drop: function(event,ui) {
      $this = $(this);

      if ($this.find(".gamepiece").length > 0) {
        // console.log("nope!");
        return false;
      } else if (game.currentMove.validMove || game.currentMove.validJump) {
        ui.draggable.draggable("option", "revert", false);
        var $this = $(this);

        // $this.addClass("ui-state-highlight");

        $this.append(ui.draggable);

        var width = $this.width();
        var height = $this.height();

        var cntrLeft = width / 2 - ui.draggable.width() / 2;// + left;
        var cntrTop = height / 2 - ui.draggable.height() / 2;// + top;

        ui.draggable.css({
            left: cntrLeft + "px",
            top: cntrTop + "px",
            "z-index": 0
        });
      } else {

      }
    }
  });

  $(".reset").on("click", function() {
    resetBoard();
  });

  $(".vsai").on("click", function() {
    // TODO: add AI
  });

  $(".start").on("click", function() {
    game.start = true;
    $(".gamepiece").draggable("enable");
    $(".red-pawn, .red-King").draggable("disable");
  });



});
