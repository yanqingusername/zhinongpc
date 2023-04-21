<template>
  <div class="dis-index-container">
    <div class="dis-container-left dis-pulic_box_shadow">
      <div
        :class="[numberType == 1 ?'dis-click_view_activity':'dis-click_view']"
        @click="handleClick(1)">今日预警</div>
      <div
        :class="[numberType == 2 ?'dis-click_view_activity':'dis-click_view']"
        @click="handleClick(2)">今日淋浴记录</div>
      <div
        :class="[numberType == 3 ?'dis-click_view_activity':'dis-click_view']"
        @click="handleClick(3)">淋浴历史记录</div>
    </div>

    <div class="dis-container-right dis-pulic_box_shadow">
      <el-form :inline="true" class="dis-demo-form-inline">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="timelist"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 260px"
            :readonly="(numberType == 3) ? false : true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="real_name">
          <el-input v-model="real_name" placeholder="请输入姓名" clearable style="width: 140px"/>
        </el-form-item>
        <el-form-item label="位置" prop="location_id">
          <el-input v-model="location_id" placeholder="请输入位置" clearable style="width: 140px"/>
        </el-form-item>
        <!-- <el-form-item label="位置" prop="positon">
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
        </el-form-item> -->

        <el-form-item label="结果" prop="results" v-if="numberType == 2 || numberType == 3">
          <el-select
            v-model="results"
            filterable
            clearable
            placeholder="请选择结果"
            style="width: 160px">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option label="成功" value="1"></el-option>
            <el-option label="失败" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-button
          style="margin-left: 20px"
          type="primary"
          size="medium"
          icon="el-icon-search"
          @click="getIwadomlistinfos()">查询</el-button>

        <el-button
          type="primary"
          size="medium"
          @click="exportData()"
          style="margin-left: 20px">导出</el-button>
      </el-form>

      <el-table :data="listIwadom" stripe style="width: 100%" border
        :row-style="iRowStyle"
        :cell-style="iCellStyle"
        :header-row-style="iHeaderRowStyle"
        :header-cell-style="iHeaderCellStyle">
        <el-table-column
          prop="head_url"
          width="120"
          label="头像"
          align="center">
          <template slot-scope="scope">
            <div class="dis-img">
              <el-avatar :src="scope.row.head_url"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="real_name"
          width="160"
          label="姓名"
          align="center"
        />

        <el-table-column
          prop="job_num"
          width="180"
          label="卡号"
          align="center"
        />
        <el-table-column
          prop="wash_time"
          width="130"
          label="时长"
          align="center"
        />
        <el-table-column
          prop="create_time"
          width="200"
          label="淋浴结束时间"
          align="center"
        />
        <el-table-column prop="address" width="160" label="位置" align="center" />
        <el-table-column prop="status" width="100" label="结果" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.status == '1'">成功</p>
            <p v-if="scope.row.status == '0'">失败</p>
          </template>
        </el-table-column>

        <el-table-column
          prop="workType"
          width="100"
          label="上/下班"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.workType == ''">未知</p>
            <p v-if="scope.row.workType == '1'">上班</p>
            <p v-if="scope.row.workType == '2'">下班</p>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="check_in_time"
          width="180"
          label="门禁刷卡时间"
          align="center"
        /> -->
      </el-table>

      <div class="block" style="margin-top: 0px">
        <el-pagination
          :current-page="current"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, sizes, prev, pager, next"
          @current-change="getIwadomlistinfos"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>

      <div class="dis-echarts_view">
        <div class="dis-echarts_view_top">
          <div class="dis-echarts_view_l">
            <div class="dis-echarts_view_title">员⼯淋浴监控⽉统计表</div>
            <div
              id="echarttemp"
              style="width: 1150px; height: 400px"
              ref="echarttemp"
            ></div>
          </div>
          <div class="dis-echarts_view_r">
          </div>
        </div>
        <div class="dis-echarts_view_center"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
