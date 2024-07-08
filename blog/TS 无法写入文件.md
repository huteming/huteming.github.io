---
image: https://img.colorhub.me/GO_g7MoOL78/rs:auto:0:500:0/g:ce/fn:colorhub/bG9jYWw6Ly8vMTYvZWYvN2NlYzY2Y2YyZjA5Y2I3NWE1OWFhMThiNDE2OTJkYTEzMGY0MTZlZi5qcGVn.webp
tags: [TS]
date: 2024-05-30
---

tsconfig.json 报错: `无法写错写入文件 ，因为他会覆盖输入文件` 是怎么回事？

这个错误通常是由于 tsconfig.json 中的编译选项配置导致的。

具体来说，这个错误可能是在输出目录与输入文件目录重叠时发生的。

## 输出目录配置错误

如果 `outDir` 未指定，TypeScript 编译器会尝试在同一目录中写入输出文件，从而覆盖输入文件。

参考 [tsconfig.json](https://www.typescriptlang.org/tsconfig/#outDir)。

所以，确保 outDir 指向一个单独的目录（例如 ./dist）。
