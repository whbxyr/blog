/**
 * 布置分页条的逻辑处理
 */
function bannerShow(allp, nowp) {
   	// console.log('bannerShow 目前当前页数：' + nowp + ' 总页数：' + ' ' + allp);
   	// 若总页数为零，说明数据库中无数据，则分页条不需要显示
    if (allp === 0) {
   		document.getElementById('firstpage').style.display = 'none';
   		document.getElementById('prev').style.display = 'none';
   		document.getElementById('page').style.display = 'none';
   		document.getElementById('next').style.display = 'none';
   		document.getElementById('lastpage').style.display = 'none';
   		document.getElementById('jump').style.display = 'none';
   		document.getElementById('jump_input').style.display = 'none';
   		// 此时将当前页重置为1，以便下一次数据库有数据时正确显示文章列表
        Sign.nowpage = 1;
        // 立即结束函数
   		return;
   	}
    // 否则就让分页条正常显示
   	else {
   		document.getElementById('firstpage').style.display = 'inline-block';
   		document.getElementById('prev').style.display = 'inline-block';
   		document.getElementById('page').style.display = 'inline-block';
   		document.getElementById('next').style.display = 'inline-block';
   		document.getElementById('lastpage').style.display = 'inline-block';
   		document.getElementById('jump').style.display = 'inline-block';
   		document.getElementById('jump_input').style.display = 'inline';
   	}
    // 若总页数只有1,则所有分页条上的按钮都失效
   	if (allp === 1) {
   		allHandler.buttonStyleControl(0, 0, 0, 0, 0);
   	}
    // 若总页数不止1,当前页为1,则"首页"以及"上一页"按钮失效
   	else if (nowp === 1) {
   		allHandler.buttonStyleControl(0, 0, 1, 1, 1);
   	}
    // 若总页数不止1,当前页为最后一页,则"下一页"以及"尾页"按钮失效
   	else if (nowp === allp) {
   		allHandler.buttonStyleControl(1, 1, 0, 0, 1);
   	}
    // 若总页数不止1,当前页不是首页也不是尾页时,所有按钮均有效
   	else {
   		allHandler.buttonStyleControl(1, 1, 1, 1, 1);
	}
    // 初始化分页条为空
    var banner = '';
    // 循环借变量
    var i;
    // 若总页数少于等于3,则分页条最多显示3条
    if (allp <= 3) {
        // 具体布置分页条
    	for (i = 1; i <= allp; i++) {
    		// 当前页的选项卡样式与其他选项卡的样式有所区别
            if (i === nowp) {
                banner += '<span id="'+ i +'" style="padding: 10px 20px;">' + i +'</span>';
    		}
    		else {
    	        banner += '<span id="'+ i +'">' + i +'</span>';
    	    }

        }
        // 将选项卡都放到文档流里
        document.getElementById('page').innerHTML = banner;
        // 给所有的选项卡注册点击事件
        for (i = 1; i <= allp; i++) {
        	var threeone = document.getElementById(i + '');
        	EventUtil.addHandler(threeone, 'click', (function (threeone) {
                return function () {
                    // 更新总页数前置其为空串
                	Sign.allpage = '';
                    // 通过添加计时器监视总页数是否更新了
                	var waittimer = null;
                    // 将当前页置为此选项卡的id
                	Sign.nowpage = parseInt(threeone.id);
                    // console.log('id= ' + Sign.nowpage);
                    // 更新总页数
                	getInformation(Sign.nowpage);
                    waittimer = setInterval(function () {
                        // Sign.allpage不为空串时，说明更新完毕
                        if (Sign.allpage !== '') {
                            // 若总页数小于当前页且总页数不为零，则将当前页数减一
                           	if (Sign.allpage < Sign.nowpage && Sign.allpage !== 0) {
                           		Sign.nowpage = Sign.nowpage - 1;
                           	}
                            // 控制台打印当前页
                            console.log('Sign.nowpage=' + Sign.nowpage);
                            // 获取当前页文章的详细信息
                           	getInformation(Sign.nowpage);
                            // 布置分页条
                           	bannerShow(Sign.allpage, Sign.nowpage);
                            // 清除计时器
                           	clearInterval(waittimer);
                        }
                    }, 1);
	            }
        	})(threeone));
        }
    }
    // 若总页数大于3，则每次分页条会显示3个选项卡
    if (allp > 3) {
        // 若当前页数小于等于2，则一直显示“1”、“2”、“3”3个页面选项卡
    	if (nowp <= 2) {
            // 当前页要么为1要么为2
    		if (nowp === 1) {
                banner += '<span id="1" style="padding: 10px 20px;">1</span><span id="2">2</span><span id="3">3</span>...';
    		}
    		else if (nowp === 2) {
    		    banner += '<span id="1">1</span><span id="2" style="padding: 10px 20px;">2</span><span id="3">3</span>...';
    		}
            // 将选项卡都放到文档流里
    		document.getElementById('page').innerHTML = banner;
    		for (i = 1; i <= 3; i++) {
    			var threeone = document.getElementById(i + '');
                // 给3个选项卡注册点击事件
        	    EventUtil.addHandler(threeone, 'click', (function (threeone) {
                    return function () {
                        // 更新总页数前置其为空串
	                	Sign.allpage = '';
                        // 通过添加计时器监视总页数是否更新了
	                	var waittimer = null;
                        // 将当前页置为此选项卡的id
	                	Sign.nowpage = parseInt(threeone.id);
                        // console.log('id= ' + Sign.nowpage);
                        // 更新总页数
	                	getInformation(Sign.nowpage);
                        waittimer = setInterval(function () {
                            // Sign.allpage不为空串时，说明更新完毕
                            if (Sign.allpage !== '') {
                                // 若总页数小于当前页数，则将当前页数减一
                               	if (Sign.allpage < Sign.nowpage) {
                               		Sign.nowpage = Sign.nowpage - 1;
                               	}
                                // 控制台打印当前页
                                console.log('Sign.nowpage=' + Sign.nowpage);
                                // 获取当前页文章的详细信息
                               	getInformation(Sign.nowpage);
                                // 布置分页条
                               	bannerShow(Sign.allpage, Sign.nowpage);
                                // 清除计时器
                               	clearInterval(waittimer);
                            }
                        }, 1);
	                }
        	    })(threeone));
            }
    	}
        // 若当前页为最后一页或者倒数第二页，则3个选项卡为倒数的三个
    	else if (nowp >= allp - 1) {
            // 当前页要么为最后一页要么为最后第二页
    		if (nowp === allp - 1) {
    		    banner += '...<span id="' + (allp - 2) + '">' + (allp - 2) + '</span><span id="'
    		        + (allp - 1) + '" style="padding: 10px 20px;">' + (allp - 1) + '</span><span id="' + allp + '">' + allp + '</span>';
    		}
    		else if (nowp === allp) {
    			banner += '...<span id="' + (allp - 2) + '">' + (allp - 2) + '</span><span id="'
    		        + (allp - 1) + '">' + (allp - 1) + '</span><span id="' + allp + '" style="padding: 10px 20px;">' + allp + '</span>';
    		}
            // 将选项卡都放到文档流里
    		document.getElementById('page').innerHTML = banner;
    		for (i = allp - 2; i <= allp; i++) {
    			var threeone = document.getElementById(i + '');
                // 给3个选项卡注册点击事件
        	    EventUtil.addHandler(threeone, 'click', (function (threeone) {
                    return function () {
                        // 更新总页数前置其为空串
	                	Sign.allpage = '';
                        // 通过添加计时器监视总页数是否更新了
	                	var waittimer = null;
                        // 将当前页置为此选项卡的id
	                	Sign.nowpage = parseInt(threeone.id);
                        // console.log('id= ' + Sign.nowpage);
                        // 更新总页数
	                	getInformation(Sign.nowpage);
                        waittimer = setInterval(function () {
                            // Sign.allpage不为空串时，说明更新完毕
                            if (Sign.allpage !== '') {
                                // 若总页数小于当前页数，则将当前页数减一
                               	if (Sign.allpage < Sign.nowpage) {
                              		Sign.nowpage = Sign.nowpage - 1;
                               	}
                                // 控制台打印当前页
                                console.log('Sign.nowpage=' + Sign.nowpage);
                                // 获取当前页文章的详细信息
                               	getInformation(Sign.nowpage);
                                // 布置分页条
                               	bannerShow(Sign.allpage, Sign.nowpage);
                                // 清除计时器
                               	clearInterval(waittimer);
                            }
                        }, 1);
	                }
        	    })(threeone));
        	}
    	}
        // 若总页数大于3，且当前页不在前1、2页或者尾1、2页，则动态显示3个选项卡
    	else {
    		banner += '...<span id="' + (nowp - 1) + '">' + (nowp - 1) + '</span><span id="'
    		    + nowp + '" style="padding: 10px 20px;">' + nowp + '</span><span id="' + (nowp + 1) + '">' + (nowp + 1) + '</span>...';
    		// 将选项卡都放到文档流里
            document.getElementById('page').innerHTML = banner;
    		for (i = nowp - 1; i <= nowp + 1; i++) {
    			var threeone = document.getElementById(i + '');
        	    // 给3个选项卡注册点击事件
                EventUtil.addHandler(threeone, 'click', (function (threeone) {
                    return function () {
                        // 更新总页数前置其为空串
	                	Sign.allpage = '';
                        // 通过添加计时器监视总页数是否更新了
	                	var waittimer = null;
                        // 将当前页置为此选项卡的id
	                	Sign.nowpage = parseInt(threeone.id);
                        // 更新总页数
	                	getInformation(Sign.nowpage);
                        waittimer = setInterval(function () {
                            // Sign.allpage不为空串时，说明更新完毕
                            if (Sign.allpage !== '') {
                                // 若总页数小于当前页数，则将当前页数减一
                              	if (Sign.allpage < Sign.nowpage) {
                               		Sign.nowpage = Sign.nowpage - 1;
                               	}
                                // 控制台打印当前页
                                console.log('Sign.nowpage=' + Sign.nowpage);
                                // 获取当前页文章的详细信息
                               	getInformation(Sign.nowpage);
                                // 布置分页条
                               	bannerShow(Sign.allpage, Sign.nowpage);
                                // 清除计时器
                               	clearInterval(waittimer);
                            }
                        }, 1);
	                }
        	    })(threeone));
            }
    	}
    }
}