---
tags: [nodejs]
---

nodejs 在 [v18.11.0](https://nodejs.org/en/blog/release/v18.11.0/) 新增了 `--watch` 模式。

**注意这只是试验性质的**

```bash
nvm use v18.11.0

node --watch main.js
  (node:36224) ExperimentalWarning: Watch mode is an experimental feature.
  This feature could change at any time
  (Use `node --trace-warnings ...` to show where the warning was created)
```

其他开启监听模式的方法

- [nodemon](https://nodemon.io/) for development

- [pm2](https://pm2.keymetrics.io/) for production
