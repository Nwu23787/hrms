<template>
  <el-container class="main">
    <el-aside width="200px">
      <el-row class="tac" style="height: 100%">
        <el-col style="height: 100%">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#5788fe"
            text-color="#fff"
            active-text-color=" #43a7fe"
            style="height: 100%"
          >
            <el-menu-item index="0" class="logo">
              <img src="@/assets/common/logo.png" class="sidebar-logo" />
              <span slot="title">人力资源管理系统</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">变动申请</span>
            </el-menu-item>
            <el-menu-item index="0">
              <i class="el-icon-menu"></i>
              <span slot="title">员工申请处理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">员工信息管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              <span slot="title">考勤管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-menu"></i>
              <span slot="title">工资管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-menu"></i>
              <span slot="title">报表管理</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-menu"></i>
              <span slot="title">系统管理员</span>
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
                <span class="name"> 管理员 </span>
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item> 首页 </el-dropdown-item>
                </router-link>
                <a target="_blank" href="https://github.com/Nwu23787/HRsaas">
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
      <el-container class="show">
        <el-header class="hello" style="height: 130px">
          <img src="@/assets/common/hello.png" class="hello-img" />
          <span style="color:#3d3f42">你好，王孖骏，祝你开心每一天！</span>
        </el-header>
        <el-container>
          <el-aside class="calendar">
            <el-header class="calendar-title">
              <div>工作日历</div>
              <el-divider></el-divider>
            </el-header>
            <el-calendar v-model="value" style="margin-top: 55px">
            </el-calendar>
          </el-aside>
          <el-aside class="news">
            <div class="title">NEWS</div>
            
            <div class="news-body">
              <div class="news-item">
                <img src="../assets/common/fire.png" class="fire" />
                <a href="https://weibo.com/5242381821/N9NgEbkXQ"
                  >《奔跑吧》停播两周后宣布今晚播出</a
                >
              </div>
              <div class="news-item">
                <img src="../assets/common/fire.png" class="fire" />
                <a
                  href="https://baijiahao.baidu.com/s?id=1769742840089247667&wfr=spider&for=pc"
                  >知情人：蔡徐坤一夜情致女方怀孕</a
                >
              </div>
              <div class="news-item">
                <img src="../assets/common/fire.png" class="fire" />
                <a
                  href="https://baijiahao.baidu.com/s?id=1731154258505903878&wfr=spider&for=pc"
                  >全国最“穷”的211大学，却敢直接叫板北大，获得网友一致好评</a
                >
              </div>
              <div class="news-item">
                <img src="../assets/common/fire.png" class="fire" />
                <a
                  href="https://haokan.baidu.com/v?pd=wisenatural&vid=2398929855405388087"
                  >知名旅行博主在新疆徒步失联后遇难</a
                >
              </div>
              <div class="news-item">
                <img src="../assets/common/fire.png" class="fire" />
                <a
                  href="https://baijiahao.baidu.com/s?id=1771354268903593237&wfr=spider&for=pc"
                  >世卫正式宣布：阿斯巴甜可能致癌！</a
                >
              </div>
              <div class="news-item" style="border: 0">
                <img src="../assets/common/fire.png" class="fire" />
                <a href="https://baijiahao.baidu.com/s?id=1771279085130349560"
                  >3中国公民在马代溺亡1人被鲨鱼咬伤</a
                >
              </div>
            </div>
          </el-aside>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
    };
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