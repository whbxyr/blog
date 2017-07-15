# My Blog
This is a blog designed by myself.
## 技术栈
```
  html + css + js + thinkPHP + mysql
```
## 开发环境
```
  wampserver 2.5
  Apache 2.4.9
  thinkPHP 5.0.3
  mysql 5.6.17
  开发系统 windows10
  开发工具 sublime text 3
```
## 实现功能
```
  1.前台：
    （1）可以实现用户注册，注册后的用户拥有评论文章的权限
    （2）无用户注册则默认为游客登录状态，无评论权限
  2.后台：
    （1）实现管理员登陆，管理员分两类，一类为超级管理员，有且只有一位，另一类为普通管理员
    （2）超级管理员拥有所有权限，包括编辑、修改、删除、预览文章，以及管理普通管理员、管理前台用户及其评论、访问历史
    （2）普通管理员只能编辑新文章、预览文章，修改、删除自己的文章
```
## 运行
```
  1.下载并安装wampserver 2.5，在www目录下执行 git clone https://github.com/whbxyr/blog
  2.开启wampserver，将blog.sql数据库文件导入数据库（需提前在www/blog/database.php中设置数据库的主机、账号、密码等）
  3.打开浏览器，访问http://localhost/public/ 访问前台文章网页（用户需要登录）
  4.打开浏览器，访问http://localhost/public/index.php/manager 访问后台管理员页面（需要登录）
```
## 心得
```
  通过实现自己的个人博客，对网站的前后端开发有了一个全新的认识，熟悉了前后端联合开发的方法，同时也了解了数据库的设计方法
```
