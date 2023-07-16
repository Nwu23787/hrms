<template>
  <el-container class="show">
    <el-header class="hello" style="height: 130px">
      <img src="@/assets/common/hello.png" class="hello-img" />
      <span style="color: #3d3f42"
        >你好，{{ $store.state.username }}，祝你开心每一天！</span
      >
    </el-header>
    <el-container>
      <el-aside class="calendar">
        <el-header class="calendar-title">
          <div>工作日历</div>
          <el-divider></el-divider>
        </el-header>
        <el-calendar v-model="value" style="margin-top: 55px"> </el-calendar>
      </el-aside>
      <el-aside class="news">
        <div class="title">NEWS</div>

        <div class="news-body">
          <div class="news-item">
            <img src="@/assets/common/fire.png" class="fire" />
            <a href="https://weibo.com/5242381821/N9NgEbkXQ"
              >《奔跑吧》停播两周后宣布今晚播出</a
            >
          </div>
          <div class="news-item">
            <img src="@/assets/common/fire.png" class="fire" />
            <a
              href="https://baijiahao.baidu.com/s?id=1769742840089247667&wfr=spider&for=pc"
              >知情人：蔡徐坤一夜情致女方怀孕</a
            >
          </div>
          <div class="news-item">
            <img src="@/assets/common/fire.png" class="fire" />
            <a
              href="https://baijiahao.baidu.com/s?id=1731154258505903878&wfr=spider&for=pc"
              >全国最“穷”的211大学，却敢直接叫板北大，获得网友一致好评</a
            >
          </div>
          <div class="news-item">
            <img src="@/assets/common/fire.png" class="fire" />
            <a
              href="https://haokan.baidu.com/v?pd=wisenatural&vid=2398929855405388087"
              >知名旅行博主在新疆徒步失联后遇难</a
            >
          </div>
          <div class="news-item">
            <img src="@/assets/common/fire.png" class="fire" />
            <a
              href="https://baijiahao.baidu.com/s?id=1771354268903593237&wfr=spider&for=pc"
              >世卫正式宣布：阿斯巴甜可能致癌！</a
            >
          </div>
          <div class="news-item" style="border: 0">
            <img src="@/assets/common/fire.png" class="fire" />
            <a href="https://baijiahao.baidu.com/s?id=1771279085130349560"
              >3中国公民在马代溺亡1人被鲨鱼咬伤</a
            >
          </div>
        </div>
      </el-aside>
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
    z-index: 1;
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