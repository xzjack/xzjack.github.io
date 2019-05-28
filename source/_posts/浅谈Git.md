---
title: 浅谈Git
date: 2019-04-28 07:02:16
categories: 开发工具
tags: Git
---
## 安装 ##
Linux 
Redhat系列： 
`$ sudo yum install git`
Debian系列：
`$ sudo apt-get install git`

Windows
https://git-scm.com/download/win

安装完后右键就能使用Git Bash了，可以`git version`查看版本

## 用户信息配置 ##
```
$ git config --global user.name "xzjack" 
$ git config --global user.email zjie1one@gmail.com
```

## 使用 ##
![](浅谈Git/15323410401964.png)
**初始化一个Git仓库**
`$ git init`
**添加文件到暂存区**
`$ git add <file>`
**添加到版本库**
`$ git commit -m "description"`