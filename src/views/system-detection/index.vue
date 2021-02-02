<template>
  <el-container>
    <el-header height="auto">
      <el-card>
        <el-row>
          <el-col :span="6">
            <span>CPU使用率</span>
            <el-progress
              type="circle"
              :percentage="Number.parseFloat(systemData.cpu.percent)"
            ></el-progress>
            <span>{{ systemData.cpu.text }}</span>
          </el-col>
          <el-col :span="6">
            <span>内存使用率</span>
            <el-progress
              type="circle"
              :percentage="Number.parseFloat(systemData.ram.percent)"
            ></el-progress>
            <span>{{ systemData.ram.text }}</span>
          </el-col>
          <el-col :span="6">
            <span>可使用交换内存</span>
            <el-progress
              type="circle"
              :percentage="Number.parseFloat(systemData.switch.percent)"
            ></el-progress>
            <span>{{ systemData.switch.text }}</span>
          </el-col>
          <el-col :span="6">
            <span>磁盘使用率</span>
            <el-progress
              type="circle"
              :percentage="Number.parseFloat(systemData.disk.percent)"
            ></el-progress>
            <span>{{ systemData.disk.text }}</span>
          </el-col>
        </el-row>
      </el-card>
    </el-header>
    <el-main>
      <el-card>
        <div class="clear-fix">
          <span class="span-class">CPU使用率监控</span>
        </div>
        <div id="lineChar" style="width: 700px; height: 600px"></div>
      </el-card>
      <el-card>
        <div class="clear-fix">
          <span class="span-class">内存使用率监控</span>
        </div>
        <div id="shadowChar" style="width: 700px; height: 600px"></div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import echarts from "echarts";
