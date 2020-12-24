<template>
  <el-container class="page">
    <el-aside width="auto">
      <el-card class="box-card">
        <div class="clear-fix">
          <span class="span-class">添加课程</span>
        </div>
        <div class="content-class">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm form-class"
          >
            <el-form-item label="课程编号" prop="number">
              <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="课程名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="课程介绍" prop="courseProduce">
              <el-input v-model="ruleForm.courseProduce"></el-input>
            </el-form-item>
            <el-form-item label="课程人数" prop="account">
              <el-input v-model="ruleForm.account" type="number"></el-input>
            </el-form-item>
            <el-form-item label="添加班级" prop="classIds">
              <el-select
                v-model="ruleForm.classIds"
                multiple
                placeholder="请选择班级"
              >
                <el-option
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >确定</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card-right" :body-style="{ height: '100%' }">
            <div class="clear-fix">
              <span class="span-class">操作手册上传</span>
            </div>
            <div class="content-class">
              <el-image
                :src="require('@/assets/logo-icon/document.png')"
                fit="cover"
              >
              </el-image>
              <el-upload
                class="upload-demo"
                action
                :auto-upload="true"
                :http-request="uploadInstruction"
                :limit="1"
                style="float: right"
              >
                <el-button slot="trigger" size="mini" type="primary"
                  >上传</el-button
                >
              </el-upload>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card-right" :body-style="{ height: '100%' }">
            <div class="clear-fix">
              <span class="span-class">教学视频上传</span>
            </div>
            <div class="content-class">
              <div class="video-class">
                <video-player
                  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                ></video-player>
              </div>
              <uploader
                @func="getData"
                :more="true"
                :type="{
                  VMId: obj.id,
                  FilePosition: 1,
                  FileType: 1,
                  step: '1',
                }"
                :upType="['.mp4']"
              ></uploader>
              <!-- <el-upload
                class="upload-demo"
                action
                :auto-upload="true"
                :http-request="videoUpload"
                :limit="1"
                style="float: right"
              >
                <el-button slot="trigger" size="mini" type="primary"
                  >上传</el-button
                >
              </el-upload> -->
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card-right" :body-style="{ height: '100%' }">
            <div class="clear-fix">
              <span class="span-class">可视化操作</span>
            </div>
            <div class="content-class">
              <el-input v-model="ruleForm.urlExplain"></el-input>
              <el-link :href="ruleForm.urlExplain">点击进入可视化操作</el-link>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card-right" :body-style="{ height: '100%' }">
            <div class="clear-fix">
              <span class="span-class">上传题库</span>
            </div>
            <div class="content-class">
              <el-image
                :src="require('@/assets/logo-icon/document.png')"
                fit="cover"
              >
              </el-image>
              <el-upload
                class="upload-demo"
                action
                :auto-upload="true"
                :http-request="uploadTopic"
                :limit="1"
                style="float: right"
              >
                <el-button slot="trigger" size="mini" type="primary"
                  >上传</el-button
                >
              </el-upload>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {
  courseList,
  addCourse,
  updateCourse,
  updateVm,
  deleteCourse,
  courseInfoById,
  updateCourseState,
  videoUpload,
  uploadInstructions,
  uploadTopics
} from "@/api/course-info.js";
import { classInfoDic } from "@/api/class-info.js";
import { uploadUserInfo } from "@/api/user.js";
import videoImg from "@/assets/images/timg.jpg";
import appConsts from "@/appConsts.js";
import uploader from "@/components/Uploader"
export default {
  name: "CourseSetting",
  components: { uploader },
  data() {
    return {
      ruleForm: {
        id: "",
        number: "",
        name: "",
        courseProduce: "",
        classIds: [],
        account: 0,
        videoPath: "",
        instructionsPath: undefined,
        topicPath: undefined,
        urlExplain: undefined,
        vMInfoId: undefined,
      },
      obj: {
                id: '',
                vmName: '',
                vmSteps: []
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
          fullscreenToggle: true, //全屏按钮
        },
      },
      classList: [],
      rules: {
        number: [
          { required: true, message: "请输入课程编号", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请填写课程名称", trigger: "change" },
        ],
        classIds: [
          { required: true, message: "请选择班级", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.initCourse();
    this.initClassList();
  },
  methods: {
    getData() {
      console.log("getData方法")
    },
    initCourse() {
      if (this.$route.query.id != null) {
        courseInfoById(this.$route.query.id).then((res) => {
          console.log(res);
          this.ruleForm.id = res.data.id;
          this.ruleForm.account = res.data.account;
          this.ruleForm.classIds = res.data.classIdList;
          this.ruleForm.instructionsPath = res.data.instructionsPath;
          this.ruleForm.name = res.data.name;
          this.ruleForm.number = res.data.number;
          this.ruleForm.topicPath = res.data.topicPath;
          this.ruleForm.urlExplain = res.data.urlExplain;
          this.ruleForm.videoPath = res.data.videoPath;
          this.ruleForm.vmInfoId = res.data.vmInfoId;
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id !== "") {
            updateCourse(this.ruleForm).then((res) => {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            });
          } else {
            addCourse(this.ruleForm).then((res) => {
              this.$message({
                type: "success",
                message: "添加成功",
              });
              this.ruleForm = {
                id: "",
                number: "",
                name: "",
                courseProduce: "",
                classIds: [],
                account: 0,
                videoPath: "",
                instructionsPath: undefined,
                topicPath: undefined,
                urlExplain: undefined,
                vMInfoId: undefined,
              };
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    uploadInstruction(file) {
      let param = new FormData();
      param.append("files", file.file);
      uploadInstructions(param).then((res) => {
        this.ruleForm.instructionsPath = res.data;
      });
    },

    uploadTopic(file) {
      let param = new FormData();
      param.append("files", file.file);
      uploadTopics(param).then((res) => {
        this.ruleForm.topicPath = res.data;
      });
    },

    videoUpload(options) {
      // let param = new FormData();
      // param.append("files", file.file);
      // uploadUserInfo(param).then((res) => {
      //   this.ruleForm['videoPath'] = res.data;
      //   this.playerOptions.sources = [
      //       {
      //         src: appConsts.serverUrl + this.ruleForm.videoPath,
      //         type: file.type,
      //       },
      //     ];
      // });
    },
    initClassList() {
      classInfoDic().then((res) => {
        this.classList = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 1430px;
  height: 100%;
  .el-aside {
    background: white;
    margin: 10px -20px 0 0;
  }
  .el-main {
    padding-bottom: 0;
  }
}
.clear-fix {
  margin: -10px 0 20px -10px;
  .span-class {
    display: flex;
    line-height: 16px;
  }
  .span-class::before {
    content: "";
    display: inline-block;
    width: 4px;
    background: #0a76a4;
    margin-right: 4px;
  }
}
.box-card {
  width: 550px;
  height: 100%;
}
.box-card-right {
  width: calc(100% - 20px);
  height: 460px;
  margin: 0 0 10px 0;
  .video-class {
    width: 80%;
    height: auto;
  }
}
.form-class {
  margin: 40px 30px 0 10px;
  .el-form-item {
    margin: 50px 0 0 0;
  }
}

.content-class {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .upload-demo {
    margin-top: 10px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    /*width: 100%;*/
    /*align-self: start;*/
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
</style>
