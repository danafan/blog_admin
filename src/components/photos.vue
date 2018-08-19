<template>
	<div class="Box">
		<!-- 周一 -->
		<div class="box">
			<!-- 未上传 -->
			<div class="imgBox" v-if="Monday == ''">
				<div class="camera"><img src="../assets/Imgicon.png"></div>
				<div class="add">上传图片</div>
				<input type="file" ref="imgUpload1" class="upload_file" @change="uploadFn1" @click="tab = 1">
			</div>
			<!-- 已上传 -->
			<div class="cardImg" v-else>
				<img class="img" :src="baseUrl + Monday">
				<div class="modal" @click="detele(1)">
					<img src="../assets/close.png">
				</div>
			</div>
		</div>
		<!-- 周二 -->
		<div class="box">
			<!-- 未上传 -->
			<div class="imgBox" v-if="Tuesday == ''">
				<div class="camera"><img src="../assets/Imgicon.png"></div>
				<div class="add">上传图片</div>
				<input type="file" ref="imgUpload2" class="upload_file" @change="uploadFn2" @click="tab = 2">
			</div>
			<!-- 已上传 -->
			<div class="cardImg" v-else>
				<img class="img" :src="baseUrl + Tuesday">
				<div class="modal" @click="detele(2)">
					<img src="../assets/close.png">
				</div>
			</div>
		</div>
		<!-- 周三 -->
		<div class="box">
			<!-- 未上传 -->
			<div class="imgBox" v-if="Wednesday == ''">
				<div class="camera"><img src="../assets/Imgicon.png"></div>
				<div class="add">上传图片</div>
				<input type="file" ref="imgUpload3" class="upload_file" @change="uploadFn3" @click="tab = 3">
			</div>
			<!-- 已上传 -->
			<div class="cardImg" v-else>
				<img class="img" :src="baseUrl + Wednesday">
				<div class="modal" @click="detele(3)">
					<img src="../assets/close.png">
				</div>
			</div>
		</div>
		<!-- 周四 -->
		<div class="box">
			<!-- 未上传 -->
			<div class="imgBox" v-if="Thursday == ''">
				<div class="camera"><img src="../assets/Imgicon.png"></div>
				<div class="add">上传图片</div>
				<input type="file" ref="imgUpload4" class="upload_file" @change="uploadFn4" @click="tab = 4">
			</div>
			<!-- 已上传 -->
			<div class="cardImg" v-else>
				<img class="img" :src="baseUrl + Thursday">
				<div class="modal" @click="detele(4)">
					<img src="../assets/close.png">
				</div>
			</div>
		</div>
		<!-- 周五 -->
		<div class="box">
			<!-- 未上传 -->
			<div class="imgBox" v-if="Friday == ''">
				<div class="camera"><img src="../assets/Imgicon.png"></div>
				<div class="add">上传图片</div>
				<input type="file" ref="imgUpload5" class="upload_file" @change="uploadFn5" @click="tab = 5">
			</div>
			<!-- 已上传 -->
			<div class="cardImg" v-else>
				<img class="img" :src="baseUrl + Friday">
				<div class="modal" @click="detele(5)">
					<img src="../assets/close.png">
				</div>
			</div>
		</div>
		<!-- 周六 -->
		<div class="box">
			<!-- 未上传 -->
			<div class="imgBox" v-if="Saturday == ''">
				<div class="camera"><img src="../assets/Imgicon.png"></div>
				<div class="add">上传图片</div>
				<input type="file" ref="imgUpload6" class="upload_file" @change="uploadFn6" @click="tab = 6">
			</div>
			<!-- 已上传 -->
			<div class="cardImg" v-else>
				<img class="img" :src="baseUrl + Saturday">
				<div class="modal" @click="detele(6)">
					<img src="../assets/close.png">
				</div>
			</div>
		</div>
		<!-- 周日 -->
		<div class="box">
			<!-- 未上传 -->
			<div class="imgBox" v-if="Sunday == ''">
				<div class="camera"><img src="../assets/Imgicon.png"></div>
				<div class="add">上传图片</div>
				<input type="file" ref="imgUpload7" class="upload_file" @change="uploadFn7" @click="tab = 7">
			</div>
			<!-- 已上传 -->
			<div class="cardImg" v-else>
				<img class="img" :src="baseUrl + Sunday">
				<div class="modal" @click="detele(7)">
					<img src="../assets/close.png">
				</div>
			</div>
		</div>
		<!-- 我的头像 -->
		<div class="box">
			<!-- 未上传 -->
			<div class="imgBox" v-if="userimg == ''">
				<div class="camera"><img src="../assets/Imgicon.png"></div>
				<div class="add">上传图片</div>
				<input type="file" ref="imgUpload8" class="upload_file" @change="uploadFn8" @click="tab = 8">
			</div>
			<!-- 已上传 -->
			<div class="cardImg" v-else>
				<img class="img" :src="baseUrl + userimg">
				<div class="modal" @click="detele(8)">
					<img src="../assets/close.png">
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.Box{
	display:flex;
	flex-wrap: wrap;
}
.box{
	margin-right: .2rem;
	margin-bottom: .2rem;
	border-radius: .1rem; 
	width: 2rem;
	height: 2.2rem;
	.cardImg{
		border-radius: .1rem; 
		position: relative;
		width: 2rem;
		height: 2.2rem;
		.img{
			border-radius: .1rem; 
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.modal{
			background:rgba(0,0,0,.6);
			position: absolute;
			top: 0;
			right: 0;
			width: .5rem;
			height: .5rem;
			img{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				width: .3rem;
				height: .3rem;
			}
		}
		
	}
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
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				tab:0,
				Monday:"",
				Tuesday:"",
				Wednesday:"",
				Thursday:"",
				Friday:"",
				Saturday:"",
				Sunday:"",
				userimg:""
			}
		},
		created(){
			resource.imgList().then(res => {
				this.Monday = res.data.data[0].imgurl;
				this.Tuesday = res.data.data[1].imgurl;
				this.Wednesday = res.data.data[2].imgurl;
				this.Thursday = res.data.data[3].imgurl;
				this.Friday = res.data.data[4].imgurl;
				this.Saturday = res.data.data[5].imgurl;
				this.Sunday = res.data.data[6].imgurl;
				this.userimg = res.data.data[7].imgurl;
			})
		},
		methods:{
			//周一
			uploadFn1(){
				let files = this.$refs.imgUpload1.files;
				// 上传图片
				this.uploadFn(files);
			},
			//周一
			uploadFn2(){
				let files = this.$refs.imgUpload2.files;
				// 上传图片
				this.uploadFn(files);
			},
			//周一
			uploadFn3(){
				let files = this.$refs.imgUpload3.files;
				// 上传图片
				this.uploadFn(files);
			},
			//周一
			uploadFn4(){
				let files = this.$refs.imgUpload4.files;
				// 上传图片
				this.uploadFn(files);
			},
			//周一
			uploadFn5(){
				let files = this.$refs.imgUpload5.files;
				// 上传图片
				this.uploadFn(files);
			},
			//周一
			uploadFn6(){
				let files = this.$refs.imgUpload6.files;
				// 上传图片
				this.uploadFn(files);
			},
			//周一
			uploadFn7(){
				let files = this.$refs.imgUpload7.files;
				// 上传图片
				this.uploadFn(files);
			},
			//周一
			uploadFn8(){
				let files = this.$refs.imgUpload8.files;
				// 上传图片
				this.uploadFn(files);
			},
			// 上传图片
			uploadFn(files){
				if (files.length > 0) {
					for(let i = 0;i < files.length;i ++){
						let obj = files[i];
						var formdata = new FormData();
						formdata.append("addImgList", obj);
						resource.uploadImg(formdata).then(res => {
							if(res.data.code == "0"){
								let img = res.data.data.imgName;	//图片地址
								resource.updateImg({id:this.tab,img:img}).then(res => {
									if(res.data.code == "0"){
										this.$message({
											type: 'success',
											message: res.data.msg
										});
										switch(this.tab){
											case 1:
											this.Monday = img;
											break;
											case 2:
											this.Tuesday = img;
											break;
											case 3:
											this.Wednesday = img;
											break;
											case 4:
											this.Thursday = img;
											break;
											case 5:
											this.Friday = img;
											break;
											case 6:
											this.Saturday = img;
											break;
											case 7:
											this.Sunday = img;
											break;
											case 8:
											this.userimg = img;
											break;
										}
									}else{
										this.$message({
											type: 'error',
											message: res.data.msg
										});
									}
								});
								
							}else{
								this.$message.error(res.data.msg);
							};
						});
					}
				}
			},
			//点击某一个删除
			detele(index){
				switch(index){
					case 1:
					this.Monday = "";
					break;
					case 2:
					this.Tuesday = "";
					break;
					case 3:
					this.Wednesday = "";
					break;
					case 4:
					this.Thursday = "";
					break;
					case 5:
					this.Friday = "";
					break;
					case 6:
					this.Saturday = "";
					break;
					case 7:
					this.Sunday = "";
					break;
					case 8:
					this.userimg = "";
					break;
				}
			}

		}


	}
</script>