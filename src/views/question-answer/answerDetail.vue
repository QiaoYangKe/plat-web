<template>
  <el-container>
    <el-main>
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.createTime | dateFormat"
          placement="top"
        >
          <el-card
            class="detail-box"
            shadow="hover"
            :body-style="{ padding: '10px 20px' }"
          >
            <div>
              <span>{{ activity.courseName }}</span>
              <span><span>发送方:</span>{{ activity.fromUserInfoName }}</span>
              <span
                ><span>反馈时间:</span
                >{{ activity.createTime | dateFormat }}</span
              >
              <span><span>接收方:</span>{{ activity.toUserInfoName }}</span>
            </div>
          </el-card>
          <p>{{ activity.feedbackInfo.fbContent }}</p>
          <div v-if="activity.lessonPicList.length > 0" class="files-style">
            <el-link
              class="link-style"
              v-for="(item, index) in activity.lessonPicList"
              :key="index"
              :href="app.serverUrl + item"
              target="_blank"
            >
              {{ item.split("/").pop() }}
            </el-link>
            
          </div>
          <el-divider></el-divider>
        </el-timeline-item>
      </el-timeline>
      <el-card class="answer-box" shadow="never">
        <el-input
          v-model="form.fBContent"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
        />
        <el-upload
          class="upload-demo"
          action
          :auto-upload="true"
          :http-request="customUpload"
          :limit="5"
        >
          <div slot="tip" class="el-upload__tip">
            可以上传5个,附件支持的格式有jpg,bmp,png,gif,txt,rar,zip,doc,docx,ini,conf,xlsx,xls
          </div>
          <el-button slot="trigger" size="mini" type="primary">上传</el-button>
        </el-upload>
        <el-button type="success" class="answer-button" @click="answer"
          >回复</el-button
        >
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { readFeedBack, addFeedBack, uploadFileFeedBack } from "@/api/feed-back";
import { appConsts } from "@/appConsts";
export default {
  name: "AnswerDetail",
  filters: {
    dateFormat(val) {
      if (val == null || val === "") {
        return "";
      } else {
        const d = new Date(val); // val 为表格内取到的后台时间
        const month =
          d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        const hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        const times =
          d.getFullYear() +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          min +
          ":" +
          sec;
        return times;
      }
    },
  },
  data() {
    return {
      form: {
        fBTitle: "",
        fBContent: "",
        groupId: "",
        courseId: "",
        toUserInfoId: "",
        feedBackPic: "",
        urlList: [],
      },
      activities: [],
      app: appConsts,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const id = this.$route.params.id;
      await readFeedBack({groupId: id}).then((res) => {
        let lastOne = res.data.pop();
        console.log(3,lastOne);
        this.form.fBTitle = lastOne.feedbackInfo.fbTitle;
        this.form.groupId = lastOne.feedbackInfo.groupId;
        this.form.courseId = lastOne.feedbackInfo.courseInfoId;
        this.form.toUserInfoId = lastOne.fromUserInfoId;
        res.data.push(lastOne);
        this.activities = res.data;
      });
    },
    answer() {
      addFeedBack(this.form).then((res) => {
        this.$message({
          type: "success",
          message: "回复成功",
        });
        this.form.fBContent = "";
        this.init();
      });
    },
    downFile() {},
    customUpload(file) {
      let param = new FormData();
      param.append("files", file.file);
      uploadFileFeedBack(param).then((res) => {
        this.form.urlList.push(res.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  .el-main {
    width: 100%;
    margin: 20px;
    padding: 30px 30px 30px 5px;
    border: solid 1px lightgray;

    .el-divider--horizontal {
      display: block;
      height: 1px;
      width: 100%;
      margin: 14px 0 -10px 0;
    }

    .detail-box {
      background: rgba(#c7dfeb, 0.2);
      span:nth-of-type(1) {
        font-weight: 800;
      }

      span {
        display: block;
        margin-bottom: 5px;
        span {
          display: inline;
          color: #6699cc;
        }
      }
    }
    .answer-box {
      margin-left: 68px;
      .upload-demo {
        margin-top: 10px;
      }
      .answer-button {
        margin-top: 10px;
        width: 200px;
      }
    }
  }
  .files-style {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    .link-style {
      margin-bottom: 5px;
      color: #0c81f5;
    }
  }
}
</style>
