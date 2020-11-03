<template>
  <div class="echartsdemo">
    <div class="main1">
      <div id="echart1"></div>
      <div id="echart4"></div>
    </div>
    <div class="main2">
      <div id="echart2"></div>
      <div id="echart3"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.setEcharts();
  },
  methods: {
    setEcharts() {
      var echarts = require("echarts");

      // 基于准备好的dom，初始化echarts实例
      var myChart1 = echarts.init(document.getElementById("echart1"));
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "旅游景点统计",
          left: "left",
        },
        //这里就不重要了，可以删掉
        color: ["#c23531", "#2f4554", "#61a0a8","#d48265","#91c7ae","#749f83"],
        xAxis: {
          type: "category",
          data: ["大熊猫基地", "九寨沟", "三星堆", "锦里 ", "稻城", "峨眉山"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [568, 742, 666, 356, 638, 467],
            type: "bar",
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#c23531",
                    "#2f4554",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });

      var myChart4 = echarts.init(document.getElementById("echart4"));
      myChart4.setOption({
        title: {
          text: "旅游特产",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ['火锅','冷吃兔','五粮液','甜皮鸭','兔脑壳'],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["外来旅游", "当地人", "邮寄", "男生", "女生","网购"],
        },
        series: [
          {
            name: "火锅",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [32, 30, 31, 35, 5, 20],
          },
          {
            name: "冷吃兔",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [12, 13, 10, 13, 9, 23],
          },
          {
            name: "五粮液",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [22, 18, 19, 34, 29, 30],
          },
          {
            name: "兔脑壳",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [15, 12, 20, 15, 19, 30],
          },
          {
            name: "甜皮鸭",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [20, 32, 40, 34, 12, 13],
          }
        ],
      });

      var myChart2 = echarts.init(document.getElementById("echart2"));
      myChart2.setOption({
        title: {
          text: "时间统计",
          left: "left",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["大熊猫基地", "九寨沟", "三星堆", "锦里 ", "稻城", "峨眉山"]
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["1月~3月", "4月~6月", "7月~8月", "9月~10月", "11月~12月"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "大熊猫基地",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [572,980,679,462,569],
          },
          {
            name: "九寨沟",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: {},
            data: [111,334,256,367,241],
          },
          {
            name: "三星堆",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [124,425,134,563,246],
          },
          {
            name: "锦里",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [357,134,362,354,235],
          },
          {
            name: "稻城",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [552,123,466,245,234],
          },
          {
            name: "峨眉山",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [352,356,256,890,356],
          },
        ],
      });

      var myChart3 = echarts.init(document.getElementById("echart3"));
      myChart3.setOption({
        title: {
          text: "特产统计",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["女生", "男生"],
        },
        series: [
          {
            name: "特色小吃",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              position: "inner",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 3, name: "火锅", selected: true },
              { value: 2, name: "冷吃兔" },
              { value: 5, name: "五粮液" },
              { value: 3, name: "五粮液" },
              { value: 1, name: "甜皮鸭" },
              { value: 7, name: "兔脑壳" },
            ],
          },
          {
            name: "特色小吃",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center",
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: [
              { value: 2, name: "男生" },
              { value: 1, name: "女生" },
              { value: 2, name: "男生" },
              { value: 3, name: "男生" },
              { value: 2, name: "女生" },
              { value: 2, name: "男生" },
              { value: 1, name: "女生" },
              { value: 1, name: "女生" },
              { value: 6, name: "男生" },
              { value: 1, name: "女生" },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.echartsdemo {
  display: flex;
  flex-direction: column;
}
.main1 {
  display: flex;
  margin-bottom: 35px;
  margin-top: 20px;
}
.main1 #echart1 {
  width: 600px;
  height: 400px;
  margin-left: 10px;
}
#echart4 {
  width: 600px;
  height: 400px;
}
.main2 {
  display: flex;
}
.main2 #echart2 {
  width: 600px;
  height: 400px;
  margin-left: 10px;
}
#echart3 {
  width: 600px;
  height: 400px;
}
</style>
