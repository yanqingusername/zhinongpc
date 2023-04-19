<template>
  <div class="index-index-container">
    <div class="index-index-container-1">
      <div class="index-container-left index-pulic_box_shadow">
        <div class="index-pie-top">
          <div class="index-pie-top-title">猪只个体健康</div>
          <el-row>
            <el-date-picker
              v-model="currentDate"
              align="center"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              readonly
            >
            </el-date-picker>
          </el-row>
        </div>
        <div class="index-pie-view">
          <div id="echarttemp1" class="echart-view" ref="echarttemp1"></div>
          <div id="echarttemp2" class="echart-view" ref="echarttemp2"></div>
          <div id="echarttemp3" class="echart-view" ref="echarttemp3"></div>
        </div>
      </div>

      <div class="index-container-right index-pulic_box_shadow">
        <div style="padding: 20px">发热猪信息</div>

        <el-table
          :data="listFever"
          stripe
          style="width: 660px"
          border
          height="250"
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle"
          size="mini"
        >
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
            prop="sty_number"
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
            prop="temp"
            width="80"
            label="体温(°C)"
            align="center"
          />
          <el-table-column
            prop="act"
            width="120"
            label="活跃度"
            align="center"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.act == '0'">无</p>
              <p v-if="scope.row.act == '1'">低</p>
              <p v-if="scope.row.act == '2'">中</p>
              <p v-if="scope.row.act == '3'">高</p>
            </template>
          </el-table-column>
        </el-table>

        <div class="index-block">
          <el-pagination
            :current-page="currentFever"
            :page-size="limitFever"
            :total="totalFever"
            style="padding: 10px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getFeverLabelInfo"
            @size-change="handleSizeChangeFever"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>
    </div>

    <div class="index-index-container-2">
      <div class="index-container-2-left index-pulic_box_shadow">
        <div style="padding: 20px">淋浴预警 失败累计数量({{totalAlarm}})</div>

        <el-table
          :data="listAlarm"
          stripe
          style="width: 400px"
          border
          height="300"
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle"
          >
          <el-table-column
            prop="head_url"
            width="80"
            label="头像"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <el-avatar :src="scope.row.head_url"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="real_name"
            width="100"
            label="姓名"
            align="center"
          />

          <el-table-column
            prop="create_time"
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
              <p v-if="scope.row.status == '0'">失败</p>
            </template>
          </el-table-column>
        </el-table>

        <div class="index-block" style="margin-top: 15px">
          <el-pagination
            :current-page="currentAlarm"
            :page-size="limitAlarm"
            :total="totalAlarm"
            style="padding: 10px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getAlarmList"
            @size-change="handleSizeChangeAlarm"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div class="index-container-2-right index-pulic_box_shadow">
        <div style="padding: 20px">物资消毒预警 违规累计数量({{totalGoods}})</div>

        <el-table
          :data="listGoods"
          stripe
          style="width: 400px"
          border
          height="300"
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle"
        >
          <el-table-column
            prop="address"
            width="80"
            label="位置"
            align="center"
          />
          <el-table-column
            prop="end_time"
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
              <p v-if="scope.row.status == '1' || scope.row.status == '2' || scope.row.status == '3' || scope.row.status == '6'">正常</p>
              <p v-if="scope.row.status == '0' || scope.row.status == '4' || scope.row.status == '5'">违规</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="ViolationReason"
            width="100"
            label="原因"
            align="center"
          >
            <!-- <template slot-scope="scope">
              <p v-if="scope.row.status == '1'">未审核</p>
              <p v-if="scope.row.status == '2'">已审批</p>
            </template> -->
          </el-table-column>
        </el-table>

        <div class="index-block" style="margin-top: 15px">
          <el-pagination
            :current-page="currentGoods"
            :page-size="limitGoods"
            :total="totalGoods"
            style="padding: 10px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getGoodsRecord"
            @size-change="handleSizeChangeGoods"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div class="index-container-2-right index-pulic_box_shadow">
        <div style="padding: 20px">小动物预警</div>

        <el-table
          :data="listAnimal"
          stripe
          style="width: 400px"
          border
          height="300"
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle"
          >
          <el-table-column
            prop="address"
            width="80"
            label="位置"
            align="center"
          />
          <el-table-column
            prop="createtime"
            width="120"
            label="时间"
            align="center"
          />
          <el-table-column
            prop="img"
            width="200"
            label="图片"
            align="center"
          >
            <template slot-scope="scope">
              <div class="el-img">
                <el-image
                  style="width: 160px; height: 60px"
                  :src="scope.row.img"
                  :preview-src-list="srcList"
                >
                </el-image>
                <!-- <img style="width: 160px; height: 60px" :src="scope.row.img" @click="clickImg($event)"> -->
              </div>
              <!-- <img style="width: 160px; height: 60px" :src="scope.row.img" @click="clickImg($event)"> -->
              <!-- <img :src="scope.row.imageUrl" preview="0" preview-text="查看图片"> -->
            </template>
          </el-table-column>
        </el-table>

        <div class="index-block" style="margin-top: 15px">
          <el-pagination
            :current-page="currentAnimal"
            :page-size="limitAnimal"
            :total="totalAnimal"
            style="padding: 10px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getAnimalRecord"
            @size-change="handleSizeChangeAnimal"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>
    </div>

    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
  </div>
