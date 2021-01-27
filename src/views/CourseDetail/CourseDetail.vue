<template>
  <div>  
    <!-- 列表组件 -->
    <!-- <video-list :videoList="videoList"></video-list>   -->
    <!--顶部返回组件-->
    <detail-header :articleInfo="articleInfo"></detail-header>
    <!--文章详情组件-->
    <detail-course :articleInfo="articleInfo"></detail-course>
    <!-- {{articleInfo}} -->
  </div>
</template>


<script> 
//引入组件
import DetailHeader from './Components/Header'
import DetailCourse from './Components/Course'
// import VideoList from "../Home/Component/VideoList";  
import { getArticleDetail } from "@/api/getData.js";

export default {
  //注册组件
  components: { 
    // VideoList, 
    DetailHeader,
    DetailCourse
  },
  //声明数据源
  data() {
    return { 
      articleInfo: {} 
    };
  },
  //定义方法
  methods: { 
    //获取视频列表
    async getDetail(articleId){
        try{
            const result = await getArticleDetail(articleId);
            // console.log(result);
            if (result.data.code == 0) {
                this.articleInfo = result.data.data; 
            }
        }catch(error){
            console.log(error)
        } 
    }
  },
  mounted(){
      //页面渲染完成调用方法获取数据
      this.getDetail(this.$route.query.articleId)
  }
};
</script>

<style lang="scss" scoped></style>
