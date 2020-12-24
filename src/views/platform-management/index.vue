<template>
  <el-container>
    <el-main>
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="form.content">
      </el-input>
      <el-button size="small" @click="save" type="primary">保存</el-button>
    </el-main>
  </el-container>
</template>

<script>
import { updateContent } from '@/api/plat-manager'
  export default {
    name: 'PlatformManagement',
    data() {
      return {
        form: {
          content: ''
        }
      }
    },
    methods: {
      save() {
        updateContent(this.form).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
