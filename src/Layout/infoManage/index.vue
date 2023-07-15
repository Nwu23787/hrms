<template>
  <div class="main">
    <el-button @click="resetSexFilter">清除性别筛选</el-button>
    <el-button @click="resetDepFilter">清除部门筛选</el-button>
    <el-button @click="resetPostFilter">清除职位筛选</el-button>
    <el-button @click="clearFilter">清除所有筛选</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      max-height="640"
    >
      <el-table-column prop="id" label="工号" sortable width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
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
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        sortable
        width="150"
      ></el-table-column>
      <el-table-column
        prop="department"
        label="部门"
        width="150"
        column-key="department"
        :filters="[
          { text: '营销部', value: '营销部' },
          { text: '技术部', value: '技术部' },
          { text: '财务部', value: '财务部' },
          { text: '人事部', value: '人事部' },
        ]"
        :filter-method="filterDepartment"
        filter-placement="bottom-end"
      ></el-table-column>
      <el-table-column
        prop="post"
        label="职位"
        width="150"
        :filters="[
          { text: '经理', value: '经理' },
          { text: '员工', value: '员工' },
        ]"
        :filter-method="filterPost"
        filter-placement="bottom-end"
        column-key="post"
      ></el-table-column>
      <el-table-column
        prop="salary"
        label="时薪（元）"
        sortable
        width="150"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="本月工作时长"
        sortable
        width="150"
      ></el-table-column>
      <!-- 操作按钮 -->
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="alterInfo(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="修改员工信息" :visible.sync="dialogTableVisible">
      <el-form :model="dialogForm">
        <el-form-item label="工号" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.id"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-radio-group v-model="dialogForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.age"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部门" label-width="120px">
          <el-col :span="8">
            <el-select v-model="dialogForm.department" placeholder="请选择部门">
              <el-option label="营销部" value="营销部"></el-option>
              <el-option label="技术部" value="技术部"></el-option>
              <el-option label="人事部" value="人事部"></el-option>
              <el-option label="财务部" value="财务部"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="职位" label-width="120px">
          <el-col :span="8">
            <el-select v-model="dialogForm.post" placeholder="请选择职位">
              <el-option label="经理" value="经理"></el-option>
              <el-option label="员工" value="员工"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="时薪(元)" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.salary"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
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
      tableData: [
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          department: "营销部",
          post: "员工",
          time: 300,
          salary: 20,
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          department: "技术部",
          post: "经理",
          time: 1150,
          salary: 100,
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          department: "营销部",
          post: "员工",
          time: 300,
          salary: 20,
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          department: "技术部",
          post: "经理",
          time: 1150,
          salary: 100,
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          department: "营销部",
          post: "员工",
          time: 300,
          salary: 20,
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          department: "技术部",
          post: "经理",
          time: 1150,
          salary: 100,
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          department: "营销部",
          post: "员工",
          time: 300,
          salary: 20,
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          department: "技术部",
          post: "经理",
          time: 1150,
          salary: 100,
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          department: "营销部",
          post: "员工",
          time: 300,
          salary: 20,
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          department: "技术部",
          post: "经理",
          time: 1150,
          salary: 100,
        },
        {
          id: "93942",
          name: "王小骏",
          sex: "男",
          age: 18,
          department: "营销部",
          post: "员工",
          time: 300,
          salary: 20,
        },
        {
          id: "27465",
          name: "李小骏",
          sex: "女",
          age: 23,
          department: "技术部",
          post: "经理",
          time: 1150,
          salary: 100,
        },
      ],
      //控制弹出框
      dialogTableVisible: false,
      //弹出框表单数据
      dialogForm: {},
    };
  },
  methods: {
    resetSexFilter() {
      this.$refs.filterTable.clearFilter("sex");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    resetDepFilter() {
      this.$refs.filterTable.clearFilter("department");
    },
    resetPostFilter() {
      this.$refs.filterTable.clearFilter("post");
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterSex(value, row) {
      return row.sex === value;
    },
    filterDepartment(value, row) {
      return row.department === value;
    },
    filterPost(value, row) {
      return row.post === value;
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
    alterInfo(value) {
      this.dialogForm = value;
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