export default class SiblingsTracker {
  constructor(siblingsArray) {
    this.all = siblingsArray
  }

  livingCount() {
    // returns the numner (int) of siblings who are currently facing forward, i.e. 'alive'
    return this.all.filter(function(cell) {
                      return cell.backSide
                    }).length
  }
}
