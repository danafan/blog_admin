import http from './request.js'
let path = {	
	//login: "login",						//用户登录
	//exit: "exit",							//用户退出
	uploadImg: 'uploadImg',					//上传图片
	getShares:"shareList",					//获取所有技术分享列表
	addShare:"addShare",					//插入技术分享
	getShareDetail:"getShareDetail",		//查看技术分享
	updateShare: "updateShare",				//修改技术分享
	deleteShare:"deleteShare",				//删除技术分享
	getNoteList:"noteList",					//获取所有技读书笔记列表
	addNote:"addNote",						//插入读书笔记
	getNoteDetail:"getNoteDetail",			//查看读书笔记
	updateNote: "updateNote",				//修改读书笔记
	deleteNote:"deleteNote",				//删除读书笔记
	logList: "logList",						//获取所有我的日志列表
	addLog:"addLog",						//插入我的日志
	getLogDetail: "getLogDetail",			//查看我的日志
	updateLog: "updateLog",					//修改我的日志
	deleteLog: "deleteLog",					//删除我的日志
	draftList:"draftList",					//草稿箱列表
	addDraft:"addDraft",					//加入草稿箱
	deleteDraft:"deleteDraft",				//删除草稿
	getDraftDetail: "getDraftDetail",		//草稿箱详情
	updateDraft: "updateDraft",				//修改草稿
}
export default{
	//用户登录
	// login(params){
	// 	return http.post(path.login, params)
	// },
	//用户登录
	// exit(params){
	// 	return http.get(path.exit, params)
	// },
	// 上传图片
	uploadImg(params){
		return http.img(path.uploadImg, params)
	},
	// 查询技术分享列表
	getShares(params){
		return http.get(path.getShares, params)
	},
	// 插入技术分享
	addShare(params){
		return http.post(path.addShare, params)
	},
	// 查看技术分享
	getShareDetail(params){
		return http.get(path.getShareDetail, params)
	},
	//修改技术分享
	updateShare(params){
		return http.post(path.updateShare, params)
	},
	//删除技术分享
	deleteShare(params){
		return http.post(path.deleteShare, params)
	},
	//查询读书笔记列表
	getNoteList(params){
		return http.get(path.getNoteList, params)
	},
	//插入读书笔记
	addNote(params){
		return http.post(path.addNote, params)
	},
	//查看读书笔记
	getNoteDetail(params){
		return http.get(path.getNoteDetail, params)
	},
	//修改读书笔记
	updateNote(params){
		return http.post(path.updateNote, params)
	},
	//删除读书笔记
	deleteNote(params){
		return http.post(path.deleteNote, params)
	},
	//获取所有我的日志列表
	logList(params){
		return http.get(path.logList, params)
	},
	//插入我的笔记
	addLog(params){
		return http.post(path.addLog, params)
	},
	//查看我的日志
	getLogDetail(params){
		return http.get(path.getLogDetail, params)
	},
	//修改我的日志
	updateLog(params){
		return http.post(path.updateLog, params)
	},
	//删除我的日志
	deleteLog(params){
		return http.post(path.deleteLog, params)
	},
	//草稿箱列表
	draftList(params){
		return http.get(path.draftList, params)
	},
	//加入草稿箱
	addDraft(params){
		return http.post(path.addDraft, params)
	},
	//删除草稿
	deleteDraft(params){
		return http.post(path.deleteDraft, params)
	},
	//草稿箱详情
	getDraftDetail(params){
		return http.get(path.getDraftDetail, params)
	},
	//修改草稿
	updateDraft(params){
		return http.post(path.updateDraft, params)
	},
}