<?php
$z[0]=Array("global","",222,248);
$z[0][4]['name']="cfg_webname";
$z[1]=Array("field","",289,318);
$z[1][4]['name']="keywords";
$z[2]=Array("field","",358,416);
$z[2][4]['name']="description";
$z[2][4]['function']="html2text(@me)";
$z[3]=Array("include","",1063,1100);
$z[3][4]['filename']="header.htm";
$z[4]=Array("global","",1618,1673);
$z[4][4]['name']="keyword";
$z[4][4]['function']="RemoveXSS(@me)";
$z[5]=Array("list","\r\n          <div class=\"newBox box\">\r\n            <div class=\"newBox-pic fl\"> <a href=\"[field:arcurl/]\"><img src=\"[field:litpic/]\" alt=\"\" width=\"160\" height=\"120\"></a> </div>\r\n            <div class=\"newBox-info fr\">\r\n              <h4 class=\"newBox-info-tit\"> <a href=\"[field:arcurl/]\">[field:title/]</a></h4>\r\n              <p class=\"newBox-info-sub\">分类：[field:typename/]　　发布时间：[field:pubdate function=MyDate('y-m-d',@me)/]</p>\r\n              <p class=\"newBox-info-preface\"> [field:description/]...</p>\r\n            </div>\r\n          </div>\r\n        ",1789,2412);
$z[5][4]['pagesize']="20";
$z[5][4]['titlelen']="70";
$z[6]=Array("pagelist","",2531,2602);
$z[6][4]['listitem']="info,index,end,pre,next,pageno";
$z[6][4]['listsize']="5";
$z[7]=Array("likewords","",3109,3134);
$z[7][4]['num']="8";
$z[8]=Array("include","",3750,3787);
$z[8][4]['filename']="footer.htm";

?>