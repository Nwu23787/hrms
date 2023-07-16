<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">人力资源管理后台登录系统</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入姓名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
          prefix-icon="el-icon-user-solid"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
          prefix-icon="el-icon-lock"
          show-password
        />
      </el-form-item>
      <el-button
        class="loginBtn"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      //表单信息对象
      loginForm: {
        username: "",
        password: "",
      },
      loading: false,
      passwordType: "password",
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "姓名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      // 表单的手动校验
      this.$refs.loginForm.validate(async (isOK) => {
        if (isOK) {
          try {
            this.loading = true;
            // 只有校验通过了 我们才去调用action
            await this.login(this.loginForm);
            // 应该登录成功之后
            // async标记的函数实际上一个promise对象
            // await下面的代码 都是成功执行的代码
            this.$router.push("/");
          } catch (error) {
            console.log(error);
          } finally {
            //  不论执行try 还是catch  都去关闭转圈
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #283443;
$light_gray: #68b0fe; // 将输入框颜色改成蓝色
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  // 设置盒子大小等于视口大小
  height: 100vh;
  width: 100vw;
  background-image: url("~@/assets/common/login.jpg");

  ::v-deep .el-input {
    display: inline-block;
    height: 52px;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 13px 5px 12px 35px;
      color: $light_gray;
      height: 52px;
      caret-color: $cursor;
      font-size: 17px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .title-container {
      $light_gray: #eee;
      position: relative;

      .title {
        font-size: 36px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: normal;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error {
    color: #fff;
  }
  .loginBtn {
    background: #407ffe;
    height: 50px;
    line-height: 25px;
    font-size: 20px;
  }
}
</style>