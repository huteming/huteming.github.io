HTTP 本身提供一个用于权限控制和认证的通用框架, [MDN HTTP 身份验证](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)

## 通用的 HTTP 认证框架

它是基于[质询—响应认证协议](https://developer.mozilla.org/zh-CN/docs/Glossary/Challenge)的

质询与响应的工作流程如下：

1. 服务器端向客户端返回 401（Unauthorized，未被授权的）响应状态码，并在 `WWW-Authenticate` 响应标头提供如何进行验证的信息，其中至少包含有一种质询方式。
2. 之后，想要使用服务器对自己身份进行验证的客户端，可以通过包含凭据的 `Authorization` 请求标头进行验证。
3. 通常，客户端会向用户显示密码提示，然后发送包含正确的 `Authorization` 标头的请求。

![http-auth-sequence-diagram](/img/http-auth/sequence-diagram.png)

:::caution
这种身份验证方案会对凭据进行编码，但是并不会进行加密。除非信息交换通过安全的连接（HTTPS/TLS），否则这件事极其不安全的。
:::

## WWW-Authenticate

### 语法

```bash
WWW-Authenticate: <auth-scheme> realm=<realm>, challenge1, ...challengeN
```

## 示例

在 express 中一段简单的示例代码

```js
router.get('/auth', function (req, res, next) {
  const authStr = req.get('Authorization') || ''
  const [, data] = authStr.split(' ')

  if (!data) {
    return res
      .set({
        'WWW-Authenticate': 'Basic realm="Access to the staging site"',
      })
      .status(401)
      .end()
  }

  const [username, password] = Buffer.from(data, 'base64').toString('utf-8').split(':')

  if (!username || !password) {
    return res
      .set({
        'WWW-Authenticate': 'Basic realm="Access to the staging site"',
      })
      .status(403)
      .end()
  }

  return res.send('auth success')
})
```

![http-auth-sample](/img/http-auth/example.png)
