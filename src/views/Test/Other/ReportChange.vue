<template>
  <div>
    <div class="main">
      <el-input placeholder="请输入姓名或地址搜索" v-model="search">
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
    <el-form-item label="地址:" style="display: flex;">
      <el-input v-model="form.home" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="体温:">
      <el-select v-model="form.temperature" placeholder="请选择">
        <el-option label="35.9℃" value="35.9℃"></el-option>
        <el-option label="36.0℃" value="36.0℃"></el-option>
        <el-option label="36.1℃" value="36.1℃"></el-option>
        <el-option label="36.2℃" value="36.2℃"></el-option>
        <el-option label="36.3℃" value="36.3℃"></el-option>
        <el-option label="36.4℃" value="36.4℃"></el-option>
        <el-option label="36.5℃" value="36.5℃"></el-option>
        <el-option label="36.6℃" value="36.6℃"></el-option>
        <el-option label="36.7℃" value="36.7℃"></el-option>
        <el-option label="36.8℃" value="36.8℃"></el-option>
        <el-option label="36.9℃" value="36.9℃"></el-option>
        <el-option label="37.0℃" value="37.0℃"></el-option>
        <el-option label="37.1℃" value="37.1℃"></el-option>
        <el-option label="37.2℃" value="37.2℃"></el-option>
        <el-option label="37.3℃及以上" value="37.3℃及以上"></el-option>
      </el-select>
    </el-form-item> 
    <el-form-item label="与患者接触:">
      <el-select v-model="form.goOut" placeholder="请选择">
        <el-option label="是" value="是"></el-option>
        <el-option label="否" value="否"></el-option> 
      </el-select>
    </el-form-item>
    <el-form-item label="外出情况:">
      <el-select v-model="form.contact" placeholder="请选择">
        <el-option label="是" value="是"></el-option>
        <el-option label="否" value="否"></el-option>
        <el-option label="不确定" value="不确定"></el-option> 
      </el-select>
    </el-form-item>
    <el-form-item label="健康状况:">
      <el-select v-model="form.health" placeholder="请选择">
        <el-option label="良好" value="良好"></el-option>
        <el-option label="一般" value="一般"></el-option>
        <el-option label="较差" value="较差"></el-option>
        <el-option label="非常差，需要就医" value="非常差，需要就医"></el-option> 
      </el-select>
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
import { getAllReportList,changeReportApi,deleteReportApi } from "@/api/getData.js";
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
        { prop: "reportId", label: "上报ID", width: 90 ,columnKey:"reportId", sortable:true },
        { prop: "name", label: "用户姓名", width: 100 },
        { prop: "home", label: "地址", width: 200 },
        { prop: "temperature", label: "体温", width: 80, columnKey:"temperature", sortable:true },
        { prop: "contact", label: "与患者接触", width: 120, columnKey:"contact", sortable:true},
        { prop: "goOut", label: "外出", width: 80, columnKey:"go_out", sortable:true},
        { prop: "health", label: "健康状况", width: 90},
        { prop: "create_time", label: "填报时间", width: 160, columnKey:"create_time", sortable:true } 
      ],
      form: {
        name: '',
        home: '',
        temperature: '',
        goOut:'',
        contact:'',
        health:''
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
        changeReportApi(form.reportId,form.home,form.temperature,form.contact,form.goOut,form.health).then(
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
          const result = await getAllReportList();
          let data = result.data.data; 
          _this.filterData=[];  
          // _this.filterData=_this.filterData.concat(data.filter(item => (item.health).indexOf(keyWord) > -1)); 
          // _this.filterData=_this.filterData.concat(data.filter(item => (item.goOut).indexOf(keyWord) > -1)); 
          _this.filterData=_this.filterData.concat(data.filter(item => (item.home).indexOf(keyWord) > -1));
          _this.filterData=_this.filterData.concat(data.filter(item => (item.name||item.home).indexOf(keyWord) > -1));
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
          deleteReportApi(row.reportId).then(
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
          const result = await getAllReportList();
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
          const result = await getAllReportList();
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