虚拟dom：
  解决的问题是：
    1. dom节点本身有非常多的属性和方法，用js直接操作开销很大。
    2. 如果一段代码连续执行dom的操作，有可能会造成一些没必要的大开销
  所以引入虚拟dom，它的解决方案是通过一个js对象去描述真实的dom，这个对象在vue里叫 VNode，然后我们所有对dom的操作都改成操作这个js对象，这个过长会非常快，然后用这个js对象去经过一系列操作，比如对比和真实dom之间的差异之后，得到真正需要更新的dom，然后去更新。这里vue有一个优化是在下一个事件循环中去执行这个更新操作，能够忽略一些重复的操作


vue原理
  基本原理是通过 Object.defineProperty 来劫持一个对象的属性。在getter函数里去添加需要这个数据的dom到数据依赖中，然后再setter函数里更新这个数据时，触发刚才收集的依赖dom的更新。

缓存
  强缓存和对比缓存
  强缓存不会发送请求给服务端，是根据cache-control/expires来判断的
  对比缓存两种模式 etag 和 last-modified ，etag 是根据文件内容生成的，last-modified 是文件最后的修改时间

http
  是客户端和服务券的一种双向协议
  特点：简单，扩展性好，跨平台
  简单：头信息 + body 。而且还有很多语义化相对确定状态码
  扩展性好：虽然定义了很多header头字段，但完全可以自己再扩展定义
  跨平台：app，浏览器都可以用

  缺点：
    明文传输，不安全
    无状态的

  无状态用cookie能解决
  明文用 https 解决

  1.1新特性
    长连接，
    管道传输：发出一个请求后，不用等服务端响应就能继续发送下一个请求。但服务端还是按照顺序返回的（队头堵塞）

  2.0新特性
    头部压缩
    二进制传输
    多路复用
    客户端可以指定请求的优先级
    服务端推送

  常见状态码
    1xx：请求的一个中间状态，没用过
    2xx：表示请求成功
      204：没有响应体
      206：有响应体，但只是完整数据的其中一部分，
    3xx：重定向
      301：永久重定向
      302：临时重定向
      304：重定向到缓存去，没有跳转
    4xx：客户端错误
      403：客户端权限错误
      404：not found
    5xx：服务器错误
      502：网关错误