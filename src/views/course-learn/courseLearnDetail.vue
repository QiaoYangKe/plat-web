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
            <el-card :body-style="{ width: '351px', height: '821px' }">
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
              <el-card :body-style="{ width: '447px', height: '350px' }">
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
              <el-card :body-style="{ width: '447px', height: '450px' }">
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
            <div>
              <el-card :body-style="{ width: '800px' }">
                <div class="clear-fix">
                  <span class="span-class">虚拟机IP {{ guestIp }}</span>
                  <span>小组成员：</span>
                  <span>{{ teamMembers.map(v => v.userName).join("，") }}</span>
                </div>
                <div class="content-class">
                  <iframe
                    style="width: 100%; height: 760px"
                    allowfullscreen="true"
                    src="http://10.10.0.1:8790/vnc.html?path=?token=pptp%E6%9A%B4%E5%8A%9B%E7%A0%B4%E8%A7%A3_%E6%9C%8D%E5%8A%A1%E7%AB%AF_20201112090328_0"
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
            <el-card :body-style="{ width: '351px', height: '821px' }">
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
            <el-card :body-style="{ width: 'calc(100% - 600px)' }">
              <div class="clear-fix">
                <span class="span-class">课程练习</span>
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
import { teamMember } from "@/api/user.js";
import { addScoreInfo, uploadRport } from "@/api/lab-report";
import { courseInfoById } from "@/api/course-info";
import { appConsts } from "@/appConsts";
import { GuestIP } from "@/api/vm-info";
export default {
  name: "CourseLearnDetail",
  data() {
    return {
      activeName: "first",
      teamMembers: [],
      currentCourse: {},
      fileCount: 0,
      guestIp: "",
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
      console.log(tab, event);
    },
    exitLesson() {
      this.$router.push("/course-learn");
    },
    initCourse() {
      this.ruleForm.courseInfoId = this.$route.query.id;
      this.changeCourse(this.$route.query.id);
    },
    changeFiles(file, fileList) {
      this.fileCount = fileList.length;
    },
    changeCourse(val) {
      courseInfoById(val).then(res => {
        this.currentCourse = res.data;
        this.playerOptions.sources = [
          {
            src: appConsts.serverUrl + this.currentCourse.videoPath,
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
      GuestIP().then(res => {
        this.guestIp = res.data;
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
        height: 100%;
      }
      .el-main {
        padding: 5px 10px;
        height: 100%;
      }
      .leaning-main {
        display: flex;
        flex-flow: row;
        div {
          margin-right: 10px;
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
  .link-type {
    display: block;
    width: 80%;
    word-wrap: break-word;
  }
}
.el-image {
  width: 109px;
  height: 131px;
}
.left-two-card {
  display: flex;
  flex-flow: column;
}
</style>
