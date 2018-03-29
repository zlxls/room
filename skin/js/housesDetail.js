
$(function() {
    //var housesDetail =  {
      //  init: function(){
        //    this.financeAppointment();
          //  this.buyCoupon();
         //   this.agreement();
           // this.bindEvent();
      //  },
        /*
        // 金融产品 立即预约按钮
        financeAppointment: function(){
            var self = this;
            var backFn0 = function(data){
                $("#financeDialog .userName span").text(data.data.brokerName);
                $("#financeDialog .phone span").text(data.data.brokerPhone);
                self.type = 0;
                self.financeDialog(0);
                self.dialog.open();
            }, backFn1 = function(data){
                $("#financeDialog .userName span").text(data.data.brokerName);
                $("#financeDialog .phone span").text(data.data.brokerPhone);
                self.type = 1;
                self.financeDialog(1);
                self.dialog.open();
            };

           // self.financeDialog(0);
		   /*
            
            $(".loginFinanceAppointmentTgb").loginDialog('/xf/houseinfo/appointment/checkLogin?'+Math.random(), null, backFn0, function(){
                    window.hwpclogin = backFn0;
                }
            );
            $(".loginFinanceAppointmentGfb").loginDialog('/xf/houseinfo/appointment/checkLogin?'+Math.random(), null, backFn1, function(){
                    window.hwpclogin = backFn1;
                }
            );
			
        },
		

        // 立即购买
        buyCoupon: function(){
            $('.buy-coupon').on('click', function() {                                                   //立即购买
                var data = $(this).data('info'),
                    self = this;
                $.post('/xf/buyticket/isHasBuy', data, function(result) {
                    if (result.status == -99) {                                                         //没登录
                        //alert('请登录后操作!');
                        window.creat();
                        window.hwpclogin = function(){
                           $(self).trigger("click"); 
                        }
                    } else if (result.status == 1) {
                        if (result.data.isBuy == true) {                                                //已购买
                            var str=(data.type=='haowu')? '该好屋券您已经购买!':'该团购券您已经购买!';
                            alert(str);
                        } else {
                            if (data.type == 'haowu' && data.projectId && data.projectTypeId)
                            {
                                var isBuyTuangou = false;
                                $.ajax({
                                    url : '/xf/buyticket/isHasBuy',   
                                    data : {    
                                        type : 'tuangou',
                                        projectId : data.projectId,
                                        projectTypeId : data.projectTypeId
                                    },    
                                    type : 'POST',
                                    async: false,
                                    cache : false,    
                                    dataType : 'json',    
                                    success : function(result) {
                                        if (result.status == 1) {
                                            if (result.data.isBuy == true) {                             //已购买
                                                isBuyTuangou = true;
                                            }
                                        }
                                    },    
                                    error : function() {
                                        alert("购买异常，请重新购买！");   
                                    }
                                });
                                if (isBuyTuangou == true)
                                {
                                    alert("您已购买过该楼盘，请勿买券！");
                                    return false;
                                }
                            }
                            location = "/xf/buyticket/order?type=" + result.data.type + "&projectId=" + result.data.projectId + "&projectTypeId=" + data.projectTypeId + "&ticketId=" + result.data.ticketId + "&houseId=" + houseId + "&houseName=" + encodeURIComponent(houseName);
                        }
                    }
                }, 'json');
                return false;
            });
        },
		
        
        // 团购宝、购房宝弹框逻辑
        // type: tgb(0)  gfb(1)
        financeDialog: function(type) {
            var self = this;
            self.dialog = new Lui.Dialog({
                dom: "#financeDialog",
                title: "请填写预约信息<i class='dialogClose ui-dialog-close'></i>",
                width: 510,
                esc: true,
                open: function(){
                    // 团购类型显隐
                    if (type == 0) {
                        $(".typeStatus").show();
                    } else {
                        $(".typeStatus").hide();
                    }
                    // 收益率显隐
                    $(".yield span").text($(".yield span").attr("data-" + ["tgb", "gfb"][type]));
                }
            });

            self.statusDialog = new Lui.Dialog({
                esc: true,
                width: 510,
                title: false,
                content: '<div class="statusDialog"><img src="/static/img/hwpc/home/success.png" alt="" /><h4>恭喜您预约成功，</h4><p>您可在我的预约中查看' + ['团购宝', '购房宝'][type]+ '！</p></div>',
                buttons: {
                    '查看我的预约': {
                      classname: 'lookAppointmentDialog',
                      events: {
                        click: function(){
                            this.close();
                            location.href = '/userCenter/makeAppointment/index?type=finance';
                        }
                      }
                    },
                    '关闭': {
                      classname: 'closeDialog',
                      events: {
                        click: function(){
                            this.destroy();
                        }
                      }
                    }
                }
            }); 

        },
		

        agreement: function(){
            $(".icon_acceptBox").on("click", function(){
                $(this).hasClass("unchecked") ? $(this).removeClass("unchecked") : $(this).addClass("unchecked");
            });
        },

        bindEvent: function(){
            var self = this;
            // 点击收藏按钮
            $('#addHouseCollect').click(function() {
                var _this = this;
                if (!$(this).attr("isCollect")) {
                    var url = '/xf/houseinfo/addHouseCollect',
                        warnMessage = '收藏失败!',
                        src = "/static/xf/img/new/qzoned.png",
                        title="已收藏!",
                        status = true;
                } else {
                    var url = '/xf/houseinfo/cancelHouseCollect',
                        warnMessage = '取消收藏失败!',
                        src = "/static/xf/img/new/qzone.png",
                        title="点击收藏楼盘!",
                        status = "";
                }

                $.post(url, {'houseId': houseId}, function(result) {
                    if (result.status == 1) {
                        if (result.data == true) {
                            $('#addHouseCollect').prop("src",src).attr({"isCollect": status,"title": title});
                        }  else {
                            alert(warnMessage);
                        }

                    } else if(result.status== -99) {    //未登录
                        window.creat();
                        window.hwpclogin = function(){
                           $(_this).trigger("click"); 
                        }
                    }else{
                        alert(result.detail || '请求失败,请重试!');
                    }
                }, 'json');
            });

            // 金融产品预约提交
            $("#financeDialog button").on("click", function(){
                // if (!$("#acceptBox").prop("checked")) {
                //     alert("请勾选数钱宝协议！")
                //     return;
                // }

                var data = {
                    housesId: houseId,                                                  //楼盘ID(必须)
                    financeProductType: ['tgb', 'gfb'][self.type],                           //tgb:团购宝 gfb:购房宝
                    groupbuyingTypeId: [$(".typeStatus select").val(),''][self.type],        //团购类型Id
                    groupbuyingTypeName: [$(".typeStatus select").find("option:selected").text(),''][self.type]      //团购类型名称
                };

                $.post('/xf/houseinfo/appointFinancial', data, function(data){
                    if (data.status == 1) {
                        self.dialog.close();
                        self.statusDialog.open();
                    } else {
                        alert(data.message || data.detail);
                        self.dialog.close();
                    }
                }, 'json');
            });
        }

    };
	*/

  //  housesDetail.init();

   // initDefaultEvent();

    initAbstractPlayer(); // 顶部图片

    initHousesPhotoEvent(); // 中间图片

    initRimEvent(); // 周边

    initPhotoDetail(); // 图片详情

    initOrderEvent(); // 预约

    // 滑动
    initDetailEvent();

    var houseLon = $('#houseLon').val();
    var houseLat = $('#houseLat').val();
    var houseName = $('#houseName').val();
    //var center = [121.607868, 31.22345];
    var center = [houseLon, houseLat];
    var centerName = houseName;
    //initMap(center);
    //showCenterMarker(); // 显示中心点
    // 浮动效果
    //bindListHover();
    /*
    var map;
    function initMap(center) {
        map = new AMap.Map('map-container', {
            // 设置中心点
            center: center,
            // 设置缩放级别
            zoom: 14
        });
        var markerList = [];

        var circle = new AMap.Circle({
            center: new AMap.LngLat(center[0], center[1]), // 圆心位置
            radius: 2000, //半径
            strokeColor: "#c0c9dd", //线颜色
            strokeOpacity: 0.7, //线透明度
            strokeWeight: 1, //线粗细度
            fillColor: "#ccd5e7", //填充颜色
            fillOpacity: 0.35//填充透明度
        });
        circle.setMap(map);

        $('.type-list > li:first').click(); // 默认选中第一个

//            return item.distance;

    }
	*/
	

    /**
     * 基础零碎事件
     */
	 /*
    function initDefaultEvent(){
        $('.tip-box').hover(function(e){
            var $span = $(e.currentTarget).find('span');
            if ($span.css('display') == 'none'){
                $span.css('display', 'inline-block');
            } else {
                $span.hide();
            }
        })
    }
	*/
    
    /*
    function bindListHover() {
        $('.rim-list').delegate('.rim-item', 'mouseover', function(e) {
            var $target = $(e.currentTarget),
                    $marker = $('[marker-id=' + $target.attr('item-id') + ']');

            setOpacity($target, '#f7f7f7');
            setOpacity($marker, 0.7);
            map.panTo($target.attr('position').split(','));
        }).delegate('.rim-item', 'mouseleave', function(e) {
            var $target = $(e.currentTarget);
            var $marker = $('[marker-id=' + $target.attr('item-id') + ']');
            setOpacity($target, '#ffffff')
            setOpacity($marker, 1)
        })
    }
	 */

    function setOpacity($node, value) {
        if (isNaN(value)) {
            $node.css('background', value);
        } else {
            $node.css('opacity', value)
        }
    }


    /**
     * 查找周边
     * @param key 关键字
     * @param callback
     */
	/* 
    function searchRim(key, callback) {
        // 搜索周边
        AMap.service(["AMap.PlaceSearch"], function() {
            var placeSearch = new AMap.PlaceSearch({//构造地点查询类
                pageSize: 999,
                pageIndex: 1
            });
            //中心点坐标
            var cpoint = new AMap.LngLat(center[0], center[1]);
            placeSearch.searchNearBy(key, cpoint, 2000, function(status, result) {
                callback(result);
            });
        });
    }
	*/

    function initDetailEvent() {
        var $body = $("html, body");
        $('.detail-tab li').click(function(e) {
            var $target = $(e.currentTarget),
                    toTarget = $target.attr('to-target');

            $body.animate({
                scrollTop: ($(toTarget).offset().top - 120) + 'px'
            }, {
                duration: 500,
                easing: "swing"
            })
        });

        $('#marker').click(function(){
            $body.animate({
                scrollTop: $('#map-container').offset().top + 'px'
            }, {
                duration: 500,
                easing: "swing"
            })
        });
    }

    /**
     * 预约事件
     */
	
    function initOrderEvent() {
        var $orderModal = $('#orderModal'),
            $successModal = $('#successModal');

        var userName = $orderModal.find('#userName').val();

        $('#orderModal .close-order').click(function() {
            $orderModal.hide();
        });
       
	   
        //免费预约看房
		/*
        $(".loginLookButton").loginDialog('/xf/houseinfo/appointment/checkLogin?'+Math.random(),null,
            function(){
               
                 $orderModal.find('#userName').val(userName);
                 var dateObj = new Date(Date.now() + 24*60*60*1000);
                 var time = dateObj.getFullYear() + '-' + (dateObj.getMonth()+1) + '-' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' +dateObj.getMinutes();
                 $orderModal.find('#orderDate').val(time);
                 $orderModal.find('#financeServiceType option').eq(0).prop('selected', true);
                 window.brokerName && $("#orderModal #userName").val(window.brokerName);
                 $orderModal.show();
            }, function(){
                 // fix bug: 用户名未带入dialog
                window.hwpclogin = function(data){
                    $("#orderModal #userName").val(data.data.brokerName);
                    $orderModal.show();
                };
            }
        );
		
		
           
        setTimeout(function(){
            $('#orderDate').datetimepicker({
                weekStart: 1, // 星期第一天 周一
                autoclose: true, // 选择日期后是否立即关闭
                startDate: new Date((new Date).getTime() + 24*60*60*1000),
                initialDate: new Date(),
                todayHighlight: true, // 高亮当前日期
                startView: 2, // 打开后首选显示的视图 (2日, 3月)
                minView: 0, // 能够提供的 精确视图 (0分,1时,2日, 3)
                minuteStep: 5, // 分钟的显示密度, 默认5
                format: 'yyyy-mm-dd hh:ii', // 日期格式
                language: 'zh-CN'
            });
        }, 1000)
		

        $('#orderSubmit').click(function() {//预约楼盘
            var _this = $(this);
            var $userName = $('#userName');
            var $orderDate = $('#orderDate');
            if ($userName.val() == '') {
                alert('请输入您的姓名!');
                $userName.focus();
                return;
            }
            if ($orderDate.val() == '') {
                alert('请输入看房时间!');
                $orderDate.focus();
                return;
            }
            _this.attr('disabled', 'disabled').text('正在提交...');
            $.post('/xf/houseinfo/appointment', {'houseId': houseId, 'userName': $userName.val(), 'orderDate': $orderDate.val(), 'financeServiceType': $('#financeServiceType').val() || -1}, function(result) {
                _this.removeAttr('disabled').text('提交');
                if (result.status == 1) {
                    $orderModal.hide();
                    $successModal.show();
                } else {
                    alert(result.detail || '提交失败,请重试!');
                }
            }, 'json');
            //$orderModal.hide();
            // $successModal.show();
        });
	


        $('#successModal .close-order, #orderConfirm').click(function() {
            $successModal.hide();
        });
			*/

    }

    /**
     * 更多的图片事件
     */
    function initPhotoDetail() {
        var $photoDetailModal = $('#photoDetailModal');
        var $detailImgList = $('.detail-player-list');
        var $detailPhotoList = $('.detail-photo-list');
        $('.close-detail').click(function() {
            $photoDetailModal.hide();
        });

        // 位置修正
        var pos_top = ($(window).height() - 700) / 2;
        pos_top = pos_top > 20 ? pos_top : 20;
        $photoDetailModal.find('.photo-detail').css({
            top: pos_top
        });

        $('.more').click(function() {
            $photoDetailModal.show();
            if ($('.photo-type-list').find('div.active').length < 1)
                $typeList.eq(0).click();
        });
		$('.arc .picbox li').click(function() {
            $photoDetailModal.show();
            if ($('.photo-type-list').find('div.active').length < 1)
                $typeList.eq(0).click();
        });
        $('.houseAlbumArea').delegate(".photo-list-body img", "click", function(){
            $photoDetailModal.show();
            var index = $(this).attr("data-index");
            $typeList.eq(index).click();
        });
        
        $('#house_img_list_big').on('click','img',function(){
            var idx=$(this).index();
            if(idx===0){
                idx=3;
            }else if(idx<=3){
                idx=idx-1;
            }
            $photoDetailModal.show();
             $typeList.eq(idx).click();
        });
        

        var $typeList = $('.photo-type-list > div');
        $typeList.click(function(e) {
            var $target = $(e.currentTarget),
             type = $target.attr('type');
            //alert($target);
            $('.detail-player-list').css('margin-left', '0px');   //初始化小图列表位置
            if ($target.hasClass('active')) {
                return;
            }
          
            $typeList.removeClass('active');
            $target.addClass('active');
            var list = new Array();
			$(".detail-player-list img").each(function(i,v){
				list[i] = $(this).attr('src');
				//alert($(this).attr('src'));
			});
            showDetailList(list);
            setTimeout(function() {
                $('#photoDetailModal .detail-photo-list,#photoDetailModal .detail-player-list').find('img').each(function() {
                    $(this).attr('src', $(this).data('src'));
                })
            }, 50);
        });
		$("#")

        // 左右切换
        $('.photo-left').click(function(e) {
            e.stopPropagation();
            var obj = $('.detail-player-list > img.active').prev();
            if (obj.length) {
                obj.click();
            } else {
                var p = $('.photo-type-list > div.active').prev();
                if (p.length) {
                    p.click();
                    $('.detail-player-list img:last').click();
                } else {
                    $('.photo-type-list > div:last').click();
                }
            }
        });
        $('.photo-right').click(function(e) {
            e.stopPropagation();
            var obj = $('.detail-player-list > img.active').next();
            if (obj.length) {
                obj.click();
            } else {
                var p = $('.photo-type-list > div.active').next();
                if (p.length) {
                    p.click();
                } else {
                    $('.photo-type-list > div:first').click();
                }
            }
        });


        function showDetailList(list) {
            var listBodyHTML = '',
                listPlayerHTML = '';
            $.each(list, function(index, item){
                listBodyHTML += '<img width="720" height="540" ng-repeat="item in detailList" src="' + (item) + '"/>';
                listPlayerHTML += '<img width="100" height="75" ng-repeat="item in detailList" src="' + (item) + '" index="' + index + '"/>';
            });
			var $detailPhotoList =   $('.detail-photo-list');
            $detailPhotoList.css('marginLeft', 0)
            $('.detail-photo-list').html(listBodyHTML);
            $('.detail-player-list').html(listPlayerHTML);


            var $imgList = $('.detail-player-list img');
            $imgList.click(function(e) {
                var $target = $(e.currentTarget),
                index = $target.attr('index');
                // alert(index);
                if ($target.hasClass('active')) {
                    return;
                }

                $imgList.removeClass('active');
                $target.addClass('active');

               $detailPhotoList.animate({
                    'marginLeft': index * 720 * -1
                })
                $detailPhotoList.css('marginLeft', index * 720 * -1);

            }).eq(0).click();


            max = stepLength * (list.length - 5) * -1;
            length = list.length;
        }
		
		$(".detail-player-list img").click(function(){
			if($(this).hasClass('active')){
				return;
			}else{
				$(this).addClass('active');
				$(this).siblings().removeClass('active');
				var num = $(this).attr('index');
				$(".detail-photo-list").css('marginLeft', -num * 720);
				
			}
		});
		


        // 左右移动列表事件
        var playMarginLeft = 0,
                stepLength = 128,
                step = 2,
                max,
                length,
                $detailPlayerList = $('.detail-player-list');
        // 轮播事件
        $('.detail-player .player-left').click(function(e) {
            $('.photo-left').click();  // 图片向后翻一张
            if (length < 5) {
                return;
            }

            playMarginLeft += stepLength * step;
            if (playMarginLeft >= 0) { // 越界
                playMarginLeft = 0;
            }
            displayPlayer();
        });

        $('.detail-player .player-right').click(function(e) {
            $('.photo-right').click(); // 图片向后翻一张
            if (length < 5) {
                return;
            }
            playMarginLeft -= stepLength * step;
            if (playMarginLeft <= max) { // 越界
                playMarginLeft = max;
            }
            displayPlayer();
        });

        function displayPlayer() {
            $detailPlayerList.animate({
                'marginLeft': playMarginLeft
            })
        }

//        $typeList.eq(0).click();

    }

    /**
     * 交通配套事件
     */
    function initRimEvent() {
        var $li = $('ul.type-list li');

        $li.click(function(e) {
            var $target = $(e.currentTarget);

            if ($target.hasClass('active')) {
                return;
            }
            $li.removeClass('active')
            $target.addClass('active');

            searchRim($target.attr('data-keywords'), function(result) {
                showRimList(result.poiList || {pois: []});
            });
        });
    }

    /**
     * 显示周边列表
     * @param list
     */
   

    /**
     * 显示中心区域marker
     */
	 /*
    function showCenterMarker() {
        var $body = $(document.body);
        var marker = new AMap.Marker({
            icon: '/static/xf/img/new/label2.png',
            position: center
        });
        var $markerContent = $(
                '<div>' +
                '   <img style="margin-top: 39px;position: absolute" src="/static/xf/img/new/label2.png" alt=""/>' +
                '   <span correct="correct" style="' +
                'display: inline-block;' +
                'white-space: nowrap;' +
                'border:1px solid #ff6600;' +
                'background: #ff8100;' +
                'padding:10px 20px;' +
                'border-radius: 6px;' +
                'color:#ffffff;' +
                '">'
                + centerName + '</span>' +
                '   ' +
                '</div>'
                ),
                $span = $markerContent.find('span');
        $body.append($markerContent);
        var float = $span.width();
        $span.css('margin-left', -float / 2 - 5); // 根据文本长度调整文本漂移

        marker.setContent($markerContent[0]);
        marker.setMap(map);
    }
    */

    /**
     * 楼盘图片事件
     */
    function initHousesPhotoEvent() {
        var $li = $('.photo-tab li');
        $li.click(function(e) {
            var $target = $(e.currentTarget);

            if ($target.hasClass('active')) {
                return;
            }

            $li.removeClass('active');
            $target.addClass('active');

            var idx = $target.attr('type');
            showPhotoList($houseImg[idx], $(this).index());
            if (idx > 0) {
                $('.photo-list-body').find('div.photo-intro').remove();
            }
            setTimeout(function() {
                $('.photo-list-body').find('img').each(function() {
                    $(this).attr('src', $(this).data('src'));
                })
            }, 50);
        });

        function showPhotoList(list, dataIndex) {
//            housesApp.$photoScope.photoList = list;
//            housesApp.$photoScope.$digest();

            var photoListBodyHTML = '';
            $.each(list, function(index, item){
                photoListBodyHTML += '<div class="text-center" ng-repeat="item in photoList">' +
                    '<img src="' + (item.pic || item) + '" data-index="' + dataIndex + '" width="320" height="240"/>' +
                    '<div class="photo-intro">' +
                    '<p>' + item.type + '</p>' +
                    item.room +
                    '&nbsp;&nbsp;&nbsp;&nbsp;' +
                    item.area +
                    '</div>' +
                '</div>';
            });
            $('.photo-list-body').html(photoListBodyHTML);

            length = list.length;
            max = (list.length - 3) * stepLength * -1;
            playMarginLeft = 0;
            displayPlayer();
        }

        // 左右移动列表事件
        var playMarginLeft = 0,
                stepLength = 352,
                step = 2,
                max,
                length,
                $photoList = $('.photo-list-body');
        // 轮播事件
        $('.player-button.pull-left').click(function(e) {
            if (length < 3) {
                return;
            }
            playMarginLeft += stepLength * step;
            if (playMarginLeft >= 0) { // 越界
                playMarginLeft = 0;
            }
            displayPlayer();
        });

        $('.player-button.pull-right').click(function(e) {
            if (length < 3) {
                return;
            }
            playMarginLeft -= stepLength * step;
            if (playMarginLeft <= max) { // 越界
                playMarginLeft = max;
            }
            displayPlayer();
        });

        function displayPlayer() {
            $photoList.animate({
                'marginLeft': playMarginLeft
            })
        }


        $li.eq(0).click();
    }

    /**
     * 图片轮播
     */
    function initAbstractPlayer() {
        var $listBox = $('.abstract-img-list'),
                $list = $listBox.find('>img'),
                $playListBox = $('.play-list'),
                $playList = $playListBox.find('>img');
        // 位置初始化
        $listBox.css('width', $list.length * 700);
        $playListBox.css('width', $playList.length * 130);
        $('.abstract-img-player').css('marginTop', -95);

        if($list.length > 1) {
            $('.abstract-img-player').css('display', 'block');          // wze
        }
        // 切换图片事件
        $playList.click(function(e) {
            var $target = $(e.currentTarget),
                    index = $target.attr('index');

            $playList.removeClass('active');
            $target.addClass('active');

            $listBox.animate({
                'marginLeft': index * -600
            })
        }).eq(0).click();

        // 左右移动列表事件
        var playMarginLeft = 0,
                stepLength = 119,
                step = 1,
                length = $playList.length,
                max = ($playList.length - 4) * stepLength * -1;


        $('.abstract-img-player .player-left').click(function() {
            $('.abstract-img-player .active').prev().click(); // 图片向前翻一张
            if (length < 4) {
                return;
            }
            playMarginLeft += stepLength * step;
            if (playMarginLeft >= 0) { // 越界
                playMarginLeft = 0;
            }
            displayPlayer();

        });
        $('.abstract-img-player .player-right').click(function() {
            $('.abstract-img-player .active').next().click(); // 图片向后翻一张
            if (length < 4) {
                return;
            }
            playMarginLeft -= stepLength * step;
            if (playMarginLeft <= max) { // 越界
                playMarginLeft = max;
            }
            displayPlayer();
        });

        function displayPlayer() {
            $playListBox.animate({
                'marginLeft': playMarginLeft
            })
        }
    }




})