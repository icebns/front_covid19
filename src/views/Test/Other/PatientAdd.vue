<template>
  <el-main>
    <el-form ref="form" :model="form" label-width="80px"> 
      <el-form-item label="用户ID">
        <el-input v-model="form.id" style="width:500px" v-on:input="searchName(form.id)"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
          placeholder="输入ID自动查询"
          v-model="searchData"
          :disabled="true"
          style="width:217px">
        </el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="年龄">
        <el-input v-model="form.age" style="width:217px"></el-input>
      </el-form-item> 
      <el-form-item label="感染源">
        <el-select v-model="form.source" placeholder="请选择">
          <el-option label="接触感染" value="接触感染"></el-option>
          <el-option label="境外输入" value="境外输入"></el-option>
          <el-option label="无症状感染" value="无症状感染"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="健康状态">
        <el-select v-model="form.state" placeholder="请选择">
          <el-option label="轻型" value="轻型"></el-option>
          <el-option label="普通型" value="普通型"></el-option>
          <el-option label="重型" value="重型"></el-option>
          <el-option label="危重型" value="危重型"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="行动轨迹">
        <el-input
          type="textarea"
          placeholder="请输入"
          v-model="form.way"
          maxlength="300"
          show-word-limit
          style="width:500px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="隔离点">
        <el-input v-model="form.hospital" style="width:217px"></el-input>
      </el-form-item> 
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">创建</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { getNameList,addPatientApi,getPatientList } from "@/api/getData.js";
  export default {
    data() {
      return {
        NameData:[],
        searchData:'',
        form: {
          id: '',
          sex: '',
          age: '',
          source: '',
          state: '',
          way: '',
          hospital: ''
        },
        PatientList:[]
      }
    },
    methods: {
      onSubmit(form) {
        let _this = this; 
        let along = _this.PatientList.length; 
        let putok = 0;
        // console.log(_this.NameData[1].id)
        for(let i = 0;i<along;i++){
          if(form.id==_this.PatientList[i].id){
            putok=1; 
            const toast = this.$createToast({
              txt: "隔离患者已存在，请检查",
              type: "warn",
              time: 1500
            });
            toast.show(); 
          }
        }
        if(putok=0){ 
          addPatientApi(form.id, form.sex,form.age,form.source,form.state,form.way,form.hospital).then(
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
      },
        //获取姓名列表
      async getNList(){
          try{
              const result = await getNameList(); 
              if (result.data.code == 0) {
                this.NameData = result.data.data; 
              }
          }catch(error){
              console.log(error)
          }
      }, 
      //获取病例列表，以校验是否重复添加用户
      async getPList(){
          try{
              const result = await getPatientList(); 
              if (result.data.code == 0) {
                this.PatientList = result.data.data; 
              }
          }catch(error){
              console.log(error)
          }
      }, 
      async searchName(uid){
        try{
          // console.log(uid)
          let _this = this; 
          let along = _this.NameData.length; 
          // console.log(_this.NameData[1].id)
          for(let i = 0;i<along;i++){
            if(this.NameData[i].id==uid){
              // console.log(this.NameData[i].name);
              this.searchData=this.NameData[i].name;
            }
          } 
        }catch(error){
            console.log(error)
        }
      },
    },
    mounted(){
      //页面渲染完成调用方法获取数据 
      this.getNList();
      this.getPList();
    } 
  }
</script>
<style lang="scss" scoped>
   
</style>
