## ice_tmpl 中文文档

ice_tmpl封装自Juicer

### ice_tmpl 的引入

	<script type="text/javascript" src="ice_tmpl.js></script>

## * 使用方法

&gt; 编译模板并根据所给的数据立即渲染出结果.

	ice_tmpl(tpl, data);

&gt; 仅编译模版暂不渲染，它会返回一个可重用的编译后的函数.

	var compiled_tpl = ice_tmpl(tpl);

&gt; 根据给定的数据，对之前编译好的模板进行数据渲染.

	var compiled_tpl = ice_tmpl(tpl);
	var html = compiled_tpl.render(data);

&gt; 注册/注销自定义函数（对象），在下边 ${变量} 中会有实例.

	ice_tmpl.register('function_name', function);
	ice_tmpl.unregister('function_name');

&gt; 自定义模板语法边界符，下边是 ice_tmpl 默认的边界符。你可以借此解决 ice_tmpl 模板语法同某些后端语言模板语法冲突的情况.

	ice_tmpl.set({
    	'tag::operationOpen': '{@',
    	'tag::operationClose': '}',
    	'tag::interpolateOpen': '${',
    	'tag::interpolateClose': '}',
    	'tag::noneencodeOpen': '$${',
    	'tag::noneencodeClose': '}',
    	'tag::commentOpen': '{#',
    	'tag::commentClose': '}'
	});

### 默认参数配置

	{
    	cache:          true [false],
    	strip:          true [false],
    	errorhandling:  true [false],
    	detection:      true [false]
	}

默认配置是 ice_tmpl 推荐的使用方式，如果你使用过程中的确需要更改这些参数，可以这么做：

#### 逐条参数更改：

	ice_tmpl.set('strip',false);
	ice_tmpl.set('cache',false);

#### 批量参数更改：

	ice_tmpl.set({
    	'strip': false,
    	'cache': false
	};

ice_tmpl 默认会对编译后的模板进行缓存，从而避免同一模板多次数据渲染时候重复编译所耗的时间，如无特殊需要，强烈不建议关闭默认参数中的 cache，这么做将会令 ice_tmpl 缓存失效从而降低性能.

[](!syntax)
## * 语法

#### a. ${变量}

使用 `${}` 输出变量值，其中`_`为对数据源的引用（如`${_}`，常用于数据源为数组的情况）。支持自定义函数（通过自定义函数你可以实现很多有趣的功能，类似 `${data|links}` 就可以通过事先定义的自定义函数 links 直接对 data 拼装出`<a href=".." alt=".." />` ）.

	${name}
	${name|function}
	${name|function, arg1, arg2}

让我们通过一个例子演示一下自定义函数的奇妙用法吧.

	var json = {
		links: [
    		{href: 'http://ice_tmpl.name', alt: 'ice_tmpl'},
    		{href: 'http://benben.cc', alt: 'Benben'},
    		{href: 'http://ued.taobao.com', alt: 'Taobao UED'}
		]
	};

	var tpl = [
		'{@each links as item}',
			'${item|links_build} <br />',
		'{@/each}'
	].join('');

	var links = function(data) {
		return '<a href="' + data.href + '" alt="' + data.alt + '" />';
	};

ice_tmpl.register('links_build', links); //注册自定义函数
ice_tmpl(tpl, json);
</code></pre>

上述代码执行后我们会发现结果是这样的：

	&lt;a href=&quot;http://ice_tmpl.name&quot; alt=&quot;ice_tmpl&quot; <br />
	&lt;a href=&quot;http://benben.cc&quot; alt=&quot;Benben&quot; <br />
	&lt;a href=&quot;http://ued.taobao.com&quot; alt=&quot;Taobao UED&quot; <br />

可以看得出，结果被转义了，如果我们上边使用 $${item|links} 就会得到我们预期的结果，这就是下边即将提到的避免转义。

__转义/避免转义__

出于安全角度的考虑，`${变量}` 在输出之前会对其内容进行转义，如果你不想输出结果被转义，可以使用 `$${变量}` 来避免这种情况。例如：

	var json = {
		value: '&lt;strong&gt;ice_tmpl&lt;/strong&gt;'
	};

	var escape_tpl='${value}';
	var unescape_tpl='$${value}';

	ice_tmpl(escape_tpl, json); //输出 '&lt;strong&gt;ice_tmpl&lt;/strong&gt;'
	ice_tmpl(unescape_tpl, json); //输出 '<strong>ice_tmpl</strong>'

#### b. 循环遍历 {@each} ... {@/each}

如果你需要对数组进行循环遍历的操作，就可以像这样使用 `each` .

	{@each list as item}
		${item.prop}
	{@/each}

如果遍历过程中想取得当前的索引值，也很方便.

	{@each list as item, index}
		${item.prop}
		${index} //当前索引
	{@/each}

#### c. 判断 {@if} ... {@else if} ... {@else} ... {@/if}

我们也会经常碰到对数据进行逻辑判断的时候.

	{@each list as item,index}
		{@if index===3}
			the index is 3, the value is ${item.prop}
		{@else if index === 4}
			the index is 4, the value is ${item.prop}
		{@else}
			the index is not 3, the value is ${item.prop}
		{@/if}
	{@/each}

#### d. 注释 {# 注释内容}

为了后续代码的可维护性和可读性，我们可以在模板中增加注释.

	{# 这里是注释内容}

#### e. 辅助循环 {@each i in range(m, n)}

辅助循环是 ice_tmpl 为你精心设置的一个语法糖，也许你会在某种情境下需要它.

	{@each i in range(5, 10)}
		${i}; //输出 5;6;7;8;9;
	{@/each}

#### f. 子模板嵌套 {@include tpl, data}

子模板嵌套可以让你更灵活的组织你的模板代码，除了可以引入在数据中指定的子模板外，当然你也可以通过指定字符串`#id`使用写在`script`标签中的模板代码.

HTML代码：

	<script type="text/ice_tmpl" id="subTpl">
		I'm sub content, ${name}
	</script>

Javascript 代码：

	var tpl = 'Hi, {@include "#subTpl", subData}, End.';

	ice_tmpl(tpl, {
		subData: {
			name: 'ice_tmpl'
		}
	});

	//输出 Hi, I'm sub content, ice_tmpl, End.
	//或者通过数据引入子模板，下述代码也将会有相同的渲染结果：

	var tpl = 'Hi, {@include subTpl, subData}, End.';

	ice_tmpl(tpl, {
		subTpl: "I'm sub content, ${name}",
		subData: {
			name: 'ice_tmpl'
		}
	});


## * 一个完整的例子

	HTML 代码:

	<script id="tpl" type="text/template">
		<ul>
			{@each list as it,index}
				<li>${it.name} (index: ${index})</li>
			{@/each}
			{@each blah as it}
				<li>
					num: ${it.num} <br />
					{@if it.num==3}
						{@each it.inner as it2}
							${it2.time} <br />
						{@/each}
					{@/if}
				</li>
			{@/each}
		</ul>
	</script>

	Javascript 代码:

	var data = {
		list: [
			{name:' guokai', show: true},
			{name:' benben', show: false},
			{name:' dierbaby', show: true}
		],
		blah: [
			{num: 1},
			{num: 2},
			{num: 3, inner:[
				{'time': '15:00'},
				{'time': '16:00'},
				{'time': '17:00'},
				{'time': '18:00'}
			]},
			{num: 4}
		]
	};

	var tpl = document.getElementById('tpl').innerHTML;
	var html = ice_tmpl(tpl, data);
