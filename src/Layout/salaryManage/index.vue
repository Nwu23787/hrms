<template>
  <div class="main">
    <!-- 头部筛选模块 -->
    <div class="header">
      <el-form :inline="true" :model="formData">
        <el-form-item label="加班工资（元/小时）:" prop="overTimeSalary">
          <el-input-number
            v-model="formData.overTimeSalary"
            controls-position="right"
            :min="0"
            :max="200"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="旷工罚款（元/小时）:"
          prop="absentTimeSalary"
          style="margin-left: 70px"
        >
          <el-input-number
            v-model="formData.absentTimeSalary"
            controls-position="right"
            :min="0"
            :max="200"
          ></el-input-number>
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
        :key="Math.random()"
      >
        <el-table-column prop="id" label="工号" sortable width="134">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="134">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="134">
        </el-table-column>
        <el-table-column prop="post" label="职位" width="133">
        </el-table-column>
        <el-table-column
          prop="sumBaseSalary"
          label="本月基本工资（元）"
          width="170"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="sumOverTimeSalary"
          label="本月加班工资（元）"
          width="170"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="sumAbsentTimeSalary"
          label="本月旷工罚款（元）"
          width="170"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="sumSalary"
          label="本月应发工资（元）"
          width="170"
          sortable
        >
        </el-table-column
      ></el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表头筛选数据
      formData: {
        overTimeSalary: 0,
        absentTimeSalary: 0,
      },
      //模拟后端返回的数据
      userData: [
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 55, //上班时间
          sumOverTime: 13, //加班时间
          absentTime: 0, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 111, //上班时间
          sumOverTime: 42, //加班时间
          absentTime: 11, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 52, //上班时间
          sumOverTime: 44, //加班时间
          absentTime: 18, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 67, //上班时间
          sumOverTime: 0, //加班时间
          absentTime: 100, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 12, //上班时间
          sumOverTime: 9, //加班时间
          absentTime: 1, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 33, //上班时间
          sumOverTime: 14, //加班时间
          absentTime: 5, //旷工时间
        },
                {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 52, //上班时间
          sumOverTime: 44, //加班时间
          absentTime: 18, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 67, //上班时间
          sumOverTime: 0, //加班时间
          absentTime: 100, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 12, //上班时间
          sumOverTime: 9, //加班时间
          absentTime: 1, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 33, //上班时间
          sumOverTime: 14, //加班时间
          absentTime: 5, //旷工时间
        },
                {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 52, //上班时间
          sumOverTime: 44, //加班时间
          absentTime: 18, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 67, //上班时间
          sumOverTime: 0, //加班时间
          absentTime: 100, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 12, //上班时间
          sumOverTime: 9, //加班时间
          absentTime: 1, //旷工时间
        },
        {
          id: 990001,
          name: "大骏马",
          department: "营销部",
          post: "经理",
          salary: 30,
          sumWorkTime: 33, //上班时间
          sumOverTime: 14, //加班时间
          absentTime: 5, //旷工时间
        },
      ],
    };
  },
  computed: {
    //渲染表格数据，自动计算各种工资和罚款
    tableData() {
      console.log(this.userData);
      const arr = this.userData;
      console.log(arr);
      arr.map((value, index) => {
        //总基本工资
        value.sumBaseSalary = value.sumWorkTime * value.salary;
        //总加班费
        value.sumOverTimeSalary =
          value.sumOverTime * this.formData.overTimeSalary;
        //总旷工罚款
        value.sumAbsentTimeSalary =
          value.absentTime * this.formData.absentTimeSalary;
        //本月总工资,工资最低为0
        value.sumSalary =
          value.sumBaseSalary +
            value.sumOverTimeSalary -
            value.sumAbsentTimeSalary >
          0
            ? value.sumBaseSalary +
              value.sumOverTimeSalary -
              value.sumAbsentTimeSalary
            : 0;
      });
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 20px auto;
  height: 90%;
  width: 97%;
  padding: 20px;

  .header {
    width: 100%;
    height: 120px;
    // background-color: #9be485;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding-left: 40px;
    padding-top: 40px;

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