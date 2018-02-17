const RMAnimationsHelper =  {
  moveUgg(bucketId) {
    // scrolls ugg to the middle of the bucket whose ide is passed in
    var bucketSelector = '#bucket-' + bucketId
    var bucketHeight = $(bucketSelector).outerHeight(true)
    console.log(bucketHeight);
    var currentBucketMiddle = ( bucketHeight * (bucketId - 1) )
    $('.ugg-wrapper').animate({
      top: currentBucketMiddle
    }, 1000)
  },

  uggAddStone() {
    var $stone = $('.uggs-stone')
    $stone.animate({
      right: 200
    }, 400, function() {
      $stone.css('right', 0)
    })
  }
}

window.RMAnimationsHelper = RMAnimationsHelper

export default RMAnimationsHelper
