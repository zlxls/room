$(function(){
	var $searchAvailability = $(".searchAvailability, .searBtmBox");

	var page = {
		init: function(){
			this.initDialog();
			this.changeStyle();
			this.initSlide();
			this.bindEvent();
		},

		// 弹层
		initDialog: function(){
			// 第二步
			this.findHouseStep2 = new Lui.Dialog({
				title: false,
				width: 510,
				content: '<div class="step2Dialog"><a href="javascript:void(0);" class="ui-dialog-close"></a><h3>发布购房需求</h3><input type="text" maxlength="11" name="telephone" placeholder="请输入手机号" id="step2_phone"></div>',
				buttons: {
					'提交': {
					  classname: 'submit_loginBtn',
					  events: {}
					}
				}
			});

			// 第二步成功
			this.findHouseStep2Success = new Lui.Dialog({
				title: false,
				width: 500,
				content: '<div class="submitSuccess"><img src="/static/img/hwpc/home/success.png" alt="" /><p>提交成功！</p></div>',
				buttons: {
					'查看需求': {
					  classname: 'look_demand',
					  events: {
						click: function(){
							this.close();
							location.href = '/userCenter/purchaseIntention/savePurchaseIntention';
						}
					  }
					},
					'关闭': {
					  classname: 'close',
					  events: {
						click: function(){
							this.close();
						}
					  }
					}
				}
			});

			// 第二步失败
			this.findHouseStep2Warn = new Lui.Dialog({
				title: false,
				content: '',
				buttons: {
					'关闭': {
					  classname: 'close',
					  events: {
						click: function(){
							this.close();
						}
					  }
					}
				}
			});
		},

		// 判断是否手机注册
		checkPhoneRegister: function(phone){
			var result = false;
			$.ajax({
				url : '/index/checkPhoneRegister',
				type : 'POST',
				dataType : 'json',
				cache : false,
				async: false,
				data : {phone:phone},
				success : function(res) {
					result = res;
				},
				error : function() {
					new Lui.Alert.alert("系统异常，请重新填写房源信息！");
				} 
			});
			return result;
		},

		// 提交房源信息
		submitFindHouse: function(){
			$.ajax({
				url : '/index/publishFindHouse',
				type : 'POST',
				dataType : 'json',
				cache : false,
				async: false,
				data : {},
				success : function(res) {
					if (res.status == 1) {
						page.findHouseStep2Success.open();
					} else {
						page.findHouseStep2Warn.setContent('<img src="/static/img/hwpc/home/warn.png" alt="" /><p>'+res.message+'</p>');
						page.findHouseStep2Warn.open();
					}
				},
				error : function() {
					new Lui.Alert.alert("系统异常，请重新填写房源信息！");   
				} 
			});
		},

		getSelectVal: function($obj, $classSymbol, $valSymbol){
			var $selectVal = '';
			$obj.each(function () {
				if ($(this).hasClass($classSymbol))
				{
					$selectVal = $(this).attr($valSymbol);
					return $selectVal;
				}
			});	
			return $selectVal;
		},

		// 样式效果
		changeStyle: function(){
			var  url = "url("+ $(".advertisement img").prop("src")+")";
			$("#search").css("background-image", url);
		},

		//图片滑动
		initSlide: function(){
			

			// 优惠团购
			var actSlide = new Lui.Slide({
			    dom: '#actSlide'
			});
			$(".actBox .left").on("click", function(){
				actSlide.toPrev();
			});
			$(".actBox .right").on("click", function(){
				if(actSlide.getMaxIndex()-actSlide.index < 4) return;
				actSlide.toNext();
			});

			

			//新闻
			var newSlide = new Lui.Slide({
			    dom: '#newSlide',
			    noGap: true, //无缝
			    after: function(){
			    	$("#newSlideBtn span").eq(this.index).addClass("hover")
			    		.siblings().removeClass();
			    }
			});
			var newBtn = [];
			for (var i = 0; i < newSlide.getMaxIndex()+1; i++) {
				newBtn.push("<span></span>");
			};
			$("#newSlideBtn").empty().html(newBtn.join(""));
			$("#newSlideBtn span").eq(0).addClass("hover");
			setInterval(function(){
    			newSlide.toNext();
			}, 3000);
			$("#newSlideBtn span").on("click", function(){
				var index = $(this).index();
				newSlide.to(index);
			});
		},

		
		

		bindEvent: function(){

		}
	};

	page.init();
});