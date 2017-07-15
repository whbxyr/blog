/**
 * 编辑文章界面中保存文章编辑
 * 以及重置文章编辑的逻辑处理
 */
EventUtil.addHandler(document.getElementById('handin'), 'click', function () {
    // 选择是否保存正在编辑的文章
    Sign.artsaved = confirm('您确定要保存这篇文章吗？');
    // 如果选择不保存，则有相关的提示
    if (!Sign.artsaved) {
       	document.getElementById('result').innerHTML = '您取消了文章编辑！';
    }
});
EventUtil.addHandler(document.getElementById('reset'), 'click', function () {
    // 选择是否重置正在编辑的文章
    Sign.artsaved = confirm('您确定要重置文章编辑吗？');
    // 如果选择不重置，则有相关的提示
    if (!Sign.artsaved) {
      	document.getElementById('result').innerHTML = '您取消了文章重置！';
    }
    else {
      	tinyMCE.activeEditor.setContent('');
       	document.getElementById('kindchoose').value = '';
       	document.getElementById('title').value = '';
       	document.getElementById('cover').value = '';
       	document.getElementById('covershow').style.backgroundImage = '';
      	document.getElementById('result').innerHTML = '您重置了文章编辑！';
    }
    // 执行提示框动画
    tipAnimate();
});
EventUtil.addHandler(document.getElementById('handin'), 'click', function () {
   	// 若选择保存，则插入数据库
   	// 否则，不执行任何与数据库有关的操作
   	if (Sign.artsaved) {
	    var request = new XMLHttpRequest();
	    // request.open('POST', php + '/Index/articleToDB');
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
	    var data = 'kind=' + kind + '&title=' + title + '&cover=' + cover + '&article=' + article + '&mid=' + mid;
	    request.open('GET', php + '/Index/articleToDB?' + data);
	    // POST请求方式必须设置的请求头格式
	    // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    request.send(null);
	    request.onreadystatechange = function () {
	    	if (request.readyState === 4) {
	    		if (request.status === 200) {
	    			// 文章没有编辑、文章插入数据库失败
	    			// 或者文章插入数据库成功都是用以下处理方式
	    			document.getElementById('result').innerHTML = request.responseText;
	    		}
	    		else {
	    			// 当请求不到数据时就会导致错误，用以下方法显示
	    			alert('发生错误：' + request.status);
	    		}
	    	}
	    }
	}
	// 执行提示框动画
	tipAnimate();
});