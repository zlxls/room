;(function(win,factory){
	if (typeof define === 'function') {	//兼容amd、cmd规范，如seajs,requirejs
		define(['jQuery', 'dialog'],factory);
	} else if (typeof module === 'object' && module.exports) {	//兼容nodejs
		var jQuery, dialog;
		try {
			jQuery = require('jquery');
			dialog = require('dialog');
		}
		catch (err) {
			jQuery = null;
			dialog = null;
		}
		module.exports = require(['jquery', 'dialog']);
	} else {
		// 将Lui挂载在windows下
		win.Lui = win.Lui || {};
		//将Alert挂载在Lui下，并传入jQuery形参
		win.Lui.Alert = factory(win.jQuery || win.$, win.Lui.Dialog);
	};
})(this, function($, Dialog){

return {
	alert: function(content, callback, unclose, opt){
		return new Dialog($.extend({
			title: '提示',
			width: 400,
			content: '<div class="ui-alert">' + content + '</div>',
			autoOpen: true,
			buttons: {
				'确定': {
					events: {
						click: function(){
							callback && callback();
							!unclose && this.destroy();
						}
					},

					className: 'ui-alert-button-confirm'
				}
			}
		}, opt || {}));
	},

	warn: function(content, callback, unclose, opt){
		return this.alert('<div class="ui-alert-warn">' + content + '</div>', callback, unclose, opt);
	},

	error: function(content, callback, unclose, opt){
		return this.alert('<div class="ui-alert-error">' + content + '</div>', callback, unclose, $.extend({
			title: '错误'
		}, opt || {}));
	},

	success: function(content, callback, unclose, opt){
		return this.alert('<div class="ui-alert-success">' + content + '</div>', callback, unclose, $.extend({
			title: '操作成功'
		}, opt || {}));
	},
	/**
	 * 同浏览器默认的confirm 
	 * content：显示内容
	 * callback：确认后执行的函数
	 * unclose：点击确认后不关闭
	 * 
	 * 当unclose为true时 可手动执行close或者destory方法关闭弹窗
	 */
	confirm: function(content, callback, unclose, opt){
		return new Dialog($.extend({
			title: '提示',
			width: 400,
			content: '<div class="ui-alert">' + content + '</div>',
			autoOpen: true,
			buttons: {
				'确定': {
					events: {
						click: function(){
							callback();
							!unclose && this.destroy();
						}
					},

					className: 'ui-alert-button-confirm'
				},

				'取消': {
					events: {
						click: function(){
							this.destroy();
						}
					},

					className: 'ui-alert-button-cancel'
				}
			}
		}, opt || {}));
	}
};

});