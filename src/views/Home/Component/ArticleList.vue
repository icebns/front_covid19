<template>
  <div class="list-content">
    <div class="list">
     <!-- 遍历文章 -->
      <router-link
        :key="item.id"
        :to="{ path: '/coursedetail', query: { video_id: item.id } }"
        class="course"
        v-for="item in ArticleList"
      >
        <div class="item_img">
          <img :src="item.article_img" />
        </div>
        <div class="video_info">
          <div class="c_title"> aaaaaaa{{ item.title }}</div> 
          <div class="price">￥ {{ item.price / 100 }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
//列表包裹层边距
.list-content {
  margin-top: 20px;
  padding: 0 13px;
}
//视频包括层
.list {
  display: flex; //设置flex布局
  flex-wrap: wrap; //换行排列
  justify-content: space-between; //两端对齐
  padding-bottom: 55px;
}
//视频个体层
.course {
  width: 98%;
  margin-bottom: 17px;
  display:flex;
}
//图片
.item_img {
  font-size: 0; //消除图片元素产生的间隙
  box-shadow: 0 4px 11px 0 rgba(43, 51, 59, 0.6); //设置图片阴影，rgba前三个参数是颜色编码，最后一个是透明度
  border-radius: 8px; //设置图片圆角
  width: 25%;
  min-width: 25%;
  margin-right: 10px;
  img {
    width: 100%;
    border-radius: 8px;
  }
}
.c_title {
  //设置超过两行隐藏 start
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
  font-size: 1.3em;
  margin-top: 10px;
  color: #2b333b;
  width: 102%;
}
//时间
.price {
  margin-top: 8px;
  font-size: 1em;
  text-align: right;
  width: 100%;
  margin-right: 15px;
}
</style>
