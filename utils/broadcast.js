/**
 * 通知广播模式类
 */

let _eventMap = {}

/**
 * subscribe
 * 注册事件监听【为指定页面监听指定的事件】
 *
 * 参数:
 * event：   事件【string】
 * page：    页面【Page】
 * method:   事件处理方法【Page.function】
 */
function subscribe(event, page, method) {
    if (!event || !page || !method) {
        console.log("subscribe Warning: params（event, page, method）can't be null")
        return
    }

    if (!_eventMap[event]) {
        _eventMap[event] = []
    }
    let listenerList = _eventMap[event]
    if (listenerList.length > 0) {
        for (let i = 0; i < listenerList.length; i++) {
            let listener = listenerList[i]
            if (listener.page === page && listener.method.name == method.name) {
                // 相同页面对象相同处理方法只注册一次，后者替换前者
                return
            }
        }
    }

    listenerList.push({
        page: page,
        method: method
    })

    // 删除页面栈中不存在的page
    let currentPages = getCurrentPages()
    for (let event in _eventMap) {
        listenerList = _eventMap[event]
        if (!listenerList || listenerList.length === 0) continue

        let removeIndexArray = []
        for (let i = 0; i < listenerList.length; i++) {
            if (!currentPages.includes(listenerList[i].page)) {
                removeIndexArray.push(i)
                continue
            }
        }
        let num = 0
        for (var removeIndex of removeIndexArray) {
            listenerList.splice(removeIndex - num, 1)
            num += 1
        }
    }
}

/**
 * publish
 * 发布事件通知
 *
 * 参数:
 * event：   事件【string】
 * info:     事件内容
 */
function publish(event, info) {
    if (!event) {
        console.log("publish Warning: params（event）can't be null")
        return
    }

    let listenerList = _eventMap[event]
    if (!listenerList || listenerList.length === 0) {
        console.log("publish Warning: the event has't be subscribe")
        return
    }

    let currentPages = getCurrentPages()
    let removeIndexArray = []
    for (let i = 0; i < listenerList.length; i++) {
        if (!currentPages.includes(listenerList[i].page)) {
            // 页面不存在页面栈中，则删除该页面，且不执行事件
            removeIndexArray.push(i)
            continue
        }
        listenerList[i].method(info)
    }
    // 删除该页面
    let num = 0
    for (var removeIndex of removeIndexArray) {
        listenerList.splice(removeIndex - num, 1)
        num += 1
    }
}

/**
 * cancelSubscribe
 * 取消事件监听
 *
 * 参数:
 * event:   事件【string】
 * page:    页面【Page（!null：取消该事件指定页面的监听，null：取消该事件所有页面的监听】
 */
function cancelSubscribe(event, page) {
    if (!event) return
    let listenerList = _eventMap[event]
    if (!listenerList || listenerList.length === 0) return

    if (page) {
        let removeIndexArray = []
        for (let i = 0; i < listenerList.length; i++) {
            let listener = listenerList[i]
            if (listener.page.route === page.route) {
                removeIndexArray.push(i)
            }
        }
        let num = 0
        for (var removeIndex of removeIndexArray) {
            listenerList.splice(removeIndex - num, 1)
            num += 1
        }
    } else {
        delete _eventMap[event]
    }
}

/**
 * cancelSubscribe
 * 取消页面事件监听【取消指定页面所以的事件监听】
 *
 * 参数:
 * page:    页面【Page】
 */
function cancelPageSubscribe(page) {
    if (!page) return

    for (let event in _eventMap) {
        let listenerList = _eventMap[event]
        if (!listenerList || listenerList.length === 0) return

        let removeIndexArray = []
        for (let i = 0; i < listenerList.length; i++) {
            let listener = listenerList[i]
            if (listener.page.route === page.route) {
                removeIndexArray.push(i)
            }
        }
        let num = 0
        for (var removeIndex of removeIndexArray) {
            listenerList.splice(removeIndex - num, 1)
            num += 1
        }
    }
}

module.exports = {
    subscribe: subscribe,
    publish: publish,
    cancelSubscribe: cancelSubscribe,
    cancelPageSubscribe: cancelPageSubscribe
}
