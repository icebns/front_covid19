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
    },
    
    onloadd(){ 
        let c = document.getElementById("test").innerHTML;
        if(c!=null){
          c=c.replace(/&lt;/g,"<");//替换里面所有的转义
          c=c.replace(/&nbsp;/g," ");
          c=c.replace(/&gt;/g,">");
          document.getElementById("test").innerHTML = c; 
        }
        console.log(c)

    }
  },
  mounted(){
      //页面渲染完成调用方法获取数据
      // this.getDetail(this.$route.query.articleId);
      // this.onloadd(); 
      this.getDetail(this.$route.query.articleId).then(val => {
  　　　　this.onloadd(); 
  　　});
  }
};
</script>

<style lang="scss" scoped>
  h1{
    font-size: 2em !important;
  }
  h2{
    font-size: 1.6em !important;
  }
  .ql-indent-1{
    text-indent:4em !important;
  }


</style>
