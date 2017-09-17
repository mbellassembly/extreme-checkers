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

function additionalJumps() {
  if (game.currentMove.currentPiece.hasClass("pawn")) {
    var validJumps = game.currentMove.validJumps.pawn;
  } else if (game.currentMove.currentPiece.hasClass("king")) {
    var validJumps = game.currentMove.validJumps.king;
  }
  for (jump in validJumps) {
    if (validJump(validJumps, validJumps[jump])) {
      console.log("WINNER!!");
      console.log(validJumps[jump]);
      return true;
    }
  }
  return false;
}

function targetHasPiece() {
  if (game.currentMove.target) {};
  return false;
}

var validMove = function(validMoves, target) {
  for (var move in validMoves) {
    if (validMoves[move].col === target.col && validMoves[move].row === target.row) {
      if (game.currentMove.targetCell.children().length > 0) {
        console.log("target cell is occupied");
        return false;
      }
      game.currentMove.moved = true;
      return true;
    }
  }
  //game.currentMove.currentPiece.draggable("option", "revert", true);
  console.log("not a valid move: " + [target.letter, target.row]);
  return false;
}

var validJump = function(validJumps, target) {
  // console.log(validJumps);
  for (var jump in validJumps) {
    if (validJumps[jump].col === target.col && validJumps[jump].row === target.row) {
      // check if there is a jumped piece
      // need to get piece at position of jumped piece
      var $jumpedPiece = $("td[data-col="+validJumps[jump].jumpedPiece.col+"][data-row="+validJumps[jump].jumpedPiece.row+"]");
      var $gamePiece = $jumpedPiece.find($(".gamepiece"))
      if (game.currentMove.targetCell.children().length > 0) {
        console.log("target cell is occupied");
        return false;
      } else if ($gamePiece.length===1) {
        if ($gamePiece.hasClass(game.player)) {
          console.log("cannot jump own piece");
          return false
        } else {
          game.currentMove.jumpedPiece = $gamePiece;
          game.currentMove.moved = true;
          game.currentMove.jumped = true;
          return true;
        }
      }
      console.log("no jumpable piece");
      return false;
    }
  }
  return false;
}

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

function gameover() {
  if ($(".graveyard").find("."+game.player).length === 12) {
    return true;
  }
  return false;
}

function gameoverModal() {
  $gameover = $("<div>", {id: "gameover", class: "modal"});
  $gameover.on($.modal.BEFORE_OPEN, function(event, modal) {
    $winText = $("<h1>", {text: game.player.toUpperCase() + " WINS!!"});
    $gameover.append($winText);
    $gameover.append($("<button>", {class: "reset", text: "RESET"}));
  });
  $gameover.modal({fadeDuration: 250});
  $("caption h4").text(game.player.toUpperCase() + " WINS!!");
}
