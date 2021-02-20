<template>
  <div>
    <div class="main">
      <el-input placeholder="输入姓名、检测结果或检测员关键词搜索" v-model="search">
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
          @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
<el-dialog title="查看电子报告单" :visible.sync="dialogFormVisible">
  <img :src="form.testImg" style="width: 100%;">
</el-dialog>
    </div>
  </div>
  </div>
</template>
<script>
import { getTestList,changeTestApi,deleteTestApi } from "@/api/getData.js";
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
        { prop: "testId", label: "检测报告ID", width: 120, columnKey:"testId", sortable:true }, 
        { prop: "id", label: "用户ID", width: 100, columnKey:"id", sortable:true },
        { prop: "name", label: "姓名", width: 100 },
        { prop: "testResult", label: "检测结果", width: 100},
        { prop: "testDoctor", label: "检测员", width: 100 },
        { prop: "create_time", label: "检测时间", width: 160, columnKey:"create_time", sortable:true } 
      ],
      form: {
        testId: '',
        id: '',
        testResult: '',
        testDoctor: '', 
        testImg:'' 
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
        changeTestApi(form.id, form.test_id, form.test_img, form.test_result, form.test_doctor).then(
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
          const result = await getTestList();
          let data = result.data.data; 
          console.log(data)
          _this.filterData=[];  
          _this.filterData=_this.filterData.concat(data.filter(item => (item.testDoctor).indexOf(keyWord) > -1)); 
          _this.filterData=_this.filterData.concat(data.filter(item => (item.name||item.testResult).indexOf(keyWord) > -1));
          // _this.filterData=_this.filterData.concat(data.filter(item => (item.name).indexOf(keyWord) > -1));
          // console.log(_this.filterData)
          let page=1;
          let pageSize=20;
          this.pageSize = 20;
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
          deleteTestApi(row.testId).then(
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
          const result = await getTestList();
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
          const result = await getTestList();
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