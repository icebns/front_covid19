<template>
  <el-main>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户ID">
        <el-input v-model="form.id" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="年龄">
        <el-input v-model="form.age" style="width:200px"></el-input>
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
        >
        </el-input>
      </el-form-item>
      <el-form-item label="隔离点">
        <el-input v-model="form.hospital" style="width:200px"></el-input>
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
          sex: '',
          age: '',
          source: '',
          state: '',
          way: '',
          hospital: ''
        }
      }
    },
    methods: {
      onSubmit(form) {
        console.log('submit!');
        console.log(form);
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
    }
  }
</script>
<style lang="scss" scoped>
   
</style>
