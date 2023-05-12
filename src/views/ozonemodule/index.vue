<template>
  <div class="ozone-index-container">
    <div class="ozone-container-left ozone-pulic_box_shadow">
      <div
        :class="[numberType == 1 ?'ozone-click_view_activity':'ozone-click_view']"
        @click="handleClick(1)">今日臭氧预警</div>
      <div
        :class="[numberType == 2 ?'ozone-click_view_activity':'ozone-click_view']"
        @click="handleClick(2)">今日臭氧记录</div>
      <div
        :class="[numberType == 3 ?'ozone-click_view_activity':'ozone-click_view']"
        @click="handleClick(3)">臭氧消毒记录</div>

      <div
        :class="[numberType == 4 ?'ozone-click_view_activity':'ozone-click_view']"
        @click="handleClick(4)">液体消毒记录</div>
    </div>

    <div class="ozone-container-right ozone-pulic_box_shadow">
      <div class="ozonemodule-dis-flex" v-show="numberType== 1 || numberType == 2 || numberType == 3">
        <div style="width: 100%;margin-top:20px;font-size: 20px;">物资臭氧监测记录</div>
        <el-form :inline="true" class="ozone-demo-form-inline1">
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
          <el-form-item label="位置" prop="location_id">
            <el-select
              v-model="location_id"
              filterable
              clearable
              placeholder="请选择位置"
            >
            <el-option
              v-for="(item, index) in listDevice"
              :key="index"
              :label="item.location_descr"
              :value="item.layout_id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="结果" prop="results" v-if="numberType == 2 || numberType == 3">
            <el-select
              v-model="results"
              filterable
              clearable
              placeholder="请选择结果"
              style="width: 160px">
              <!-- <el-option label="全部" value=""></el-option> -->
              <el-option label="正常" value="0"></el-option>
              <el-option label="违规" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-button
            style="margin-left: 20px"
            type="primary"
            size="medium"
            icon="el-icon-search"
            @click="getGoodslistinfos()">查询</el-button>

        </el-form>

        <el-table :data="listOzone" stripe style="width: 1150px" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
                <el-table-column
                  prop="address"
                  width="160"
                  label="位置"
                  align="center"
                />
                <el-table-column
                  prop="start_fumigation_time"
                  width="180"
                  label="时间"
                  align="center"
                />
                <el-table-column
                  prop="duration"
                  width="100"
                  label="时长(分钟)"
                  align="center"
                />
                
                <el-table-column
                  prop="status"
                  width="120"
                  label="结果"
                  align="center"
                >
                  <template slot-scope="scope">
                    <p v-if="scope.row.status == '1' || scope.row.status == '2' || scope.row.status == '3' || scope.row.status == '6'">正常</p>
                    <p v-if="scope.row.status == '0' || scope.row.status == '4' || scope.row.status == '5'">违规</p>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="ViolationReason"
                  width="210"
                  label="原因"
                  align="center"
                />

                <el-table-column
                  prop="status"
                  width="140"
                  label="审批状态"
                  align="center"
                >
                  <template slot-scope="scope">
                    <p v-if="scope.row.status == '3'">待审批</p>
                    <p v-if="scope.row.status == '5'">审批失败</p>
                    <p v-if="scope.row.status == '6'">审批通过</p>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="img"
                  width="240"
                  label="图片"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="ozone-img">
                      <el-image
                        fit="cover"
                        style="width: 200px; height: 60px"
                        :src="scope.row.img[0]"
                        :preview-src-list="scope.row.img">
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
            @current-change="getGoodslistinfos"
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>

        <div class="ozone-echarts_view">
          <div class="ozone-echarts_view_top">
            <div class="ozone-echarts_view_l">
              <!-- <div class="ozone-echarts_view_title"></div> -->
              <!-- <el-form :inline="true" class="ozone-demo-form-inline">
                <el-form-item label="时间范围">
                  <el-date-picker
                    v-model="timeEchartslist"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 260px">
                  </el-date-picker>
                </el-form-item>

                <el-button
                  style="margin-left: 20px"
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="getGoodsChart()">查询</el-button>
              </el-form> -->
              <!-- <div class="ozone-echarts_view_title">臭氧消毒监测结果月统计图</div> -->
              <el-form :inline="true" class="ozone-demo-form-inline">
                <el-form-item label="时间范围">
                  <el-date-picker
                    v-model="currentMonth"
                    align="right"
                    type="month"
                    placeholder="选择月份"
                    :clearable="false">
                  </el-date-picker>
                </el-form-item>

                <el-button
                  style="margin-left: 20px"
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="getGoodsChart()">查询</el-button>
              </el-form>

              <!-- <el-row>
                      <el-button round style="margin-right: 10px;">上一月</el-button>
                      <el-date-picker
                          v-model="currentDate"
                          align="right"
                          type="month"
                          placeholder="选择日期">
                      </el-date-picker>
                      <el-button round style="margin-left: 10px;">下一月</el-button>
                          <el-date-picker
                          v-model="timelist"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          >
                          </el-date-picker>
                  </el-row> -->
              <div
                id="echarttemp"
                style="width: 1150px; height: 400px;margin-top:20px;"
                ref="echarttemp"></div>
            </div>
            <div class="ozone-echarts_view_r">
            </div>
          </div>
          <div class="ozone-echarts_view_center"></div>
        </div>

      </div>

      <div class="ozonemodule-dis-flex" v-show="numberType== 4">
        <div style="width: 100%;margin-top:20px;font-size: 20px;">液体浸泡消毒历史记录</div>
          <el-form :inline="true" class="ozone-demo-form-inline1">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="timelist1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 260px"
                :readonly="(numberType == 3) ? false : true">
              </el-date-picker>
            </el-form-item>

            <el-button
              style="margin-left: 20px"
              type="primary"
              size="medium"
              icon="el-icon-search"
              @click="getLiquidlist()">查询</el-button>

          </el-form>

        <el-table :data="listOzone1" stripe style="width: 1150px" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">

                <el-table-column
                  prop="SN"
                  width="140"
                  label="SN号"
                  align="center"
                >
                </el-table-column>

                <el-table-column
                  prop="address"
                  width="180"
                  label="位置"
                  align="center"
                />
                <el-table-column
                  prop="create_time"
                  width="180"
                  label="创建时间"
                  align="center"
                />
                <el-table-column
                  prop="remain_time"
                  width="140"
                  label="时:分:秒"
                  align="center"
                />

                <el-table-column
                  prop="remain_time"
                  width="120"
                  label="PH值/浓度值"
                  align="center"
                >
                <template>
                    <p >-</p>
                  </template>
                </el-table-column>
                
                <el-table-column
                  prop="status"
                  width="150"
                  label="结果"
                  align="center"
                >
                  <template slot-scope="scope">
                    <p v-if="scope.row.status == '4'">失败</p>
                    <p v-else>正常</p>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="img"
                  width="240"
                  label="图片"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="ozone-img">
                      <el-image
                        fit="cover"
                        style="width: 200px; height: 60px"
                        :src="scope.row.img"
                        :preview-src-list="imgList">
                      </el-image>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

        <div class="block" style="margin-top: 0px">
          <el-pagination
            :current-page="current1"
            :page-size="limit1"
            :total="total1"
            style="padding: 30px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getLiquidlist"
            @size-change="handleSizeChange1"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>

        <div class="ozone-echarts_view">
          <div class="ozone-echarts_view_top">
            <div class="ozone-echarts_view_l">
              <el-form :inline="true" class="ozone-demo-form-inline">
                <el-form-item label="时间范围">
                  <el-date-picker
                    v-model="currentMonth1"
                    align="right"
                    type="year"
                    placeholder="选择年份">
                  </el-date-picker>
                </el-form-item>

                <el-button
                  style="margin-left: 20px"
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="getLiquidChart()">查询</el-button>
              </el-form>
              <div
                id="echarttempLiu"
                style="width: 1150px; height: 400px;margin-top:20px;"
                ref="echarttempLiu"></div>
            </div>
            <div class="ozone-echarts_view_r">
            </div>
          </div>
          <div class="ozone-echarts_view_center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
