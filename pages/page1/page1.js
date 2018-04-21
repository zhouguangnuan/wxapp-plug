var app = getApp()
Page({
    data: {
        info: ''
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function () {
        // 页面渲染完成

    },
    onShow: function () {
        // 页面显示

    },
    onHide: function () {
        // 页面隐藏

    },
    onUnload: function () {
        // 页面关闭

    },
    publishPage1Event: function () {
        app.fn.publish("page1Event", "page1EventInfo")
        this.setData({
            info: "通知成功,不信返回上一页看看"
        })
    },
    page2EventHandle: function (info) {//这是也给带参数的例子，info为字符串
        console.log("page2Event");
        this.setData({
            info: info
        })
    },
    goPage2: function () {
        wx.navigateTo({
            url: '../page2/page2'
        })
    },
    goPage1: function () {
        wx.navigateTo({
            url: '../page1/page1'
        })
    },
    changeSubscribe: function (e) {
        let event = e.target.dataset.event
        if (e.detail.value) {
            // 注册
            app.fn.subscribe(event, this, this[event + 'Handle'])
        } else {
            // 取消注册
            app.fn.cancelSubscribe(event, this)
        }
    }
})