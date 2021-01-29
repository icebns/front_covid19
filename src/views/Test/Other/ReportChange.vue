<template>
  <el-main>
    <el-input placeholder="请输入搜索内容" v-model="input2">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
      <el-table :data="tableData">
        <el-table-column prop="report_id" label="上报ID" width="80">
        </el-table-column>
        <el-table-column prop="id" label="用户姓名" width="100">
        </el-table-column>
        <el-table-column prop="home" label="地址" width="200">
        </el-table-column>
        <el-table-column
          prop="temperature"
          label="体温"
          sortable
          width="80" 
        > 
        </el-table-column> 
        <el-table-column
          prop="contact"
          label="与患者接触" 
          width="120"
          column-key="contact"
          :filters="[{text: '是', value: '是'}, {text: '否', value: '否'}]"
          :filter-method="filterHandler"
        > 
        </el-table-column> 
        <el-table-column
        prop="go_out"
        label="外出" 
        width="60"
        column-key="go_out"
        :filters="[{text: '是', value: '是'}, {text: '否', value: '否'}]"
        :filter-method="filterHandler" >
        </el-table-column> 
        <el-table-column
        prop="health"
        label="健康状况" 
        width="90"
        column-key="health"
        :filters="[{text: '良好', value: '良好'}, {text: '一般', value: '一般'}, {text: '较差', value: '较差'}, {text: '非常差，需要就医', value: '非常差，需要就医'}]"
        :filter-method="filterHandler" > 
        </el-table-column>
        <el-table-column
          prop="report_time"
          label="填报时间"
          sortable
          width="160" 
        >
        </el-table-column> 
        <el-table-column prop="" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
</template>

<script>
  export default {
    data() {
      const item = {
        report_id: '1',
        id: '2', 
        home: '河北省石家庄市长安区',
        temperature: '36.2℃',
        contact: '否',
        go_out: '否',
        health:'良好',
        report_time:'2021-01-13 14:14:27'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  };
</script>
<style lang="scss" scoped></style>
