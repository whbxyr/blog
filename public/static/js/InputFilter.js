/**
 * 当页面准备就绪时就对删除文章界面中的
 * 跳转页数的输入栏添加处理控制模块
 */
whenReady(function () {
    // 查找所有的<input>元素
    var inputelts = document.getElementsByTagName('input');
    // 遍历他们
    for (var i = 0, len = inputelts.length; i < len; i++) {
    	var elt = inputelts[i];
    	// 跳过不是文本域或没有data-allowed-chars属性的元素
    	if (elt.type !== 'text' || !elt.getAttribute('data-allowed-chars')){
    		continue;
    	}

    	// 在input元素上注册事件处理程序
    	// 传统的keypress事件处理程序能够在任何地方运行
    	// textInput（混合大小写）在2010年后Safari和Chrome支持
    	// textinput（小写）是3级DOM事件规范草案中的版本
    	if (elt.addEventListener) {
    		elt.addEventListener('keypress', filter, false);
    		elt.addEventListener('textInput', filter, false);
    		elt.addEventListener('textinput', filter, false);
    	}
    	else {
    		elt.attachEvent('onkeypress', filter);
    	}
    }

    function filter(event) {
    	// 获取事件对象和目标元素对象
    	// 标准或IE模型
    	var e = event || window.evevt;
        // 标准或IE模型
    	var target = e.target || e.srcElement;
    	// 输入的文本
    	var text = null;

    	// 获取输入的字符或文本
    	if (e.type === 'textinput' || e.type === 'textInput') {
    		text = e.data;
    	}
    	else {
    		// 这是传统的keypress事件
    		// 对于可打印键的keypress事件，Firefox使用charCode
    		var code = e.charCode || e.keyCode;
    		// 如果按下的是任何形式的功能键，不要过滤它
    		if (code < 32 // ASCII控制字符
    			|| e.charCode === 0 // 功能键（仅指Firefox）
    			|| e.ctrlKey || e.altKey) { // 按下辅助键
                return;
    		}

    		// 把字符编码转化为字符串
    		var text = String.fromCharCode(code);
    	}

    	// 现在需要从input元素中寻找所需信息
    	// 合法字符
    	var allowed = target.getAttribute('data-allowed-chars');
        // 信息元素id
        var messageid = target.getAttribute('data-messageid')
        // 如果存在信息元素id，那么获取这个元素
        if (messageid) {
        	var messageElement = document.getElementById(messageid);
        }

        // 遍历输入文本中的字符
        for (var i = 0, len = text.length; i < len; i++) {
        	var c = text.charAt(i);
        	if (allowed.indexOf(c) === -1) {
        		messageElement.style.visibility = 'visible';
        		// 取消默认行为，所有不会插入文本
        		if (e.preventDefault) {
        			e.preventDefault();
        		}
        		if (e.returnValue) {
        			e.returnValue = false;
        		}
        		return false;
        	}
        }

        // 如果所有的字符都合法，隐藏存在的消息元素
        if (messageElement) {
        	messageElement.style.visibility = 'hidden';
        }
    }
});