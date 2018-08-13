var sqlMap = {
	// 用户的操作
    // user: {
    //     addUser: 'insert into user(`username`,`password`) values ?',		//注册用户
    //     searchUser: 'select * from user where username = ?',				//查找用户
    // },
    // 技术分享
    shares: {
        shareList: 'select * from shares',														                                             //技术分享列表
        addShare: 'insert into shares(`title`,`descs`,`pageimg`,`content`,`createdTime`,`ishome`,`isrecom`) values ?',		                 //添加技术分享
        delShare: 'delete from shares where id = ?',												                                         //删除技术分享
        shareDetail: 'select * from shares where id = ?',		                                                                             //技术分享详情
        updateShare: 'update shares set title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ?,ishome = ?,isrecom = ? where id = ?',	 //修改技术分享
    },
    // 读书笔记
    notes: {
        noteList: 'select * from notes',                                                                                                     //读书笔记列表
        addNote: 'insert into notes(`title`,`author`,`descs`,`pageimg`,`content`,`createdTime`) values ?',                                   //添加读书笔记
        delNote: 'delete from notes where id = ?',                                                                                           //删除读书笔记
        noteDetail: 'select * from notes where id = ?',                                                                                      //读书笔记详情
        updateNote: 'update notes set title = ?,author = ?,descs = ?,pageimg = ?,content = ?,createdTime = ? where id = ?',                  //修改读书笔记
    },
    // 我的日志
    logs: {
        logList: 'select * from logs',                                                                                                       //读书笔记列表
        addLog: 'insert into logs(`title`,`descs`,`pageimg`,`content`,`createdTime`,`ishome`) values ?',                                     //添加读书笔记
        delLog: 'delete from logs where id = ?',                                                                                             //删除读书笔记
        logDetail: 'select * from logs where id = ?',                                                                                        //读书笔记详情
        updateLog: 'update logs set title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ?,ishome = ? where id = ?',                    //修改读书笔记
    },
    // 草稿箱
    drafts: {
        draftList: 'select * from draft',                                                                                                     //读书笔记列表
        addDraft0: 'insert into draft(`group`,`title`,`descs`,`pageimg`,`content`,`createdTime`,`ishome`,`isrecom`) values ?',                //添加草稿（技术分享）
        addDraft1: 'insert into draft(`group`,`title`,`descs`,`pageimg`,`content`,`createdTime`,`author`) values ?',                          //添加草稿（读书笔记）
        addDraft2: 'insert into draft(`group`,`title`,`descs`,`pageimg`,`content`,`createdTime`,`ishome`) values ?',                          //添加草稿（我的日志）
        delDraft: 'delete from draft where id = ?',                                                                                             //删除读书笔记
        draftDetail: 'select * from draft where id = ?',                                                                                        //读书笔记详情
        updateDraft0: 'update draft set group = ?,title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ?,ishome = ?,isrecom = ? where id = ?',                    //修改读书笔记
        updateDraft1: 'update draft set group = ?,title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ?,author = ? where id = ?',                    //修改读书笔记
        updateDraft2: 'update draft set group = ?,title = ?,descs = ?,pageimg = ?,content = ?,createdTime = ?,ishome = ? where id = ?',                    //修改读书笔记
    }
}

module.exports = sqlMap;