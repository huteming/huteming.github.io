## 前置知识

### SSO

SSO 是英文 Single Sign On 的缩写，翻译过来就是单点登录。顾名思义，它把两个及以上个产品中的用户登录逻辑抽离出来，达到只输入一次用户名密码，就能同时登录多个产品的效果。

### CAS

CAS （Central Authentication Service）中心授权服务.

CAS Server 为需要独立部署的 Web 应用。

SSO 仅仅是一种架构，一种设计，而 CAS 则是实现 SSO 的一种手段。两者是抽象与具体的关系。当然，除了 CAS 之外，实现 SSO 还有其他手段，比如简单的 cookie。

## 时序图

![CAS访问时序图](/img/cas/sequence.png)

## 参考

- [前端需要了解的 SSO 与 CAS 知识](https://juejin.cn/post/6844903509272297480?searchId=202310240951579581C1DAFF0D3FD6AD65)
