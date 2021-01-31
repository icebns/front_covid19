<template>
  <el-main>
      <el-table :data="videoList">
        <el-table-column prop="article_id" label="文章ID" width="80">
        </el-table-column>
        <el-table-column prop="article_title" label="文章标题" width="340">
        </el-table-column>
        <el-table-column prop="article_author" label="作者" width="100">
        </el-table-column>
        <el-table-column
          prop="article_time"
          label="发布时间"
          sortable
          width="160" 
        > 
        </el-table-column> 
        <el-table-column v-if="article_level == '0'" prop="zd" label="等级" width="80">
        </el-table-column>
        <el-table-column v-else prop="fzd" label="等级" width="80">
        </el-table-column>
        <el-table-column prop="article" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" v-if="article_level == '0'">取消置顶</el-button>
            <el-button type="text" size="small" v-else>置顶</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
</template>

<script>
  export default {
    // data() {
    //   const item = {
    //     article_id: '1',
    //     article_title: '轨迹公布轨迹公布轨迹公布', 
    //     article_author: '王小虎',
    //     article_time: '2021-01-13 14:14:27',
    //     article_level: '1',
    //     article: '置顶',
    //     zd:'置顶',
    //     fzd:'非置顶'
    //   };
    //   return {
    //     tableData: Array(20).fill(item)
    //   }
    // }
    data() {
      return { 
        videoList: [],
        article_level:0
        // tableData: fill(videoList)
      };
    },
    //定义方法
    methods: {
 
      //获取视频列表
      async getVList(){
          try{
              const result = await getVideoList();
              console.log(result);
              if (result.data.code == 0) {
                  this.videoList = result.data.data;
              }
          }catch(error){
              console.log(error)
          }
      }
    },
    mounted(){
        //页面渲染完成调用方法获取数据 
        this.getVList()
    }
  };
</script>
<style lang="scss" scoped></style>
