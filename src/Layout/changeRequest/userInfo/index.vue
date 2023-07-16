<template>
  <div class="main">
    <div class="title">员工信息</div>
    <el-divider></el-divider>
    <el-form
      ref="userInfoForm"
      :rules="userInfoRules"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="姓名">
        <el-col :span="8">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number
          v-model="form.age"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="form.department" placeholder="请选择部门" disabled>
          <el-option label="技术部" value="jishu"></el-option>
          <el-option label="营销部" value="yinxiao"></el-option>
          <el-option label="财务部" value="caiwu"></el-option>
          <el-option label="人事部" value="renshi"></el-option>
        </el-select>
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
      <el-form-item label="工作时间">
        <el-col :span="8">
          <el-input v-model="form.time" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="变更原因" prop="reason">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, updateInfo } from "@/api";
export default {
  data() {
    return {
      //表单数据
      form: {},
      //验证规则
      userInfoRules: {
        reason: [
          { required: true, trigger: "blur", message: "变更原因不能为空" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.$refs.userInfoForm.validate(async (isOk) => {
        if (isOk) {
          try {
            const res = await updateInfo({
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
  async created() {
    const result = await getInfo({ id: this.$store.state.id });
    result.reason = "";
    this.form = result;
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