<template>
    <div class="c_wrapper">
        <!-- 核酸检测报告页 -->
        <div class="course">

            <div class="l_img">
                <img :src="articleInfo.articleImg" :title="articleInfo.title">
            </div>

            <div class="r_txt">
                <div class="title">
                <!-- <span>标题:</span> -->
                <p style="font-size: 1.8em;">{{ articleInfo.articleTitle }}</p>

                </div>
                <div class="txt">
                <!-- <span>创建时间:</span> -->
                <p>{{ articleInfo.create_time }}</p>
                </div> 
            </div> 
        </div>
        <div class="details" id="test">
            {{ articleInfo.articleContent }}
        </div>  
  </div>
</template>

<script>
    export default {
        // 从父组件核酸检测报告信息
        props: {
            articleInfo: {
                type: Object,
                required: true
            }
        },
        methods: {
            // onload(){ 
            //     // let a = document.getElementById("test").value;
            //     // console.log(a);
            //     // document.getElementById("test").innerHTML = "111";
            // }
        }, 
        mounted(){
            //页面渲染完成调用方法获取数据 
            // this.onload(); 
        }
    }
   
</script>

<style lang="scss" scoped>
 

//包裹层
.c_wrapper {
    padding: 0 14px;
}
//核酸检测报告信息包裹层
.course {
  margin:14px 0;
  display:flex;//设置flex，左右布局
}
//视频左边图片层
.l_img {
  height:88px;
  margin-right:14px;
  & img {
    height:100%;
    border-radius:5px;
  }   
}
// 右边文字包裹层
.r_txt {
    padding:6px 0;
    font-size:12px;
    flex:1;//设置1可自动伸缩占用剩余空间
}
.title {
    // 设置flex让文字两端对齐
    display:flex;
    justify-content:space-between;
    line-height:16px;
    & p { 
    line-height: 1.2em;
    overflow: hidden; 
    text-overflow: -o-ellipsis-lastline; 
    text-overflow: ellipsis; 
    display: -webkit-box; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical; 
    }
}
//每行文字层（综合评分、价格）
.txt {
    // 设置flex让文字两端对齐
    display:flex;
    justify-content:space-between;
    line-height:16px;
    & p {
        text-align:center;
        line-height: 2em;
        font-size: 1em;
        color:#3bb149;
    }   
    & i {
        color:#666;
        font-weight:bolder;
        width:60%;
        & span {
            color:#2b333b;
            font-size:12px;
        }
    }      
} 
.details{
//   margin:0 15px;
    text-indent: 2em;
}
</style>
<style>
  h1{
    font-size: 2em !important;
  }
  h2{
    font-size: 1.6em !important;
  }
  h3{
    font-size: 1.4em !important;
  }
  h4{
    font-size: 1.2em !important;
  }
  h5{
    font-size: 1.0em !important;
  }
</style>