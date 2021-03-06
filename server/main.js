var express = require('express');
var userApi = require('./userApi');
var publicApi = require('./publicApi');
var noteApi = require('./noteApi');
var logApi = require('./logApi');
var shareApi = require('./shareApi');
var draftApi = require('./draftApi');
var readingApi = require('./readingApi');
var messageApi = require('./messageApi');
var imgApi = require('./imgApi');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

const app = express();

// 监听8089端口
var server = app.listen(8089,function () {
  console.log("服务器已连接，访问地址为：localhost:8089");
});   

app.use(cookieParser('secret'));
// 使用session中间件
app.use(session({
    secret : 'secret',            // 一个String类型的字符串，作为服务器端生成session的签名
    name: "cookieName",           // 这里的name指的是cookie的name，默认cookie的name是：connect.sid
    resave : true,                // 是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true。
    rolling: true,				  // 是否按照原设定的maxAge值重设session同步到cookie中，要保证session有操作的时候必须设置这个属性为true
    saveUninitialized: false,     // 初始化session时是否保存到存储。默认为true，
    cookie : {
        maxAge : 1000 * 60 * 720, // session有效时间，如果停留一个页面12小时不动自动退出，12小时内有接口请求自动顺延
    },
}));

//express处理post请求参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

// 服务开启后访问指定编译好的dist文件下的数据
app.use(express.static(path.resolve(__dirname, '../dist')));

//用户控制器
app.use('/admin', userApi);
//公共控制器
app.use('/admin', publicApi);
// 技术分享控制器
app.use('/admin', shareApi);
// 读书笔记控制器
app.use('/admin', noteApi);
// 我的日志控制器
app.use('/admin', logApi);
// 草稿控制器
app.use('/admin', draftApi);
// 最近在读控制器
app.use('/admin', readingApi);
// 留言控制器
app.use('/admin', messageApi);
// 图片管理控制器
app.use('/admin', imgApi);






