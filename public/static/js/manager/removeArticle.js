/**
 * 删除文章时利用ajax
 * 对数据库进行更新
 * time参数为时间戳
 */
function removearticle(time) {
    var request = new XMLHttpRequest();
    // request.open('POST', php + '/Index/removearticle');
    var data = 'time=' + time;
    request.open('GET', php + '/Index/removearticle?' + data);
    // POST请求方式必须设置的请求头格式
    // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(null);
    request.onreadystatechange = function () {
    	if (request.readyState === 4) {
            if (request.status === 200) {
                document.getElementById('result').innerHTML = request.responseText;
            }
            else {
    			// 当请求不到数据时就会导致错误，用以下方法显示
    			alert('发生错误：' + request.status);
    		}
    	}
    }
}