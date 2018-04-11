(function () {          //自执行函数
    var img_index = 0;
    var img_src = "";
    var box = {    
        "close": function () {                              //点击关闭弹出框
            $(".photo-close").on("click", function () {
                $(".pop").hide();
                $(".shadow").hide();
            })
        },
        "next": function () {                               //下一页
            $(".pop .photo-div .arrow-next").click(function () {
                img_index++;
                if (img_index >= $(".show li img").length) {
                    img_index = 0;
                }
                img_src = $(".show li img").eq(img_index).attr("src");
                box.debug($(".show li img"));
            });
        },

        "nextclick": function () {                          //点击下一页切换图片
            this.next();
        },

        "prvclick": function () {                           //点击切换上一页图片
            this.prv();
        },

        "prv": function () {                                //上一页
            $(".pop .photo-div .arrow-prv").click(function () {
                img_index--;
                if (img_index < 0) {
                    img_index = $(".show li img").length - 1;
                }
                img_src = $(".show li img").eq(img_index).attr("src");
                box.debug($(".show li img"));
            });
        },

        "show": function () {                               //显示弹出框
            $(".show li img").click(function () {
                $(".shadow").show();
                $(".pop").show();
                img_src = $(this).attr("src");
                img_index = $(this).index();
                box.debug($(this));
            });
        },

        "debug": function (obj) {                           //图片实时预览
            if ($(obj).width() >= $(obj).height()) {
                $(".pop .photo-div .photo-img .photo-view-h").attr("class", "photo-view-w");
                $(".pop .photo-div .photo-img .photo-view-w img").attr("src", img_src);
            } else {
                $(".pop .photo-div .photo-img .photo-view-w").attr("class", "photo-view-h");
                $(".pop .photo-div .photo-img .photo-view-h img").attr("src", img_src);
            }
            // 打印日志
            console.log(img_index);
        },

        "init": function () {                               //初始化
            this.close();
            this.debug();
            this.next();
            this.show();
            this.prv();
        }
    };
    box.init();                                             //调用初始化函数
    window.box = {                                          //暴露部分接口
        "nextclick": box.nextclick,
        "nextclick": box.nextclick,
        "prvclick": box.prvclick,

    }
})();
