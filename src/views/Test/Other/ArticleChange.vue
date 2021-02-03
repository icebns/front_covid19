<template>
  <div>
    <div class="main">
      <el-input placeholder="请输入搜索内容" v-model="search">
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
    <el-form-item label="文章标题">
      <el-input v-model="form.articleTitle" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="作者（出处）">
      <el-input v-model="form.articleAuthor" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="是否置顶">
      <el-select v-model="form.articleLevel" placeholder="请选择">
        <el-option label="置顶" value="0"></el-option>
        <el-option label="普通" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章分类">
      <el-select v-model="form.articleImg" placeholder="请选择">
        <el-option label="防控通告" value="https://a13.fp.ps.netease.com/file/6010fec46f04942c2f5af007iUlS2tdU03"></el-option>
        <el-option label="轨迹公布" value="https://a13.fp.ps.netease.com/file/6010fcc98b74277e6644f579frWKrezW03"></el-option>
        <el-option label="其他资讯" value="https://a13.fp.ps.netease.com/file/60110802143cfa51b4cdb3e48NRGaZjy03"></el-option>
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
import { getVideoList,changeArticleApi,deleteArticleApi } from "@/api/getData.js";
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
        { prop: "articleId", label: "文章ID", width: 80 },
        { prop: "articleTitle", label: "文章标题", width: 330 },
        { prop: "articleAuthor", label: "作者", width: 120 },
        { prop: "create_time", label: "发布时间", width: 160, sortable:true },
        { prop: "articleLevel", label: "等级", width: 80 } 
      ],
      form: {
        articleTitle: '',
        articleAuthor: '',
        articleLevel: '',
        articleImg:''
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
        //article_author, article_title, article_img, article_content, article_level
        if(form.articleLevel=="普通"){
          form.articleLevel="1" 
        }else if(form.articleLevel=="置顶"){
          form.articleLevel="0" 
        }
        changeArticleApi(form.articleId, form.articleAuthor,form.articleTitle,form.articleImg,form.articleContent,form.articleLevel).then(
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
        if(form.articleLevel=="1"){
          form.articleLevel="普通" 
        }else if(form.articleLevel=="0"){
          form.articleLevel="置顶" 
        }
        this.dialogFormVisible = false;
      },
      // fuzzyQuery(list, keyWord) {
      //   let arr = [];
      //   for (let i = 0; i < list.length; i++) {
      //     if (list[i].match(keyWord) != null) {
      //       arr.push(list[i]);
      //     }
      //   }
      //   return arr;
      // },
      async searchData(){
        try{ 
          let _this = this;
          let keyWord = this.search;
          const result = await getVideoList();
          let data = result.data.data; 
          _this.filterData=[];  
          _this.filterData=_this.filterData.concat(data.filter(item => (item.articleTitle).indexOf(keyWord) > -1)); 
          _this.filterData=_this.filterData.concat(data.filter(item => (item.articleAuthor).indexOf(keyWord) > -1)); 
          _this.filterData=_this.filterData.concat(data.filter(item => (item.create_time).indexOf(keyWord) > -1));
          // console.log(_this.filterData)
          let page=1;
          let pageSize=20;
          let along = _this.filterData.length; 
          let last = along-1; 
          let lastpage = parseInt(along/_this.pageSize)+1;
          let dlong = along%_this.pageSize; 
          for(let i = 0;i<along;i++){
            if(_this.filterData[i].articleLevel=='0'){
              _this.filterData[i].articleLevel="置顶"
            }else if(_this.filterData[i].articleLevel=='1'){
              _this.filterData[i].articleLevel="普通"
            }
          } 
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
        if(this.form.articleLevel=='0'){
          this.form.articleLevel="置顶"
        }else{
          this.form.articleLevel="普通"
        }
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deleteArticleApi(row.articleId).then(
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
      async getShowData(page){
        try{  
          let _this = this;
          const result = await getVideoList();
          let along = result.data.data.length; 
          let last = along-1;
          let data = result.data.data;  
          for(let i = 0;i<along;i++){
            if(data[i].articleLevel=='0'){
              data[i].articleLevel="置顶"
            }else if(data[i].articleLevel=='1'){
              data[i].articleLevel="普通"
            }
          } 
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