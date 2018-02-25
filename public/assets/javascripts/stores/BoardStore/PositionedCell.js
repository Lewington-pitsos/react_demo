import SiblingsTracker from './SiblingsTracker'

export default class PositionedCell {
  // holds the data for this cell (it's id and current facing)
  // also tracks the sibling (touching) cells of this cell
  // contains methods for updating the cell's facing, and working out it's next facing
  constructor(backSide=false) {
    this.backSide = backSide
    this.futureBackSide = backSide
  }

  addSiblings(siblings) {
    this.siblings = new SiblingsTracker(siblings)
  }

  updateSide() {
    this.backSide = this.futureBackSide
  }

  findNextSide() {
    // finds the next state of this cell, based on it's current siblings
    // returns whether or not the next state is different from the current state, we track this so we can check whether the board has stopped changing and we can end the game
    var livingSiblings = this.siblings.livingCount()
    this.futureBackSide = this.stateFromSiblings(livingSiblings)
    return this.futureBackSide != this.backSide
  }

  stateFromSiblings(siblings) {
    if (this.backSide) {
      return (siblings == 2 || siblings == 3)
    } else {
      return siblings == 3
    }
  }
}
