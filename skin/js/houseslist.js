$(function() {
    var paramsList = [];
    /*
     * 新房搜索
     */
    var btnSearch = $('#btn-search'), inputKw = $('#kw'), searchForm = $('#searchForm');

    btnSearch.click(function() {
        searchForm.submit();
    });
    searchForm.submit(function() {
        var kw = $.trim(inputKw.val());
        if (kw == '') {
            top.location = baseUrl;
            return false;
        }
    });

    initPlayerEvent();

    // 搜索栏【特色】上下滑动
    var height = 58,
            autoHeight = $(".param-item2").height() + 21;

    $(".param-item2 i").on("click", function(e) {
        var o = {
            slideUp: [height, "slideDown"],
            slideDown: [autoHeight, "slideUp"]
        }, i = e.target.className;

        $(this).removeClass().addClass(o[i][1]).parents('.param-item').animate({height: o[i][0]});
    });

//自定义分页
    var btnPageSub = $('.page-box .sub_page'), page_number = $('#page_number'), pageForm = $('#pageForm'), page_ipt = $('#page_ipt');
    btnPageSub.click(function() {
        if (page_number.val() == '') {
            page_number.focus();
            return false;
        }
        var p = parseInt(page_number.val());
        if (isNaN(p) || p < 1) {
            page_number.focus();
            return false;
        }
        page_ipt.val(p);
        pageForm.submit();
    });


    // 右侧栏广告 轮播
    function initPlayerEvent() {
        var $imgList = $('.poster a'),
                $playerButtonList = $('.player-button'),
                ind = 0;

        $playerButtonList.click(function(e) {
            var $target = $(e.currentTarget);
            if ($target.hasClass('active')) {
                return;
            }

            $playerButtonList.removeClass('active');
            $target.addClass('active');
            $imgList.hide();
            $('#' + $target.attr('target')).show().css('opacity', 0.2).animate({
                opacity: 1
            });
        }).eq(0).click();
        // 轮播
        setInterval(function() {
            if ($imgList.length > 1) {
                $playerButtonList.eq(ind).click();
                ind += 1;
                if (ind == $imgList.length) {
                    ind = 0;
                }
            }
        }, 3000);

    }



    /**
     * 排序事件
     */
    function initSortEvent() {
        var $paramSort = $('.param-sort > button');
        $paramSort.click(function(e) {
            var $target = $(e.currentTarget);
            $paramSort.removeClass('sort-active');
            $target.addClass('sort-active');
            $target.blur();
        });
    }
    /**
     * 参数事件
     */
    function initParamsEvent() {
        return;
        var $paramsList = $('.params-box > div');
        var $currentParams = $('.current-params');
        $paramsList.delegate('span', 'click', function(e) {
            var $target = $(e.currentTarget),
                    $paramBox = $target.closest('div'),
                    $allTab = $paramBox.find('span'),
                    active = $target.hasClass('active');

            $allTab.removeClass('active');
//            if (!active) { // 再点一次取消掉
            $target.addClass('active');
//            }

            setParams();
        });


        $currentParams.delegate('[param-type]', 'click', function(e) {
            var $paramItem = $('[param-type=' + $(e.currentTarget).attr('param-type') + ']');
            $paramItem.find('span:first').click();
        });

        function setParams() {
            return;
            paramsList = [];
            $paramsList.each(function(index, param) {
                var $param = $(param);
                var $active = $param.find('.active');
                var value = $active.attr('value');
                if (value) {
                    paramsList.push({
                        text: $active.text(),
                        value: value,
                        paramType: $active.closest('[param-type]').attr('param-type')
                    });

                }
            });

            showParams();
        }

        function showParams() {
            var paramsHTML = '';
            $.each(paramsList, function(index, param) {
                paramsHTML += '<div class="param">' +
                        '<span class="param-text">' + param.text + '</span>' +
                        '<span class="param-remove pointer">' +
                        '<img src="/static/xf/img/new/remove.png" param-type="' + param.paramType + '" alt=""/>' +
                        '</span>' +
                        '</div>&nbsp;&nbsp;&nbsp;';
            });
            $currentParams.find('.params-list').html(paramsHTML);
        }



    }

    /**
     * tab栏事件
     */
    function initTabEvent() {
        return;
        var $tabLi = $('#tab li');
        $tabLi.on('click', function(e) {
            var $target = $(e.currentTarget);
            $tabLi.removeClass('active');
            $target.addClass('active');

            loadHousesList($target.attr('type'));
        });
//            .eq(0).click();
    }

    /**************价格输入框在输入0后被清空的BUG修复**********/
    function priceSet() {
        var searchStr = window.location.search.slice(1);
        var searchArr = searchStr.split('&');
        for (var i = 0; i < 2; i++) {
            if (!$.isEmptyObject(searchArr[i]) && searchArr[i].split('=').length > 1 && searchArr[i].split('=')[1] === 0) {
                $('#' + searchArr[i].split('=')[0]).val(0);
            }
        }
    }

    priceSet();
});


