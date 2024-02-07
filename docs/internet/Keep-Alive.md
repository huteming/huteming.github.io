## 1. HTTP 的 Keep-Alive

HTTP 的 Keep-Alive 就是实现了可以使用同一个 TCP 连接来发送和接收多个 HTTP 请求/应答，避免了连接建立和释放的开销，这个方法称为 **HTTP 长连接**。

HTTP 长连接的特点是，只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。

### 1.1 开启 HTTP 的 Keep-Alive

在 HTTP 1.0 中默认是关闭的，如果浏览器要开启 Keep-Alive，它必须在请求的包头中添加：

```yaml
Connection: Keep-Alive
```

然后当服务器收到请求，作出回应的时候，它也添加一个头在响应中：

```yaml
Connection: Keep-Alive
```

这样做，连接就不会中断，而是保持连接。当客户端发送另一个请求时，它会使用同一个连接。这一直继续到客户端或服务器端提出断开连接。

**从 HTTP 1.1 开始， 就默认是开启了 Keep-Alive**，如果要关闭 Keep-Alive，需要在 HTTP 请求的包头里添加：

```yaml
Connection: close
```

现在大多数浏览器都默认是使用 HTTP/1.1，所以 Keep-Alive 都是默认打开的。

### 1.2 配置超时时间

如果使用了 HTTP 长连接，如果客户端完成一个 HTTP 请求后，就不再发起新的请求，此时这个 TCP 连接一直占用着挺浪费资源。

所以为了避免资源浪费的情况，web 服务软件一般都会提供 keepalive_timeout 参数，用来指定 HTTP 长连接的超时时间。

比如设置了 HTTP 长连接的超时时间是 60 秒，web 服务软件就会启动一个定时器，如果客户端在完后一个 HTTP 请求后，在 60 秒内都没有再发起新的请求，定时器的时间一到，就会释放该连接。

例如 nginx 可以这样配置

```bash
http {
  # 连接超时时间，默认为75s，可以在http，server，location块。
  keepalive_timeout 60;
}
```

## 2. 和 TCP 的 Keep-Alive 的关系

1. HTTP 协议的 Keep-Alive 意图在于连接复用，是由应用层（**用户态**）实现的，称为 HTTP 长连接。
2. TCP 的 KeepAlive 机制意图在于保活、心跳，检测连接错误，是由 TCP 层（**内核态**） 实现的，称为 TCP 保活机制。

## 3. TCP 的 Keepalive

### 3.1 原理

TCP 的 Keepalive 这东西其实就是 TCP 的保活机制，它的工作原理为：

如果两端的 TCP 连接一直没有数据交互，达到了触发 TCP 保活机制的条件，那么内核里的 TCP 协议栈就会发送探测报文。

1. 如果对端程序是正常工作的。当 TCP 保活的探测报文发送给对端, 对端会正常响应，这样 TCP 保活时间会被重置，等待下一个 TCP 保活时间的到来。
2. 如果对端主机崩溃，或对端由于其他原因导致报文不可达。当 TCP 保活的探测报文发送给对端后，石沉大海，没有响应，连续几次，达到保活探测次数后，TCP 会报告该 TCP 连接已经死亡。

所以，TCP 保活机制可以在双方没有数据交互的情况，通过探测报文，来确定对方的 TCP 连接是否存活，这个工作是在内核完成的。

![TCP 的 Keep-Alive 示意图](/img/http-keep-alive/tcp-keepalive.png)

### 3.2 配置

注意，应用程序若想使用 TCP 保活机制需要通过 socket 接口设置 SO_KEEPALIVE 选项才能够生效，如果没有设置，那么就无法使用 TCP 保活机制。

例如 nginx 配置

```bash
# so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]
# tcp_keepalive_time: KeepAlive的空闲时长，或者说每次正常发送心跳的周期，默认值为7200s（2小时）
# tcp_keepalive_intvl: KeepAlive探测包的发送间隔，默认值为75s
# tcp_keepalive_probes: 在tcp_keepalive_time之后，没有接收到对方确认，继续发送保活探测包次数，默认值为9（次）
so_keepalive=30m::10
# will set the idle timeout (TCP_KEEPIDLE) to 30 minutes,
# leave the probe interval (TCP_KEEPINTVL) at its system default,
# and set the probes count (TCP_KEEPCNT) to 10 probes.
```

## 参考

- [TCP Keep-Alive 和 HTTP Keep-Alive 是一个东西吗？](https://bbs.huaweicloud.com/blogs/285330)
