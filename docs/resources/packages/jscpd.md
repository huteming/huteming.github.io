用于统计项目中的重复代码量。仓库: [github](https://github.com/kucherenko/jscpd)

配置文件 `/rootDir/.jscpd.json`

```json
{
  "threshold": 5,
  "reporters": ["html", "console", "badge"],
  "output": "./coverage_jscpd",
  "pattern": "src/**/*",
  "absolute": true,
  "gitignore": true
}
```

package.json 配置命令

```json
{
  "scripts": {
    "jscpd": "jscpd"
  }
}
```
