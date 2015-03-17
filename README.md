![](http://cdn.besdlab.cn/icecss/compatible.gif)
![](http://cdn.besdlab.cn/icecss-yqh.jpg)
======

**什么是ICECSS？**

ICECSS是一个以冰山为灵感的开源高效的基于Jquery的CSS框架，不仅有着开发快速、美观易用等特点，官方本身还提供CDN服务、快速开发demo和测试的云服务等等。

注意：为确保最好的效果，IE浏览器最好是在9以上。

**ICECSS 主题**

ICECSS for HEXO:<a href="https://github.com/T-baby/ICE-HEXO">https://github.com/T-baby/ICE-HEXO</a>

**如何使用？**

在html文件头部引用ICECSS的CSS

`<link rel="stylesheet/less" href="css/icecss.css">`

在html文件尾部引用ICECSS的JS（注意，ICECSS是基于jQuery的，所以在引用ICECSS的JS文件前请先导入jQuery）

`<script src="js/jQuery.min.js"></script>`

`<script src="js/icecss.js"></script>`

------------------------

ICECSS也支持Less

在html头部引用less

`<link rel="stylesheet/less" type="text/css" href="styles.less" />`

然后在尾部引用less的js文件

`<script src="js/less.min.js"></script>`

`<script src="js/jQuery.min.js"></script>`

`<script src="js/icecss.js"></script>`

**说明文档**

新版文档请到官网查看：<a href="http://besdlab.cn/ICECSS/">http://besdlab.cn/ICECSS/</a>

中国区分发：

<a href="https://coding.net/u/besd/p/ICECSS/">https://coding.net/u/besd/p/ICECSS/</a>

<a href="http://git.oschina.net/t-baby/ICECSS">http://git.oschina.net/t-baby/ICECSS</a>

**DEMO**

http://besdlab.cn/

http://besdlab.cn/blog

http://besdlab.cn/ICECSS/

**您可以加入用户体验小组**

用户体验小组能够第一时间获得ICECSS的最新版本，并帮助开发小组进行测试和改进。具有以下特权：

1、能够在第一时间获得最新版本。

2、为ICECSS提供的优质代码在经过开发小组审核后可以加入官方的版本。

3、可以全程参与ICECSS的设计、开发、用户体验的过程。

4、你建议或者设想可能会直接在ICECSS中实现哦。


**如何加入？**
加入Q群：320283384

------------------------
**更新历史**

****1.0 2015年03月17日****

******-修改/修复-******

再次调整按钮和表单、列表等等，使得ICECSS更加好看和优雅

调整了表格的颜色

使按钮、菜单等悬浮效果更加平滑

修复.ice-form-icon会导致input的宽度不正确的问题

更换成新的模板引擎，从artTemplate换成juicer

******-增加-******

增加了按钮颜色类




****0.9.2 2015年03月03日****

******-修改/修复-******

调整按钮内边距，使按钮看起来更优雅

修改了按钮悬浮时的颜色

调整th、td的内边距

修改了表格ice-table-striped的颜色

修正了文档上的一处错误

******-增加-******

增加ice-button标签

增加一个用于操作本地储存库的插件ice_storedb插件


****2015年01月29日****

******-修改/修复-******

修正了文档上的一些问题

修复ice-intro-big固定背景图片失效的问题

******-增加-******

ice-menu-lucency增加浮动

增加视差效果插件

增加全屏滚动插件

增加预加载超链接插件

增加图片延迟载入插件

****2015年01月20日****

感谢 一路向阳 帮助封装了抽屉式导航的相关代码

对抽屉式导航效果进行了调整

****2015年01月17日****

ice-div-1-1的width改为100%

在导航菜单中增加手风琴功能

增加弹出式画布

增加汉堡菜单

增加BESD云服务支持

增加模板引擎