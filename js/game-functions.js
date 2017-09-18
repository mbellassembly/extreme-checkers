// start and reset logic

function start() {
  game.start = true;
  var $h2 = $("<h2>", {text: game.player.toUpperCase() + "'S TURN"});
  if ($("caption").find("h2").length === 0) {
    $("caption").append($h2);
  }
  generateGamePieces();
  $(".gamepiece").draggable({
    drag: function(event, ui) {
      return dragHandler(this, ui);
    },
    cursor: "move",
    containment: ".tdbody",
    scroll: false,
    revert: true,
    start: function(event, ui) {
      startHandler(this, ui);
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
    },
    drop: function(event,ui) {
      var $this = $(this);

      if ($this.find(".gamepiece").length > 0) {
        // console.log("nope!");
        return false;
      } else if (game.currentMove.validMove || game.currentMove.validJump) {
        ui.draggable.draggable("option", "revert", false);

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
        if (game.currentMove.validMove) {
          game.currentMove.moved = true;
        } else if (game.currentMove.validJump) {
          game.currentMove.moved = true;
          game.currentMove.jumped = true;
        }
      } else {

      }
    }
  });
}

function reset() {
  if (game.start) {
    $(".gamepiece").remove();
    generateGamePieces();
    game.player = "black";
    $("caption h2").text(game.player.toUpperCase() + "'S TURN")
    $(".gamepiece").draggable({
      drag: function(event, ui) {
        return dragHandler(this, ui);
      },
      cursor: "move",
      containment: ".tdbody",
      scroll: false,
      revert: true,
      start: function(event, ui) {
        startHandler(this, ui);
      },
      stop: function(event, ui) {
        stopHandler(this, ui);
      }
    });
  }
}

// valid move/jump logic

function getValidMoves() {
  var currentPiece = game.currentMove.currentPiece;
  var player = game.player;
  if (currentPiece.hasClass("pawn")) {
    var pawn = game.currentMove.validMoves.pawn;
    var pawnJump = game.currentMove.validJumps.pawn;
    if (player === "black") {
      pawn.right = {
        col: currentPiece.data("col") - 1,
        row: currentPiece.data("row") - 1,
      };
      pawn.left = {
        col: currentPiece.data("col") + 1,
        row: currentPiece.data("row") - 1
      };
      pawnJump.right = {
        col: currentPiece.data("col") - 2,
        row: currentPiece.data("row") - 2,
        jumpedPiece: {
          col: currentPiece.data("col") - 1,
          row: currentPiece.data("row") - 1
        }
      };
      pawnJump.left = {
        col: currentPiece.data("col") + 2,
        row: currentPiece.data("row") - 2,
        jumpedPiece: {
          col: currentPiece.data("col") + 1,
          row: currentPiece.data("row") - 1
        }
      };
    } else if (player === "red") {
      pawn.right = {
        col: currentPiece.data("col") - 1,
        row: currentPiece.data("row") + 1
      };
      pawn.left = {
        col: currentPiece.data("col") + 1,
        row: currentPiece.data("row") + 1
      };
      pawnJump.right = {
        col: currentPiece.data("col") - 2,
        row: currentPiece.data("row") + 2,
        jumpedPiece: {
          col: currentPiece.data("col") - 1,
          row: currentPiece.data("row") + 1
        }
      };
      pawnJump.left = {
        col: currentPiece.data("col") + 2,
        row: currentPiece.data("row") + 2,
        jumpedPiece: {
          col: currentPiece.data("col") + 1,
          row: currentPiece.data("row") + 1
        }
      };
    }
  } else if (currentPiece.hasClass("king")) {
    var king = game.currentMove.validMoves.king;
    var kingJump = game.currentMove.validJumps.king;
    if (player === "black") {
      king.frontRight = {
        col: currentPiece.data("col") - 1,
        row: currentPiece.data("row") - 1
      };
      king.frontLeft = {
        col: currentPiece.data("col") + 1,
        row: currentPiece.data("row") - 1
      };
      king.backRight = {
        col: currentPiece.data("col") - 1,
        row: currentPiece.data("row") + 1
      };
      king.backLeft = {
        col: currentPiece.data("col") + 1,
        row: currentPiece.data("row") + 1
      };
      kingJump.frontRight = {
        col: currentPiece.data("col") - 2,
        row: currentPiece.data("row") - 2,
        jumpedPiece: {
          col: currentPiece.data("col") - 1,
          row: currentPiece.data("row") - 1
        }
      };
      kingJump.frontLeft = {
        col: currentPiece.data("col") + 2,
        row: currentPiece.data("row") - 2,
        jumpedPiece: {
          col: currentPiece.data("col") + 1,
          row: currentPiece.data("row") - 1
        }
      };
      kingJump.backRight = {
        col: currentPiece.data("col") - 2,
        row: currentPiece.data("row") + 2,
        jumpedPiece: {
          col: currentPiece.data("col") - 1,
          row: currentPiece.data("row") + 1
        }
      };
      kingJump.backLeft = {
        col: currentPiece.data("col") + 2,
        row: currentPiece.data("row") + 2,
        jumpedPiece: {
          col: currentPiece.data("col") + 1,
          row: currentPiece.data("row") + 1
        }
      };
    } else if (player === "red") {
      king.frontRight = {
        col: currentPiece.data("col") - 1,
        row: currentPiece.data("row") + 1
      };
      king.frontLeft = {
        col: currentPiece.data("col") + 1,
        row: currentPiece.data("row") + 1
      };
      king.backRight = {
        col: currentPiece.data("col") - 1,
        row: currentPiece.data("row") - 1
      };
      king.backLeft = {
        col: currentPiece.data("col") + 1,
        row: currentPiece.data("row") - 1
      };
      kingJump.frontRight = {
        col: currentPiece.data("col") - 2,
        row: currentPiece.data("row") + 2,
        jumpedPiece: {
          col: currentPiece.data("col") - 1,
          row: currentPiece.data("row") + 1
        }
      };
      kingJump.frontLeft = {
        col: currentPiece.data("col") + 2,
        row: currentPiece.data("row") + 2,
        jumpedPiece: {
          col: currentPiece.data("col") - 1,
          row: currentPiece.data("row") - 1
        }
      };
      kingJump.backRight = {
        col: currentPiece.data("col") - 2,
        row: currentPiece.data("row") - 2,
        jumpedPiece: {
          col: currentPiece.data("col") - 1,
          row: currentPiece.data("row") - 1
        }
      };
      kingJump.backLeft = {
        col: currentPiece.data("col") + 2,
        row: currentPiece.data("row") - 2,
        jumpedPiece: {
          col: currentPiece.data("col") + 1,
          row: currentPiece.data("row") - 1
        }
      };
    }
  }
}

