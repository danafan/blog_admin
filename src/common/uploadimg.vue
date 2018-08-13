<template>
	<div>
		<div class="imgBox">
			<div class="camera"><img src="../assets/Imgicon.png"></div>
			<div class="add">上传图片</div>
			<input type="file" ref="imgUpload" class="upload_file" @change="uploadFn">
		</div>
	</div>
</template>
<style lang="less" scoped>
.imgBox{
	border-radius: .1rem; 
	position: relative;
	display: flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	background: #eeeeee;
	width: 2rem;
	height: 2.2rem;
	.camera{
		margin-bottom: .2rem;
		position: relative;
		width: .4rem;
		height: .3rem;
		img{
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}
	.add{
		width: 100%;
		text-align: center;
		font-size: 14px;
		color:#999999;
	}
	.upload_file {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		methods:{
			// 上传图片
			uploadFn(){
				if (this.$refs.imgUpload.files.length > 0) {
					var files = this.$refs.imgUpload.files;
					for(let i = 0;i < files.length;i ++){
						let obj = files[i];
						var formdata = new FormData();
						formdata.append("addImgList", obj);
						resource.uploadImg(formdata).then(res => {
							if(res.data.code == "0"){
								let imgUrl = res.data.data.imgName;
								this.$emit("callbackFn",imgUrl);
							}else{
								this.$message.error(res.data.msg);
							};
						});
					}
				}
			}

		}


	}
</script>