import { appConsts } from "@/appConsts";
import axios from "axios";
export default {
  name: "SystemDetection",
  data() {
    return {
      baseUrl: appConsts.echarsUrl,
      timeWork: null,
      systemData: {
        cpu: {
          percent: 0,
          text: ""
        },
        ram: {
          percent: 0,
          text: ""
        },
        switch: {
          percent: 0,
          text: ""
        },
        disk: {
          percent: 0,
          text: ""
        }
      },
      systemEcharsData: {
        cpu: {
          xAxis: [],
          yAxis: []
        },
        ram: {
          xAxis: [],
          yAxis: []
        }
      }
    };
  },
  methods: {
    async initData() {
      const baseUrl = this.baseUrl;
      const total = 30;
      const cpuInfo = `${baseUrl}?chart=system.cpu&format=json&points=281&group=average&gtime=0&options=ms%7Cflip%7Cjsonwrap%7Cnonzero&after=-${total}`;
      const ramInfo = `${baseUrl}?chart=system.ram&format=json&points=281&group=average&gtime=0&options=ms%7Cflip%7Cjsonwrap%7Cnonzero&after=-${total}`;
      const diskInfo = `${baseUrl}?chart=disk_space._&format=json&points=281&group=average&gtime=0&options=ms%7Cflip%7Cjsonwrap%7Cnonzero`;
      const swapInfo = `${baseUrl}?chart=system.swap&format=json&points=281&group=average&gtime=0&options=ms%7Cflip%7Cjsonwrap%7Cnonzero`;

      let { data: cpuRes } = await axios(cpuInfo);
      this.systemData.cpu.percent = cpuRes.view_latest_values
        ?.reduce((sum, item) => sum + item)
        .toFixed(2);
      this.systemData.cpu.text = `${cpuRes.view_latest_values.length}核心`;
      this.systemEcharsData.cpu.xAxis.splice(
        0,
        this.systemEcharsData.cpu.xAxis.length
      );
      this.systemEcharsData.cpu.yAxis.splice(
        0,
        this.systemEcharsData.cpu.yAxis.length
      );
      cpuRes.result?.data.forEach(([datetime, ...used]) => {
        let date = new Date(datetime);
        this.systemEcharsData.cpu.xAxis.push(
          `${date.getHours() > 10? date.getHours() : `0`+ date.getHours()}:${date.getMinutes() > 10? date.getMinutes(): `0`+date.getMinutes()}:${date.getSeconds() > 10? date.getSeconds() : `0`+date.getSeconds()}`
        );
        this.systemEcharsData.cpu.yAxis.push(
          Math.round(used.reduce((sum, item) => sum + item)*100)/100
        );
      });
      let { data: ramRes } = await axios(ramInfo);
      this.systemData.ram.percent = (
        (ramRes.view_latest_values[1] /
          ramRes.view_latest_values?.reduce((sum, item) => sum + item)) *
        100
      ).toFixed(2);
      this.systemData.ram.text = `${(
        ramRes.view_latest_values[1] / 1000
      ).toFixed(2)}GB / ${(
        ramRes.view_latest_values.reduce((sum, item) => sum + item) / 1000
      ).toFixed(2)}GB`;
      this.systemEcharsData.ram.xAxis.splice(
        0,
        this.systemEcharsData.ram.xAxis.length
      );
      this.systemEcharsData.ram.yAxis.splice(
        0,
        this.systemEcharsData.ram.yAxis.length
      );
      ramRes.result?.data.forEach(([datetime, ...used]) => {
        let date = new Date(datetime);
        this.systemEcharsData.ram.xAxis.push(
          `${date.getHours() > 10? date.getHours() : `0`+ date.getHours()}:${date.getMinutes() > 10? date.getMinutes(): `0`+date.getMinutes()}:${date.getSeconds() > 10? date.getSeconds() : `0`+date.getSeconds()}`
        );
        this.systemEcharsData.ram.yAxis.push(
          Math.round(ramRes.view_latest_values[1] * 100 /
            ramRes.view_latest_values?.reduce((sum, item) => sum + item)*100)/100
        );
      });
      let { data: diskRes } = await axios(diskInfo);
      this.systemData.disk.percent = (
        (diskRes.view_latest_values[1] /
          diskRes.view_latest_values?.reduce((sum, item) => sum + item)) *
        100
      ).toFixed(2);
      this.systemData.disk.text = `${diskRes.view_latest_values[1].toFixed(
        2
      )}GB / ${diskRes.view_latest_values
        .reduce((sum, item) => sum + item)
        .toFixed(2)}GB`;
      let { data: swapRes } = await axios(swapInfo);
      console.log(swapRes);
      this.systemData.switch.percent = (
        (swapRes.view_latest_values[0] /
          swapRes.view_latest_values?.reduce((sum, item) => sum + item)) *
        100
      ).toFixed(2);
      this.systemData.switch.text = `${swapRes.view_latest_values[0].toFixed(
        2
      )}GB / ${swapRes.view_latest_values
        .reduce((sum, item) => sum + item)
        .toFixed(2)}GB`;
      this.initChart();
    },
    initChart() {
      const lineChar = echarts.init(document.getElementById("lineChar"));
      const shadowChar = echarts.init(document.getElementById("shadowChar"));
      const option = {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: this.systemEcharsData.cpu.xAxis
        },
        yAxis: {
          type: "value"
        },
        color: "#2a82e4",
        series: [
          {
            name: "数据",
            data: this.systemEcharsData.cpu.yAxis,
            type: "line",
            smooth: true
          }
        ]
      };
      const shadowCharOption = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "category" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.systemEcharsData.ram.xAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数据",
            type: "line",
            barWidth: "60%",
            data: this.systemEcharsData.ram.yAxis,
            smooth: true
          }
        ]
      };
      lineChar.setOption(option);
      shadowChar.setOption(shadowCharOption);
      window.onresize = function() {
      this.initChart();
    };
    }
  },
  mounted() {
    this.timeWork = setInterval(this.initData, 2000);
  },
  destroyed() {
    if (this.timeWork) {
      window.clearInterval(this.timeWork);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  .el-header {
    padding: 10px 20px 0 20px;
    .el-card {
      .el-row {
        .el-col {
          display: flex;
          flex-flow: column;
          align-items: center;
          span {
            color: rgba(193, 193, 193, 1);
            font-size: 16px;
            line-height: 150%;
            margin: 5px 0;
          }
        }
      }
    }
  }
  .el-main {
    width: 100%;
    display: flex;
    flex-flow: row;
    .el-card {
      width: calc(50% - 5px);
    }
    .el-card:nth-of-type(1) {
      margin-right: 10px;
    }
  }
}
.clear-fix {
  .span-class {
    display: flex;
    line-height: 150%;
    height: 24px;
    color: rgba(160, 160, 160, 1);
    font-size: 16px;
    text-align: left;
    padding-left: 20px;
  }
}
</style>
