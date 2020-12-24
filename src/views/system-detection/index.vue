<template>
  <el-container>
    <el-header height="auto">
      <el-card>
        <el-row>
          <el-col :span="6">
            <span>CPU使用率</span>
            <el-progress type="circle" :percentage="25"></el-progress>
            <span>1核心</span>
          </el-col>
          <el-col :span="6">
            <span>内存使用率</span>
            <el-progress type="circle" :percentage="25"></el-progress>
            <span>1.4 GiB/1.9 GiB</span>
          </el-col>
          <el-col :span="6">
            <span>交换机使用率</span>
            <el-progress type="circle" :percentage="25"></el-progress>
            <span>70.1 MiB/100 MiB</span>
          </el-col>
          <el-col :span="6">
            <span>磁盘使用率</span>
            <el-progress type="circle" :percentage="25"></el-progress>
            <span>11.3 GiB/48 GiB</span>
          </el-col>
        </el-row>
      </el-card>
    </el-header>
    <el-main>
      <el-card>
        <div class="clear-fix">
          <span class="span-class">CPU使用率监控</span>
        </div>
        <div id="lineChar" style="width: 600px; height: 500px"></div>
      </el-card>
      <el-card>
        <div class="clear-fix">
          <span class="span-class">内存使用率监控</span>
        </div>
        <div id="shadowChar" style="width: 600px; height: 600px"></div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'SystemDetection',
    methods: {
      initChart() {
        const lineChar = echarts.init(document.getElementById('lineChar'))
        const shadowChar = echarts.init(document.getElementById('shadowChar'))
        const option = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        };
        const shadowCharOption = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        };
        lineChar.setOption(option);
        shadowChar.setOption(shadowCharOption);
      }
    },
    mounted() {
      this.initChart()
      window.onresize = function(){
        this.initChart()
      }
    }
  }
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
    .el-card:nth-of-type(1){
      margin-right: 10px;
    }
  }
}
.clear-fix{
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
