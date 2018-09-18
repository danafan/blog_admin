<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import resource from './api/resource.js'
	export default {
		name: 'App',
		created(){
		//判断用户状态
		resource.state().then(res => {
			if(res.data.code == "0"){
				//如果登录过，直接从session获取用户信息，传递到主页
				let username = res.data.userObj.username;
				sessionStorage.setItem("username",username);
				this.$router.push('/publication');
			}else{
				sessionStorage.removeItem("username");
				this.$router.push('/login');
			}
		});
	}
}
</script>

<style>
*{
	padding: 0;
	margin: 0;
}
div{
	box-sizing: border-box;
	cursor: pointer;
}
</style>
