<template>
  <div class="main">
    <div class="title">部门调动申请</div>
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="80px" :rules="transferRules">
      <el-form-item label="姓名" required>
        <el-col :span="8">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" required>
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="职位">
        <el-col :span="8">
          <el-input v-model="form.post" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="工号">
        <el-col :span="8">
          <el-input v-model="form.id" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="当前部门">
        <el-select
          v-model="form.nowDepartment"
          placeholder="请选择部门"
          disabled
        >
          <el-option label="技术部" value="jishu"></el-option>
          <el-option label="营销部" value="yinxiao"></el-option>
          <el-option label="财务部" value="caiwu"></el-option>
          <el-option label="人事部" value="renshi"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标部门" prop="aimDepartment">
        <el-select v-model="form.aimDepartment" placeholder="请选择部门">
          <el-option label="技术部" value="技术部"></el-option>
          <el-option label="营销部" value="营销部"></el-option>
          <el-option label="财务部" value="财务部"></el-option>
          <el-option label="人事部" value="人事部"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请理由" prop="reason">
        <el-input
          type="textarea"
          v-model="form.reason"
          :autosize="{ minRows: 4, maxRows: 8 }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { transferRequest, getInfo } from "@/api";
export default {
  data() {
    const validateAimDepartment = (rule, value, callback) => {
      if (this.form.aimDepartment === this.form.nowDepartment) {
        callback(new Error("目标部门不能和当前部门相同！"));
      } else {
        callback();
      }
    };
    return {
      //表单数据
      form: {},
      //验证规则
      transferRules: {
        aimDepartment: [
          { required: true, trigger: "blur", message: "目标部门不能为空" },
          { validator: validateAimDepartment, trigger: "blur" },
        ],
        reason: [
          { required: true, trigger: "blur", message: "申请原因不能为空" },
        ],
      },
    };
  },
  async created() {
    const result = await getInfo({ id: this.$store.state.id });
    result.reason = "";
    result.nowDepartment = result.department;
    result.aimDepartment = null;
    this.form = result;
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.$refs.form.validate(async (isOk) => {
        if (isOk) {
          try {
            const res = await transferRequest({
              name: this.form.name,
              sex: this.form.sex,
              age: this.form.age,
              reason: this.form.reason,
            });
            this.$message({
              message: "提交成功",
              type: "success",
            });
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  margin-top: 35px;
  height: 85vh;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 15px 10px 0 10px;

  .title {
    font-size: 32px;
    padding-left: 20px;
    color: rgb(79, 79, 79);
  }
}
</style>