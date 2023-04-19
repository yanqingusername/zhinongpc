<template>
  <div class="tree-container">
    <div class="container-right pulic_box_shadow">
      <el-row>
        <el-col :span="6" v-for="(o, index) in 10" :key="o" class="box-col">
          <el-card :body-style="{ padding: '0px' }" class="box-card">
            <div class="image_view">
              <img src="../../assets/piggery_blue.png" class="image" />
            </div>
            <div style="padding: 14px">
              <span>西区三舍西区三舍西区三舍西区三舍</span>
              <div class="bottom clearfix">
                <div class="item_view pulic_box_shadow">
                  <span class="item_view_1">20</span>
                  <span class="item_view_2">耳环</span>
                </div>
                <div class="item_view pulic_box_shadow">
                  <span class="item_view_1">2</span>
                  <span class="item_view_2">摄像头</span>
                </div>
              </div>
              <div class="name_span">饲养员:张三</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
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
      timelist: [
        new Date().getTime() - 3 * 24 * 60 * 60 * 1000,
        new Date().getTime(),
      ],
    };
  },
  created() {
    // this.getList();
  },
  mounted() {},
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
  },
};
</script>

<style scoped>
.el-tabs__item {
  font-size: 18px !important;
}

.tree-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}

.container-right {
  width: 100%;
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

.demo-form-inline {
  margin-top: 20px;
}

.box-col {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.box-card {
  width: 240px;
}

.image_view {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.image {
  width: 100px;
  height: 100px;
  display: block;
}

.bottom {
  margin-top: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.item_view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    transition: .3s;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    padding: 20px 0px; */
  width: 42%;
  padding: 20px 0px;
}

.item_view_1 {
  font-size: 16px;
}

.item_view_2 {
  margin-top: 20px;
  font-size: 18px;
}

.name_span {
  margin-top: 10px;
}
</style>