var validMove = function(validMoves, target) {
  for (var move in validMoves) {
    if (validMoves[move].col === target.col && validMoves[move].row === target.row) {
      if (game.currentMove.targetCell.find($(".gamepiece")).length > 0) {
        if (game.currentMove.targetCell.find($(".gamepiece") === $(".ui.dragging"))) {
          // "valid move"
          return true;
        } else {
          // "move target cell is occupied"
          return false;
        }
      }
      // "valid move"
      return true;
    }
  }
  // "not a valid move: [target.letter, target.row]"
  return false;
}

var validJump = function(validJumps, target) {
  for (var jump in validJumps) {
    if (validJumps[jump].col === target.col && validJumps[jump].row === target.row) {
      var $jumpedPiece = $("td[data-col="+validJumps[jump].jumpedPiece.col+"][data-row="+validJumps[jump].jumpedPiece.row+"]");
      var $gamePiece = $jumpedPiece.find($(".gamepiece"));
      if (game.currentMove.targetCell.find($(".gamepiece")).length > 0) {
        // "jump target cell is occupied"
        return false;
      } else if ($gamePiece.length===1) {
        if ($gamePiece.hasClass(game.player)) {
          // "cannot jump own piece"
          return false
        } else {
          game.currentMove.jumpedPiece = $gamePiece;
          return true;
        }
      }
      // "no jumpable piece at [$jumpedPiece.data('letter'), $jumpedPiece.data('row')]"
      return false;
    }
  }
  return false;
}

// end turn logic

function updateGamePieceDataTo(thistd) {
  piece = game.currentMove.currentPiece;
  piece.data("col", $(thistd).data("col"));
  piece.data("row", $(thistd).data("row"));
  piece.data("letter", $(thistd).data("letter"));
  $(thistd).append(game.currentMove.currentPiece);
}

function resetCurrentMoveValues() {
  game.currentMove.moved = false;
  game.currentMove.jumped = false;
  game.currentMove.initial = 0;
  game.currentMove.currentPiece = $("");
  resetValidMoves();
}

