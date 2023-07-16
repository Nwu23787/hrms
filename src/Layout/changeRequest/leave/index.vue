<template>
  <div class="main">
    <div class="title">退休/离职申请</div>
    <el-divider></el-divider>
    <el-radio-group v-model="labelPosition" style="margin-bottom: 30px">
      <el-radio-button label="退休">退休申请</el-radio-button>
      <el-radio-button label="离职">离职申请</el-radio-button>
    </el-radio-group>

    <!-- 根据不同的按钮值展示不同的页面 -->
    <!-- 退休申请页面 -->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      v-if="labelPosition === '退休'"
      :rules="leaveRequestRules"
    >
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
      <el-form-item label="退休原因" prop="reason">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
      </el-form-item>
    </el-form>

    <!-- 离职申请页面 -->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      v-if="labelPosition === '离职'"
      :rules="leaveRequestRules"
    >
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
      <el-form-item label="部门">
        <el-select v-model="form.department" placeholder="请选择部门" disabled>
          <el-option label="技术部" value="技术部"></el-option>
          <el-option label="营销部" value="营销部"></el-option>
          <el-option label="财务部" value="财务部"></el-option>
          <el-option label="人事部" value="人事部"></el-option>
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
      <el-form-item label="离职原因" prop="reason">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, leaveRequest } from "@/api";
export default {
  data() {
    return {
      //表单数据
      form: {},
      //按钮选择
      //默认为退休
      labelPosition: "退休",
      //验证规则
      leaveRequestRules: {
        reason: [
          {
            required: true,
            trigger: "blur",
            message: `申请原因不能为空`,
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.$refs.form.validate(async (isOk) => {
        if (isOk) {
          try {
            const res = await leaveRequest({
              type: this.labelPosition,
              reason: this.form.reason,
              id: this.$store.state.id,
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
    console.log(result);
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