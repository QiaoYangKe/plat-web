<template>
  <el-card shadow="hover" :body-style="{ padding: '10px' }">
    <div class="card_title">
      <span>{{ index + "." + data.title }}</span>
    </div>
    <el-radio-group v-model="data.answer">
      <el-radio
        :key="item.id"
        v-for="(item, index) in data.chooses"
        :disabled="answerVisible"
        :label="item.id"
      >{{ String.fromCharCode(65 + index) + '.' + item.tag }}</el-radio>
    </el-radio-group>
    <div class="card_answer" v-if="answerVisible">
      <el-row :gutter="10">
        <el-col :sm="12">
          <span style="line-height: 36px; margin-left: 15px;">
              答案: <span :style="{ color: data.answer!=='' && data.result === data.answer? 'green': 'red'}">{{ String.fromCharCode(data.chooses.map(item => item.id).indexOf(data.result) + 65) }}</span>
         </span>
        </el-col>
        <el-col :sm="12">
              <el-popover
                placement="bottom"
                width="400"
                :offset="-30"
                transition="fade-in-linear"
                trigger="click">
                <div>
                    <span>
                        {{ data.resultDetial }}
                    </span>
                </div>
                <el-button type="text" slot="reference">查看解析</el-button>
            </el-popover>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
export default {
  name: "CourseLearn",
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          title: "暂无题目，请联系管理员",
          answer: "",
          chooses: [
            {
              id: "1001",
              tag: "题目错误"
            }
          ]
        };
      }
    },
    index: {
      type: Number,
      default: function() {
        return 1;
      }
    },
    answerVisible: {
        type: Boolean,
        default: function() {
            return false
        }
    }
  },
  data() {
      return {
          visible: false
      }
  },
  methods: {
      showVisible() {
          this.visible = !this.visible
      }
  }
};
</script>
<style lang="scss" scoped>
.el-card {
  width: 404px;
  height: auto;
  font-size: 14px;
  border-radius: 2px;
  .el-card__body {
    width: 404px;
    .card_title {
      margin-bottom: 20px;
      height: 25px;
    }
    .el-radio-group {
      display: flex;
      flex-flow: column;
      height: 100px;
      margin-left: 10px;
      .el-radio {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
