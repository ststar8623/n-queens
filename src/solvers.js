/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findSolution = function(row, n, board, anyConflicts, callback) {
  // if row goes up to n
  if (row === n) {
    // exit recursion
    return callback();
  }
  // iterate board
  for (let i = 0; i < n; i++) {
    // replace rooks
    board.togglePiece(row, i);
    // check if there's conflicts
    if (!board[anyConflicts]()) {
      // recursion
      let result = findSolution(row + 1, n, board, anyConflicts, callback);
      if ( result ) {
        return result;
      }
    }
    // replace back the rooks
    board.togglePiece(row, i);
  }
};

window.findNRooksSolution = function(n) {
  // let solution = []; //fixme

  // let board = new Board({'n': n});

  // let recursive = function(board, rook) {
  //   let currRook = rook;
  //   let newBoard = [];

  //   // pushing board to generate a new board
  //   for (let i = 0; i < n; i++) {
  //     newBoard.push(board.attributes[i]);
  //   }
  //   // generate new board
  //   let innerBoard = new Board(newBoard);

  //   // iterate the board and change the first col to '1'
  //   for (let j = 0; j < n; j++) {
  //     innerBoard.togglePiece(currRook, j);
  //     // if there's a conflict, change it back to '0' and move on
  //     if (innerBoard.hasAnyRooksConflicts()) {
  //       innerBoard.togglePiece(rook, j);
  //     } else {
  //       // if there's no conflict, change the next one to '1'
  //       currRook++;
  //       // where there's n rook on board, push solution in
  //       if (currRook === n) {
  //         for (let k = 0; k < n; k++) {
  //           solution.push(innerBoard.attributes[k]);
  //         }
  //         return;
  //       } else {
  //         // iterate again if no solution is found
  //         return recursive(innerBoard, currRook);
  //       }
  //     }
  //   }
  // };

  // recursive(board, 0);

  // second solution //

  let board = new Board({n: n});
  let solution = findSolution(0, n, board, 'hasAnyRooksConflicts', ()=> _.map(board.rows(), row => row.slice()));

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // define solutions
  // let solution = undefined;
  // let solutionArr = [];
  // // generate board
  // let board = new Board({'n': n});

  // // start recursion
  // let recursive = function(currboard, rook) {
  //   let currRook = rook;
  //   let oldBoard = [];
  //   // iterate old board
  //   for (let i = 0; i < n; i++) {
  //     oldBoard.push(currboard.attributes[i]);
  //   }
  //   // generate new board
  //   let newBoard = new Board(oldBoard);
  //   // iterate from first row first column
  //   for (let j = 0; j < n; j++) {
  //     // change current indexes to '1'
  //     newBoard.togglePiece(currRook, j);
  //     // if conflicts, change current indexes back to '0'
  //     if (newBoard.hasAnyRooksConflicts()) {
  //       newBoard.togglePiece(rook, j);
  //     } else {
  //       // if no conflicts, move on to next indexes
  //       currRook++;
  //       // if rooks filled up the board
  //       if (currRook === n) {
  //         // create answer array
  //         let ans = [];
  //         for (let k = 0; k < n; k++) {
  //           // push current solution into answer array
  //           ans.push(newBoard.attributes[k]);
  //         }
  //         // push answer array in to solution
  //         solutionArr.push(ans);
  //         // move last indexes back up by one
  //         currRook--;
  //         // change current indexes back to '0' and compare again
  //         newBoard.togglePiece(currRook, j);
  //       } else {
  //         // if no more solution is found at current pattern
  //         // start recursion again
  //         recursive(newBoard, currRook);
  //         // change current indexes back up one
  //         currRook--;
  //         // change current indexes back to '0' and compare again
  //         newBoard.togglePiece(currRook, j);
  //       }
  //     }
  //   }
  // };
  // recursive(board, 0);
  // solution = solutionArr.length;

  // second solution //

  // define board
  let solution = 0;
  let board = new Board({n: n});
  findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    solution++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // let solution = []; //fixme

  // let board = new Board({'n': n});

  // if (n === 2) { return {n: 2}; }
  // if (n === 3) { return {n: 3}; }

  // let recursive = function(board, queen) {
  //   let currQueen = queen;
  //   let newBoard = [];

  //   // pushing board to generate a new board
  //   for (let i = 0; i < n; i++) {
  //     newBoard.push(board.attributes[i]);
  //   }
  //   // generate new board
  //   let innerBoard = new Board(newBoard);

  //   // iterate the board
  //   for (let j = 0; j < n; j++) {
  //     // if one solution is found, exit out from recursion
  //     // we only need one 'answer'
  //     if (solution.length > 0) {
  //       return;
  //     }
  //     // start from the first row first column
  //     innerBoard.togglePiece(currQueen, j);
  //     // if there's a conflict, change it back to '0'
  //     if (innerBoard.hasAnyQueensConflicts()) {
  //       innerBoard.togglePiece(queen, j);
  //       // 
  //       if (j === n - 1) {
  //         return;
  //       }
  //     } else {
  //       let newQueen = currQueen + 1;
  //       if (newQueen === n) {
  //         for (let k = 0; k < n; k++) {
  //           solution.push(innerBoard.attributes[k].slice());
  //         }
  //         return;
  //       } else {
  //         recursive(innerBoard, newQueen);
  //         innerBoard.togglePiece(currQueen, j);
  //       }
  //     }
  //   }
  // };
  // recursive(board, 0);

  // second solution //

  let board = new Board({n: n});

  let solution = findSolution(0, n, board, 'hasAnyQueensConflicts', ()=> _.map(board.rows(), row => row.slice())) || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solution = 0;
  if (n === 2 || n === 3) { return solution; }
  let board = new Board({n: n});
  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solution++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};
