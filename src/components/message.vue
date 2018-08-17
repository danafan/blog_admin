<template>
	<div>
		<div class="messBox">
			<div class="messItem" v-for="(item,index) in messList" @mouseenter="show(index)" @mouseleave="hide(index)" @click="getMessDetail(item.id)">
				<div class="content">{{item.content}}</div>
				<div class="setting" v-if="item.default">
					<div class="time">发表时间：{{item.createdTime | updateTime}}</div>
					<div class="delete" @click.stop @click="deletes(item.id)">删除</div>
				</div>
			</div>
		</div>
		<div class="pages">
			<el-pagination
			background
			layout="prev, pager, next"
			:total="total"
			:pager-count="5"
			:page-size="8"
			@current-change = "currentChange">
		</el-pagination>
	</div>
	<!-- 详情弹框 -->
	<div class="isDetail" v-if="showDetail">
		<img class="close" src="../assets/close.png" @click="showDetail = false">
		<div class="detailBox">
			<div class="conTxt">{{messObj.content}}</div>
			<div class="info">
				<div class="author">
					来自：{{messObj.nickname}} 的留言
				</div>
				<div class="email">
					邮箱：{{messObj.email}}
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<style lang="less" scoped>
.messBox{
	display: flex;
	flex-wrap: wrap; 
	.messItem{
		background: #D5C184;
		position: relative;
		margin-right: .2rem;
		margin-bottom: .2rem;
		border-radius: .08rem;
		width: 2.4rem;
		height: 3rem;
		.content{
			position: absolute;
			top: 0;
			left: 0;
			width: 2.4rem;
			height: 3rem;
			padding: .06rem;
			line-height: .21rem;
			font-size: 14px;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 14;
			-webkit-box-orient: vertical;
		}
		.setting{
			border-radius: 0 0 .08rem .08rem;
			background: rgba(0,0,0,.6);
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: .4rem;
			font-size: 14px;
			display:flex;
			justify-content:space-between;
			align-items: center;
			padding-right: .1rem;
			padding-left: .1rem;
			color: #fff;
			.delete:hover{
				color:red;
			};
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
.isDetail{
	background: rgba(0, 0, 0, .6);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.close{
		position: absolute;
		top: 1.6rem;
		right: 3.6rem;
		width: .5rem;
		height: .5rem;
	}
	.detailBox{
		border-radius: .1rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background: #D5C184;
		width:6rem;
		height: 4rem;
		display:flex;
		flex-direction: column;
		.conTxt{
			padding:.1rem;
			font-size: 16px;
			flex: 1;
			overflow-y: scroll;
		}
		.info{
			border-top: 1px solid #666;
			height: .6rem;
			font-size: 14px;
			font-weight: bold;
			padding-left: .1rem;
			padding-top: .1rem;
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				messList:[],		//留言列表
				total: 0,			//总条数
				page: 1,			//当前页数
				showDetail: false,	//默认留言详情弹框不显示
				messObj:{},			//留言详情
			}
		},
		created(){
			//获取留言板列表
			this.getMessageList();
		},
		methods:{
			//获取留言板列表
			getMessageList(){
				resource.messageList({page:this.page}).then(res => {
					if(res.data.code == "0"){
						this.messList = res.data.data;
						this.total = res.data.total;
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						}); 
					}
				});
			},	
			//获取留言详情
			getMessDetail(id){
				resource.getMessageDetail({id:id}).then(res => {
					if(res.data.code == "0"){
						this.showDetail = true;
						this.messObj = res.data.data[0];
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}
				});
			},
			//切换页码
			currentChange(e){
				this.page = e;
				//获取留言板列表
				this.getMessageList();
			},
			//鼠标移入
			show(index){
				this.$set(this.messList[index],'default',true);
			},
			//鼠标移出
			hide(index){
				this.messList[index].default = false;
			},
			//点击删除
			deletes(id){
				//点击某一项的删除
				this.$confirm('确认删除该留言?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.deleteMessage({id:id}).then(res => {
						if(res.data.code == "0"){
							//获取留言板列表
							this.getMessageList();
							this.$message({
								type: 'success',
								message: res.data.msg
							});
						}else{
							this.$message({
								type: 'error',
								message: res.data.msg
							});
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			}
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