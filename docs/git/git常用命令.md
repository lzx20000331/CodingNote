---
outline: deep
--- 

# Git 介绍

Git 是一个**免费的开源分布式版本控制系统**，旨在快速高效地处理从小型到超大型项目的所有项目。

Git 易于学习，占用空间小，性能快如闪电。它优于 Subversion、CVS、Perforce 和 ClearCase 等 SCM 工具，具有廉价的本地分支、方便的暂存区域和多个工作流程等功能。

## 版本控制工具

版本控制是一种记录文件内容变化，

### 分布式版本控制工具

123

### 集中式版本控制工具

123

## Git 工作原理

#### 三种状态

现在请注意，如果你希望后面的学习更顺利，请记住下面这些关于 Git 的概念。 Git 有三种状态，你的文件可能处于其中之一： **已提交（committed）**、**已修改（modified）** 和 **已暂存（staged）**。

- 已修改表示修改了文件，但还没保存到数据库中。
- 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
- 已提交表示数据已经安全地保存在本地数据库中。

这会让我们的 Git 项目拥有三个阶段：工作区、暂存区以及 Git 目录。

![工作区、暂存区以及 Git 目录。](https://git-scm.com/book/en/v2/images/areas.png) 工作区是对项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。

暂存区是一个文件，保存了下次将要提交的文件列表信息，一般在 Git 仓库目录中。 按照 Git 的术语叫做"索引"，不过一般说法还是叫"暂存区"。

Git 仓库目录是 Git 用来保存项目的元数据和对象数据库的地方。 这是 Git 中最重要的部分，从其它计算机克隆仓库时，复制的就是这里的数据。

## 常用命令

### 全局配置文件

查看 git 全局配置文件

```shell
git config --list
```

修改全局配置文件

```shell
git config --global --edit
```

编辑 git 配置文件:

```shell
$ git config -e    ## 针对当前仓库
```

或者：

```shell
$ git config -e --global   ## 针对系统上所有仓库
```

设置提交代码时的用户信息：

```shell
git config --global user.name "runoob"
git config --global user.email "test@runoob.com"
```

如果去掉 **--global** 参数只对当前仓库有效。

### 本地仓库常用命令

创建本地仓库

新建一个文件夹/项目

```shell
mkdir myproject
```

初始化本地仓库

```shell
git init
```

添加到暂存区

```shell
git add
```

> 将工作区的内容添加到暂存区

添加一个或多个文件到暂存区：

```shell
git add [file1] [file2] ...
```

添加指定目录到暂存区，包括子目录：

```shell
git add [dir]
```

添加当前目录下的所有文件到暂存区：

```shell
git add .
```

提交到本地库

git commit

> 将暂存区的内容提交到本地仓库

将暂存区的所有内容提交到本地仓库

```shell
git commit -m [message]
```

将暂存区的指定文件提交到本地仓库

```
git commit [file1] [file2] ... -m [message]
```

远程库

显示所有远程仓库：

```shell
git remote -v
```

显示某个远程库的信息

```shell
git remote show [remote]
```

查看远程库地址

```shell
git remote get-url origin
```

修改远程库地址

```shell
git remote set-url [remote] [url]
```

添加远程库

```shell
git remote add [name] [url]
```

修改远程库命名

```shell
git remote rename [old_name] [new_name]
```

删除远程库

```shell
git remote rm [name]
```

拷贝远程仓库

> 拷贝一个 Git 仓库到本地，让自己能够查看该项目，或者进行修改。

```shell
git clone [url] [alias]
```

url: 远程仓库地址，必选

alias：项目别名，可选

从远程库拉取

将本地库推送到远程库并合并之前需要先拉取远程库

```shell
git fetch [remote]
```

合并远程库 branch 分支到本地当前分支上

```shell
git merge [alias]/[branch]
```

git pull 是 git fetch 和 git merge 的简写，即拉取远程库后和本地分支合并

```shell
git pull <远程主机名> <远程分支名>:<本地分支名>
```

若<远程分支名>=<本地分支名>

```shell
git pull <远程主机名> <远程分支名>
```

### 推送到远程库

**git push** 命令用于从将本地的分支版本上传到远程并合并。

命令格式如下：

```shell
git push <远程主机名> <本地分支名>:<远程分支名>
```

如果本地分支名与远程分支名相同，则可以省略冒号：

```shell
git push <远程主机名> <本地分支名>
```

如果本地版本与远程版本有差异，但又要强制推送可以使用 --force 参数：

```shell
git push --force <远程主机名> <本地分支名>
$ git push git-demo master
Enumerating objects: 6, done.
Counting objects: 100% (6/6), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (6/6), 442 bytes | 110.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/lzx-stl/git-demo.git
 * [new branch]      master -> master
```

## 本地版本管理

### 查看差异

git status

> 查看仓库当前的状态，显示有变更的文件。

git diff

> 比较暂存区和工作区的文件的差异。

### 版本回退

##

git reset

> 回退版本

```shell
git reset
```

git rm

将文件从暂存区和工作区中删除。

```shell
git remote add [name] [url]
git remote rm [name]
```

git fetch

```shell
git fetch [remote_name]
```

将远程库的[branch]分支与本地当前分支合并

```shell
git merge [remote_name] / [branch]
```

推送到远程库

```shell
git pull <远程主机名> <远程分支名>:<本地分支名>
```

## Git 分支管理

![image-20220814225634097](assets/image-20220814225634097.png)

### 创建新分支

```shell
git branch [branchname]
```

### 打印分支列表

```shell
git branch
```

带\*的为当前分支

### 切换分支

切换当前分支到[branchname]

```shell
git checkout [branchname]
git switch [branchname]
```

创建新分支并切换到新分支

```shell
git checkout -b [new branchname]
git switch -c [new branchname]
```

### 删除分支

```shell
git branch -d [branchname]
```

### 合并分支

将指定分支合并到当前分支

```shell
git merge [branchname]
```

## 查看提交历史

```shell
git log
```

## github

## ERROR

refusing to merge unrelated histories

```shell
git merge [alias]/[branch] --allow-unrelated-histories
```

#
