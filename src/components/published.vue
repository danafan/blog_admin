<template>
	<div>
		<div class="topBox">
			<div class="left">
				<div class="typeBox">
					<div class="title" :class="{'selTitle':seltab == 0}" @click="seltab = 0">技术分享</div>
					<div class="title" :class="{'selTitle':seltab == 1}" @click="seltab = 1">读书笔记</div>
					<div class="title" :class="{'selTitle':seltab == 2}" @click="seltab = 2">我的日志</div>
				</div>
			</div>
			<div class="right">
				<!-- 列表 -->
				<div class="listBox">
					<div class="logItem" v-for="item in list" @click="getDetail(item.id)">
						<div class="icon"><img :src="baseUrl + item.pageimg"></div>
						<div class="content">
							<div>
								<div class="title">{{item.title}}</div>
								<div class="desc">{{item.descs}}</div>
							</div>
							<div class="info">
								<div class="time">发表时间：{{item.createdTime | updateTime}}</div>
								<div class="zhan">
									<div class="look">
										<div class="shu">{{item.browse}}</div>
										<img src="../assets/eyes.png">
									</div>
									<div class="zan">
										<div class="shu">{{item.point}}</div>
										<img src="../assets/zan.png">
									</div>
									<div class="delete" @click.stop @click="deleteItem(item.id)">
										<img src="../assets/detele.png">
										<div class="shu">删除</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pages">
			<el-pagination
			background
			layout="prev, pager, next"
			:page-count="totalPages"
			:pager-count="5"
			@current-change = "currentChange">
		</el-pagination>
	</div>
	<!-- 详情弹框 -->
	<div class="model" v-if="isDetail == true">
		<img class="close" src="../assets/close.png" @click="isDetail = false">
		<contents :type = "seltab" :status="isPage" :contentObj="obj" @callback="callback"></contents>
	</div>
