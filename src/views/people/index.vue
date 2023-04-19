<template>
  <div class="people-index-container">
    <div class="people-container-right people-pulic_box_shadow">
      <el-form :inline="true" class="people-demo-form-inline">
        <el-form-item label="姓名" prop="search_name">
          <el-input v-model="search_name" placeholder="请输入姓名" clearable />
        </el-form-item>

        <el-button
          style="margin-left: 20px"
          type="primary"
          size="medium"
          icon="el-icon-search"
          @click="getEmployeesLists()">查询</el-button>

        <el-button
          type="primary"
          size="medium"
          @click="addPeople()"
          style="margin-left: 20px"
          icon="el-icon-plus">新增</el-button>

        <el-button
          type="primary"
          size="medium"
          @click="exportData()"
          style="margin-left: 20px"
          icon="el-icon-folder">导出</el-button>
      </el-form>

      <el-table :data="list" stripe style="width: 1120px" border>
        <el-table-column
          prop="head_url"
          width="120"
          label="头像"
          align="center">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.head_url"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="real_name"
          width="140"
          label="姓名"
          align="center"
        />

        <el-table-column
          prop="job_number"
          width="200"
          label="工号/卡号"
          align="center"
        />
        <el-table-column
          prop="role_name"
          width="160"
          label="岗位"
          align="center"
        />
        <el-table-column
          prop="phone"
          width="200"
          label="手机号"
          align="center"
        />

        <el-table-column prop="gender" width="100" label="性别" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.gender == '0'">男</p>
            <p v-if="scope.row.gender == '1'">女</p>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handlerEdit(scope.row.id)">编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handlerDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="people-block" style="margin-top: 15px">
        <el-pagination
          :current-page="current"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, sizes, prev, pager, next"
          @current-change="getEmployeesLists"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40]"
        />
      </div>
    </div>

    <!-- 新添/修改商品弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="showDialog"
      width="50%"
      center
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form ref="formObj" :model="formObj" label-width="120px">
        <div class="people-flex-space">
          <el-form-item label="姓名*：">
            <el-input
              v-model="formObj.real_name"
              style="width: 200px"
              placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="工号*：">
            <el-input
              v-model="formObj.job_number"
              style="width: 200px"
              placeholder="请输入工号"></el-input>
          </el-form-item>
        </div>

        <div class="people-flex-space">
          <el-form-item label="手机号*：">
            <el-input
              v-model="formObj.phone"
              style="width: 200px"
              placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item label="岗位*：" prop="roleId">
            <el-select
              v-model="formObj.roleId"
              placeholder="请选择岗位"
              style="width: 200px">
              <el-option
                v-for="(item, index) in listRole"
                :key="index"
                :label="item.role_name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="性别*：" prop="gender">
          <el-select
            v-model="formObj.gender"
            placeholder="请选择性别"
            style="width: 200px">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传头像*：">
          <!-- <el-upload
            class="avatar-uploader"
            action="http://prod.coyotebio-lab.com:8995/admin/shop/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formObj.fileUrl" :src="formObj.fileUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <el-upload
            class="avatar-uploader"
            action="http://syrdev.coyotebio-lab.com:8080/wisdomLivestockWH/PCpersonnelManagement/upload.hn"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="formObj.fileUrl" :src="formObj.fileUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="from-footer">
          <el-button @click="resetForm('formObj')">取消</el-button>
          <el-button type="primary" @click="onSubmit('formObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog :visible.sync="deleteDialog" width="30%" center>
      <span>确定要删除该员工吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDialog = false">取 消</el-button>
        <el-button @click="deleteSubmitClick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  getEmployeesLists,
  getRoleinfo,
  deleteEmployee,
  adduserinfo,
  getuserinfo,
  edituserinfo,
} from "../../request/api";
import { Message } from "element-ui";
import { stringify } from "qs";

