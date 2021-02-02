<template>
  <div>
    <el-button
      type="primary"
      @click="exitLesson"
      class="exit-button"
      size="small"
      >退出课程</el-button
    >
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-style">
      <el-tab-pane label="课程学习" name="first">
        <el-container>
          <el-aside width="auto">
            <el-card :body-style="{ width: '351px', height: '850px' }">
              <div class="clear-fix">
                <span class="span-class">操作手册</span>
              </div>

              <span>
                河南中盾云安信息科技有限公司（简称“中盾云安”）成立于2016年9月，是汉威科技（股票代码：300007）旗下智慧安全板块的重要成员企业，2019年度获评国家高新技术企业。中盾云安定位为区块链综合解决方案提供商，致力于依托区块链、电子签名、商用密码、5G、边缘计算等技术，打造数字经济、赋能产业发展。<br />

                中盾云安是河南省首家区块链技术落地应用企业、中国区块链生态联盟区块链安全标准工作组成员单位、阿里巴巴“云合计划”的第一批合作伙伴、芝麻信用河南唯一合作伙伴、中原云统一认证服务平台重要支撑单位，曾多次参与区块链、云计算、大数据、智能制造、智慧城市等领域的课题研究、标准制订和方案论证，并承担国家教育部教育卡安全标准制订、工信部可信智能芯片、国家卫计委居民健康卡、国家工商局电子营业执照等应用的研究工作。
              </span>
            </el-card>
          </el-aside>
          <el-main class="leaning-main">
            <div class="left-two-card">
              <el-card :body-style="{ width: '447px', height: '365px' }">
                <div class="clear-fix">
                  <span class="span-class">视频</span>
                </div>
                <video-player
                  class="video-player vjs-custom-skin"
                  style="margin-top: 40px"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                ></video-player>
              </el-card>
              <div style="height: 20px"></div>
              <el-card :body-style="{ width: '447px', height: '462px' }">
                <div class="clear-fix">
                  <span class="span-class">上传实验报告</span>
                </div>
                <div class="content-class">
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    drag
                    action
                    accept=".doc,.docx,.PDF"
                    :auto-upload="false"
                    :http-request="uploadReport"
                    :on-change="changeFiles"
                    multiple
                    :limit="5"
                    style="float: right"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或<em>点击上传服务器</em>
                    </div>
                  </el-upload>
                  <el-button
                    size="small"
                    type="primary"
                    @click="onSubmit"
                    id="uploadButton"
                    >确定上传</el-button
                  >
                </div>
              </el-card>
            </div>
            <div class="iframe-video">
              <el-card :body-style="{ width: '100%' }">
                <div class="clear-fix">
                  <span class="span-class">虚拟机IP {{ guestIp }}</span>
                  <span>小组成员：</span>
                  <span>{{
                    teamMembers.length === 0
                      ? ""
                      : teamMembers.map(v => v.userName).join("，")
                  }}</span>
                </div>
                <div class="content-class">
                  <iframe
                    style="width: 100%; height: 780px"
                    allowfullscreen="true"
                    :src="vncUrl"
                  ></iframe>
                </div>
              </el-card>
            </div>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="课程练习" name="second">
        <el-container>
          <el-aside width="auto">
            <el-card :body-style="{ width: '351px', height: '100%' }">
              <div class="clear-fix">
                <span class="span-class">操作手册</span>
              </div>
              <span>
                河南中盾云安信息科技有限公司（简称“中盾云安”）成立于2016年9月，是汉威科技（股票代码：300007）旗下智慧安全板块的重要成员企业，2019年度获评国家高新技术企业。中盾云安定位为区块链综合解决方案提供商，致力于依托区块链、电子签名、商用密码、5G、边缘计算等技术，打造数字经济、赋能产业发展。<br />

                中盾云安是河南省首家区块链技术落地应用企业、中国区块链生态联盟区块链安全标准工作组成员单位、阿里巴巴“云合计划”的第一批合作伙伴、芝麻信用河南唯一合作伙伴、中原云统一认证服务平台重要支撑单位，曾多次参与区块链、云计算、大数据、智能制造、智慧城市等领域的课题研究、标准制订和方案论证，并承担国家教育部教育卡安全标准制订、工信部可信智能芯片、国家卫计委居民健康卡、国家工商局电子营业执照等应用的研究工作。
              </span>
            </el-card>
          </el-aside>
          <el-main>
            <el-card
              :body-style="{ width: 'calc(100% + 5px)', height: '100%' }"
            >
              <el-button
                @click="submitAnswer"
                size="mini"
                type="primary"
                style="float: right; margin-top: -10px"
                :disabled="answerVisible"
                >提交</el-button
              >
              <div class="clear-fix">
                <span class="span-class">课程练习</span>
              </div>
              <div class="train-box">
                <el-row :gutter="2">
                  <el-col
                    :sm="8"
                    :md="8"
                    :lg="8"
                    :xl="8"
                    v-for="(item, index) in trains"
                    :key="index"
                    ><train
                      :data="item"
                      :index="index + 1"
                      :answerVisible="answerVisible"
                    ></train
                  ></el-col>
                </el-row>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import videoImg from "@/assets/images/timg.jpg";
