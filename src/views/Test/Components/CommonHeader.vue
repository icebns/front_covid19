<template>
  <header>
    <div class="l-content"> 
      <!-- <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button> -->
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb> -->
      <div v-if="info.userLevel == '1'">
          <div class="">
            疫情防控管理系统-管理员端
          </div>
        </div>
        <div v-else-if="info.userLevel == '0'">
            疫情防控管理系统-检测员端
        </div>
    </div>
    <div class="r-content"> 
      <el-dropdown trigger="click" size="mini"> 
        <p class="el-dropdown-link"><img :src="info.head_img" class="user"/><span class="username">{{info.name}}</span></p>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item></el-dropdown-item>
          <el-dropdown-item><a v-if="getToken !== ''" class="" @click="signOut">
                退出登录
            </a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      
    }
  },
  props:{
      info:{
          type:Object,
          required:true
      }
  },
  methods: {
    collapseMenu() {
      this.$store.commit('collapseMenu')
    },
    async signOut() {
      //清除token
      await this.$store.dispatch('clearToken');
      localStorage.removeItem("token");

      //刷新页面
      location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  min-height: 50px;
  padding: 0 50px 0 10px;
  align-items: center;
  justify-content: space-between;
  background: #2c3f54;
  color: #ffffff;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 10px;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666666;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #ffffff;
    }
  }
}

.username{
  position: relative;
  bottom: 13px;
  color: #ffffff;
}
</style>
