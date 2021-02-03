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
          :before-upload="beforeupload"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          style="margin-left:80px;">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
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
        <el-button type="primary" @click="onSubmit(form)">创建</el-button>
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
          test_doctor: ''
        },
        param:"",
        src:""
      }
    },
    methods: {
      onchange(file,filesList) {
                console.log(file);
                //创建临时的路径来展示图片
                var windowURL = window.URL || window.webkitURL;
                this.src=windowURL.createObjectURL(file.raw);
                //重新写一个表单上传的方法
                this.param = new FormData();
                this.param.append('file', file.raw, file.name);
      },
      handleRemove(file,filesList){
        this.param.delete('file')
      },
      onSubmit(){//表单提交的事件
         var names = this.form.name;
         //下面append的东西就会到form表单数据的fields中；
         this.param.append('message', names);
         let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
         //然后通过下面的方式把内容通过axios来传到后台
         //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
         this.$reqs.post("/upload", this.param, config).then(function(result) {
                  console.log(result);
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
   
</style>
