var img_index = 0;
var img_src = "";
$(function () {
    var lightbox = (function () {
        // 点击关闭弹出框
        $(".photo-close").on("click", function () {
            $(".pop").hide();
            $(".shadow").hide();
        })
        //下一张图片
        $(".pop .photo-div .arrow-next").click(function () {
            img_index++;
            if (img_index >= $(".show li img").length) {
                img_index = 0;
            }
            img_src = $(".show li img").eq(img_index).attr("src");
            photoView($(".show li img"));
        });
        //上一张图片
        $(".pop .photo-div .arrow-prv").click(function () {
            img_index--;
            if (img_index < 0) {
                img_index = $(".show li img").length - 1;
            }
            img_src = $(".show li img").eq(img_index).attr("src");
            photoView($(".show li img"));
        });
        //弹出框图片显示
        $(".show li img").click(function () {
            $(".shadow").show();
            $(".pop").show();
            img_src = $(this).attr("src");
            img_index = $(this).index();
            photoView($(this));
        });
        return window.lightbox()
    })()
});

//自适应预览
function photoView(obj) {
    if ($(obj).width() >= $(obj).height()) {
        $(".pop .photo-div .photo-img .photo-view-h").attr("class", "photo-view-w");
        $(".pop .photo-div .photo-img .photo-view-w img").attr("src", img_src);
    } else {
        $(".pop .photo-div .photo-img .photo-view-w").attr("class", "photo-view-h");
        $(".pop .photo-div .photo-img .photo-view-h img").attr("src", img_src);
    }
    // 打印下标
    console.log(img_index);
}