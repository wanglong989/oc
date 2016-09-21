$(function () {

    /**
     * 删除接口
     */
    $(document).on('click', '.del', function () {
        var t = $(this),
            tr = t.parents('tr'),
            id = t.attr('data-id');
        console.log(id);
        $.ajax({
                url: "/article/action/del?id=" + id
            })
            .done(function (results) {
                if (results.result === '1') {
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }else{
                    alert('删除失败！')
                }
            });
    });


    /**
     * 初始化 样式、数据
     */

    var init = function(){
        var window_h = $(window).innerHeight();
        var body_h = $('body').height();
        if((body_h) < window_h){
            $('footer').css('position','fixed');
        }
    };

    init();

});
