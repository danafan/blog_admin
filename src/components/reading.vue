<template>
	<div>
		<div class="readingBox">
			<div class="bookItem" v-for="(item,index) in books" @mouseenter="show(index)" @mouseleave="hide(index)">
				<img class="bookIcon" :src="baseUrl + item.pageimg">
				<div class="model" v-if="item.default">
					<div class="look" @click="getDetail(item.id)">查看详情</div>
					<div class="delete" @click="deletes(item.id)">删除</div>
				</div>
			</div>
			<div class="addBook" @click="addbook">
				<img class="addIcon" src="../assets/add.png">
				<div class="addbook">添加书籍</div>
			</div>
		</div>
		<!-- 详情弹框 -->
		<div class="addModel" v-if="addBookShow == true">
			<div class="addBox" @click.stop>
				<div class="title">{{title}}<img src="../assets/close.png" @click="addBookShow = false"></div>
				<div class="top">
					<div class="left">
						<el-form label-width="70px">
							<el-form-item label="书名：">
								<el-input v-model="bookName" placeholder="书名"></el-input>
							</el-form-item>
							<el-form-item label="作者：">
								<el-input v-model="author" placeholder="作者"></el-input>
							</el-form-item>
							<el-form-item label="链接：">
								<el-input v-model="url" placeholder="链接"></el-input>
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
								<img src="../assets/detele.png" @click="detele(showImg)">
							</div>
						</div>
						<uploadimg @callbackFn="callbackFn" v-else></uploadimg>
					</div>
				</div>
				<div class="buts">
					<div class="but" @click="ok">确定</div>
					<div class="but" @click="addBookShow = false">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.readingBox{
	display: flex;
	flex-wrap: wrap;
	.bookItem{
		box-shadow: 3px 3px 6px 0px rgba(20, 30, 48, .6);
		border-radius: 0 .08rem .08rem 0;
		margin-right: .2rem;
		margin-bottom: .2rem;
		position: relative;
		width: 2.6rem;
		height: 3.2rem;
		.bookIcon{
			border-radius: 0 .08rem .08rem 0;
			position: absolute;
			width: 100%;
			height: 100%;
		}
		.model{
			border-radius: 0 0 .08rem 0;
			background: rgba(0,0,0,.6);
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: .4rem;
			display:flex;
			align-items: center;
			justify-content:space-between;
			padding-right: .2rem;
			padding-left: .2rem;
			font-size: 14px;
			color: #fff;
			.look:hover{
				color: #38A1F3;
			}
			.delete:hover{
				color: #38A1F3;				
			}
			
		}
	}
	.addBook{
		border:2px solid #666;
		width: 2.6rem;
		height: 3.2rem;
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.addIcon{
			margin-bottom: .2rem;
			width: .5rem;
			height: .5rem;
		}
		.addbook{
			font-size: 16px;
		}
	}
	.addBook:hover{
		border:2px solid #999;
		.addbook{
			color: #999;
		}
	};
}
.addModel{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	display:flex;
	align-items: center;
	justify-content:center;
	.addBox{
		background:  #fff;
		width: 6rem;
		padding-bottom: .3rem;
		.title{
			position: relative;
			margin-bottom: .3rem;
			background: #141E30;
			width: 100%;
			text-align: center;
			height: .5rem;
			line-height: .5rem;
			font-size:16px;
			color: #fff;
			img{
				width: .3rem;
				height: .3rem;
				position: absolute;
				top: 50%;
				transform: translate(-50%,-50%);
				right: .02rem;
			}
		}
		.top{
			padding-left: .2rem;
			padding-right: .2rem;
			width: 100%;
			display:flex;
			.left{
				flex: 1;
				margin-right: .2rem;
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
		.buts{
			width: 100%;
			display:flex;
			justify-content:space-around;
			.but{
				border-radius: 3rem; 
				background:#38A1F3;
				width: 1.2rem;
				text-align: center;
				height: .4rem;
				line-height: .4rem;
				font-size: 14px;
				color: #fff;
			}
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	import uploadimg from '../common/uploadimg.vue'
	export default{
		data(){
			return{
				books:[],				//最近在读列表
				addBookShow: false,		//默认添加书籍弹框不显示
				bookName: "",			//书名
				author:"",				//作者
				url: "",				//链接
				subname: "",			//简介
				showImg:"",				//预览的图片
				showDetele: false,		//默认删除弹框不显示
				title: "添加书籍",		//详情标题
				id:"",					//点击的书籍id
			}	
		},
		created(){
			//获取最近在读列表
			this.getReading();
		},
		methods:{
			//获取最近在读列表
			getReading(){
				resource.getReadList().then(res => {
					if(res.data.code == "0"){
						this.books = res.data.data;
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}
				});
			},
			//鼠标移入
			show(index){
				this.$set(this.books[index],'default',true);
			},
			//鼠标移出
			hide(index){
				this.books[index].default = false;
			},
			//图片上传成功的方法
			callbackFn(val){
				this.showImg = val;
			},
			//点击删除图片
			detele(showImg){
				resource.deleteImg({imgurl:showImg}).then(res => {
					if(res.data.code == "0"){
						this.showImg = "";					//清空预览的图片
					}else{
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
				});				
			},
			//点击查看详情
			getDetail(id){
				this.addBookShow = true;			//展示添加弹框
				this.title = "书籍详情";				//修改标题
				this.id = id;						//id赋值
				resource.getReadDetail({id:id}).then(res => {
					if(res.data.code == "0"){
						let obj = res.data.data[0];
						this.bookName = obj.name;			//书名
						this.author = obj.author;			//作者
						this.url = obj.url;					//链接
						this.subname = obj.descs;			//简介
						this.showImg = obj.pageimg;			//预览的图片
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}
				})
			},
			//点击删除
			deletes(id){
				//点击某一项的删除
				this.$confirm('确认删除该书籍?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.deleteRead({id:id}).then(res => {
						if(res.data.code == "0"){
							//获取最近在读列表
							this.getReading();
							this.$message({
								type: 'success',
								message: '书籍删除成功!'
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
			},
			//点击添加书籍
			addbook(){
				this.addBookShow = true;			//展示添加弹框
				this.title = "添加书籍";				//修改标题
			},
			//点击添加或修改书籍确定
			ok(){
				if(this.bookName == ""){
					this.$message({
						message: '请输入书籍名称',
						type: 'warning'
					});
				}else if(this.author == ""){
					this.$message({
						message: '请输入作者',
						type: 'warning'
					});
				}else if(this.url == ""){
					this.$message({
						message: '请输入链接',
						type: 'warning'
					});
				}else if(this.showImg == ""){
					this.$message({
						message: '请上传封面图',
						type: 'warning'
					});
				}else if(this.subname == ""){
					this.$message({
						message: '请输入书籍简介',
						type: 'warning'
					});
				}else{
					let obj = {
						name: this.bookName,
						author:this.author,
						url:this.url,
						descs: this.subname,
						pageimg:this.showImg
					}
					if(this.title == "添加书籍"){					//添加书籍
						resource.addReading(obj).then(res => {
							if(res.data.code == "0"){
								//获取最近在读列表
								this.getReading();
								this.addBookShow = false;
								this.$message({
									message: '书籍添加成功',
									type: 'success'
								});
							}else{
								this.$message({
									message: res.data.msg,
									type: 'error'
								});
							}
						});
					}else{										//修改书籍
						obj.id = this.id;
						resource.updateRead(obj).then(res => {
							if(res.data.code == "0"){
								//获取最近在读列表
								this.getReading();
								this.addBookShow = false;
								this.$message({
									message: '书籍修改成功',
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
			uploadimg
		}
	}
</script>









