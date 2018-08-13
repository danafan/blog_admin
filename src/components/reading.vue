<template>
	<div>
		<div class="readingBox">
			<div class="bookItem" v-for="(item,index) in books" @mouseenter="show(index)" @mouseleave="hide(index)">
				<img class="bookIcon" src="../assets/loginBack.jpg">
				<div class="model" v-if="item.default == true" @click="deletes(item.id)">
					<img src="../assets/detele.png">
				</div>
			</div>
			<div class="addBook" @click="addBookShow = true">
				<img class="addIcon" src="../assets/add.png">
				<div class="addbook">添加书籍</div>
			</div>
		</div>
		<!-- 添加数据弹框 -->
		<div class="addModel" v-if="addBookShow == true" @click="addBookShow = false">
			<div class="addBox" @click.stop>
				<div class="title">添加书籍</div>
				<div class="top">
					<div class="left">
						<el-form label-width="70px">
							<el-form-item label="书名：">
								<el-input v-model="bookName" placeholder="书名"></el-input>
							</el-form-item>
							<el-form-item label="作者：">
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
							<img class="img" :src="showImg">
							<div class="modal" v-if="showDetele == true">
								<img src="../assets/detele.png" @click="detele">
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
			border-radius: 0 .08rem .08rem 0;
			background: rgba(0,0,0,.6);
			position: absolute;
			width: 100%;
			height: 100%;
			display:flex;
			align-items: center;
			justify-content:center;
			img{
				width: .8rem;
				height: .9rem;
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
			margin-bottom: .3rem;
			background: #141E30;
			width: 100%;
			text-align: center;
			height: .5rem;
			line-height: .5rem;
			font-size:16px;
			color: #fff;
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
	import uploadimg from '../common/uploadimg.vue'
	export default{
		data(){
			return{
				books:[
				{img:require('../assets/loginBack.jpg'),default:false,id:1},
				{img:require('../assets/loginBack.jpg'),default:false,id:2},
				{img:require('../assets/loginBack.jpg'),default:false,id:3},
				{img:require('../assets/loginBack.jpg'),default:false,id:4},
				{img:require('../assets/loginBack.jpg'),default:false,id:5},
				],
				addBookShow: false,		//默认添加书籍弹框不显示
				bookName: "",			//书名
				author:"",				//作者
				subname: "",			//简介
				imgObj: {},				//向后台传递的图片对象
				showImg:"",				//预览的图片
				showDetele: false,		//默认删除弹框不显示
			}
		},
		methods:{
			//鼠标移入
			show(index){
				this.books[index].default = true;
			},
			//鼠标移出
			hide(index){
				this.books[index].default = false;
			},
			//图片上传成功的方法
			callbackFn(val){
				for(let i = 0;i < val.length;i ++){
					let obj = val[i];
					this.imgObj = obj;
					let fr = new FileReader();
					let _this = this;
					fr.onload=function () {
						let result = this.result;
						_this.showImg = result;
					};
					fr.readAsDataURL(obj);
				}
			},
			//点击删除图片
			detele(){
				this.imgObj = {};					//清空向后台传递的图片对象
				this.showImg = "";					//清空预览的图片
			},
			//点击删除
			deletes(id){
				//点击某一项的删除
				this.$confirm('确认删除该书籍?', '提示', {
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
			},
			//点击添加书籍确定
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
						subname: this.subname,
						pageimg:this.imgObj
					}
					console.log(obj);
				}
			}
		},
		components:{
			uploadimg
		}
	}
</script>









