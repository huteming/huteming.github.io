## X-Frame-Options

这个响应头是用来是否允许网页通过 iframe 元素嵌套的，它有三个值

- **deny**

禁止，不允许任何网页嵌套，包括是同源的域名也不可以。

- **sameorigin**

只允许同源的域名访问

比如 `https://test.aaa.com/abc` 嵌套 `https://test.aaa.com/test` 的网页，同源，允许嵌套

比如 `https://test.aaa.com/abc` 嵌套 `https://cp3.abc.com/test` 的网页，不同源，不可以嵌套

- **allow-from url**

允许 url 的域名可以嵌套，多个可以逗号隔开，比如 `allow-from http://aaa.com`, 允许 `http://aaa.com` 嵌套本网页。

## Content-Security-Policy

"Content-Security-Policy": "frame-ancestors 'self'"
