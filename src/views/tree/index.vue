<template>
  <div class="tree-container">
    <div class="container-left pulic_box_shadow">
        <el-button size="medium" style="margin-top:20px;margin-left:0px;">今日预警</el-button>
        <el-button size="medium" style="margin-top:20px;margin-left:0px;">今日淋浴记录</el-button>
        <el-button size="medium" style="margin-top:20px;margin-left:0px;">淋浴历史记录</el-button>
    </div>

    <div class="container-right pulic_box_shadow">
        <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="时间范围">
                <el-date-picker
                v-model="timelist"
                type="datetimerange"
                @change="consoledata()"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                >
                </el-date-picker>
               </el-form-item>
               <el-form-item label="姓名" prop="real_name">
                <el-input
                  v-model="real_name"
                  placeholder="请输入姓名"
                  clearable
                />
              </el-form-item>
              <el-form-item label="位置" prop="positon">
                <el-select
                  v-model="positon"
                  filterable
                  clearable
                  placeholder="请选择位置"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="位置1" value="1"></el-option>
                  <el-option label="位置2" value="2"></el-option>
                  <el-option label="位置3" value="3"></el-option>
                  <el-option label="位置4" value="4"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="结果" prop="results">
                <el-select
                  v-model="results"
                  filterable
                  clearable
                  placeholder="请选择结果"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="成功" value="1"></el-option>
                  <el-option label="失败" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-button
                style="margin-left:20px;"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="getDetailsList()">查询</el-button>

              <el-button type="primary" size="medium" @click="exportDetailsData()" style="margin-left:20px;">导出</el-button>
            </el-form>

            <el-table :data="list" stripe style="width: 100%" border>
                <el-table-column
                prop="operation"
                width="120"
                label="头像"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </template>
              </el-table-column>
              <el-table-column
                prop="source_label"
                width="100"
                label="姓名"
                align="center"
              />
              
              <el-table-column
                prop="label_id"
                width="120"
                label="卡号"
                align="center"
              />
              <el-table-column
                prop="operation"
                width="80"
                label="时长"
                align="center"
              />
              <el-table-column
                prop="check_in_time"
                width="200"
                label="淋浴结束时间"
                align="center"
              />
              <el-table-column
                prop="dorm"
                width="160"
                label="位置"
                align="center"
              />
              <el-table-column
                prop="status"
                width="100"
                label="结果"
                align="center"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.status == '1'">成功</p>
                  <p v-if="scope.row.status == '2'">失败</p>
                </template>
              </el-table-column>

              <el-table-column
                prop="status"
                width="100"
                label="上/下班"
                align="center"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.status == '1'">上班</p>
                  <p v-if="scope.row.status == '2'">下班</p>
                </template>
              </el-table-column>

              <el-table-column
                prop="check_in_time"
                width="180"
                label="门禁刷卡时间"
                align="center"
              />
              
            </el-table>

            <div class="block" style="margin-top: 15px">
              <el-pagination
                :current-page="current"
                :page-size="limit"
                :total="total"
                style="padding: 30px 0; text-align: center"
                layout="total, sizes, prev, pager, next"
                @current-change="getList"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>

            <div class="echarts_view">
                <div class="echarts_view_top">
                    <div class="echarts_view_l">
                        <div class="echarts_view_title">月统计图</div>
                        <div id="echarttemp" style="width: 600px;height:400px;" ref="echarttemp"></div>
                    </div>
                    <div class="echarts_view_r">
                        <!-- <div class="echarts_view_title">猪只活跃度</div>
                        <div id="echartact" style="width: 600px;height:400px;"></div> -->
                    </div>
                </div>
                <div class="echarts_view_center">
                    
                </div>
            </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      currentDate: new Date(),
      real_name: "",
      positon: "",
      results: "",
      current: 1, //当前页
      limit: 20, //每页显示记录数
      total: 60, //总记录数
      list: [
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000731",
          source_label: "Y173708",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5809,
          parent_id: 3291,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000899",
          source_label: "L90904",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5810,
          parent_id: 3291,
          temperature: 35.5,
          activity: 1
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000860",
          source_label: "Y174004",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5811,
          parent_id: 3291,
          temperature: 35,
          activity: 0
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000512",
          source_label: "Y174110",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5813,
          parent_id: 3291,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000749",
          source_label: "Y173802",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5814,
          parent_id: 3291,
          temperature: 37,
          activity: 3
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000423",
          source_label: "Y174002",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5812,
          parent_id: 3291,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 3,
          dorm: "栏33",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3369,
          label_id: "89000774",
          source_label: "Y170704",
          door: "西11舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 10:21",
          serial: 5633,
          parent_id: 3336,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏18",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3215,
          label_id: "89000784",
          source_label: "Y129711",
          door: "西3舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 10:21",
          serial: 5596,
          parent_id: 3197,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏18",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3215,
          label_id: "89000558",
          source_label: "Y131611",
          door: "西3舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 10:21",
          serial: 5595,
          parent_id: 3197,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏18",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3215,
          label_id: "89000479",
          source_label: "Y130807",
          door: "西3舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 10:21",
          serial: 5594,
          parent_id: 3197,
          temperature: 36,
          activity: 2
        },
      ],
      timelist: [
          new Date().getTime() - 3 * 24 * 60 * 60 * 1000,
          new Date().getTime(),
        ],
      chartTempDom: "",
      myChartTemp: "",
      optionTemp: "",
      chartActDom: "",
      myChartAct: "",
      optionAct: "",

      
    };
  },
  created() {
    // this.getList();
    
    
  },
  mounted(){
    this.$nextTick(() => {
      this.chartTempDom = this.$refs.echarttemp;
      this.myChartTemp = echarts.init(this.chartTempDom);

    //   this.chartActDom = document.getElementById("echartact");
    //   this.myChartAct = echarts.init(this.chartActDom);

      this.initChart();
    });
  },
  methods: {
    
      //日期格式化
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    isEmpty(obj) {
      if (obj == null || obj == undefined || obj == "") {
        return true;
      } else {
        return false;
      }
    },
    getList(page = 1) {
      this.current = page;
      //   if (
      //     !this.isEmpty(this.searchObj.commodity) &&
      //     this.isEmpty(this.searchObj.timelist)
      //   ) {
      //     console.log("1");
      //     this.$message.warning("请选择三天内的时间范围");
      //     return;
      //   } else if (
      //     !this.isEmpty(this.searchObj.status) &&
      //     this.isEmpty(this.searchObj.timelist)
      //   ) {
      //     console.log("2");
      //     this.$message.warning("请选择三天内的时间范围");
      //     return;
      //   } else if (
      //     this.isEmpty(this.searchObj.commodity) &&
      //     this.isEmpty(this.searchObj.status) &&
      //     this.isEmpty(this.searchObj.timelist) &&
      //     this.isEmpty(this.searchObj.orderNumber) &&
      //     this.isEmpty(this.searchObj.userId) &&
      //     this.isEmpty(this.searchObj.name) &&
      //     this.isEmpty(this.searchObj.phone)
      //   ) {
      //     console.log("3");
      //     this.$message.warning("请选择三天内的时间范围");
      //     return;
      //   }
      //   order
      //     .getorderinfo(this.current, this.limit, this.searchObj)
      //     .then((response) => {
      //       this.list = response.data.records;
      //       //总记录数
      //       this.total = response.data.total;
      //       this.searchObj.startTime = "";
      //       this.searchObj.endTime = "";
      //     })
      //     .catch((error) => {
      //       //请求失败
      //       console.log(error);
      //     });
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    consoledata() {
      if (!this.isEmpty(this.searchObj.timelist)) {
        if (
          this.searchObj.timelist[1].getTime() -
            this.searchObj.timelist[0].getTime() >
          3 * 24 * 60 * 60 * 1000
        ) {
          console.log("时间间隔大于三天");
          this.$message.warning("时间范围不能超过3天");
          this.searchObj.timelist = [];
          return;
        }
      }
    },
    getDetailsList(page = 1) {
      this.current = page;
      //   if (
      //     !this.isEmpty(this.searchObj.commodity) &&
      //     this.isEmpty(this.searchObj.timelist)
      //   ) {
      //     console.log("1");
      //     this.$message.warning("请选择三天内的时间范围");
      //     return;
      //   } else if (
      //     !this.isEmpty(this.searchObj.status) &&
      //     this.isEmpty(this.searchObj.timelist)
      //   ) {
      //     console.log("2");
      //     this.$message.warning("请选择三天内的时间范围");
      //     return;
      //   } else if (
      //     this.isEmpty(this.searchObj.commodity) &&
      //     this.isEmpty(this.searchObj.status) &&
      //     this.isEmpty(this.searchObj.timelist) &&
      //     this.isEmpty(this.searchObj.orderNumber) &&
      //     this.isEmpty(this.searchObj.userId) &&
      //     this.isEmpty(this.searchObj.name) &&
      //     this.isEmpty(this.searchObj.phone)
      //   ) {
      //     console.log("3");
      //     this.$message.warning("请选择三天内的时间范围");
      //     return;
      //   }
      //   order
      //     .getorderinfo(this.current, this.limit, this.searchObj)
      //     .then((response) => {
      //       this.list = response.data.records;
      //       //总记录数
      //       this.total = response.data.total;
      //       this.searchObj.startTime = "";
      //       this.searchObj.endTime = "";
      //     })
      //     .catch((error) => {
      //       //请求失败
      //       console.log(error);
      //     });
    },
    exportDetailsData() {
      if (this.searchObj.timelist == null) {
        alert("导出时必须选择开始时间与结束时间，开始至结束之间不能超过3天。");
      } else {
        this.searchObj.startTime = moment(this.searchObj.timelist[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.searchObj.endTime = moment(this.searchObj.timelist[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.cleandata = true;
        window.open(
          `http://prod.coyotebio-lab.com:8995/admin/order/exportinfo?${stringify(
            this.searchObj
          )}`
        );
        // window.open(`http://localhost:8995/admin/order/exportinfo?${stringify(this.searchObj)}`)
        this.searchObj.userid = "";
        this.searchObj.orderStatus = "";
        this.searchObj.status = "";
        this.searchObj.orderNumber = "";
        this.searchObj.userId = "";
        this.searchObj.commodity = "";
        this.searchObj.name = "";
        this.searchObj.phone = "";
      }
    },
    initChart(){
        // 绘制图表

        this.myChartTemp.setOption({
            title: {
                text: '成功/失败'
            },
            tooltip: {},
            xAxis: {
                data: ['张三', '李四', '王五', '小明', '赵六', '哈哈']
            },
            yAxis: {},
            series: [
                {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
                }
            ]
        });

        // 绘制图表
        // this.myChartAct.setOption({
        //     title: {
        //         text: ''
        //     },
        //     tooltip: {},
        //     xAxis: {
        //         data: ['张三', '李四', '王五', '小明', '赵六', '哈哈']
        //     },
        //     yAxis: {},
        //     series: [
        //         {
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //         }
        //     ]
        // });
    },
    
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.tree-container{
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    width: 100%;
    /* height: 100vh; */
}

.container-left{
    width: 180px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
}

.container-right{
    width: 1160px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0px 20px;
    /* height: 800px; */
    /* overflow-y: scroll; */
}

.pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}



.demo-form-inline{
    margin-top: 20px;
}




.echarts_view{
    margin-top: 50px;
}

.echarts_view_top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

.echarts_view_l{
    display: flex;
    flex-direction: column;
}

.echarts_view_title{
    font-size: 18px;
}

.echarts_view_center{

}
</style>