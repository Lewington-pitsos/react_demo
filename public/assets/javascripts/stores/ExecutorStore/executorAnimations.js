const executorAnimations =  {
  moveUgg(bucketId) {
    // scrolls ugg to the middle of the bucket whose ide is passed in
    var bucketSelector = '#bucket-' + bucketId
    var bucketHeight = $(bucketSelector).outerHeight(true)
    var currentBucketMiddle = ( ( bucketHeight * bucketId ) + 10  )
    $('.ugg').animate({
      top: currentBucketMiddle
    }, 600)
    $('.executor').animate({
      scrollTop: currentBucketMiddle
    }, 600)
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
  }
}

export default executorAnimations
