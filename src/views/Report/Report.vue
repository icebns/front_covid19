<template>
  <div>
    <div class="main"> 
        <!--订单列表-->
        <div class="list" v-if="report.length > 0">
            <cube-form-group>
                <cube-button @click="reportUp()">打卡</cube-button>
            </cube-form-group>
            <!-- <cube-form-group class="titbox">
                <p class="tit"> 打卡记录：</p>
            </cube-form-group> -->
            <div class="box" v-for="(item, index) of report" :key="index">
                <router-link :to="{path:'/coursedetail', query:{ video_id : item.video_id }}">
                    <div class="smallbox">
                        
                        <!-- <div class="imgdiv">
                            <img :src="item.video_img" alt="图片"/>
                        </div> -->

                        <div class="textdiv">
                            <p class="title">{{item.create_time}} -------<span class="palces">{{item.home}}</span></p>
                            <!-- <p class="price"> </p> -->
                        </div>

                    </div>
                </router-link>
            </div>
            
            
        </div>

        <div class="no_order" v-else>
            <p>暂未有打卡记录 </p>
            <cube-form-group>
                <cube-button @click="reportUp()" class="no_order_btn">打卡</cube-button>
            </cube-form-group>
            
        </div>

    <!--底部导航-->
        <common-footer></common-footer>

    </div>
  </div>
</template>

<script>
import CommonFooter from "@/components/CommonFooter"; 
import defaultHeadImg from "@/assets/logo.png"; 
import { getReportList,getUserInfo } from "@/api/getData.js"; 

export default {
  components: {
    CommonFooter
  },

  data() {
    return {
      info: {},
      report:[]
    };
  },

  computed: {
    getToken() {
      return this.$store.state.token;
    }
  },

  methods: {
    //获取用户信息
    async getInfo() {
      try {
        const result = await getUserInfo(this.getToken);
        if (result.data.code === 0) {
          this.info = result.data.data;
        //   console.log(this.info);
          try{
            const result =  await getReportList(this.info.id)
                if(result.data.code == 0){
                    console.log(result.data.data);
                    this.report = result.data.data || [];
                } 
            }catch(error){
                console.log(error)
            }
        }
      } catch (error) {
        console.log(error);
      }
    }, 
    reportUp:function () {
        this.$router.push('./reportup');
    }
   
  },

  mounted() {
    if (this.getToken) { 
    this.getInfo();
    } 
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding: 0 20px;
}
.titbox{
    border-bottom: solid 1px #DDD;
}
.tit{
    margin: 20px 0 0 10px;
    font-size: 1.1em;
}
button{
    margin: 20px 0 0;
}
// 视频个体
.box {
  padding: 5px 0 0px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  // 标题
  .title {
    font-size: 14px;
    margin-bottom: 15px;
  }
  // 详情
  .smallbox {
    //flex左右排列，两端对齐
    display: flex;
    justify-content: space-between;
    .imgdiv {
      width: 90px;
      height: 60px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .textdiv p {
      margin-top: 10px;
      padding-left: 10px;
    }
  }
}

.no_order {
  margin-top: 50px;
  text-align: center;
}
.palces{
    text-align: right;
}
.bgblack{
    position: fixed;
    box-sizing: border-box;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.85);
    color: rgb(232, 232, 232);
    font-family: Menlo, Consolas, monospace;
    font-size: large;
    padding: 2rem;
    line-height: 1.2;
    white-space: pre-wrap;
    overflow: auto;
}
.formbox{
    margin: 20px;
    border-radius: 2px;
    padding:5px;
    background: #fff;
}
.btnclass{
    display: block;
    margin: 0;
    padding: 17px 16px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    color: #fff;
    background: #4a4c5b;
    outline: none;
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
.no_order_btn{
    margin: 5%;
    width: 90%;
}
</style>