</template>

<script>
import * as echarts from "echarts";
import BigImg from "../../components/imgView.vue";
import moment from "moment";
import {
  getPigSurvey,
  getFeverLabelInfo,
  getAlarmList,
  getGoodsRecord,
  getAnimalRecord,
} from "../../request/api";
import { Message } from "element-ui";
export default {
  components: {
    "big-img": BigImg,
  },
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      showImg: false,
      imgSrc: "",
      currentDate: new Date(),
      chartTempDom1: "",
      myChartTemp1: "",
      optionTemp1: "",

      chartTempDom2: "",
      myChartTemp2: "",
      optionTemp2: "",

      chartTempDom3: "",
      myChartTemp3: "",
      optionTemp3: "",

      currentFever: 1, //当前页
      limitFever: 5, //每页显示记录数
      totalFever: 0, //总记录数
      listFever: [],

      currentAlarm: 1, //当前页
      limitAlarm: 5, //每页显示记录数
      totalAlarm: 0, //总记录数
      listAlarm: [],

      currentGoods: 1, //当前页
      limitGoods: 5, //每页显示记录数
      totalGoods: 0, //总记录数
      listGoods: [],

      currentAnimal: 1, //当前页
      limitAnimal: 5, //每页显示记录数
      totalAnimal: 0, //总记录数
      listAnimal: [],

      srcList: [],
      
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.chartTempDom1 = this.$refs.echarttemp1;
      this.myChartTemp1 = echarts.init(this.chartTempDom1);

      this.chartTempDom2 = this.$refs.echarttemp2;
      this.myChartTemp2 = echarts.init(this.chartTempDom2);

      this.chartTempDom3 = this.$refs.echarttemp3;
      this.myChartTemp3 = echarts.init(this.chartTempDom3);

      this.currentDate = this.dateFormat(this.currentDate);

      // this.$previewRefresh()

      this.getPigSurvey();
      this.getFeverLabelInfo();
      this.getAlarmList();
      this.getGoodsRecord();
      this.getAnimalRecord();
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
    clickImg(e) {
      this.showImg = true;
      this.imgSrc = e.currentTarget.src;
    },
    viewImg() {
      this.showImg = false;
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
    getPigSurvey() {
      getPigSurvey({
        pig_farm_id: this.userInfo.farm_id,
        time: this.currentDate,
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          let abnormalsum = res.data.abnormalsum; // 离线
          let cun = res.data.cun; //存栏
          let feversum = res.data.feversum; // 发热

          this.initChart(cun, feversum, abnormalsum);
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
    getFeverLabelInfo(page = 1) {
      this.currentFever = page;

      getFeverLabelInfo({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentFever,
        limit: this.limitFever,
      }).then((res) => {
        if (res.data.code == 200) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listFever = res.data.data;
          this.totalFever = res.data.count;
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
    handleSizeChangeFever(val) {
      this.limitFever = val;
      this.getFeverLabelInfo();
    },
    getAlarmList(page = 1) {
      this.currentAlarm = page;

      getAlarmList({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentAlarm,
        limit: this.limitAlarm,
        jobname: "",
        type: 0
      }).then((res) => {
        if (res.data.code == 200) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listAlarm = res.data.data;
          this.totalAlarm = res.data.count;
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
    handleSizeChangeAlarm(val) {
      this.limitAlarm = val;
      this.getAlarmList();
    },
    getGoodsRecord(page = 1) {
      this.currentGoods = page;

      getGoodsRecord({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentGoods,
        limit: this.limitGoods,
      }).then((res) => {
        if (res.data.code == 200) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listGoods = res.data.data;
          this.totalGoods = res.data.count;
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
    handleSizeChangeGoods(val) {
      this.limitGoods = val;
      this.getGoodsRecord();
    },
    getAnimalRecord(page = 1) {
      this.currentAnimal = page;

      getAnimalRecord({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentAnimal,
        limit: this.limitAnimal,
      }).then((res) => {
        if (res.data.code == 200) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listAnimal = res.data.data;
          this.totalAnimal = res.data.count;
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
    handleSizeChangeAnimal(val) {
      this.limitAnimal = val;
      this.getAnimalRecord();
    },
    initChart(cun, feversum, abnormalsum) {
      // 绘制图表
      this.myChartTemp1.setOption({
        title: {
          text: cun + "\n存栏",
          textStyle: {
            lineHeight: 22,
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
            data: [{ value: cun, name: "存栏" }],
          },
        ],
      });

      this.myChartTemp2.setOption({
        title: {
          text: feversum + "\n发热",
          textStyle: {
            lineHeight: 22,
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
            data: [{ value: feversum, name: "发热" }],
            color: "red",
          },
        ],
      });

      this.myChartTemp3.setOption({
        title: {
          text: abnormalsum + "\n离线",
          textStyle: {
            lineHeight: 22,
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
            data: [{ value: abnormalsum, name: "离线" }],
            color: "green",
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

.index-pie-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.index-pie-top-title {
  margin-right: 40px;
}

.index-pie-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}

.echart-view {
  width: 200px;
  height: 200px;
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

.el-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0px;
}
</style>