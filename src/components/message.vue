<template>
	<div>
		<div class="messBox">
			<div class="messItem" v-for="(item,index) in messList" @mouseenter="show(index)" @mouseleave="hide(index)" @click="isDetail(item.id)">
				<div class="content">{{item.content}}</div>
				<div class="setting" v-if="item.default">
					<div class="time">发表时间：{{item.time}}</div>
					<div class="delete" @click="deletes(item.id)">删除</div>
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
	<div class="isDetail" v-if="showDetail">
		<img class="close" src="../assets/close.png" @click="showDetail = false">
		<div class="detailBox">
			<div class="conTxt">
				阿迪和饭卡就收到话费卡世纪东方哈萨克将豆腐哈开始觉得发哈快速的减肥和快速的减肥哈速度快放假哈史蒂夫拉屎的话费卡世纪东方哈萨克的风景哈阿迪和饭卡阿迪和饭卡就收到话费卡世纪东方哈萨克将豆腐哈开始觉得发哈快速的减肥和快速的减肥哈速度快放假哈史蒂夫拉屎的话费卡世纪东方哈萨克的风景哈阿迪和饭卡阿迪和饭卡就收到话费卡世纪东方哈萨克将豆腐哈开始觉得发哈快速的减肥和快速的减肥哈
			</div>
			<div class="info">
				<div class="author">
					来自：掩耳盗哑铃 的留言
				</div>
				<div class="email">
					邮箱：13067882143@163.com
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
	export default{
		data(){
			return{
				messList:[{default:false,content:"阿迪和饭卡就收到话费卡世纪东方哈萨克将豆腐哈开始觉得发哈快速的减肥和快速的减肥哈速度快放假哈史蒂夫拉屎的话费卡世纪东方哈萨克的风景哈阿迪和饭卡",time:"2018-03-21",id:0,username:"掩耳盗哑铃",email:"13067882143@163.com"},{default:false,content:"阿迪和饭卡就收到话费卡世纪东方哈萨克将豆腐哈开始觉得发哈快速的减肥和快速的减肥哈速度快放假哈史蒂夫拉屎的话费卡世纪东方哈萨克的风景哈",time:"2018-03-21",id:0,username:"掩耳盗哑铃",email:"13067882143@163.com"},{default:false,content:"阿迪和饭卡就收到话费卡世纪东方哈萨克将豆腐哈开始觉得发哈快速的减肥和快速的减肥哈速度快放假哈史蒂夫拉屎的话费卡世纪东方哈萨克的风景哈",time:"2018-03-21",id:0,username:"掩耳盗哑铃",email:"13067882143@163.com"},{default:false,content:"阿迪和饭卡就收到话费卡世纪东方哈萨克将豆腐哈开始觉得发哈快速的减肥和快速的减肥哈速度快放假哈史蒂夫拉屎的话费卡世纪东方哈萨克的风景哈",time:"2018-03-21",id:0,username:"掩耳盗哑铃",email:"13067882143@163.com"},{default:false,content:"阿迪和饭卡就收到话费卡世纪东方哈萨克将豆腐哈开始觉得发哈快速的减肥和快速的减肥哈速度快放假哈史蒂夫拉屎的话费卡世纪东方哈萨克的风景哈",time:"2018-03-21",id:0,username:"掩耳盗哑铃",email:"13067882143@163.com"}],
				totalPages: 10,		//总条数
				page: 1,			//当前页数
				showDetail: false,	//默认留言详情弹框不显示
			}
		},
		methods:{
			//切换页码
			currentChange(e){
				this.page = e;
				console.log(e);
			},
			//鼠标移入
			show(index){
				this.messList[index].default = true;
			},
			//鼠标移出
			hide(index){
				this.messList[index].default = false;
			},
			//点击查看详情
			isDetail(id){
				console.log(id);
				this.showDetail = true;
			},
			//点击删除
			deletes(id){
				//点击某一项的删除
				this.$confirm('确认删除该留言?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					console.log(id);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			}
		}
	}
</script>