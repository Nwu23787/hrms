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
        prop="type"
        label="申请类型"
        sortable
        width="200"
        :filters="[
          { text: '信息变更', value: '信息变更' },
          { text: '离职', value: '离职' },
          { text: '退休', value: '退休' },
          { text: '调动', value: '调动' },
        ]"
        column-key="type"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="whichType(scope.row.type)" disable-transitions>{{
            scope.row.type
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="permission(scope.row)"
            >批准</el-button
          >
          <el-button type="success" size="mini" @click="reject(scope.row)"
            >拒绝</el-button
          >
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
import { getRequestList, handleRequest } from "@/api";
export default {
  data() {
    return {
      //弹出框内容
      reason: "",
      tableData: [],
      //控制弹出框
      dialogTableVisible: false,
    };
  },
  methods: {
    //处理请求之后要重新获取请求列表，刷新页面
    //批准员工请求
    async permission(value) {
      console.log(value);
      try {
        await handleRequest({ RID: value.RID, isPermission: true });
        //提示成功
        this.$message({
          message: "已批准！",
          type: "success",
        });
      } catch (error) {
        console.log(error);
      } finally {
        //更新请求列表
        try {
          const result = await getRequestList();
          this.tableData = result;
        } catch (error) {
          console.log(error);
        }
      }
    },

    //拒绝员工请求
    async reject(value) {
      console.log(value);
      try {
        await handleRequest({ RID: value.RID, isPermission: false });
        //提示成功
        this.$message({
          message: "已拒绝！",
          type: "success",
        });
      } catch (error) {
        console.log(error);
      } finally {
        //更新请求列表
        try {
          const result = await getRequestList();
          this.tableData = result;
        } catch (error) {
          console.log(error);
        }
      }
    },

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
      return row.type === value;
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
  async created() {
    const result = await getRequestList();
    this.tableData = result;
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