function resetValidMoves() {
  var valid = game.currentMove.validMoves
  for (moveType in valid) {
    if (!valid.hasOwnProperty(moveType)) continue;
    var moveType = valid[moveType];
    for (var move in moveType) {
      if (!moveType.hasOwnProperty(move)) continue;
      moveType[move] = -1;
    }
  }
}

function switchTurn() {
  switchPlayer();
  if (gameover()) {
    switchPlayer();
    gameoverModal();
  } else {
    $("caption h2").text(game.player.toUpperCase() + "'S TURN");
    resetCurrentMoveValues();
  }
}

function switchPlayer() {
  switch (game.player) {
    case "red":
      game.player = "black";
      break;
    case "black":
      game.player = "red";
      break;
  }
}


function gameover() {
  if ($(".graveyard").find("."+game.player).length === 12) {
    return true;
  }
  return false;
}

// jQuery UI Draggable Handlers

function dragHandler(gamepiece, ui) {
  if (game.player === "black") {
    if ($(gamepiece).hasClass("black")) {
      return true;
    } else {
      return false;
    }
  } else if (game.player === "red") {
    if ($(gamepiece).hasClass("red")) {
      return true;
    } else {
      return false;
    }
  }
}

function startHandler(gamepiece, ui) {
  game.currentMove.initialCell = $(gamepiece).parent();
  $(gamepiece).css({
    "z-index": 1
  });
  if (game.currentMove.moved && !game.currentMove.jumped) {
    // "already moved"
  } else {
    game.currentMove.currentPiece = $(gamepiece);
    getValidMoves();
  }
}

function stopHandler(gamepiece, ui) {
  if ($(gamepiece).draggable("option", "revert")) {
    // does nothing, reverts
  }
  else {
    var target = game.currentMove.targetCell;
    var initial = game.currentMove.initialCell;
    if (game.currentMove.validMove || game.currentMove.validJump) {
      updateGamePieceDataTo(target);
      if (game.currentMove.validJump) {
        game.currentMove.jumpedPiece.hide("explode", 1000);
        $(".graveyard").append(game.currentMove.jumpedPiece.detach());
      }
      if (game.currentMove.moved) {
        if (game.currentMove.jumped) {
            console.log(game.player + " jumped from " + [initial.data("letter"), initial.data("row")] + " to " + [target.data("letter"), target.data("row")]);
            switchTurn();
          // }
        } else {
          console.log(game.player + " moved from " + [initial.data("letter"), initial.data("row")] + " to " + [target.data("letter"), target.data("row")]);
          switchTurn();
        }
      }
    }
    if ($(gamepiece).hasClass("black") && $(gamepiece).data("row") === 1) {
      $(gamepiece).removeClass("pawn black-pawn").addClass("king black-king");
    } else if ($(gamepiece).hasClass("red") && $(gamepiece).data("row") === 8) {
      $(gamepiece).removeClass("pawn red-pawn").addClass("king red-king");
    }
    if (!$(ui.helper).draggable("option", "revert")) {};
    $(ui.helper).draggable("option", "revert", true);
  }
}

// modals

function gameoverModal() {
  $gameover = $("<div>", {id: "gameover", class: "modal"});
  $gameover.on($.modal.BEFORE_OPEN, function(event, modal) {
    $winText = $("<h1>", {text: game.player.toUpperCase() + " WINS!!"});
    $gameover.append($winText);
    $gameover.append($("<button>", {class: "reset ui-button ui-widget ui-corner-all", text: "PLAY AGAIN", rel:"modal:close"}));
    $("caption h2").text(game.player.toUpperCase() + " WINS!!");
  });
  $gameover.modal({fadeDuration: 250});
  $(document).on('click', '.reset', reset);
  $(document).on('click', '.reset', $.modal.close);
}

function aiModal() {
  $unavailable = $("<div>", {id: "unavailable", class: "modal"});
  $unavailable.on($.modal.BEFORE_OPEN, function(event, modal) {
    $text = $("<h2>", {text: "THIS GAMEMODE IS CURRENTLY UNAVAILABLE"});
    $subtext = $("<h4>", {text: "PLEASE TRY AGAIN SOON!"});
    $unavailable.append($text);
    $unavailable.append($subtext);
  });
  $unavailable.modal({fadeDuration: 250});
}
