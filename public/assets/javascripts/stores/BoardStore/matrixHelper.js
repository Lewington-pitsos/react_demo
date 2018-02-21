export default {

  // SETUP

  matrixify(array, rowLength) {
    // iterate throgh the array and add each element to row
    // if the current array index is equal to the rowLength,
    //  => push the row to matrix
    //  => reset row to an empty array
    //  => add the innitial row length to the current rowLength tracker
    // finally, push the final row to matrix if it contains anything
    var innitialRowLength = rowLength
    var matrix = []
    var row = []

    for (var i = 0; i < array.length; i++) {
      if (i == rowLength) {
        matrix.push(row)
        row = []
        rowLength += innitialRowLength
      }
      row.push(array[i])
    }

    if (row.length) {
      matrix.push(row)
    }

    return matrix
  },

  assignSiblings(cell, y, x) {
    // iterates through every cell in the matrix and adds all it's siblings to it's siblingsTracker object
    cell.addSiblings(this.getCoordinateSiblings(x, y))
  },

  getCoordinateSiblings(x, y) {
    // very simple: just pushes all the values at neighbouring coordinates to an array and returns it (minus any falsey values)
    var siblingsArray = []
    if (y > 0) {
      siblingsArray.push(this.cellMatrix[y-1][x-1])
      siblingsArray.push(this.cellMatrix[y-1][x])
      siblingsArray.push(this.cellMatrix[y-1][x+1])
    }

    siblingsArray.push(this.cellMatrix[y][x-1])
    siblingsArray.push(this.cellMatrix[y][x+1])

    if (y < this.cellMatrix.length - 1 ) {
      siblingsArray.push(this.cellMatrix[y+1][x-1])
      siblingsArray.push(this.cellMatrix[y+1][x])
      siblingsArray.push(this.cellMatrix[y+1][x+1])
    }

    return siblingsArray.filter(cell => cell);
  },

  // ITERATOR FUNCTIONS

  everyCell(func) {
    // takes a function and calls it on every cell, plus that cell's coordinates
    for (var i = 0; i < this.cellMatrix.length; i++) {
      for (var j = 0; j < this.cellMatrix[i].length; j++) {
        func(this.cellMatrix[i][j], i, j)
      }
    }
  },

  cascadeFlip(func) {
    // takes a function as an argument and For each row in the matrix,
    //  => it waits successivly longer and then applies the function to every cell in that row
    //  => triggers a change event
    for (var i = 0; i < this.cellMatrix.length; i++) {
      setTimeout( this.flipRow.bind(this), i * 100, this.cellMatrix[i], func )
    }
  },

  flipRow(row, func) {
    // calls the passed in function on every cell in the current row, then emits a change event
    for (var j = 0; j < row.length; j++) {
      func(row[j])
    }

    this.emit('change')
  },

  // DOM CHANGING FUNCTIONS

  playRound() {
    // first goes through each cell and calculates its nexte state, then goes through them all again and updates the state and displays it through a casecade flip
    this.everyCell(this.calculateNextState.bind(this))
    this.everyCell(this.assignNextState.bind(this))

    this.emit('change')
  },

  startPlaying() {
    // instantly plays one round, and then plays one every interval
    this.playRound()
    this.playing = setInterval(this.playRound.bind(this), 1300)
  },

  // SIMPLE CELL OPERATIONS

  calculateNextState(cell) {
    cell.findNextSide()
  },

  assignNextState(cell){
    cell.updateSide()
  },

  reverse(cell) {
    cell.backSide = !cell.backSide
  }

}
