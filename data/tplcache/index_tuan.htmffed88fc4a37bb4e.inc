<?php
$z[0]=Array("field","",64,83);
$z[0][4]['name']="title";
$z[1]=Array("global","",84,110);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",151,180);
$z[2][4]['name']="keywords";
$z[3]=Array("field","",220,278);
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("include","",906,943);
$z[4][4]['filename']="header.htm";
$z[5]=Array("arclist","\r\n        <li>\r\n          <div class=\"imgdiv\">\r\n            <div class=\"icons\"> <i class=\"iconHaowu\"></i> <i class=\"iconPrefer\"></i> </div>\r\n            <a href=\"[field:arcurl/]\" target=\"_blank\"> <img src=\"[field:litpic/]\" alt=\"\"> </a> </div>\r\n          <div class=\"proptydetails\">\r\n            <h1><a href=\"[field:arcurl/]\" target=\"_blank\">[field:title/]</a> </h1>\r\n            <div class=\"information\">\r\n              <div class=\"detail\">\r\n                <table>\r\n                  <tbody>\r\n                    <tr>\r\n                      <th><i></i>楼盘位置 : [field:typename/]</th>\r\n                      <td>均价： [field:junjia/]元/平米 </td>\r\n                      <td class=\"openDate\" title=\"\">开盘日期：[field:pubdate function=MyDate('y-m-d',@me)/]</td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n                <dl>\r\n                  <dt>海南易居团购优惠活动：</dt>\r\n                  <dd>[field:tmaidian/]</dd>\r\n                </dl>\r\n                <div class=\"tolearn\"> <a target=\"_blank\" href=\"[field:arcurl/]\">了解详情<i></i></a> </div>\r\n              </div>\r\n              <div class=\"data\">\r\n                <h2><strong> [field:click/] </strong>人推荐</h2>\r\n                \r\n                <input class=\"recommend login\" type=\"submit\" onclick=\"window.open('http://wpa.qq.com/msgrd?v=3&uin=541475789&site=qq&menu=yes')\" value=\"在线咨询\">\r\n                \r\n             \r\n                <a class=\"tobuy login\" data-reveal-id=\"myModal\">我要看房</a>\r\n                \r\n              </div>\r\n            </div>\r\n            \r\n          </div>\r\n        </li>\r\n       ",1102,2908);
$z[5][4]['typeid']="1";
$z[5][4]['flag']="f";
$z[5][4]['row']="18";
$z[5][4]['titlelen']="50";
$z[5][4]['orderby']="pubdate";
$z[5][4]['addfields']="tmaidian,tyouhui,junjia";
$z[5][4]['channelid']="2";
$z[6]=Array("field","",4477,4496);
$z[6][4]['name']="title";
$z[7]=Array("include","",5213,5250);
$z[7][4]['filename']="footer.htm";

?>