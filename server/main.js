var express = require('express');
var publicApi = require('./publicApi');
var shareApi = require('./shareApi');
var noteApi = require('./noteApi');
var logApi = require('./logApi');
var draftApi = require('./draftApi');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

const app = express();

// 监听8088端口
var server = app.listen(8089,function () {
  console.log("服务器已连接，访问地址为：localhost:8089");
});   

//express处理post请求参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

// 服务开启后访问指定编译好的dist文件下的数据
app.use(express.static(path.resolve(__dirname, '../dist')));

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






