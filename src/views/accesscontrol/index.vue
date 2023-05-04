<template>
  <div class="access-index-container">
    <div class="access-container-right access-pulic_box_shadow">
      <el-form :inline="true" class="access-demo-form-inline">
        <el-form-item label="时间范围">
          <el-date-picker
            style="width: 260px"
            v-model="timelist"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="real_name">
          <el-input v-model="real_name" placeholder="请输入姓名" clearable style="width: 160px"/>
        </el-form-item>
        <el-form-item label="位置" prop="location_id">
          <el-select
            v-model="location_id"
            filterable
            clearable
            placeholder="请选择位置"
            style="width: 160px">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option
                v-for="(item, index) in listAccesslayoutdescr"
                :key="index"
                :label="item.location_descr"
                :value="item.location_id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="通行状态" prop="results">
          <el-select
            v-model="results"
            filterable
            clearable
            placeholder="请选择通行状态"
            style="width: 160px">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option label="人脸认证通过" value="5&75"></el-option>
            <el-option label="人脸认证失败" value="5&76"></el-option>
            <el-option label="刷卡认证通过" value="5&1"></el-option>
            <el-option label="无效卡认证失败" value="5&9"></el-option>
          </el-select>
        </el-form-item>

        <el-button
          style="margin-left: 20px"
          type="primary"
          size="medium"
          icon="el-icon-search"
          @click="getEntranceGuardList()">查询</el-button>
      </el-form>

      <el-table :data="listEntranceGuard" stripe style="width: 1120px" border 
        :row-style="iRowStyle"
        :cell-style="iCellStyle"
        :header-row-style="iHeaderRowStyle"
        :header-cell-style="iHeaderCellStyle">
        <el-table-column
          prop="headerimg||header_img"
          width="120"
          label="头像"
          align="center">
          <template slot-scope="scope">
            <div class="accesscontrol-img">
              <el-image
                style="width:30px;height:30px;border-radius: 100%;"
                :src="scope.row.headerimg || scope.row.header_img"
                fit="cover"></el-image>
              <!-- <el-avatar :src="scope.row.headerimg || scope.row.header_img"></el-avatar> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          width="200"
          label="日期时间"
          align="center"
        />
        <el-table-column
          prop="name"
          width="180"
          label="姓名"
          align="center"
        />

        <el-table-column
          prop="label_sn"
          width="180"
          label="卡号"
          align="center"
        />

        <el-table-column prop="location_descr" width="220" label="位置" align="center" />

        <el-table-column
          prop="type_desc"
          width="220"
          label="通行状态"
          align="center">
        </el-table-column>
      </el-table>

      <div class="block" style="margin-top: 0px">
        <el-pagination
          :current-page="current"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, sizes, prev, pager, next"
          @current-change="getEntranceGuardList"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  getEntranceGuardList,
  getAccesslayoutdescr
} from "../../request/api";
import { Message } from "element-ui";
export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      real_name: "",
      location_id: "",
      results: "",
      current: 1, //当前页
      limit: 10, //每页显示记录数
      total: 0, //总记录数
      listEntranceGuard: [],
      timelist: [
        new Date().getTime(),
        new Date().getTime(),
      ],
      listAccesslayoutdescr: []
    };
  },
  created() {
  },
  mounted() {
    this.getAccesslayoutdescr();
    this.getEntranceGuardList();
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
    getAccesslayoutdescr() {
      getAccesslayoutdescr({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.listAccesslayoutdescr = res.data.data;
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
    getEntranceGuardList(page = 1) {
      this.current = page;
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        page: this.current,
        limit: this.limit,
        start_time: this.dateFormat(this.timelist[0]),
        // start_time: '2023-03-17',
        end_time: this.dateFormat(this.timelist[1]),
        location_id: this.location_id,
        status: this.results, //(5&75-人脸认证通过  5&1-合法卡认证通过  5&76-人脸认证失败  5&9-无此卡号)
        real_name: this.real_name
      }
      getEntranceGuardList(params).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listEntranceGuard = res.data.data;
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
      this.getEntranceGuardList();
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.access-index-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.access-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}

.access-container-right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 20px;
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.access-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.access-demo-form-inline {
  margin-top: 20px;
}

.accesscontrol-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
}
</style>