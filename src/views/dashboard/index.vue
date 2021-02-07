<template>
<el-container>
  <el-main> 
    <div class="title-container">
        <h1>欢迎进入区块链学习平台</h1>
    </div>
    <div class="main-container">
      <div class="img-container">
      <el-image
      style="width: 450px; height: 450px"
      :src="require('@/assets/images/homeP.png')"
      :fit="fit"></el-image>
    </div>
     <div class="content-container">
        <span>{{ content }}</span>
    </div>
    </div>
  </el-main>
</el-container>
</template>

<script>
import { webIntroduce } from "@/api/plat-manager"
export default {
  name: 'Dashboard',
  data() {
    return {
      currentRole: 'adminDashboard',
      content: ''
    }
  },
  mounted() {
    this.getInstroduce();
  },
  methods: {
    getInstroduce() {
      webIntroduce().then(res => {
        this.content = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  .el-main {
    display: flex;
    flex-flow: column;
    padding: 150px 100px;
    .title-container {
      margin-bottom: 30px;
      h1 {
        display: block;
        margin-left: 550px;
        font-size: 45px;
        font-weight: 600;
        color: #1890ff;
        letter-spacing: 2px;
        font-family: "STHeiti";
      }
    }
    .main-container {
      display: flex;
      flex-flow: row;
      .img-container {
        margin-right: 50px;
      }
      .content-container {
        font-size: 16px;
        padding: 5px;
      }

    }
  }
}
</style>
