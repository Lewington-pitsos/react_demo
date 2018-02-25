/*

This just houses an array of all the siblings of a cell.
It can also return a count of how many of those siblings are currently faceing backwards (i.e. dead)

*/

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
