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
        @click="handleClick(5)"><img src="../../assets/icon_2023_02_14_10.png" class="device-image" />液体消毒监测</div>

      <div
        :class="[numberType == 6 ?'device-click_view_activity':'device-click_view']"
        @click="handleClick(6)"><img src="../../assets/icon_2023_02_14_11.png" class="device-image" />车辆消毒监测</div>
    </div>

    <div class="device-container-right device-pulic_box_shadow">
      <div v-if="numberType == 1">
        <div class="device-top-view">
          <div class="device-title">物资臭氧消毒监测工作站管理({{totalOzone}})</div>
          <el-button
            type="primary"
            size="medium"
            @click="addOzone()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listOzone" stripe style="width: 1150px" height="425" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="sn"
            width="120"
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
            width="150"
            label="有效浓度(mg/m³)"
            align="center"
          />
          <el-table-column
            prop="duration"
            width="150"
            label="消毒时长(分钟)"
            align="center"
          />
          <el-table-column
            prop="controller"
            width="270"
            label="设备管理员"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                title=""
                width="300"
                trigger="hover"
                :content="scope.row.controller">
                <div class="device_people_view" slot="reference">{{scope.row.controller}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="reviewer" width="100" label="审批人" align="center" />

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
            @current-change="getzonedevicelist"
            @size-change="handleOzoneSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 2">
        <div class="device-top-view">
          <div class="device-title">淋浴一体机管理({{totalDis}})</div>
          <el-button
            type="primary"
            size="medium"
            @click="addDis()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listDis" stripe style="width: 1150px" height="425" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="sn"
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

          <el-table-column prop="gender" width="100" label="性别" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.gender == '0'">男</p>
              <p v-if="scope.row.gender == '1'">女</p>
            </template>
          </el-table-column>

          <el-table-column
            prop="duration"
            width="250"
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
            @current-change="getdeviceinfo"
            @size-change="handleDisSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 3">
        <div class="device-top-view">
          <div class="device-title">小动物监控工作站管理({{totalAnimal}})</div>
          <el-button
            type="primary"
            size="medium"
            @click="addAnimal()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listAnimal" stripe style="width: 1150px" height="425" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="sn"
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
            prop="create_time"
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
            @current-change="getForeignMatterManageList"
            @size-change="handleAnimalSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 4">
        <div class="device-top-view">
          <div class="device-title">门禁系统管理({{totalAccess}})</div>
          <el-button
            type="primary"
            size="medium"
            @click="addAccess()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listAccess" stripe style="width: 1150px" height="425" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="sn"
            width="150"
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
            prop="ip"
            width="160"
            label="设备IP地址"
            align="center"
          />
          
          <el-table-column
            prop="Person_authority"
            width="300"
            label="授权使用人员"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                title=""
                width="300"
                trigger="hover"
                :content="scope.row.Person_authority">
                <div class="device_people_view" slot="reference">{{scope.row.Person_authority}}</div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            prop="create_time"
            width="180"
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
            @current-change="getEntranceGuardManageList"
            @size-change="handleAccessSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 5">
        <div class="device-top-view">
          <div class="device-title">物资液体消毒监测工作站管理({{totalLiquid}})</div>
          <el-button
            type="primary"
            size="medium"
            @click="addLiquid()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listLiquid" stripe style="width: 1150px;" height="425" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="sn"
            width="120"
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
            prop="PH"
            width="150"
            label="有效PH值"
            align="center"
          />
          <el-table-column
            prop="duration"
            width="150"
            label="消毒时长(分钟)"
            align="center"
          />
          <el-table-column
            prop="controller"
            width="270"
            label="设备管理员"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                title=""
                width="300"
                trigger="hover"
                :content="scope.row.controller">
                <div class="device_people_view" slot="reference">{{scope.row.controller}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="reviewer" width="120" label="审批人" align="center" />

          <el-table-column label="操作" width="180" align="center">
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
            @current-change="getLiquidDevicelist"
            @size-change="handleLiquidSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
      </div>

      <div v-if="numberType == 6">
        <div class="device-top-view">
          <div class="device-title">车辆消毒监测工作站({{totalCar}})</div>
          <el-button
            type="primary"
            size="medium"
            @click="addCar()"
            style="margin-left: 20px"
            icon="el-icon-plus">新增</el-button>
        </div>

        <el-table :data="listCar" stripe style="width: 1150px" height="425" border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle">
        
          <el-table-column
            prop="sn"
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
            prop="create_time"
            width="200"
            label="设备添加时间"
            align="center"
          />
          <el-table-column
            prop="controller"
            width="350"
            label="管理员"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                title=""
                width="300"
                trigger="hover"
                :content="scope.row.controller">
                <div class="device_people_view" slot="reference">{{scope.row.controller}}</div>
              </el-popover>
            </template>
          </el-table-column>

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
            @current-change="getCarStiflingDevicelist"
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
      width="60%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formOzoneObj" :rules="rulesOzone" :model="formOzoneObj" label-width="160px">
        <div class="device-flex-space">
          <el-form-item label="设备SN号*：" prop="ozone_sn">
            <el-input
              v-model="formOzoneObj.ozone_sn"
              style="width: 200px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="有效浓度(mg/m³)：" style="margin-left:20px;" prop="ozone_concentration">
            <el-input
              v-model="formOzoneObj.ozone_concentration"
              style="width: 200px"
              placeholder="请输入有效浓度(mg/m³)"></el-input>
          </el-form-item>
        </div>

        <div class="device-flex-space">
          <el-form-item label="消毒时长(分钟)*：" prop="ozone_time">
            <el-input
              v-model="formOzoneObj.ozone_time"
              style="width: 200px"
              placeholder="请输入消毒时长(分钟)"></el-input>
          </el-form-item>

          <el-form-item label="位置*：" style="margin-left:20px;" prop="ozone_address_id">
            <el-select
              v-model="formOzoneObj.ozone_address_id"
              placeholder="请选择位置"
              style="width: 200px">
              <el-option
                v-for="(item, index) in listAccesslayoutdescr"
                :key="index"
                :label="item.location_descr"
                :value="item.id+''"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="设备管理员*：" prop="ozone_device_people">
          <el-checkbox-group v-model="formOzoneObj.ozone_device_people">
            <el-checkbox v-for="(item,index) in listEmployees" :key="index" :label="item.id+''">{{item.real_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="审批人*：" prop="ozone_app_people">
          <el-radio-group v-model="formOzoneObj.ozone_app_people" style="display: flex;flex-wrap: wrap;">
            <el-radio style="height:40px;display: flex;align-items: center;" v-for="(item,index) in listEmployees" :key="index" :label="item.id+''">{{item.real_name}}</el-radio>
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
      <el-form ref="formDisObj" :rules="rulesDis" :model="formDisObj" label-width="160px">
        <div class="device-flex-center">
          <el-form-item label="设备SN号*：" prop="dis_sn">
            <el-input
              v-model="formDisObj.dis_sn"
              style="width: 260px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="位置：" style="margin-left:0px;" prop="dis_address">
            <el-input
              v-model="formDisObj.dis_address"
              style="width: 260px"
              placeholder="请输入设备位置"></el-input>
          </el-form-item>
        <!-- </div> -->

        <el-form-item label="性别*：" prop="dis_gender">
          <el-select
            v-model="formDisObj.dis_gender"
            placeholder="请选择性别"
            style="width: 200px">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>

        <!-- <div class="device-flex-space"> -->
          <el-form-item label="有效淋浴时长(分钟)*：" prop="dis_time">
            <el-input
              v-model="formDisObj.dis_time"
              style="width: 260px"
              placeholder="请输入有效淋浴时长时长(分钟)"></el-input>
          </el-form-item>

          <!-- <el-form-item label="设备添加时间*：">
            <el-input
              v-model="dis_current_time"
              style="width: 260px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item> -->
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
      <el-form ref="formAnimalObj" :rules="rulesAnimal" :model="formAnimalObj" label-width="160px">
        <div class="device-flex-center">
          <el-form-item label="设备SN号*：" prop="animal_sn">
            <el-input
              v-model="formAnimalObj.animal_sn"
              style="width: 260px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="位置：" style="margin-left:0px;" prop="animal_address">
            <el-input
              v-model="formAnimalObj.animal_address"
              style="width: 260px"
              placeholder="请输入设备位置"></el-input>
          </el-form-item>
        
          <!-- <el-form-item label="位置*：" prop="ozone_address" style="margin-left:0px;">
            <el-select
              v-model="formAnimalObj.animal_address"
              placeholder="请选择位置"
              style="width: 260px">
              <el-option
                v-for="(item, index) in listAccesslayoutdescr"
                :key="index"
                :label="item.location_descr"
                :value="item.id+''"></el-option>
            </el-select>
          </el-form-item> -->

          <!-- <el-form-item label="设备添加时间*：">
            <el-input
              v-model="animal_current_time"
              style="width: 260px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item> -->
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
      width="45%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formAccessObj" :rules="rulesAccess" :model="formAccessObj" label-width="140px">
        <div class="device-flex-center">
          <el-form-item label="设备编号*：" prop="access_sn">
            <el-input
              v-model="formAccessObj.access_sn"
              style="width: 220px"
              placeholder="请输入设备编号"></el-input>
          </el-form-item>

          <el-form-item label="位置*：" style="margin-left:0px;" prop="access_address">
            <el-select
              v-model="formAccessObj.access_address"
              placeholder="请选择位置"
              style="width: 220px">
              <el-option
                v-for="(item, index) in listAccesslayoutdescr"
                :key="index"
                :label="item.location_descr"
                :value="item.id+''"></el-option>
            </el-select>
          </el-form-item>
        <!-- </div> -->

        <!-- <div class="device-flex-space"> -->
          <el-form-item label="设备IP地址*：" prop="access_ip">
            <el-input
              v-model="formAccessObj.access_ip"
              style="width: 220px"
              placeholder="请输入设备IP地址"></el-input>
          </el-form-item>

          <!-- <el-form-item label="设备添加时间*：">
            <el-input
              v-model="access_current_time"
              style="width: 210px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item> -->
        

        <el-form-item label="授权使用人员*：" prop="access_device_people">
          <el-checkbox-group v-model="formAccessObj.access_device_people">
            <el-checkbox v-for="(item,index) in listEmployees" :key="index" :label="item.id+''">{{item.real_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        </div>

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
          <el-form-item label="设备SN号*：" prop="liquid_sn">
            <el-input
              v-model="formLiquidObj.liquid_sn"
              style="width: 200px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="有效PH值：" style="margin-left:20px;" prop="liquid_concentration">
            <el-input
              v-model="formLiquidObj.liquid_concentration"
              style="width: 200px"
              placeholder="请输入有效PH值"></el-input>
          </el-form-item>
        </div>

        <div class="device-flex-space">
          <el-form-item label="消毒时长(分钟)*：" prop="liquid_time">
            <el-input
              v-model="formLiquidObj.liquid_time"
              style="width: 200px"
              placeholder="请输入消毒时长(分钟)"></el-input>
          </el-form-item>

          <el-form-item label="位置*：" prop="liquid_address_id" style="margin-left:20px;">
            <el-select
              v-model="formLiquidObj.liquid_address_id"
              placeholder="请选择位置"
              style="width: 200px">
              <el-option
                v-for="(item, index) in listAccesslayoutdescr"
                :key="index"
                :label="item.location_descr"
                :value="item.id+''"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="设备管理员*：" prop="liquid_device_people">
          <el-checkbox-group v-model="formLiquidObj.liquid_device_people">
            <el-checkbox v-for="(item,index) in listEmployees" :key="index" :label="item.id+''">{{item.real_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="审批人*：" prop="liquid_app_people">
          <el-radio-group v-model="formLiquidObj.liquid_app_people" style="display: flex;flex-wrap: wrap;">
            <el-radio style="height:40px;display: flex;align-items: center;" v-for="(item,index) in listEmployees" :key="index" :label="item.id+''">{{item.real_name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="设备添加时间*：">
            <el-input
              v-model="liquid_current_time"
              style="width: 200px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item> -->
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
          <el-form-item label="设备SN号*：" prop="car_sn">
            <el-input
              v-model="formCarObj.car_sn"
              style="width: 200px"
              placeholder="请输入设备SN号"></el-input>
          </el-form-item>

          <el-form-item label="位置*：" prop="car_address_id" style="margin-left:0px;">
            <el-select
              v-model="formCarObj.car_address_id"
              placeholder="请选择位置"
              style="width: 200px">
              <el-option
                v-for="(item, index) in listAccesslayoutdescr"
                :key="index"
                :label="item.location_descr"
                :value="item.id+''"></el-option>
            </el-select>
          </el-form-item>
        <!-- </div> -->

        <el-form-item label="管理员*：" prop="car_device_people">
          <el-checkbox-group v-model="formCarObj.car_device_people">
            <el-checkbox v-for="(item,index) in listEmployees" :key="index" :label="item.id+''">{{item.real_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- <el-form-item label="设备添加时间*：">
            <el-input
              v-model="car_current_time"
              style="width: 200px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item> -->
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
  getFarmlayout,
  getzonedevicelist,
  addozonedeviceinfo,
  deletedeviceinfo,
  getdeviceinfobyid,
  editdeviceinfo,
  getdeviceinfo,
  addDecontaminationdeviceinfo,
  editDecontaminationdeviceinfo,
  getForeignMatterManageList,
  addForeignMatter,
  editForeignMatterinfo,
  getEntranceGuardManageList,
  addEntranceGuard,
  getAccessdeviceinfobyid,
  editEntranceGuard,
  deleteEntranceGuardInfo,
  addLiquidDeviceinfo,
  getLiquidDevicelist,
  editLiquidinfo,
  addCarStiflingDeviceinfo,
  getCarStiflingDevicelist,
  editCarStiflinginfo
} from "../../request/api";
import { Message } from "element-ui";
export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      listEmployees: [], // 员工列表
      listAccesslayoutdescr: [], // 位置列表
      currentOzone: 1, //当前页
      limitOzone: 10, //每页显示记录数
      totalOzone: 0, //总记录数
      listOzone: [],
      showOzoneDialog: false,
      formOzoneObj: {
        ozone_sn: "",
        ozone_concentration: "",
        ozone_time: "",
        ozone_address_id: "",
        ozone_device_people: [],
        ozone_app_people: ''
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
        ozone_address_id: [{ required: true, message: "请选择位置", trigger: "change" }],
        ozone_device_people: [
          { type: 'array', required: true, message: '请至少选择一个设备管理员', trigger: 'change' }
        ],
        ozone_app_people: [
          { required: true, message: '请选择审批人', trigger: 'change' }
        ],
      },
      deleteOzoneDialog: false,
      idOzone: "", // 员工id
      isOzoneEdit: 1, // 1-新增  2-编辑


      currentDis: 1, //当前页
      limitDis: 10, //每页显示记录数
      totalDis: 0, //总记录数
      listDis: [],
      showDisDialog: false,
      formDisObj: {
        dis_sn: "",
        dis_time: "",
        dis_address: "",
        dis_gender: '' //（0男 1女)
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
        dis_gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      idDis: "", // 员工id
      isDisEdit: 1, // 1-新增  2-编辑


      currentAnimal: 1, //当前页
      limitAnimal: 10, //每页显示记录数
      totalAnimal: 0, //总记录数
      listAnimal: [],
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
        animal_address: [
          { required: true, message: "请输入位置", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // animal_address: [{ required: true, message: "请选择位置", trigger: "change" }],
      },
      idAnimal: "", // 员工id
      isAnimalEdit: 1, // 1-新增  2-编辑


      currentAccess: 1, //当前页
      limitAccess: 10, //每页显示记录数
      totalAccess: 0, //总记录数
      listAccess: [],
      showAccessDialog: false,
      formAccessObj: {
        access_sn: "",
        access_address: "",
        access_ip: "",
        access_device_people: [],
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
        access_device_people: [
          { type: 'array', required: true, message: '请至少选择一个设备管理员', trigger: 'change' }
        ],
      },
      idAccess: "", // 员工id
      isAccessEdit: 1, // 1-新增  2-编辑


      currentLiquid: 1, //当前页
      limitLiquid: 10, //每页显示记录数
      totalLiquid: 0, //总记录数
      listLiquid: [],
      showLiquidDialog: false,
      formLiquidObj: {
        liquid_sn: "",
        liquid_concentration: "",
        liquid_time: "",
        liquid_address_id: "",
        liquid_device_people: [],
        liquid_app_people: ''
      },
      // liquid_current_time: new Date().getTime(),
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
        liquid_address_id: [{ required: true, message: "请选择位置", trigger: "change" }],
        liquid_device_people: [
          { type: 'array', required: true, message: '请至少选择一个设备管理员', trigger: 'change' }
        ],
        liquid_app_people: [
          { required: true, message: '请选择审批人', trigger: 'change' }
        ],
      },
      deleteLiquidDialog: false,
      idLiquid: "", // 员工id
      isLiquidEdit: 1, // 1-新增  2-编辑

      currentCar: 1, //当前页
      limitCar: 10, //每页显示记录数
      totalCar: 0, //总记录数
      listCar: [],
      showCarDialog: false,
      formCarObj: {
        car_sn: "",
        car_address_id: "",
        car_device_people: [],
      },
      // car_current_time: new Date().getTime(),
      rulesCar: {
        car_sn: [
          { required: true, message: "请输入设备SN号", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        car_address_id: [{ required: true, message: "请选择位置", trigger: "change" }],
        car_device_people: [
          { type: 'array', required: true, message: '请至少选择一个设备管理员', trigger: 'change' }
        ],
      },
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
      // this.liquid_current_time = this.dateFormat(this.liquid_current_time);
      // this.car_current_time = this.dateFormat(this.car_current_time);
      this.getEmployeesLists();
      this.getFarmlayout();

      this.getzonedevicelist();
      
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
    getEmployeesLists() {
      getEmployeesLists({
        pig_farm_id: this.userInfo.farm_id,
        page: 1,
        limit: 1000,
        real_name: '',
      }).then((res) => {
        if (res.data.success) {
          this.listEmployees = res.data.info;
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
    getFarmlayout() {
      getFarmlayout({
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
    handleClick(number) {
      this.numberType = number;
      if(number == 6){
        this.limitCar = 10;
        this.currentCar = 1;
        this.getCarStiflingDevicelist()
      } else if(number == 5){
        this.limitLiquid = 10;
        this.currentLiquid = 1;
        this.getLiquidDevicelist()
      } else if(number == 4){
        this.limitAccess = 10;
        this.currentAccess = 1;
        this.getEntranceGuardManageList()
      } else if(number == 3){
        this.limitAnimal = 10;
        this.currentAnimal = 1;
        this.getForeignMatterManageList()
      } else if (number == 2){
        this.limitDis = 10;
        this.currentDis = 1;
        this.getdeviceinfo()
      } else {
        this.limitOzone = 10;
        this.currentOzone = 1;
        this.getzonedevicelist()
      }
      
    },
    /**
     * 删除
     */
    handlerOzoneDelete(id) {
      if(this.numberType == 1){
        this.deleteOzoneDialog = true;
        this.idOzone = id;
      } else if(this.numberType == 2){
        this.deleteOzoneDialog = true;
        this.idDis = id;
      } else if(this.numberType == 3){
        this.deleteOzoneDialog = true;
        this.idAnimal = id;
      } else if(this.numberType == 4){
        this.deleteOzoneDialog = true;
        this.idAccess = id;
      } else if(this.numberType == 5){
        this.deleteOzoneDialog = true;
        this.idLiquid = id;
      } else if(this.numberType == 6){
        this.deleteOzoneDialog = true;
        this.idCar = id;
      }
    },
    deleteOzoneClick() {
      if(this.numberType == 1){
        if (this.idOzone) {
          this.publicDelete(this.idOzone);
        }
      } else if(this.numberType == 2){
        if (this.idDis) {
          this.publicDelete(this.idDis);
        }
      } else if(this.numberType == 3){
        if (this.idAnimal) {
          this.publicDelete(this.idAnimal);
        }
      } else if(this.numberType == 4){
        if (this.idAccess) {
          deleteEntranceGuardInfo({
            id: this.idAccess,
            status: '1'
          }).then((res) => {
            if (res.data.success) {
              Message({
                type: "success",
                message: res.data.msg,
                showClose: true,
                duration: 3000,
              });

              // this.limitAccess = 10;
              // this.currentAccess = 1;
              // this.resetAccessForm('formAccessObj');
              this.deleteOzoneDialog = false;
              this.getEntranceGuardManageList()
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
      } else if(this.numberType == 5){
        if (this.idLiquid) {
          this.publicDelete(this.idLiquid);
        }
      } else if(this.numberType == 6){
        if (this.idCar) {
          this.publicDelete(this.idCar);
        }
      }
    },
    publicDelete(id){
      deletedeviceinfo({
            id: id,
            status: '1'
          }).then((res) => {
            if (res.data.success) {
              Message({
                type: "success",
                message: res.data.msg,
                showClose: true,
                duration: 3000,
              });

              if(this.numberType == 1){
                // this.limitOzone = 10;
                // this.currentOzone = 1;
                // this.resetOzoneForm('formOzoneObj');
                this.deleteOzoneDialog = false;
                this.getzonedevicelist()
              } else if(this.numberType == 2){
                // this.limitDis = 10;
                // this.currentDis = 1;
                // this.resetDisForm('formDisObj');
                this.deleteOzoneDialog = false;
                this.getdeviceinfo()
              } else if(this.numberType == 3){
                // this.limitAnimal = 10;
                // this.currentAnimal = 1;
                // this.resetAnimalForm('formAnimalObj');
                this.deleteOzoneDialog = false;
                this.getForeignMatterManageList()
              } else if(this.numberType == 5){
                this.deleteOzoneDialog = false;
                this.getLiquidDevicelist()
              } else if(this.numberType == 6){
                this.deleteOzoneDialog = false;
                this.getCarStiflingDevicelist()
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
    /**
     * 臭氧熏蒸
     */
    getzonedevicelist() {
      getzonedevicelist({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentOzone,
        limit: this.limitOzone,
      }).then((res) => {
        if (res.data.success) {
          this.listOzone = res.data.data;
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
      this.getzonedevicelist();
    },
    handlerOzoneEdit(id) {
      this.isOzoneEdit = 2;
      getdeviceinfobyid({
        id: id,
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.showOzoneDialog = true;
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            let controller = itemInfo.controller.split(',')
            this.formOzoneObj.ozone_sn = itemInfo.sn;
            this.formOzoneObj.ozone_concentration = itemInfo.concentration;
            this.formOzoneObj.ozone_time = itemInfo.duration;
            this.formOzoneObj.ozone_address_id = itemInfo.layout_id;
            this.formOzoneObj.ozone_device_people = controller;
            this.formOzoneObj.ozone_app_people = itemInfo.reviewer;
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
    resetOzoneForm(formName) {
      this.$refs[formName].resetFields();
      this.showOzoneDialog = false;
      this.formOzoneObj.ozone_sn = "";
      this.formOzoneObj.ozone_concentration = "";
      this.formOzoneObj.ozone_time = "";
      this.formOzoneObj.ozone_address_id = "";
      this.formOzoneObj.ozone_device_people = [];
      this.formOzoneObj.ozone_app_people = "";
      this.idOzone = "";
    },
    onOzoneSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isOzoneEdit == 2) {
            let addressText = '';
            for(let i = 0; i < this.listAccesslayoutdescr.length; i++){
              if(this.listAccesslayoutdescr[i].id == this.formOzoneObj.ozone_address_id){
                addressText = this.listAccesslayoutdescr[i].location_descr;
                break;
              }
            }
            let ozone_device_people = this.formOzoneObj.ozone_device_people.join(',')
            let params = {
              id: this.idOzone,
              sn: this.formOzoneObj.ozone_sn,
              address: addressText,
              layout_id: this.formOzoneObj.ozone_address_id,
              controller: ozone_device_people,
              reviewer: this.formOzoneObj.ozone_app_people,
              duration: this.formOzoneObj.ozone_time,
              concentration: this.formOzoneObj.ozone_concentration,
            };

            editdeviceinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getzonedevicelist();

                this.$refs[formName].resetFields();
                this.showOzoneDialog = false;
                this.formOzoneObj.ozone_sn = "";
                this.formOzoneObj.ozone_concentration = "";
                this.formOzoneObj.ozone_time = "";
                this.formOzoneObj.ozone_address_id = "";
                this.formOzoneObj.ozone_device_people = [];
                this.formOzoneObj.ozone_app_people = "";
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
            let addressText = '';
            for(let i = 0; i < this.listAccesslayoutdescr.length; i++){
              if(this.listAccesslayoutdescr[i].id == this.formOzoneObj.ozone_address_id){
                addressText = this.listAccesslayoutdescr[i].location_descr;
                break;
              }
            }
            let ozone_device_people = this.formOzoneObj.ozone_device_people.join(',')
            let params = {
              pig_farm_id: this.userInfo.farm_id,
              type: '2',
              sn: this.formOzoneObj.ozone_sn,
              address: addressText,
              layout_id: this.formOzoneObj.ozone_address_id,
              controller: ozone_device_people,
              reviewer: this.formOzoneObj.ozone_app_people,
              duration: this.formOzoneObj.ozone_time,
              concentration: this.formOzoneObj.ozone_concentration,
            };

            addozonedeviceinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getzonedevicelist();

                this.$refs[formName].resetFields();
                this.showOzoneDialog = false;
                this.formOzoneObj.ozone_sn = "";
                this.formOzoneObj.ozone_concentration = "";
                this.formOzoneObj.ozone_time = "";
                this.formOzoneObj.ozone_address_id = "";
                this.formOzoneObj.ozone_device_people = [];
                this.formOzoneObj.ozone_app_people = "";
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
    /**
     * 淋浴一体机
     */
    getdeviceinfo() {
      getdeviceinfo({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentDis,
        limit: this.limitDis,
      }).then((res) => {
        if (res.data.success) {
          this.listDis = res.data.data;
          this.totalDis = parseInt(res.data.count);
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
    handleDisSizeChange(val) {
      this.limitDis = val;
      this.getdeviceinfo();
    },
    handlerDisEdit(id) {
      this.isDisEdit = 2;
      this.dis_current_time = this.dateFormat(new Date().getTime());
      getdeviceinfobyid({
        id: id,
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.showDisDialog = true;

          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formDisObj.dis_sn = itemInfo.sn;
            this.formDisObj.dis_time = itemInfo.duration;
            this.formDisObj.dis_address = itemInfo.address;
            this.formDisObj.dis_gender = itemInfo.gender;
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
      this.formDisObj.dis_gender = "";
      this.idDis = "";
    },
    onDisSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isDisEdit == 2) {
            let params = {
              pig_farm_id: this.userInfo.farm_id,
              id: this.idDis,
              sn: this.formDisObj.dis_sn,
              address: this.formDisObj.dis_address,
              gender: this.formDisObj.dis_gender,
              duration: this.formDisObj.dis_time,
            };

            editDecontaminationdeviceinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getdeviceinfo();

                this.$refs[formName].resetFields();
                this.showDisDialog = false;
                this.formDisObj.dis_sn = "";
                this.formDisObj.dis_time = "";
                this.formDisObj.dis_address = "";
                this.formDisObj.dis_gender = "";
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
            let params = {
              pig_farm_id: this.userInfo.farm_id,
              type: '1',
              sn: this.formDisObj.dis_sn,
              address: this.formDisObj.dis_address,
              gender: this.formDisObj.dis_gender,
              duration: this.formDisObj.dis_time,
            };

            addDecontaminationdeviceinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getdeviceinfo();

                this.$refs[formName].resetFields();
                this.showDisDialog = false;
                this.formDisObj.dis_sn = "";
                this.formDisObj.dis_time = "";
                this.formDisObj.dis_address = "";
                this.formDisObj.dis_gender = "";
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
      this.dis_current_time = this.dateFormat(new Date().getTime());
      this.showDisDialog = true;
    },
    /**
     * 小动物
     */
    getForeignMatterManageList() {
      getForeignMatterManageList({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentAnimal,
        limit: this.limitAnimal,
      }).then((res) => {
        if (res.data.success) {
          this.listAnimal = res.data.data;
          this.totalAnimal = parseInt(res.data.count);
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
    handleAnimalSizeChange(val) {
      this.limitAnimal = val;
      this.getForeignMatterManageList();
    },
    handlerAnimalEdit(id) {
      this.isAnimalEdit = 2;
      this.animal_current_time = this.dateFormat(new Date().getTime());
      // this.showAnimalDialog = true;
      getdeviceinfobyid({
        id: id,
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.showAnimalDialog = true;

          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formAnimalObj.animal_sn = itemInfo.sn;
            this.formAnimalObj.animal_address = itemInfo.address;
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
            let params = {
              pig_farm_id: this.userInfo.farm_id,
              id: this.idAnimal,
              sn: this.formAnimalObj.animal_sn,
              address: this.formAnimalObj.animal_address,
            };
            editForeignMatterinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getForeignMatterManageList();

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
            let params = {
              pig_farm_id: this.userInfo.farm_id,
              type: '3',
              sn: this.formAnimalObj.animal_sn,
              address: this.formAnimalObj.animal_address,
            };

            addForeignMatter(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getForeignMatterManageList();

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
      this.animal_current_time = this.dateFormat(new Date().getTime());
      this.showAnimalDialog = true;
    },
    /**
     * 门禁系统管理
     */
    getEntranceGuardManageList() {
      getEntranceGuardManageList({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentAccess,
        limit: this.limitAccess,
      }).then((res) => {
        if (res.data.success) {
          this.listAccess = res.data.data;
          this.totalAccess = parseInt(res.data.count);
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
    handleAccessSizeChange(val) {
      this.limitAccess = val;
      this.getEntranceGuardManageList();
    },
    handlerAccessEdit(id) {
      this.isAccessEdit = 2;
      this.access_current_time = this.dateFormat(new Date().getTime());
      
      getAccessdeviceinfobyid({
        id: id,
      }).then((res) => {
        if (res.data.success) {
          this.showAccessDialog = true;

          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            let person_authority = itemInfo.Person_authority.split(',')
            this.formAccessObj.access_sn = itemInfo.sn;
            this.formAccessObj.access_address = itemInfo.location_id+'';
            this.formAccessObj.access_ip = itemInfo.access_control_ipaddress;
            this.formAccessObj.access_device_people = person_authority;
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
      this.formAccessObj.access_device_people = [];
      this.idAccess = "";
    },
    onAccessSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAccessEdit == 2) {
            let access_device_people = this.formAccessObj.access_device_people.join(',')
            let params = {
              id: this.idAccess,
              pig_farm_id: this.userInfo.farm_id,
              sn: this.formAccessObj.access_sn,
              ip: this.formAccessObj.access_ip,
              address_id: this.formAccessObj.access_address,
              Person_authority: access_device_people,
            };

            editEntranceGuard(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getEntranceGuardManageList();

                this.$refs[formName].resetFields();
                this.showAccessDialog = false;
                this.formAccessObj.access_sn = "";
                this.formAccessObj.access_address = "";
                this.formAccessObj.access_ip = "";
                this.formAccessObj.access_device_people = [];
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
            // let addressText = '';
            // for(let i = 0; i < this.listAccesslayoutdescr.length; i++){
            //   if(this.listAccesslayoutdescr[i].id == this.formOzoneObj.ozone_address_id){
            //     addressText = this.listAccesslayoutdescr[i].location_descr;
            //     break;
            //   }
            // }
            let access_device_people = this.formAccessObj.access_device_people.join(',')
            let params = {
              pig_farm_id: this.userInfo.farm_id,
              sn: this.formAccessObj.access_sn,
              ip: this.formAccessObj.access_ip,
              address_id: this.formAccessObj.access_address,
              Person_authority: access_device_people,
            };

            addEntranceGuard(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getEntranceGuardManageList();

                this.$refs[formName].resetFields();
                this.showAccessDialog = false;
                this.formAccessObj.access_sn = "";
                this.formAccessObj.access_address = "";
                this.formAccessObj.access_ip = "";
                this.formAccessObj.access_device_people = [];
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
      this.access_current_time = this.dateFormat(new Date().getTime());
      this.showAccessDialog = true;
    },
    /**
     * 液体消毒
     */
    getLiquidDevicelist() {
      getLiquidDevicelist({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentLiquid,
        limit: this.limitLiquid,
      }).then((res) => {
        if (res.data.success) {
          this.listLiquid = res.data.data;
          this.totalLiquid = parseInt(res.data.count);
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
    handleLiquidSizeChange(val) {
      this.limitLiquid = val;
      this.getLiquidDevicelist();
    },
    handlerLiquidEdit(id) {
      this.isLiquidEdit = 2;
      getdeviceinfobyid({
        id: id,
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.showLiquidDialog = true;
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            let controller = itemInfo.controller.split(',')
            this.formLiquidObj.liquid_sn = itemInfo.sn;
            this.formLiquidObj.liquid_concentration = itemInfo.PH;
            this.formLiquidObj.liquid_time = itemInfo.duration;
            this.formLiquidObj.liquid_address_id = itemInfo.layout_id;
            this.formLiquidObj.liquid_device_people = controller;
            this.formLiquidObj.liquid_app_people = itemInfo.reviewer;
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
      this.formLiquidObj.liquid_address_id = "";
      this.formLiquidObj.liquid_device_people = [];
      this.formLiquidObj.liquid_app_people = "";
      this.idLiquid = "";
    },
    onLiquidSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isLiquidEdit == 2) {
            let addressText = '';
            for(let i = 0; i < this.listAccesslayoutdescr.length; i++){
              if(this.listAccesslayoutdescr[i].id == this.formLiquidObj.liquid_address_id){
                addressText = this.listAccesslayoutdescr[i].location_descr;
                break;
              }
            }
            let liquid_device_people = this.formLiquidObj.liquid_device_people.join(',')
            let params = {
              id: this.idLiquid,
              sn: this.formLiquidObj.liquid_sn,
              address: addressText,
              layout_id: this.formLiquidObj.liquid_address_id,
              controller: liquid_device_people,
              reviewer: this.formLiquidObj.liquid_app_people,
              duration: this.formLiquidObj.liquid_time,
              PH: this.formLiquidObj.liquid_concentration,
            };

            editLiquidinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getLiquidDevicelist();

                this.$refs[formName].resetFields();
                this.showLiquidDialog = false;
                this.formLiquidObj.liquid_sn = "";
                this.formLiquidObj.liquid_concentration = "";
                this.formLiquidObj.liquid_time = "";
                this.formLiquidObj.liquid_address_id = "";
                this.formLiquidObj.liquid_device_people = [];
                this.formLiquidObj.liquid_app_people = "";
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
            let addressText = '';
            for(let i = 0; i < this.listAccesslayoutdescr.length; i++){
              if(this.listAccesslayoutdescr[i].id == this.formLiquidObj.liquid_address_id){
                addressText = this.listAccesslayoutdescr[i].location_descr;
                break;
              }
            }
            let liquid_device_people = this.formLiquidObj.liquid_device_people.join(',')
            let params = {
              pig_farm_id: this.userInfo.farm_id,
              type: '4',
              sn: this.formLiquidObj.liquid_sn,
              address: addressText,
              layout_id: this.formLiquidObj.liquid_address_id,
              controller: liquid_device_people,
              reviewer: this.formLiquidObj.liquid_app_people,
              duration: this.formLiquidObj.liquid_time,
              PH: this.formLiquidObj.liquid_concentration,
            };

            addLiquidDeviceinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getLiquidDevicelist();

                this.$refs[formName].resetFields();
                this.showLiquidDialog = false;
                this.formLiquidObj.liquid_sn = "";
                this.formLiquidObj.liquid_concentration = "";
                this.formLiquidObj.liquid_time = "";
                this.formLiquidObj.liquid_address_id = "";
                this.formLiquidObj.liquid_device_people = [];
                this.formLiquidObj.liquid_app_people = "";
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
    getCarStiflingDevicelist() {
      getCarStiflingDevicelist({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentCar,
        limit: this.limitCar,
      }).then((res) => {
        if (res.data.success) {
          this.listCar = res.data.data;
          this.totalCar = parseInt(res.data.count);
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
    handleCarSizeChange(val) {
      this.limitCar = val;
      this.getCarStiflingDevicelist();
    },
    handlerCarEdit(id) {
      this.isCarEdit = 2;
      getdeviceinfobyid({
        id: id,
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.showCarDialog = true;
          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            let controller = itemInfo.controller.split(',')
            this.formCarObj.car_sn = itemInfo.sn;
            this.formCarObj.car_address_id = itemInfo.layout_id;
            this.formCarObj.car_device_people = controller;
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
      this.formCarObj.car_address_id = "";
      this.formCarObj.car_device_people = [];
      this.idCar = "";
    },
    onCarSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isCarEdit == 2) {
            let addressText = '';
            for(let i = 0; i < this.listAccesslayoutdescr.length; i++){
              if(this.listAccesslayoutdescr[i].id == this.formCarObj.car_address_id){
                addressText = this.listAccesslayoutdescr[i].location_descr;
                break;
              }
            }
            let car_device_people = this.formCarObj.car_device_people.join(',')
            let params = {
              id: this.idCar,
              sn: this.formCarObj.car_sn,
              address: addressText,
              layout_id: this.formCarObj.car_address_id,
              controller: car_device_people
            };

            editCarStiflinginfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getCarStiflingDevicelist();

                this.$refs[formName].resetFields();
                this.showCarDialog = false;
                this.formCarObj.car_sn = "";
                this.formCarObj.car_address_id = "";
                this.formCarObj.car_device_people = [];
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
            let addressText = '';
            for(let i = 0; i < this.listAccesslayoutdescr.length; i++){
              if(this.listAccesslayoutdescr[i].id == this.formCarObj.car_address_id){
                addressText = this.listAccesslayoutdescr[i].location_descr;
                break;
              }
            }
            let car_device_people = this.formCarObj.car_device_people.join(',')
            let params = {
              pig_farm_id: this.userInfo.farm_id,
              type: '5',
              sn: this.formCarObj.car_sn,
              address: addressText,
              layout_id: this.formCarObj.car_address_id,
              controller: car_device_people
            };

            addCarStiflingDeviceinfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getCarStiflingDevicelist();

                this.$refs[formName].resetFields();
                this.showCarDialog = false;
                this.formCarObj.car_sn = "";
                this.formCarObj.car_address_id = "";
                this.formCarObj.car_device_people = [];
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
  /* justify-content: center; */
  flex-direction: column;
  padding: 0px 20px;
  margin-left: 200px;
  height: 600px;
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

.device_people_view{
  /* display: flex;
  align-items: center;
  justify-content: center; */
  white-space: normal;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
