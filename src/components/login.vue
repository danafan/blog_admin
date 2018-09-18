<template>
	<div class="box">
		<img class="backImg" src="../assets/loginBack.jpg">
		<div class="loginBack">
			<div class="item">
				<img class="icon" src="../assets/username.png">
				<input type="text" placeholder="请输入用户名" v-model="username" @keyup.enter="login">
			</div>
			<div class="item">
				<img class="icon" src="../assets/password.png">
				<input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
			</div>
			<div class="login" @click="login">登录</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.backImg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.loginBack{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border-radius: .1rem;
		box-shadow: 0 0 15px 0px rgba(170, 170, 170, 1);
		width: 5rem;
		height: 3rem;
		padding: .7rem .2rem 0 .2rem;
		.item{
			padding-bottom: .1rem;
			margin-bottom: .2rem;
			border-bottom: 1px solid #dcdcdc;
			display: flex;
			align-items: center;
			.icon{
				margin-right: .1rem;
				width: .3rem;
				height: .32rem;
			}
			input{
				background: transparent;
				outline: none;
				border: none;
				font-size: 18px;
				width: 4rem;
				height: .32rem;
				color: #333;
			}
			::-webkit-input-placeholder {  
				color: #ffffff; 
			} 
			:-moz-placeholder { 
				color: #ffffff; 
			} 
			::-moz-placeholder { 
				color: #ffffff; 
			} 
			:-ms-input-placeholder { 
				color: #ffffff; 
			} 
		}
		.login{
			margin: .2rem auto 0;
			border-radius: .3rem;
			width: 2rem;
			text-align: center;
			height: .5rem;
			line-height: .5rem;
			font-size: 18px;
			color: #fff;
			background-color: rgba(56, 161, 243, 0.8);
		}
		.login:hover{
			background-color: rgba(56, 161, 243, 0.9);
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				username:"",			//用户名
				password: "",			//密码
			}
		},
		methods:{
			login(){
				if(this.username == ""){
					this.$message.warning("请输入用户名");
				}else if(this.password == ""){
					this.$message.warning("请输入密码");
				}else{
					let userObj = {
						username: this.username,
						password: this.password
					}
					resource.login(userObj).then(res => {
						if(res.data.code == "0"){
							this.$message.success("登录成功");
							//获取返回的用户信息传递到主页
							let userObj = res.data.data[0];
							sessionStorage.setItem("username",userObj.username);
							this.$router.push('/index');
						}else{
							this.$message.error(res.data.msg);
						};
					});
				}
			}
		}
	}
</script>













