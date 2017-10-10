window.onload = function () {

	var uid = '';
	var uidpwd = '';
	// var hascookie = 0;
	var uidpwdcookiemd5 = '';
	var uidcookie = '';
    // 获取“登陆”按钮以及“注册”按钮的DOM
	var loginbtn = getDom('loginbtn', 'id');
    var registerbtn = getDom('registerbtn', 'id');
    // 获取“提交”按钮以及“取消”按钮的DOM
    var surebtn = getDom('surebtn', 'id');
    var cancelbtn = getDom('cancelbtn', 'id');
	EventUtil.addHandler(loginbtn, 'click', function () {
		// 获取用户填写的管理员账户名以及密码
		uiduiddle = getDom('uidl', 'id').value;
		uidpwduiddle = getDom('uidpwdl', 'id').value;
		if (uidpwduiddle) {
			uidpwduiddle = hex_md5(uidpwduiddle);
		}

		if (uiduiddle !== uid) {
			uid = uiduiddle;
		}
		if (uid === uidcookie) {
			if (uidpwduiddle !== uidpwdcookiemd5) {
				uidpwd = uidpwduiddle;
			}
			else {
				uidpwd = getDom('uidpwdl', 'id').value;
			}
			// hascookie = 0;
		}
		else if (uidpwduiddle !== uidpwd) {
			uidpwd = uidpwduiddle;
		}

		loginValid();
	});
	// 登陆发送验证
	function loginValid() {
		var request = new XMLHttpRequest();
	    request.open('GET', php + '/Index/userLoginregister?uid=' + uid + '&uidpwd=' + uidpwd + '&type=');
	    request.send();
		request.onreadystatechange = function () {
		   	if (request.readyState === 4) {
		   		if (request.status === 200) {
                    // 由此处产生相关提示
                    switch (request.responseText) {
                    	case '0':
                    	    alert('错误！您未填写用户账户！');
                    	    break;
                    	case '1':
                    	    alert('错误！您未填写用户密码！');
                    	    break;
                    	case '2':
                    	    alert('错误！您输入的用户名不存在！');
                    	    break;
                    	case '3':
                    	    alert('警告！密码错误！');
                    	    break;
                    	case '4':
                    	    console.log('登陆成功');
                    	    if (testCookie('uid') === 0) {
                    	    	console.log('此浏览器禁止了cookie的使用！');
                    	    }
                    	    else {
                    	    	if (testCookie('uid') !== uid) {
                    	    		console.log('重新保存管理员账户的cookie信息');
	                    	   	    var date = new Date();
	                    	   	    date.setTime(date.getTime() + 1200000);
	                    	   	    setCookie('uid', uid, date, '/');
	                    	   	    setCookie('uidpwd', uidpwd, date, '/');
	                    	    }
	                    	    else {
	                    	    	console.log('已有用户账户的cookie信息');
	                    	    }
                    	    }
                    	    location.href = php;
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
		if (testCookie('uid')) {
			if (testCookie('uidpwd')) {
				uid = testCookie('uid');
				uidpwd = testCookie('uidpwd');
				getDom('uidl', 'id').value = uid;
		        getDom('uidpwdl', 'id').value = uidpwd;
		        // hascookie = 1;
		        uidcookie = testCookie('uid');
		        uidpwdcookiemd5 = hex_md5(uidpwd);
		        // alert(testCookie('uidpwd'));
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
		var uidr = getDom('uidr', 'id').value;
		var uidpwdr = getDom('uidpwdr', 'id').value;
		if (uidpwdr) {
			uidpwdr = hex_md5(uidpwdr);
		}

		var request = new XMLHttpRequest();
		request.open('GET', php + '/Index/userLoginregister?uid=' + uidr + '&uidpwd=' + uidpwdr + '&type=r');
		request.send();
		request.onreadystatechange = function () {
		   	if (request.readyState === 4) {
		   		if (request.status === 200) {
                    // 由此处产生相关提示
                    switch (request.responseText) {
                    	case '0':
                    	    alert('错误！您未填写注册的用户账户！');
                    	    break;
                    	case '1':
                    	    alert('错误！您未填写自定义的用户密码！');
                    	    break;
                    	case '5':
                    	    alert('错误！已有用户拥有此账户名');
                    	    break;
                    	case '6':
                    	    alert('错误！由于系统错误或者网络问题导致注册提交失败！');
                    	    break;
                    	case '7':
                    	    alert('注册成功！');
                    	    console.log('重新保存管理员账户的cookie信息');
	                    	var date = new Date();
	                    	date.setTime(date.getTime() + 1200000);
	                    	setCookie('uid', uidr, date, '/');
	                    	setCookie('uidpwd', uidpwdr, date, '/');
                    	    location.href = php;
                    	    // getDom('surebtn', 'id').innerHTML = '再次注册';
                    	    // getDom('cancelbtn', 'id').innerHTML = '返回';
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