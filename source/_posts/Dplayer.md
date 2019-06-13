---
title: DPlayer
date: 2019-02-19 14:38:08
categories: hexo
tags: 
	- DPlayer
	- hexo
---
Hexo插入视频的方式---->
1. 可以在各大视频网站，分享外链的方式插入文章
2. 也可以使用H5视频播放器DPlayer
安装hexo插件
`npm install hexo-tag-dplayer --save`
使用
```md
{% dplayer "url=视频地址.mp4" "pic=缩略图.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}
```
<!--more-->
插件使用指南：https://github.com/MoePlayer/hexo-tag-dplayer

因视频文件比较大，故将其存储于[catbox](https://catbox.moe/)，之前打算将视频文件放到七牛云上，但是视频这种东西流量是在太大了，免费的10G流量很快就会耗光，所以选择了catbox(其实还挺好用的🙃)
{% dplayer "url=https://files.catbox.moe/8bni2p.mp4" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}
