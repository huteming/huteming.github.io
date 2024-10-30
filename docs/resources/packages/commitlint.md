用于规范 git commit 的 message 格式. [github](https://github.com/conventional-changelog/commitlint)

### 安装 commitlint

[getting started](https://commitlint.js.org/guides/getting-started.html)

需要注意，官方文档中生成配置文件 `commitlint.config.js` 是用 ES6 模块导出，直接运行可能会失败。**此时需要改成 commonJS 格式导出**

### setup husky

还需要利用 husky 来配置 git 的 hook

[Add Hook](https://commitlint.js.org/guides/local-setup.html)

配置完成后，默认可能会有一个 test 命令，不需要的话删掉就好，因为这里我们主要还是用来检查 message 格式。

### 测试

```bash
git commit -m "foo: this will fail"
#  husky > commit-msg
No staged files match any of provided globs.
⧗   input: foo: this will fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```
