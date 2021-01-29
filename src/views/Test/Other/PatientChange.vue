<template>
  <el-main>
      <el-table :data="tableData">
        <el-table-column prop="patient_id" label="病例ID" width="80">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="80">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          sortable
          width="80" 
        > 
        </el-table-column> 
        <el-table-column
        prop="source"
        label="感染源" 
        width="120"
        column-key="source"
        :filters="[{text: '接触感染', value: '接触感染'},{text: '无症状感染', value: '无症状感染'}, {text: '境外输入', value: '境外输入'}]"
        :filter-method="filterHandler" >
        </el-table-column> 
        <el-table-column
        prop="state"
        label="健康状态" 
        width="100"
        column-key="state"
        :filters="[{text: '轻型', value: '轻型'},{text: '普通型', value: '普通型'}, {text: '重型', value: '重型'}, {text: '危重型', value: '危重型'}, {text: '死亡', value: '死亡'}, {text: '康复', value: '康复'}]"
        :filter-method="filterHandler" >
        </el-table-column> 
        <el-table-column prop="hospital" label="隔离点" width="100">
        </el-table-column>
        <el-table-column prop="article" fixed="right" label="操作">
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
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      const item = {
          patient_id: '1',
          name:'李四',
          sex: '男',
          age: '31',
          source: '无症状感染',
          state: '轻型',
          way: '无',
          hospital: '省中医院'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
<style lang="scss" scoped></style>