function queryHouse()
{
    return;
    $.ajax({
        type: "POST",
        url: "query?" + Date.parse(new Date()),
        data: "&id=",
        beforeSend: function(XMLHttpRequest) {

        },
        success: function(ret) {
            //alert(ret);
            rows = eval('(' + ret + ')');
            showQueryList(rows);
            //showOnMap();
        }
    });
}

function loadHousesList(type) { // 加载列表
    return;
    //housesApp.$listScope.housesList = [1,2,3,4];
    //housesApp.$listScope.$digest();
    if (type == 1) {
        $('#saleType').val('');
    }
    else if (type == 2) {
        $('#saleType').val('groupBuy');
    }
    else if (type == 3) {
        $('#saleType').val('distribution');
    }

    queryHouse();
}


function showQueryList(rows)
{
    var saleType = $('#saleType').val();
    var html = "";
    var houseGis = new Array();
    for (i = 0; i < rows['houseInfo'].length; i++)
    {
        html += "<div class=\"house-item\" ng-repeat=\"item in housesList\">";
        html += "	<img width=\"200\" height=\"150\" src=\"" + rows['houseInfo'][i]['housePic'] + "\" alt=\"" + rows['houseInfo'][i]['houseName'] + "\"/>";
        html += "	<h5>" + rows['houseInfo'][i]['houseName'] + "</h5>";
        html += "	<h5 class=\"product-list\">";
        html += "		<span>" + rows['houseInfo'][i]['discountInfo'] + "</span>";
        html += "		&nbsp;&nbsp;";
        html += "		<span></span>";
        html += "	</h5>";
        html += "	<label class=\"marker\">";
        html += "		<span class=\"glyphicon glyphicon-map-marker\"></span>";
        html += "		" + rows['houseInfo'][i]['houseAddress'] + "";
        html += "	</label>";
        html += "	<label class=\"unit-title\"><span>" + rows['houseInfo'][i]['averagePrice'] + "</span> 元/㎡</label>";
        html += "	<br/>";

        var arrHouseBj = rows['houseInfo'][i]['houseBj'].split(',');
        for (iHouseBj = 0; iHouseBj < arrHouseBj.length; iHouseBj++)
        {
            html += arrHouseBj[iHouseBj] != '' ? "	<span class=\"tag\">" + arrHouseBj[iHouseBj] + "</span>" : "";
        }
        //html += "<span class=\"tag\"></span>";
        html += "</div>";

        houseGis.push({lng: rows['houseInfo'][i]['houseLon'], lat: rows['houseInfo'][i]['houseLat'], name: rows['houseInfo'][i]['houseName']});
    }


    document.getElementById('housesList').innerHTML = html;
    displayOnMap(houseGis);
}

/*特色标签是否展开*/
setTimeout('tstoggle()', 10);
function tstoggle() {
    var p = $('.param-item2');
    var s = p.find('a.active:last');
    var sTop = parseInt(s.offset().top);
    var fTop = parseInt($('.param-item2 a:eq(0)').offset().top);
    //最后选中标签是否与第一个同行
    if (sTop > fTop) {
        var b = p.find('i');
        //b.click();
        b.attr('class', 'slideUp');
        p.parent().height('auto');
    }
}

setTimeout(function(){
	$('#housesList').find('a>img').each(function() {
		if (!this.complete || this.naturalWidth == 0) {
			this.src = '/static/xf/img/new/default.jpg';
		}
	});
},5000);
	

