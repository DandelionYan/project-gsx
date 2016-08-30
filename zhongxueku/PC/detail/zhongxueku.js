/**
 * Created by zxy on 16/7/26.
 */


define(function(require, exports) {
    'use strict';

    exports.init = function() {

        // 获取要定位元素距离浏览器顶部的距离
        var navH = $(".card-nav").offset().top;

        var left = ($(window).width() - 1000) / 2;
        //滚动条事件
        $(window).scroll(function() {
            //获取滚动条的滑动距离
            // alert(left);
            var scroH = $(this).scrollTop();
            // console.log(scroH);
            var that = $('.card-nav');
            // 滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if (scroH >= navH) {
                that.css({
                    "position": "fixed",
                    "top": 0,
                    "left": 0,
                    "background": "#fff",
                    "z-index": 1
                });
            } else if (scroH < navH) {
                that.css({
                    "position": "static",
                    "margin": "0 auto"
                });
            }



            if(that.css('position') == 'fixed') {
                $('.card-w').on('click','.card-nav div',function(){
                    var index = $('.card-nav div').index(this);
                    var curr = $('.content-card').eq(index);
                    var height = document.body.scrollHeight - curr.offset().top;

                    if((height + 5) < $(window).height()) {
                        // console.log(height);
                        $('.content-card').removeClass('top');
                    }
                    else if(curr.text().trim()){
                        $('.content-card').removeClass('top');
                        curr.addClass('top');
                    }
                });
            }


        });


        $('.card-w')
            .on('click', '.card-nav div', changeCur);


        function changeCur() {
            $('.card-nav div').removeClass('cur');
            $(this).addClass('cur');
        }

        $('.summary').each(function() {
            if($(this).height() >= 450) {
                $(this).after('<div class="more"><p>查看全部</p> <img src="http://img.gsxservice.com/seo/zhongxueku/arrow.png"> </div>');
                $(this).addClass('max-height');
                $('.more').click(function() {
                    $('.summary').removeClass('max-height');
                    $(this).css('display','none');

                });
            }
        });
    };

});