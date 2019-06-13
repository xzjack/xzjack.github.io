---
title: 配置Linux web环境
date: 2019-03-12 09:43:47
categories: 开发环境搭建
tags: [Linux,JDK,Tomcat,MySQL,Redis]
---

** Linux版本说明 **
CentOS下载地址: https://www.centos.org/download/
需要VPN，下载DVD版的就好了
```
[root@localhost ~]# cat /etc/redhat-release 
CentOS Linux release 7.6.1810 (Core) 
```
<!--more-->
<br />
# 配置JDK环境
&emsp;&emsp;&emsp;在Xshell 6上通过Xftp 6将本地的jdk文件[jdk-8u131-linux-x64.tar.gz]上传到本地CentOS中[/usr/local/src/Java]
**1、解压到当前目录（当然也可以解压到指定目录 -C /xxx/xxx）**
```
[root@localhost Java]# pwd
/usr/local/src/Java
[root@localhost Java]# tar -xvf jdk-8u131-linux-x64.tar.gz 
...
[root@localhost Java]# ls
jdk1.8.0_131  jdk-8u131-linux-x64.tar.gz
```
**2、配置环境变量**
vi /etc/profile
添加如下内容
export JAVA_HOME=/usr/local/src/Java/jdk1.8.0_131
export PATH=$JAVA_HOME/bin:$PATH
配置完后刷新
source /etc/profile
测试
java -version
<br />
# 配置Tomcat环境
上传解压，当然tomcat目录需要提前创建好
`tar -xvf apache-tomcat-8.5.16.tar.gz -C tomcat/`
然后可以进入解压的tomcat目录下的bin目录，查看版本信息
`./version.sh `
<br />
# 配置MySQL环境
去MySQL官网下载：https://dev.mysql.com/downloads/mysql/
展示在首页的是最新版的，本文以5.6版本的安装为例子
操作系统选择：Linux - Generic 通用版，然后选择64位的
1. **上传解压（上传的目录最好是/usr/local本地软件目录）**
`tar -xvf mysql-5.6.44-linux-glibc2.12-x86_64.tar.gz`
2. **删除压缩包，并重命名解压后的文件夹**
```
[root@localhost src]# rm -f mysql-5.6.44-linux-glibc2.12-x86_64.tar.gz 
[root@localhost src]# mv mysql-5.6.44-linux-glibc2.12-x86_64/ mysql
```
3. **创建mysql用户组及用户**
可以先检查一下是否有mysql用户组及用户
```
[root@localhost src]# groups mysql
groups: mysql: no such user

[root@localhost src]# groupadd mysql
[root@localhost src]# useradd -r -g mysql mysql
[root@localhost src]# groups mysql
mysql : mysql
```
	
4. **安装数据库**
- 进入mysql安装目录：cd mysql/
- 修改目录拥有者为mysql用户：chown -R mysql:mysql ./
- 安装数据库：./scripts/mysql_install_db --user=mysql
提示：`-bash: ./scripts/mysql_install_db: /usr/bin/perl: 坏的解释器: 没有那个文件或目录`
解决办法（安装perl跟perl-devel即可）: 执行  yum -y install perl perl-devel
然后再次执行，又报错`FATAL ERROR: please install the following Perl modules before executing ./scripts/mysql_install_db:
Data::Dumper`
解决办法（安装autoconf库）：执行 yum -y install autoconf
再次执行，终于OK了！！！
- 修改当前目录拥有者为root用户：chown -R root:root ./
- 修改当前data目录拥有者为mysql用户：chown -R mysql:mysql data

5. **启动mysql服务并添加开机启动**
添加开机启动：执行命令cp support-files/mysql.server /etc/init.d/mysql，把启动脚本放到开机初始化目录
启动mysql服务：执行命令service mysql start
报错了...
```
/etc/init.d/mysql: line 244: my_print_defaults: command not found
/etc/init.d/mysql: line 264: cd: /usr/local/mysql: No such file or directory
Starting MySQL ERROR! Couldn't find MySQL server (/usr/local/mysql/bin/mysqld_safe)
```
	解决方法：find / -name mysql 删除有关mysql的东西 并且删除/etc/my.cnf*，接着再按流程走一遍[第一次我是安装在/usr/local/src目录下的，这次安装在/usr/local目录下]
<span id="inline-red">找到真正原因了！！！</span>
启动mysql服务找不到/usr/local/mysql目录的错误，原因是在mysql/support-files/mysql.server中，有如下代码：
```
mysqld_pid_file_path=
if test -z "$basedir"
then
  basedir=/usr/local/mysql
  bindir=/usr/local/mysql/bin
  if test -z "$datadir"
  then
    datadir=/usr/local/mysql/data
  fi
  sbindir=/usr/local/mysql/bin
  libexecdir=/usr/local/mysql/bin
else
  bindir="$basedir/bin"
  if test -z "$datadir"
  then
    datadir="$basedir/data"
  fi
  sbindir="$basedir/sbin"
  libexecdir="$basedir/libexec"
fi
```
	可以看到，/usr/local/mysql目录是它的默认安装目录
此时，我们不可以更改这里的代码，我们可以将/usr/local/mysql链接到/usr/local/src/mysql，具体做法如下：
步骤一：创建/etc/my.cnf文件，里面包含basedir目录设定
```
cd /usr/local/src/mysql/support-files
cp my-medium.cnf my.cnf
cd /etc
ln -s /usr/local/src/mysql/support-files/my.cnf
vi my.cnf

[mysqld]
......
basedir=/usr/local/src/mysql
```
	步骤二：将mysql目录下的bin/my_print_defaults链接到/usr/bin目录下
```
cd /usr/bin
ln -s /usr/local/src/mysql/bin/my_print_defaults
```
	参考链接：https://blog.51cto.com/13687553/2156898
6. **修改mysql的root密码**
在安装目录下：
./bin/mysqladmin -u root password '密码'

7. **把mysql客户端放到默认路径**
ln -s /usr/local/src/mysql/bin/mysql /usr/local/bin/mysql

8. **mysql -uroot -p测试**


<span id="inline-purple">这么看来，通过rpm的方式安装，要轻松的多啊</span>









