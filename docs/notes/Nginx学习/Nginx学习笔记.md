# Nginx 学习笔记

## 背景
Nginx(“engine x")一个具有高性能的【HTTP】和【反向代理】的【WEB服务器】，同时也是一个【POP3/SMTP/IMAP代理服务器】，是由伊戈尔·赛索耶(俄罗斯人)使用C语言编写的，Nginx的第一个版本是2004年10月4号发布的0.1.0版本。另外值得一提的是伊戈尔赛索耶夫将Nginx的源码进行了开源，这也为Nginx的发展提供了良好的保障。

## 名词解释
- web服务器： 网页服务器，web server。
- http ： 超文本传输协议。客户端和服务端请求和应答的标准。
- pop3、smtp、imap： 
    + POP3(Post Offic Protocol 3)邮局协议的第三个版本
    + SMTP(Simple Mail Transfer Protocol)简单邮件传输协议,
    + IMAP(Internet Mail Access Protocol)交互式邮件存取协议通过上述名词的解释，我们可以了解到Nginx也可以作为电子邮件代理服务器
- 反向代理
- 正向代理

## Nginx优点
1. 速度更快，并发更高
2. 配置简单、扩展性强
3. 高可靠性
4. 热部署
5. 成本低、bsd许可证

## 常用基本功能

1. 静态资源部署
2. rewrite 地址重写
    + 正则表达式
3. 反向代理的配置
4. 负载均衡
    + 轮询、加权轮询、ip_hash、url_hash、fair
5. web缓存
6. 环境部署
7. 用户认证模块...

Nginx核心组成：

    + ngnix二进制可执行文件
    + ngnix.config 配置文件
    + error.log 错误的日志记录
    + access.log 访问日志记录

## Nginx 环境准备
nginx官方下载网址：<a href='http://nginx.org/en/download.html'>http://nginx.org/en/download.html</a>

+ VMware WorkStation
+ Centos7
+ MobaXterm
+ 网络