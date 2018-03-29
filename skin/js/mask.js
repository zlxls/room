;(function(win,factory){
	if (typeof define === 'function') {
		//seajs or requirejs environment
		define(function(require, exports, module){
			return factory(
				require('jquery')
			);
		});
	} else if (typeof module === 'object' && module.exports) {	//兼容nodejs
		var jQuery;
		try {
			jQuery = require("jquery");
		}
		catch (err) {
			jQuery = null;
		}
		module.exports = require('jquery');
	} else {
		// 将Lui挂载在windows下
		win.Lui = win.Lui || {};
		//将 Mask 挂载在Lui下，并传入jQuery形参
		win.Lui.Mask = factory(win.jQuery || win.$);
	};
})(this,function($){

var container;
// 定义mask实例
function Mask(opt){
	this.options = $.extend({
		autoOpen: true,
		color: '#000',
		opacity: .6,
		container: document.body
	},opt || {});

	this.init();
};

Mask.prototype = {
	// 初始化
	init: function(){
		var self = this;
		container = self.container = $(this.options.container);

		// 判断container是否为body，若不是，给父元素加position：abdolute
		(self.options.container == document.body) || 
		/fixed|absolute/.test(container) || container.css('position','relative');

		// 创建mask
		self.mask = $('<div class="ui-mask"></div>').hide().css({
			// 注意此处的css用的是属性，没有加引号，属性为js中，非css
			background: self.options.color,
			//对于IE，js会自动转 filter: alpha(opacity=60); zoom: 1
			opacity: self.options.opacity
		}).appendTo(self.options.container);

		self.options.autoOpen && this.open();

		// 根据窗口大小动态改变mask尺寸
		$(window).resize(function(){
			self.resetPosition();
		});
	},

	// 初始化尺寸大小
	resetPosition: function(){
		this.mask.css({
			width: container[0].scrollWidth || document.documentElement.scrollWidth,
			height: container[0].scrollHeight || document.documentElement.scrollHeight
		});
	},

	// 打开
	open: function(){
		this.resetPosition();
		this.mask.show();
	},

	// 关闭
	close: function(){
		this.mask.hide();
	},

	// 移除
	destroy: function(){
		this.mask.remove();
	}
};

// 将Mask return出去
return Mask;

});