import {
  getIwadomlistinfos,
  getIwadomChart
} from "../../request/api";
import { Message } from "element-ui";
import { stringify } from "qs";
export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      real_name: "",
      location_id: "",
      results: "0",
      current: 1, //当前页
      limit: 10, //每页显示记录数
      total: 0, //总记录数
      listIwadom: [],
      timelist: [
        new Date().getTime(),
        new Date().getTime(),
      ],
      chartTempDom: "",
      myChartTemp: "",
      optionTemp: "",
      
      numberType: 1, // 1-今日预警  2-今日淋浴记录  3-淋浴历史记录
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.chartTempDom = this.$refs.echarttemp;
      this.myChartTemp = echarts.init(this.chartTempDom);

      this.getIwadomlistinfos();
      this.getIwadomChart();
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
    getIwadomChart() {
      getIwadomChart({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          let xdata = res.data.xdata;
          let ysuccess = res.data.ysuccess;
          let yfail = res.data.yfail;
          let series = [
            {
              name: "成功",
              type: "bar",
              color: '#5470c6',
              data: ysuccess,
            },
            {
              name: "失败",
              type: "bar",
              color: '#91cc75',
              data: yfail,
            }
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
    getIwadomlistinfos(page = 1) {
      this.current = page;
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        page: this.current,
        limit: this.limit,
        start_time: this.dateFormat(this.timelist[0]) + ' 00:00:00',
        // start_time: '2023-03-17 00:00:00',
        end_time: this.dateFormat(this.timelist[1]) + ' 00:00:00',
        address: this.location_id,
        status: this.results, //(1-成功  0-失败)
        realname: this.real_name
      }
      console.log(params)
      getIwadomlistinfos(params).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listIwadom = res.data.data;
          this.total = parseInt(res.data.count);
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
      this.getIwadomlistinfos();
    },
    initChart(xdata, series) {
      // 绘制图表

      this.myChartTemp.setOption({
        title: {
          // text: "成功/失败",
          // fontSize: 12
        },
        tooltip: {},
        legend: {
          show: true
        },
        toolbox: {
          show: true,
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
          name: "天",
          data: xdata,
        },
        yAxis: {
          name: "数量(次)"
        },
        series: series,
      });
    },
    handleClick(number) {
      this.numberType = number;
      if(number == 3){
        this.results = '';
      } else if (number == 2){
        this.results = '';
      } else {
        this.results = '0';
      }
      this.real_name = '';
      this.location_id = '';
      this.current = '';
      this.timelist = [
        new Date().getTime(),
        new Date().getTime(),
      ]
      this.limit = 10;
      this.getIwadomlistinfos();
    },
    //导出数据
    exportData() {
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        start_time: this.dateFormat(this.timelist[0]) + ' 00:00:00',
        end_time: this.dateFormat(this.timelist[1]) + ' 00:00:00',
        address: this.location_id,
        status: this.results, //(1-成功  0-失败)
        realname: this.real_name
      }

      window.open(
        `http://syrdev.coyotebio-lab.com:8080/wisdomLivestockWH/PCiwadom/ExportIwadomLists.hn?${stringify(params)}`
      );
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.dis-index-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.dis-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  height: 600px;
}

.dis-container-right {
  width: 1160px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 20px;
  margin-left: 200px;
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.dis-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.dis-demo-form-inline {
  margin-top: 20px;
}

.dis-echarts_view {
  margin-top: 0px;
}

.dis-echarts_view_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;
}

.dis-echarts_view_l {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dis-echarts_view_title {
  font-size: 24px;
  padding: 10px 0px;
}

.dis-echarts_view_center {
}

.dis-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
}
.dis-click_view{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
  margin-top: 20px; 
  margin-left: 0px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.dis-click_view_activity{
  color: #FFF;
  background-color: #409EFF;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  border: 1px solid #409EFF;
  margin-top: 20px; 
  margin-left: 0px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>