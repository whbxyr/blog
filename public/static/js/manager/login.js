window.onload = function () {

	var mid = '';
	var midpwd = '';
	// var hascookie = 0;
	var midpwdcookiemd5 = '';
	var midcookie = '';
    // 获取“登陆”按钮以及“注册”按钮的DOM
	var loginbtn = getDom('loginbtn', 'id');
    var registerbtn = getDom('registerbtn', 'id');
    // 获取“提交”按钮以及“取消”按钮的DOM
    var surebtn = getDom('surebtn', 'id');
    var cancelbtn = getDom('cancelbtn', 'id');
	EventUtil.addHandler(loginbtn, 'click', function () {
		// 获取用户填写的管理员账户名以及密码
		midmiddle = getDom('midl', 'id').value;
		midpwdmiddle = getDom('midpwdl', 'id').value;
		if (midpwdmiddle) {
			midpwdmiddle = hex_md5(midpwdmiddle);
		}

		if (midmiddle !== mid) {
			mid = midmiddle;
		}
		if (mid === midcookie) {
			if (midpwdmiddle !== midpwdcookiemd5) {
				midpwd = midpwdmiddle;
			}
			else {
				midpwd = getDom('midpwdl', 'id').value;
			}
			// hascookie = 0;
		}
		else if (midpwdmiddle !== midpwd) {
			midpwd = midpwdmiddle;
		}

		loginValid();
	});
	// 登陆发送验证
	function loginValid() {
		var request = new XMLHttpRequest();
	    request.open('GET', php + '/Index/managerLoginregister?mid=' + mid + '&midpwd=' + midpwd + '&type=');
	    request.send();
		request.onreadystatechange = function () {
		   	if (request.readyState === 4) {
		   		if (request.status === 200) {
                    // 由此处产生相关提示
                    switch (request.responseText) {
                    	case '0':
                    	    alert('错误！您未填写管理员账户！');
                    	    // getDom('result', 'id').innerHTML = '错误！您未填写管理员账户！';
                    	    tipAnimate();
                    	    break;
                    	case '1':
                    	    alert('错误！您未填写管理员密码！');
                    	    break;
                    	case '2':
                    	    alert('错误！您输入的用户名不存在！');
                    	    break;
                    	case '3':
                    	    alert('警告！密码错误！');
                    	    break;
                    	case '4':
                    	    alert('此账号还未被系统超级管理员授权注册！\n请耐心等待！');
                    	    break;
                    	case '5':
                    	    console.log('登陆成功');
                    	    if (testCookie('mid') === 0) {
                    	    	console.log('此浏览器禁止了cookie的使用！');
                    	    }
                    	    else {
                    	    	if (testCookie('mid') !== mid) {
                    	    		console.log('重新保存管理员账户的cookie信息');
	                    	   	    var date = new Date();
	                    	   	    date.setTime(date.getTime() + 600000);
	                    	   	    setCookie('mid', mid, date, '/');
	                    	   	    setCookie('midpwd', midpwd, date, '/');
	                    	    }
	                    	    else {
	                    	    	console.log('已有管理员账户的cookie信息');
	                    	    }
                    	    }
                    	    location.href = php + '/Index/manage';
                    	    break;
                    	default:
                    	    break;
                    }
		   		}
		  		else {
		   			// 当请求不到数据时就会导致错误，用以下方法显示
		   			alert('发生错误：' + request.status);
		   		}
		   	}
		}
	}
	// 检查cookie中是否已经有管理员账户记录
	(function () {
		if (testCookie('mid')) {
			if (testCookie('midpwd')) {
				mid = testCookie('mid');
				midpwd = testCookie('midpwd');
				getDom('midl', 'id').value = mid;
		        getDom('midpwdl', 'id').value = midpwd;
		        // hascookie = 1;
		        midcookie = testCookie('mid');
		        midpwdcookiemd5 = hex_md5(midpwd);
		        // alert(testCookie('midpwd'));
		        // getDom('loginbtn', 'id').click();
			}
		}
	})();
	EventUtil.addHandler(registerbtn, 'click', function () {
		// 将登陆窗口隐藏
		getDom('login', 'id').style.display = 'none';
		var register = getDom('register', 'id');
		register.style.display = 'block';
		getDom('surebtn', 'id').innerHTML = '提交';
        getDom('cancelbtn', 'id').innerHTML = '返回';
	});
	EventUtil.addHandler(cancelbtn, 'click', function () {
		// 将注册窗口隐藏
		getDom('register', 'id').style.display = 'none';
		var login = getDom('login', 'id');
		login.style.display = 'block';
	})
	EventUtil.addHandler(surebtn, 'click', function () {
		// 获取申请注册用户填写的管理员账户名以及密码
		var midr = getDom('midr', 'id').value;
		var midpwdr = getDom('midpwdr', 'id').value;
		if (midpwdr) {
			midpwdr = hex_md5(midpwdr);
		}

		var request = new XMLHttpRequest();
		request.open('GET', php + '/Index/managerLoginregister?mid=' + midr + '&midpwd=' + midpwdr + '&type=u');
		request.send();
		request.onreadystatechange = function () {
		   	if (request.readyState === 4) {
		   		if (request.status === 200) {
                    // 由此处产生相关提示
                    switch (request.responseText) {
                    	case '0':
                    	    alert('错误！您未填写申请的管理员账户！');
                    	    break;
                    	case '1':
                    	    alert('错误！您未填写自定义的管理员密码！');
                    	    break;
                    	case '6':
                    	    alert('错误！已有管理员拥有此账户名');
                    	    break;
                    	case '7':
                    	    alert('错误！由于系统错误或者网络问题导致注册提交失败！');
                    	    break;
                    	case '8':
                    	    alert('注册信息提交成功！');
                    	    getDom('surebtn', 'id').innerHTML = '再次注册';
                    	    getDom('cancelbtn', 'id').innerHTML = '返回';
                    	    break;
                    	default:
                    	    break;
                    }
		   		}
		  		else {
		   			// 当请求不到数据时就会导致错误，用以下方法显示
		   			alert('发生错误：' + request.status);
		   		}
		   	}
		}
	});
}