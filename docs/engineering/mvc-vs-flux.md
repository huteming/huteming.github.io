## 前言

`React.js` 只是一个用于视图层的类库(lib)，你能把它当作模板引擎来用（React.js 并不是模板引擎），输出 html，定义组件。但是你没法仅用 React.js 类库就搭建一个完整的前端 app。之所以要强调这么一点是因为很多人会拿 React.js 与 Angular 做比较，这是不公平的，因为 angular 的定位是一个框架(framework)。angular 自带模板引擎，路由引擎，有健全的数据双向绑定机制，内置 Ajax 请求功能，还能够定义 Model。而 React.js 类库只能用于定义视图组件。

`React.js` 的另一面是它背后的 flux 架构。但正如上一段所说，React.js 仅依靠自己没法成型一个 flux 框架，基于 React.js 的 flux 框架要么是手动补全了框架中其他角色的代码，要么引入了其他的第三方类库。flux 架构也并非是 React.js 的专利，市面上已经有非常多的独立于 React.js 的开源框架供使用。

## MVC

### MVC 简介

MVC 架构讲程序划分为三个角色，从上到下依次为：

- View: 视图，用户数据展示，同时接受用户输入
- Contorller：响应用户的输入，对数据进行操作，
- Model：负责管理程序需要的数据，并且定义了操作数据的行为。

对于一个简单的 MVC 架构程序来说，其工作流程如下：

![mvc 流程图](/img/mvc-flux/mvc.png)

从最右边的 View 开始，当用户在 UI 上进行操作之后，用户的操作被转发到了 Controller 上，Controller 根据用户的操作对数据进行更新(准确来说是调用 Model 层的 API)，数据更新之后自然视图 View 展现的内容也需要进行更新。Model 层此时可以向所有关联的视图发出通知，收到通知的视图重新获取最新的数据。注意这最后一步 Model 与 View 的交互，大部分现有的 MVC 框架将其进行了封装，开发人员只要使用数据绑定即可。

一段基于 Nodejs 的代码

```js
var Product = require('../models/productModel')

module.exports = function (server) {
  server.get('/', function (req, res) {
    Product.find(function (err, prods) {
      if (err) {
        console.log(err)
      }

      var model = {
        products: prods,
      }

      res.render('index', model)
    })
  })
}
```

为了和 flux 做比较，在这里我们要强调几点：

- 通常 View 和 Controller 的关系是一一对应的，
- controller 是有业务逻辑的。
- Model 应该被更准确的称为 Domain Model(领域模型)，它不代表具体的 Class 或者 Object，也不是单纯的 databse。

### MVC 的局限

上小节单组 MVC(View、Model、Controller 是 1:1:1 的关系)只是一种理想状态。现实中的程序往往是多视图，多模型。更严重的是视图与模型之间还可以是多对多的关系。也就是说，单个视图的数据可以来自多个模型，单个模型更新是需要通知多个视图，用户在视图上的操作可以对多个模型造成影响。可以想象最致命的后果是，视图与模型之间相互更新的死循环。

这样一来，View 与 Model 与 Controller 之间的关系就成一团乱麻了，如下两幅图所示：

![mvc 流程图](/img/mvc-flux/mvc-process-1.png)

![mvc 流程图](/img/mvc-flux/mvc-process-2.png)

**这种双向的数据流架构会产生一定的负面效应**

## Flux

![mvc 流程图](/img/mvc-flux/flux.png)

参照上面的图示，我们首先总结一下，flux 架构下一共有四类模块角色，按照交互顺序依次是：

- Component/View: 你可以把组件(Component)理解为 View 与 Controller 的结合，它既展现数据，同时也处理用户的交互请求。不同于 MVC 的 Controller 直接调用模型层业务逻辑处理接口，flux 上来自用户的操作或者请求最终会映射为对应的 Action，交由 Action 进行下一步处理。另一点需要注意的是 View 同时也监听着 Store 中数据的更改事件，一旦发生更改则重新请求数据。

- Action：描述组件触发的操作，包括名称和数据，比如`{ 'actionType': 'delete', 'data': item}`

- Dispatcher: flux 的中央枢纽(central hub)，所有的 Action 都会交由 Dispatcher 进行处理。Dispatcher 在接收到 Action 之后，调用 Store 注册在 Action 上的回调函数。需要注意与 MVC 中 Controller 不同的是，Dispatcher 是不包含业务逻辑的，它机械的像一座桥，一个路由器，所以它能被别的程序复用当然也能被别的 Dispatcher 替换。

- Store：包含程序的数据与业务逻辑。和 MVC 的 Model 比较，Store 有一些不易被察觉但又非常重要的差异：MVC 中的每一个 model 即对应着一个领域模型；而 flux 中的一个 Store 自己并不是一个领域模型，而是可能包含多个模型。最重要的是，只有 store 自己知道如何修改数据，它并不对外直接提供操作数据的接口(但是提供查询数据的接口)，action 和 dispatcher 没法操作 store.

一个简单的 flux 流程我们可以这么描述：用户在 View 上的操作最终会映射为一类 Action，Action 传递给 Dispatcher，再由 Dispatcher 执行注册在指定 Action 上的回调函数。最终完成对 Store 的操作。如果 Store 中的数据发生了更改，则触发数据更改的事件，View 监听着这些时间，并对这些事件做出反应（比如重新查询数据）。

当有多个 Store 和 View 被添加后，复杂的 flux 流程图如下图所示

![mvc 流程图](/img/mvc-flux/flux-process-1.png)

## 参考文章

- [MVC VS Flux](https://zhuanlan.zhihu.com/p/21324696)
