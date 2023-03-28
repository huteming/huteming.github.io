通过使用 `Workers`，Web 应用程序可以在独立于主线程的后台线程中，`运行一个脚本操作`。
这样做的好处是可以在独立线程中执行费时的处理任务，从而允许主线程不会因此被阻塞。

注意: [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)的解释中，只是说使用 API，可以在后台线程中运行一个脚本，
并没有说创建一个后台线程。

## Web worker 和 service worker

### 相同点

1. 都是在后台线程中运行，不会阻塞主线程。
2. 不能操作 DOM。

### 不同点

1. `Service Worker` 允许您拦截网络请求
2. 一个页面可以产生多个 `web worker`，但是只有一个 `service worker`，控制着它注册范围内的所有活动页面。
3. 关闭运行 `web worker` 的页面将终止它，而 `service worker` 可以继续在后台运行，即使站点没有打开任何活动页面
4. `web worker` 可以使用大部分 `window` 对象的方法和属性，包括 `WebSockets`、`Storage`、`XMLHttpRequest` 等
5. `service worker` 不能使用 `Storage`、`XMLHttpRequest`，并且出于安全考量，只能由 `HTTPS` 承载，**毕竟修改网络请求的能力暴露给中间人攻击会非常危险**。

## Service Workers

`Service Workers` 一般作为 web 应用程序、浏览器和网络（如果可用）之间的**代理服务**。他们旨在创建有效的离线体验，拦截网络请求，以及根据网络是否可用采取合适的行动，更新驻留在服务器上的资源。他们还将允许访问推送通知和后台同步 API。
