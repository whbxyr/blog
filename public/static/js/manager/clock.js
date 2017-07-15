/**
 * 时钟模块
 */
(function () {
	var $ = function (id) {
		return document.getElementById(id);
	};
	var o = {	
		hour: $("hours"), // 小时数值对象
		minu: $("minuts"), // 分钟数值对象
		sec: $("seconds"), // 秒钟数值对象
		orgl: $("orangeRotateLeft"), // 黄色旋转左半区
		orgr: $("orangeRotateRight"), // 黄色旋转右半区
		bluel: $("blueRotateLeft"), // 蓝色旋转左半区
		bluer: $("blueRotateRight"), // 蓝色旋转右半区
		greenl: $("greenRotateLeft"), // 绿色旋转左半区
		greenr: $("greenRotateRight") // 绿色旋转右半区
	};
	var f = {
		css: function (o, key) {
			return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key]; 	
		},
		zero: function (n) {
			n = parseInt(n, 10);
			if (n > 0) {
				if (n <= 9) {
					n = "0" + n;	
				}
				return String(n);
			}
			else {
				return '00'.toString();	
			}
		},
		angle: function (v, total) {
			var scale = v / total, offsetx = 0, offsety = 0, an;
			var angle = scale * 360; // 当前角度值
			// IE矩阵角度值计算
			var m11 = Math.cos(Math.PI * 2 / 360 * angle)
			var m21 = Math.sin(Math.PI * 2 / 360 * angle);
			if (angle > 90) {
				an = angle - 90;
			}
			else {
				an = angle;	
			}
			offsety = offsetx = (200 - 200 * Math.sqrt(2) * Math.cos(Math.PI / 180 * Math.abs(an - 45))) / 2 ;
			return {
				trans: "rotate(" + angle + "deg)",	
				ie: "progid:DXImageTransform.Microsoft.Matrix(M11=" + m11 + ",M12=-" + m21 + ",M21=" + m21 + ",M22=" + m11 + ",SizingMethod='auto expand',FilterType='nearest neighbor')",
				offset: {
					x: offsetx,
					y: offsety
				}
			};
		},
		cartoon: function (l, r, v, part) {
			var total = part * 2, angleV, anglePart;
			if (v <= part && v > 0) {
				angleV = f.angle(v, total);
				l.style.display = "block";
				l.style.filter = angleV.ie;
				l.style.MozTransform = l.style.WebkitTransform = l.style.transform = angleV.trans;
				r.style.display = "none";
				// ie 旋转非居中旋转的修复
				if (document.all) {
					l.style.left = angleV.offset.x + "px";
					l.style.top = angleV.offset.y + "px";
				}
			}
			else {
				v = Math.abs(v - part);
				angleV = f.angle(v, total);
				anglePart = f.angle(part, total);
				l.style.display = "block";
				l.style.filter = anglePart.ie;
				l.style.MozTransform = l.style.WebkitTransform = l.style.transform = anglePart.trans;
				r.style.display = "block";
				r.style.filter = angleV.ie;
				r.style.MozTransform = r.style.WebkitTransform = r.style.transform = angleV.trans;
				if (document.all) {
					r.style.left = angleV.offset.x + "px";
					r.style.top = angleV.offset.x + "px";
				}
			}
		},
		ui: function () {
			var mytime = new Date();
			var h = mytime.getHours(), m = mytime.getMinutes(), s = mytime.getSeconds();
			o.hour.innerHTML = f.zero(h);
			o.minu.innerHTML = f.zero(m);
			o.sec.innerHTML = f.zero(s);
			f.cartoon(o.orgl, o.orgr, h, 12);
			f.cartoon(o.bluel, o.bluer, m, 30);
			f.cartoon(o.greenl, o.greenr, s, 30);
			setTimeout(f.ui, 1000);
		}
	};	
	f.ui();
})();