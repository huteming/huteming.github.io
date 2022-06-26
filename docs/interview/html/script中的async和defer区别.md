1. `script`: 会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。
2. `async script`: 解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析，且无法保证执行顺序。
3. `defer script`: 不会阻塞 HTML 的解析；实际执行时，会在 DOMContentLoaded 执行之前，由上到下的**依照摆放顺序触发**。
