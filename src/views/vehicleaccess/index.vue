<template>
  <div class="car-index-container">
    <div class="car-container-right car-pulic_box_shadow">
      <el-form :inline="true" class="car-demo-form-inline">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="timelist"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 260px;">
          </el-date-picker>
        </el-form-item>
    
        <el-button
          style="margin-left: 20px"
          type="primary"
          size="medium"
          icon="el-icon-search"
          @click="getcarwashoutProcessList()">查询</el-button>

      </el-form>

      <el-table :data="listCar" stripe style="width: 1150px" border
        :row-style="iRowStyle"
        :cell-style="iCellStyle"
        :header-row-style="iHeaderRowStyle"
        :header-cell-style="iHeaderCellStyle">

        <el-table-column
                prop="SN"
                width="200"
                label="编号"
                align="center"
              />

              <el-table-column
                prop="address"
                width="390"
                label="位置"
                align="center"
              />
              <el-table-column
                prop="create_time"
                width="260"
                label="时间"
                align="center"
              />
              
              <el-table-column
                prop="img"
                width="300"
                label="图片"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="car-img">
                    <el-image 
                      fit="cover"
                      style="width: 200px; height: 60px"
                      :src="scope.row.img"
                      :preview-src-list="srcList">
                    </el-image>
                  </div>
                </template>
              </el-table-column>
            </el-table>

      <div class="block" style="margin-top: 0px">
        <el-pagination
          :current-page="current"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, sizes, prev, pager, next"
          @current-change="getcarwashoutProcessList"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>

      <div class="car-echarts_view">
        <div class="car-echarts_view_top">
          <div class="car-echarts_view_l">
            <div class="car-echarts_view_title">年度通行消毒次数统计</div>
            <div
              id="echarttemp"
              style="width: 1150px; height: 400px"
              ref="echarttemp"
            ></div>
          </div>
          <div class="car-echarts_view_r">
          </div>
        </div>
        <div class="car-echarts_view_center"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
import {
  getcarwashoutProcessList,
  getChartinfo
} from "../../request/api";
import { Message } from "element-ui";
export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      location_id: "",
      current: 1, //当前页
      limit: 10, //每页显示记录数
      total: 0, //总记录数
      listCar: [],
      srcList: [],
      timelist: [],
      chartTempDom: "",
      myChartTemp: "",
      optionTemp: "",
      
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.chartTempDom = this.$refs.echarttemp;
      this.myChartTemp = echarts.init(this.chartTempDom);

      this.getcarwashoutProcessList();
      this.getChartinfo();
    });
  },
  methods: {
    iRowStyle: function ({ row, rowIndex }) {
      return "height:35px";
    },
    iHeaderRowStyle: function ({ row, rowIndex }) {
      return "height:46px";
    },
    iCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },
    iHeaderCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },
    //日期格式化
    dateFormat: function (date) {
      // var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    isEmpty(obj) {
      if (obj == null || obj == undefined || obj == "") {
        return true;
      } else {
        return false;
      }
    },
    getChartinfo() {
      getChartinfo({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          let xdata = res.data.xdata;
          let ydata = res.data.ydata;
          let series = [
            {
              name: "数量",
              // type: "bar",
              color: '#5470c6',
              // data: ydata,
              // barWidth: 12,
              data: ydata,
              type: 'line',
              areaStyle: {}
            },
            // {
            //   name: "失败",
            //   type: "bar",
            //   color: '#91cc75',
            //   data: yfail,
            //   barWidth: 12
            // }
          ];
          this.initChart(xdata,series);
        } else {
          Message({
            type: "warning",
            message: res.data.msg,
            showClose: true,
            duration: 3000,
          });
        }
      });
    },
    getcarwashoutProcessList(page = 1) {
      this.current = page;
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        page: this.current,
        limit: this.limit,
        start_time: (this.timelist != null && this.timelist.length > 0) ? this.dateFormat(this.timelist[0]) + ' 00:00:00' : '',
        // start_time: '2023-03-17 00:00:00',
        end_time: (this.timelist != null && this.timelist.length > 0) ? this.dateFormat(this.timelist[1]) + ' 23:59:59' : '',
      }
      console.log(params)
      getcarwashoutProcessList(params).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listCar = res.data.data;
          this.total = parseInt(res.data.count);
          this.listCar.forEach(element => {
            this.srcList.push(element.img)
          });
        } else {
          Message({
            type: "warning",
            message: res.data.msg,
            showClose: true,
            duration: 3000,
          });
        }
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getcarwashoutProcessList();
    },
    initChart(xdata, series) {
      // 绘制图表

      this.myChartTemp.setOption({
        title: {
          // text: "成功/失败",
          // fontSize: 12
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          show: true
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: false }
          }
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          name: "月",
          data: xdata,
          boundaryGap: false,
        },
        yAxis: {
          name: "数量(次)",
          min: 0,
          minInterval: 1,
        },
        series: series,
      });
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.car-index-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.car-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}

.car-container-right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 20px;
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.car-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.car-demo-form-inline {
  margin-top: 20px;
}

.car-echarts_view {
  margin-top: 0px;
}

.car-echarts_view_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;
}

.car-echarts_view_l {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.car-echarts_view_title {
  font-size: 24px;
  padding: 10px 0px;
}

.car-echarts_view_center {
}

.car-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
}

</style>