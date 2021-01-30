<template>
  <div>
    <div class="container">
        <div class="p_top">
            <div>
                <img :src='info.head_img || defaultHeadImg' alt="头像"/>
                <router-link to="/login" v-if = "getToken === ''"> 
                <p>立刻登录</p>
                </router-link>
                <p v-else>{{info.name}} </p>  
            </div> 
        </div>
        <div class="smallbox">
           <p>用户ID：{{info.id}} </p>
           <p>手机号：{{info.phone}} </p>
           <p>最新打卡地点：{{info.newArea}} </p>
           <p>最新检测结果：{{info.newTest}} </p>
        </div>
        <div v-if="info.userLevel == '1'">
          <div class="smallbox">
            &nbsp;&nbsp;系统检测到您是管理员用户,您可以：
            <a class="" :href=adminurl>
                进入后台
            </a>
          </div>
        </div>
        <div v-else-if="info.userLevel == '0'">
            系统检测到您是检测员用户,您可以：
            <a class="" :href=adminurl>
                进入后台
            </a>
        </div>
        <div v-else>
           
        </div>
        <button v-if="getToken !== ''" class="green" @click="signOut">
            退出登录
        </button> 
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonFooter from "@/components/CommonFooter";
import { getUserInfo } from "@/api/getData.js";
import defaultHeadImg from "@/assets/logo.png";

export default {
  components: {
    CommonFooter
  },

  data() {
    return {
      info: {},
      defaultHeadImg: defaultHeadImg,
      adminurl: '/#/test'
      // adminurl: '127.0.0.1：3333'
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
          // console.log(this.info)
        }
      } catch (error) {
        console.log(error);
      }
    },

    //退出登录
    async signOut() {
      //清除token
      await this.$store.dispatch('clearToken');
      localStorage.removeItem("token");

      //刷新页面
      location.reload();
    },
    //进入后台
    async administrators() {
      //登录成功，跳转到个人中心
      localStorage.setItem('token',res.data.data)
      // console.log(res)
      this.$store.dispatch('setToken',res.data.data)

      //跳转页面, 根据业务需要
      this.$router.push({path:'/AdminHome'})

      //刷新页面
      location.reload();
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
.container {
  // 顶部头像区域
  .p_top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    background-color: #2c3f54;
    div {
      text-align: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50px;
      }
      p {
        font-size: 16px;
        color: #fff;
        margin-top: 10px;
      }
    }
  }
}
// 退出登录
.green {
  display: block;
  background-color: #3bb149;
  border: none;
  outline: none;
  width: 80%;
  height: 40px;
  margin: 20px auto 0;
  color: #fff;
  border-radius: 20px;
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
.smallbox{
  margin: 15px;
}
.smallbox p{
  padding: 15px 0;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
</style>