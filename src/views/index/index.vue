<template>
  <div class="index-index-container">
    <div class="index-index-container-1">
      <div class="index-container-left index-pulic_box_shadow">
        <div class="index-pie-view">
          <div style="margin-right: 40px">猪只个体健康</div>
          <el-row>
            <el-date-picker
              v-model="currentDate"
              align="right"
              type="month"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-row>
        </div>
        <div class="index-pie-view">
          <div
            id="echarttemp1"
            style="width: 200px; height: 200px"
            ref="echarttemp1"
          ></div>
          <div
            id="echarttemp2"
            style="width: 200px; height: 200px"
            ref="echarttemp2"
          ></div>
          <div
            id="echarttemp3"
            style="width: 200px; height: 200px"
            ref="echarttemp3"
          ></div>
        </div>
      </div>

      <div class="index-container-right index-pulic_box_shadow">
        <div style="padding: 20px">发热猪信息</div>

        <el-table :data="list" stripe style="width: 660px" border height="250" :row-style="{height:'30px'}" :cell-style="{padding: '0px'}">
          <el-table-column
            prop="Sitearea"
            width="120"
            label="场区"
            align="center"
          />
          <el-table-column
            prop="door"
            width="120"
            label="栋舍"
            align="center"
          />
          <el-table-column
            prop="dorm"
            width="120"
            label="栏位"
            align="center"
          />
          <el-table-column
            prop="source_label"
            width="100"
            label="耳号"
            align="center"
          />
          <el-table-column
            prop="temperature"
            width="80"
            label="体温(°C)"
            align="center"
          />
          <el-table-column
            prop="activity"
            width="120"
            label="活跃度"
            align="center"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.activity == '0'">无</p>
              <p v-if="scope.row.activity == '1'">低</p>
              <p v-if="scope.row.activity == '2'">中</p>
              <p v-if="scope.row.activity == '3'">高</p>
            </template>
          </el-table-column>
        </el-table>

        <div class="index-block" >
          <el-pagination
            :current-page="current"
            :page-size="limit"
            :total="total"
            style="padding: 10px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getList"
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>
    </div>

    <div class="index-index-container-2">
      <div class="index-container-2-left index-pulic_box_shadow">
        <div style="padding: 20px">淋浴预警 失败累计数量(10)</div>

        <el-table :data="list" stripe style="width: 400px" border height="300" :row-style="{height:'30px'}" :cell-style="{padding: '0px'}">
          <el-table-column
            prop="operation"
            width="80"
            label="头像"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="source_label"
            width="100"
            label="姓名"
            align="center"
          />

          <el-table-column
            prop="check_in_time"
            width="120"
            label="时间"
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
        </el-table>

        <div class="index-block" style="margin-top: 15px">
          <el-pagination
            :current-page="current"
            :page-size="limit"
            :total="total"
            style="padding: 10px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getList"
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div class="index-container-2-right index-pulic_box_shadow">
        <div style="padding: 20px">物资消毒预警 违规累计数量(10)</div>

        <el-table :data="list" stripe style="width: 400px" border height="300" :row-style="{height:'30px'}" :cell-style="{padding: '0px'}">
          <el-table-column
            prop="Sitearea"
            width="80"
            label="位置"
            align="center"
          />
          <el-table-column
            prop="check_in_time"
            width="120"
            label="时间"
            align="center"
          />
          <el-table-column
            prop="status"
            width="100"
            label="结果"
            align="center"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.status == '1'">正常</p>
              <p v-if="scope.row.status == '2'">违规</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            width="100"
            label="原因"
            align="center"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.status == '1'">未审核</p>
              <p v-if="scope.row.status == '2'">已审批</p>
            </template>
          </el-table-column>
        </el-table>

        <div class="index-block" style="margin-top: 15px">
          <el-pagination
            :current-page="current"
            :page-size="limit"
            :total="total"
            style="padding: 10px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getList"
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div class="index-container-2-right index-pulic_box_shadow">
        <div style="padding: 20px">小动物预警</div>

        <el-table :data="list" stripe style="width: 400px" border height="300" >
          <el-table-column
            prop="Sitearea"
            width="80"
            label="位置"
            align="center"
          />
          <el-table-column
            prop="check_in_time"
            width="120"
            label="时间"
            align="center"
          />
          <el-table-column
            prop="imageUrl"
            width="200"
            label="图片"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 160px; height: 60px"
                :src="scope.row.imageUrl"
                :preview-src-list="srcList"
              >
              </el-image>
            </template>
          </el-table-column>
        </el-table>

        <div class="index-block" style="margin-top: 15px">
          <el-pagination
            :current-page="current"
            :page-size="limit"
            :total="total"
            style="padding: 10px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getList"
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      current: 1, //当前页
      limit: 20, //每页显示记录数
      total: 60, //总记录数
      srcList: [
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      ],
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
          activity: 2,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 1,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 0,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 2,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 3,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 2,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 2,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 2,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 2,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
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
          activity: 2,
          imageUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
      ],

      chartTempDom1: "",
      myChartTemp1: "",
      optionTemp1: "",

      chartTempDom2: "",
      myChartTemp2: "",
      optionTemp2: "",

      chartTempDom3: "",
      myChartTemp3: "",
      optionTemp3: "",
    };
  },
  created() {
    // this.getList();
  },
  mounted() {
    this.$nextTick(() => {
      this.chartTempDom1 = this.$refs.echarttemp1;
      this.myChartTemp1 = echarts.init(this.chartTempDom1);

      this.chartTempDom2 = this.$refs.echarttemp2;
      this.myChartTemp2 = echarts.init(this.chartTempDom2);

      this.chartTempDom3 = this.$refs.echarttemp3;
      this.myChartTemp3 = echarts.init(this.chartTempDom3);

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
    initChart() {
      // 绘制图表
      this.myChartTemp1.setOption({
        title: {
          text: "123\n存栏",
          textStyle:{
            lineHeight: 22
          },
          // text: "123",
          // subtext: "存栏",
          left: "center",
          top: "center",
          // subtextStyle:{
          //   fontSize: 16
          // }
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            data: [{ value: 0, name: "A" }],
          },
        ],
      });

      this.myChartTemp2.setOption({
        title: {
          text: "12\n发热",
          textStyle:{
            lineHeight: 22
          },
          // text: "123",
          // subtext: "存栏",
          left: "center",
          top: "center",
          // subtextStyle:{
          //   fontSize: 16
          // }
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            data: [{ value: 335, name: "A" }],
            color: "red",
          },
        ],
      });

      this.myChartTemp3.setOption({
        title: {
          text: "30\n离线",
          textStyle:{
            lineHeight: 22
          },
          // text: "123",
          // subtext: "存栏",
          left: "center",
          top: "center",
          // subtextStyle:{
          //   fontSize: 16
          // }
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            data: [{ value: 335, name: "A" }],
          },
        ],
      });
    },
  },
};
</script>

<style>
.index-index-container {
  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  width: 100%;
  flex-direction: column;
  /* height: 100vh; */
}

.index-index-container-1 {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
  height: 400px;
}

.index-container-left {
  width: 665px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  padding: 20px 0px;
}

.index-container-right {
  width: 665px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 20px;
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.index-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.index-pie-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.index-index-container-2 {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
  height: 400px;
  margin-top: 20px;
}

.index-container-2-left {
  width: 420px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  padding: 0px 10px;
}

.index-container-2-right {
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 10px;
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.index-demo-form-inline {
  margin-top: 20px;
}

.index-echarts_view {
  margin-top: 40px;
}

.index-echarts_view_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.index-echarts_view_l {
  display: flex;
  flex-direction: column;
}

.index-echarts_view_title {
  font-size: 18px;
}

.index-echarts_view_center {
}
</style>