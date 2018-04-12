var accept = (function () {
    var a = new Swiper(".apple-banner .swiper-container", { //实例化一个Swiper对象
        // direction : 'horizontal', //滑动的方向（horzaontal水平、vertical垂直）
        autoplay: 2000, //可选选项，自动滑动
        speed: 1500, //设置silde(滑块)的切换速度  
        loop: true, //设置是否形成闭环，循环
        grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        // pagination : '.swiper-pagination',
        // paginationType : 'bullets',
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false,
        pagination: ".apple-banner .swiper-pagination",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
    });

    var fn={
        stop:function(){
            $("#btn").click(function () {
                //暂停滑动
                 a.stopAutoplay();
                 console.log("1111");
                 })
        },
        start:function(){
                //开始滑动
            $("#btn2").click(function(){
                a.startAutoplay();
                console.log("2222")
            })
        },
        init:function(){    //初始化
            this.stop();
            this.start();
        }
    };
    fn.init();
    window.fn=fn;   //暴露接口
    // return this.fn=fn
    
})();
console.log(this.fn)
console.log(this.fn.init)

