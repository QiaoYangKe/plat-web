<template>
  <el-container>
    <el-main>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入管理员内容"
        :style="inputStyle"
        v-model="form.adminContent">
      </el-input>
      
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入老师内容"
        :style="inputStyle"
        v-model="form.teacherContent">
      </el-input>
      
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入学生内容"
        :style="inputStyle"
        v-model="form.studentContent">
      </el-input>
      <el-button @click="save" style="float: right;" type="primary">保存</el-button>
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
          adminContent: '',
          teacherContent: '',
          studentContent: ''
        },
        inputStyle: {marginBottom: '20px'}
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
