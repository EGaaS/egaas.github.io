$(document).ready(function(){"use strict";$(".start").TimeCircles({time:{Days:{text:""},Hours:{text:""},Minutes:{text:""},Seconds:{text:""}}}),$(".timer_text").each(function(){var e=$(this).attr("data-for");$(this).prependTo($(".start ."+e))})}),$(function(){"use strict";$("#distribution").highcharts({colors:["#16b6e8","#e6e6e6"],credits:{enabled:!1},tooltip:{enabled:!1},chart:{renderTo:"container",backgroundColor:"rgba(255, 255, 255, 0.1)",type:"pie",margin:[0,0,0,0],spacingTop:0,spacingBottom:0,spacingLeft:0,spacingRight:0},title:{text:null},plotOptions:{pie:{allowPointSelect:!1,size:"100%",borderWidth:0,dataLabels:{enabled:!0,distance:-100,style:{fontFamily:"PFSquareSansPro-Bold",lineHeight:"48px",fontSize:"48px",textShadow:"none"}}},series:{states:{hover:{enabled:!1}}}},series:[{showInLegend:!1,type:"pie",name:"Pie Chart",data:[["65%",65],["35%",35]]}]})});