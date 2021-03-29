---
title: 和为k的子数组
summary: 每日算法之和为k的子数组
date: 2020-05-15
---

## 题目

给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。

### 示例

示例 1 :

```
输入:nums = [1,1,1], k = 2
输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
```

## 题解

### 思路

用一个数学表示的等式来说明可能更形象一些：

假设这个连续数组是 i 起始，j 结束的数组，写成这样 [i, j]，同时用 pre[x] 来表示数组中下标 0~x 所有数的和，那么 i 和 j 一定存在这样的关系：

```
pre[j] - pre[i - 1] = k
```

利用这条等式，就可以用这样的方式来求出和为k的连续子数组个数：

1. 用一个map来保存计算过的数组的和，以和为key，这个和出现次数为value。注意：因为等式中我们需要的是 i-1 的和，所以初始化时需要先给一个和为0的key

2. 遍历数组，记录 0~当前下标 所有数的和 pre

3. 如果 pre - k（也就是上面公式中的 pre[j] - k）在 map 中存在，意味着之前出现过 pre[i - 1]，则满足条件子数组个数＋1

4. 直到数组遍历结束，返回满足条件子数组个数

### 代码实现

```js
function subarraySum (nums, k) {
  const map = new Map([
    [0, 1]
  ])
  let pre = 0
  let count = 0
  nums.forEach(num => {
    pre += num
    // 个数统计必须在pre添加到map之前
    if (map.has(pre - k)) {
      count += map.get(pre - k)
    }

    if (map.has(pre)) {
      map.set(pre, map.get(pre) + 1)
    } else {
      map.set(pre, 1)
    }
  })

  return count
}
```
