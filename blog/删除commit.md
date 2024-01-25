---
tags: [git]
---

如果需要删除的不只是某个文件，而是交错的代码，那么有以下三种方法可以删除 commit 。

## git reset

- git reset ：回滚到某次提交。
- git reset --soft：此次提交之后的修改会被退回到暂存区。
- git reset --hard：此次提交之后的修改不做任何保留，git status 查看工作区是没有记录的。

### 1. 回滚代码

如果需要删除的 commit 是最新的，那么可以通过 git reset 命令将代码回滚到之前某次提交的状态，但一定要将现有的代码做好备份，否则回滚之后这些变动都会消失。具体操作如下：

```bash
# HEAD 就会指向此次的提交记录
git reset --hard commit_id

# 强制推送到远端
git push origin HEAD --force
```

### 2. 误删恢复

如果回滚代码之后发现复制错了 commit_id，或者误删了某次 commit 记录，也可以通过下方代码恢复：

```bash
# 复制要恢复操作的前面的 hash 值
git relog

# 将 hash 换成要恢复的历史记录的 hash 值
git reset --hard hash
```

## git rebase

如果中间的某次 commit 需要删除，可以通过 git rebase 命令实现，方法如下：

```bash
# 将 commit_id 替换成要删除的 前一次 提交的 commit_id
git rebase -i commit_id

进入 Vim 编辑模式，将要删除的 commit 前面的 `pick` 改成 `drop`

保存并退出 Vim
```

## git revert

- get revert: 放弃某次提交。**之前的提交仍会保留在 git log 中，而此次撤销会做为一次新的提交。**

```bash
# 撤销这次提交
git revert commit_id
```
