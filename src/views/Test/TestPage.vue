<template>
  <div>
    <div class="container">
        <div v-if="info.userLevel == null">
          <div class="p_top">
              <div>
                  <img :src='info.head_img || defaultHeadImg' alt="头像"/>
                  <router-link to="/login" v-if = "getToken === ''"> 
                  <p>立刻登录</p>
                  </router-link>
                  <p v-else>{{info.name}} </p>  
              </div> 
          </div>
        </div>
        <div v-else-if="info.userLevel == '1'">
          <div class="">
            <!-- 欢迎您，管理员用户！ -->
            <common-header :info="info"></common-header>
            <el-container>
            <common-aside></common-aside>
            <!-- <common-tab></common-tab> -->
            <!-- <user-manage></user-manage> -->
            <!-- <page-one></page-one> -->
            <article-add></article-add>
            </el-container>
          </div>
        </div>
        <div v-else-if="info.userLevel == '0'">
          <div class="">
            <!-- 欢迎您，管理员用户！ -->
            <common-header :info="info"></common-header>
            <el-container>
            <common-aside></common-aside>
            <!-- <common-tab></common-tab> -->
            <!-- <user-manage></user-manage> -->
            <page-one></page-one>
            </el-container>
          </div>
        </div>
        <div v-else>
          <div class="bgblack">
            &nbsp;&nbsp;系统检测到您是普通用户,您可以：
            <a class="" :href=adminurl>
                返回用户端
            </a>
            或
            <a v-if="getToken !== ''" class="" @click="signOut">
                退出登录
            </a> 
          </div>
        </div> 
    </div>
    <common-form></common-form>
  </div>
</template>

<script>
import CommonHeader from './Components/CommonHeader'
import CommonAside from "./Components/CommonAside";
import CommonTab from "./Components/CommonTab"; 
import CommonForm from "./Components/CommonForm";
import { getUserInfo } from "@/api/getData.js";
import defaultHeadImg from "@/assets/logo.png"; 
// import UserManage from './UserManage/UserManage.vue';
import PageOne from "./Other/PageOne"; 
import ArticleAdd from "./Other/ArticleAdd"; 

export default {
  components: {
    CommonForm,
    CommonAside,
    CommonHeader,
    CommonTab,
    PageOne,
    ArticleAdd
    // UserManage
  },
    data() {
    return {
      info: {},
      defaultHeadImg: defaultHeadImg 
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