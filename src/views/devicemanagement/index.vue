<template>
  <div class="device-index-container">
    <div class="device-container-left device-pulic_box_shadow">
      <div
        :class="[numberType == 1 ?'device-click_view_activity':'device-click_view']"
        @click="handleClick(1)"><img src="../../assets/icon_2023_02_14_5.png" class="device-image" />臭氧消毒监测</div>
      <div
        :class="[numberType == 2 ?'device-click_view_activity':'device-click_view']"
        @click="handleClick(2)"><img src="../../assets/icon_2023_02_14_6.png" class="device-image" />淋浴一体机</div>
      <div
        :class="[numberType == 3 ?'device-click_view_activity':'device-click_view']"
        @click="handleClick(3)"><img src="../../assets/icon_2023_02_14_9.png" class="device-image" />小动物监控</div>

      <div
        :class="[numberType == 4 ?'device-click_view_activity':'device-click_view']"
        @click="handleClick(4)"><img src="../../assets/icon_2023_02_14_8.png" class="device-image" />门禁系统管理</div>

      <div
        :class="[numberType == 5 ?'device-click_view_activity':'device-click_view']"
        @click="handleClick(5)"><img src="../../assets/icon_2023_02_14_8.png" class="device-image" />液体消毒监测</div>

      <div
        :class="[numberType == 6 ?'device-click_view_activity':'device-click_view']"
        @click="handleClick(6)"><img src="../../assets/icon_2023_02_14_8.png" class="device-image" />车辆消毒监测</div>
    </div>

    <div class="device-container-right device-pulic_box_shadow">
      <div v-if="numberType == 1">
        <div class="device-top-view">
          <div class="device-title">物资臭氧消毒监测工作站管理(1000)</div>
          <el-button
            type="primary"
            size="medium"
            @click="addOzone()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listOzone" stripe style="width: 1150px" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="device_sn"
            width="160"
            label="设备SN号"
            align="center"
          />

          <el-table-column
            prop="address"
            width="120"
            label="位置"
            align="center">
          </el-table-column>

          <el-table-column
            prop="concentration"
            width="150"
            label="有效浓度(mg/m³)"
            align="center"
          />
          <el-table-column
            prop="disinfect_time"
            width="150"
            label="消毒时长(分钟)"
            align="center"
          />
          <el-table-column
            prop="device_people"
            width="270"
            label="设备管理员"
            align="center"
          />
          <el-table-column prop="approve_people" width="100" label="审批人" align="center" />

          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handlerOzoneEdit(scope.row.id)">编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handlerOzoneDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 0px">
          <el-pagination
            :current-page="currentOzone"
            :page-size="limitOzone"
            :total="totalOzone"
            style="padding: 30px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getEmployeesLists"
            @size-change="handleOzoneSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 2">
        <div class="device-top-view">
          <div class="device-title">淋浴一体机管理(1000)</div>
          <el-button
            type="primary"
            size="medium"
            @click="addDis()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listDis" stripe style="width: 1150px" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="device_sn"
            width="260"
            label="设备SN号"
            align="center"
          />

          <el-table-column
            prop="address"
            width="260"
            label="位置"
            align="center">
          </el-table-column>

          <el-table-column
            prop="concentration"
            width="350"
            label="有效淋浴时长（分钟）"
            align="center"
          />

          <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handlerDisEdit(scope.row.id)">编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handlerOzoneDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 0px">
          <el-pagination
            :current-page="currentDis"
            :page-size="limitDis"
            :total="totalDis"
            style="padding: 30px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getEmployeesLists"
            @size-change="handleDisSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 3">
        <div class="device-top-view">
          <div class="device-title">小动物监控工作站管理(1000)</div>
          <el-button
            type="primary"
            size="medium"
            @click="addAnimal()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listAnimal" stripe style="width: 1150px" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="device_sn"
            width="260"
            label="设备SN号"
            align="center"
          />

          <el-table-column
            prop="address"
            width="260"
            label="位置"
            align="center">
          </el-table-column>

          <el-table-column
            prop="concentration"
            width="350"
            label="设备添加时间"
            align="center"
          />

          <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handlerAnimalEdit(scope.row.id)">编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handlerOzoneDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 0px">
          <el-pagination
            :current-page="currentAnimal"
            :page-size="limitAnimal"
            :total="totalAnimal"
            style="padding: 30px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getEmployeesLists"
            @size-change="handleAnimalSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 4">
        <div class="device-top-view">
          <div class="device-title">门禁系统管理(1000)</div>
          <el-button
            type="primary"
            size="medium"
            @click="addAccess()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listAccess" stripe style="width: 1150px" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="device_sn"
            width="170"
            label="设备SN号"
            align="center"
          />

          <el-table-column
            prop="address"
            width="160"
            label="位置"
            align="center">
          </el-table-column>

          <el-table-column
            prop="concentration"
            width="160"
            label="设备IP地址"
            align="center"
          />
          
          <el-table-column
            prop="device_people"
            width="300"
            label="授权使用人员"
            align="center"
          />

          <el-table-column
            prop="disinfect_time"
            width="160"
            label="设备添加时间"
            align="center"
          />

          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handlerAccessEdit(scope.row.id)">编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handlerOzoneDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 0px">
          <el-pagination
            :current-page="currentAccess"
            :page-size="limitAccess"
            :total="totalAccess"
            style="padding: 30px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getEmployeesLists"
            @size-change="handleAccessSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 5">
        <div class="device-top-view">
          <div class="device-title">物资液体消毒监测工作站管理(1000)</div>
          <el-button
            type="primary"
            size="medium"
            @click="addLiquid()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listLiquid" stripe style="width: 1150px" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="device_sn"
            width="160"
            label="设备SN号"
            align="center"
          />

          <el-table-column
            prop="address"
            width="120"
            label="位置"
            align="center">
          </el-table-column>

          <el-table-column
            prop="concentration"
            width="150"
            label="有效PH值"
            align="center"
          />
          <el-table-column
            prop="disinfect_time"
            width="150"
            label="消毒时长(分钟)"
            align="center"
          />
          <el-table-column
            prop="device_people"
            width="270"
            label="设备管理员"
            align="center"
          />
          <el-table-column prop="approve_people" width="100" label="审批人" align="center" />

          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handlerLiquidEdit(scope.row.id)">编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handlerOzoneDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 0px">
          <el-pagination
            :current-page="currentLiquid"
            :page-size="limitLiquid"
            :total="totalLiquid"
            style="padding: 30px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getEmployeesLists"
            @size-change="handleLiquidSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 6">
        <div class="device-top-view">
          <div class="device-title">车辆消毒监测工作站(1000)</div>
          <el-button
            type="primary"
            size="medium"
            @click="addCar()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listCar" stripe style="width: 1150px" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="device_sn"
            width="200"
            label="设备SN号"
            align="center"
          />

          <el-table-column
            prop="address"
            width="200"
            label="位置"
            align="center">
          </el-table-column>

          <el-table-column
            prop="disinfect_time"
            width="200"
            label="设备添加时间"
            align="center"
          />
          <el-table-column
            prop="device_people"
            width="350"
            label="管理员"
            align="center"
          />

          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handlerCarEdit(scope.row.id)">编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handlerOzoneDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="margin-top: 0px">
          <el-pagination
            :current-page="currentCar"
            :page-size="limitCar"
            :total="totalCar"
            style="padding: 30px 0; text-align: center"
            layout="total, sizes, prev, pager, next"
            @current-change="getEmployeesLists"
            @size-change="handleCarSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>
    </div>

    <!--臭氧消毒监测 新添/修改弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="showOzoneDialog"
      width="55%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formOzoneObj" :model="formOzoneObj" label-width="140px">
        <div class="device-flex-space">
          <el-form-item label="设备SN号*：">
            <el-input
              v-model="formOzoneObj.ozone_sn"
              style="width: 200px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="有效浓度(mg/m³)：" style="margin-left:20px;">
            <el-input
              v-model="formOzoneObj.ozone_concentration"
              style="width: 200px"
              placeholder="请输入有效浓度(mg/m³)"></el-input>
          </el-form-item>
        </div>

        <div class="device-flex-space">
          <el-form-item label="消毒时长(分钟)*：">
            <el-input
              v-model="formOzoneObj.ozone_time"
              style="width: 200px"
              placeholder="请输入消毒时长(分钟)"></el-input>
          </el-form-item>

          <el-form-item label="位置*：" prop="ozone_address" style="margin-left:20px;">
            <el-select
              v-model="formOzoneObj.ozone_address"
              placeholder="请选择位置"
              style="width: 200px">
              <el-option
                v-for="(item, index) in listOzonePosition"
                :key="index"
                :label="item.role_name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="设备管理员*：" prop="ozone_device_people">
          <el-checkbox-group v-model="ozone_device_people">
            <el-checkbox v-for="(item,index) in device_people" :key="index" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="审批人*：" v-model="ozone_app_people">
          <el-radio-group v-model="ozone_app_people">
            <el-radio v-for="(item,index) in device_people" :key="index" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="device-from-footer">
          <el-button @click="resetOzoneForm('formOzoneObj')">取消</el-button>
          <el-button type="primary" @click="onOzoneSubmit('formOzoneObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--淋浴一体机 新添/修改弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="showDisDialog"
      width="40%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formDisObj" :model="formDisObj" label-width="160px">
        <div class="device-flex-center">
          <el-form-item label="设备SN号*：">
            <el-input
              v-model="formDisObj.dis_sn"
              style="width: 260px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="位置：" style="margin-left:0px;">
            <el-input
              v-model="formDisObj.dis_address"
              style="width: 260px"
              placeholder="请输入设备位置"></el-input>
          </el-form-item>
        <!-- </div> -->

        <!-- <div class="device-flex-space"> -->
          <el-form-item label="有效淋浴时长(分钟)*：">
            <el-input
              v-model="formDisObj.dis_time"
              style="width: 260px"
              placeholder="请输入有效淋浴时长时长(分钟)"></el-input>
          </el-form-item>

          <el-form-item label="设备添加时间*：">
            <el-input
              v-model="dis_current_time"
              style="width: 260px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="device-from-footer">
          <el-button @click="resetDisForm('formDisObj')">取消</el-button>
          <el-button type="primary" @click="onDisSubmit('formDisObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--小动物监控 新添/修改弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="showAnimalDialog"
      width="40%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formAnimalObj" :model="formAnimalObj" label-width="160px">
        <div class="device-flex-center">
          <el-form-item label="设备SN号*：">
            <el-input
              v-model="formAnimalObj.animal_sn"
              style="width: 260px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>
        
          <el-form-item label="位置*：" prop="ozone_address" style="margin-left:0px;">
            <el-select
              v-model="formAnimalObj.animal_address"
              placeholder="请选择位置"
              style="width: 260px">
              <el-option
                v-for="(item, index) in listOzonePosition"
                :key="index"
                :label="item.role_name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="设备添加时间*：">
            <el-input
              v-model="animal_current_time"
              style="width: 260px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item>
        </div>
        <div class="device-from-footer">
          <el-button @click="resetAnimalForm('formAnimalObj')">取消</el-button>
          <el-button type="primary" @click="onAnimalSubmit('formAnimalObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--门禁系统管理 新添/修改弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="showAccessDialog"
      width="55%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formAccessObj" :model="formAccessObj" label-width="140px">
        <div class="device-flex-space">
          <el-form-item label="设备编号*：">
            <el-input
              v-model="formAccessObj.access_sn"
              style="width: 200px"
              placeholder="请输入设备编号"></el-input>
          </el-form-item>

          <el-form-item label="位置*：" style="margin-left:0px;">
            <el-select
              v-model="formAccessObj.access_address"
              placeholder="请选择位置"
              style="width: 200px">
              <el-option
                v-for="(item, index) in listOzonePosition"
                :key="index"
                :label="item.role_name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="device-flex-space">
          <el-form-item label="设备IP地址*：">
            <el-input
              v-model="formAccessObj.access_ip"
              style="width: 200px"
              placeholder="请输入设备IP地址"></el-input>
          </el-form-item>

          <el-form-item label="设备添加时间*：">
            <el-input
              v-model="access_current_time"
              style="width: 200px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="授权使用人员*：" >
          <el-checkbox-group v-model="access_device_people">
            <el-checkbox v-for="(item,index) in device_people" :key="index" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <div class="device-from-footer">
          <el-button @click="resetAccessForm('formAccessObj')">取消</el-button>
          <el-button type="primary" @click="onAccessSubmit('formAccessObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--液体消毒监测 新添/修改弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="showLiquidDialog"
      width="55%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formLiquidObj" :model="formLiquidObj" label-width="140px">
        <div class="device-flex-space">
          <el-form-item label="设备SN号*：">
            <el-input
              v-model="formLiquidObj.liquid_sn"
              style="width: 200px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="有效PH值：" style="margin-left:20px;">
            <el-input
              v-model="formLiquidObj.liquid_concentration"
              style="width: 200px"
              placeholder="请输入有效PH值"></el-input>
          </el-form-item>
        </div>

        <div class="device-flex-space">
          <el-form-item label="消毒时长(分钟)*：">
            <el-input
              v-model="formLiquidObj.liquid_time"
              style="width: 200px"
              placeholder="请输入消毒时长(分钟)"></el-input>
          </el-form-item>

          <el-form-item label="位置*：" prop="liquid_address" style="margin-left:20px;">
            <el-select
              v-model="formLiquidObj.liquid_address"
              placeholder="请选择位置"
              style="width: 200px">
              <el-option
                v-for="(item, index) in listOzonePosition"
                :key="index"
                :label="item.role_name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="设备管理员*：" prop="liquid_device_people">
          <el-checkbox-group v-model="liquid_device_people">
            <el-checkbox v-for="(item,index) in device_people" :key="index" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="审批人*：" v-model="liquid_app_people">
          <el-radio-group v-model="liquid_app_people">
            <el-radio v-for="(item,index) in device_people" :key="index" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备添加时间*：">
            <el-input
              v-model="liquid_current_time"
              style="width: 200px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item>
        <div class="device-from-footer">
          <el-button @click="resetLiquidForm('formLiquidObj')">取消</el-button>
          <el-button type="primary" @click="onLiquidSubmit('formLiquidObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--车辆消毒监测 新添/修改弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="showCarDialog"
      width="50%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formCarObj" :model="formCarObj" label-width="140px">
        <!-- <div class="device-flex-space"> -->
          <el-form-item label="设备SN号*：">
            <el-input
              v-model="formCarObj.car_sn"
              style="width: 200px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="位置*：" prop="car_address" style="margin-left:0px;">
            <el-select
              v-model="formCarObj.car_address"
              placeholder="请选择位置"
              style="width: 200px">
              <el-option
                v-for="(item, index) in listOzonePosition"
                :key="index"
                :label="item.role_name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        <!-- </div> -->

        <el-form-item label="管理员*：" prop="car_device_people">
          <el-checkbox-group v-model="car_device_people">
            <el-checkbox v-for="(item,index) in device_people" :key="index" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="设备添加时间*：">
            <el-input
              v-model="car_current_time"
              style="width: 200px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item>
        <div class="device-from-footer">
          <el-button @click="resetCarForm('formCarObj')">取消</el-button>
          <el-button type="primary" @click="onCarSubmit('formCarObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog :visible.sync="deleteOzoneDialog" width="30%" center>
      <span>确定要删除该记录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteOzoneDialog = false">取 消</el-button>
        <el-button @click="deleteOzoneClick()">确 定</el-button>
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
export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      search_name: '',
      currentOzone: 1, //当前页
      limitOzone: 10, //每页显示记录数
      totalOzone: 0, //总记录数
      listOzone: [
        {
          "id": '1',
          "address": '位置1',
          "device_sn": '120101010111',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '2',
          "address": '位置2',
          "device_sn": '120101010112',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '3',
          "address": '位置3',
          "device_sn": '120101010113',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '4',
          "address": '位置4',
          "device_sn": '120101010114',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '5',
          "address": '位置5',
          "device_sn": '120101010115',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        }
      ],
      listOzonePosition: [],
      showOzoneDialog: false,
      formOzoneObj: {
        ozone_sn: "",
        ozone_concentration: "",
        ozone_time: "",
        ozone_address: "",
      },
      rulesOzone: {
        ozone_sn: [
          { required: true, message: "请输入设备SN号", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ozone_concentration: [
          { required: true, message: "请输入有效浓度(mg/m³)", trigger: "blur" },
        ],
        ozone_time: [
          { required: true, message: "请输入消毒时长(分钟)", trigger: "blur" },
        ],
        ozone_address: [{ required: true, message: "请选择位置", trigger: "change" }],
      },
      ozone_device_people: ['1', '2'],
      device_people: [{'id': '1', name: '张三'}, {'id': '2', name: '李四'},{'id': '3', name: '王五'},{'id': '4', name: '赵六'}],
      ozone_app_people: "3",
      deleteOzoneDialog: false,
      idOzone: "", // 员工id
      isOzoneEdit: 1, // 1-新增  2-编辑


      currentDis: 1, //当前页
      limitDis: 10, //每页显示记录数
      totalDis: 0, //总记录数
      listDis: [
        {
          "id": '1',
          "address": '位置1',
          "device_sn": '120101010111',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '2',
          "address": '位置2',
          "device_sn": '120101010112',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '3',
          "address": '位置3',
          "device_sn": '120101010113',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '4',
          "address": '位置4',
          "device_sn": '120101010114',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '5',
          "address": '位置5',
          "device_sn": '120101010115',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        }
      ],
      showDisDialog: false,
      formDisObj: {
        dis_sn: "",
        dis_time: "",
        dis_address: "",
      },
      dis_current_time: new Date().getTime(),
      rulesDis: {
        dis_sn: [
          { required: true, message: "请输入设备SN号", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        dis_time: [
          { required: true, message: "请输入有效淋浴时长(分钟)", trigger: "blur" },
        ],
        dis_address: [
          { required: true, message: "请输入设备位置", trigger: "blur" },
        ],
      },
      idDis: "", // 员工id
      isDisEdit: 1, // 1-新增  2-编辑


      currentAnimal: 1, //当前页
      limitAnimal: 10, //每页显示记录数
      totalAnimal: 0, //总记录数
      listAnimal: [
        {
          "id": '1',
          "address": '位置1',
          "device_sn": '120101010111',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '2',
          "address": '位置2',
          "device_sn": '120101010112',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '3',
          "address": '位置3',
          "device_sn": '120101010113',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '4',
          "address": '位置4',
          "device_sn": '120101010114',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '5',
          "address": '位置5',
          "device_sn": '120101010115',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        }
      ],
      showAnimalDialog: false,
      formAnimalObj: {
        animal_sn: "",
        animal_address: "",
      },
      animal_current_time: new Date().getTime(),
      rulesAnimal: {
        animal_sn: [
          { required: true, message: "请输入设备SN号", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        animal_address: [{ required: true, message: "请选择位置", trigger: "change" }],
      },
      idAnimal: "", // 员工id
      isAnimalEdit: 1, // 1-新增  2-编辑


      currentAccess: 1, //当前页
      limitAccess: 10, //每页显示记录数
      totalAccess: 0, //总记录数
      listAccess: [
        {
          "id": '1',
          "address": '位置1',
          "device_sn": '120101010111',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '2',
          "address": '位置2',
          "device_sn": '120101010112',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '3',
          "address": '位置3',
          "device_sn": '120101010113',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '4',
          "address": '位置4',
          "device_sn": '120101010114',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '5',
          "address": '位置5',
          "device_sn": '120101010115',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        }
      ],
      listAccessPosition: [],
      showAccessDialog: false,
      formAccessObj: {
        access_sn: "",
        access_address: "",
        access_ip: "",
      },
      access_current_time: new Date().getTime(),
      rulesAccess: {
        access_sn: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        access_ip: [
          { required: true, message: "请输入设备IP地址", trigger: "blur" },
        ],
        access_address: [{ required: true, message: "请选择位置", trigger: "change" }],
      },
      access_device_people: ['1', '2'],
      device_people: [{'id': '1', name: '张三'}, {'id': '2', name: '李四'},{'id': '3', name: '王五'},{'id': '4', name: '赵六'}],
      idAccess: "", // 员工id
      isAccessEdit: 1, // 1-新增  2-编辑


      currentLiquid: 1, //当前页
      limitLiquid: 10, //每页显示记录数
      totalLiquid: 0, //总记录数
      listLiquid: [
        {
          "id": '1',
          "address": '位置1',
          "device_sn": '120101010111',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '2',
          "address": '位置2',
          "device_sn": '120101010112',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '3',
          "address": '位置3',
          "device_sn": '120101010113',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '4',
          "address": '位置4',
          "device_sn": '120101010114',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '5',
          "address": '位置5',
          "device_sn": '120101010115',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        }
      ],
      listLiquidPosition: [],
      showLiquidDialog: false,
      formLiquidObj: {
        liquid_sn: "",
        liquid_concentration: "",
        liquid_time: "",
        liquid_address: "",
      },
      liquid_current_time: new Date().getTime(),
      rulesLiquid: {
        liquid_sn: [
          { required: true, message: "请输入设备SN号", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        liquid_concentration: [
          { required: true, message: "请输入有效PH值", trigger: "blur" },
        ],
        liquid_time: [
          { required: true, message: "请输入消毒时长(分钟)", trigger: "blur" },
        ],
        liquid_address: [{ required: true, message: "请选择位置", trigger: "change" }],
      },
      liquid_device_people: ['1', '2'],
      device_people: [{'id': '1', name: '张三'}, {'id': '2', name: '李四'},{'id': '3', name: '王五'},{'id': '4', name: '赵六'}],
      liquid_app_people: "3",
      deleteLiquidDialog: false,
      idLiquid: "", // 员工id
      isLiquidEdit: 1, // 1-新增  2-编辑

      currentCar: 1, //当前页
      limitCar: 10, //每页显示记录数
      totalCar: 0, //总记录数
      listCar: [
        {
          "id": '1',
          "address": '位置1',
          "device_sn": '120101010111',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '2',
          "address": '位置2',
          "device_sn": '120101010112',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '3',
          "address": '位置3',
          "device_sn": '120101010113',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '4',
          "address": '位置4',
          "device_sn": '120101010114',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        },
        {
          "id": '5',
          "address": '位置5',
          "device_sn": '120101010115',
          "concentration": '20',
          "disinfect_time": '5',
          "device_people": '张三,李四',
          "approve_people": '张三',
        }
      ],
      listCarPosition: [],
      showCarDialog: false,
      formCarObj: {
        car_sn: "",
        car_address: "",
      },
      car_current_time: new Date().getTime(),
      rulesCar: {
        car_sn: [
          { required: true, message: "请输入设备SN号", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        car_address: [{ required: true, message: "请选择位置", trigger: "change" }],
      },
      car_device_people: ['1', '2'],
      device_people: [{'id': '1', name: '张三'}, {'id': '2', name: '李四'},{'id': '3', name: '王五'},{'id': '4', name: '赵六'}],
      deleteCarDialog: false,
      idCar: "", // 员工id
      isCarEdit: 1, // 1-新增  2-编辑
      
      numberType: 1, // 1-臭氧消毒监测  2-淋浴一体机  3-小动物监控 4-门禁系统管理 5-液体消毒监测  6-车辆消毒监测
    };
  },
  created() {
  },
  mounted() {
      this.dis_current_time = this.dateFormat(this.dis_current_time);
      this.animal_current_time = this.dateFormat(this.animal_current_time);
      this.access_current_time = this.dateFormat(this.access_current_time);
      this.liquid_current_time = this.dateFormat(this.liquid_current_time);
      this.car_current_time = this.dateFormat(this.car_current_time);
      // this.getEmployeesLists();
      this.getRoleinfo();
      
  },
  methods: {
    iRowStyle: function ({ row, rowIndex }) {
      return "height:35px";
    },
    iHeaderRowStyle: function ({ row, rowIndex }) {
      return "height:46px";
    },
    iCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:6px";
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
      this.currentOzone = page;

      getEmployeesLists({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentOzone,
        limit: this.limitOzone,
        real_name: this.search_name,
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listOzone = res.data.info;
          this.totalOzone = parseInt(res.data.count);
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
    handleOzoneSizeChange(val) {
      this.limitOzone = val;
      this.getEmployeesLists();
    },

    handlerOzoneDelete(id) {
      this.deleteOzoneDialog = true;
      this.idOzone = id;
    },
    deleteOzoneClick() {
      // if (this.idOzone) {
      //   deleteEmployee({
      //     id: this.idOzone,
      //   }).then((res) => {
      //     if (res.data.success) {
      //       Message({
      //         type: "success",
      //         message: res.data.msg,
      //         showClose: true,
      //         duration: 3000,
      //       });

      //       this.getEmployeesLists();
      //       this.deleteOzoneDialog = false;
      //     } else {
      //       Message({
      //         type: "warning",
      //         message: res.data.msg,
      //         showClose: true,
      //         duration: 3000,
      //       });
      //     }
      //   });
      // }
    },
    handlerOzoneEdit(id) {
      this.isOzoneEdit = 2;
      this.showOzoneDialog = true;
      getuserinfo({
        id: id,
      }).then((res) => {
        if (res.data.success) {
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formOzoneObj.ozone_sn = itemInfo.real_name;
            this.formOzoneObj.ozone_concentration = itemInfo.job_number;
            this.formOzoneObj.ozone_time = itemInfo.phone;
            this.formOzoneObj.ozone_address = itemInfo.roleId;
            this.idOzone = itemInfo.id;
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
          this.listOzonePosition = res.data.data;
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
    resetOzoneForm(formName) {
      this.$refs[formName].resetFields();
      this.showOzoneDialog = false;
      this.formOzoneObj.ozone_sn = "";
      this.formOzoneObj.ozone_concentration = "";
      this.formOzoneObj.ozone_time = "";
      this.formOzoneObj.ozone_address = "";
      this.idOzone = "";
    },
    onOzoneSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isOzoneEdit == 2) {
            let params = this.formOzoneObj;
            params.id = this.idOzone;
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
                this.showOzoneDialog = false;
                this.formOzoneObj.ozone_sn = "";
                this.formOzoneObj.ozone_concentration = "";
                this.formOzoneObj.ozone_time = "";
                this.formOzoneObj.ozone_address = "";
                this.idOzone = "";
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
            let params = this.formOzoneObj;
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
                this.showOzoneDialog = false;
                this.formOzoneObj.ozone_sn = "";
                this.formOzoneObj.ozone_concentration = "";
                this.formOzoneObj.ozone_time = "";
                this.formOzoneObj.ozone_address = "";
                this.idOzone = "";
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
    addOzone() {
      this.isOzoneEdit = 1;
      this.showOzoneDialog = true;
    },
    
    handleClick(number) {
      this.numberType = number;
      if(number == 5){

      } else if(number == 5){

      } else if(number == 4){
        
      } else if(number == 3){
        
      } else if (number == 2){
        
      } else {
        
      }
      
    },
    /**
     * 淋浴一体机
     */
    handleDisSizeChange(val) {
      this.limitDis = val;
      this.getEmployeesLists();
    },
    handlerDisEdit(id) {
      this.isDisEdit = 2;
      this.showDisDialog = true;
      getuserinfo({
        id: id,
      }).then((res) => {
        if (res.data.success) {
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formDisObj.dis_sn = itemInfo.real_name;
            this.formDisObj.dis_time = itemInfo.phone;
            this.formDisObj.dis_address = itemInfo.roleId;
            this.idDis = itemInfo.id;
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
    resetDisForm(formName) {
      this.$refs[formName].resetFields();
      this.showDisDialog = false;
      this.formDisObj.dis_sn = "";
      this.formDisObj.dis_time = "";
      this.formDisObj.dis_address = "";
      this.idDis = "";
    },
    onDisSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isDisEdit == 2) {
            let params = this.formDisObj;
            params.id = this.idDis;
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
                this.showDisDialog = false;
                this.formDisObj.dis_sn = "";
                this.formDisObj.dis_time = "";
                this.formDisObj.dis_address = "";
                this.idDis = "";
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
            let params = this.formDisObj;
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
                this.showDisDialog = false;
                this.formDisObj.dis_sn = "";
                this.formDisObj.dis_time = "";
                this.formDisObj.dis_address = "";
                this.idDis = "";
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
    addDis() {
      this.isDisEdit = 1;
      this.showDisDialog = true;
    },
    /**
     * 小动物
     */
    handleAnimalSizeChange(val) {
      this.limitAnimal = val;
      this.getEmployeesLists();
    },
    handlerAnimalEdit(id) {
      this.isAnimalEdit = 2;
      this.showAnimalDialog = true;
      getuserinfo({
        id: id,
      }).then((res) => {
        if (res.data.success) {
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formAnimalObj.animal_sn = itemInfo.real_name;
            this.formAnimalObj.animal_address = itemInfo.roleId;
            this.idAnimal = itemInfo.id;
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
    resetAnimalForm(formName) {
      this.$refs[formName].resetFields();
      this.showAnimalDialog = false;
      this.formAnimalObj.animal_sn = "";
      this.formAnimalObj.animal_address = "";
      this.idAnimal = "";
    },
    onAnimalSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAnimalEdit == 2) {
            let params = this.formAnimalObj;
            params.id = this.idAnimal;
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
                this.showAnimalDialog = false;
                this.formAnimalObj.animal_sn = "";
                this.formAnimalObj.animal_address = "";
                this.idAnimal = "";
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
            let params = this.formAnimalObj;
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
                this.showAnimalDialog = false;
                this.formAnimalObj.animal_sn = "";
                this.formAnimalObj.animal_address = "";
                this.idAnimal = "";
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
    addAnimal() {
      this.isAnimalEdit = 1;
      this.showAnimalDialog = true;
    },
    /**
     * 门禁系统管理
     */
    handleAccessSizeChange(val) {
      this.limitAccess = val;
      this.getEmployeesLists();
    },
    handlerAccessEdit(id) {
      this.isAccessEdit = 2;
      this.showAccessDialog = true;
      getuserinfo({
        id: id,
      }).then((res) => {
        if (res.data.success) {
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formAccessObj.access_sn = itemInfo.real_name;
            this.formAccessObj.access_address = itemInfo.roleId;
            this.formAccessObj.access_ip = itemInfo.roleId;
            this.idAccess = itemInfo.id;
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
    resetAccessForm(formName) {
      this.$refs[formName].resetFields();
      this.showAccessDialog = false;
      this.formAccessObj.access_sn = "";
      this.formAccessObj.access_address = "";
      this.formAccessObj.access_ip = "";
      this.idAccess = "";
    },
    onAccessSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAccessEdit == 2) {
            let params = this.formAccessObj;
            params.id = this.idAccess;
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
                this.showAccessDialog = false;
                this.formAccessObj.access_sn = "";
                this.formAccessObj.access_address = "";
                this.formAccessObj.access_ip = "";
                this.idAccess = "";
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
            let params = this.formAccessObj;
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
                this.showAccessDialog = false;
                this.formAccessObj.access_sn = "";
                this.formAccessObj.access_address = "";
                this.formAccessObj.access_ip = "";
                this.idAccess = "";
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
    addAccess() {
      this.isAccessEdit = 1;
      this.showAccessDialog = true;
    },
    /**
     * 液体消毒
     */
    handleLiquidSizeChange(val) {
      this.limitLiquid = val;
      this.getEmployeesLists();
    },
    handlerLiquidEdit(id) {
      this.isLiquidEdit = 2;
      this.showLiquidDialog = true;
      getuserinfo({
        id: id,
      }).then((res) => {
        if (res.data.success) {
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formLiquidObj.liquid_sn = itemInfo.real_name;
            this.formLiquidObj.liquid_concentration = itemInfo.job_number;
            this.formLiquidObj.liquid_time = itemInfo.phone;
            this.formLiquidObj.liquid_address = itemInfo.roleId;
            this.idLiquid = itemInfo.id;
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
    resetLiquidForm(formName) {
      this.$refs[formName].resetFields();
      this.showLiquidDialog = false;
      this.formLiquidObj.liquid_sn = "";
      this.formLiquidObj.liquid_concentration = "";
      this.formLiquidObj.liquid_time = "";
      this.formLiquidObj.liquid_address = "";
      this.idLiquid = "";
    },
    onLiquidSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isLiquidEdit == 2) {
            let params = this.formLiquidObj;
            params.id = this.idLiquid;
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
                this.showLiquidDialog = false;
                this.formLiquidObj.liquid_sn = "";
                this.formLiquidObj.liquid_concentration = "";
                this.formLiquidObj.liquid_time = "";
                this.formLiquidObj.liquid_address = "";
                this.idLiquid = "";
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
            let params = this.formLiquidObj;
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
                this.showLiquidDialog = false;
                this.formLiquidObj.liquid_sn = "";
                this.formLiquidObj.liquid_concentration = "";
                this.formLiquidObj.liquid_time = "";
                this.formLiquidObj.liquid_address = "";
                this.idLiquid = "";
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
    addLiquid() {
      this.isLiquidEdit = 1;
      this.showLiquidDialog = true;
    },
    /**
     * 车辆消毒监测
     */
    handleCarSizeChange(val) {
      this.limitCar = val;
      this.getEmployeesLists();
    },
    handlerCarEdit(id) {
      this.isCarEdit = 2;
      this.showCarDialog = true;
      getuserinfo({
        id: id,
      }).then((res) => {
        if (res.data.success) {
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formCarObj.car_sn = itemInfo.real_name;
            this.formCarObj.car_address = itemInfo.roleId;
            this.idCar = itemInfo.id;
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
    resetCarForm(formName) {
      this.$refs[formName].resetFields();
      this.showCarDialog = false;
      this.formCarObj.car_sn = "";
      this.formCarObj.car_address = "";
      this.idCar = "";
    },
    onCarSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isCarEdit == 2) {
            let params = this.formCarObj;
            params.id = this.idCar;
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
                this.showCarDialog = false;
                this.formCarObj.car_sn = "";
                this.formCarObj.car_address = "";
                this.idCar = "";
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
            let params = this.formCarObj;
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
                this.showCarDialog = false;
                this.formCarObj.car_sn = "";
                this.formCarObj.car_address = "";
                this.idCar = "";
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
    addCar() {
      this.isCarEdit = 1;
      this.showCarDialog = true;
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.device-index-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.device-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  height: 600px;
}

.device-container-right {
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

.device-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.device-demo-form-inline {
  margin-top: 20px;
}

.device-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
}
.device-click_view{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
  margin-top: 20px; 
  margin-left: 0px;
  padding: 10px 10px;
  font-size: 14px;
  border-radius: 4px;
}

.device-click_view_activity{
  color: #409EFF;
  /* background-color: #409EFF; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  border: 1px solid #409EFF;
  margin-top: 20px; 
  margin-left: 0px;
  padding: 10px 10px;
  font-size: 14px;
  border-radius: 4px;
}

.device-image{
  width: 25px;
  height: 25px;
  margin-right: 5px;
}

.device-flex-device {
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-top-view{
  display: flex;
  align-items: center;
    width: 100%;
    padding: 15px 0px;
    border-bottom: 1px solid #EEEEEE;
    margin-bottom: 20px;
}

.device-title{
  
}

.device-flex-space {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}

.device-flex-center{
  display: flex;
  /* align-items: center; */
  margin-left: 40px;
  justify-content: center;
  flex-direction: column;
}

.device-from-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
