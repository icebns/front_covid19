<template>
  
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '2', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>新闻资讯管理</template>
          <el-menu-item index="1-1">发布资讯</el-menu-item>
          <el-menu-item index="1-2">管理资讯</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>体温上报管理</template>
          <!-- <el-menu-item index="1-1">查询上报信息</el-menu-item> -->
          <el-menu-item index="2-1">管理上报信息</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>防控综合管理</template>
        <el-menu-item-group>
          <template slot="title">核酸检测报告管理</template>
          <el-menu-item index="3-1">添加检测报告</el-menu-item>
          <el-menu-item index="3-2">查询检测报告</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">隔离患者管理</template>
          <el-menu-item index="4-1">添加隔离患者</el-menu-item>
          <el-menu-item index="4-2">管理隔离患者</el-menu-item>
          <el-menu-item index="4-3">添加密切接触者</el-menu-item>
          <el-menu-item index="4-4">管理密切接触者</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside> 
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    // data() {
    //   const item = { 
        
    //   };
    //   return {
    //     tableData: Array(20).fill(item)
    //   }
    // }
  };
</script>