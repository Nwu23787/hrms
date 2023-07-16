<template>
  <div class="main">
    <el-button @click="resetSexFilter">清除性别筛选</el-button>
    <el-button @click="resetDepFilter">清除部门筛选</el-button>
    <el-button @click="clearFilter">清除所有筛选</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      max-height="640"
      :key="Math.random()"
    >
      <el-table-column prop="id" label="工号" sortable width="170">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="170"> </el-table-column>
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
        width="170"
      >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        sortable
        width="170"
      ></el-table-column>
      <el-table-column
        prop="department"
        label="部门"
        width="140"
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
      <el-table-column prop="post" label="职位" width="140"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="showAlertPassword(scope.row)"
            >修改密码</el-button
          >
          <el-popconfirm
            title="确定删除此用户吗？"
            @confirm="deleteFn(scope.row)"
          >
            <el-button
              type="danger"
              size="mini"
              slot="reference"
              style="margin-left: 20px"
              >删除用户</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="修改密码" :visible.sync="passwordDialogTableVisible">
      <el-form
        :model="passwordForm"
        :rules="updatePasswordRules"
        ref="passwordForm"
      >
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            placeholder="请输入新密码"
            v-model="passwordForm.newPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            placeholder="请确认新密码"
            v-model="passwordForm.confirmPassword"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStaffInfoList, updatePassword, deleteUser } from "@/api";
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      //修改密码弹出框表单数据
      passwordForm: {
        newPassword: "",
        confirmPassword: "",
        id: "", //被修改的用户的工号
      },
      //表格数据
      tableData: [],
      //控制修改密码弹出框
      passwordDialogTableVisible: false,
      updatePasswordRules: {
        newPassword: [
          { required: true, trigger: "blur", message: "新密码不能为空！" },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "请确认新密码！" },
          {
            validator: validatePassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetSexFilter() {
      this.$refs.filterTable.clearFilter("sex");
    },
    resetDepFilter() {
      this.$refs.filterTable.clearFilter("department");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },

    filterSex(value, row) {
      return row.sex === value;
    },
    filterDepartment(value, row) {
      return row.department === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    showAlertPassword(value) {
      this.passwordForm.id = value.id;
      this.passwordDialogTableVisible = true;
    },

    //修改密码
    async updatePassword() {
      this.$refs.passwordForm.validate(async (isOk) => {
        if (isOk) {
          try {
            await updatePassword({
              id: this.passwordForm.id,
              newPassword: this.passwordForm.newPassword,
            });
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            //重新获取数据
            try {
              const result = await getStaffInfoList();
              this.tableData = result;
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            console.log(error);
          } finally {
            this.passwordDialogTableVisible = false;
            //重置修改密码表单
            this.passwordForm = {
              newPassword: "",
              confirmPassword: "",
              id: "", //被修改的用户的工号
            };
          }
        }
      });
    },

    //删除用户
    async deleteFn(value) {
      try {
        console.log(value.id);
        await deleteUser({ id: value.id });
        this.$message({
          message: "删除成功！",
          type: "success",
        });
      } catch (error) {
        console.log(error);
      } finally {
        //重新获取数据
        try {
          const result = await getStaffInfoList();
          this.tableData = result;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  async created() {
    const result = await getStaffInfoList();
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