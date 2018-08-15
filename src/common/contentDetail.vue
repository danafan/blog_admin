<template>
	<div class="Box">
		<div class="contentBox">
			<div class="Tab">
				<div class="itme" :class="{'selItem':tabId == 0}">技术分享</div>
				<div class="itme" :class="{'selItem':tabId == 1}">读书笔记</div>
				<div class="itme" :class="{'selItem':tabId == 2}">我的日志</div>
			</div>
			<div class="content">
				<!-- 上面部分 -->
				<div class="conTop">
					<!-- 左侧 -->
					<div class="left">
						<!-- 选项 -->
						<div class="switch" v-if="tabId == 0">
							<div class="contentItem">
								<div class="isHome">首页：</div>
								<el-switch v-model="scorllTop"
								active-color="#13ce66"
								inactive-color="#ff4949"
								active-value="1"
								inactive-value="0"
								>
							</el-switch>
						</div>
						<div class="contentItem">
							<div class="isHome">推荐：</div>
							<el-switch v-model="recom"
							active-color="#13ce66"
							inactive-color="#ff4949"
							active-value="1"
							inactive-value="0"
							>
						</el-switch>
					</div>
				</div>
				<el-form label-width="80px">
					<el-form-item label="标题" v-if="tabId == 0 || tabId == 2">
						<el-input v-model="packDelTitle" placeholder="标题"></el-input>
					</el-form-item>
					<el-form-item label="书名" v-if="tabId == 1">
						<el-input v-model="packDelTitle" placeholder="书名"></el-input>
					</el-form-item>
					<el-form-item label="作者" v-if="tabId == 1">
						<el-input v-model="author" placeholder="作者"></el-input>
					</el-form-item>
					<el-form-item label="简介">
						<el-input type="textarea" :rows="4" placeholder="简介。。。" v-model="subname"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<!-- 右侧封面图 -->
			<div class="pageImg">
				<div class="showimg" v-if="showImg != ''" @mouseenter="showDetele = true" @mouseleave="showDetele = false">
					<img class="img" :src="baseUrl + showImg">
					<div class="modal" v-if="showDetele == true">
						<img src="../assets/detele.png" @click="detele">
					</div>
				</div>
				<uploadimg @callbackFn="callbackFn" v-else></uploadimg>
			</div>
		</div>
		<!-- 下面部分富文本编辑器 -->
		<div>
			<div class="woicon">
				<img src="../assets/Imgicon.png">
				<input type="file" ref="imgUpload" class="upload_file" @change="upLoadFn()">
			</div>
			<quill-editor ref="myTextEditor"
			v-model="content"
			:options="editorOption"
			@change="onEditorChange($event)"
			class="quill">
		</quill-editor>
	</div>

	<div class="buts">
		<div class="but" @click="publication" v-if="status == true">立即发表</div>
		<div class="but" @click="save">保存</div>
	</div>
