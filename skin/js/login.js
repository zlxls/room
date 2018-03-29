/**----------------------------------------------------------------------
 * 官网 - 登录、注册、找回密码
 * ----------------------------------------------------------------------
 * create :   2015-08-27
 * ----------------------------------------------------------------------
 * version:   v1.0
 * ----------------------------------------------------------------------
 * author : 张凌 <zhangling@haowu.com>
 * ---------------------------------------------------------------------- */

var verifyCountdownTotalTime = 60,
	verifyCountdownTime = verifyCountdownTotalTime,
	verifyCountdownInterval = null,
	$getCaptcha = $(".getCaptcha"),
	$phoneRegExp = /^(13|15|18|17)[0-9]{9}$/;

function verifyCountdownCall() {
	if (verifyCountdownTime <= 0) {
		if (verifyCountdownInterval != null) {
			clearInterval(verifyCountdownInterval);
		}
		verifyCountdownInterval = null;
		verifyCountdownTime = verifyCountdownTotalTime;
		$getCaptcha.html('重发验证码');
		$getCaptcha.removeAttr("disabled");
	} else {
		$getCaptcha.html(verifyCountdownTime + '秒后重新获取');
		verifyCountdownTime--;
	}
}
$(function() {
	var $loginForm = $(".login_box"),
		$regForm = $(".register_box"),
		$findPwdForm = $(".retrievePassword_box"),
		$autoLoginLabel = $("#autoLoginLabel");

	var login = {
		init: function() {
			this.loginForm();
			this.registerForm();
			this.findPwdForm();
			this.getCaptcha();
			this.bindEvnet();
		},

		// 登录逻辑
		loginForm: function() {
			$loginForm.on("submit", function(e) {
				e.preventDefault();
				var $phone = $(this).find("input[name='phone']"),
					$password = $(this).find("input[name='password']");
				if ($.trim($phone.val()) == "") {
					alert("请输入手机号码！");
					$phone.focus();
					return false;
				}

				if (!$phoneRegExp.test($phone.val())) {
					alert("请输入正确的手机号码！");
					$phone.focus();
					return false;
				}

				if ($.trim($password.val()) == "") {
					alert("请输入密码！");
					$password.focus();
					return false;
				}

				var $passwordLen = $password.val().length;
				if ($passwordLen < 6 || $passwordLen > 16) {
					alert("请输入有效长度密码！");
					$password.focus();
					return false;
				}
				if (/\s/g.test($password.val())) {
					alert("密码不能包含空格！");
					$password.focus();
					return false;
				}

				$loginForm.find("input[type='submit']").attr("disabled", "disabled");
				$.ajax({
					url: '/passport/user/login',
					data: {
						phone: $phone.val(),
						password: $password.val(),
						remember: $loginForm.find("input[name='autoLogin']").attr("checked") == "checked" ? 1 : 0
					},
					type: 'POST',
					cache: false,
					dataType: 'json',
					success: function(data) {
						if (data.status == 1) {
							$("#header .login .userName").text('您好，'  + data.data.brokerName);
							$(".logined").show().siblings().hide();
							window.brokerName = data.data.brokerName;
							if (window.loginDialogContain) {
								loginDialogContain.close();
								// 登录成功的回调
								window.hwpclogin && window.hwpclogin(data);
								window.hwpclogin = null;
							} else {
								location.href = '/';
								// history.go(-1);
							}

						} else {
							alert(data.detail);
						}
						$loginForm.find("input[type='submit']").removeAttr("disabled");
					},
					error: function() {
						$loginForm.find("input[type='submit']").removeAttr("disabled");
						alert("系统异常，请重新登录！");
					}
				});
			});
		},

		// 注册逻辑
		registerForm: function() {
			$regForm.on("submit", function(e) {
				e.preventDefault();
				var $phone = $(this).find("input[name='phone']"),
					$captcha = $(this).find("input[name='captcha']"),
					$captchaImg = $(this).find("input[name='captchaImg']"),
					$password = $(this).find("input[name='password']"),
					$accountName = $(this).find("input[name='accountName']"),
					$sex = $(this).find("input[name='sex']"),
					$agreement = $(this).find("input[name='agreement']");

				if ($.trim($phone.val()) == "") {
					alert("请输入手机号码！");
					$phone.focus();
					return false;
				}

				if (!$phoneRegExp.test($phone.val())) {
					alert("请输入正确的手机号码！");
					$phone.focus();
					return false;
				}

				if ($.trim($captcha.val()) == "") {
					alert("请输入验证码！");
					$captcha.focus();
					return false;
				}

				if ($.trim($captcha.val()) == "") {
					alert("请输入验证码！");
					$captcha.focus();
					return false;
				}

				if ($.trim($password.val()) == "") {
					alert("请输入密码！");
					$password.focus();
					return false;
				}

				var $passwordLen = $password.val().length;
				if ($passwordLen < 6 || $passwordLen > 16) {
					alert("请输入有效长度密码！");
					$password.focus();
					return false;
				}
				if (/\s/g.test($password.val())) {
					alert("密码不能包含空格！");
					$password.focus();
					return false;
				}
				if ($passwordLen == 6) {
					var arr = $password.val().split("");
					if (arr[0] == arr[1] == arr[2] == arr[3] == arr[4] == arr[5] || /112233|123123|123321|123456|654321|abcdef|abcabc/g.test($password.val())) {
						alert("密码过于简单！");
						$password.focus();
						return false;
					}
				}

				if ($.trim($accountName.val()) == "") {
					alert("请输入您的姓名！");
					$accountName.focus();
					return false;
				}

				if ($accountName.val().length > 10) {
					alert("姓名过长！");
					$accountName.focus();
					return false;
				}
				if ($.trim($captchaImg.val()) == "") {
					alert("请输入图片验证码！");
					$captcha.focus();
					return false;
				}

				var sexVal = null;
				$sex.each(function() {
					if ($(this).attr("checked") == "checked") {
						sexVal = $(this).val();
					}
				});
				if (sexVal === null) {
					alert("请选择性别！");
					$accountName.focus();
					return false;
				}

				if (!$agreement.prop("checked")) {
					alert("请勾选我已阅读并同意《好屋中国客户协议》！");
					return false;
				}

				$regForm.find("input[type='submit']").attr("disabled", "disabled");
				$.ajax({
					url: '/passport/user/reg',
					data: {
						phone: $phone.val(),
						captcha: $captcha.val(),
						captchaImg: $captchaImg.val(),
						password: $password.val(),
						accountName: $accountName.val(),
						sex: sexVal
					},
					type: 'POST',
					cache: false,
					dataType: 'json',
					success: function(data) {
						if (data.status == 1) {				//注册成功就已经登录
							alert("恭喜您，注册成功！");
							$("#header .login .userName").text('您好，'  + data.data.brokerName);
							$(".logined").show().siblings().hide();
							if (window.loginDialogContain) {
								loginDialogContain.close();

								// 登录成功的回调
								window.hwpclogin && window.hwpclogin(data);
								window.hwpclogin = null;
							} else {
								location.href = "/";
							}
						} else {
							alert(data.detail);
						}
						$regForm.find("input[type='submit']").removeAttr("disabled");
					},
					error: function() {
						$regForm.find("input[type='submit']").removeAttr("disabled");
						alert("系统异常，请重新注册！");
					}
				});
			});
		},

		// 找回密码逻辑
		findPwdForm: function() {
			$findPwdForm.on("submit", function(e) {
				e.preventDefault();
				var $phone = $(this).find("input[name='phone']"),
					$captcha = $(this).find("input[name='captcha']"),
					$captchaImg = $(this).find("input[name='captchaImg']"),
					$password = $(this).find("input[name='password']"),
					$rpassword = $(this).find("input[name='confirmPassword']");

				if ($.trim($phone.val()) == "") {
					alert("请输入手机号码！");
					$phone.focus();
					return false;
				}

				if (!$phoneRegExp.test($phone.val())) {
					alert("请输入正确的手机号码！");
					$phone.focus();
					return false;
				}

				if ($captchaImg.val() == "") {
					alert("请输入图形验证码！");
					$captchaImg.focus();
					return false;
				}

				if ($.trim($captcha.val()) == "") {
					alert("请输入短信验证码！");
					$captcha.focus();
					return false;
				}

				if ($.trim($password.val()) == "") {
					alert("请输入密码！");
					$password.focus();
					return false;
				}

				var $passwordLen = $password.val().length;
				if ($passwordLen < 6 || $passwordLen > 16) {
					alert("请输入有效长度密码！");
					$password.focus();
					return false;
				}
				if (/\s/g.test($password.val())) {
					alert("密码不能包含空格！");
					$password.focus();
					return false;
				}

				if ($passwordLen == 6) {
					var arr = $password.val().split("");
					if (arr[0] == arr[1] == arr[2] == arr[3] == arr[4] == arr[5] || /112233|123123|123321|123456|654321|abcdef|abcabc/g.test($password.val())) {
						alert("密码过于简单！");
						$password.focus();
						return false;
					}
				}

				if ($.trim($rpassword.val()) == "") {
					alert("请输入确认密码！");
					$rpassword.focus();
					return false;
				}

				if ($password.val() != $rpassword.val()) {
					alert("两次密码不一致！");
					$rpassword.focus();
					return false;
				}

				$findPwdForm.find("input[type='submit']").attr("disabled", "disabled");
				$.ajax({
					url: '/passport/user/findPwd',
					data: {
						phone: $phone.val(),
						captcha: $captcha.val(),
						captchaImg: $captchaImg.val(),
						password: $password.val(),
						rpassword: $rpassword.val()
					},
					type: 'POST',
					cache: false,
					dataType: 'json',
					success: function(data) {
						if (data.status == 1) {
							alert("恭喜您，找回密码成功！");
							if (window.loginDialogContain) {
								$("#loginDialog .login").trigger("click");
							} else {
								window.location.href = data.returnUrl;
							}
						} else {
							//$(".getImgCaptcha").click();
							alert(data.detail);
						}
						$findPwdForm.find("input[type='submit']").removeAttr("disabled");
					},
					error: function() {
						$findPwdForm.find("input[type='submit']").removeAttr("disabled");
						alert("系统异常，请重新找回密码！");
					}
				});
			});
		},

		// 获取验证码
		getCaptcha: function() {
			$getCaptcha.click(function() {
				var getCaptchaType = $(this).attr("act"),
					$parentFormObj = $regForm,
					captchaType = "brokerRegister";
				if (getCaptchaType == "findPwd") {
					$parentFormObj = $findPwdForm;
					captchaType = "forgetPasswd";
				}

				var $phone = $parentFormObj.find("input[name='phone']");
				if ($.trim($phone.val()) == "") {
					alert("请输入手机号码！");
					$phone.focus();
					return false;
				}

				if (!$phoneRegExp.test($phone.val())) {
					alert("请输入正确的手机号码！");
					$phone.focus();
					return false;
				}
				var $captchaImg = $parentFormObj.find("input[name='captchaImg']");
				if ($captchaImg.val() == "") {
					alert("请输入图形验证码！");
					$captchaImg.focus();
					return false;
				}

				if ($(this).attr("disabled") == "disabled") {
					return false;
				}
				$getCaptcha.attr("disabled", "disabled");
				$.ajax({
					type: "POST",
					url: "/passport/user/sendVerify",
					data: {
						type: captchaType,
						captchaImg: $captchaImg.val(),
						accountPhone: $phone.val()
					},
					dataType: "json",
					beforeSend: function() {

					},
					success: function(res) {
						if (res.status == 1) {
							verifyCountdownInterval = setInterval("verifyCountdownCall()", 1000);
						} else {
							$(".getImgCaptcha").click();
							$getCaptcha.removeAttr("disabled");
							alert(res.detail);
						}
					},
					complete: function(XMLHttpRequest, textStatus) {

					},
					error: function() {
						$getCaptcha.removeAttr("disabled");
					}
				});

			});

			// 图片验证码
			$(".getImgCaptcha").on("click", function() {
				$(this).attr("src", "/passport/user/captcha?type=" + $(this).attr("act") + "&r=" + Math.random() * 100000);
			});

			$(".tab .register, #findPasswordBtn").on("click",function(){
				$(".getImgCaptcha").trigger("click");
				$(".retrievePassword_box input[name='captchaImg'], .retrievePassword_box input[name='captcha'], .retrievePassword_box input[name='password'], .retrievePassword_box input[name='confirmPassword']").val("");
			});
		},

		// 零碎事件
		bindEvnet: function() {
			// 退出登录
			$(".loginOut").on("click", function(){
				$.post("/passport/user/logout", {}, function(data){
					if (data.status == 1) {
						// 检查是否是用户中心
						if (!location.pathname.indexOf("/userCenter")) {
							location.href = "/passport/user/logout";
							return;
						}
						// 去掉成功提示
						//new Lui.Alert.alert(data.message);
						$(".unlogin").show().siblings().hide();
					}
				}, "json");
			});

			// checkbox：是否自动登录样式
			$autoLoginLabel.click(function() {
				if ($loginForm.find("input[name='autoLogin']").attr("checked") == "checked") {
					$(this).removeClass("checked");
					$loginForm.find("input[name='autoLogin']").removeAttr("checked");
				} else {
					$(this).addClass("checked");
					$loginForm.find("input[name='autoLogin']").attr("checked", "checked");
				}
			});

			// radiobox：性别选择样式
			$(".sexLine label").on("click", function() {
				$(this).addClass("checked").siblings().removeClass();
				if ($(this).hasClass("checked") && !$(this).next("input").prop("checked"))
					$(this).next("input").click();
				else
					$(this).next("input").siblings("input").click();
			});

			$(".sexLabel").click(function() {
				var thisSexObj = $(this);
				$(".sexLabel").each(function() {
					if (thisSexObj.attr("for") == $(this).attr("for")) {
						$("#" + $(this).attr("for")).attr("checked", "checked");
						$(this).addClass("checked");
					} else {
						$("#" + $(this).attr("for")).removeAttr("checked");
						$(this).removeClass("checked");
					}
				});
			});

			// checkbox：是否同意协议样式
			$(".agreementLine label").on("click", function() {
				$(this).toggleClass("checked");
			});

		}
	};

	login.init();



});

// 清空注册表单缓存值
window.onload = function() {
	setTimeout(function() {
		$(".register_box").find("input[type='text']:not(input[name='phone']),input[type='password']").val("");
	}, 10);
}