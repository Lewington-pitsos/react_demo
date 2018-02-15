import SiblingsTracker from './SiblingsTracker'

export default class PositionedCell {
  // holds the data for this cell (it's id and current facing)
  // also tracks the sibling (touching) cells of this cell
  // contains methods for updating the cell's facing, and working out it's next facing
  constructor(id, backSide=false) {
    this.backSide = backSide
    this.id = id
    this.futureBackSide = backSide
  }

  addSiblings(siblings) {
    this.siblings = new SiblingsTracker(siblings)
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
