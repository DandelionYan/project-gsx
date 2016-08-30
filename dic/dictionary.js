/**
 * Created by zxy on 16/7/12.
 */
/*
 * @file  cidian
 * @author zuoxuyan
 * */
define(function(require, exports) {
    exports.init = function() {

        //获取要定位元素距离浏览器顶部的距离
        var navH = $(".card_nav").offset().top;

        var left = ($(window).width() - 1000) / 2;
        //滚动条事件
        $(window).scroll(function(){
            //获取滚动条的滑动距离
            //alert(left);
            var scroH = $(this).scrollTop();
            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if(scroH>=navH){
                $(".card_nav").css({"position":"fixed","top":0,"left": 0,"background":"#fff","z-index":1});
            }else if(scroH<navH){
                $(".card_nav").css({"position":"static","margin":"0 auto"});
            }
        });

        //tabs切换改变内容, 不要循环绑定事件   用事件代理
        function tabChange(event) {
            $('.word_detail li').removeClass('cur');
            var index = $('.word_detail li').index(this);
            $(this).addClass('cur');
            $('.content_paragraph').removeClass('show_content');
            $('.content_paragraph').eq(index).addClass('show_content');
        }
        // console.log($('.content_paragraph').length);

        $('.card-w')
            .on('click', '.word_detail li', tabChange);

        $('.site-card').on('mouseover', '.common', function(){
            $('.content-common').addClass('show');
            $('.content-abbr').removeClass('show');
            $('.content-search').removeClass('show');
            $('.common').addClass('font');
            $('.abbr').removeClass('font');
            $('.search').removeClass('font');

        }).on('mouseover', '.abbr',function(){
            $('.content-search').removeClass('show');
            $('.content-common').removeClass('show');
            $('.content-abbr').addClass('show');
            $('.abbr').addClass('font');
            $('.search').removeClass('font');
            $('.common').removeClass('font');

        }).on('mouseover', '.search',function(){
            $('.search').addClass('font');
            $('.common').removeClass('font');
            $('.abbr').removeClass('font');
            $('.content-abbr').removeClass('show');
            $('.content-common').removeClass('show');
            $('.content-search').addClass('show');
        });

        var len = $('.words_side').length;
        var array = new Array(len);
        for(var i = 0; i < len; i++){
            var arr = $('.words_side').eq(i).html().length;
            if( arr != 0 ) {
                array[i] = 1;
            }
            else{
                array[i] = 0;
            }
        }
        var str = array.join('');
        var index = str.indexOf('1');
        $('.words_side').eq(index).addClass('show');
        $('.words_head span').eq(index).addClass('font');



        var data = $('.i-star').text();
        for ( var m = 5-data; m > 0; m--){
            (function(){
                $('.i-star').after('<img src="http://img.gsxservice.com/seo/dict/star1.png"/>');
            })(m);
        }
        for ( var k = 0; k < data;k++){
            (function(){
                $('.i-star').after('<img src="http://img.gsxservice.com/seo/dict/star2.png"/>');
            })(k);
        }


        var ols = $('.para_content ol');
        ols.each(function(index){
            var lis = $(this).find('li');
            var lislen=lis.length;
            for(var i = 5;i < lislen;i++){
                lis.eq(i).css("display","none");
            }
            if(lislen > 5){
                $(this).append("<img src='http://img.gsxservice.com/seo/dict/more.jpg' alt='查看更多'>");
            }

            $(this).find('img').on('click',function() {
                if(ols.eq(index).find('img').attr('alt') == '查看更多') {
                    ols.eq(index).find('li').show();
                    ols.eq(index).find('img').attr('src', 'http://img.gsxservice.com/seo/dict/hide.jpg');
                    ols.eq(index).find('img').attr('alt', '收起');
                }
                else if(ols.eq(index).find('img').attr('alt') == '收起') {
                    ols.eq(index).find('li:gt(4)').hide();
                    ols.eq(index).find('img').attr('src', 'http://img.gsxservice.com/seo/dict/more.jpg');
                    ols.eq(index).find('img').attr('alt', '查看更多');
                }
            });
        });

        var that = $('.contentlist');
        var num = that.length;
        for(var n = 5; n < num; n++){
            that.eq(n).css('display','none');
        }
        if(num > 5){
            $('.dict').append("<img src='http://img.gsxservice.com/seo/dict/more.jpg' alt='查看更多'>");
        }

        $('.dict').find('img').click(function(){
            if($(this).attr('alt') == '查看更多') {
                $('.contentlist').siblings().show();
                $(this).attr('src', 'http://img.gsxservice.com/seo/dict/hide.jpg');
                $(this).attr('alt', '收起');
            }
            else if($(this).attr('alt') == '收起') {
                $('.contentlist:gt(4)').hide();
                $(this).attr('src', 'http://img.gsxservice.com/seo/dict/more.jpg');
                $(this).attr('alt', '查看更多');
            }
        });

    };
});
    


