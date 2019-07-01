---
title: Git基本命令
date: 2019-02-28 07:02:16
categories: 开发工具
tags: Git
---
## 安装 ##
Linux 
&emsp;Redhat系列：`$ sudo yum install git`
&emsp;Debian系列：`$ sudo apt-get install git`
Windows
https://git-scm.com/download/win

安装完后右键就能使用Git Bash了，可以`git version`查看版本
<!--more-->
## 用户信息配置 ##
```
$ git config --global user.name "xzjack" 
$ git config --global user.email zjie1one@gmail.com
```

## 使用 ##
![](Git基本命令/15323410401964.png)

- **初始化一个Git仓库**
`$ git init`<br/>

- **添加文件到暂存区**
`$ git add <file>`<br/>

- **添加到版本库**
`$ git commit -m "description"`<br/>

- **查看工作区状态**
`$ git status`<br/>

- **查看修改后的差异**
```
$ git diff  # 不加参数即默认比较工作区与暂存区
$ git diff <branch1>  # 在master分支下执行，就代表比较master分支与branch1分支的差异
```
	详见：https://www.cnblogs.com/qianqiannian/p/6010219.html<br/>


- **查看提交日志**
`$ git log`<br/>

- **丢弃工作区的修改**
`$ git checkout -- <file>`

- **丢弃暂存区的修改**
```txt
分两步：
第一步：把暂存区的修改撤销，重新放回工作区
$ git reset HEAD <file>
第二步：撤销工作区的修改
$ git checkout -- <file>
```

- **版本回退**：假如已经提交到版本库了，但是没提交到远程库
`$ git reset --hard HEAD^`
以上命令是返回上一个版本，在Git中，用HEAD表示当前版本，上一个版本就是HEAD^，上上一个版本是HEAD^^，往上100个版本写成HEAD~100。
回退指定版本号：
`$ git reset --hard commit_id`<br/>
- **删除文件**
`$ git rm <file>`
相当于执行
```
$ rm <file>
$ git add <file>
```
- **删除恢复**
```
Q：比如执行了rm text.txt 误删了怎么恢复？
A：执行git checkout -- text.txt 把版本库的东西重新写回工作区就行了
Q：如果执行了git rm text.txt我们会发现工作区的text.txt也删除了，怎么恢复？
A：先撤销暂存区修改，重新放回工作区，然后再从版本库写回到工作区
1. $ git reset head text.txt
2. $ git checkout -- text.txt

Q：假如执行git commit -m "delete text.txt" 删除且提交了，怎么办？
A：版本回退吧！
```

## 远程仓库 ##
- 创建SSH Key
[如何搭建个人博客？](https://enum.top/2018/11/14/%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/)这篇文章里有讲

- **提交到远程仓库**
`$ git push origin master  # 可以把 master 换成你想要推送的任何分支`
此时，如果你的仓库不是clone下来的（clone下来的直接关联远程仓库），并且没有配置远程仓库，那么是不行的
`查看已配置的远程服务器 git remote / git remote -v  都没有相应的输出`
所以需要关联远程仓库
```
$ git remote add origin <server>

假如一不小心关联了错误的远程仓库，那么也能删除
$ git remote rm origin
删除后再次添加就好了
```
	当然喽，没有关联远程仓库也可以这么提交，但是谁会这么麻烦去做呢？
`git push git@github.com:xzjack/test.git`
**注意：所有对远程仓库的操作，都需要先在远程仓库建好仓库，取到仓库地址**<br/>
- **克隆**
```
$ git clone git@github.com:xzjack/test.git 文件名  # 默认以远程库名命名，也可以自己指定

//如果想克隆分支
$ git clone -b 分支名 git@github.com:xzjack/test.git 文件名
```

## 分支 ##
- **创建分支**
`$ git branch <branch name>`
- **切换分支**
`$ git checkout <branch name>`
- **创建+切换分支**
`$ git checkout -b <branch name>`
- **查看分支**
`$ git branch`
- **删除分支**
```
$ git branch -d <branch name>  #删除本地
$ git push origin --delete <branch name>  #删除远端分支
```
- **重命名分支**
`$ git branch -m newname`

- **分支合并**
创建分支（branch1）后，我们可以在分支上为所欲为，并不会影响到master分支
在分支上开发完成后，git commit -m "message"提交
然后切换回master分支
查看内容，发现开发的东西都不见了，因为那个提交是在分支上，而master分支此刻的提交点并没有变
现在将branch1分支的工作成果合并到master分支上
`$ git merge branch1`
合并完后可以选择删除branch1分支，这和直接在master分支上工作效果是一样的，但过程更安全。

- **分支更新**
`$ git pull <远程主机名> <远程分支名>:<本地分支名>`
本地仓库至最新改动，git pull相当于在你的工作目录中 获取（fetch） 并合并（merge） 远端的改动
一般会提示你这样：
```
$ git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> master
```
	这就是说你本地分支和远程分支没有建立关联
那就按照提示建立关联
`$ git branch --set-upstream-to=origin/master`
或者这样也行
`$ git pull origin master # 远程分支master与当前分支合并`

- **本地分支提交到远程分支**
开分支两种方式：
1.远程先开好分支然后拉到本地
`$ git checkout -b feature-branch origin/feature-branch  //检出远程的feature-branch分支到本地`
2.本地先开好分支然后推送到远程
```
$ git checkout -b feature-branch //创建并切换到分支feature-branch 
$ git push origin feature-branch:feature-branch //推送本地的feature-branch分支到远程origin的feature-branch分支(没有会自动创建)
```

	<br/>假如在远程创建了分支，本地通过git checkout -b &lt;branch name&gt;创建并切换分支
那么首先需要先关联
`$ git remote add origin git@github.com:xzjack/xxx.git`
然后将分支上传到远程分支
`$ git push origin feature-branch`
此时可能有冲突
那么一种方法就是(不提倡，应该与冲突文件修改者商讨)
`$ git push -f origin feature-branch  # 本地强制上传到远程，把远程的覆盖`

<br/>
未完待续 。。。