<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="当前实验课题" prop="courseId">
        <el-select v-model="form.courseId" placeholder="请选择课程">
          <el-option
            v-for="item in this.$props.lessonList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="反馈标题" prop="fBTitle">
        <el-input v-model="form.fBTitle"></el-input>
      </el-form-item>
      <el-form-item label="反馈内容" prop="fBContent">
        <el-input
          v-model="form.fBContent"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="附件上传">
        <el-upload
          class="upload-demo"
          action
          :auto-upload="true"
          :http-request="customUpload"
          :limit="5"
        >
          <el-button slot="trigger" size="mini" type="primary">上传</el-button>
          <div slot="tip" class="el-upload__tip">
            附件支持的格式有jpg,bmp,png,gif,txt,rar,zip,doc,docx,ini,conf,xlsx,xls
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" @click="handleClose" size="small" :disabled="benDisable"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addFeedBack, uploadFileFeedBack } from "@/api/feed-back.js";
export default {
  name: "FeedBackEdit",
  props: {
    title: {
      type: String,
      default: function () {
        return "提交反馈";
      },
    },
    lessonList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    query: {
      type: Function,
      default: function () {
        return function () {};
      },
    },
  },
  data: function () {
    return {
      form: {
        urlList: [],
        fBTitle: "",
        fBContent: "",
        courseId: ""
      },
      dialogVisible: false,
      benDisable: false,
      rules: {
        fBTitle: [
          { required: true, message: "请输入反馈标题", trigger: "blur" },
        ],
        courseId: [
          { required: true, message: "请输入反馈标题", trigger: "blur" },
        ],
        lessonPic: [
          { required: true, message: "请选择实验课题", trigger: "change" },
        ],
        fBContent: [
          { required: true, message: "请填写反馈内容", trigger: "change" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    show() {
      this.dialogVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.dialogVisible = false
    },
    handleClose(done) {
      this.$refs["form"].validate((valid) => {
        if (valid) {
            addFeedBack(this.form).then((res) => {
              this.$message({
                type: "success",
                message: "提交成功",
              });
              this.$props.query()
              this.$refs["form"].resetFields()
              this.benDisable = false
              this.dialogVisible = false
            });
        } else {
          return false;
        }
      });
    },
    customUpload(file) {
      let param = new FormData();
      param.append("files", file.file);
      uploadFileFeedBack(param).then((res) => {
        this.form.urlList.push(res.data)
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-right: 20px;
  .el-form-item {
    margin-bottom: 30px;
  }
}
.dialog-footer {
  margin-right: 20px;
}
</style>
