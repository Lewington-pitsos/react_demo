export default class SiblingsTracker {
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
