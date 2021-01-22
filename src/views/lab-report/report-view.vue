<template>
  <div>
    <iframe
      v-for="(src, index) in srcs"
      :key="index"
      :src="appConsts.serverUrlWithSplit + src"
      frameborder="0"
      width="100%"
      height="1000px"
    ></iframe>
  </div>
</template>
<script>
import { appConsts } from "@/appConsts";
import { viewScoreInfoForPDF } from "@/api/lab-report.js";
export default {
  name: "ReportView",
  data: function () {
    return {
      srcs: [],
      appConsts: appConsts,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let { fileList } = this.$route.query;
      if (!Array.isArray(fileList)) {
        let temp = []
        temp.push(fileList)
        fileList = temp
      }
      for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].indexOf(".pdf") != -1) {
            this.srcs.push(fileList[i]);
          } else {
            //转pdf 存路径
            console.log(fileList[i]);
            await viewScoreInfoForPDF({ srcPath: fileList[i] }).then((res) => {
              this.srcs.push(res.data);
            });
          }
        }
    },
  },
};
</script>
<style scoped>
</style>