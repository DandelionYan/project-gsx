/**
 * Created by zxy on 16/7/28.
 */



/**
 * Created by zxy on 16/7/27.
 */
define(function(require, exports){

    'use strict';
    // var lazyLoadImage = require("common/loader/lazyLoadImage");
    var id = 0;
    var arr = [];
    var array = [];

    /**
     *去掉数据中的html标签
     */
    function del_html_tags(content) {
        return content.replace('^\s+', '').replace('\s+$', '').replace('^(?:&nbsp;)+', '').replace('(?:&nbsp;)+$', '').replace(/<[^>]+>/g, '').replace(/\s/g, '').replace(/\r/g, "").replace(/\t/g, "").replace(/\n/g,"");
    }

    function substr(summary) {
        return summary.slice(0, 62);
    }

    $.each($('.summary'), function(index){
        var str = del_html_tags($('.content-hide').eq(index).html());
        var str1 = substr(str) + '.....';
        $('.summary-content').eq(index).html(str1);
    });

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

    $('.input-box input').val(getParam(location.href).query||'');
    arr[0] = getParam(location.href).pid;
    arr[1] = getParam(location.href).cid;


    /**
     * 办学性质
     */
    $.each($('.school_type .item'), function(index) {
        var that = $('.school_type .item').eq(index);
        if(getParam(location.href).school_type == that.data('name')) {
            $('.school_type .limit').removeClass('highlight');
            that.addClass('highlight');
        }
        $('.school_type').on("click", ".item", function(){
            $(this).siblings().removeClass('highlight');
            $(this).addClass('highlight');
            searchKey($(this).html(), "school_type");
        });
    });

    var school_type = $('.school_type .highlight').html();

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
    $.each($('.entrance .item'), function(index) {
        var that = $('.entrance .item').eq(index);
        if(getParam(location.href).entrance == that.data('name')) {
            $('.entrance .limit').removeClass('highlight');
            that.addClass('highlight');
        }
    });

    $('.entrance').on("click", ".item", function(){
        $(this).siblings().removeClass('highlight');
        $(this).addClass('highlight');
        searchKey($('.entrance .highlight').html(), "entrance");
    });

    var entrance = $('.entrance .highlight').html();

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



    var province = $('.province .highlight').html();
    var city = $('.city .highlight').html();
    var district = $('.district .highlight').html();
    $('title').html = '';
    var keywords;
    var description;
    var len = $('meta').length;
    $('title').html("中学院校_中学院校排名_中学排名_跟谁学");
    keywords = "中学院校,中学院校排名,中学排名";
    description = "跟谁学中学院校频道为您提供中学院校,中学院校排名,中学排名等相关资讯，同时，您也可以在我们网站掌握实时的中学院校";
    $.each($('meta'), function(i) {
        if ($('meta')[i].name == 'keywords') {
            $('meta')[i]["content"] = keywords;
        }
        if ($('meta')[i].name == 'description') {
            $('meta')[i].content = description;
        }
    });
    // for (var i = 0; i < len; i++) {
    //     console.log($('meta')[i].name);
    //     if ($('meta')[i].name = 'keywords') {
    //         $('meta')[i].content = keywords;
    //     }
    //     if ($('meta')[i].name = 'description') {
    //         $('meta')[i].content = description;
    //     }
    // }



    /**
     * 省
     */
    var str = '<span class="item limit highlight" data-name="不限">不限</span>';
    $('.province').append(str);

    $.ajax({
        type: "get",
        url: getUrl(),
        data: "",
        dataType: "jsonp",
        success: function(data) {
            $.each(data, function (index) {
                if (data[index].name == getParam(location.href).province) {
                    $('.province .limit').removeClass('highlight');
                    var str1 = '<span class="item highlight" data-id="' + data[index].id + '" data-name="' + data[index].name + '">' + data[index].name + '</span>';
                    arr[0] = data[index].id;
                } else {
                    str1 = '<span class="item" data-id="' + data[index].id + '" data-name="' + data[index].name + '">' + data[index].name + '</span>';
                }
                $('.province').append(str1);
            });

            $('.province').on("click", ".item", function(e){
                arr[0] = $(this).data('id');
                searchKey($(e.target).data().name, "province");
            });


        //    添加TDK
            province = $('.province .highlight').html();
            if(province != '不限') {
                var string1 = province + '中学院校_' + province + '中学院校排名_' + province + '中学排名_跟谁学';
                $('title').html(string1);
                keywords = province + '中学院校_' + province + '中学院校排名_' + province + '中学排名';
                description = '跟谁学中学院校频道为您提供' + province + '中学院校,' + province + '中学院校排名,' + province + '中学排名等相关资讯，同时，您也可以在我们网站掌握实时的中学院校';
                for (var i = 0; i < len; i++) {
                    if ($('meta')[i].name == 'keywords') {
                        $('meta')[i].content = keywords;
                    }
                    if ($('meta')[i].name == 'description') {
                        $('meta')[i].content = description;
                    }
                }
                if (entrance != '不限') {
                    var string2 = '[' + entrance + ']' + province + '中学院校_' + province + '中学院校排名_' + province + '中学排名_跟谁学';
                    $('title').html(string2);
                }
                if (school_type != '不限') {
                    var string3 = '[' + school_type + ']' + province + '中学院校_' + province + '中学院校排名_' + province + '中学排名_跟谁学';
                    $('title').html(string3);
                } if (entrance != '不限' && school_type != '不限') {
                    var string4 = '[' + entrance + '][' + school_type + ']' + province + '中学院校_' + province + '中学院校排名_' + province + '中学排名_跟谁学';
                    $('title').html(string4);
                }
            }



        },
        error: function () {
            return "fail";
        }
    });

    /**
     * 市
     */
    $('.city').append(str);
    if(getParam(location.href).province) {
        if (getParam(location.href).province == "不限" || getParam(location.href).province == '') {
            return false;
        } else {
            $.ajax({
                type: "get",
                url: getUrl(arr[0]),
                data: "",
                dataType: "jsonp",
                success: function (data2) {
                    $.each(data2, function (index) {
                        $('title').html = '';
                        if (data2[index].name == getParam(location.href).city) {
                            $('.city .limit').removeClass('highlight');
                            var str3 = '<span class="item highlight" data-id="' + data2[index].id + '" data-name="' + data2[index].name + '">' + data2[index].name + '</span>';
                            arr[1] = data2[index].id;
                        } else {
                            str3 = '<span class="item" data-id="' + data2[index].id + '" data-name="' + data2[index].name + '">' + data2[index].name + '</span>';
                        }
                        $('.city').append(str3);
                    });
                    $('.city').on("click", ".item", function (e) {
                        arr[1] = $(this).data('id');
                        searchKey($(e.target).data().name, "city");
                    });

                //    修改TDK
                    city = $('.city .highlight').html();
                    if(city != '不限') {
                        var string5 = city + '中学院校_' + city + '中学院校排名_' + city + '中学排名_跟谁学';
                        $('title').html(string5);
                        keywords = city + '中学院校_' + city + '中学院校排名_' + city + '中学排名';
                        description = '跟谁学中学院校频道为您提供' + city + '中学院校,' + city + '中学院校排名,' + city + '中学排名等相关资讯，同时，您也可以在我们网站掌握实时的中学院校';
                        for (var i = 0; i < len; i++) {
                            if ($('meta')[i].name == 'keywords') {
                                $('meta')[i].content = keywords;
                            }
                            if ($('meta')[i].name == 'description') {
                                $('meta')[i].content = description;
                            }
                        }
                        if (entrance != '不限') {
                            var string6 = '[' + entrance + ']' + city + '中学院校_' + city + '中学院校排名_' + city + '中学排名_跟谁学';
                            $('title').html(string6);
                        }
                        if (school_type != '不限') {
                            var string7 = '[' + school_type + ']' + city + '中学院校_' + city + '中学院校排名_' + city + '中学排名_跟谁学';
                            $('title').html(string7);
                        }
                        if(entrance != '不限' && school_type != '不限') {
                            var string8 = '[' + entrance + '][' + school_type + ']' + city + '中学院校_' + city + '中学院校排名_' + city + '中学排名_跟谁学';
                            $('title').html(string8);
                        }
                    }

                },
                error: function () {
                    "fail";
                }
            });

        }
    }

    /**
     * 区
     */
    $('.district').append(str);
    if(getParam(location.href).city) {
        if (getParam(location.href).city == "不限" || getParam(location.href).city == '') {
            return false;
        }
        else {
            $.ajax({
                type: "get",
                url: getUrl(arr[1]),
                data: "",
                dataType: "jsonp",
                success: function (data3) {
                    $.each(data3, function (index) {
                        $('title').html = '';
                        if (data3[index].name == getParam(location.href).district) {
                            $('.district .limit').removeClass('highlight');
                            var str5 = '<span class="item highlight" data-id="' + data3[index].id + '" data-name="' + data3[index].name + '">' + data3[index].name + '</span>';
                        } else {
                            str5 = '<span class="item" data-id="' + data3[index].id + '" data-name="' + data3[index].name + '">' + data3[index].name + '</span>';
                        }
                        $('.district').append(str5);
                    });

                    $('.district').on("click", ".item", function (e) {
                        searchKey($(e.target).data().name, "district");
                    });


                    $('.hot-district').on('click', 'a', function(e) {
                        searchKey($(e.target).html().slice(3), 'bj-district');
                    });

                // 修改TDK
                    district = $('.district .highlight').html();
                    if(district != '不限') {
                        var string9 = district + '中学院校_' + district + '中学院校排名_' + district + '中学排名_跟谁学';
                        $('title').html(string9);
                        keywords = district + '中学院校_' + district + '中学院校排名_' + district + '中学排名';
                        description = '跟谁学中学院校频道为您提供' + district + '中学院校,' + district + '中学院校排名,' + district + '中学排名等相关资讯，同时，您也可以在我们网站掌握实时的中学院校';
                        for (var i = 0; i < len; i++) {
                            if ($('meta')[i].name == 'keywords') {
                                $('meta')[i].content = keywords;
                            }
                            if ($('meta')[i].name == 'description') {
                                $('meta')[i].content = description;
                            }
                        }
                        if (entrance != '不限') {
                            var string10 = '[' + entrance + ']' + district + '中学院校_' + district + '中学院校排名_' + district + '中学排名_跟谁学';
                            $('title').html(string10);
                        }
                        if (school_type != '不限') {
                            var string11 = '[' + school_type + ']' + district + '中学院校_' + district + '中学院校排名_' + district + '中学排名_跟谁学';
                            $('title').html(string11);
                        }
                        if(entrance != '不限' && school_type != '不限') {
                            var string12 = '[' + entrance + '][' + school_type + ']' + district + '中学院校_' + district + '中学院校排名_' + district + '中学排名_跟谁学';
                            $('title').html(string12);
                        }
                    }
                },
                error: function () {
                    "fail";
                }
            });

        }
    }

    /**
     * 搜索框输入
     */
    $("form").on('submit', function () {
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
        var propertyUrl = getParam(location.href).school_type||"";
        var typeUrl = getParam(location.href).school_level||"";
        var entranceUrl = getParam(location.href).entrance||"";
        var queryUrl = getParam(location.href).query||"";
        var pageUrl = getParam(location.href).page||"1";
        if (key == "province") {
            pageUrl = 1;
            provinceUrl = value;
            cityUrl = "";
            districtUrl = "";
            pid = arr[0];
            cid = 0;
        }
        else if (key == "city") {
            pageUrl = 1;
            cityUrl = value;
            districtUrl = "";
            pid = arr[0];
            cid = arr[1];
        }
        else if (key == "district") {
            pageUrl = 1;
            pid = arr[0];
            cid = arr[1];
            districtUrl = value;
        } else if(key == 'bj-district') {
            pageUrl = 1;
            provinceUrl = '北京';
            cityUrl = '北京';
            districtUrl = value;
            pid = arr[0];
            cid = arr[1];

        } else if (key == "school_level") {
            pageUrl = 1;
            pid = arr[0];
            cid = arr[1];
            typeUrl = value;
        }  else if (key == "entrance"){
            pageUrl = 1;
            pid = arr[0];
            cid = arr[1];
            entranceUrl = value;
        }
        else if (key == "school_type") {
            pageUrl = 1;
            pid = arr[0];
            cid = arr[1];
            propertyUrl = value;
        }
        else if (key == "query") {
            pageUrl = 1;
            pid = arr[0];
            cid = arr[1];
            queryUrl = value;
        }else if(key == 'page') {
            pid = arr[0];
            cid = arr[1];
            pageUrl = value;
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
                "&cid=" + cid +
                "&page=" + pageUrl;
    }


    $.each($('.pager a'), function(index) {
        var that = $('.pager a').eq(index);
        if(getParam(location.href).page == that.data('page')) {
            that.siblings().removeClass('active');
            that.addClass('active');
        }
        $('.pager').on("click", "a", function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            searchKey($(this).html(), "page");
        });
    });




});

