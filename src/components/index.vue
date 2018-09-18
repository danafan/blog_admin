<template>
	<div>
		<div class="topBox">
			<div class="userInfo" @click="exit">
				<img class="userImg" src="../assets/loginBack.jpg">
				<div class="username">{{username}}</div>
			</div>
		</div>
		<div class="content">
			<!-- 左边导航栏 -->
			<el-row class="tac">
				<el-col>
					<el-menu
					:default-active="active"
					class="el-menu-vertical-demo"
					background-color="#545c64"
					text-color="#fff"
					router
					active-text-color="#ffd04b">
					<el-menu-item index="publication">
						<i class="el-icon-menu"></i>
						<span slot="title">发表</span>
					</el-menu-item>
					<el-menu-item index="rough">
						<i class="el-icon-menu"></i>
						<span slot="title">草稿箱</span>
					</el-menu-item>
					<el-menu-item index="published">
						<i class="el-icon-menu"></i>
						<span slot="title">我发表的</span>
					</el-menu-item>
					<el-menu-item index="reading">
						<i class="el-icon-menu"></i>
						<span slot="title">最近在读</span>
					</el-menu-item>
					<el-menu-item index="photos">
						<i class="el-icon-menu"></i>
						<span slot="title">首页背景</span>
					</el-menu-item>
					<el-menu-item index="message">
						<i class="el-icon-menu"></i>
						<span slot="title">留言板</span>
					</el-menu-item>
					<el-menu-item index="statistics">
						<i class="el-icon-menu"></i>
						<span slot="title">数据统计</span>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
		<!-- 右边内容 -->
		<div class="box">
			<div class="contentBox">
				<router-view></router-view>
			</div>
		</div>
	</div>
</div>
</template>
<style lang="less" scoped>
.topBox{
	position: absolute;
	top: 0;
	left: 0;
	background: #141E30;
	width: 100%;
	height: .6rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-right: .8rem;
	z-index: 9;
	.userInfo{
		margin-left: .4rem;
		display: flex;
		align-items: center;
		.userImg{
			margin-right: .1rem;
			border-radius: 50%;
			width: .42rem;
			height: .42rem;
		}
		.username{
			font-size: 18px;
			color: #fff;
		}
	}	
}
.content{
	display:flex;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	.tac{
		background: #545c64;
		position: absolute;
		top: 0;
		left: 0;
		width: 16%;
		height: 100%;
		padding-top: .6rem;
	}
	.box{
		position: absolute;
		top: 0;
		left: 16%;
		width: 84%;
		height: 100%;
		padding-top: .6rem;
		.contentBox{
			padding: .2rem;
			width: 100%;
			height: 100%;
			overflow-y: scroll;
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return {
				active: 'publication',
				username:"",		
			}
		},
		created(){
			this.$router.push('/publication');
			this.username = sessionStorage.getItem("username");
		},
		watch:{
			$route(to,from){
				this.$router.push(to.path);
				this.active = to.path.split("/")[1];
			}
		},
		methods:{
			//退出登录
			exit(){
				this.$confirm('确认退出?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.exit().then(res => {
						if(res.data.code == "0"){
							sessionStorage.clear();
							this.$message.success("退出成功");
							this.$router.push('/login');
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					});          
				});
			}
		}
	}
</script>