<template>
  <div class="animal-index-container">
    <div class="animal-container-left animal-pulic_box_shadow">
      <div
        :class="[numberType == 1 ?'animal-click_view_activity':'animal-click_view']"
        @click="handleClick(1)">今日预警</div>
      
      <div
        :class="[numberType == 3 ?'animal-click_view_activity':'animal-click_view']"
        @click="handleClick(3)">历史记录</div>
    </div>

    <div class="animal-container-right animal-pulic_box_shadow">
      <el-form :inline="true" class="animal-demo-form-inline">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="timelist"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 260px;"
            :readonly="(numberType == 3) ? false : true">
          </el-date-picker>
        </el-form-item>
        
        <el-form-item label="位置" prop="location_id">
          <el-input v-model="location_id" placeholder="请输入位置" clearable style="width: 200px"/>
        </el-form-item>
    
        <el-button
          style="margin-left: 20px"
          type="primary"
          size="medium"
          icon="el-icon-search"
          @click="getAnimallistinfos()">查询</el-button>

      </el-form>

      <el-table :data="listAnimal" stripe style="width: 1150px" border
        :row-style="iRowStyle"
        :cell-style="iCellStyle"
        :header-row-style="iHeaderRowStyle"
        :header-cell-style="iHeaderCellStyle">

        <el-table-column
                prop="SN"
                width="200"
                label="SN号"
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
                label="创建时间"
                align="center"
              />
              
              <el-table-column
                prop="img"
                width="300"
                label="图片"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="animal-img">
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
          @current-change="getAnimallistinfos"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>

      <div class="animal-echarts_view">
        <div class="animal-echarts_view_top">
          <div class="animal-echarts_view_l">
            <div class="animal-echarts_view_title">小动物异常报警⽉统计表</div>
            <div
              id="echarttemp"
              style="width: 1150px; height: 400px"
              ref="echarttemp"
            ></div>
          </div>
          <div class="animal-echarts_view_r">
          </div>
        </div>
        <div class="animal-echarts_view_center"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
import {
  getAnimallistinfos,
  getAnimalChart
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
      listAnimal: [],
      srcList: [],
      timelist: [
        new Date().getTime(),
        new Date().getTime(),
      ],
      chartTempDom: "",
      myChartTemp: "",
      optionTemp: "",
      
      numberType: 1, // 1-今日预警  2-  3-历史记录
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.chartTempDom = this.$refs.echarttemp;
      this.myChartTemp = echarts.init(this.chartTempDom);

      this.getAnimallistinfos();
      this.getAnimalChart();
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
    getAnimalChart() {
      getAnimalChart({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          let xdata = res.data.xdata;
          let ydata = res.data.ydata;
          let series = [
            {
              name: "数量",
              type: "bar",
              color: '#5470c6',
              data: ydata,
              barWidth: 12
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
    getAnimallistinfos(page = 1) {
      this.current = page;
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        page: this.current,
        limit: this.limit,
        start_time: this.numberType == 3 ? '' : this.dateFormat(this.timelist[0]) + ' 00:00:00',
        // start_time: '2023-03-17 00:00:00',
        end_time: this.numberType == 3 ? '' : this.dateFormat(this.timelist[1]) + ' 23:59:59',
        address: this.location_id,
      }
      console.log(params)
      getAnimallistinfos(params).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listAnimal = res.data.data;
          this.total = parseInt(res.data.count);
          this.listAnimal.forEach(element => {
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
      this.getAnimallistinfos();
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
          name: "位置",
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
      if(number == 3){
        this.timelist = []
      } else {
        this.timelist = [
          new Date().getTime(),
          new Date().getTime(),
        ]
      }
      this.location_id = '';
      this.current = 1;
      this.limit = 10;
      this.getAnimallistinfos();
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.animal-index-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.animal-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  height: 600px;
}

.animal-container-right {
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

.animal-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.animal-demo-form-inline {
  margin-top: 20px;
}

.animal-echarts_view {
  margin-top: 0px;
}

.animal-echarts_view_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;
}

.animal-echarts_view_l {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.animal-echarts_view_title {
  font-size: 24px;
  padding: 10px 0px;
}

.animal-echarts_view_center {
}

.animal-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
}
.animal-click_view{
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

.animal-click_view_activity{
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