var game = {
  players: ["black"],
  player: "black",
  gameboard: {
    cols: 8,
    rows: 8,
    rowsOfPieces: 3
  },
  playableSquares: ".tbody-tr:nth-child(even) td:nth-child(odd), .tbody-tr:nth-child(odd) td:nth-child(even)",
  gamepieces: ".gamepiece",
  currentMove: {
    currentPiece: 0,
    initial: 0,
    target: {
      col: 0,
      letter: 0,
      row: 0
    },
    targetCell: $("td"),
    jumpedPiece: 0,
    validMove: false,
    validJump: false,
    moved: false,
    jumped: false,
    validMoves: {
      pawn: {
        left: {
          col: 0,
          row: 0
        },
        right: {
          col: 0,
          row: 0
        }
      },
      king: {
        frontLeft: {
          col: 0,
          row: 0
        },
        frontRight: {
          col: 0,
          row: 0
        },
        backLeft: {
          col: 0,
          row: 0
        },
        backRight: {
          col: 0,
          row: 0
        }
      }
    },
    validJumps: {
      pawn: {
        left: {
          col: 0,
          row: 0,
          jumpedPiece: {
            col: 0,
            row: 0
          }
        },
        right: {
          col: 0,
          row: 0,
          jumpedPiece: {
            col: 0,
            row: 0
          }
        }
      },
      king: {
        frontLeft: {
          col: 0,
          row: 0,
          jumpedPiece: {
            col: 0,
            row: 0
          }
        },
        frontRight: {
          col: 0,
          row: 0,
          jumpedPiece: {
            col: 0,
            row: 0
          }
        },
        backLeft: {
          col: 0,
          row: 0,
          jumpedPiece: {
            col: 0,
            row: 0
          }
        },
        backRight: {
          col: 0,
          row: 0,
          jumpedPiece: {
            col: 0,
            row: 0
          }
        }
      }
    }
  }
}
