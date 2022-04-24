## 配置结构

下面是一个 nginx 配置文件的基本结构：

![nginx conf](/img/doc/nginx/nginx.png)

```bash
# main
# nginx的全局配置，对全局生效

# upstream
# 配置后端服务器具体地址，负载均衡配置不可或缺的部分

# 配置影响nginx服务器或与用户的网络连接
events {
}

# 可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
http
{
  # 配置虚拟主机的相关参数，一个http中可以有多个server
  # 如果以下配置没写明在哪个部分，一般就是在 server 下
  server
  {
    # 配置请求的路由，以及各种页面的处理情况
    location path
    {
      ...
    }
    location path
    {
      ...
    }
  }

  server
  {
    ...
  }
}
```

## 内置变量

下面是 nginx 一些配置中常用的内置全局变量，你可以在配置的任何位置使用它们。

| 变量名           | 功能                                                                |
| ---------------- | ------------------------------------------------------------------- |
| $host            | 请求信息中的 `Host`，如果请求中没有 `Host` 行，则等于设置的服务器名 |
| $request_method  | 客户端请求类型，如 `GET`、`POST `                                   |
| $remote_addr     | 客户端的 `IP` 地址                                                  |
| $args            | 请求中的参数                                                        |
| $content_length  | 请求头中的 `Content-length` 字段                                    |
| $http_user_agent | 客户端 `agent` 信息                                                 |
| $http_cookie     | 客户端 `cookie` 信息                                                |
| $remote_port     | 客户端的端口                                                        |
| $server_protocol | 请求使用的协议，如 `HTTP/1.0`、`HTTP/1.1`                           |
| $server_addr     | 服务器地址                                                          |
| $server_name     | 服务器名称                                                          |
| $server_port     | 服务器的端口号                                                      |

## 解决跨域

### 跨域的定义

同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。通常不允许不同源间的读操作。

### nginx 解决跨域的原理

例如：

- 前端 server 的域名为：`fe.server.com`

- 后端服务的域名为：`dev.server.com`

现在我在 `fe.server.com` 对 `dev.server.com` 发起请求一定会出现跨域。

现在我们只需要启动一个 `nginx` 服务器，将 `server_name` 设置为 `fe.server.com`, 然后设置相应的 `location` 以拦截前端需要跨域的请求，最后将请求代理回 `dev.server.com`。如下面的配置：

```bash
server {
  server_name fe.server.com;
  listen 80;

  location / {
    proxy_pass dev.server.com;
  }
}
```

这样可以完美绕过浏览器的同源策略：`fe.server.com` 访问 `nginx` 的 `fe.server.com` 属于同源访问，而 `nginx` 对服务端转发的请求不会触发浏览器的同源策略。

## 请求过滤

### 根据状态码过滤

```bash
# error_page 的作用是当发生错误的时候能够显示一个预定义的uri
error_page 500 501 502 503 504 506 /50x.html;
location = /50x.html {
  #将跟路径改编为存放html的路径。
  root /root/static/html;
}
```

### 根据 URL 名称过滤

精准匹配 URL，不匹配的 URL 全部重定向到主页。

```bash
location / {
  rewrite  ^.*$ /index.html  redirect;
}
```

### 根据请求类型过滤

```bash
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
  return 403;
}
```

## 配置 gzip

```bash
gzip                    on;
gzip_http_version       1.1;
gzip_comp_level         5;
gzip_min_length         1000;
gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;
```

### gzip

- 开启或者关闭 gzip 模块
- 默认值为 off
- 可配置为 on / off

### gzip_http_version

- 启用 GZip 所需的 HTTP 最低版本
- 默认值为 HTTP/1.1

### gzip_comp_level

- 压缩级别，级别越高压缩率越大，当然压缩时间也就越长（传输快但比较消耗 cpu）。
- 默认值为 1
- 压缩级别取值为 1-9

### gzip_min_length

- 设置允许压缩的页面最小字节数，Content-Length 小于该值的请求将不会被压缩
- 默认值:0
- 当设置的值较小时，压缩后的长度可能比原文件大，建议设置 1000 以上

### gzip_types

- 要采用 gzip 压缩的文件类型(MIME 类型)
- 默认值:text/html(默认不压缩 js/css)

## 负载均衡

### 什么是负载均衡

![负载均衡示例](/img/doc/nginx/balanceServer-example.png)

如上面的图，前面是众多的服务窗口，下面有很多用户需要服务，我们需要一个工具或策略来帮助我们将如此多的用户分配到每个窗口，来达到资源的充分利用以及更少的排队时间。

把前面的服务窗口想像成我们的后端服务器，而后面终端的人则是无数个客户端正在发起请求。负载均衡就是用来帮助我们将众多的客户端请求合理的分配到各个服务器，以达到服务端资源的充分利用和更少的请求时间。

### nginx 如何实现负载均衡

Upstream 指定后端服务器地址列表

```bash
upstream balanceServer {
  server 10.1.22.33:12345;
  server 10.1.22.34:12345;
  server 10.1.22.35:12345;
}
```

在 server 中拦截响应请求，并将请求转发到 Upstream 中配置的服务器列表。

```bash
server {
    server_name  fe.server.com;
    listen 80;
    location /api {
        proxy_pass http://balanceServer;
    }
}
```

上面的配置只是指定了 `nginx` 需要转发的服务端列表，并没有指定分配策略。

### nginx 实现负载均衡的策略

#### 轮询策略

![轮询策略](/img/doc/nginx/balance-polling.png)

`默认情况下采用的策略`，将所有客户端请求轮询分配给服务端。这种策略是可以正常工作的，但是如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户。

```bash
upstream balanceServer {
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

#### 最小连接数策略

![最小连接数策略](/img/doc/nginx/balance-least.png)

将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。

```bash
upstream balanceServer {
    least_conn;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

#### 最快响应时间策略

![最快响应时间策略](/img/doc/nginx/balance-fair.png)

依赖于 NGINX Plus，优先分配给响应时间最短的服务器。

```bash
upstream balanceServer {
    fair;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

#### 客户端 ip 绑定

来自同一个 ip 的请求永远只分配一台服务器，有效解决了动态网页存在的 session 共享问题。

```bash
upstream balanceServer {
    ip_hash;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

## 静态资源服务器

```bash
location ~* \.(png|gif|jpg|jpeg)$ {
    root    /root/static/;
    autoindex on;
    access_log  off;
    expires     10h;# 设置过期时间为10小时
}
```

匹配以 `png|gif|jpg|jpeg` 为结尾的请求，并将请求转发到本地路径，`root` 中指定的路径即 `nginx` 本地路径。同时也可以进行一些缓存的设置。

## 参考

- [前端开发者必备的 Nginx 知识](https://juejin.cn/post/6844903793918738440)
