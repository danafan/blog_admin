<template>
	<div class="boxs">
		<div class="routhBox">
			<div class="routhItem" v-for="item in draftsList" @click="showDetail(item.group,item.id)">
				<div class="img">
					<img :src="baseUrl + item.pageimg">
				</div>
				<div class="title">{{item.title}}</div>
				<div class="she">
					<div class="time">保存时间：{{item.createdTime | updateTime}}</div>
					<div class="delete" @click.stop @click="deleteItem(item.id)">
						<img src="../assets/detele.png">
						<div class="txt">删除</div>
					</div>
				</div>
			</div>
		</div>
		<div class="model" v-if="isDetail">
			<img class="close" src="../assets/close.png" @click="isDetail = false">
			<contents :type = "seltab" :status="isPage" :contentObj="obj" @callback="callback"></contents>
		</div>
	</div>
</template>
<style lang="less" scoped>
.boxs{
	display:flex;
	flex-wrap: wrap;
	align-content:flex-start;
}
//草稿箱列表
.routhBox{
	display:flex;
	flex-wrap: wrap;
	.routhItem{
		margin-bottom: .2rem;
		margin-right: .2rem;
		width: 2.4rem;
		height: 3.2rem;
		box-shadow: -3px 3px 8px 2px rgba(170, 170, 170, 1);
		border: 1px solid rgba(187, 187, 187, 1);
		border-radius: .1rem;
		.img{
			border-radius: .1rem .1rem 0 0;
			width: 100%;
			height: 2.3rem;
			overflow: hidden;
			img{
				border-radius: .1rem .1rem 0 0;
				width: 100%;
				height: 100%;
				cursor: pointer;
				transition: all 0.6s;
			}
			img:hover{
				transform: scale(1.1);
			}
		}
		.title{
			padding: .02rem;
			width: 100%;
			height: .45rem;
			font-size: 14px;
			color: #333;
			font-weight: bold;
			overflow: hidden;
			text-overflow: ellipsis; 
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.title:hover{
			color: #38A1F3;
		};
		.she{
			margin-top: .14rem;
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding-right: .1rem;
			padding-left: .1rem;
			.time{
				font-size: 12px;
				color: #666;
			}
			.delete{
				display:flex;
				align-items: center;
				img{
					margin-right: .03rem;
					width: .2rem;
					height: .2rem;
				}
				.txt{
					font-size: 12px;
					color: #666;
				}
				.txt:hover{
					color: red;
				};
			}
		}
	}
}
// 详情弹框
.model{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	z-index: 999;
	overflow-y: scroll;
	.close{
		position: absolute;
		top: .6rem;
		right: 15%;
		width: .5rem;
		height: .5rem;
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	import contents from '../common/contentDetail.vue'
	export default{
		data(){
			return{
				draftsList:[],			//草稿箱列表
				seltab:0,				//传递给子组件的tab
				isDetail: false,		//详情弹框默认不显示
				obj: {},				//传递个子组件的详情
				isPage: true,			//传递给子组件的，立即发表按钮显示
			}
		},
		created(){
			//获取草稿箱列表
			this.getDraftList();
		},
		methods:{
			//获取草稿箱列表
			getDraftList(){
				resource.draftList().then(res => {
					if(res.data.code = "0"){
						this.draftsList = res.data.data;
					}else{
						this.$message({
							type: 'error',
							message: res.data.msg
						});
					}
				});
			},
			//点击某一项展示详情框
			showDetail(group,id){
				this.seltab = group;		//传递给子组件的tab
				//获取草稿详情
				resource.getDraftDetail({id:id}).then(res => {
					if(res.data.code == "0"){
						this.obj = res.data.data[0];
						this.isDetail = true;
					}else{
						this.$message({
							type: 'error',
							message: res.data.msg
						});
					}
				});
			},
			//子组件操作成功后的回调
			callback(){
				this.isDetail = false;
				//刷新列表
				this.getDraftList();
			},
			//点击某一项的删除
			deleteItem(id){
				this.$confirm('确认删除该草稿吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.deleteDraft({id:id}).then(res => {
						if(res.data.code == "0"){
							//获取草稿箱列表
							this.getDraftList()
							this.$message({
								type: 'success',
								message: '删除成功!'
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
		components:{
			contents
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





