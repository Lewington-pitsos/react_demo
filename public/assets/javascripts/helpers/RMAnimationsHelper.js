const RMAnimationsHelper =  {
  moveUgg(bucketId) {
    // scrolls ugg to the middle of the bucket whose ide is passed in
    var bucketSelector = '#bucket-' + bucketId
    var bucketHeight = $(bucketSelector).outerHeight(true)
    console.log(bucketHeight);
    var currentBucketMiddle = ( ( bucketHeight * (bucketId - 1) ) + 10  )
    $('.ugg').animate({
      top: currentBucketMiddle
    }, 600)
    $('.executor').animate({
      scrollTop: currentBucketMiddle
    }, 600)
  },

  uggAddStone() {
    var $stone = $('.uggs-stone')
    var uggWidth = $('.ugg').width()
    var bucketDistance = ($('#bucket-1').width() / 2) + 5
    $stone.animate({
      right: uggWidth + bucketDistance
    }, 500, function() {
      $stone.css('right', 0)
    })
  },

  uggTakeStone() {
    var $stone = $('.uggs-stone')
    var uggWidth = $('.ugg').width()
    var bucketDistance = ($('#bucket-1').width() / 2) + 5
    $stone.css('right', uggWidth + bucketDistance)
    $stone.animate({
      right: 0
    }, 500)
  }
}

window.RMAnimationsHelper = RMAnimationsHelper

export default RMAnimationsHelper
