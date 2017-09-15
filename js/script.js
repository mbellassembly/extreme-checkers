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
}

function additionalJumps() {
  getValidMoves()
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
        return false;
      }
      game.currentMove.moved = true;
      return true;
    }
  }
  //game.currentMove.currentPiece.draggable("option", "revert", true);
  return false;
}

var validJump = function(validJumps, target) {
  for (var jump in validJumps) {
    if (validJumps[jump].col === target.col && validJumps[jump].row === target.row) {
      // check if there is a jumped piece
      // need to get piece at position of jumped piece
      var $jumpedPiece = $("td[data-col="+validJumps[jump].jumpedPiece.col+"][data-row="+validJumps[jump].jumpedPiece.row+"]");
      var $gamePiece = $jumpedPiece.find($(".gamepiece"))
      if ($gamePiece.length===1) {
        if ($gamePiece.hasClass(game.player + "-gamepiece")) {
          return false
        } else {
          game.currentMove.jumpedPiece = $gamePiece;
          game.currentMove.jumped = true;
          return true;
        }
      }
      return false;
    }
  }
  return false;
}

function switchTurn() {
  switch (game.player) {
    case "red":
      game.player = "black";
      $(".black-pawn, .black-king").draggable("enable");
      // $redBoard.draggable("disable");
      // $blackBoard.draggable("enable");
      $(".red-pawn, .red-King").draggable("disable");
      break;
    case "black":
      game.player = "red";
      $(".red-pawn, .red-King").draggable("enable");
      // $blackBoard.draggable("disable");
      // $redBoard.draggable("enable");
      $(".black-pawn, .black-king").draggable("disable");
      break;
  }
  resetCurrentMoveValues();
  $("caption h4").text(game.player.toUpperCase() + "'S TURN");
  // update turn heading under player's board heading
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
  game.currentMove.currentPiece = 0;
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
