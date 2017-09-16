$(document).ready(function() {

  $(".gamepiece").draggable({
    drag: function(event, ui) {
      if (game.player === "black") {
        if ($(this).hasClass("black-pawn") || $(this).hasClass("black-king")) {
          return true;
        } else {
          return false;
        }
      } else if (game.player === "red") {
        if ($(this).hasClass("red-pawn") || $(this).hasClass("red-king")) {
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
    stop: function(event, ui) {
      var target = game.currentMove.targetCell
      if (game.currentMove.validMove || game.currentMove.validJump) {
        updateGamePieceDataTo(target);
        if (game.currentMove.validJump) {
          game.currentMove.jumpedPiece.draggable("destroy");
          game.currentMove.jumpedPiece.hide("explode", 1000);
          $(".graveyard").append(game.currentMove.jumpedPiece.detach());
        }
        if (game.currentMove.moved) {
          if (game.currentMove.jumped) {
            if (additionalJumps()) {
              // DO NOTHING
            } else {
              var initial = $(game.currentMove.initial);
              console.log("jumped from " + [initial.data("letter"), initial.data("row")] + " to " + [target.data("letter"), target.data("row")]);
              switchTurn();
            }
          } else {
            var initial = $(game.currentMove.initial);
            console.log("moved from " + [initial.data("letter"), initial.data("row")] + " to " + [target.data("letter"), target.data("row")]);
            switchTurn();
          }
        }
      }
      if ($(this).hasClass("black") && $(this).data("row") === 1) {
        $(this).removeClass("pawn black-pawn").addClass("king black-king");
      } else if ($(this).hasClass("red") && $(this).data("row") === 8) {
        $(this).removeClass("pawn red-pawn").addClass("king red-king");
      }
      if (!$(ui.helper).draggable("option", "revert")) {
      }
      $(ui.helper).draggable("option", "revert", true);
    }
  });

  $(game.playableSquares).droppable({
    over: function(event, ui) {
      if (game.currentMove.currentPiece.hasClass("pawn")) {
        var validMoves = game.currentMove.validMoves.pawn;
        var validJumps = game.currentMove.validJumps.pawn;
      } else if (game.currentMove.currentPiece.hasClass("king")) {
        var validMoves = game.currentMove.validMoves.king;
        var validJumps = game.currentMove.validJumps.king;
      }

      var target = game.currentMove.target;
      target = {col: $(this).data("col"), row: $(this).data("row"), letter: $(this).data("letter")}
      game.currentMove.targetCell = $(this);
      game.currentMove.validMove = validMove(validMoves, target);
      game.currentMove.validJump = validJump(validJumps, target);
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

  $(game.gamepieces).on("dragstart", function(e) {
    $(this).css({
      "z-index": 1
    });
    if (game.currentMove.moved) {

    } else if ($(this).hasClass(game.player + "-gamepiece")) {
      game.currentMove.currentPiece = $(this);
      game.currentMove.initial = $(this).parent();
      getValidMoves();
      //$(this).detach();
    }
  });

  $(game.playableSquares).on("dragstop", function() {

  });

  $(".start-game").on("click", function() {
    // game.start = true;
    // $(".gamepiece").draggable("enable");
    // $(".red-pawn, .red-King").draggable("disable");
  });

  var switchTurn = function() {
    switch (game.player) {
      case "red":
        game.player = "black";
        break;
      case "black":
        game.player = "red";
        break;
    }
    resetCurrentMoveValues();
    $("caption h4").text(game.player.toUpperCase() + "'S TURN");
    // update turn heading under player's board heading
  }

});