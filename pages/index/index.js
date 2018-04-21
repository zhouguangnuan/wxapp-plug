//获取应用实例
var app = getApp()
Page({
    data: {
        noticeText: "这里将显示来自不同通知的文字"
    },
    onLoad: function () {
        console.log('onLoad')
    },
    indexEventHandle: function (info) {
        console.log("indexEvent");
        this.setData({
            info: info
        })
    },
    //这是一个带参数的例子，info为字符串
    page1EventHandle: function (info) {//这是也给带参数的例子，info为字符串
        console.log("page1Event");
        this.setData({
            info: info
        })
    },
    //这是一个带参数的例子，info为对象
    page2EventHandle: function (info) {//这是也给带参数的例子，info为字符串
        console.log("page2Event");
        this.setData({
            info: info
        })
    },
    publishIndexEvent: function () {
        app.fn.publish("indexEvent", "indexEventInfo")
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
