<template>
	<div>
		<!-- 月统计访问量 -->
		<div id="quantity"></div>
	</div>
</template>
<style lang="less" scoped>
// 月统计访问量
#quantity,#map{
	border: 1px solid red;
	width: 100%;
	height: 4.2rem;
}
</style>
<script>
	var echarts = require('echarts/lib/echarts');
	require("echarts/lib/chart/line");				//折线图
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
	export default{
		data(){
			return{
				commonDate:"",				//当前月份
			}
		},
		mounted() {
			// 当月访问量统计
			this.drawLine();
		},
		methods: {
			// 当月访问量统计
			drawLine() {
      			// 当月访问量统计
      			let myChart = echarts.init(document.getElementById('quantity'))
      			// 绘制图表
      			myChart.setOption({
      				color: {
      					type: 'linear',
      					x: 0,
      					y: 0,
      					x2: 0,
      					y2: 1,
      					colorStops: [
      					{
	        					offset: 0, color: 'red'  // 0% 处的颜色
	        				}, 
	        				{
	        					offset: 1, color: 'blue' // 100% 处的颜色
	        				}
	        				],
    					globalCoord: false 		 // 缺省为 false
    				},
    				title:{
    					text:"本月访问量",
    					subtext:this.getMonths()
    				},
    				tooltip:{
	        			trigger: 'axis'				//鼠标经过显示数字
	        		},
	        		legend:{
	        			width:"100%",
	        			height:"100%",
	        		},
	        		xAxis: {
	        			name:"日期",
	        			nameTextStyle:{
	        				color:"#03abff"
	        			},		
	        			axisTick:{
	        				alignWithLabel:true,	//刻度左右有留白
      						interval:0,				//强制显示每一个刻度
      						inside:true,			//坐标轴线朝内
      					},
      					axisLabel:{
      						interval:0,				//强制显示每一个刻度标签
      						color:"#ff5858",		//刻度标签文字颜色
      					},
      					data:this.getDates()
      				},
      				yAxis: {
      					name:"访问量",
      					type: 'value',
      					nameTextStyle:{
      						color:"#03abff"
      					},
      					axisLabel:{
      						formatter: '{value}',
      						interval:0,				//强制显示每一个刻度标签
      						color:"#ff5858",		//刻度标签文字颜色
      					},
      				},
      				series: [
      				{
      					data: [[0, 2], [1, 44], [2,55], [3, 19]],
      					type: 'line',
      					name:"当日访问",
      					symbol:'pin',

      				}
      				]
      			});
      		},
      		//获取当前月的所有日期
      		getDates(){
      			let daysOfMonth = [];
      			let fullYear = new Date().getFullYear();
      			let month = new Date().getMonth() + 1;
      			let lastDayOfMonth = new Date(fullYear, month, 0).getDate();
      			for (var i = 1; i <= lastDayOfMonth; i++) {
      				daysOfMonth.push(i);
      			};
      			return daysOfMonth;
      		},
      		//获取当前月的所有日期
      		getMonths(){
      			let daysOfMonth = [];
      			let fullYear = new Date().getFullYear();
      			let month = new Date().getMonth() + 1;
      			return "(" + fullYear + "年" + month + "月" + ")";
      		},

      	}


      }
  </script>