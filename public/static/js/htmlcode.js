/**
 * 用浏览器内部转换器实现
 * javascript处理HTML的Encode(转码)和Decode(解码)
 */
var HtmlUtil = {
    // 用浏览器内部转换器实现html转码
    // 首先动态创建一个容器标签元素，如DIV，
    // 然后将要转换的字符串设置为这个元素的innerText(ie支持)
    // 或者textContent(火狐，google支持)，最后返回这个元素的innerHTML，
    // 即得到经过HTML编码转换的字符串了。
    htmlEncode: function (html) {  
        var div = document.createElement('div');  
        div.appendChild(document.createTextNode(html));  
        return div.innerHTML;
    },
    // 用浏览器内部转换器实现html解码
    // 首先动态创建一个容器标签元素，如DIV，
    // 然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)，
    // 最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，
    // 即得到经过HTML解码的字符串了。
    htmlDecode: function (text) {  
        var div = document.createElement('div');  
        div.innerHTML = text;  
        return div.innerText || div.textContent;
    }
}
