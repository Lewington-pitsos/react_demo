const executorAnimations =  {
  moveUgg(bucketId) {
    // scrolls ugg to the middle of the bucket whose ide is passed in
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
    // immidiately retusn the stone to it's innitla position
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
