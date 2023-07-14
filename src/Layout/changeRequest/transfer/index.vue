<template>
  <div class="main">
    <div class="title">部门调动申请</div>
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="80px">
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
      <el-form-item label="目标部门">
        <el-select v-model="form.aimDepartment" placeholder="请选择部门">
          <el-option label="技术部" value="jishu"></el-option>
          <el-option label="营销部" value="yinxiao"></el-option>
          <el-option label="财务部" value="caiwu"></el-option>
          <el-option label="人事部" value="renshi"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请理由" required>
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
export default {
  data() {
    return {
      //表单数据
      form: {
        name: "小骏",
        sex: "男",
        age: 18,
        nowDepartment: "caiwu",
        post: "经理",
        id: "990101",
        aimDepartment: "",
      },
      //按钮选择
      //默认为退休
      labelPosition: "tuixiu",
    };
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