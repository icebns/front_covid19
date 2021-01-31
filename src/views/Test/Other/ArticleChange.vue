<template>
  <div>
    <div class="main">
    <el-table :data="showData" style="width: 100%">
      <el-table-column
        v-for="(item,i) in tableCol"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
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

  </div>
  </div>
</template>
<script>
import { getVideoList } from "@/api/getData.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      showOper:true,
      tableData: [],
      showData: [],
      tableCol: [
        { prop: "articleId", label: "文章ID", width: 80 },
        { prop: "articleTitle", label: "文章标题", width: 330 },
        { prop: "articleAuthor", label: "作者", width: 120 },
        { prop: "create_time", label: "发布时间", width: 160, sortable:true },
        { prop: "articleLevel", label: "等级", width: 80 }

      ],
      currentPage: 1, // 当前页码
      // total: , // 总条数 
      pageSize: 5 // 每页的数据条数
    };
  },
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPage = 1;
          this.pageSize = val;
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.getShowData(val);
      },
      //获取视频列表
      async getVList(){
        try{
          const result = await getVideoList();
          let along = result.data.data.length;
          let data = result.data.data; 
          for(let i = 0;i<along;i++){
            if(data[i].articleLevel=='0'){
              data[i].articleLevel="置顶"
            }else if(data[i].articleLevel=='1'){
              data[i].articleLevel="普通"
            }
          } 
          if (result.data.code == 0) {
              this.tableData = result.data.data;
          }
        }catch(error){
            console.log(error)
        }
      },
      getShowData(page){
        let first = (page-1)*this.pageSize;
        let last = page*this.pageSize-1;
        console.log(first)
        console.log(last)
        for(let i = first;i<last;i++){
          for(let j = 0;j<this.pageSize;i++){
            this.tableData[j]=this.showData[i];
            console.log(tableData[j])
          }
        }
      }
    //   getList(name = '') {
    //   this.config.loading = true
    //   // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
    //   name ? (this.config.page = 1) : ''
    //   this.$http
    //     .get('/api/v1/pub/article/list', {
    //       params: {
    //         page: this.config.page,
    //         name
    //       }
    //     })
    //     .then(res => {
    //       this.tableData = res.data.list.map(item => {
    //         item.sexLabel = item.sex === 0 ? '女' : '男'
    //         return item
    //       })
    //       this.config.total = res.data.count
    //       this.config.loading = false
    //     })
    // },
  },
  mounted(){
      //页面渲染完成调用方法获取数据 
      this.getVList();
      this.getShowData(1);
  }
};
</script>
<style lang="css" scoped>
.main{
  margin: 20px;
}
</style>