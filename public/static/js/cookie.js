/**
 * 定义浏览器设置cookie以及测试cookie的方法
 * 设置cookie -> setCookie()
 * 测试cookie -> testCookie()
 */
// 设置cookie
function setCookie(name, value, expires = '', path = '', domain = '') {
	var expirespart = '';
	var pathpart = '';
	var domainpart = '';
	if (expires) {
		expirespart = 'expires=' + expires.toGMTString() + ';';
	}
	if (path) {
		pathpart = 'path=' + path + ';';
	}
	if (domain) {
		domainpart = 'domain=' + domain + ';';
	}
	document.cookie = name + '=' + escape(value) + ';' + expirespart + pathpart + domainpart + ':secure';
}
// 测试cookie
function testCookie(name) {
	if (!navigator.cookieEnabled) {
		return 0;
	}
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}
