<template>
  <div class="main">
    <!-- 头部筛选模块 -->
    <div class="header">
      <el-form>
        <el-form-item label="查看日期:" prop="day">
          <el-input-number v-model="formData.day"></el-input-number>
        </el-form-item>
        <el-form-item label="部门筛选:" prop="department">
          <el-checkbox-group v-model="formData.department">
            <el-checkbox label="营销部" name="department"></el-checkbox>
            <el-checkbox label="技术部" name="department"></el-checkbox>
            <el-checkbox label="财务部" name="department"></el-checkbox>
            <el-checkbox label="人事部" name="department"></el-checkbox>
            <el-button type="primary" size="small" class="confirmBtn"
              >确认</el-button
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
        <el-button type="primary" @click="dialogFormVisible = false"
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
      // 表头筛选数据
      formData: {
        department: [], //筛选部门
        day: 1, //指定查看天数
      },
      tableData: [
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          workTime: 5, //上班时间
          overTime: 4, //加班时间
          absentTime: 1, //旷工时间
          leaveTime: 2, //请假时间
        },
        {
          id: 990122,
          name: "小骏马",
          department: "技术部",
          post: "员工",
          workTime: 12, //上班时间
          overTime: 0, //加班时间
          absentTime: 0, //旷工时间
          leaveTime: 0, //请假时间
        },
        {
          id: 990234,
          name: "老骏马",
          department: "技术部",
          post: "经理",
          workTime: 3, //上班时间
          overTime: 0, //加班时间
          absentTime: 5, //旷工时间
          leaveTime: 0, //请假时间
        },
        {
          id: 990001,
          name: "中骏马",
          department: "人事部",
          post: "员工",
          workTime: 12, //上班时间
          overTime: 4, //加班时间
          absentTime: 3, //旷工时间
          leaveTime: 1, //请假时间
        },
        {
          id: 990001,
          name: "迷你骏马",
          department: "财务部",
          post: "经理",
          workTime: 7, //上班时间
          overTime: 2, //加班时间
          absentTime: 4, //旷工时间
          leaveTime: 0, //请假时间
        },
        {
          id: 990001,
          name: "超大骏马",
          department: "营销部",
          post: "员工",
          workTime: 24, //上班时间
          overTime: 0, //加班时间
          absentTime: 1, //旷工时间
          leaveTime: 2, //请假时间
        },
        {
          id: 990001,
          name: "中骏马",
          department: "人事部",
          post: "员工",
          workTime: 12, //上班时间
          overTime: 4, //加班时间
          absentTime: 3, //旷工时间
          leaveTime: 1, //请假时间
        },
        {
          id: 990001,
          name: "迷你骏马",
          department: "财务部",
          post: "经理",
          workTime: 7, //上班时间
          overTime: 2, //加班时间
          absentTime: 4, //旷工时间
          leaveTime: 0, //请假时间
        },
        {
          id: 990001,
          name: "超大骏马",
          department: "营销部",
          post: "员工",
          workTime: 24, //上班时间
          overTime: 0, //加班时间
          absentTime: 1, //旷工时间
          leaveTime: 2, //请假时间
        },
        {
          id: 990001,
          name: "中骏马",
          department: "人事部",
          post: "员工",
          workTime: 12, //上班时间
          overTime: 4, //加班时间
          absentTime: 3, //旷工时间
          leaveTime: 1, //请假时间
        },
        {
          id: 990001,
          name: "迷你骏马",
          department: "财务部",
          post: "经理",
          workTime: 7, //上班时间
          overTime: 2, //加班时间
          absentTime: 4, //旷工时间
          leaveTime: 0, //请假时间
        },
        {
          id: 990001,
          name: "超大骏马",
          department: "营销部",
          post: "员工",
          workTime: 24, //上班时间
          overTime: 0, //加班时间
          absentTime: 1, //旷工时间
          leaveTime: 2, //请假时间
        },
      ],
      //控制弹出框是否显示
      dialogFormVisible: false,
      //弹出框表单数据
      dialogForm: {},
    };
  },
  methods: {
    showDetails(value) {
      this.dialogForm = value;
      this.dialogFormVisible = true;
    },
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