import {
  getGoodslistinfos,
  getGoodsChart,
  getDeviceInfo,
  getLiquidChart,
  getLiquidlist
} from "../../request/api";
import { Message } from "element-ui";
export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      location_id: "",
      results: "1",
      current: 1, //当前页
      limit: 10, //每页显示记录数
      total: 0, //总记录数
      listDevice: [],
      listOzone: [],
      timelist: [
        new Date().getTime(),
        new Date().getTime(),
      ],
      chartTempDom: "",
      myChartTemp: "",
      optionTemp: "",
      timeEchartslist: [
        new Date().getTime(),
        new Date().getTime(),
      ],
      currentMonth: new Date().getTime(),
      numberType: 1, // 1-今日预警  2-今日淋浴记录  3-淋浴历史记录

      current1: 1, //当前页
      limit1: 10, //每页显示记录数
      total1: 0, //总记录数
      listOzone1: [],
      timelist1: [
        // new Date().getTime(),
        // new Date().getTime(),
      ],
      chartTempDomLiu: "",
      myChartTempLiu: "",
      currentMonth1: new Date().getTime(),
      imgList: []
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.chartTempDom = this.$refs.echarttemp;
      this.myChartTemp = echarts.init(this.chartTempDom);

      this.getGoodslistinfos();
      this.getGoodsChart();
      this.getDeviceInfo();

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
    dateFormatMonth: function (date) {
      // var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM");
    },
    dateFormatMonth1: function (date) {
      // var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY");
    },
    isEmpty(obj) {
      if (obj == null || obj == undefined || obj == "") {
        return true;
      } else {
        return false;
      }
    },
    getDeviceInfo() {
      getDeviceInfo({
        pig_farm_id: this.userInfo.farm_id,
        type: '2'
      }).then((res) => {
        if (res.data.success) {
          this.listDevice = res.data.data;
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
    getGoodsChart() {
      console.log(this.currentMonth)
      getGoodsChart({
        pig_farm_id: this.userInfo.farm_id,
        month: this.dateFormatMonth(this.currentMonth)
        // start_time: this.dateFormat(this.timeEchartslist[0]) + ' 00:00:00',
        // end_time: this.dateFormat(this.timeEchartslist[1]) + ' 23:59:59',
      }).then((res) => {
        if (res.data.success) {
          let xdata = res.data.xdata;
          let ysuccess = res.data.ysuccess;
          let yfail = res.data.yfail;
          let series = [
            {
              name: "正常",
              type: "bar",
              color: '#5470c6',
              data: ysuccess,
              barWidth: 12
            },
            {
              name: "违规",
              type: "bar",
              color: '#91cc75',
              data: yfail,
              barWidth: 12
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
    getGoodslistinfos(page = 1) {
      this.current = page;
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        page: this.current,
        limit: this.limit,
        start_time: (this.timelist != null && this.timelist.length > 0) ? this.dateFormat(this.timelist[0]) + ' 00:00:00' : '',
        // start_time: '2023-03-17 00:00:00',
        end_time: (this.timelist != null && this.timelist.length > 0) ? this.dateFormat(this.timelist[1]) + ' 23:59:59' : '',
        address: this.location_id,
        status: this.results, //（0是正常 1是违规）
      }
      console.log(params)
      getGoodslistinfos(params).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listOzone = res.data.data;
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
      this.getGoodslistinfos();
    },
    initChart(xdata, series) {
      // 绘制图表

      this.myChartTemp.setOption({
        title: {
          text: "臭氧消毒监测结果月统计图",
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
          name: "天",
          data: xdata,
        },
        yAxis: {
          name: "数量(次)",
          min: 0,
          minInterval: 1,
        },
        series: series,
      });
    },
    handleClick(number) {
      this.numberType = number;
       if(number == 4){
        this.$nextTick(() => {
          this.chartTempDomLiu = document.getElementById("echarttempLiu");
          this.myChartTempLiu = echarts.init(this.chartTempDomLiu);
          this.timelist1 = [];
          this.current1 = 1;
          this.limit1 = 10;
          this.getLiquidlist();
          this.getLiquidChart();
        });
        
      } else if(number == 3){
        this.results = '';
        this.timelist = [];

        this.location_id = '';
        this.current = 1;
        this.limit = 10;
        this.getGoodslistinfos();
        this.getGoodsChart();
      } else if (number == 2){
        this.results = '';
        this.timelist = [
          new Date().getTime(),
          new Date().getTime(),
        ]
        // this.timelist1 = [
        //   new Date().getTime(),
        //   new Date().getTime(),
        // ]

        this.location_id = '';
        this.current = 1;
        this.limit = 10;
        this.getGoodslistinfos();
        this.getGoodsChart();
      } else {
        this.results = '1';
        this.timelist = [
          new Date().getTime(),
          new Date().getTime(),
        ]
        // this.timelist1 = [
        //   new Date().getTime(),
        //   new Date().getTime(),
        // ]

        this.location_id = '';
        this.current = 1;
        this.limit = 10;
        this.getGoodslistinfos();
        this.getGoodsChart();
      }
    },
    getLiquidChart() {
      getLiquidChart({
        pig_farm_id: this.userInfo.farm_id,
        year: this.dateFormatMonth1(this.currentMonth1)
      }).then((res) => {
        if (res.data.success) {
          let xdata1 = res.data.xdata;
          let ydata1 = res.data.ydata;
          let series1 = [
            {
              name: "数量",
              // type: "bar",
              color: '#5470c6',
              // data: ydata,
              // barWidth: 12,
              data: ydata1,
              type: 'line',
              areaStyle: {}
            },
            // {
            //   name: "违规",
            //   type: "bar",
            //   color: '#91cc75',
            //   data: yfail,
            //   barWidth: 12
            // }
          ];
          this.initChartLiu(xdata1,series1);
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
    getLiquidlist(page = 1) {
      this.current1 = page;
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        page: this.current1,
        limit: this.limit1,
        start_time: (this.timelist1 != null && this.timelist1.length > 0) ? this.dateFormat(this.timelist1[0]) + ' 00:00:00' : '',
        end_time: (this.timelist1 != null && this.timelist1.length > 0) ? this.dateFormat(this.timelist1[1]) + ' 23:59:59' : '',
      }
      getLiquidlist(params).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listOzone1 = res.data.data;
          this.total1 = parseInt(res.data.count);
          this.listOzone1.forEach(element => {
            this.imgList.push(element.img)
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
    handleSizeChange1(val) {
      this.limit1 = val;
      this.getLiquidlist();
    },
    initChartLiu(xdata1, series1) {
      // 绘制图表

      this.myChartTempLiu.setOption({
        title: {
          text: "年度消毒次数统计（面积图）",
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
          data: xdata1,
          boundaryGap: false,
        },
        yAxis: {
          name: "数量(次)",
          min: 0,
          minInterval: 1,
        },
        series: series1,
      });
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.ozone-index-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.ozone-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  height: 600px;
}

.ozone-container-right {
  width: 1160px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 20px;
  margin-left: 200px;
  /* height: 2000px; */
  /* overflow-y: scroll; */
}

.ozone-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.ozone-demo-form-inline {
  margin-top: 10px;
}

.ozone-demo-form-inline {
  margin-top: 20px;
}

.ozone-echarts_view {
  margin-top: 0px;
}

.ozone-echarts_view_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;
}

.ozone-echarts_view_l {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ozone-echarts_view_title {
  font-size: 18px;
  padding: 0px 0px;
}

.ozone-echarts_view_center {
}

.ozone-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
}
.ozone-click_view{
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

.ozone-click_view_activity{
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

.ozonemodule-dis-flex{
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>