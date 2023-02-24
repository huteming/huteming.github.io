## 场景

代码有很多次提交，已经 push 到远程仓库，但是中间有几个 commit 违反了规定，需要修改(或者删除，新增)一些提交内容。

## 实现

### 新建仓库

1. 第一个 commit（commitid = xx1）

创建两个目录 a b，a 下新建文件 a.txt, b 下新建文件 b.txt

2. 第二个 commit（commitid = xx2）

修改 a/a.txt

3. 第三个 commit（commitid = xx3）

修改 b/b.txt

4. 第四个 commit（commitid = xx4）

同时修改 a/a.txt b/b.txt

### 需求

需要删除 第一次提交中的 整个 b 目录

### 操作步骤

1. git rebase -i xx1~ 
- 波浪号的作用是 rebase 从此 commitid 开始进行 rebase，否则从指定 commitid 的下一个 commitid 进行 rebase

2. 进入 vi 编辑模式，修改所有相关的 commit id 的命令为 edit，wq 保存

3. 像平时修改代码一样删除 b 目录

4. 添加到暂存区 git add .

5. 提交修改 git commit --amend

6. git rebase --continue。
- 继续进行 rebase。 注意我们整个场景，因为后面的 commit 也对 b 进行的修改，每次 rebae continue 之后都要看是否存在 b 如果存在 重复 3-6 的步骤，直到所有提交修改完成

7. rebase 结束之后，命令行会有提示，git push -f 覆盖远程分支即可
