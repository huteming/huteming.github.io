**概念**

向浏览器提供一些信息和指示，标明该如何处理文档

**类型**

meta 元素定义的元数据的类型包括以下几种：

- 如果设置了 name 属性，meta 元素提供的是文档级别（document-level）的元数据，应用于整个页面。
- 如果设置了 http-equiv 属性，meta 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
- 如果设置了 charset 属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
- 如果设置了 itemprop 属性，meta 元素提供用户定义的元数据。

**用途**

```html
<meta name="参数" content="具体描述信息" />
```

meta 元素，除了 `charset` 之外，都是 `http-equiv` 或者 `name` 属性结合 `content` 来使用

```html
<head>
  <title>示例</title>
  <meta
    name="keywords"
    content="描述网站内容的关键词，以逗号隔开，用于SEO搜索"
  />
  <meta name="application name" content="当前页所属Web应用系统的名称" />
  <meta name="description" content="当前页的说明" />
  <meta name="author" content="当前页的作者名" />
  <meta name="copyright" content="版权信息" />
  <meta
    name="renderer"
    content="renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面"
  />
  <meta
    name="viewreport"
    content="它提供有关视口初始大小的提示，仅供移动设备使用"
  />
</head>
```

http-equiv

```html
<meta http-equiv="参数" content="具体的描述" />
<!-- content-Type 声明网页字符编码 -->
<meta http-equiv="content-Type" content="text/html charset=UTF-8" />
<!-- refresh 指定一个时间间隔(以秒为单位),在此时间过去之后从服务器重新载入当前页面,也可以另外指定一个页面. -->
<!-- 2秒后在当前页跳转到百度 -->
<meta http-equiv="refresh" content="2;URL=http://www.baidu.com" />
<!-- X-UA-Compatible 浏览器采取何种版本渲染当前页面 -->
<!-- 指定IE和Chrome使用最新版本渲染当前页面 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- catch-control 用于指定所有缓存机制在整个请求/响应链中必须服从的指令 -->
<meta http-equiv="cache-control" content="no-cache" />
```
