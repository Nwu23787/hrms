<template>
  <el-container class="main">
    <el-aside width="200px" class="siderbar">
      <el-row class="tac" style="height: 100%">
        <el-col style="height: 100%">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#5788fe"
            text-color="#fff"
            active-text-color=" #43a7fe"
            style="height: 100%"
            :default-active="this.$route.path"
            router
          >
            <el-menu-item index="0" class="logo">
              <img src="@/assets/common/logo.png" class="sidebar-logo" />
              <span slot="title">人力资源管理系统</span>
            </el-menu-item>
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-submenu index="/changeRequest">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>变更申请</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/changeRequest/userInfo"
                  >基本信息管理</el-menu-item
                >
                <el-menu-item index="/changeRequest/leave"
                  >离职/退休申请</el-menu-item
                >
                <el-menu-item index="/changeRequest/transfer"
                  >部门调动申请</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/handle">
              <i class="el-icon-menu"></i>
              <span slot="title">员工申请处理</span>
            </el-menu-item>
            <el-menu-item index="/infoManage">
              <i class="el-icon-menu"></i>
              <span slot="title">员工信息管理</span>
            </el-menu-item>
            <el-menu-item index="/attendanceManage">
              <i class="el-icon-menu"></i>
              <span slot="title">考勤管理</span>
            </el-menu-item>
            <el-menu-item index="/salaryManage">
              <i class="el-icon-menu"></i>
              <span slot="title">工资管理</span>
            </el-menu-item>
            <el-menu-item index="/systemManage">
              <i class="el-icon-menu"></i>
              <span slot="title">系统管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header class="navbar" height="56px">
        <i class="el-icon-s-operation nav-font"></i>
        <span class="title">西北带学资金有限公司</span>
        <span class="nav-right-div">
          <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <img
                  src="@/assets/common/bigUserHeader.png"
                  class="user-avatar"
                />
                <span class="name"> {{ $store.state.username }} </span>
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item> 首页 </el-dropdown-item>
                </router-link>
                <a target="_blank" href="https://github.com/Nwu23787/hrms">
                  <el-dropdown-item>项目地址</el-dropdown-item>
                </a>
                <el-dropdown-item divided @click.native="logout">
                  <span style="display: block">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </span>
      </el-header>
      <!-- 二级路由挂载点 -->
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //登出
    async logout() {
      await this.$store.dispatch("logout"); // 这里不论写不写 await 登出方法都是同步的
      this.$router.push(`/login`); // 跳到登录
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  height: 100vh;
  width: 100%;
}
// 设置未激活字体颜色
::v-deep .el-menu-item i {
  color: #fefefe;
}

// 设置激活样式
::v-deep .el-menu-item.is-active {
  background-color: #fff !important;

  i {
    color: #43a7fe;
  }
}

.sidebar-logo {
  width: 180px;
  height: 56px;
  background-color: #5788fe;
}

.el-menu-vertical-demo .logo {
  color: #ffffff !important;
  background-color: #5788fe !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
}

::v-deep .sidebar-logo {
  height: 50px;
  width: 50px;
  float: left;
  padding-right: 3px;
}

.sidebar {
  height: 100%;
  float: left;
  min-width: 185px;
  width: 15vw;
}
.navbar {
  background-color: #4f7bfb;

  .nav-font {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 56px;
    line-height: 56px;
    font-size: 20px;
    color: #fff;
  }

  .title {
    display: inline-block;
    font-size: 18px;
    line-height: 56px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
  }

  .nav-right-div {
    width: 120px;
    height: 50px;
    float: right;

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-dropdown {
            color: #fff;
          }

          .name {
            color: #fff;
            vertical-align: middle;
            margin-left: 5px;
          }

          .user-avatar {
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            vertical-align: middle;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }
}

.el-menu {
  border: 0;
}

::v-deep .el-submenu__title i {
  color: #fff !important;
}

.hello {
  position: relative;
  width: 94%;
  margin: 15px 10px 15px 30px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  font-size: 30px;
  vertical-align: middle;

  .hello-img {
    width: 120px;
    height: 120px;
    margin-right: 20px;
  }

  span {
    display: inline-block;
    position: absolute;
    margin: auto;
    top: 33%;
  }
}

.calendar {
  width: 47% !important;
  height: 500px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin: 15px 10px 15px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .calendar-title {
    position: fixed;
    font-size: 25px;
    background-color: #fff;
    width: 40%;
    color: #5a5e66;
    div {
      margin-top: 10px;
    }
  }
}

// 新闻模块
.news {
  width: 44% !important;
  height: 500px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin: 15px 10px 15px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .title {
    font-size: 24px;
    margin: 10px 20px;
    color: #5a5e66;
  }

  .news-body {
    margin-top: 10px;
    margin-left: 20px;
    padding-right: 20px;
  }

  .news-item {
    height: 70px;
    width: 100%;
    border-bottom: 1px solid #d0d1d3;
    display: flex;
    align-items: center;

    a {
      color: #5a5e66;
    }
  }

  .fire {
    width: 50px;
    height: 50px;
  }
}
</style>