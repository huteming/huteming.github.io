---
title: 课程表 II
summary: 每日算法之课程表 II
date: 2020-05-17
---

## 题目

现在你总共有 n 门课需要选，记为 0 到 n-1。

在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]

给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。

可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。

### 示例

示例 1:

```
输入: 2, [[1,0]] 
输出: [0,1]
解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
```

示例 2:

```
输入: 4, [[1,0],[2,0],[3,1],[3,2]]
输出: [0,1,2,3] or [0,2,1,3]
解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。
     并且课程 1 和课程 2 都应该排在课程 0 之后。
     因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
```

## 题解

### 思路

> 该题是一个**拓扑排序**的问题。这里只是自己的理解，然后做了一个摘录，[查看完整分析过程](https://leetcode-cn.com/problems/course-schedule-ii/solution/bao-mu-shi-ti-jie-tuo-bu-pai-xu-si-lu-zen-yao-yi-2/)

- 题目的依赖关系，可以转换为数据结构中的树结构，有子树相当于有依赖的先读课程。那么题目要求相当于把这么一个树结构转换成线性结构。

- 解题过程：

1. 先读取树底部入度为0的节点（没有先读课程，可以直接学习）

2. 读取一个节点后，该节点的父节点入度减1，此时可能产生新的入度为0的节点

3. 继续读取入度为0的节点，直到没有可以读取的节点

- 过程中的数据准备

1. 一个保存课程入度的数组，因为需要监控课程入度，当为0时，可以读取。以下标代表课程，值代表入度树。

2. 一个保存依赖关系的map，因为在读取一个节点后，我们需要知道依赖这个节点的父节点，以便减少父节点的入度。以被依赖的课程为key，value是依赖于这个节点（课程）的父节点（课程）数组

3. 一个队列，用来保存当前入度为0，可以读取的节点。

### 代码实现

```js
function findOrder (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0) // 入度表,下标标示课程，值为入度值
  const graph = new Map() // 依赖表,key: 被依赖课程    value：依赖课程数组
  const queue = [] // 入度为0的课程
  const result = [] // 课程排序结果

  // 构建入度表和依赖表
  for (let i = 0; i < prerequisites.length; i++) {
    const course = prerequisites[i][0]
    const depend = prerequisites[i][1]

    inDegree[course]++
    if (!graph.has(depend)) {
      graph.set(depend, [])
    }
    graph.get(depend).push(course)
  }

  // 入度为0的课程先入列
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      queue.push(i)
    }
  }

  // 如果不存在入度为0的课程，代表没有课程可以继续学习，结束循环
  while (queue.length) {
    const course = queue.shift() // 入度为0课程出列
    result.push(course) // 入度为0课程才可以学习，可以入列

    if (graph.has(course)) { // 如果有依赖于这个课程
      const list = graph.get(course) // 找出所有依赖的课程
      list.forEach(item => {
        inDegree[item]-- // 所有依赖课程的入度减1
        if (inDegree[item] <= 0) { // 课程入度为0，入列
          queue.push(item)
        }
      })
    }
  }

  return result.length === numCourses ? result : []
}
```
