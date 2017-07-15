/**
 * 删除文章板块中的按钮事件集合
 * 包括逻辑数据库处理以及界面变换处理
 */
var allHandler = {
    // “首页”处理事件
    firstpageHandler: function () {
    	// 将当前页数置为1
		Sign.nowpage = 1;
		// 获取当前页文章详细信息
		getInformation(Sign.nowpage);
		// 布置分页条
		bannerShow(Sign.allpage, Sign.nowpage); 
		// 控制台打印当前页数
		console.log('Sign.nowpage=' + Sign.nowpage);
	},
	// “<上一页”处理事件
	prevHandler: function () {
		// 总页数更新前先置其为空串
		Sign.allpage = '';
		// 通过添加计时器监视总页数是否更新了
		var waittimer = null;
		// 上一页最多到第一页
		if (Sign.nowpage > 1) {
		    Sign.nowpage = Sign.nowpage - 1;
		}
		// 当前若处在第一页，则此按钮失效
		// 获取当前页文章详细信息
		// 更新总页数
		getInformation(Sign.nowpage);
		// 定时器的详细设计，每隔一毫秒检查一次
		waittimer = setInterval(function () {
			// Sign.allpage不为空串时，说明更新完毕
		    if (Sign.allpage !== '') {
		    	// 布置分页条
		    	bannerShow(Sign.allpage, Sign.nowpage);
		    	// 控制台打印当前页数
		        console.log('Sign.nowpage=' + Sign.nowpage);
		        // 清除计时器
		        clearInterval(waittimer);
		    }
		}, 1);
	},
	// “下一页>处理事件”
	nextHandler: function () {
        // 总页数更新前先置其为空串
		Sign.allpage = '';
		// 通过添加计时器监视总页数是否更新了
		var waittimer = null;
		// 更新总页数
		getInformation(Sign.nowpage);
		// 定时器的详细设计，每隔一毫秒检查一次
	    waittimer = setInterval(function () {
	    	// Sign.allpage不为空串时，说明更新完毕
	        if (Sign.allpage !== '') {
	        	// 将当前页数加一
	        	Sign.nowpage = Sign.nowpage + 1;
	        	// 若当前页数大于总页数，则将当前页置为最后一页
	        	if (Sign.nowpage > Sign.allpage) {
	        		Sign.nowpage = Sign.allpage;
	        	}
	        	// 控制台打印当前页数
	        	console.log('Sign.nowpage=' + Sign.nowpage);
	        	// 获取当前页文章详细信息
	        	getInformation(Sign.nowpage);
	        	// 布置分页条
	        	bannerShow(Sign.allpage, Sign.nowpage);
	        	// 清除计时器
	        	clearInterval(waittimer);
	        }
	    }, 1);
	},
	// “尾页”处理事件
	lastpageHandler: function () {
	    // 将当前页置为最后一页
		Sign.nowpage = Sign.allpage;
		// 获取当前页详细信息
		getInformation(Sign.nowpage);
		// 布置分页条
		bannerShow(Sign.allpage, Sign.nowpage);
		// 控制台打印当前页数
		console.log('Sign.nowpage=' + Sign.nowpage);
	},
	// “跳转”处理事件
	jumpHandler: function () {
	    // 获取跳转页数
	    var middlenowpage = parseInt(document.getElementById('jumppage').value);
        // 若还没有填写相关跳转页数或者填写的页数是不存在的0，直接返回，结束函数
	    if (!middlenowpage || middlenowpage === 0) {
            return;
	    }
	    // 获取跳转页数
	    Sign.nowpage = parseInt(document.getElementById('jumppage').value);
	    // 总页数更新前先置其为空串
	    Sign.allpage = '';
	    // 通过添加计时器监视总页数是否更新了
	    var waittimer = null;
	    // 更新总页数
	    getInformation(Sign.nowpage);
	    // 定时器的详细设计，每隔一毫秒检查一次
	    waittimer = setInterval(function () {
	    	// Sign.allpage不为空串时，说明更新完毕
	        if (Sign.allpage !== '') {
	        	// 若当前页数大于总页数，则将当前页置为最后一页
	           	if (Sign.allpage < Sign.nowpage) {
	           		Sign.nowpage = Sign.allpage;
	           	}
	           	// 控制台打印总页数
	           	console.log('Sign.allpage=' + Sign.allpage);
	           	// 控制台打印当前页数
	           	console.log('Sign.nowpage=' + Sign.nowpage);
	           	// 获取当前页详细信息
	          	getInformation(Sign.nowpage);
	          	// 布置分页条
	          	bannerShow(Sign.allpage, Sign.nowpage);
	          	// 清除计时器
	           	clearInterval(waittimer);
	        }
	    }, 1);
	},
	// “写新文章”处理事件
	_addHandler: function () {
		// 如果当前为正要修改或者刚刚修改文章
		// 按下“写新文章”按钮后
		// 应当重置文章编辑
		console.log(Sign.afterUpdate);
		if (Sign.afterUpdate === true) {
			tinyMCE.activeEditor.setContent('');
       	    document.getElementById('kindchoose').value = '';
       	    document.getElementById('title').value = '';
          	document.getElementById('cover').value = '';
       	    document.getElementById('covershow').style.backgroundImage = '';
       	    // 并将该标志量重置为false
       	    Sign.afterUpdate = false;
		}
	    // 获取文章编写插件的DOM
	    var article = document.getElementById('article');
	    // 获取编辑文章页的左边配置项的DOM
	    var side = document.getElementById('side');
	    // 获取编辑文章页的提交按钮的DOM
	    var handin = document.getElementById('handin');
	    // 获取编辑文章页的重置按钮的DOM
	    var reset = document.getElementById('reset');
	    // 获取“提交文章修改结果”按钮的父元素DIV的DOM
        var update = document.getElementById('update').parentNode;
	    // 获取删除文章页的DOM，其包含了文章列表和分页条
	    var articlelist = document.getElementById('articlelist');
	    // 让前四个展现在文档流里
	    article.style.display = 'block';
	    side.style.display = 'inline-block';
	    handin.style.display = 'block';
	    reset.style.display = 'block';
	    // 最后两个暂时从文档流中删除
	    update.style.display = 'none';
	    articlelist.style.display = 'none';
    },
    // “删除、修改、预览文章”处理事件
	removeHandler: function () {
	    // 总页数更新前先置其为空串
	    Sign.allpage = '';
	    // 获取文章编写插件的DOM
	    var article = document.getElementById('article');
	    // 获取编辑文章页的左边配置项的DOM
	    var side = document.getElementById('side');
	    // 获取编辑文章页的提交按钮的DOM
	    var handin = document.getElementById('handin');
	    // 获取编辑文章页的重置按钮的DOM
	    var reset = document.getElementById('reset');
	    // 获取“提交文章修改结果”按钮的父元素DIV的DOM
        var update = document.getElementById('update').parentNode;
	    // 获取删除文章页的DOM，其包含了文章列表和分页条
	    var articlelist = document.getElementById('articlelist');
	    // 通过添加计时器监视总页数是否更新了
	    var waittimer = null;
	    // 前五者暂时从文档流中删除
	    article.style.display = 'none';
	    side.style.display = 'none';
	    handin.style.display = 'none';
	    reset.style.display = 'none';
	    update.style.display = 'none';
	    // 更新总页数
	    getInformation(Sign.nowpage);
	    // 定时器的详细设计，每隔一毫秒检查一次
	    waittimer = setInterval(function () {
	    	// Sign.allpage不为空串时，说明更新完毕
	        if (Sign.allpage !== '') {
	        	// 若当前页数大于总页数，则将当前页置为最后一页
	        	if (Sign.allpage < Sign.nowpage) {
	        		Sign.nowpage = Sign.allpage;
	        	}
	        	// 布置分页条
	        	bannerShow(Sign.allpage, Sign.nowpage);
	        	// 清除计时器
	        	clearInterval(waittimer);
	        }
	    }, 1);
	},
	// 缩略封面图“确认”处理事件
	coversureHandler: function () {
	    // 获取封面缩略图展示的DOM
	    var covershow = document.getElementById('covershow');
	    // 获取封面缩略图展示的DOM的背景图URL
	    var source = document.getElementById('cover').value;
	    // 设置封面缩略图展示的DOM的背景
	    covershow.style.backgroundImage = 'url(' + source + ')';
	    // covershow.style.backgroundPosition = 'center';
	    // covershow.style.backgroundSize = 'cover';
	},
	// “文章类型选择”处理事件第一步，配置进入动画
	kindchoosefirstHandler: function () {
	    // 获取动画列表的DOM
		var tabchoose = document.getElementById('tabchoose');
		// 设置计时器以判断动画是否已经到位了
		var intimer = null;
		// Sign.chooseanimated为false时说明可以进行动画
		if (!Sign.chooseanimated) {
		    intimer = setInterval(function () {
		    	// 如果动画列表还未到位，则继续执行动画
	    		if (parseInt(tabchoose.style.marginTop) < 0) {
	    			// 步进值为2px
	                var nowMargintop = parseInt(tabchoose.style.marginTop) + 2;
	                tabchoose.style.marginTop = nowMargintop + 'px';
	                // 将Sign.chooseanimated置为true，在动画结束前屏蔽其他相同动画的刺激
	                Sign.chooseanimated = true;
	            }
	            // 若动画到位了，清除计时器，并置Sign.chooseanimated为false
	            if (parseInt(tabchoose.style.marginTop) === 0) {
	                clearInterval(intimer);
	                Sign.chooseanimated = false;
	            }
		    }, 1);
		}
	},
	// “文章类型选择”处理事件第二步，配置离开动画
	kindchoosesecondHandler: function () {
	    // 获取动画列表的DOM
		var tabchoose = document.getElementById('tabchoose');
		// 设置计时器以判断动画是否已经到位了
		var outtimer = null;
		// Sign.chooseanimated为false时说明可以进行动画
		if (!Sign.chooseanimated) {
			// 将Sign.chooseanimated置为true，在动画结束前屏蔽其他相同动画的刺激
			Sign.chooseanimated = true;
	    	outtimer = setInterval(function () {
	    		// 步进值为-2px
	            var nowMargintop = parseInt(tabchoose.style.marginTop) - 2;
	            tabchoose.style.marginTop = nowMargintop + 'px';
	            // 若动画到位了，清除计时器，并置Sign.chooseanimated为false
	            if (nowMargintop === -42) {
	                clearInterval(outtimer);
	                Sign.chooseanimated = false;
	            }
	    	}, 1);
	    }
	},
	// 类型选择“超算生活”点击选择处理事件
	chaosuanHandler: function () {
	    // 将“超算生活”的内容放到input框里
		document.getElementById('kindchoose').value = document.getElementById('chaosuan').innerHTML;
		// 启动选项卡动画
		document.getElementById('kindchoose').click();
	},
	// 类型选择“前沿科技”点击选择处理事件
	qianyanHandler: function () {
	    // 将“前沿科技”的内容放到input框里
		document.getElementById('kindchoose').value = document.getElementById('qianyan').innerHTML;
		// 启动选项卡动画
		document.getElementById('kindchoose').click();
	},
	// 删除文章界面按钮的界面处理程序
	// 其中的五个参数均为“0”或者“1”
	buttonStyleControl: function (firstpageButton, prevButton, nextButton, lastpageButton, jumpButton) {
        // 获取文章删除页面“首页”按钮的DOM
        var firstpage = document.getElementById('firstpage');
        // 获取文章删除页面“<上一页”按钮的DOM
        var prev = document.getElementById('prev');
        // 获取文章删除页面“下一页>”按钮的DOM
        var next = document.getElementById('next');
        // 获取文章删除页面“尾页”按钮的DOM
        var lastpage = document.getElementById('lastpage');
        // 获取文章删除页面“跳转”按钮的DOM
        var jump = document.getElementById('jump');
        // 以下所有均为根据参数情况改变按钮DOM的样式表以及决定其是否注册相关事件
        if (firstpageButton) {
            EventUtil.addHandler(firstpage, 'click', allHandler.firstpageHandler);
            firstpage.className = 'bannerbutton';
        }
        else {
            EventUtil.removeHandler(firstpage, 'click', allHandler.firstpageHandler);
            firstpage.className = 'nonebannerbutton';
        }
        if (prevButton) {
         	EventUtil.addHandler(prev, 'click', allHandler.prevHandler);
         	prev.className = 'bannerbutton';
        }
        else {
         	EventUtil.removeHandler(prev, 'click', allHandler.prevHandler);
         	prev.className = 'nonebannerbutton';
        }
        if (nextButton) {
         	EventUtil.addHandler(next, 'click', allHandler.nextHandler);
         	next.className = 'bannerbutton';
        }
        else {
         	EventUtil.removeHandler(next, 'click', allHandler.nextHandler);
         	next.className = 'nonebannerbutton';
        }
        if (lastpageButton) {
         	EventUtil.addHandler(lastpage, 'click', allHandler.lastpageHandler);
         	lastpage.className = 'bannerbutton';
        }
        else {
         	EventUtil.removeHandler(lastpage, 'click', allHandler.lastpageHandler);
         	lastpage.className = 'nonebannerbutton';
        }
        if (jumpButton) {
         	EventUtil.addHandler(jump, 'click', allHandler.jumpHandler);
         	jump.className = 'bannerbutton';
        }
        else {
         	EventUtil.removeHandler(jump, 'click', allHandler.jumpHandler);
         	jump.className = 'nonebannerbutton';
        }
	},
	updateHandler: function () {
        // 确认是否保存修改的标志量
        var updatesure;
        updatesure = window.confirm('您确定要保存修改结果吗？\n修改后将无法撤销');
        if (updatesure) {
            var request = new XMLHttpRequest();
	        // request.open('POST', php + '/Index/updateArticle');
            // ajax传过去的参数都会被处理为字符串，因此不需要再将参数转换为字符串
		    // 先进行“去换行符”操作，再进行html编码，使用的是浏览器内部转换器
		    // tinyMCE.activeEditor.getContent()方法会在我们写的文章里面的每一个\前再加一个\
		    var article = HtmlUtil.htmlEncode((tinyMCE.activeEditor.getContent()).replace(/[\n]/ig, ''));
		    // 当我们在文章里只写了一个\时，
		    // tinyMCE.activeEditor.getContent()方法给我们多加了一个\
		    // 此时就有了两个\，但是正则表达式不会匹配第一个作为转义字符作用的反斜杠'\'，
		    // 在用正则表达式匹配字符串时，转义符相当于不存在
		    // 因此在这里用正则匹配时就只需要4个转义符
		    // 用replace()方法将其替换为4个\
		    // 即符合mysql数据库3个转义符转义一个字符的规则
		    article = article.replace(/\\/g, '\\\\');
		    // 在插入数据库时，3个转义字符转义一个字符，
		    // 此处是对"进行处理，方便插入数据库
		    article = article.replace(/["]/g, '\\\"');
		    // 在js中，1个转义字符转义一个字符
		    // console.log('编码前：' + article);
		    // 对处理完的字符串进行最终的编码，去除取值符等敏感字符对ajax传值的影响
		    article = encodeURIComponent(article);
		    var kind = HtmlUtil.htmlEncode(document.getElementById('kindchoose').value);
		    kind = encodeURIComponent(kind);
		    var title = HtmlUtil.htmlEncode(document.getElementById('title').value);
		    title = encodeURIComponent(title);
		    var cover = HtmlUtil.htmlEncode(document.getElementById('cover').value);
		    cover = encodeURIComponent(cover);
		    // 拼接请求主体
	        var data = 'time=' + Sign.updateArticletime + '&kind=' + kind + '&title=' + title + '&cover=' + cover + '&article=' + article;
            request.open('GET', php + '/Index/updateArticle?' + data);
            // POST请求方式必须设置的请求头格式
		    // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		    // request.send(data);
		    request.send(null);
		    request.onreadystatechange = function () {
		    	if (request.readyState === 4) {
		    		if (request.status === 200) {
		    			// 文章修改成功保存以及失败均由此处产生相关提示
		    			document.getElementById('result').innerHTML = request.responseText;
		    		}
		    		else {
		    			// 当请求不到数据时就会导致错误，用以下方法显示
		    			alert('发生错误：' + request.status);
		    		}
		    	}
		    }
        }
        else {
        	document.getElementById('result').innerHTML = '您取消了文章保存修改！';
        }
        // 执行提示框动画
        tipAnimate();
	}
}
