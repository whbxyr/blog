/**
 * 提示框动画函数
 */
// 初始化提示框进入计时器
// 初始化提示框离开计时器
function tipAnimate() {
    if (Sign.tipintimer) {
		clearInterval(Sign.tipintimer);
		document.getElementById('result').style.marginTop = -27 + 'px';
	}
	if (Sign.tipouttimer) {
		clearInterval(Sign.tipouttimer);
		document.getElementById('result').style.marginTop = -27 + 'px';
	}
	// 标志位，因为两个动画只能有一个在进行
	var animated = true;
	Sign.tipintimer = setInterval(function () {
	    // 获取提示框的DOM
	    var result = document.getElementById('result');
	    // 逐渐下拉，以1px为单位
	    var top = parseInt(result.style.marginTop) + 1;
	    result.style.marginTop = top + 'px';
        // 进入动画完成
        if (top === 0) {
         	// 让提示框停留3秒
           	setTimeout(function () {
           		// 修改标志位，以便离开动画执行
           		animated = false;
           	}, 3000);
           	// 清除进入动画计时器
           	clearInterval(Sign.tipintimer);
        }
	}, 10);
	Sign.tipouttimer = setInterval(function () {
	  	// 当标志位符合false时，执行离开动画
	    if (!animated) {
	      	// 获取提示框的DOM
	        var result = document.getElementById('result');
	        // 逐渐上提，以-1px为单位
	        var top = parseInt(result.style.marginTop) - 1;
	        result.style.marginTop = top + 'px';
	        // 离开动画完成
	        if (top === -27) {
	          	// 清除离开动画计时器
	          	clearInterval(Sign.tipouttimer);
	        }
	    }
	}, 10);
}