import train from "@/components/CourseLearn/index";
import { teamMember } from "@/api/user.js";
import { addScoreInfo, uploadRport } from "@/api/lab-report";
import { courseInfoById } from "@/api/course-info";
import { appConsts } from "@/appConsts";
import { VmById, CloneVm } from "@/api/vm-info";
import { randomExercises, computeScore } from "@/api/exercise";
export default {
  name: "CourseDetail",
  components: { train },
  data() {
    return {
      activeName: "first",
      teamMembers: [],
      answerVisible: false,
      trains: [],
      currentCourse: {},
      fileCount: 0,
      guestIp: "",
      score: 0,
      vncUrl: appConsts.vncUrl,
      ruleForm: {
        lessonFile: [],
        courseInfoId: ""
      },
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [],
        poster: videoImg, //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  mounted() {
    this.teamMember();
    this.initCourse();
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "second" && this.trains.length === 0) {
        this.initTrains();
      }
    },
    exitLesson() {
      this.$router.push("/course-manager");
    },
    initCourse() {
      this.ruleForm.courseInfoId = this.$route.query.id;
      this.changeCourse(this.ruleForm.courseInfoId);
    },
    async initTrains() {
      await randomExercises({ courseInfoId: this.ruleForm.courseInfoId }).then(
        res => {
          let result = res.data;
          result.forEach(item => {
            item.answer = "";
            item.result = "";
          });
          this.$set(this, "trains", result);
        }
      );
    },
    changeFiles(file, fileList) {
      this.fileCount = fileList.length;
    },
    submitAnswer() {
      let noAnswerCount = this.trains.filter(
        item => item.answer === "" || item.answer == null
      ).length;
      this.$confirm(
        noAnswerCount > 0
          ? `还有${noAnswerCount}题目未作答`
          : "已经答完所有题目",
        "确认提交吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: noAnswerCount > 0 ? "warning" : "success",
          callback: action => {
            if (action === "confirm") {
              let loading = this.$loading({
                text: "正在提交请稍后",
                lock: true,
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              let data = {
                courseInfoId: this.ruleForm.courseInfoId,
                list: []
              };
              this.trains.forEach(item => {
                data.list.push({
                  exercisesId: item.id,
                  exercisesOptionId: item.answer,
                  isTrue: true
                });
              });
              computeScore(data).then(
                res => {
                  this.score = res.score;
                  res.data.list.forEach(item => {
                    this.$set(this.trains.find(it => it.id === item.exercisesId), 'result',item.exercisesOptionId);
                  });
                  console.log(this.trains);
                  this.answerVisible = true;
                  loading.close();
                },
                () => {
                  this.$message({
                    message: "提交失败",
                    type: "error"
                  });
                  loading.close();
                }
              );
            }
          }
        }
      );
    },
    changeCourse(val) {
      courseInfoById(val).then(res => {
        this.currentCourse = res.data;
        this.playerOptions.sources = [
          {
            src: appConsts.serverUrlWithSplit + this.currentCourse.videoPath,
            type: "video/mp4"
          }
        ];
      });
    },
    uploadSuccess() {
      if (this.ruleForm.lessonFile.length === 0) {
        this.$message({
          type: "warning",
          message: "至少选择一个"
        });
        return;
      }
      addScoreInfo(this.ruleForm).then(res => {
        this.$message({
          type: "success",
          message: "上传成功"
        });
        this.ruleForm.lessonFile = [];
        this.$refs.upload.clearFiles();
      });
    },
    uploadReport(file) {
      console.log(file);
      let param = new FormData();
      param.append("files", file.file);
      uploadRport(param).then(res => {
        this.ruleForm.lessonFile.push(res.data);
        if (this.ruleForm.lessonFile.length === this.fileCount) {
          this.uploadSuccess();
        }
      });
    },
    removeFile(file, fileList) {
      console.log(file, this.ruleForm.lessonFile);
    },
    onSubmit() {
      this.$refs.upload.submit();
    },
    teamMember() {
      CloneVm().then(res => {
        if (res.data[0] != null) {
          this.vncUrl = `${appConsts.vncUrl}${res.data[0].vmName}`;
          let arr = [];
          res.data.forEach(e => {
            arr.push(e.id);
          });
          VmById(arr.shift()).then(response => {
            this.guestIp = response.data.vmip;
          });
        } else {
          this.vncUrl = `${appConsts.vncUrl}`;
          this.$message({
            message: "没有分配虚拟机",
            type: "warning"
          });
        }
      });
      teamMember().then(res => {
        this.teamMembers = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.exit-button {
  position: absolute;
  top: 5px;
  left: calc(100% - 100px);
  z-index: 999;
}
.train-box {
  background-color: rgba($color: #000000, $alpha: 0.1);
  padding: 5px;
  min-width: 1000px;
  .el-card {
    width: 100%;
    margin-bottom: 2px;
  }
}
.tab-style {
  padding: 0;
  height: 100%;
  ::v-deep {
    .el-tabs__nav-scroll {
      padding-left: 20px;
    }
  }
  .el-tab-pane {
    height: 100%;
    .el-container {
      .el-aside {
        background: white;
        padding: 5px 20px;
        margin-right: -10px;
        .el-card {
          height: 100%;
        }
      }
      .el-main {
        padding: 5px 5px;
        height: 100%;
      }
      .leaning-main {
        display: flex;
        flex-flow: row;
        .left-two-card {
          display: flex;
          flex-flow: column;
          margin-right: 20px;
        }
        .iframe-video {
          margin-right: 10px;
          width: calc(100% - 300px);
          min-width: 500px;
        }
      }
    }
    .clear-fix {
      margin: -10px 0 20px -10px;
      display: flex;
      flex-flow: row;
      .span-class {
        display: flex;
        line-height: 16px;
      }
      span:nth-of-type(2) {
        margin-left: 100px;
      }
      .span-class::before {
        content: "";
        display: inline-block;
        width: 4px;
        background: #0a76a4;
        margin-right: 4px;
      }
    }
  }
}
.content-class {
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  #uploadButton {
    margin-top: 50px;
  }
  .upload-demo {
    margin: 80px 30px -30px 30px;
  }
}
</style>
