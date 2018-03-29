function switchTab(n){
for(var i = 1; i <= 2; i++){
document.getElementById("tab_" + i).className = "";
document.getElementById("tab_con_" + i).style.display = "none";
}
document.getElementById("tab_" + n).className = "on";
document.getElementById("tab_con_" + n).style.display = "block";
}

						//点击展开楼盘项目介绍
var cur_status = "less"; 
$.extend({ 
show_more_init:function(){ 
//alert("show_more_init!"); 
var charNumbers=$(".content").html().length;//总字数 
var limit=200;//显示字数 
if(charNumbers>limit) 
{ 
var orgText=$(".content").html();//原始文本 
var orgHeight=$(".content").height();//原始高度 
var showText=orgText.substring(0,limit);//最终显示的文本 
$(".content").html(showText); 
var contentHeight=$(".content").height();//截取内容后的高度 
$(".switch").click( 
function() { 
if(cur_status == "less"){ 
$(".content").height(contentHeight).html(orgText).animate({ height:orgHeight}, { duration: "slow" }); 
$(this).html("点击收起>>"); 
cur_status = "more"; 
}else{ 
$(".content").height(orgHeight).html(showText).animate({ height:contentHeight}, { duration: "fast" }); 
$(this).html("查看更多>>"); 
cur_status = "less"; 
} 
} 
); 
} 
else 
{ 
$(".switch").hide(); 
} 
} 
}); 
$(document).ready(function(){ 
$.show_more_init(); 
}); 
//点击滑动
jQuery(document).ready(function($){ 
$('.a').click(function(){$('html,body').animate({scrollTop:$('.tgyh').offset().top-40}, 800);}); 
$('.b').click(function(){$('html,body').animate({scrollTop:$('.bbox').offset().top-40}, 800);}); 
$('.c').click(function(){$('html,body').animate({scrollTop:$('.cbox').offset().top-40}, 800);}); 
}); 
				