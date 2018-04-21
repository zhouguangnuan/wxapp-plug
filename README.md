# Broadcast
微信小程序通知广播模式类

参考 https://github.com/icindy/WxNotificationCenter

## 版本信息

`version 1.0`

## 使用场景
  ```
  1. 降低小程序开发的耦合度
  2. 多级页面传值
  ```

## 使用

 1. copy 文件 `broadcast.js` 到你的开发目录中

 2. 引入 `broadcast.js` 在你需要的`js`中

  ```
  var Broadcast = require("../../broadcast.js");
  ```

 3. 注册事件监听

  ```
  /**
   * subscribe
   * 注册事件监听【为指定页面监听指定的事件】
   *
   * 参数:
   * event：   事件【string】
   * page：    页面【Page】
   * method:   事件处理方法【Page.function】
   */
  Broadcast.subscribe("eventName", this, this.method)
  ```

 4. 广播事件通知

  ```
  /**
   * publish
   * 发布事件通知
   *
   * 参数:
   * event：   事件【string】
   * info:     事件内容
   */
  Broadcast.publish("eventName", info);
  ```

 5. 取消事件监听

  ```
  /**
   * cancelSubscribe
   * 取消事件监听
   *
   * 参数:
   * event:   事件【string】
   * page:    页面【Page（!null：取消该事件指定页面的监听，null：取消该事件所有页面的监听】
   */
  Broadcast.cancelSubscribe("cancelSubscribe", this)
  ```
  
 5. 取消事件监听

  ```
  /**
   * cancelSubscribe
   * 取消页面事件监听【取消指定页面所以的事件监听】
   *
   * 参数:
   * page:    页面【Page】
   */
   Broadcast.cancelPageSubscribe(this)
   ```

## 源码

[git](http://weappdev.com/) 


