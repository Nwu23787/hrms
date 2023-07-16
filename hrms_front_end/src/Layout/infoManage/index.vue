<template>
  <div class="main">
    <el-button @click="resetSexFilter">清除性别筛选</el-button>
    <el-button @click="resetDepFilter">清除部门筛选</el-button>
    <el-button @click="resetPostFilter">清除职位筛选</el-button>
    <el-button @click="clearFilter">清除所有筛选</el-button>
    <el-button type="primary" @click="handleDownload">导出表格</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      max-height="640"
      id="out-table"
    >
      <el-table-column prop="id" label="工号" sortable width="135">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="135"> </el-table-column>
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
        width="135"
      >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        sortable
        width="135"
      ></el-table-column>
      <el-table-column
        prop="department"
        label="部门"
        width="135"
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
        width="135"
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
        width="135"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="本月工作时长"
        sortable
        width="135"
      ></el-table-column>
      <!-- 操作按钮 -->
      <el-table-column label="操作" width="135">
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
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStaffInfoList, updateStaffInfo } from "@/api";
import FileSaver from "file-saver";
const XLSX = require("xlsx");
export default {
  data() {
    return {
      //列表内容
      tableData: [],
      //控制弹出框
      dialogTableVisible: false,
      //弹出框表单数据
      dialogForm: {},
      //被点击员工的工号
      clickID: null,
    };
  },
  async created() {
    try {
      const result = await getStaffInfoList();
      this.tableData = result;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    //导出文件
    handleDownload() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      //删除操作列
      for (let prop in wb.Sheets.Sheet1) {
        if (prop.startsWith("I")) {
          delete wb.Sheets.Sheet1[prop];
        }
      }
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "员工信息表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    //确认修改
    async confirmUpdate() {
      try {
        //利用解构删除id和time属性
        const { id, time, ...obj } = this.dialogForm;
        const result = await updateStaffInfo({
          oldID: this.clickID,
          newID: id,
          ...obj,
        });
        this.$message({
          message: "修改成功！",
          type: "success",
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.dialogTableVisible = false;
      }
    },
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
      this.clickID = value.id;
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