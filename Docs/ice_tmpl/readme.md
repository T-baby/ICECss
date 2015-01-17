
## 使用

ICECSS的JS中已经包含了，只要引用了icess.js就会自带模板引擎。修改自腾讯开源的airtemplate


## 表达式

``{{`` 与 ``}}`` 符号包裹起来的语句则为模板的逻辑表达式。

### 输出表达式

对内容编码输出：

    {{content}}

不编码输出：

    {{#content}}
    
编码可以防止数据中含有 HTML 字符串，避免引起 XSS 攻击。

### 条件表达式

    {{if admin}}
		<p>admin</p>
    {{else if code > 0}}
    	<p>master</p>
    {{else}}
        <p>error!</p>
    {{/if}}

### 遍历表达式

无论数组或者对象都可以用 each 进行遍历。

    {{each list as value index}}
        <li>{{index}} - {{value.user}}</li>
    {{/each}}

亦可以被简写：

    {{each list}}
        <li>{{$index}} - {{$value.user}}</li>
    {{/each}}

### 模板包含表达式

用于嵌入子模板。

    {{include 'template_name'}}

子模板默认共享当前数据，亦可以指定数据：

    {{include 'template_name' news_list}}

## 辅助方法

使用``ice_tmpl.helper(name, callback)``注册公用辅助方法：

```
ice_tmpl.helper('dateFormat', function (date, format) {
    // ..
    return value;
});
```

模板中使用的方式：

    {{time | dateFormat:'yyyy-MM-dd hh:mm:ss'}}

支持传入参数与嵌套使用：

    {{time | say:'cd' | ubb | link}}
    

 ## 快速上手

### 编写模板

使用一个``type="text/html"``的``script``标签存放模板：
	
	<script id="test" type="text/html">
	<h1>{{title}}</h1>
	<ul>
	    {{each list as value i}}
	        <li>索引 {{i + 1}} ：{{value}}</li>
	    {{/each}}
	</ul>
	</script>

### 渲染模板
	
	var data = {
		title: '标签',
		list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
	};
	var html = ice_tmpl('test', data);
	document.getElementById('content').innerHTML = html;

## 方法

###	ice_tmpl(id, data)

根据 id 渲染模板。内部会根据``document.getElementById(id)``查找模板。

如果没有 data 参数，那么将返回一渲染函数。

###	ice_tmpl.``compile``(source, options)

将返回一个渲染函数。[演示](http://aui.github.com/artTemplate/demo/compile.html)

###	ice_tmpl.``render``(source, options)

将返回渲染结果。

###	ice_tmpl.``helper``(name, callback)

添加辅助方法。

例如时间格式器：[演示](http://aui.github.com/artTemplate/demo/helper.html)

###	ice_tmpl.``config``(name, value)

更改引擎的默认配置。

字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
openTag | String | ``'{{'`` | 逻辑语法开始标签
closeTag | String | ``"}}"`` | 逻辑语法结束标签
escape | Boolean | ``true`` | 是否编码输出 HTML 字符
cache | Boolean | ``true`` | 是否开启缓存（依赖 options 的 filename 字段）
compress | Boolean | ``false`` | 是否压缩 HTML 多余空白字符
	
##	使用预编译 

可突破浏览器限制，让前端模板拥有后端模板一样的同步“文件”加载能力：

一、**按文件与目录组织模板**

```
ice_tmpl('tpl/home/main', data)
```

二、**模板支持引入子模板**

{{include '../public/header'}}