---
tags: [html]
image: https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/0d0e851dfeb4b5754c0db81529fe7d2a?_a=AQAEufR
---

**为什么需要 access token 和 refresh token？**

从权限上说，`refresh token` 是和授权服务器之间的凭证, `access token` 是和资源服务器之间的凭证。

现代架构之所以用 token ，是因为后端普遍采用分布式，各服务器之间同步状态（比如 session ）的开销很大，所以干脆不用状态，而是给个 token ，后端各自验证 token 的有效性而无需与其他服务器沟通，这就是所谓的 stateless 。

stateless 在绝大多数时候都没问题，但我们却不太可能实现彻底的无状态。比如用户修改了密码，服务端想强制他重新登录，这就得通知各个服务器不要再接受之前的 token 了。

要解决这个问题，常见的有 3 种方法：

1. 找个地方（内存、数据库等）记录合法的 token ，每次验证 token 都查一下这个 token 是否还在。
2. 找个地方（内存、数据库等）记录 token 的黑名单，每次验证 token 都查一下这个 token 是否在黑名单里。
3. 让 token 自己失效。

前两种都是有状态的方法，仍然避免不了状态同步的瓶颈，所以我们一般采用第三种方法。

那怎么让 token 自己失效呢？ token 里一般都有时间信息，所以只需把有效期设得短一点，不再更新它，它就过期失效了。

这就引出了更新的问题，怎么更新 token 呢？我们一般用另一个 token ，这就是所谓的 refresh token 。服务端收到 refresh token 以后，是要检查黑名单或者白名单的，所以更新 token 这一步是有状态的。只有 refresh token 有效，才会下发 access token ，这样就把对状态同步的需求限制到了一个很小的范围内，从而降低状态同步成本。

## 参考

- [关于 token 过期的疑惑，为什么需要 refresh token？](https://v2ex.com/t/820927)
