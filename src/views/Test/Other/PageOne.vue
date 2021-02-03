<template>
  <el-main>
    <el-input placeholder="请输入搜索内容" v-model="input2">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
      <el-table :data="tableData">
        <el-table-column prop="test_id" label="检测ID" width="80">
        </el-table-column>
        <el-table-column prop="name" label="用户姓名" width="100">
        </el-table-column>
        <el-table-column
          prop="test_result"
          label="检测结果" 
          width="100"
          column-key="test_result"
          :filters="[{text: '阴性', value: '阴性'}, {text: '阳性', value: '阳性'}]"
          :filter-method="filterHandler"
        > 
        </el-table-column> 
        <el-table-column prop="test_doctor" label="检测员" width="100">
        </el-table-column> 
        <el-table-column prop="test_time" label="检测时间" width="160">
        </el-table-column> 
        <el-table-column prop="" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
        test_id: '1',
        name: '张三', 
        test_result: '阴性',
        test_doctor: 'icebns',
        test_time: '2021-01-13 14:14:27',
        test_img: '否' 
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
