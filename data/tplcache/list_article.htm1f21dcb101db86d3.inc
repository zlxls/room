<?php
$z[0]=Array("field","",212,231);
$z[0][4]['name']="title";
$z[1]=Array("global","",232,258);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",299,328);
$z[2][4]['name']="keywords";
$z[3]=Array("field","",368,426);
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("include","",1074,1111);
$z[4][4]['filename']="header.htm";
$z[5]=Array("type","<a class=\"navLink navAction\" href=\"[field:typeurl/]\">全部</a>",1539,1636);
$z[5][4]['typeid']="2";
$z[6]=Array("channel","<a class=\"navLink\" href=\"[field:typeurl/]\">[field:typename/]</a>",1656,1779);
$z[6][4]['type']="son";
$z[6][4]['typeid']="2";
$z[6][4]['row']="7";
$z[7]=Array("list","\r\n          <div class=\"newBox box\">\r\n            <div class=\"newBox-pic fl\"> <a href=\"[field:arcurl/]\"><img src=\"[field:litpic/]\" alt=\"\" width=\"160\" height=\"120\"></a> </div>\r\n            <div class=\"newBox-info fr\">\r\n              <h4 class=\"newBox-info-tit\"> <a href=\"[field:arcurl/]\">[field:title/]</a></h4>\r\n              <p class=\"newBox-info-sub\">编辑：admin　　发布时间：[field:pubdate function=MyDate('y-m-d',@me)/]</p>\r\n              <p class=\"newBox-info-preface\"> [field:description/]...</p>\r\n            </div>\r\n          </div>\r\n        ",1885,2482);
$z[7][4]['pagesize']="20";
$z[8]=Array("pagelist","",2601,2672);
$z[8][4]['listitem']="info,index,end,pre,next,pageno";
$z[8][4]['listsize']="5";
$z[9]=Array("arclist","\r\n              <div class=\"actionList-li action\">\r\n                <p class=\"actionTit li_1\"><a class=\"focus_link\" href=\"[field:arcurl/]\">[field:title/]...</a></p>\r\n                <div class=\"actionDetailed\"> <a target=\"_blank\" class=\"focus_link\" href=\"[field:arcurl/]\"><img class=\"actionDetailed-img\" src=\"[field:litpic/]\" alt=\"[field:title/]\" width=\"240\" height=\"180\" border=\"0\"></a>\r\n                  <p class=\"actionDetailed-js\">[field:info/]...</p>\r\n                </div>\r\n              </div>\r\n             ",3115,3720);
$z[9][4]['typeid']="2";
$z[9][4]['limit']="0,1";
$z[9][4]['titlelen']="40";
$z[9][4]['flag']="c";
$z[9][4]['infolen']="80";
$z[10]=Array("arclist","\r\n              <div class=\"actionList-li\">\r\n                <p class=\"actionTit li_[field:global name=autoindex runphp='yes']@me=@me+1;[/field:global]\"><a class=\"focus_link\" href=\"[field:arcurl/]\">[field:title/]...</a></p>\r\n                <div class=\"actionDetailed\"> <a target=\"_blank\" class=\"focus_link\" href=\"[field:arcurl/]\"><img class=\"actionDetailed-img\" src=\"[field:litpic/]\" alt=\"[field:title/]\" width=\"240\" height=\"180\" border=\"0\"></a>\r\n                  <p class=\"actionDetailed-js\">[field:info/]...</p>\r\n                </div>\r\n              </div>\r\n             ",3736,4401);
$z[10][4]['typeid']="2";
$z[10][4]['limit']="1,4";
$z[10][4]['titlelen']="40";
$z[10][4]['flag']="c";
$z[10][4]['infolen']="80";
$z[11]=Array("include","",4983,5020);
$z[11][4]['filename']="footer.htm";

?>