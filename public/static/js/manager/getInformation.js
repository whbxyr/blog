/**
 * 获取文章信息
 */
function getInformation(_nowanpage) {
   	var request = new XMLHttpRequest();
    request.open('GET', php + '/Index/getarticle?page=' + _nowanpage);
    // 将文章列表添加到文档流里
    articlelist.style.display = 'block';
    request.onreadystatechange = function () {
       	if (request.readyState === 4) {
       		if (request.status === 200) {
                // 获取列表串的开始位置
       			var tdfirst = request.responseText.indexOf('<');
                // 获取当前更新后的当前总页数
                Sign.allpage = parseInt(request.responseText.slice(0, tdfirst));
                // 获取文档流中的文章列表所在的表格
                var table = document.getElementsByTagName('table')[0];
                // 将文章列表添加到文档流中
                table.innerHTML = request.responseText.slice(tdfirst);
                // 以下为给每一篇文章添加删除事件
                var trs = document.getElementsByTagName('tr');
                for (var i = 1, len = trs.length; i < len; i++) {
                    // “删除”添加到每一行的第五个<td>内
                   	var removeonetr = trs[i].getElementsByTagName('td')[5];
                    // “修改”添加到每一行的第六个<td>内
                    var updateonetr = trs[i].getElementsByTagName('td')[6];
                    // “预览”添加到每一行的第七个<td>内
                    var previewonetr = trs[i].getElementsByTagName('td')[7];
                    // 添加删除事件
                   	removeonetr.onclick = (function (removeonetr, updateonetr, previewonetr, i) {
                        return function () {
                            // 查看当前管理员是否有权限删除文章
                            if (removeonetr.previousSibling.innerHTML !== mid) {
                                document.getElementById('result').innerHTML = '您没有权限删除该文章！';
                                tipAnimate();
                                return;
                            }
                            // 删除文章确认变量
                            var removesure;
                            removesure = confirm('你确定要删除这篇文章及其所有信息吗？\n删除后将不能恢复');
                            // 若removesure为true则删除文章
                            if (removesure) {
                                // 控制台打印被删除文章的时间戳
                              	console.log(removeonetr.id.slice(6));
                                // 删除该时间戳对应的文章
                                removearticle(removeonetr.id.slice(6));
                                // 删除后对“删除”按钮所在<td>的内容进行修改
                                removeonetr.innerHTML = '已删';
                                // 删除后将取消该行对应的“删除”按钮绑定的事件
                                removeonetr.onclick = null;
                                // 并将悬停指针改为自动
                                removeonetr.style.cursor = 'auto';
                                // 删除后对“修改”按钮所在<td>的内容进行修改
                                updateonetr.innerHTML = '无法修改';
                                // 删除后将取消该行对应的“修改”按钮绑定的事件
                                updateonetr.onclick = null;
                                // 并将悬停指针改为自动
                                updateonetr.style.cursor = 'auto';
                                // 删除后对“预览”按钮所在<td>的内容进行修改
                                previewonetr.innerHTML = '无法预览';
                                // 将该文章所在的<td>的字体颜色置为红色
                                trs[i].style.color = '#f00';
                            }
                            // 若removesure为false则不删除文章，并有相关文字提醒
                            else {
                               	document.getElementById('result').innerHTML = '您取消了删除操作！';
                            }
                            // 执行提示框动画
                            tipAnimate();
                        }
                   	})(removeonetr, updateonetr, previewonetr, i);
                    // 添加修改事件
                    updateonetr.onclick = (function (updateonetr) {
                        return function () {
                            // 查看当前管理员是否有权限修改文章
                            if (updateonetr.previousSibling.previousSibling.innerHTML !== mid) {
                                document.getElementById('result').innerHTML = '您没有权限修改该文章！';
                                tipAnimate();
                                return;
                            }
                            // 改变标志位Sign.afterUpdate的值为true，
                            // 表明当前为正要修改文章
                            Sign.afterUpdate = true;
                            // 获取文章编写插件的DOM
                            var article = document.getElementById('article');
                            // 获取编辑文章页的左边配置项的DOM
                            var side = document.getElementById('side');
                            // 获取编辑文章页的提交按钮的DOM
                            // var handin = document.getElementById('handin');
                            // 获取编辑文章页的重置按钮的DOM
                            // var reset = document.getElementById('reset');
                            // 获取“提交文章修改结果”按钮的父元素DIV的DOM
                            var update = document.getElementById('update').parentNode;
                            // 获取删除文章页的DOM，其包含了文章列表和分页条
                            var articlelist = document.getElementById('articlelist');
                            // 让前三个展现在文档流里
                            article.style.display = 'block';
                            side.style.display = 'inline-block';
                            update.style.display = 'block';
                            // handin.style.display = 'block';
                            // reset.style.display = 'block';
                            // 最后一个暂时从文档流中删除
                            articlelist.style.display = 'none';
                            var request = new XMLHttpRequest();
                            // 获取将要修改的文章的时间戳
                            var updatetime = updateonetr.id.slice(6);
                            // 及时更新当下想要修改的文章的时间戳
                            Sign.updateArticletime = updatetime;
                            // 拼接请求
                            request.open('GET', php + '/Index/getoneArticle?time=' + updatetime);
                            request.send();
                            request.onreadystatechange = function () {
                                if (request.readyState === 4) {
                                    if (request.status === 200) {
                                        // 后台传来的字符串中作为对象名的字符串有双引号"包裹，但该引号之前不含有\
                                        // 但是此时不作为对象名的其它字符串中的"前含有\
                                        // 此时假如将后台返回来的字符串打印出来，即可证明
                                        // 接下来将要执行JSON.parse函数，该函数如果遇到单数个不作为转义字符作用的\时将报错
                                        // 而之前后台在双引号前添加的\在此函数成功执行后将被忽略,因为其作为转义符作用
                                        // 此时就要将其他的不作为转义作用的\
                                        // 利用正则来替换它们，即3个\转义1个\
                                        // 经过JSON.parse后只剩下2个\
                                        // 放到tinymce编辑器中刚好以正常的数量显示文章应有的\
                                        var data = request.responseText.replace(/\\(?!")/g, '\\\\');
                                        // 将后台传来的数据转换为json格式
                                        data = JSON.parse(data);
                                        // 后台中从数据库中取出来的数据是经过html编码的，需要解码才能正常显示
                                        var kindchoose = document.getElementById('kindchoose');
                                        var title = document.getElementById('title');
                                        var cover = document.getElementById('cover');
                                        var covershow = document.getElementById('covershow');
                                        kindchoose.value = HtmlUtil.htmlDecode(data.kind);
                                        title.value = HtmlUtil.htmlDecode(data.title);
                                        cover.value = HtmlUtil.htmlDecode(data.cover);
                                        covershow.style.backgroundImage = 'url(' + HtmlUtil.htmlDecode(data.cover) + ')';
                                        // var content = HtmlUtil.htmlDecode(data.article).replace(/\\/ig, '\\\\');
                                        // tinyMCE.activeEditor.setContent(content);
                                        tinyMCE.activeEditor.setContent(HtmlUtil.htmlDecode(data.article));
                                    }
                                }
                            }
                        }
                    })(updateonetr);
                }
       		}
       		else {
    			// 当请求不到数据时就会导致错误，用以下方法显示
    			alert('发生错误：' + request.status);
    		}
       	}
    }
    // 立即发送请求
    request.send(null);
}