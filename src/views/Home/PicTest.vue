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
          :on-success="uploadSuccess"
          :action=action
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit=limit
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-col :span="4" >
            <div style="width:100%;overflow: hidden;margin-left:150px;">
                <img :src="src" alt="" style="width:100%;"/>
            </div>
        </el-col>
      </el-form-item>
      <el-form-item label="检测员">
        <el-input v-model="form.test_doctor" style="width:217px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">创建</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>

import { addTestApi } from "@/api/getData.js";
  export default {
    data() {
      return {
        form: {
          id: '',
          test_result: '',
          test_doctor: ''
        },
        param:"",
        src:"",
        limit:1,
        fileList: [],
        action:"http://localhost:8089/upload/"
      }
    },
    methods: {
      handleRemove(file, fileList) { 
        console.log(file, fileList);
        this.param.delete('file')
      },
      handlePreview(file) {
        console.log(file);
        console.log("handlePreview");
      },
      uploadSuccess (response, file, fileList) {
        // console.log(file);
        console.log(222);  
        this.src = response;
      },
      onchange(file,filesList) {
        console.log(file)
        //创建临时的路径来展示图片
        var windowURL = window.URL || window.webkitURL;
        this.src=windowURL.createObjectURL(file.raw);
        //重新写一个表单上传的方法
        this.param = new FormData();
        this.param.append('file', file.raw, file.name);
      }, 
      onSubmit(){//表单提交的事件
        let id = this.form.id;
        let test_img = this.src;
        let test_result = this.form.test_result;
        let test_doctor = this.form.test_doctor; 
        console.log(id)
        console.log(test_img)
        console.log(test_result)
        addTestApi(id, test_img,test_result,test_doctor).then(
            res => {
                if (res.data.code === 0) {
                    const toast = this.$createToast({
                    txt: "创建成功",
                    type: "correct",
                    time: 1500
                    });
                    toast.show();
                }
            }
        ); 
      }
    }
  }
</script>
<style lang="scss" scoped>
   
</style>