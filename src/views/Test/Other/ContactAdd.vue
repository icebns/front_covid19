<template>
  <el-main>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户ID">
        <el-input v-model="form.id" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="检测结果">
        <el-select v-model="form.test_result" placeholder="请选择检测结果">
          <el-option label="阴性" value="阴性"></el-option>
          <el-option label="阳性" value="阳性"></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="电子报告">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          v-model="form.test_img">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">可以拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且仅限一张</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="检测员">
        <el-input v-model="form.test_doctor" style="width:217px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id: '',
          test_result: '',
          test_img: '',
          test_doctor: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss" scoped>
   
</style>