</div>
</template>
<style lang="less" scoped>
.topBox{
	margin: .2rem auto .2rem;
	width: 98%;
	display:flex;
	.left{
		width: 18%;
		.typeBox{
			border-radius: .08rem;
			background-color: rgba(20, 30, 48, 0.96);
			box-shadow: 3px 3px 6px 0px rgba(20, 30, 48, .6);
			width: 95%;
			height: 2rem;
			display:flex;
			flex-direction: column;
			justify-content:space-around;
			.title{
				width: 100%;
				text-align: center;
				font-size: 16px;
				color: #fff;
			}
			.title:hover{
				color: #38A1F3;
			}
			.selTitle{
				color: #38A1F3;
			}
		}
	}
	.right{
		width: 82%;
		// 原创和私密
		.listBox{
			margin: 0 auto;
			width: 98%;
			border: 1px solid #f4f4f4;
			border-radius: .08rem;
			display:flex;
			flex-direction: column;
			align-items: center;
			padding-top: .2rem;
			padding-bottom: .2rem;
			// 某一条
			.logItem{
				margin-bottom: .2rem;
				border-bottom: 1px solid #f4f4f4;
				height: 1.6rem;
				width: 96%;
				display:flex;
				.icon{
					margin-right: .1rem;
					border-radius: .1rem;
					width: 2.2rem;
					height: 1.4rem;
					overflow: hidden;
					img{
						border-radius: .1rem;
						width: 100%;
						height: 100%;
						cursor: pointer;
						transition: all 0.6s;
					}
					img:hover{
						transform: scale(1.1);
					}
				}
				.content{
					height: 1.4rem;
					padding-top: .08rem; 
					padding-bottom: .1rem; 
					display:flex;
					flex-direction: column;
					justify-content:space-between;
					flex: 1;
					.title{
						width: 100%;
						font-size: 16px;
						color: #333;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.title:hover{
						color: #38A1F3;
					};
					.desc{
						margin-top: .1rem;
						width: 100%;
						font-size: 13px;
						color: #666;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
					.desc:hover{
						color: #38A1F3;
					}
					.info{
						width: 100%;
						font-size: 13px;
						color: #666;
						display:flex;
						justify-content: space-between;
						align-items: center;
						.zhan{
							display:flex;
							align-items: center;
							.look{
								display:flex;
								align-items: center;
								img{
									margin-left: .04rem;
									width: .2rem;
									height: .18rem;
								}
							}
							.zan{
								margin-left: .1rem;
								display:flex;
								align-items: center;
								img{
									position: relative;
									top: -.03rem;
									margin-left: .04rem;
									width: .2rem;
									height: .18rem;
								}
							}
							.delete{
								margin-left: .1rem;
								display:flex;
								align-items: center;
								img{
									margin-left: .04rem;
									width: .2rem;
									height: .18rem;
								}
							}
							.delete:hover{
								color: red;
							};
						}
					}
				}
			}
		}
	}
}
.pages{
	display:flex;
	align-items: center;
	justify-content:center;
	margin: 0 auto;
	width: 70%;
}
// 详情弹框
.model{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	z-index: 999;
	overflow-y: scroll;
	.close{
		position: absolute;
		top: .6rem;
		right: 15%;
		width: .5rem;
		height: .5rem;
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	import contents from '../common/contentDetail.vue'
	export default{
		data(){
			return{
				totalPages: 10,			//总页数
				page: 1,				//当前页码
				seltab:-1,				//默认选中第一项
				isDetail: false,		//默认详情弹框不显示
				isPage: false,			//传递给子组件的，立即发表按钮不显示
				list:[],				//列表
				obj:{},					//详情对象
			}
		},
		watch:{
			seltab:function(n){
				sessionStorage.setItem("seltab",n);
				switch(n){
					case 0:
					this.getShares();
					break;
					case 1:
					this.getNote();
					break;
					case 2:
					this.getLog();
					break;
				}
			}
		},
		created(){
			let seltab = sessionStorage.getItem("seltab");
			if(!!seltab){
				this.seltab = parseInt(seltab);
			}else{
				this.seltab = 0;
			}
		},
		methods:{
			//获取技术分享列表
			getShares(){
				resource.getShares().then(res => {
					if(res.data.code == "0"){
						this.list = res.data.data;
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}
				});
			},
			//获取读书笔记列表
			getNote(){
				resource.getNoteList().then(res => {
					if(res.data.code == "0"){
						this.list = res.data.data;
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}
				});
			},
			//获取我的日志列表
			getLog(){
				resource.logList().then(res => {
					if(res.data.code == "0"){
						this.list = res.data.data;
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}
				});
			},
			//查看详情(0:技术分享；1:读书笔记；2:我的日志)
			getDetail(id){
				if(this.seltab == 0){		// 技术分享
					resource.getShareDetail({id:id}).then(res => {
						if(res.data.code == "0"){
							this.obj = res.data.data[0];
							this.isDetail = true;
						}else{
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
					});
				}else if(this.seltab == 1){	//读书笔记
					resource.getNoteDetail({id:id}).then(res => {
						if(res.data.code == "0"){
							this.obj = res.data.data[0];
							this.isDetail = true;
						}else{
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
					});
				}else if(this.seltab == 2){
					resource.getLogDetail({id:id}).then(res => {
						if(res.data.code == "0"){
							this.obj = res.data.data[0];
							this.isDetail = true;
						}else{
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
					});
				}
			},
			//点击切换页码
			currentChange(){
				this.page = e;
				console.log(this.page);
			},
			//点击某一项的删除
			deleteItem(id){
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.seltab == 0){				//删除技术分享
						resource.deleteShare({id:id}).then(res => {
							if (res.data.code == "0") {
								//刷新技术分享列表
								this.getShares();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							}else{
								this.$message({
									type: 'error',
									message: res.data.msg
								});
							}
						});
					}else if(this.seltab == 1){			//删除读书笔记
						resource.deleteNote({id:id}).then(res => {
							if (res.data.code == "0") {
								//刷新读书笔记列表
								this.getNote();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							}else{
								this.$message({
									type: 'error',
									message: res.data.msg
								});
							}
						});
					}else if(this.seltab == 2){			//删除我的日志
						resource.deleteLog({id:id}).then(res => {
							if (res.data.code == "0") {
								//刷新我的日志列表
								this.getLog();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							}else{
								this.$message({
									type: 'error',
									message: res.data.msg
								});
							}
						});
					}
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			//子组件操作成功后的回调
			callback(){
				this.isDetail = false;
				//刷新列表
				if(this.seltab == 0){
					this.getShares();
				}else if(this.seltab == 1){
					this.getNote();
				}else if(this.seltab == 2){
					this.getLog();
				}
			}
			
		},
		components:{
			contents
		},
		filters:{
			updateTime(time){
				let times = parseInt(time);
				var time = new Date(times);
				var y = time.getFullYear();
				var m = time.getMonth()+1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y+'-'+m+'-'+d;
			}
		}
	}
</script>