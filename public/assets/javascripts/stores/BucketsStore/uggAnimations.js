/*

All this module does is mess with the css of DOM elements and maybe adds classes and stuff. All simple Jquery.

There are two basic types of animations:
  - ugg moves (moveUgg) and
  - ugg actions (waver,increment, decrement)

Plus a special bonus animation for when executon ends (dance). The idea is that you should alternate between moves and actions when animating and everything should be smooth.

These animations are NOR react-ful but I reasoned that:
  (1): these visual changes don't reflect any changes in the underlying register machine we're trying to simulate, so it might be a bit wasteful to have a store tracking them around.
  (2): there isn't any complex dependency between animations: all you need to do is alternate between moves and actions. Slome basic Jquery can model this sequencing very easily with little risk of getting tangled. If there was more complex dependency between more intercations it might be worth getting a store to track everything


*/

const executorAnimations =  {
  moveUgg(bucketId) {
    // scrolls ugg to the middle of the bucket whose id/index is passed in
    // also scrolls the bucket list to stay centered on ugg
    // method:
    //  - work out the height of each bucket
    // -  multiply that by the bucket's visible id
    //  - alter .ugg's .bucket-holder's css according to that value

    var bucketSelector = '#bucket-' + bucketId
    var bucketHeight = $(bucketSelector).outerHeight(true)
    var currentBucketMiddle = ( ( bucketHeight * bucketId ) + 25  )
    $('.ugg').animate({
      top: currentBucketMiddle
    }, 900)
    $('.buckets-holder').animate({
      scrollTop: currentBucketMiddle - bucketHeight
    }, 900)
  },

  uggAddStone() {
    // animates the stone from ugg's sack to the stone icon in the adjacent bucket
    // immidiately retusn the stone to it's innitial position
    var $stone = $('.uggs-stone')
    $stone.animate({
      right: this.stoneDistance()
    }, 500, function() {
      $stone.css('right', 0)
    })
  },

  uggTakeStone() {
    // teleports the stone from ugg's sack into behind the stone icon in the adjacent bucket
    // animates the stone from the icon back to the sack
    var $stone = $('.uggs-stone')
    $stone.css('right', this.stoneDistance())
    $stone.animate({
      right: 0
    }, 500)
  },

  stoneDistance() {
    // returns the distance the stone will have to travel from ugg's sack to the stone icon in the bucket
    var uggWidth = $('.ugg').width()
    var bucketDistance = ($('#bucket-1').width() / 2) + 5
    return uggWidth + bucketDistance
  },

  uggWaver() {
    // to indicate failure to decrement an empty bucket
    $('.ugg').addClass('shake')
    setTimeout(function() {
      $('.ugg').removeClass('shake')
    }, 550)
  },

  uggDance() {
    // bounces ugg up and down to indicate happiness at having finished the program
    $('.ugg').addClass('bounce')
    setTimeout(function() {
      $('.ugg').removeClass('bounce')
    }, 1300)
  }
}

export default executorAnimations
