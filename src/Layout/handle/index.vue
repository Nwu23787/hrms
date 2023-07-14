<template>
  <div class="main">
    <el-button @click="resetSexFilter">清除性别过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="工号" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        :filters="[
          { text: '男', value: '男' },
          { text: '女', value: '女' },
        ]"
        :filter-method="filterSex"
        filter-placement="bottom-end"
        column-key="sex"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[
          { text: '家', value: '家' },
          { text: '公司', value: '公司' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          tag: "家",
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          tag: "公司",
        },
        {
          id: "16098",
          name: "赵小骏",
          sex: "女",
          age: 25,
          tag: "家",
        },
        {
          id: "15647",
          name: "孙小骏",
          sex: "男",
          age: 16,
          tag: "公司",
        },
      ],
    };
  },
  methods: {
    resetSexFilter() {
      this.$refs.filterTable.clearFilter("sex");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterSex(value, row) {
      return row.sex === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 20px auto;
  height: 100%;
  width: 97%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 20px;
}
</style>