export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      search_name: "",
      current: 1, //当前页
      limit: 10, //每页显示记录数
      total: 0, //总记录数
      list: [],
      listRole: [],

      showDialog: false,
      formObj: {
        real_name: "",
        job_number: "",
        phone: "",
        roleId: "",
        gender: "", //（0男 1女)
        fileUrl: "",
      },
      rules: {
        real_name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        job_number: [
          { required: true, message: "请输入工号", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" },
        ],
        roleId: [{ required: true, message: "请选择岗位", trigger: "change" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        fileUrl: [{ required: true, message: "请上传头像", trigger: "blur" }],
      },

      deleteDialog: false,
      id: "", // 员工id
      userstatus: "", // 员工状态值
      isEdit: 1, // 1-新增  2-编辑
    };
  },
  created() {},
  mounted() {
    this.getEmployeesLists();
    this.getRoleinfo();
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
    getEmployeesLists(page = 1) {
      this.current = page;

      getEmployeesLists({
        pig_farm_id: this.userInfo.farm_id,
        page: this.current,
        limit: this.limit,
        real_name: this.search_name,
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.list = res.data.info;
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
      this.getEmployeesLists();
    },
    // handleAvatarSuccess(res, file) {
    //   console.log(res)
    //   // if(res.success){
    //   //   Message({ type: 'success', message: res.data.msg, showClose: true, duration: 2000 })
    //   //   this.formObj.fileUrl = res.url
    //   // }
    //   // this.formObj.fileUrl = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png";
    //   // const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isLt2M;
    // },
    handleAvatarSuccess(res) {
      if (res.success) {
        this.formObj.fileUrl = res.msg;
      }
    },
    beforeAvatarUpload() {
      this.formObj.fileUrl = "";
    },
    handlerDelete(id) {
      this.deleteDialog = true;
      this.id = id;
    },
    deleteSubmitClick() {
      if (this.id) {
        deleteEmployee({
          id: this.id,
        }).then((res) => {
          if (res.data.success) {
            Message({
              type: "success",
              message: res.data.msg,
              showClose: true,
              duration: 3000,
            });

            this.getEmployeesLists();
            this.deleteDialog = false;
          } else {
            Message({
              type: "warning",
              message: res.data.msg,
              showClose: true,
              duration: 3000,
            });
          }
        });
      }
    },
    handlerEdit(id) {
      this.isEdit = 2;
      this.showDialog = true;
      getuserinfo({
        id: id,
      }).then((res) => {
        if (res.data.success) {
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formObj.real_name = itemInfo.real_name;
            this.formObj.job_number = itemInfo.job_number;
            this.formObj.phone = itemInfo.phone;
            this.formObj.roleId = itemInfo.roleId;
            this.formObj.gender = itemInfo.gender;
            this.formObj.fileUrl = itemInfo.head_url;
            this.userstatus = itemInfo.status;
            this.id = itemInfo.id;
          }
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
    getRoleinfo() {
      getRoleinfo({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.listRole = res.data.data;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.showDialog = false;
      this.formObj.real_name = "";
      this.formObj.job_number = "";
      this.formObj.phone = "";
      this.formObj.roleId = "";
      this.formObj.gender = "";
      this.formObj.fileUrl = "";
      this.id = "";
      this.userstatus = "";
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit == 2) {
            let params = this.formObj;
            params.id = this.id;
            params.status = this.userstatus;
            // params.pig_farm_id = this.userInfo.farm_id
            edituserinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getEmployeesLists();

                this.$refs[formName].resetFields();
                this.showDialog = false;
                this.formObj.real_name = "";
                this.formObj.job_number = "";
                this.formObj.phone = "";
                this.formObj.roleId = "";
                this.formObj.gender = "";
                this.formObj.fileUrl = "";
                this.id = "";
                this.userstatus = "";
              } else {
                Message({
                  type: "warning",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
              }
            });
          } else {
            let params = this.formObj;
            params.pig_farm_id = this.userInfo.farm_id;
            adduserinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getEmployeesLists();

                this.$refs[formName].resetFields();
                this.showDialog = false;
                this.formObj.real_name = "";
                this.formObj.job_number = "";
                this.formObj.phone = "";
                this.formObj.roleId = "";
                this.formObj.gender = "";
                this.formObj.fileUrl = "";
                this.id = "";
                this.userstatus = "";
              } else {
                Message({
                  type: "warning",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    addPeople() {
      this.isEdit = 1;
      this.showDialog = true;
    },
    //导出数据
    exportData() {
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        real_name: this.search_name,
      };
      window.open(
        `http://syrdev.coyotebio-lab.com:8080/wisdomLivestockWH/PCpersonnelManagement/ExportEmployeesLists.hn?${stringify(
          params
        )}`
      );

      this.formObj.real_name = "";
      this.formObj.job_number = "";
      this.formObj.phone = "";
      this.formObj.roleId = "";
      this.formObj.gender = "";
      this.formObj.fileUrl = "";
      this.id = "";
      this.userstatus = "";
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.people-index-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.people-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}

.people-container-right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 20px;
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.people-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.people-demo-form-inline {
  margin-top: 20px;
}

.people-flex-space {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.from-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>