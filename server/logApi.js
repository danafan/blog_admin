var express = require('express');           
var models = require('./db');             //数据库链接信息
var mysql = require('mysql');               
var $sql = require('./sql');              //sql语句
var path = require('path');
var fs = require('fs');
var UUID = require('uuid');
var formidable = require('formidable');       //上传功能的插件

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var app = express();

// 我的日志列表
app.get('/logList', (req, res) => { 
    var sql = $sql.logs.logList;
    var page = (req.query.page - 1)*5;
    //根据sql语句对数据库进行查询
    conn.query(sql,page,function(err, results) { 
        if (results) {
            let sql1 = 'select count(*) as count from logs';
            conn.query(sql1,function(err, result) { 
                if (result) {
                    var response = JSON.stringify({code:0,total:result[0].count,data: results});
                    res.send(response);
                }
                if (err) {       
                    var response = JSON.stringify({code:1,msg:"日志列表获取失败"});
                    res.send(response);
                }    
            });
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询失败"});
            res.send(response);
        }    
    });
});

// 添加我的日志
app.post('/addLog',(req, res) => { 
    let title = req.body.title;
    let descs = req.body.descs;
    let pageimg = req.body.pageimg;
    let content = req.body.content;
    var createdTime = Date.parse(new Date());
    var values = [[title,descs,pageimg,content,createdTime]];
    var sql = $sql.logs.addLog;
    //根据sql语句对数据库进行插入
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"插入成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"我的日志发表失败"});
            res.send(response);
        }  
    })
});

// 删除我的日志
app.post('/deleteLog',(req, res) => {   
    var id = req.body.id;
    var sql1 = $sql.logs.delLog;
    var sql2 = 'delete from commentary where wid = ' + id;
    var sqls = sql1 + ";" + sql2;
    var values = [[id]];
    //根据sql语句对数据库进行删除
    conn.query(sqls,[values],function(err,result) {   
        if (result) {
            var response = JSON.stringify({code:0,msg:"删除成功"});
            res.send(response);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"删除失败"});
            res.send(response);
        }  
    })
});

// 我的日志详情
app.get('/getLogDetail',(req, res) => {   
    var id = req.query.id;
    var sql = $sql.logs.logDetail;
    var values = [[id]];
    //根据sql语句对数据库进行查询
    conn.query(sql,[values],function(err,result) {   
        if (result) {
            jsonWrite(res, result);
        }
        if (err) {       
            var response = JSON.stringify({code:1,msg:"查询详情失败"});
            res.send(response);
        }  
    })
});

// 修改我的日志
app.post('/updateLog',(req, res) => {   
    var id = req.body.id;                   //id
    var title = req.body.title;             //标题
    var descs = req.body.descs;             //简介
    var pageimg = req.body.pageimg;         //封面图
    var createdTime = Date.parse(new Date());
    var content = req.body.content;         //内容
    var sql = $sql.logs.updateLog;
    var values = [title,descs,pageimg,content,createdTime,id];
    //根据sql语句对数据库进行查询
    conn.query(sql,values,function(err,result) {   
        if (result) {
           var response = JSON.stringify({code:0,msg:"修改成功"});
           res.send(response);
       }
       if (err) {       
        var response = JSON.stringify({code:1,msg:"修改失败"});
        res.send(response);
    }  
})
});

// 请求成功后对返回数据的处理
var jsonWrite = function(res, result) {
    var response = JSON.stringify({code:0,data: result});
    res.send(response);
};

module.exports = app;







