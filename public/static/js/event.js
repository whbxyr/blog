var EventUtil = {
    // 添加句柄
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on'+type, handler);
        }
        else {
            element['on'+type] = handler;
        }
    },
    // 删除句柄
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent){
            element.detachEvent('on'+type, handler);
        }
        else {
            element['on'+type] = null;
        }
    },
    // 获取事件对象
    getEvent: function (event) {
        return event ? event : window.event;
    },
    // 获取事件类型
    getType: function (event) {
        event = event || window.event;
        return event.type;
    },
    // 获取事件元素
    getElement: function (event) {
    	// 兼容IE8及以前的IE浏览器
        event = event || window.event;
        return event.target || event.srcElement;
    },
    // IE8及以前的版本不支持事件捕获，所以不常用事件捕获
    // 阻止事件冒泡
    stopPropagation: function (event) {
        event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    },
    //阻止默认行为
    preventDefault: function (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    }
}
