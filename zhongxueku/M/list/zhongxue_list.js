/**
 * Created by zxy on 16/7/27.
 */
define(function(require, exports){

    'use strict';
    var lazyLoadImage = require("common/loader/lazyLoadImage");
    var id = 0;
    var arr = [];

    /**
     * 解析url
     */
    function getParam(url) {
        var search = url.split('?')[1];
        if(!search) {
            return "";
        }
        var params = search.split(/[&,#]/);
        var paramObj = {};
        params.forEach(function (param) {
            param = param.split('=');
            paramObj[param[0]] = decodeURIComponent(param[1]);
            if (decodeURIComponent(param[1]) == "") {
                paramObj[param[0]] = "";
            }
        });
        return paramObj;
    };

    /**
     * 初始化
     */
    $('.province').html(getParam(location.href).province||'省份');
    $('.city').html(getParam(location.href).city||'城市');
    $('.district').html(getParam(location.href).district||'区域');
    $('.level').html(getParam(location.href).school_level ||'学校级别');
    $('.attend-way').html(getParam(location.href).entrance||'升学方式');
    $('.school-property').html(getParam(location.href).school_type||'办学性质');
    $('.input-box input').val(getParam(location.href).query||'');
    arr[0] = getParam(location.href).pid;
    arr[1] = getParam(location.href).cid;


    /**
     * 办学性质
     */
    $('#school-property').click(function() {
        $('.mask').css("opacity", .3).show();
        $('.show-school-property').css("top", $(window).height() - $('.show-school-property').height())
            .show();
        $(window).scrollTop(0);
        $('body').addClass('overflow-hidden');
    });
    $.each($('.show-school-property .item'), function() {
        $(this).click(function() {
            $(this).siblings().removeClass('highlight');
            $(this).addClass('highlight');
        });
    });
    $('.show-school-property .sure').click(function() {
        if($('.show-school-property .highlight').html()) {
            $('.show-school-property').hide();
            $('.show-school-property').siblings().css("opacity", 1);
            $('.mask').hide();
            $('.school-property').html($('.show-school-property .highlight').html());
            $('body').removeClass('overflow-hidden');
            searchKey($('.show-school-property .highlight').html(), 'school_type');
        }
    });

    /**
     * 学校级别
     */
    // $('.level').next('img').click(function() {
    //     $('.mask').css("opacity", .3).show();
    //     $('.show-level').css("top", $(window).height() - $('.show-level').height()).show();
    //     $(window).scrollTop(0);
    //     $('body').addClass('overflow-hidden');
    // });
    // $.each($('.show-level .item'), function() {
    //     $(this).click(function() {
    //         $(this).siblings().removeClass('highlight');
    //         $(this).addClass('highlight');
    //     });
    // });
    // $('.show-level .sure').click(function() {
    //     $('.show-level').hide();
    //     $('.show-level').siblings().css("opacity", 1);
    //     $('.mask').hide();
    //     $('.level').html($('.show-level .highlight').html());
    //     $('body').removeClass('overflow-hidden');
    // });

    /**
     * 升学方式
     */
    $('#attend-way').click(function() {
        $('.mask').css("opacity", .3).show();
        $('.show-attend-way').css("top", $(window).height() - $('.show-attend-way').height()).show();
        $(window).scrollTop(0);
        $('body').addClass('overflow-hidden');
    });
    $.each($('.show-attend-way .item'), function() {
        $(this).click(function() {
            $(this).siblings().removeClass('highlight');
            $(this).addClass('highlight');
        });
    });
    $('.show-attend-way .sure').click(function() {
        if($('.show-attend-way .highlight').html()) {
            $('.show-attend-way').hide();
            $('.show-attend-way').siblings().css("opacity", 1);
            $('.mask').hide();
            $('.attend-way').html($('.show-attend-way .highlight').html());
            $('body').removeClass('overflow-hidden');
            searchKey($('.show-attend-way .highlight').html(), 'entrance');
        }
    });

    function  getUrl(pid) {
        var url;
        if(pid == null) {
            url = "http://www.genshuixue.com/area/list";
        }
        else {
            url = "http://www.genshuixue.com/area/list?exclude_subway=1&p_id=" + pid;
        }
        return url;
    }

    /**
     * 省
     */
    var str = '<div class="show-province"><div class="title">省份</div><div class="items"><span class="item">全部</span></div>' +
        '<div class="sure"> <button>确定</button> </div></div>';

    $('.mask').after(str);

    $.ajax({
        type: "get",
        url: getUrl(),
        data: "",
        dataType: "jsonp",
        success: function(data) {
            $.each(data, function (index) {
                if (data[index].name == getParam(location.href).province) {
                    var str1 = '<span class="item highlight" data-id="' + data[index].id + '">' + data[index].name + '</span>';
                } else {
                    str1 = '<span class="item" data-id="' + data[index].id + '">' + data[index].name + '</span>';
                }
                $('.show-province .items').append(str1);
            });
        },
        error: function () {
            return "fail";
        }
    });


    $("#province").click(function () {
        $('.show-province').css('display', 'block');
        $('.mask').css("opacity", .3).show();
        // $('.show-province').css("top", $(window).height() - $('.show-province').height()).show();
        $(window).scrollTop(0);
        $('body').addClass('overflow-hidden');
        $.each($('.show-province .item'), function () {
            $(this).click(function () {
                $(this).siblings().removeClass('highlight');
                $(this).addClass('highlight');
                id = $(this).data('id');
                arr[0] = id;
            });
        });

        $('.show-province .sure').click(function () {
            if ($('.show-province .highlight').html()) {
                $('.show-province').hide();
                $('.show-province').siblings().css("opacity", 1);
                $('.mask').hide();
                $('.province').html($('.show-province .highlight').html());
                $('body').removeClass('overflow-hidden');
                searchKey($('.show-province .highlight').html(), 'province');
            }
        });
    });

    /**
     * 市
     */
    var str2 = '<div class="show-city"><div class="title">城市</div><div class="items"><span class="item">全部</span></div>' +
        '<div class="sure"> <button>确定</button> </div></div>';
    $('.mask').after(str2);

    $('#city').click(function () {
        if(($('.province').html() == "全部") || ($('.province').html() == "省份")) {
            //$('.show-city .items').html("");
            alert("请先选择省份!");
        } else {
            $.ajax({
                type: "get",
                url: getUrl(arr[0]),
                data: "",
                dataType: "jsonp",
                success: function(data2)
                {
                    $.each(data2, function (index) {
                        if (data2[index].name == getParam(location.href).city) {
                            var str3 = '<span class="item highlight" data-id="' + data2[index].id + '">' + data2[index].name + '</span>';
                        } else {
                            str3 = '<span class="item" data-id="' + data2[index].id + '">' + data2[index].name + '</span>';
                        }
                        $('.show-city .items').append(str3);
                    });
                    $('.show-city').css('display', 'block');
                    $('.mask').css("opacity", .3).show();
                    // $('.show-province').css("top", $(window).height() - $('.show-province').height()).show();
                    $(window).scrollTop(0);
                    $('body').addClass('overflow-hidden');

                    $.each($('.show-city .item'), function () {
                        $(this).click(function () {
                            $(this).siblings().removeClass('highlight');
                            $(this).addClass('highlight');
                            id = $(this).data('id');
                            arr[1] = id;
                        });
                    });
                    $('.show-city .sure').click(function () {
                        if ($('.show-city .highlight').html()) {
                            $('.show-city').hide();
                            $('.show-city').siblings().css("opacity", 1);
                            $('.mask').hide();
                            $('.city').html($('.show-city .highlight').html());
                            $('body').removeClass('overflow-hidden');
                            searchKey($('.show-city .highlight').html(), 'city');
                        }
                    });
                },
                error: function () {
                    "fail";
                }
            });

        }
    });

    /**
     * 区
     */
    var str4 = '<div class="show-district"><div class="title">区域</div><div class="items"><span class="item">全部</span></div>' +
        '<div class="sure"> <button>确定</button> </div></div>';
    $('.mask').after(str4);

    $('#district').click(function () {
        if($('.city').html() == "全部" || $('.city').html() == "城市") {
            //$('.show-district .items').html("");
            alert('请先选择城市!');
        }
        else {
            $.ajax({
                type: "get",
                url: getUrl(arr[1]),
                data: "",
                dataType: "jsonp",
                success: function (data3) {
                    $.each(data3, function (index) {
                        if (data3[index].name == getParam(location.href).district) {
                            var str5 = '<span class="item " data-id="' + data3[index].id + '">' + data3[index].name + '</span>';
                        } else {
                            str5 = '<span class="item" data-id="' + data3[index].id + '">' + data3[index].name + '</span>';
                        }
                        $('.show-district .items').append(str5);
                    });

                    $('.show-district').css('display', 'block');
                    $('.mask').css("opacity", .3).show();
                    $(window).scrollTop(0);
                    $('body').addClass('overflow-hidden');

                    $.each($('.show-district .item'), function () {
                        $(this).click(function () {
                            $(this).siblings().removeClass('highlight');
                            $(this).addClass('highlight');
                            id = $(this).data('id');
                        });
                    });
                    $('.show-district .sure').click(function () {
                        if ($('.show-district .highlight').html()) {
                            $('.show-district').hide();
                            $('.show-district').siblings().css("opacity", 1);
                            $('.mask').hide();
                            $('.district').html($('.show-district .highlight').html());
                            $('body').removeClass('overflow-hidden');
                            searchKey($('.show-district .highlight').html(), 'district');
                        }
                    });
                },
                error: function () {
                    "fail";
                }
            });

        }
    });

    /**
     * 搜索框输入
     */
    $("form").on('submit', function () {
        //console.log("$('.searchInput').val()");
        searchKey($('.searchInput').val(), 'query');
        return false;
    });

    /**
     * 搜索
     */
    function searchKey(value, key){
        var pid = 0,cid = 0;
        var provinceUrl = getParam(location.href).province||"";
        var cityUrl = getParam(location.href).city||"";
        var districtUrl = getParam(location.href).district||"";
        var typeUrl = getParam(location.href).school_level||"";
        var entranceUrl = getParam(location.href).entrance||"";
        var propertyUrl = getParam(location.href).school_type||"";
        var queryUrl = getParam(location.href).query||"";
        if (key == "province") {
            provinceUrl = value;
            cityUrl = "";
            districtUrl = "";
            pid = arr[0];
            cid = 0;
        }
        else if (key == "city") {
            cityUrl = value;
            districtUrl = "";
            pid = arr[0];
            cid = arr[1];
        }
        else if (key == "district") {
            pid = arr[0];
            cid = arr[1];
            districtUrl = value;
        }  else if (key == "school_level") {
            pid = arr[0];
            cid = arr[1];
            typeUrl = value;
        }  else if (key == "entrance"){
            pid = arr[0];
            cid = arr[1];
            entranceUrl = value;
        }
        else if (key == "school_type") {
            pid = arr[0];
            cid = arr[1];
            propertyUrl = value;
        }
        else if (key == "query") {
            pid = arr[0];
            cid = arr[1];
            queryUrl = value;
        }
        location.href = location.href.split('?')[0] +
            "?province=" + provinceUrl +
            "&city=" + cityUrl +
            "&district=" + districtUrl +
            "&school_level=" + typeUrl +
            "&entrance=" + entranceUrl +
            "&school_type=" + propertyUrl +
            "&query=" + queryUrl +
            "&pid=" + pid +
            "&cid=" + cid;
    }

    //加载更多
    var p = 2;
    $('.load-more-schools a').click(function() {
        var searchName = $('.input-box input').val();
        var province = $('.province').html() == '区域' ? '' : $('.province').html();
        if(province === '省份') {
            province = ''
        }
        var city = $('.city').html() == '区域' ? '' : $('.city').html();
        if(city === '城市') {
            city = ''
        }

        var district = $('.district').html() == '区域' ? '' : $('.district').html();
        var schoolProperty = $('.school-property').html() == '办学性质' ? '' : $('.school-property').html();
        var level = $('.level').html() == '学校级别' ? '' : $('.level').html();
        var attendWay = $('.attend-way').html() == '升学方式' ? '' : $('.attend-way').html();

        $.ajax({
            type: 'get',
            data: {
                page: p,
                query: searchName,
                province: province,
                city: city,
                district: district,
                school_type: schoolProperty,
                school_level: level,
                entrance: attendWay
            },
            url: 'http://' + location.hostname +'/zhongxueku/listmore.ajax',
            success: function(data) {
                if (data.code === 0) {
                    for (var i = 0; i < data.data.length; i++) {
                        var node = data.data[i];
                        var display_image = node.school_logo;
                        if(display_image === ""  ) {
                            display_image = "http://img.gsxservice.com/zhanqun/youshengxiao/default02.jpg";
                        }
                        var school_name = node.school_name
                        if(school_name === "" || school_name === null){
                            continue;
                        }
                        var province = node.province
                        if(province === "" || province === null){
                            province = ""
                        }
                        var school_type = node.school_type
                        if(school_type === "" || school_type === null){
                            school_type = ""
                        }
                        var entrance = node.entrance
                        if(entrance === "" || entrance === null){
                            entrance = ""
                        }
                       var detail_url = "http://" + location.hostname + "/zhongxueku/"+ node.id + ".html";
                        display_image = display_image.replace("\{PL_GSX_IMG_SERVICE\}",
                            "http://img.gsxservice.com/zhanqun");
                        $('.recommend-or-result').append(
                            '<a class="single-school" href="' + detail_url +'">'
                            +        '<div class="show-school">'
                            +             '<img src="' + display_image + '" />'
                            +       '</div>'
                            +       '<div class="school-info">'
                            +           '<div class="name">'
                            +               '<h3 class="ellipsis">' + school_name + '</h3>'
                            +               '<span class="point"><img src="../../../asset/apollo/img/zhongxueku/point.png"></span>'
                            +               '<span class="quyu">' + province +'</span>'
                            +           '</div>'
                            +           '<div class="detail">'
                            +               '<p>办公性质:' + school_type + '</p>'
                            +               '<p>学校级别:重点</p>'
                            +               '<p>升学方式:' + entrance + '</p>'
                            +           '</div>'
                            +       '</div>'
                            +   '</a>'
                        );
                    }
                    p++;
                }
            },
            error: function(response) {}
        });
    });


});

