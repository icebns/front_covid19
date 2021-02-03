<template>
  <div>
    <div class="main">
      <el-input placeholder="输入关键字搜索" v-model="search">
      <el-button slot="append" icon="el-icon-search" @click="searchData()"></el-button>
    </el-input>
    <el-table :data="showData" style="width: 100%">
      <el-table-column
        v-for="(item,i) in tableCol"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        :column-key="item.columnKey"
        :filters="item.filters"
        :filter-method="item.filterMethod"
      ></el-table-column>
       <el-table-column label="操作" v-if="showOper" width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" style="margin-top:15px;">
        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
        :current-page="currentPage" 
        :page-sizes="[1,5,10,20]" 
        :page-size="pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="tableData.length">
        </el-pagination>
    </div>

    <!--弹框-->
    <div>    
<el-dialog title="编辑" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名:" :disabled="true"> 
      <!-- {{form.name}} -->
      <el-input
        placeholder="输入ID自动查询"
        v-model="form.name"
        :disabled="true"
        style="width:217px">
      </el-input>
      <!-- <el-input v-model="form.name" autocomplete="off" readonly="true"></el-input> -->
    </el-form-item>
    <el-form-item label="性别:" style="display: flex;">
      <el-input v-model="form.sex" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄:" style="display: flex;">
      <el-input v-model="form.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="感染源:">
      <el-select v-model="form.source" placeholder="请选择">
        <el-option label="接触感染" value="接触感染"></el-option>
        <el-option label="境外输入" value="境外输入"></el-option> 
        <el-option label="无症状感染" value="无症状感染"></el-option> 
      </el-select>
    </el-form-item>
    <el-form-item label="健康状态:">
      <el-select v-model="form.state" placeholder="请选择">
        <el-option label="轻型" value="轻型"></el-option>
        <el-option label="普通型" value="普通型"></el-option>
        <el-option label="重型" value="重型"></el-option> 
        <el-option label="死亡" value="死亡"></el-option> 
        <el-option label="康复" value="康复"></el-option> 
      </el-select>
    </el-form-item>
    <el-form-item label="行动轨迹:">
      <el-input
          type="textarea"
          placeholder="暂无，请输入"
          v-model="form.way"
          maxlength="300"
          show-word-limit
          style="width:500px"
        ></el-input>
    </el-form-item>
    <el-form-item label="隔离点:" style="display: flex;">
      <el-input v-model="form.hospital" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitChange(form)">修 改</el-button>
  </div>
</el-dialog>
    </div>
  </div>
  </div>
</template>
<script>
import { getPatientList,changePatientApi,deletePatientApi } from "@/api/getData.js";
export default {
  inject: ['reload'],
  // name: "HelloWorld",
  data() {
    return {
      search:"",
      showOper:true,
      tableData: [],
      showData: [], 
      filterData: [],
      tableCol: [
        { prop: "patientId", label: "隔离患者ID", width: 90 },
        { prop: "name", label: "姓名", width: 100 },
        { prop: "sex", label: "性别", width: 200 },
        { prop: "age", label: "年龄", width: 80, columnKey:"age", sortable:true },
        { prop: "source", label: "感染源", width: 120},
        { prop: "state", label: "健康状态", width: 80},
        { prop: "hospital", label: "隔离点", width: 160 }
      ],
      form: {
        patient_id: '',
        name: '',
        sex: '',
        age: '',
        source:'',
        state:'',
        way:'',
        hospital:''
      },
      dialogFormVisible:false,
      currentPage: 1, // 当前页码
      // total: , // 总条数 
      pageSize: 5 // 每页的数据条数
    };
  },
  methods: {
      submitChange(form){
        console.log(form)
        changePatientApi(form.patientId,form.sex,form.age,form.source,form.state,form.way,form.hospital).then(
            res => {
                if (res.data.code === 0) {
                  const toast = this.$createToast({
                  txt: "修改成功",
                  type: "correct",
                  time: 1500
                  });
                  toast.show();
                }
            }
        ); 
        this.dialogFormVisible = false;
      }, 
      async searchData(){
        try{ 
          let _this = this;
          let keyWord = this.search;
          const result = await getPatientList();
          let data = result.data.data; 
          console.log(data)
          _this.filterData=[];  
          // _this.filterData=_this.filterData.concat(data.filter(item => (item.name).indexOf(keyWord) > -1)); 
          // _this.filterData=_this.filterData.concat(data.filter(item => (item.state).indexOf(keyWord) > -1)); 
          _this.filterData=_this.filterData.concat(data.filter(item => (item.hospital||item.name).indexOf(keyWord) > -1));
          // console.log(_this.filterData)
          let page=1;
          let pageSize=20;
          let along = _this.filterData.length; 
          let last = along-1; 
          let lastpage = parseInt(along/_this.pageSize)+1;
          let dlong = along%_this.pageSize;  
          _this.showData=[]; 
          let first = (page-1)*_this.pageSize;
          if(page!=lastpage){ 
            last = page*_this.pageSize-1;
            dlong = _this.pageSize;
          }
          for(let i = first;i<last+1;i++){ 
            _this.showData=_this.showData.concat(_this.filterData[i]);
          } 
        }catch(error){
            console.log(error)
        }
      },
     
      handleEdit(index, row) {
        // console.log(index, row);
        this.form = row; 
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deletePatientApi(row.patientId).then(
            res => {
                if (res.data.code === 0) {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
            } 
          );
          this.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.currentPage = 1;
          this.pageSize = val;
          this.getShowData(1); 
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.getShowData(val);
      },
      //获取列表
      async getRList(){
        try{
          const result = await getPatientList();
          let along = result.data.data.length;
          let data = result.data.data; 
          if (result.data.code == 0) {
              this.tableData = result.data.data; 
          }
        }catch(error){
            console.log(error)
        }
      },
      async getShowData(page){
        try{  
          let _this = this;
          const result = await getPatientList();
          let along = result.data.data.length; 
          let last = along-1;
          let data = result.data.data; 
          let lastpage = parseInt(along/_this.pageSize)+1;
          let dlong = along%_this.pageSize; 
          _this.showData=[]; 
          let first = (page-1)*_this.pageSize;
          if(page!=lastpage){ 
            last = page*_this.pageSize-1;
            dlong = _this.pageSize;
          }
          for(let i = first;i<last+1;i++){ 
            _this.showData=_this.showData.concat(data[i]);
          } 
        }catch(error){
            console.log(error)
        }
      },
      async getFileter(){
        try{
          const filters = tableCol.filters;
          console.log(filters)
          // if (filters != 0) {
          //     this.tableData = result.data.data; 
          // }
        }catch(error){
            console.log(error)
        }
      }
  },
  mounted(){
      //页面渲染完成调用方法获取数据 
      this.getRList();
      this.getFileter();
      this.getShowData(1);
  }
};
</script>
<style lang="css" scoped>
.main{
  margin: 20px;
}
</style>