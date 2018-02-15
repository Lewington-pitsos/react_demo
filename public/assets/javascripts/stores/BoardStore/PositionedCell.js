class PositionedCell {
  // holds the data for this cell (it's id and current facing)
  // also tracks the sibling (touching) cells of this cell
  // contains methods for updating the cell's facing, and working out it's next facing
  constructor(id, backside=false) {
    this.backside = backside
    this.id = id
    this.futureBackSide = backside
  }

  addSiblings(siblings) {
    this.siblings = siblings
  }

  updateSide() {
    this.backSide = futureBackSide
  }

  findNextSide() {
    livingSiblings = this.siblings().livingCount()

    // this next line contains the rules of the game
    // currently we're set to GOL
    this.futureBackSide = ( livingSiblings > 1 && livingSiblings < 4 )
  }
}


class SiblingsTracker {
  constructor(siblingsArray) {
    this.all = siblingsArray
  }

  livingCount() {
    // returns the numner (int) of siblings who are currently facing forward, i.e. 'alive'
    this
      .all
      .filter(function(cell) {
        cell.backSide == false  // if the cell is missing, backside will be undefined
      })
      .length()
  }
}
