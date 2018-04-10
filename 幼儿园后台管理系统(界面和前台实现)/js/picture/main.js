$(function() {
    // 增加图片
    $("#a").click(function() {
        console.log("1111")
        $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload").on("change", function() {
            var f = document.getElementById('upload').files[0];
            var src = window.URL.createObjectURL(f);; //获取图片的路径，该路径不是图片在本地的路径
            //将图片路径存入src中，显示出图片
            document.getElementById('img1').src = src;
            document.getElementById('a1').href = src;
            $(".last").css({ "display": "block" })

        });
    });
    //建立一個可存取到该file的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    // 删除图片
    $(".item> .animate-box>.btn").click(function() {
        var that = $(this);
        layer.confirm('确认删除此图片吗？', {
            icon: 2,
            title: '确认删除',
            area: ['260px', '170px'],
            shadeClose: true,
            btn: ['确认']
        }, function(index) {
            layer.close(index);
            that.parent().remove();
            layer.msg('删除成功', { time: 1000, icon: 1 });
        });

    })

    /* 下拉菜单 */
    var flag = true;
    var num = 0;
    $(".menu-control").click(function() {
        var oLi = $(this);
        if (num == 0 && oLi.parent().hasClass("active")) {
            oLi.parent().removeClass("active");
            flag = !flag;
            num++;
        }
        oLi.parent().addClass("active");
        if (oLi.parent().hasClass('active') && flag) {
            flag = !flag;
            oLi.next().css("display", "block");
            oLi.next().animate({
                    height: (function() {
                        var str = oLi.next().children().length * 29 + 12 + "px";
                        return str;
                    })()
                },
                300
            );
        } else {
            flag = !flag;
            oLi.next().animate({ height: "0px" }, 300, function() {
                oLi.next().css("display", "none");
                oLi.parent().removeClass("active");
            });
        }
    });
    $(".active > .submenu").animate({
            height: (function() {
                var str = $(".active > .submenu").children().length * 29 + 12 + "px";
                return str;
            })()
        },
        300
    );
    $(".submenu>li").mouseover(function() {
        $(this).addClass("hover");
    });
    $(".submenu>li").mouseout(function() {
        $(this).removeClass("hover");
    });
    $(".submenu>li").click(function() {
        $(this)
            .siblings()
            .removeClass("active");
        $(this).addClass("active");
    });
});
/* 导航隐藏 */
$(function() {
    var falg = true;
    $("#sideNav").click(function() {
        if (falg) {
            $("#func").animate({ "margin-left": "0" }, 300);
            $(".navbar-side").animate({ "margin-left": "-=200px" }, 300);
        } else {
            $("#func").animate({ "margin-left": "200px" }, 300);
            $(".navbar-side").animate({ "margin-left": "0px" }, 300);

        }
        falg = !falg;
    });
});

/* 首页时间 */
$(function() {
    setInterval(function() {
        clock();
    }, 1000);

    function clock() {
        var time = new Date();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        if ($(".h").text() != (hours < 10 ? "0" : "") + hours) {
            $(".h").text((hours < 10 ? "0" : "") + hours);
            shake($(".h"));
        }

        if ($(".m").text() != (minutes < 10 ? "0" : "") + minutes) {
            $(".m").text((minutes < 10 ? "0" : "") + minutes);
            shake($(".m"));
        }

        if ($(".s").text() != (seconds < 10 ? "0" : "") + seconds) {
            $(".s").text((seconds < 10 ? "0" : "") + seconds);
            shake($(".s"));
        }
    }

    $(document).load(function() {
        clock();
    });

    function shake(t) {
        t.addClass("shake-constant");
        setTimeout(function() {
            t.removeClass("shake-constant");
        }, 470);
    }
});