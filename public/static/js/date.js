/*
 * 按照一定的格式转化日期
 */
// Date.prototype.format = function(format) {
//     var date = {
//         "M+": this.getMonth() + 1,
//         "d+": this.getDate(),
//         "h+": this.getHours(),
//         "m+": this.getMinutes(),
//         "s+": this.getSeconds(),
//         "q+": Math.floor((this.getMonth() + 3) / 3),
//         "S+": this.getMilliseconds()
//     };
//     if (/(y+)/i.test(format)) {
//         format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
//     }
//     for (var k in date) {
//         if (new RegExp("(" + k + ")").test(format)) {
//             format = format.replace(RegExp.$1, RegExp.$1.length == 1
//                 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
//             }
//     }
//     return format;
// }
/**
 * 获取当前的日期函数
 * 传入一个时间戳,如果不传则为当前时间
 * 注意：如果是uinx时间戳记得乘于1000, 比如php函数time()获得的时间戳就要乘于1000
 * @type String timestamp 要转换的时间戳格式 1469504554276
 * @returns {String} 日期格式: 2016-07-26 10:55:38
 */
function get_time_format(timestamp = false) {
    if (timestamp) {
        var date = new Date(timestamp);
    }
    else {
        var date = new Date();
    }
        Y = date.getFullYear(),
        m = date.getMonth()+1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
    if (m < 10) {
        m = '0'+ m;
    }
    if (d < 10) {
        d = '0'+ d;
    }
    if (H < 10) {
        H = '0'+ H;
    }
    if (i < 10) {
        i = '0'+ i;
    }
    if (s < 10) {
        s = '0'+ s;
    }
    var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
    return t;
}