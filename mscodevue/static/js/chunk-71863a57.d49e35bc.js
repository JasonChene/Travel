(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71863a57"],{"6e3e":function(e,t,a){},"840f":function(e,t,a){"use strict";var i=a("6e3e"),n=a.n(i);n.a},9406:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"echartsdemo"},[a("div",{staticClass:"main1"},[a("div",{attrs:{id:"echart1"}}),a("div",{attrs:{id:"echart4"}})]),a("div",{staticClass:"main2"},[a("div",{attrs:{id:"echart2"}}),a("div",{attrs:{id:"echart3"}})])])}],r={mounted:function(){this.setEcharts()},methods:{setEcharts:function(){var e=a("313e"),t=e.init(document.getElementById("echart1"));t.setOption({title:{text:"旅游景点统计",left:"left"},color:["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83"],xAxis:{type:"category",data:["大熊猫基地","九寨沟","三星堆","锦里 ","稻城","峨眉山"]},yAxis:{type:"value"},series:[{data:[568,742,666,356,638,467],type:"bar",itemStyle:{normal:{color:function(e){var t=["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83"];return t[e.dataIndex]}}}}]});var i=e.init(document.getElementById("echart4"));i.setOption({title:{text:"旅游特产"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["火锅","冷吃兔","五粮液","甜皮鸭","兔脑壳"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"value"},yAxis:{type:"category",data:["外来旅游","当地人","邮寄","男生","女生","网购"]},series:[{name:"火锅",type:"bar",stack:"总量",label:{show:!0,position:"insideRight"},data:[32,30,31,35,5,20]},{name:"冷吃兔",type:"bar",stack:"总量",label:{show:!0,position:"insideRight"},data:[12,13,10,13,9,23]},{name:"五粮液",type:"bar",stack:"总量",label:{show:!0,position:"insideRight"},data:[22,18,19,34,29,30]},{name:"兔脑壳",type:"bar",stack:"总量",label:{show:!0,position:"insideRight"},data:[15,12,20,15,19,30]},{name:"甜皮鸭",type:"bar",stack:"总量",label:{show:!0,position:"insideRight"},data:[20,32,40,34,12,13]}]});var n=e.init(document.getElementById("echart2"));n.setOption({title:{text:"时间统计",left:"left"},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:["大熊猫基地","九寨沟","三星堆","锦里 ","稻城","峨眉山"]},toolbox:{feature:{saveAsImage:{}}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["1月~3月","4月~6月","7月~8月","9月~10月","11月~12月"]}],yAxis:[{type:"value"}],series:[{name:"大熊猫基地",type:"line",stack:"总量",areaStyle:{},data:[572,980,679,462,569]},{name:"九寨沟",type:"line",stack:"总量",label:{normal:{show:!0,position:"top"}},areaStyle:{},data:[111,334,256,367,241]},{name:"三星堆",type:"line",stack:"总量",areaStyle:{},data:[124,425,134,563,246]},{name:"锦里",type:"line",stack:"总量",areaStyle:{},data:[357,134,362,354,235]},{name:"稻城",type:"line",stack:"总量",areaStyle:{},data:[552,123,466,245,234]},{name:"峨眉山",type:"line",stack:"总量",areaStyle:{},data:[352,356,256,890,356]}]});var r=e.init(document.getElementById("echart3"));r.setOption({title:{text:"特产统计",left:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:10,data:["女生","男生"]},series:[{name:"特色小吃",type:"pie",selectedMode:"single",radius:[0,"30%"],label:{position:"inner"},labelLine:{show:!1},data:[{value:3,name:"火锅",selected:!0},{value:2,name:"冷吃兔"},{value:5,name:"五粮液"},{value:3,name:"五粮液"},{value:1,name:"甜皮鸭"},{value:7,name:"兔脑壳"}]},{name:"特色小吃",type:"pie",radius:["40%","55%"],label:{formatter:"{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",backgroundColor:"#eee",borderColor:"#aaa",borderWidth:1,borderRadius:4,rich:{a:{color:"#999",lineHeight:22,align:"center"},hr:{borderColor:"#aaa",width:"100%",borderWidth:.5,height:0},b:{fontSize:16,lineHeight:33},per:{color:"#eee",backgroundColor:"#334455",padding:[2,4],borderRadius:2}}},data:[{value:2,name:"男生"},{value:1,name:"女生"},{value:2,name:"男生"},{value:3,name:"男生"},{value:2,name:"女生"},{value:2,name:"男生"},{value:1,name:"女生"},{value:1,name:"女生"},{value:6,name:"男生"},{value:1,name:"女生"}]}]})}}},l=r,o=(a("840f"),a("2877")),s=Object(o["a"])(l,i,n,!1,null,"2e72bfe3",null);t["default"]=s.exports}}]);