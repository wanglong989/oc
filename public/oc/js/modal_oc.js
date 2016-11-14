console.log('modal_oc');
$(function() {
    var $container = $('#masonry');
    $container.imagesLoaded(function() {
        $container.masonry({
            itemSelector: '.article-box',
            gutter: 20,
            isAnimated: true,
        });
    });
});