<template>
  <div class="main">
    <el-button @click="resetSexFilter">清除性别筛选</el-button>
    <el-button @click="resetReqFilter">清除申请类型筛选</el-button>
    <el-button @click="clearFilter">清除所有筛选</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      max-height="640"
    >
      <el-table-column prop="id" label="工号" sortable width="200">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
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
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        sortable
        width="200"
      ></el-table-column>
      <el-table-column
        prop="tag"
        label="申请类型"
        sortable
        width="200"
        :filters="[
          { text: '信息变更', value: '信息变更' },
          { text: '离职', value: '离职' },
          { text: '退休', value: '退休' },
          { text: '调动', value: '调动' },
        ]"
        column-key="tag"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="whichType(scope.row.tag)" disable-transitions>{{
            scope.row.tag
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">批准</el-button>
          <el-button type="success" size="mini">拒绝</el-button>
          <el-button type="info" size="mini" @click="showDetails(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="申请原因" :visible.sync="dialogTableVisible">
      {{ reason }}
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //弹出框内容
      reason: "",
      tableData: [
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          tag: "调动",
          reason:
            "7月12日上午，在位于西安市东仪路的荣安芙蓉印月小区门口，姬女士告诉记者，自己2020年购买了该小区1号楼一套商业公寓，因疫情原因推迟到今年3月份交房，但至今自己并没有收房，就是想不通为啥公摊面积这么高。根据姬女士提供的购房合同，出卖人为西安康翰置业有限责任公司，该商品房的房产测绘机构为西安市房产测量事务所有限公司，预（实）测建筑面积共69.75平方米，其中套内建筑面积32.71平方米，分摊共有建筑面积37.04平方米。",
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          tag: "信息变更",
        },
        {
          id: "16098",
          name: "赵小骏",
          sex: "女",
          age: 25,
          tag: "离职",
        },
        {
          id: "15647",
          name: "孙小骏",
          sex: "男",
          age: 16,
          tag: "退休",
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          tag: "调动",
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          tag: "信息变更",
        },
        {
          id: "16098",
          name: "赵小骏",
          sex: "女",
          age: 25,
          tag: "离职",
        },
        {
          id: "15647",
          name: "孙小骏",
          sex: "男",
          age: 16,
          tag: "退休",
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          tag: "调动",
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          tag: "信息变更",
        },
        {
          id: "16098",
          name: "赵小骏",
          sex: "女",
          age: 25,
          tag: "离职",
        },
        {
          id: "15647",
          name: "孙小骏",
          sex: "男",
          age: 16,
          tag: "退休",
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          tag: "调动",
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          tag: "信息变更",
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          tag: "调动",
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          tag: "信息变更",
        },
      ],
      //控制弹出框
      dialogTableVisible: false,
    };
  },
  methods: {
    resetSexFilter() {
      this.$refs.filterTable.clearFilter("sex");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    resetReqFilter() {
      this.$refs.filterTable.clearFilter("tag");
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
    whichType(type) {
      if (type === "调动") {
        return "success";
      } else if (type === "离职") {
        return "tag";
      } else if (type === "信息变更") {
        return "warning";
      } else if (type === "退休") {
        return "danger";
      }
    },
    showDetails(value) {
      console.log(value);
      this.reason = value.reason;
      this.dialogTableVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 20px auto;
  height: 90%;
  width: 97%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 20px;
}
</style>