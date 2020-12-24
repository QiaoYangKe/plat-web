<template>
    <el-container>
      <el-aside width="auto">
        <el-card :body-style="{width: '351px'}">
          <div class="clear-fix">
            <span class="span-class">操作手册</span>
          </div>
          <span>
            河南中盾云安信息科技有限公司（简称“中盾云安”）成立于2016年9月，是汉威科技（股票代码：300007）旗下智慧安全板块的重要成员企业，2019年度获评国家高新技术企业。中盾云安定位为区块链综合解决方案提供商，致力于依托区块链、电子签名、商用密码、5G、边缘计算等技术，打造数字经济、赋能产业发展。<br>

中盾云安是河南省首家区块链技术落地应用企业、中国区块链生态联盟区块链安全标准工作组成员单位、阿里巴巴“云合计划”的第一批合作伙伴、芝麻信用河南唯一合作伙伴、中原云统一认证服务平台重要支撑单位，曾多次参与区块链、云计算、大数据、智能制造、智慧城市等领域的课题研究、标准制订和方案论证，并承担国家教育部教育卡安全标准制订、工信部可信智能芯片、国家卫计委居民健康卡、国家工商局电子营业执照等应用的研究工作。
          </span>
        </el-card>
      </el-aside>
      <el-main>
        <el-card :body-style="{width: 'calc(100% - 600px)'}">
          <div class="clear-fix">
            <span class="span-class">课程练习</span>
          </div>
        </el-card>
      </el-main>
    </el-container>
</template>

<script>
  export default {
    name: 'CourseExercises'
  }
</script>

<style lang="scss" scoped>
  .el-container{
    padding: 6px;
    .el-aside{
      background: white;
      margin: 0;
    }
    .el-main {
      margin: 0;
      padding: 10px 0;
    }
  }
  .clear-fix{
    margin: -10px 0 20px -10px;
  .span-class {
    display: flex;
    line-height: 16px;
  }
  .span-class::before {
    content: '';
    display: inline-block;
    width: 4px;
    background: #0a76a4;
    margin-right: 4px;
  }
  }
</style>
