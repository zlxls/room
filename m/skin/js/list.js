$(function(){

    /* 导航 */
    if($('.newhouses-nav').length > 0) {

        // 下拉高度设置
        $('.dropdown').height($(document).height() - $('.header').height() - $('.search').outerHeight());

        // 下拉距顶定位
        if ($.trim($('#haojuDevice').val()).toString() != '')
        {
            $('.dropdown').css('top',$('.search').outerHeight() + $('.newhouses-nav').height());
        }
        else
        {
            $('.dropdown').css('top',$('.header').height() + $('.search').outerHeight() + $('.newhouses-nav').height()+$('.info-slide').height());
        }

        // 点击事件
        $('.newhouses-nav .item-name').click(function(){
            if ($(this).find('i').hasClass('Hui-iconfont-arrow2-bottom')) {
                $(this).siblings('.dropdown').show();  // 显示下拉
                $(this).parent().addClass('active').find('i').removeClass('Hui-iconfont-arrow2-bottom').addClass('Hui-iconfont-arrow2-top'); // 改变箭头状态
                $(this).parent().siblings('.item').removeClass('active').find('i').removeClass('Hui-iconfont-arrow2-top').addClass('Hui-iconfont-arrow2-bottom'); // 移除兄弟节点状态
                $(this).parent().siblings('.item').find('.dropdown').hide(); // 隐藏兄弟节点下拉
            }else {
                $(this).parent().removeClass('active').find('i').removeClass('Hui-iconfont-arrow2-top').addClass('Hui-iconfont-arrow2-bottom'); // 删除本身状态
                $(this).siblings('.dropdown').hide(); // 隐藏本身下拉
            }
        });

        //  子选项点击事件
        $(document).on('click', '.newhouses-nav .item:not(:last-child) .dropdown-main li', function(){
            $(this).addClass('active').siblings().removeClass('active');
            if($(this).find('.label').length > 0) {
                var _txt = ($(this).text()).replace($(this).find('.label').text(),'');  // 截取字符串
                $(this).parents('.item').find('.item-name').html(_txt + '<i class="Hui-iconfont Hui-iconfont-arrow2-bottom"></i>');
                $(this).parents('.dropdown').hide().parents('.item').removeClass('active');
            }else {
                $(this).parents('.item').find('.item-name').html($(this).text() + '<i class="Hui-iconfont Hui-iconfont-arrow2-bottom"></i>');
                $(this).parents('.dropdown').hide().parents('.item').removeClass('active');
            }
        });

        // 点击其他透明区域收起
        $(document).on('touchstart','.dropdown',function(e){
            e.preventDefault();
            $(this).hide().parents('.item').removeClass('active').find('i').removeClass('Hui-iconfont-arrow2-top').addClass('Hui-iconfont-arrow2-bottom');
        });

        // 点击主区域阻上事件冒泡
        $(document).on('touchstart','.dropdown-main',function(e){
            e.stopPropagation();
        });

        // tab选项卡
        $(document).on('click','.dd-tab li',function(){
            var curIndex = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().siblings('.dd-tabody').eq(curIndex).removeClass('hide').siblings('.dd-tabody').addClass('hide');
        });

        // tabody 列表项点击事件
        $(document).on('click','.dd-tabody li',function(){
            $(this).addClass('active').siblings().removeClass('active');
            if($(this).text().trim() == "全部") {
                $('.dd-tab li.active').removeClass('selected');
            }else {
                $('.dd-tab li.active').addClass('selected');
            }
        });

        // 点击确定
        $(document).on('click','.dd-operate button:first',function(){
            var selectedNum = $('.dd-tab li.selected').size();
            if(selectedNum == 0) {
                $(this).parents('.dropdown').siblings('.item-name').html('更多<i class="Hui-iconfont Hui-iconfont-arrow2-bottom"></i>');
            }else {
                $(this).parents('.dropdown').siblings('.item-name').html('更多'+selectedNum+'<i class="Hui-iconfont Hui-iconfont-arrow2-bottom"></i>');
            }
            $(this).parents('.dropdown').hide().parents('.item').removeClass('active');
            $(this).parents('.dropdown').siblings('.item-name').find('i').removeClass('Hui-iconfont-arrow2-top').addClass('Hui-iconfont-arrow2-bottom');
        });

        // 点击重置
        $(document).on('click','.dd-operate button:last',function(){
            $('.dd-tabody:first').removeClass('hide').siblings('.dd-tabody').addClass('hide');
            $(this).parent().siblings('.dd-tabody').find('li:first').addClass('active').siblings('li').removeClass('active');
            $('.dd-tab li:first').addClass('active').siblings('li').removeClass('active');
            $('.dd-tab li').removeClass('selected');
        });
    }
});
