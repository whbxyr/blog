/**
 * 获取DOM元素的接口
 */
function getDom(name, type) {
	if (type === 'id') {
		return document.getElementById(name);
	}
	if (type === 'class') {
		return document.getElementsByClassName(name);
	}
	if (type === 'tag') {
		return document.getElementsByTagName(name);
	}
}