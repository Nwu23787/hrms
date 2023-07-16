<template>
  <div class="main">
    <!-- 头部筛选模块 -->
    <div class="header">
      <el-form>
        <el-form-item label="查看日期:" prop="day">
          <el-input-number
            v-model="formData.day"
            :min="1"
            :max="31"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="部门筛选:" prop="department">
          <el-checkbox-group v-model="formData.department">
            <el-checkbox label="营销部" name="department"></el-checkbox>
            <el-checkbox label="技术部" name="department"></el-checkbox>
            <el-checkbox label="财务部" name="department"></el-checkbox>
            <el-checkbox label="人事部" name="department"></el-checkbox>
            <el-button
              type="primary"
              size="small"
              class="confirmBtn"
              @click="filterData"
              >筛选</el-button
            >
            <el-button type="primary" @click="handleDownload" size="small"
              >导出表格</el-button
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格数据展示模块 -->
    <div class="body">
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%"
        max-height="510"
        :key="Math.random()"
        id="out-table"
      >
        <el-table-column prop="id" label="工号" sortable width="134">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="134">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="134">
        </el-table-column>
        <el-table-column prop="post" label="职位" width="134">
        </el-table-column>
        <el-table-column
          prop="workTime"
          label="上班时间 (h)"
          width="134"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="overTime"
          label="加班时间 (h)"
          width="134"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="absentTime"
          label="旷工时间 (h)"
          width="134"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="leaveTime"
          label="请假时间 (h)"
          width="134"
          sortable
        >
        </el-table-column>
        <el-table-column label="操作" width="142">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="showDetails(scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column></el-table
      >
    </div>

    <!-- 弹出框 -->
    <el-dialog title="修改考勤信息" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="工号" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.id" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.name" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="部门" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.department" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上班时长（h）" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.workTime"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="加班时长（h）" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.overTime"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="旷工时长（h）" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.absentTime"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请假时长（h）" label-width="120px">
          <el-col :span="8">
            <el-input v-model="dialogForm.leaveTime"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAttendanceInfo, updateAttendance } from "@/api";
import FileSaver from "file-saver";
const XLSX = require("xlsx");
export default {
  data() {
    return {
      // 表头筛选数据
      formData: {
        department: [], //筛选部门
        day: 1, //指定查看天数
      },
      tableData: [],
      //控制弹出框是否显示
      dialogFormVisible: false,
      //弹出框表单数据
      dialogForm: {},
      //被修改用户的id
      clickID: null,
    };
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
        if (this.formData.department.length !== 0) {
          FileSaver.saveAs(
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            `${this.formData.day}号${this.formData.department}考勤表.xlsx`
          );
        } else {
          FileSaver.saveAs(
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            `${this.formData.day}号营销部、技术部、财务部、人事部考勤表.xlsx`
          );
        }
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    showDetails(value) {
      this.dialogForm = value;
      this.clickID = value.id;
      this.dialogFormVisible = true;
    },
    async filterData() {
      try {
        let obj = {
          department: ["营销部", "技术部", "财务部", "人事部"],
          day: this.formData.day,
        };
        if (this.formData.department.length === 0) {
          //如果数组长度为0，默认展示四个部门
          const result = await getAttendanceInfo(obj);
          this.tableData = result;
        } else {
          const result = await getAttendanceInfo(this.formData);
          this.tableData = result;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async confirm() {
      try {
        await updateAttendance({
          id: this.clickID,
          day: this.formData.day,
          workTime: this.dialogForm.workTime,
          overTime: this.dialogForm.overTime,
          absentTime: this.dialogForm.absentTime,
          leaveTime: this.dialogForm.leaveTime,
        });
        this.$message({
          message: "修改成功！",
          type: "success",
        });
        //重新请求list数据，刷新页面
        try {
          let obj = {
            department: ["营销部", "技术部", "财务部", "人事部"],
            day: this.formData.day,
          };
          if (this.formData.department.length === 0) {
            //如果数组长度为0，默认展示四个部门
            const result = await getAttendanceInfo(obj);
            this.tableData = result;
          } else {
            const result = await getAttendanceInfo(this.formData);
            this.tableData = result;
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.dialogFormVisible = false;
      }
    },
  },
  async created() {
    try {
      const result = await getAttendanceInfo({
        department: ["营销部", "技术部", "财务部", "人事部"],
        day: 1,
      });
      this.tableData = result;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 20px auto;
  height: 90%;
  width: 97%;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // border: 1px solid #000;
  padding: 20px;

  .header {
    width: 100%;
    height: 120px;
    // background-color: #9be485;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding-left: 40px;
    padding-top: 10px;

    .confirmBtn {
      margin-left: 100px;
    }
  }

  .body {
    width: 100%;
    height: 510px;
    // background-color: #d89999;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>