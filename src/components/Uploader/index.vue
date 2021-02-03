<template>
  <uploader
    :options="options"
    :autoStart="false"
    :fileStatusText="fileStatusText"
    :parseTimeRemaining="parseTimeRemaining"
    ref="uploader"
    @file-added="onAdd"
    @file-success="onSuccess"
    @file-progress="onProgress"
    @file-error="onError"
    @fileRemoved="removeFile"
    class="uploader-example"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <uploader-btn>选择文件</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>
<script>
import SparkMD5 from "spark-md5";
import { appConsts } from "@/appConsts";
import { fileMerge } from "@/api/course-info";
import store from "@/store";
export default {
  props: ["upType", "more"],
  data: function () {
    return {
      appConsts: appConsts,
      loading: "",
      bar: 0,
      //下面是文件上传
      options: {
        target: "", // 目标上传 URL，可以是字符串也可以是函数，如果是函数的话，则会传入 Uploader.File 实例、当前块 Uploader.Chunk 以及是否是测试模式，默认值为 '/'
        fileParameterName: "FileName", //文件参数名称
        singleFile: true, //单文件模式,每次覆盖
        withCredentials: true, //携带cookies
        maxChunckRetries: 3, //最大自动失败重试上传次数
        testChunks: true, // 是否测试每个块是否在服务端已经上传了，主要用来实现秒传、跨浏览器上传等，默认true(是否开启服务器分片校验)
        simultaneousUploads: 1, // 并发上传数，默认3
        chunkSize: 4 * 1024 * 1024, // 分块时按照该值来分。最后一个上传块的大小是可能是大于等于1倍的这个值但是小于两倍的这个值大小，默认 110241024
        // 服务器分片校验函数，秒传及断点续传基础
        checkChunkUploadedByResponse: (chunk, message) => {
          console.log('回调函数', chunk, message)
          let objMessage = JSON.parse(message)
          if (objMessage.state !== 200) {
            this.$message.error("上传失败")
            throw " "
          }
          return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
        },
        headers: {
          Authorization: "Bearer " + store.getters.token,
          AccessControlAllowOrigin: "*"
        },
        panelShow: false,
      },
      attrs: {
        accept: [],
      },
      fileStatusText: {
        success: "上传成功",
        error: "上传失败",
        uploading: "上传中...",
        paused: "暂停",
        waiting: "等待...",
      },
      parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
        return parsedTimeRemaining
          .replace(/\sminutes?/, "分钟")
          .replace(/\sseconds?/, "秒");
      },
    };
  },
  created() {
    this.attrs.accept = !this.upType ? [] : this.upType;
    this.options.singleFile = this.more;
    this.options.target =
      this.appConsts.uploadUrl + "/api/CourseInfo/ChunkUpload";
  },
  methods: {
    //添加文件
    onAdd(file) {
      const name = file.name
      //截取后缀,判断是否包含,不包含不让上传
      if (
        this.upType.length !== 0 &&
        this.upType.indexOf(name.substring(name.lastIndexOf("."))) === -1
      ) {
        //取消上传
        file.cancel()
        //格式错误
        this.$message.error("格式错误,请上传正确的格式");
      } else {
        // 计算MD5，下文会提到
        this.computeMD5(file)
      }
    },
    // 文件进度的回调
    onProgress(rootFile, file, chunk) {
      this.bar = parseInt((chunk.startByte / chunk.file.size) * 100)
    },
    //上传成功
    onSuccess(rootFile, file, response, chunk) {
      let res = JSON.parse(response);
      let dataPost = {
        fileName: file.name,
        totalChunks: parseInt(chunk.offset + 1),
        Identifier: file.uniqueIdentifier,
      };
      console.log('file success',res);
      if (res.data) {
        this.loading = this.$loading({
          lock: true,
          text: "合并中,请稍后操作...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        fileMerge(dataPost)
          .then((res) => {
            console.log('filemerge',res)
            if (res.state === 200) {
              this.$emit("func", res.data);
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          })
          .finally(() => {
            this.loading.close();
          });
      }
    },
    removeFile(file) {
      console.log("file :", file);
    },
    //上传失败
    onError(rootFile, file, response, chunk) {
      console.log(error.message);
    },
    //  计算md5，实现断点续传及秒传
    computeMD5(file) {
      let fileReader = new FileReader();
      let md5 = "";
      file.pause();
      fileReader.readAsArrayBuffer(file.file);
      fileReader.onload = (e) => {
        if (file.size !== e.target.result.byteLength) {
          this.$message.error('读取文件失败');
          return;
        }
        md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
        file.uniqueIdentifier = md5;
        file.resume();
      };
      fileReader.onerror = function () {
        this.$message.error('读取文件失败');
      };
    },
  },
};
</script>
<style scoped lang="scss">
.uploader-example {
  padding: 0;
}
.uploader-drop {
  padding-top: 0;
  background: white;
  border: none;
}
.uploader-btn {
  margin-top: 10px;
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  background: #2c92f1;
  border-color: #1682e6;
  color: #ffffff;
  outline: none;
}
.uploader-btn:hover {
  background: #4499e9;
}
.uploader-list {
  max-height: 440px;
  width: 100%;
}
</style>