</div>
</div>
</div>
</template>
<style lang="less" scoped>
.Box{
	display:flex;
	align-items: center;
	justify-content:center;
	.contentBox{
		margin-top: 1rem;
		background: #fff;
		position: relative;
		border-radius: .1rem;
		width: 60%;
		padding-bottom: 1rem;
		border: 1px solid rgba(187, 187, 187, 1);
		.Tab{
			position: absolute;
			top: -.2rem;
			display: flex;
			.itme{
				box-shadow: 2px 2px 5px 0 rgba(170, 170, 170, 1);
				margin-left: .5rem;
				border-radius: .06rem;
				background: #E5E5E5;
				width: 1.2rem;
				text-align: center;
				height: .4rem;
				line-height: .4rem;
				font-size: 16px;
				color: #333; 
			}
			.selItem{
				box-shadow: 2px 2px 5px 0 rgba(56, 161, 243, 1);
				background: #38A1F3;
				color: #fff; 
			}
		}
		.content{
			width: 82%;
			margin:.5rem auto 0;
			// 上面内容
			.conTop{
				display:flex;
				justify-content: space-between;
				align-items: center;
				.left{
					flex: 1;
					padding-right: .2rem;
					.switch{
						padding-left: .4rem;
						margin-bottom: .3rem;
						display:flex;
						width: 100%;
						.contentItem{
							margin-right: .6rem;
							display:flex;
							.isHome{
								font-size: 14px;
								color: #666; 
							}
						}
					}
				}
				.pageImg{
					width: 2rem;
					height: 2.2rem;
					.showimg{
						border-radius: .1rem; 
						position: relative;
						width: 2rem;
						height: 2.2rem;
						.img{
							border-radius: .1rem; 
							position: absolute;
							width: 100%;
							height: 100%;
						}
						.modal{
							border-radius: .1rem; 
							background: rgba(0,0,0,.6);
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							img{
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%,-50%);
								display:block;
								width: .6rem;
								height: .6rem;
							}
						}
					}
				}
			}
		}
		/*富文本编辑*/
		.woicon {
			position: relative;
			top: .87rem;
			right: -5rem;
			width: .24rem;
			height: .18rem;
			img{
				position: absolute;
				width: 100%;
				height: 100%;
			}
			input{
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
		.quill{
			margin-left: 80px;
		}
		.buts{
			margin-top: .2rem;
			margin-left: 80px;
			display:flex;
			justify-content:space-around;
			.but{
				border-radius: .5rem;
				background: #38A1F3;
				width: 1.4rem;
				text-align: center;
				height: .42rem;
				line-height: .42rem;
				font-size:14px;
				color: #fff; 
			}
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	import uploadimg from '../common/uploadimg.vue'
	import { quillEditor } from 'vue-quill-editor'
	export default{
		data(){
			return{
				tabId: this.type,						//导航（0:技术分享；1:读书笔记；2:我的日志）
				scorllTop: this.contentObj.ishome,		//首页
				recom: this.contentObj.isrecom,			//推荐
				packDelTitle: this.contentObj.title,	//标题（书名)
				subname: this.contentObj.descs,			//简介（公共）
				showImg:this.contentObj.pageimg,		//封面图（公共）
				author: this.contentObj.author,			//作者
				content: this.contentObj.content,		//内容（公共）
				editorOption: {
					theme: 'snow',
					placeholder: "请输入编辑内容。。。",modules
					: {
						toolbar: [
						['bold', 'color','code-block','code'],
						[{'header': [1, 2, 3, 4, 5, 6, false]}],
						[{'color': []}, {'background': []}],
						['link'],
						[{'align':[]}]
						]
					}
				},
				showDetele: false,						//默认删除弹框不显示	
			}
		},
		props:{
			type:{
				default: 0 
			},
			status:{
				default: true
			},
			contentObj:{
				default: {}
			}
		},
		methods:{
			//富文本编辑器方法
			onEditorChange({ html}) {//富文本编辑器  文本改变时 设置字段值
				this.content = html
			},
			//富文本编辑器上传图片
			upLoadFn(){
				if (this.$refs.imgUpload.files.length > 0) {
					var file = this.$refs.imgUpload.files[0];
					var formdata = new FormData();
					formdata.append("addImgList", file);
					//上传图片接口
					resource.uploadImg(formdata).then(res => {
						if(res.data.code == "0"){
							let u = this.baseUrl + res.data.data.imgName;
							let offset = this.$refs.myTextEditor.quill.selection.savedRange.index;
							this.$refs.myTextEditor.quill.insertEmbed(offset, 'image', u);
						}else{
							this.$message.error(res.data.msg);
						};
					});
				} else {
					console.log("没有图片");
				}
			},
			//图片上传成功的方法
			callbackFn(val){
				this.showImg = val;
			},
			//点击删除图片
			detele(){
				this.showImg = "";					//清空预览的图片
			},
			//点击草稿立即发表
			publication(){
				if(this.tabId == 0 || this.tabId == 2){		//技术分享或我的日志
					if(this.packDelTitle == ""){
						this.$message({
							message: '请输入标题',
							type: 'warning'
						});
					}else if(this.subname == ""){
						this.$message({
							message: '请输入简介',
							type: 'warning'
						});
					}else if(this.showImg == ""){
						this.$message({
							message: '请上传封面图',
							type: 'warning'
						});
					}else if(this.content == ""){
						this.$message({
							message: '请编辑内容',
							type: 'warning'
						});
					}else{
						let obj = {
							title: this.packDelTitle,
							descs: this.subname,
							pageimg: this.showImg,
							content:this.content
						}
						if(this.tabId == 0){
							obj.ishome = this.scorllTop,
							obj.isrecom = this.recom;
						}
						//提交接口
						this.publicNow(obj);
					}
				}else if(this.tabId == 1){					//读书心得
					if(this.bookName == ""){
						this.$message({
							message: '请输入书名',
							type: 'warning'
						});
					}else if(this.author == ""){
						this.$message({
							message: '请输入作者',
							type: 'warning'
						});
					}else if(this.bookSubname == ""){
						this.$message({
							message: '请输入简介',
							type: 'warning'
						});
					}else if(this.showImg == ""){
						this.$message({
							message: '请上传封面图',
							type: 'warning'
						});
					}else if(this.content == ""){
						this.$message({
							message: '请编辑内容',
							type: 'warning'
						});
					}else{
						let obj = {
							title: this.packDelTitle,
							author: this.author,
							descs: this.subname,
							pageimg: this.showImg,
							content:this.content,
						}
						//提交接口
						this.publicNow(obj);
					}
				}
			},
			//立即发表
			publicNow(obj){
				if(this.tabId == 0){						//技术分享
					resource.addShare(obj).then(res => {
						if(res.data.code == "0"){
							this.$emit("callback","1");
							this.$message({
								message: '发表成功',
								type: 'success'
							});
						}else{
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
					});
				}else if(this.tabId == 1){					//读书笔记
					resource.addNote(obj).then(res => {
						if(res.data.code == "0"){
							this.$emit("callback","1");
							this.$message({
								message: '发表成功',
								type: 'success'
							});
						}else{
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
					});
				}else if(this.tabId == 2){					//我的日志
					resource.addLog(obj).then(res => {
						if(res.data.code == "0"){
							this.$emit("callback","1");
							this.$message({
								message: '发表成功',
								type: 'success'
							});
						}else{
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
					});
				}
			},
			//点击保存
			save(){
				let obj = {};
				if(this.tabId == 0){					//技术分享
					obj.id = this.contentObj.id;		//id
					obj.ishome = this.scorllTop;		//首页
					obj.isrecom = this.recom;			//推荐
					if(this.packDelTitle == ""){
						this.$message({
							message: '请填写标题',
							type: 'warning'
						});
					}else if(this.subname == ""){
						this.$message({
							message: '请填写简介',
							type: 'warning'
						});
					}else if(this.showImg == ""){
						this.$message({
							message: '请上传封面图',
							type: 'warning'
						});
					}else if(this.content == ""){
						this.$message({
							message: '填写内容',
							type: 'warning'
						});
					}else{
						obj.title = this.packDelTitle;	//标题
						obj.pageimg = this.showImg;		//封面图
						obj.descs = this.subname;		//简介
						obj.content = this.content;		//内容
						this.pushrough(obj);
					}
				}else if(this.tabId == 1){				//读书笔记
					obj.id = this.contentObj.id;		//id
					if(this.bookName == ""){
						this.$message({
							message: '请填写书名',
							type: 'warning'
						});
					}else if(this.author == ""){
						this.$message({
							message: '请填写作者',
							type: 'warning'
						});
					}else if(this.subname == ""){
						this.$message({
							message: '请填写简介',
							type: 'warning'
						});
					}else if(this.showImg == ""){
						this.$message({
							message: '请上传封面图',
							type: 'warning'
						});
					}else if(this.content == ""){
						this.$message({
							message: '请填写内容',
							type: 'warning'
						});
					}else{
						obj.title = this.packDelTitle;	//书名
						obj.author = this.author;		//作者
						obj.descs = this.subname;		//简介
						obj.pageimg = this.showImg;		//封面图
						obj.content = this.content;		//内容
						this.pushrough(obj);
					}
				}else if(this.tabId == 2){				//我的日志
					obj.id = this.contentObj.id;		//id
					if(this.packDelTitle == ""){
						this.$message({
							message: '请填写标题',
							type: 'warning'
						});
					}else if(this.subname == ""){
						this.$message({
							message: '请填写简介',
							type: 'warning'
						});
					}else if(this.showImg == ""){
						this.$message({
							message: '请上传封面图',
							type: 'warning'
						});
					}else if(this.content == ""){
						this.$message({
							message: '请填写内容',
							type: 'warning'
						});
					}else{
						obj.title = this.packDelTitle;
						obj.descs = this.subname;
						obj.pageimg = this.showImg;
						obj.content = this.content;
						this.pushrough(obj);
					}
				}
			},
			//保存
			pushrough(obj){	
				if(this.status == true){		//草稿保存
					obj.group = this.contentObj.group;
					obj.id = this.contentObj.id;
					resource.updateDraft(obj).then(res => {
						if(res.data.code == "0"){
							this.$emit("callback","0");
							this.$message({
								message: '草稿修改成功',
								type: 'success'
							});
						}else{
							this.$message({
								message: res.data.msg,
								type: 'error'
							});
						}
					});
				}else{							//已发表详情保存（修改）
					if(this.tabId == 0){		//技术分享修改
						resource.updateShare(obj).then(res => {
							if(res.data.code == "0"){
								this.$emit("callback");
								this.$message({
									message: res.data.msg,
									type: 'success'
								});
							}else{
								this.$message({
									message: res.data.msg,
									type: 'error'
								});
							}
						});
					}else if(this.tabId == 1){
						resource.updateNote(obj).then(res => {
							if(res.data.code == "0"){
								this.$emit("callback");
								this.$message({
									message: res.data.msg,
									type: 'success'
								});
							}else{
								this.$message({
									message: res.data.msg,
									type: 'error'
								});
							}
						});
					}else if(this.tabId == 2){
						resource.updateLog(obj).then(res => {
							if(res.data.code == "0"){
								this.$emit("callback");
								this.$message({
									message: res.data.msg,
									type: 'success'
								});
							}else{
								this.$message({
									message: res.data.msg,
									type: 'error'
								});
							}
						});
					}
				}
			}


		},
		components:{
			quillEditor,
			uploadimg
		}
	}
</script>





