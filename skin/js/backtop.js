$(function(){
    // 回到顶部显隐
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 636) {
                $(".backTop").fadeIn(500).css("display", "block");
            } else {
                $(".backTop").fadeOut(500);
            }
        });

        $(".backTop").click(function() {
             $('html, body').animate({scrollTop:0}, 200);
        });

});