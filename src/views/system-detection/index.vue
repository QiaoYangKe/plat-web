<template>
  <el-container>
    <el-header height="auto">
      <el-card>
        <el-row>
          <el-col :span="6">
            <span>CPU使用率</span>
            <el-progress
              type="circle"
              :percentage="systemData.cpu.percentage"
            ></el-progress>
            <span>{{ systemData.cpu.text }}</span>
          </el-col>
          <el-col :span="6">
            <span>内存使用率</span>
            <el-progress
              type="circle"
              :percentage="systemData.ram.percentage"
            ></el-progress>
            <span>{{ systemData.ram.text }}</span>
          </el-col>
          <el-col :span="6">
            <span>交换机使用率</span>
            <el-progress
              type="circle"
              :percentage="systemData.switch.percentage"
            ></el-progress>
            <span>{{ systemData.switch.text }}</span>
          </el-col>
          <el-col :span="6">
            <span>磁盘使用率</span>
            <el-progress
              type="circle"
              :percentage="systemData.disk.percentage"
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
import { getSystemData, getSystemEcharsData } from "@/api/system-info";
export default {
  name: "SystemDetection",
  data() {
    return {
      systemData: {
        cpu: {
          percentage: 25,
          text: "1核心",
        },
        ram: {
          percentage: 18,
          text: "1.4 GiB/1.9 GiB",
        },
        switch: {
          percentage: 36,
          text: "70.1 MiB/100 MiB",
        },
        disk: {
          percentage: 65,
          text: "11.3 GiB/48 GiB",
        },
      },
      systemEcharsData: {
        cpu: {
          xAxis: [
            "11:57:37",
            "11:57:40",
            "11:57:43",
            "11:57:47",
            "11:57:50",
            "11:57:53",
            "11:57:57",
          ],
          yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
        },
        ram: {
          xAxis: [
            "11:57:37",
            "11:57:40",
            "11:57:43",
            "11:57:47",
            "11:57:50",
            "11:57:53",
            "11:57:57",
          ],
          yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      },
    };
  },
  methods: {
    initData() {
      getSystemData().then((res) => {
        this.systemData = res.data;
      });
      getSystemEcharsData().then((res) => {
        this.systemEcharsData = res.data;
      });
    },
    initChart() {
      const lineChar = echarts.init(document.getElementById("lineChar"));
      const shadowChar = echarts.init(document.getElementById("shadowChar"));
      const option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: this.systemEcharsData.cpu.xAxis,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.systemEcharsData.cpu.yAxis,
            type: "line",
          },
        ],
      };
      const shadowCharOption = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
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
            data: this.systemEcharsData.ram.xAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: this.systemEcharsData.ram.yAxis,
          },
        ],
      };
      lineChar.setOption(option);
      shadowChar.setOption(shadowCharOption);
    },
  },
  mounted() {
    // this.initData();
    this.initChart();
    window.onresize = function () {
      this.initChart();
    };
  },
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
