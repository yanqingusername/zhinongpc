<template>
  <div class="measure-index-container">
    <div class="measure-container-left measure-pulic_box_shadow">
      <div
        :class="[numberType == 1 ?'measure-click_view_activity':'measure-click_view']"
        @click="handleClick(1)">栋舍设备布局</div>
      <div
        :class="[numberType == 2 ?'measure-click_view_activity':'measure-click_view']"
        @click="handleClick(2)">个体健康历史记录</div>
      <div
        :class="[numberType == 3 ?'measure-click_view_activity':'measure-click_view']"
        @click="handleClick(3)">猪只个体档案管理</div>

      <div
        :class="[numberType == 4 ?'measure-click_view_activity':'measure-click_view']"
        @click="handleClick(4)">栋舍信息管理</div>

      <div
        :class="[numberType == 5 ?'measure-click_view_activity':'measure-click_view']"
        @click="handleClick(5)">猪只批量入栏</div>

      <div
        :class="[numberType == 6 ?'measure-click_view_activity':'measure-click_view']"
        @click="handleClick(6)">猪只批量转栏</div>
    </div>

    <div class="measure-container-right measure-pulic_box_shadow">
      <div v-if="numberType == 1">
        <div class="measure-top-view">
          <div class="measure-title">⽿环共计： </div>
          <div style="font-size: 18px;font-weight: bold;">{{labelcount}}</div>
          <div class="measure-title" style="margin-left:5px;">个</div>    
          <div class="measure-title" style="margin-left:30px;">摄像头共计： </div>
          <div style="font-size: 18px;font-weight: bold;">{{cameracount}}</div>
          <div class="measure-title" style="margin-left:5px;">台</div>
        </div>
        <div class="measure-div_view">
            <el-row>
              <el-col
                :span="6"
                v-for="(item, index) in listDisplaysum"
                :key="index"
                class="measure-box-col"
              >
                <el-card :body-style="{ padding: '0px' }" class="measure-box-card">
                  <div style="padding: 20px 0px 0px 0px;">
                    <div class="measure-image_view">
                      <img src="../../assets/piggery_blue.png" class="measure-image" />
                      <span>{{item.location_descr}}</span>
                    </div>
                    <div class="measure-bottom measure-clearfix">
                      <div class="measure-box-card-center">
                        <img src="../../assets/icon_2023_02_14_7.png" class="measure-icon-image" />
                        <div class="measure-item_view">
                          <span class="measure-item_view_1">耳环</span>
                          <span class="measure-item_view_2">{{item.labelsum}}</span>
                        </div>
                      </div>
                      <div class="measure-box-card-line"></div>
                      <div class="measure-box-card-center">
                        <img src="../../assets/monitor.png" class="measure-icon-image" />
                        <div class="measure-item_view">
                          <span class="measure-item_view_1">摄像头</span>
                          <span class="measure-item_view_2">{{item.camerasum}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="measure-name_span">饲养员： {{item.administrators || '未知'}}</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
      </div>

      <div v-if="numberType == 2">
        <div class="measure-view_2">
          <div class="measure-view_2_1" v-if="logisticsDialog">
            <!-- <div class="measure-view_2_top measure-pulic_box_shadow">
              <div class="measure-view_2_top_1" @click="handlerClick(1)">
                <span class="measure-view_2_top_1_1">50</span>
                <span class="measure-view_2_top_1_2">总存栏</span>
              </div>
              <div class="measure-view_2_top_1" @click="handlerClick(2)">
                <span class="measure-view_2_top_1_1">5</span>
                <span class="measure-view_2_top_1_2">发热</span>
              </div>
              <div class="measure-view_2_top_1" @click="handlerClick(3)">
                <span class="measure-view_2_top_1_1">30</span>
                <span class="measure-view_2_top_1_2">离线</span>
              </div>
            </div> -->
            <div class="measure-top-view">
              <div class="measure-title">总存栏： </div>
              <div style="font-size: 18px;font-weight: bold;">{{cun}}</div>
              <div class="measure-title" style="margin-left:30px;">发热： </div>   
              <div style="font-size: 18px;font-weight: bold;color:red;">{{feversum}}</div> 
              <div class="measure-title" style="margin-left:30px;">离线： </div>
              <div style="font-size: 18px;font-weight: bold;">{{abnormalsum}}</div>
            </div>
            <el-form :inline="true" class="measure-demo-form-inline">
              <el-form-item label="耳号" prop="source_label2">
                <el-input
                  v-model="source_label2"
                  placeholder="请输入耳号"
                  clearable
                  style="width: 180px"
                />
              </el-form-item>

              <el-form-item label="场区" prop="sitearea2">
                <el-select
                  v-model="sitearea2"
                  filterable
                  clearable
                  placeholder="请选择场区"
                  @change="handlerChangeSitearea"
                  style="width: 180px"
                >
                <el-option
                  v-for="(item, index) in listPigSitearea"
                  :key="index"
                  :label="item.location_descr"
                  :value="item.id+''"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="场区" prop="sitearea2">
                <el-input
                  v-model="sitearea2"
                  placeholder="请输入场区"
                  clearable
                />
              </el-form-item> -->
              
              <!-- @change="handlerChangeDoor" -->
              <el-form-item label="栋舍" prop="door2">
                <el-select
                  v-model="door2"
                  filterable
                  clearable
                  placeholder="请选择栋舍"
                  style="width: 180px"
                >
                <el-option
                  v-for="(item, index) in listAllPiggery"
                  :key="index"
                  :label="item.location_descr"
                  :value="item.id+''"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="栋舍" prop="door2">
                <el-input v-model="door2" placeholder="请输入栋舍" clearable />
              </el-form-item> -->

              <!-- <el-form-item label="栏位" prop="dorm2">
                <el-select
                  v-model="dorm2"
                  filterable
                  clearable
                  placeholder="请选择栏位"
                  @change="handlerChangeDoor"
                >
                <el-option
                  v-for="(item, index) in listStyByPiggery"
                  :key="index"
                  :label="item.dorm"
                  :value="item.dormid+''"></el-option>
                </el-select>
              </el-form-item> -->
              <!-- <el-form-item label="栏位" prop="dorm2">
                <el-input v-model="dorm2" placeholder="请输入栏位" clearable />
              </el-form-item> -->

              <el-form-item label="状态" prop="status2">
                <el-select
                  v-model="status2"
                  filterable
                  clearable
                  placeholder="请选择状态"
                  style="width: 180px"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="发热" value="4"></el-option>
                  <el-option label="离线" value="2"></el-option>
                  <el-option label="离场" value="3"></el-option>
                </el-select>
              </el-form-item>

              <el-button
                style="margin-left:20px;"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="getPigHistorylist()">查询</el-button>
              <el-button type="primary" size="medium" @click="exportPigHistoryData()" style="margin-left:20px;" icon="el-icon-folder">导出</el-button>
            </el-form>
            <el-table :data="listPigHistory" stripe style="width: 100%" border
              :row-style="iRowStyle"
              :cell-style="iCellStyle"
              :header-row-style="iHeaderRowStyle"
              :header-cell-style="iHeaderCellStyle" 
              height="370">
              <el-table-column
                prop="source_label"
                width="120"
                label="耳号"
                align="center"
              />
              <el-table-column
                prop="label_id"
                width="120"
                label="电子耳标号"
                align="center"
              />
              <el-table-column
                prop="Sitearea"
                width="190"
                label="场区"
                align="center"
              />
              <el-table-column
                prop="door"
                width="190"
                label="栋舍"
                align="center"
              />
              <el-table-column
                prop="dorm"
                width="190"
                label="栏位"
                align="center"
              />
              <el-table-column
                prop="status"
                width="110"
                label="状态"
                align="center"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.status == '1'">正常</p>
                  <p v-if="scope.row.status == '4'">发热</p>
                  <p v-if="scope.row.status == '2'">离线</p>
                  <p v-if="scope.row.status == '3'">离场</p>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="230" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="logisticsClick(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="block" style="margin-top: 0px">
              <el-pagination
                :current-page="current2"
                :page-size="limit2"
                :total="total2"
                style="padding: 30px 0; text-align: center"
                layout="total, sizes, prev, pager, next"
                @current-change="getPigHistorylist"
                @size-change="handlePigHistorySizeChange"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>
          </div>
          <div class="measure-view_2_1" v-if="!logisticsDialog">
            <el-page-header @back="handlerReturn" content="返回历史列表" style="padding: 20px 0px 0px 0px;"></el-page-header>
            <div class="measure-view_2_top measure-pulic_box_shadow" style="margin-top: 20px;">
              <div class="measure-view_2_top_1">
                <span class="measure-view_2_top_1_1">{{pigInfoObj.source_label}}</span>
                <span class="measure-view_2_top_1_2">耳号</span>
              </div>
              <div class="measure-view_2_top_1">
                <span class="measure-view_2_top_1_1">{{pigInfoObj.label_id}}</span>
                <span class="measure-view_2_top_1_2">电子耳号</span>
              </div>
              <!-- label_type: 3, // 耳环类型 0：育肥猪，1：母猪，2：仔猪，3：公猪 -->
              <div class="measure-view_2_top_1">
                <span class="measure-view_2_top_1_1">{{pigInfoObj.label_type == 0 ? '育肥猪' : pigInfoObj.label_type == 1 ? '母猪' : pigInfoObj.label_type == 2 ? '仔猪' : '公猪'}}</span>
                <span class="measure-view_2_top_1_2">性别</span>
              </div>
            </div>
            <el-form :inline="true" class="measure-demo-form-inline">
              <el-form-item label="时间范围">
                <el-date-picker
                  v-model="timepiglist"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 260px">
                  </el-date-picker>
               </el-form-item>

              <el-button
                style="margin-left:20px;"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="getLabelTemActInfo()">查询</el-button>

              <el-button type="primary" size="medium" @click="exportPigDetailsData()" style="margin-left:20px;" icon="el-icon-folder">导出</el-button>
            </el-form>
            <el-table :data="listLabelTemActInfo" stripe style="width: 100%;" border
            :row-style="iRowStyle"
              :cell-style="iCellStyle"
              :header-row-style="iHeaderRowStyle"
              :header-cell-style="iHeaderCellStyle"
              height="100%"
            >
              <el-table-column
                prop="Sitearea"
                width="220"
                label="场区"
                align="center"
              />
              <el-table-column
                prop="door"
                width="220"
                label="栋舍"
                align="center"
              />
              <el-table-column
                prop="dorm"
                width="220"
                label="栏位"
                align="center"
              />
              <el-table-column
                prop="temp"
                width="140"
                label="体温(°C)"
                align="center"
              />
              <el-table-column
                prop="act"
                width="152"
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
              <el-table-column
                prop="date"
                width="200"
                label="更新时间"
                align="center"
              />
              
            </el-table>

            <!-- 分页 -->
            <div class="block" style="margin-top: 0px">
              <el-pagination
                :current-page="currentLabel"
                :page-size="limitLabel"
                :total="totalLabel"
                style="padding: 30px 0; text-align: center"
                layout="total, sizes, prev, pager, next"
                @current-change="getLabelTemActInfo"
                @size-change="handleLabelSizeChange"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>

            <div class="measure-echarts_view">
                <div class="measure-date-view">
                  <el-radio-group v-model="temp_date_type" size="small" @input="handlerTempDateType">
                    <el-radio-button label="0">天</el-radio-button>
                    <el-radio-button label="1">周</el-radio-button>
                    <el-radio-button label="2">6个月</el-radio-button>
                  </el-radio-group>


                    
                    <el-date-picker
                      v-model="timeEchartslist"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :readonly="true"
                      style="width: 260px;margin-left:30px;"
                      size='small'>
                      </el-date-picker>
        <div
        v-if="temp_date_type == '0'"
        :class="[tempDayType == 1 ?'measure-date-view-click-activity':'measure-date-view-click']"
        @click="handlerTempDayType(1)">前一天</div>

        <div
        v-if="temp_date_type == '0'"
        :class="[tempDayType == 2 ?'measure-date-view-click-activity':'measure-date-view-click']"
        @click="handlerTempDayType(2)">前二天</div>

        <div
        v-if="temp_date_type == '0'"
        :class="[tempDayType == 3 ?'measure-date-view-click-activity':'measure-date-view-click']"
        @click="handlerTempDayType(3)">前三天</div>

                    
                </div>
                <div class="measure-echarts_view_top">
                    <div class="measure-echarts_view_l">
                        <div class="measure-echarts_view_title">猪只体温曲线图</div>
                        <div id="echarttemp" style="width: 520px;height:400px;"></div>
                    </div>
                    <div class="measure-echarts_view_r">
                        <div class="measure-echarts_view_title">猪只活跃度</div>
                        <div id="echartact" style="width: 520px;height:400px;"></div>
                    </div>
                </div>
                <div class="measure-echarts_view_center">
                    
                </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="numberType == 3">
        <div class="measure-view_2">
          <div class="measure-view_2_1">
            <el-form :inline="true" class="measure-demo-form-inline">
              <el-form-item label="耳号" prop="source_label3">
                <el-input
                  v-model="source_label3"
                  placeholder="请输入耳号"
                  clearable
                />
              </el-form-item>
              
              <!-- <el-form-item label="品种" prop="breed3">
                <el-input
                  v-model="breed3"
                  placeholder="请输入品种"
                  clearable
                />
              </el-form-item> -->
              <el-form-item label="品种" prop="breed3">
                <el-select
                  v-model="breed3"
                  filterable
                  clearable
                  placeholder="请选择品种"
                  style="width: 180px"
                >
                <el-option
                  v-for="(item, index) in listBreed"
                  :key="index"
                  :label="item"
                  :value="item"></el-option>
                </el-select>
              </el-form-item>

              
              <el-form-item label="在场情况" prop="presence_situation3">
                <el-select
                  v-model="presence_situation3"
                  filterable
                  clearable
                  placeholder="请选择在场情况"
                  style="width: 180px"
                >
                  <el-option label="在场" value="1"></el-option>
                  <el-option label="离场" value="0"></el-option>
                </el-select>
                <!-- <el-input
                  v-model="presence_situation3"
                  placeholder="请输入在场情况"
                  clearable
                /> -->
              </el-form-item>

              <el-button
                style="margin-left:20px;"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="getpiglist()">查询</el-button>

                <el-button
                  type="primary"
                  size="medium"
                  @click="addDis()"
                  style="margin-left: 20px"
                  icon="el-icon-plus">新增</el-button>
              
            </el-form>
            <el-table :data="listPig" stripe style="width: 100%" border
              :row-style="iRowStyle"
              :cell-style="iCellStyle"
              :header-row-style="iHeaderRowStyle"
              :header-cell-style="iHeaderCellStyle"
              height="430" >
              <el-table-column
                prop="source_label"
                width="120"
                label="耳号"
                align="center"
              />
              <el-table-column
                prop="label_id"
                width="130"
                label="电子耳标号"
                align="center"
              />
              <el-table-column
                prop="breed"
                width="190"
                label="品种"
                align="center"
              />
              <el-table-column
                prop="label_type"
                width="190"
                label="性别"
                align="center"
              >
              <template slot-scope="scope">
                  <p v-if="scope.row.label_type == 0">育肥猪</p>
                  <p v-if="scope.row.label_type == 1">母猪</p>
                  <p v-if="scope.row.label_type == 2">仔猪</p>
                  <p v-if="scope.row.label_type == 3">公猪</p>
                </template>
              </el-table-column>

              <el-table-column
                prop="presenceStatus"
                width="120"
                label="在场情况"
                align="center"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.presenceStatus == '1' || scope.row.presenceStatus == ''">在场</p>
                  <p v-if="scope.row.presenceStatus == '0'">离场</p>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="update_time"
                width="200"
                label="更新时间"
                align="center"
              /> -->
              <el-table-column
                prop="update_time||create_time"
                width="200"
                label="更新时间"
                align="center">
                <template slot-scope="scope">
                  <p v-if="scope.row.update_time">{{scope.row.update_time}}</p>
                  <p v-else>{{scope.row.create_time}}</p>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handlerDisEdit(scope.row.id)">编辑</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handlerDelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="block" style="margin-top: 0px;">
              <el-pagination
                :current-page="currentPig"
                :page-size="limitPig"
                :total="totalPig"
                style="padding: 30px 0; text-align: center"
                layout="total, sizes, prev, pager, next"
                @current-change="getpiglist"
                @size-change="handlePigSizeChange"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="numberType == 4">
        <div class="measure-view_2">
          <div class="measure-view_2_1">
            <el-form :inline="true" class="measure-demo-form-inline">
              <el-form-item label="栋舍" prop="door_name">
                <el-input v-model="door_name" placeholder="请输入栋舍" clearable />
              </el-form-item>

              <el-button
                style="margin-left:20px;"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="getDoorlist()">查询</el-button>

                <el-button
                  type="primary"
                  size="medium"
                  @click="addDoor()"
                  style="margin-left: 20px"
                  icon="el-icon-plus">新增</el-button>
              
            </el-form>
            <el-table :data="listDoor" stripe style="width:100%" border
              :row-style="iRowStyle1"
              :cell-style="iCellStyle1"
              :header-row-style="iHeaderRowStyle1"
              :header-cell-style="iHeaderCellStyle1"
              height="435" >
              <el-table-column
                prop="Sitearea"
                width="160"
                label="场区"
                align="center"
              />
              <el-table-column
                prop="door"
                width="160"
                label="栋舍"
                align="center"
              />
              <el-table-column
                prop="dorm"
                width="300"
                label="栏位"
                align="center"
              />
              <el-table-column
                prop="real_name"
                width="110"
                label="饲养员"
                align="center"
              />
              <el-table-column
                prop="HostName"
                width="160"
                label="耳环工作站"
                align="center"
              />

              <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handlerDoorEdit(scope.row.Siteareaid,scope.row.Sitearea)">新增栋舍</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handlerEdit(scope.row.id,scope.row.Siteareaid,scope.row.Hostid,scope.row.administrators)">编辑</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handlerDelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="block" style="margin-top: 0px">
              <el-pagination
                :current-page="currentDoor"
                :page-size="limitDoor"
                :total="totalDoor"
                style="padding: 30px 0; text-align: center"
                layout="total, sizes, prev, pager, next"
                @current-change="getDoorlist"
                @size-change="handleDoorSizeChange"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="numberType == 5">
        <div class="measure-view_2">
          <div class="measure-view_2_1">
            <el-form :inline="true" class="measure-demo-form-inline2">
              <!-- <el-button
                style="margin-left:0px;"
                type="primary"
                size="medium"
                icon="el-icon-plus"
                @click="add()">增加</el-button> -->
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="'https://monitor.coyotebio-lab.com:8443/wisdomLivestockWH/pig/Newcommon/uploadLabelInfo.hn?pig_farm_id='+userInfo.farm_id+'&userid='+userInfo.userId"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <el-button slot="trigger" type="primary" size="medium" style="margin-left:0px;" icon="el-icon-document-add">导入Excel</el-button>
                </el-upload>
            </el-form>
            <div style="height: 20px;"></div>
            <el-table :data="listLairaging" stripe style="width: 100%;" border
              :row-style="iRowStyle"
              :cell-style="iCellStyle"
              :header-row-style="iHeaderRowStyle"
              :header-cell-style="iHeaderCellStyle"
              height="435" >
              <el-table-column
                prop="source_label"
                width="120"
                label="耳号"
                align="center"
              />
              <el-table-column
                prop="label_id"
                width="120"
                label="电子耳标号"
                align="center"
              />
              <el-table-column
                prop="Sitearea"
                width="180"
                label="场区"
                align="center"
              />
              <el-table-column
                prop="door"
                width="180"
                label="栋舍"
                align="center"
              />
              <el-table-column
                prop="dorm"
                width="180"
                label="栏位"
                align="center"
              />
              <el-table-column
                prop="breed"
                width="120"
                label="品种"
                align="center"
              >
              </el-table-column>

              <el-table-column
                prop="label_type"
                width="80"
                label="性别"
                align="center"
              >
              <template slot-scope="scope">
                  <p v-if="scope.row.label_type == 0">育肥猪</p>
                  <p v-if="scope.row.label_type == 1">母猪</p>
                  <p v-if="scope.row.label_type == 2">仔猪</p>
                  <p v-if="scope.row.label_type == 3">公猪</p>
                </template>
              </el-table-column>

              <el-table-column
                prop="create_time"
                width="170"
                label="入栏时间"
                align="center"
              />
            </el-table>

             <!-- 分页 -->
            <div class="block" style="margin-top: 0px">
              <el-pagination
                :current-page="currentLairaging"
                :page-size="limitLairaging"
                :total="totalLairaging"
                style="padding: 30px 0; text-align: center"
                layout="total, sizes, prev, pager, next"
                @current-change="getLairagingList"
                @size-change="handleLairagingSizeChange"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="numberType == 6">
        <div class="measure-view_2">
            <div class="measure-view_2_1">
                <el-form :inline="true" class="measure-demo-form-inline2">
                    <el-form-item label="时间范围">
                        <el-date-picker
                        v-model="timeJumplist"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width: 260px">
                        </el-date-picker>
                    </el-form-item>

                <el-form-item label="耳号" prop="jump_source_label">
                    <el-input
                    v-model="jump_source_label"
                    placeholder="请输入耳号"
                    clearable
                    />
                </el-form-item>

                <el-button
                    style="margin-left:20px;height:40px;"
                    type="primary"
                    size="medium"
                    icon="el-icon-search"
                    @click="getJumpList()">查询</el-button>

                <!-- <el-button
                    style="margin-left:20px;"
                    type="primary"
                    size="medium"
                    icon="el-icon-plus"
                    @click="add()">增加</el-button> -->
                <el-upload
                  class="upload-demo"
                  ref="upload1"
                  :action="'https://monitor.coyotebio-lab.com:8443/wisdomLivestockWH/PCpigManagement/uploadjumpInfo.hn?pig_farm_id='+userInfo.farm_id+'&userid='+userInfo.userId"
                  :show-file-list="false"
                  :on-success="handleJumpSuccess"
                  :before-upload="beforeJumpUpload">
                  <el-button slot="trigger" type="primary" size="medium" style="margin-left:20px;height:40px;" icon="el-icon-document-add">导入Excel</el-button>
                </el-upload>

                </el-form>
                <el-table :data="listJump" stripe style="width: 100%;" border
                  height="430" >
                    
                <el-table-column
                    prop="source_label"
                    width="140"
                    label="耳号"
                    align="center"
                />
                <el-table-column
                    prop="label_id"
                    width="150"
                    label="电子耳标号"
                    align="center"
                />
                
                <el-table-column
                    prop="Sitearea"
                    width="260"
                    label="转入场区"
                    align="center"
                />
                <el-table-column
                    prop="door"
                    width="200"
                    label="转入栋舍"
                    align="center"
                />

                <el-table-column
                    prop="dorm"
                    width="200"
                    label="转入栏位"
                    align="center"
                />
                <el-table-column
                    prop="create_time"
                    width="200"
                    label="日期"
                    align="center"
                />
                </el-table>

                <!-- 分页 -->
                <div class="block" style="margin-top: 0px;">
                <el-pagination
                    :current-page="currentJump"
                    :page-size="limitJump"
                    :total="totalJump"
                    style="padding: 30px 0; text-align: center"
                    layout="total, sizes, prev, pager, next"
                    @current-change="getJumpList"
                    @size-change="handleJumpSizeChange"
                    :page-sizes="[10, 20, 30, 40]"
                />
                </div>
            </div>
           </div>
      </div>
    </div>

    <!--猪只个体信息 新添/修改弹框 -->
    <el-dialog
      title="新添/修改"
      :visible.sync="showDisDialog"
      width="40%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formDisObj" :rules="rulesDis" :model="formDisObj" label-width="160px">
        <div class="measure-flex-center">
          <el-form-item label="耳号*：" prop="dis_sn">
            <el-input
              v-model="formDisObj.dis_sn"
              style="width: 260px"
              placeholder="请输入耳号"></el-input>
          </el-form-item>

          <el-form-item label="电子耳标：" style="margin-left:0px;" prop="dis_address">
            <el-input
              v-model="formDisObj.dis_address"
              style="width: 260px"
              placeholder="请输入电子耳标"></el-input>
          </el-form-item>
        <!-- </div> -->

        <el-form-item label="性别*：" prop="dis_gender">
          <el-select
            v-model="formDisObj.dis_gender"
            placeholder="请选择性别"
            style="width: 260px">
            <el-option label="母猪" value="1"></el-option>
            <el-option label="公猪" value="3"></el-option>
          </el-select>
        </el-form-item>

        <!-- <div class="device-flex-space"> -->
          <el-form-item label="品种*：" prop="dis_time">
                <el-select
                  v-model="formDisObj.dis_time"
                  filterable
                  clearable
                  placeholder="请选择品种"
                  style="width: 260px"
                >
                <el-option
                  v-for="(item, index) in listBreed"
                  :key="index"
                  :label="item"
                  :value="item"></el-option>
                </el-select>
              </el-form-item>
          

          <!-- <el-form-item label="设备添加时间*：">
            <el-input
              v-model="dis_current_time"
              style="width: 260px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item> -->
        </div>
        <div class="measure-from-footer">
          <el-button @click="resetDisForm('formDisObj')">取消</el-button>
          <el-button type="primary" @click="onDisSubmit('formDisObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog :visible.sync="deleteOzoneDialog" width="30%" center>
      <span>确定要删除该数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteOzoneDialog = false">取 消</el-button>
        <el-button @click="deleteOzoneClick()">确 定</el-button>
      </span>
    </el-dialog>

    <!--栋舍信息管理 新添弹框 -->
    <el-dialog
      title="新添"
      :visible.sync="showDoorDialog"
      width="40%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formDoorObj" :rules="rulesDoor" :model="formDoorObj" label-width="160px">
        <div class="measure-flex-center">
          <el-form-item label="场区名称*：" prop="door_sitearea">
            <el-input
              v-model="formDoorObj.door_sitearea"
              style="width: 260px"
              placeholder="请输入场区名称"
              :readonly="isDoorEdit == 2 ? true: false"></el-input>
          </el-form-item>

          <el-form-item label="栋舍名称*：" prop="door_doorname">
            <el-input
              v-model="formDoorObj.door_doorname"
              style="width: 260px"
              placeholder="请输入栋舍名称"></el-input>
          </el-form-item>
        <!-- </div> -->

        <el-form-item label="饲养员*：" prop="door_userid">
          <el-select
            v-model="formDoorObj.door_userid"
            placeholder="请选择饲养员"
            style="width: 260px">
            <el-option
                  v-for="(item, index) in listEmployees"
                  :key="index"
                  :label="item.real_name"
                  :value="item.id+''"></el-option>
          </el-select>
        </el-form-item>

        <!-- <div class="device-flex-space"> -->
          <el-form-item label="工作站*：" prop="door_hostid">
                <el-select
                  v-model="formDoorObj.door_hostid"
                  filterable
                  clearable
                  placeholder="请选择工作站"
                  style="width: 260px"
                >
                <el-option
                  v-for="(item, index) in listHost"
                  :key="index"
                  :label="item.host_name"
                  :value="item.id+''"></el-option>
                </el-select>
              </el-form-item>
          
          <div class="measure-dorm-view">
            <div class="measure-dorm-top">
              <div class="measure-dorm-top-title">栏位*：</div>
              <div class="measure-dorm-top-button" @click="addDorm()">新增栏位</div>
            </div>

            <div v-for="(item, index) in info.details" :key="index" class="measure-dorm_item">
              <div class="measure-group1 measure-flex-col" style="width:240px;">
                <el-input class="measure-word6" style="width:180px !important;" placeholder="请填写栏位名称" @input="setDorm('dormtitle-'+index, item.dorm_content)" v-model="item.dorm_content" maxlength="10"></el-input>
              </div>
              <div class="measure-group2 measure-flex-col" style="width:120px;">
                <el-input class="measure-txt2" style="width:80px !important;" placeholder="栏号" @input="setDormStart('dormstart-'+index, item.dorm_start)" v-model="item.dorm_start" maxlength="3"></el-input>
              </div>
              <div>—</div>
              <div class="measure-group2 measure-flex-col" style="width:120px;">
                <el-input class="measure-txt2" style="width:80px !important;" placeholder="栏号" @input="setDormEnd('dormend-'+index, item.dorm_end)" v-model="item.dorm_end" maxlength="3"></el-input>
              </div>

              <div class="measure-group2 measure-flex-col" style="background: #FFFFFF;padding-left: 0px;width:50px;flex-direction: row;justify-content: center;display: flex;align-items: center;" @click="delFood(index)">
                <!-- <i class="el-icon-circle-close"></i> -->
                <img src="../../assets/icon_2023_01_06_27.png" class="measure-closeView"/>
              </div>
            </div>

          </div>

          <!-- <el-form-item label="设备添加时间*：">
            <el-input
              v-model="dis_current_time"
              style="width: 260px"
              placeholder=""
              :readonly="true"></el-input>
          </el-form-item> -->
        </div>
        <div class="measure-from-footer">
          <el-button @click="resetDoorForm('formDoorObj')">取消</el-button>
          <el-button type="primary" @click="onDoorSubmit('formDoorObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--栋舍信息管理 编辑弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDoorDialog"
      width="40%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formEditDoorObj" :rules="rulesEditDoor" :model="formEditDoorObj" label-width="160px">
        <div class="measure-flex-center">

        <el-form-item label="饲养员*：" prop="editdoor_userid">
          <el-select
            v-model="formEditDoorObj.editdoor_userid"
            placeholder="请选择饲养员"
            style="width: 260px">
            <el-option
                  v-for="(item, index) in listEmployees"
                  :key="index"
                  :label="item.real_name"
                  :value="item.id+''"></el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="工作站*：" prop="editdoor_hostid">
                <el-select
                  v-model="formEditDoorObj.editdoor_hostid"
                  filterable
                  clearable
                  placeholder="请选择工作站"
                  style="width: 260px"
                >
                <el-option
                  v-for="(item, index) in listHost"
                  :key="index"
                  :label="item.host_name"
                  :value="item.id+''"></el-option>
                </el-select>
              </el-form-item>
        </div>
        <div class="measure-from-footer">
          <el-button @click="resetEditDoorForm('formEditDoorObj')">取消</el-button>
          <el-button type="primary" @click="onEditDoorSubmit('formEditDoorObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import * as echarts from 'echarts';
import {
  getdisplaysum,
  getPigHistorylist,
  getPigSitearea,
  getAllPiggery,
  getStyByPiggery,
  getShowLabelSumfilebyid,
  getLabelTemActInfo,
  getpiglist,
  addPiginfo,
  getBreedlist,
  getPidinfobyid,
  editPiginfo,
  deletePigfile,
  getEmployeesLists,
  getHostList,
  getLairagingList,
  addSitearea,
  getDoorlist,
  deleteDoor,
  editadministrators,
  getJumpList
} from "../../request/api";
import { Message } from "element-ui";
import { stringify } from "qs";
import {
  getTodayLine,
  getPreMonthDay
} from "../../utils/utils";
/**
 * Detail类 构造函数 
 * @param {string} dorm_content 栏位名称
 * @param {string} dorm_start 栏号
 * @param {string} dorm_end 栏号
 */
function Detail(dorm_content, dorm_start, dorm_end) {
  this.dorm_content = dorm_content;
  this.dorm_start = dorm_start;
  this.dorm_end = dorm_end;
}

export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
      listDisplaysum: [],
      labelcount: 0,
      cameracount: 0,
      currentDate: new Date(),

      cun: 0, // 总存栏
      feversum: 0, // 发热
      abnormalsum: 0, // 离线
      source_label2: "", // 耳号
      sitearea2: "", // 场区
      door2: "", // 栋舍
      dorm2: "", //栏位
      status2 : "", // 状态
      current2: 1, //当前页
      limit2: 10, //每页显示记录数
      total2: 0, //总记录数
      listPigHistory: [],
      listPigSitearea: [],
      listAllPiggery: [],
      listStyByPiggery: [],
      logisticsDialog: true,
      pigInfoObj: '',
      timepiglist: [
        new Date().getTime(),
        new Date().getTime(),
      ],
      timeEchartslist: [
        new Date().getTime(),
        new Date().getTime(),
      ],
      temp_date_type: '0', // 0-天 1-周 2-月
      tempDayType: 0, // 1- 前-天 2- 前二天 3- 前三天

      currentLabel: 1, //当前页
      limitLabel: 10, //每页显示记录数
      totalLabel: 0, //总记录数
      listLabelTemActInfo: [],


      chartTempDom: "",
      myChartTemp: "",
      optionTemp: "",
      chartActDom: "",
      myChartAct: "",
      optionAct: "",

      source_label3: "",
      breed3: '',
      presence_situation3: '',
      listBreed: [],
      listPig: [],
      currentPig: 1, //当前页
      limitPig: 10, //每页显示记录数
      totalPig: 0, //总记录数
      showDisDialog: false,
      formDisObj: {
        dis_sn: "",
        dis_address: "",
        dis_gender: '', //（1母猪 3公猪)
        dis_time: "",
      },
      dis_current_time: new Date().getTime(),
      rulesDis: {
        dis_sn: [
          { required: true, message: "请输入耳号", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        dis_address: [
          { required: true, message: "请输入电子耳标", trigger: "blur" },
        ],
        dis_gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        dis_time: [
          { required: true, message: "请选择品种", trigger: "change" },
        ],
      },
      idDis: "", // 员工id
      isDisEdit: 1, // 1-新增  2-编辑

      /**
       *  栋舍信息管理
       */ 
      door_name: '',
      listEmployees: [],
      listHost: [],
      listDoor: [],
      currentDoor: 1, //当前页
      limitDoor: 10, //每页显示记录数
      totalDoor: 0, //总记录数
      showDoorDialog: false,
      formDoorObj: {
        door_sitearea: "",
        door_doorname: "",
        door_userid: '', 
        door_hostid: "",
      },
      rulesDoor: {
        door_sitearea: [
          { required: true, message: "请输入场区名称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        door_doorname: [
          { required: true, message: "请输入栋舍名称", trigger: "blur" },
        ],
        door_userid: [{ required: true, message: "请选择饲养员", trigger: "change" }],
        door_hostid: [
          { required: true, message: "请选择工作站", trigger: "change" },
        ],
      },
      idDoor: "", // id
      isDoorEdit: 1, // 1-新增  2-编辑
      info: {
        details: [{
          dorm_content: '',
          dorm_start: '',
          dorm_end: ''
        }]
      },
      siteareaid: '',

      editDoorDialog: false,
      editDoorId: '',
      editOldHostId: '',
      editSiteareaId: '',
      formEditDoorObj: {
        editdoor_userid: '', 
        editdoor_hostid: "",
      },
      rulesEditDoor: {
        editdoor_userid: [{ required: true, message: "请选择饲养员", trigger: "change" }],
        editdoor_hostid: [
          { required: true, message: "请选择工作站", trigger: "change" },
        ],
      },

      /**
       * 猪只入栏
       */
      currentLairaging: 1, //当前页
      limitLairaging: 10, //每页显示记录数
      totalLairaging: 0, //总记录数
      listLairaging: [],

      /**
       * 猪只转栏
       */
      currentJump: 1, //当前页
      limitJump: 10, //每页显示记录数
      totalJump: 0, //总记录数
      listJump: [],
      jump_source_label: '',
      timeJumplist: [],
      // timeJumplist: [
      //   new Date().getTime(),
      //   new Date().getTime(),
      // ],


      deleteOzoneDialog: false,
      
      numberType: 1, // 1-栋舍设备布局  2-个体健康历史记录  3-猪只个体档案管理 4-栋舍信息管理 5-猪只批量入栏  6-猪只批量转栏
    };
  },
  created() {
  },
  mounted() {
      this.getdisplaysum();
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
    iRowStyle1: function ({ row, rowIndex }) {
      return "height:35px";
    },
    iHeaderRowStyle1: function ({ row, rowIndex }) {
      return "height:46px";
    },
    iCellStyle1: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:6px";
    },
    iHeaderCellStyle1: function ({ row, column, rowIndex, columnIndex }) {
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
    /**
     * 栋舍设备布局
     */
    getdisplaysum() {
      getdisplaysum({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.listDisplaysum = res.data.data;
          this.labelcount = res.data.labelcount;
          this.cameracount = res.data.cameracount;
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
     * 猪只个体档案管理
     */
    getPigSitearea() {
      getPigSitearea({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.listPigSitearea = res.data.msg;
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
    handlerChangeSitearea(){
      this.getAllPiggery();
    },
    getAllPiggery() {
      getAllPiggery({
        pig_farm_id: this.userInfo.farm_id,
        id: this.sitearea2
      }).then((res) => {
        if (res.data.success) {
          this.listAllPiggery = res.data.msg;
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
    // handlerChangeDoor(){
    //   this.getStyByPiggery();
    // },
    // getStyByPiggery() {
    //   getStyByPiggery({
    //     pig_farm_id: this.userInfo.farm_id,
    //     doorid: this.door2
    //   }).then((res) => {
    //     if (res.data.success) {
    //       this.listStyByPiggery = res.data.msg;
    //     } else {
    //       Message({
    //         type: "warning",
    //         message: res.data.msg,
    //         showClose: true,
    //         duration: 3000,
    //       });
    //     }
    //   });
    // },
    getPigHistorylist(page = 1) {
      this.current2 = page;
      getPigHistorylist({
        pig_farm_id: this.userInfo.farm_id,
        page: this.current2,
        limit: this.limit2,
        source_label: this.source_label2,
        Sitearea: this.sitearea2,
        door: this.door2,
        dorm: this.dorm2,
        status: this.status2
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listPigHistory = res.data.data;
          this.total2 = parseInt(res.data.count);
          this.cun = res.data.labelsum; // 总存栏
          this.feversum = res.data.feversum;// 发热
          this.abnormalsum = res.data.outlinesum;// 离线
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
    handlePigHistorySizeChange(val){
      this.limit2 = val;
      this.getPigHistorylist();
    },
    logisticsClick(item) {
      this.logisticsDialog = false;
      this.pigInfoObj = item;
      this.timepiglist = [
        new Date().getTime(),
        new Date().getTime(),
      ];
      this.timeEchartslist = [
        new Date().getTime(),
        new Date().getTime(),
      ];
      this.temp_date_type = '0'; // 0-天 1-周 2-月
      this.tempDayType = 0; // 1- 前-天 2- 前二天 3- 前三天

      this.getLabelTemActInfo();
      
      this.$nextTick(() => {
        this.chartTempDom = document.getElementById("echarttemp");
        this.myChartTemp = echarts.init(this.chartTempDom);

        this.chartActDom = document.getElementById("echartact");
        this.myChartAct = echarts.init(this.chartActDom);

        this.getShowLabelSumfilebyid();
      });
    },
    handlerTempDateType(number){
      this.temp_date_type = number + '';
      this.tempDayType = 0; // 1- 前-天 2- 前二天 3- 前三天
      if(number == '0'){
        this.timeEchartslist = [
          new Date().getTime(),
          new Date().getTime(),
        ];
        this.getShowLabelSumfilebyid();
      } else if(number == '1'){
        this.timeEchartslist = [
          (new Date().getTime()- 3600 * 1000 * 24 * 6),
          new Date().getTime(),
        ];
        this.getShowLabelSumfilebyid();
      } else if(number == '2'){
        let month = getPreMonthDay(getTodayLine(new Date()),5);
        this.timeEchartslist = [
          month,
          new Date().getTime(),
        ];
        this.getShowLabelSumfilebyid();
      }
    },
    handlerTempDayType(number){
      this.tempDayType = number;
      if(number == 1){
        this.timeEchartslist = [
          (new Date().getTime()- 3600 * 1000 * 24 * 1),
          new Date().getTime(),
        ];
        this.getShowLabelSumfilebyid();
      } else if(number == 2){
        this.timeEchartslist = [
          (new Date().getTime()- 3600 * 1000 * 24 * 2),
          new Date().getTime(),
        ];
        this.getShowLabelSumfilebyid();
      } else if(number == 3){
        this.timeEchartslist = [
          (new Date().getTime()- 3600 * 1000 * 24 * 3),
          new Date().getTime(),
        ];
        this.getShowLabelSumfilebyid();
      }
    },
    getShowLabelSumfilebyid() {
      let that = this;
      getShowLabelSumfilebyid({
        pig_farm_id: this.userInfo.farm_id,
        serial: this.pigInfoObj.serial,
        start_time: (this.timeEchartslist != null && this.timeEchartslist.length > 0) ? this.dateFormat(this.timeEchartslist[0]) : '',
        end_time: (this.timeEchartslist != null && this.timeEchartslist.length > 0) ? this.dateFormat(this.timeEchartslist[1]) : '',
        // start_time: '2023-03-21',
        // end_time: '2023-03-27',
        type: this.temp_date_type == '2' ? 'month' : 'day' //(day是天 month是月)
      }).then((res) => {
        if (res.data.success) {
          var xdata = res.data.xdata
          var ydata = []
          var series = res.data.ydata || []
          let seriesTemp = [];
                    let seriesAct = [];
                    let allSeriesTemp = [];

                    let dataSeriesTemp = [];

                    let colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272','#fc8452']
                    
                    if(that.temp_date_type == '2'){
                        for(let i = 0; i < series.length; i++){
                            let name = series[i].date;
                            let moth = name.substring(5,7);

                            let check_in_time_2 = that.pigInfoObj.check_in_time.substring(0,7);
                            let check_time_2 = that.pigInfoObj.check_in_time.substring(8,10);

                            let listItem = series[i].temp;
                            // let str = listItem.toString().replaceAll("0",null);
                            // str = str.split(",");
                            for(let j = 0; j < listItem.length; j++){
                                if(listItem[j] > 0){

                                } else {
                                    // listItem[j] = null;
                                    let oDate1 = new Date(name); // 日期 
                                    let oDate2 = new Date(check_in_time_2);  // 入栏日期
                                    if (oDate1.getTime() > oDate2.getTime()){
                                        listItem[j] = null;
                                    } else if (oDate1.getTime() == oDate2.getTime()){
                                        if (j < check_time_2){
                                            listItem[j] = '-';
                                        } else {
                                            listItem[j] = null;
                                        }
                                    } else {
                                        listItem[j] = '-';
                                    }
                                }
                            }

                            let str = listItem;
                            str = that.processing_breakpoint_data(str, 'temp')

                            // str = that.processing_breakpoint_data1(str, 'temp')

                            let color = colorList[series.length-1-i];

                            let objTemp = {
                                name: moth+'月温度',
                                smooth: true,
                                type: "line",
                                data: str,
                                color: color
                            }
                            seriesTemp.push(objTemp)

                            allSeriesTemp = allSeriesTemp.concat(listItem);

                            for(let i in allSeriesTemp){
                                if(allSeriesTemp[i] > 0){
                                    dataSeriesTemp.push(allSeriesTemp[i])
                                }
                            }
    
                            let objAct = {
                                name: moth+'月活动量',
                                smooth: true,
                                type: "line",
                                data: series[i].act,
                                color: color
                            }
                            seriesAct.push(objAct)
                        }
                    }else{
                        for(let i = 0; i < series.length; i++){
                            let name = series[i].date;
                            let moth = name.substring(5,7);
                            let date = name.substring(8,10);

                            let check_in_time = that.pigInfoObj.check_in_time.substring(0,10);
                            let check_time = that.pigInfoObj.check_in_time.substring(11,13);

                            let listItem = series[i].temp;
                            // let str = listItem.toString().replaceAll("0",null);
                            // str = str.split(",");
                            for(let j = 0; j < listItem.length; j++){
                                if(listItem[j] > 0){
                            
                                } else {
                                    // listItem[j] = null;
                                    let oDate1 = new Date(name); // 日期 
                                    let oDate2 = new Date(check_in_time);  // 入栏日期
                                    if (oDate1.getTime() > oDate2.getTime()){
                                        listItem[j] = null;
                                    } else if (oDate1.getTime() == oDate2.getTime()){
                                        if (j < check_time){
                                            listItem[j] = '-';
                                        } else {
                                            listItem[j] = null;
                                        }
                                    } else {
                                        listItem[j] = '-';
                                    }
                                }
                            }

                            let str = listItem;
                            str = that.processing_breakpoint_data(str, 'temp')

                            // str = that.processing_breakpoint_data1(str, 'temp')

                            let color = colorList[series.length-1-i];
                           
                            let objTemp = {
                                name: moth+"/"+date+'温度',
                                smooth: true,
                                type: "line",
                                data: str,
                                color: color
                            }
                            seriesTemp.push(objTemp)

                            allSeriesTemp = allSeriesTemp.concat(listItem);

                            
                            for(let i in allSeriesTemp){
                                if(allSeriesTemp[i] > 0){
                                    dataSeriesTemp.push(allSeriesTemp[i])
                                }
                            }

                            let objAct = {
                                name: moth+"/"+date+'活动量',
                                smooth: true,
                                type: "line",
                                data: series[i].act,
                                color: color
                            }
                            seriesAct.push(objAct)
                        }
                    }
                    var axisLabel = { //设置x轴的字
                        show: true,
                        interval: 2,
                        rotate: 40,
                        // fontSize: 24
                    }

                    if(that.temp_date_type == '2'){

                    }else{
                        // xdata = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
                        //     '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
                        //     '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
                        //     '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
                        // ]
                        xdata = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
                            '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                            '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
                            '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
                        ]
                    }
                    that.chartInitTemp(xdata, ydata, axisLabel, seriesTemp,dataSeriesTemp);

                    that.chartInitAct(xdata, ydata, axisLabel, seriesAct)

               
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
    // 开始画图
    chartInitTemp: function (xdata, ydata, axisLabel, series,allSeriesTemp) {
        let minSeriesTemp = Math.min(...allSeriesTemp);
        let maxSeriesTemp = Math.max(...allSeriesTemp);
        var option = {
            title: {
              // text: "成功/失败",
              // fontSize: 12
              show: false
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
            grid: {
                containLabel: true,
                top: 60,
                bottom: 20
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: xdata,
                axisLabel: axisLabel,
                alignWithLabel: true
            },
            yAxis: {
                // name:'温度',
                name: '',
                x: 'center',
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                // axisLabel:{
                //     fontSize: 24
                // },
                minInterval: 1,
                min: minSeriesTemp,
                max: maxSeriesTemp
                // show: true
            },
            series: series
        };
        this.myChartTemp.setOption(option);
    },
    // 开始画图
    chartInitAct: function (xdata, ydata, axisLabel, series) {
        var my_y_axisLabel = {
            show: true,
            formatter: function (value) {
                var info = ""
                if (value == 0) {
                    info = "0";
                } else if (value == 1) {
                    info = "低";
                } else if (value == 2) {
                    info = "中";
                } else if (value == 3) {
                    info = "高";
                } else {
                    info = "未知";
                }
                return info
                //return value.toFixed(0);
            }
        }

        var optionAct = {
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
            grid: {
                containLabel: true,
                top: 60,
                bottom: 20
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: xdata,
                axisLabel: axisLabel,
                alignWithLabel: true
            },
            yAxis: {
                // name:'活动量',
                name:'',
                x: 'center',
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                min: 0,
                max: 3,
                minInterval: 1,
                axisLabel: my_y_axisLabel
                // show: true
            },
            series: series
        };
        this.myChartAct.setOption(optionAct);
    },
    processing_breakpoint_data: function (ydata, lineType) {
        let beforeVal = null; // 前一个值
        let afterVal = null; // 后一个值
        let needVal = []; //需要补充的值
        for (let i = 0; i < ydata.length; i++) {
            let val = ydata[i];
            if (val == null || val == "null") { // 点为空
                needVal.push(i); // 将空点保存
            } else {
                if (needVal.length == 0) { // 不存在空数据，记录最新点
                    beforeVal = val;
                } else { // 存在空数据
                    afterVal = val;
                    // 处理空点数据
                    if (lineType == 'temp') {
                        // let average = (afterVal + beforeVal) / 2;
                        // average = average.toFixed(2);
                        let average = afterVal;
                        for (let a in needVal) {
                            let index = needVal[a];
                            ydata[index] = average;
                        }
                    } else if (lineType == 'act') {
                        for (let a in needVal) {
                            let index = needVal[a];
                            ydata[index] = 0; // 无活跃度
                        }
                    }
                    needVal = [];
                }
            }
        }
        return ydata
    },
    handlerReturn(){
        this.logisticsDialog = true;
        this.pigInfoObj = '';
    },
    //导出数据
    exportPigHistoryData() {
      let params = {
        pig_farm_id: this.userInfo.farm_id,
        page: this.current2,
        limit: this.limit2,
        source_label: this.source_label2,
        Sitearea: this.sitearea2,
        door: this.door2,
        dorm: this.dorm2,
        status: this.status2
      };
      window.open(
        `https://monitor.coyotebio-lab.com:8443/wisdomLivestockWH/PCpigManagement/ExportPigHistoryList.hn?${stringify(
          params
        )}`
      );

      // this.formObj.real_name = "";
      // this.formObj.job_number = "";
      // this.formObj.phone = "";
      // this.formObj.roleId = "";
      // this.formObj.gender = "";
      // this.formObj.fileUrl = "";
      // this.id = "";
      // this.userstatus = "";
    },
    // 获取个体详情
    getLabelTemActInfo(page = 1) {
      this.currentLabel = page;
      getLabelTemActInfo({
        start_time: (this.timepiglist != null && this.timepiglist.length > 0) ? this.dateFormat(this.timepiglist[0]) : '',
        end_time: (this.timepiglist != null && this.timepiglist.length > 0) ? this.dateFormat(this.timepiglist[1]) : '',
        page: this.currentLabel,
        limit: this.limitLabel,
        serial: this.pigInfoObj.serial,
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listLabelTemActInfo = res.data.data;
          this.totalLabel = parseInt(res.data.count);
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
    handleLabelSizeChange(val){
      this.limitLabel = val;
      this.getLabelTemActInfo();
    },
    // 获取个体详情导出
    exportPigDetailsData() {
      let params = {
        start_time: (this.timepiglist != null && this.timepiglist.length > 0) ? this.dateFormat(this.timepiglist[0]) : '',
        end_time: (this.timepiglist != null && this.timepiglist.length > 0) ? this.dateFormat(this.timepiglist[1]) : '',
        serial: this.pigInfoObj.serial,
      };
      window.open(
        `https://monitor.coyotebio-lab.com:8443/wisdomLivestockWH/PCpigManagement/ExportLabelInfo.hn?${stringify(
          params
        )}`
      );
    },
    /**
     * 猪只个体档案管理
     */
    getBreedlist() {
      getBreedlist({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listBreed = res.data.data;
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
    getpiglist(page = 1) {
      this.currentPig = page;
      getpiglist({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentPig,
        limit: this.limitPig,
        source_label: this.source_label3,
        breed: this.breed3,
        presenceStatus: this.presence_situation3 //（1在场 0离场）
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listPig = res.data.data;
          this.totalPig = parseInt(res.data.count);
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
    handlePigSizeChange(val){
      this.limitPig = val;
      this.getpiglist();
    },
    addDis() {
      this.isDisEdit = 1;
      this.dis_current_time = this.dateFormat(new Date().getTime());
      this.showDisDialog = true;
    },
    handlerDisEdit(id) {
      this.isDisEdit = 2;
      this.dis_current_time = this.dateFormat(new Date().getTime());
      getPidinfobyid({
        id: id,
        // pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.showDisDialog = true;

          let infoList = res.data.data;
          if (infoList && infoList.length > 0) {
            let itemInfo = infoList[0];
            this.formDisObj.dis_sn = itemInfo.source_label;
            this.formDisObj.dis_address = itemInfo.label_id;
            this.formDisObj.dis_gender = itemInfo.label_type == 3 ? '公猪' : '母猪';
            this.formDisObj.dis_time = itemInfo.breed;
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
              source_label: this.formDisObj.dis_sn,
              label_id: this.formDisObj.dis_address,
              type: this.formDisObj.dis_gender == '母猪' ? '1' : '3',// 1-母猪   3-公猪
              breed: this.formDisObj.dis_time,
              create_time: this.dis_current_time
            };

            editPiginfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getpiglist();

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
              source_label: this.formDisObj.dis_sn,
              label_id: this.formDisObj.dis_address,
              type: this.formDisObj.dis_gender == '母猪' ? '1' : '3',// 1-母猪   3-公猪
              breed: this.formDisObj.dis_time,
              create_time: this.dis_current_time
            };
      

            addPiginfo(params).then((res) => {
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.current = 1;
                this.getpiglist();

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
    /**
     * 栋舍信息管理
     */
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
    getHostList() {
      getHostList({
        pig_farm_id: this.userInfo.farm_id,
      }).then((res) => {
        if (res.data.success) {
          this.listHost = res.data.data;
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
    addDorm() {
      let info = this.info;
      info.details.push(new Detail('', '', ''));
      this.info = info;
    },
    setDorm(e,value) {
      let index = parseInt(e.replace("dormtitle-", ""));
      let dorm_content = value;
      let info = this.info;
      info.details[index].dorm_content = dorm_content;
      this.info = info;
    },
    setDormStart(e,value) {
      let index = parseInt(e.replace("dormstart-", ""));
      let dorm_start = value;
      let info = this.info;
      info.details[index].dorm_start = dorm_start;
      this.info = info;
    },
    setDormEnd(e,value) {
      let index = parseInt(e.replace("dormend-", ""));
      let dorm_end = value;
      let info = this.info;
      info.details[index].dorm_end = dorm_end;
      this.info = info;
    },
    delFood(index) {
      let closeIndex = index;
      let that = this;
      let info = that.info;
      if (info && info.details && info.details.length == 1) {
        info.details[0].dorm_content = '';
        info.details[0].dorm_start = '';
        info.details[0].dorm_end = '';
        this.info = info;
      } else {
        if (closeIndex != -1) {
          let index = closeIndex;
          let info = that.info;
          info.details.splice(index, 1);
          this.info = info;
        }
      }
    },
    getDoorlist(page = 1) {
      this.currentDoor = page;
      getDoorlist({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentDoor,
        limit: this.limitDoor,
        door: this.door_name,
      }).then((res) => {
        if (res.data.success) {
          // Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })
          this.listDoor = res.data.data;
          this.totalDoor = parseInt(res.data.count);
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
    handleDoorSizeChange(val){
      this.limitDoor = val;
      this.getDoorlist();
    },
    addDoor() {
      this.isDoorEdit = 1;
      this.showDoorDialog = true;
    },
    handlerDoorEdit(siteareaid, sitearea) {
      this.isDoorEdit = 2;
      this.showDoorDialog = true;
      this.formDoorObj.door_sitearea = sitearea;
      this.siteareaid = siteareaid;
      
    },
    resetDoorForm(formName) {
      this.$refs[formName].resetFields();
      this.showDoorDialog = false;
      this.formDoorObj.door_sitearea = "";
      this.formDoorObj.door_doorname = "";
      this.formDoorObj.door_userid = "";
      this.formDoorObj.door_hostid = "";
      this.info.details = [{
        dorm_content: '',
        dorm_start: '',
        dorm_end: ''
      }]
      this.idDoor = "";
      this.siteareaid = "";
    },
    onDoorSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
            let doorDormList = this.info.details
            if (doorDormList.length == 1 && doorDormList[0].dorm_content == "" && doorDormList[0].dorm_start == "" && doorDormList[0].dorm_end == "") {
              Message({
                type: "warning",
                message: "请填写栏位信息",
                showClose: true,
                duration: 3000,
              });
              return;
            }
            for (let i = 0; i < doorDormList.length; i++) { //删除双空白项
              if (doorDormList[i].dorm_content == '' && doorDormList[i].dorm_start == '') {
                doorDormList.splice(i, 1);
                i--;
              }
            }

            for (let i in doorDormList) {
              if (doorDormList[i].dorm_content == '' && doorDormList[i].dorm_start != '' || doorDormList[i].dorm_content != '' && doorDormList[i].dorm_start == '') {
                Message({
                  type: "warning",
                  message: "请填写栏位信息",
                  showClose: true,
                  duration: 3000,
                });
                return;
              }
              if (doorDormList[i].dorm_end == '') {
                Message({
                  type: "warning",
                  message: "请填写栏位信息",
                  showClose: true,
                  duration: 3000,
                });
                return;
              }
            }

            let dormList = []
            for (let i in doorDormList) {
              let number1 = parseInt(doorDormList[i].dorm_start);
              let number2 = parseInt(doorDormList[i].dorm_end);

              if (number1 > 0 && number2 > 0 && number1 <= number2  ) {
                for (let j = number1; j <= number2; j++) {
                  dormList.push(doorDormList[i].dorm_content + j + '')
                }
              } else {
                Message({
                  type: "warning",
                  message: "栏号填写错误,请重新填写!",
                  showClose: true,
                  duration: 3000,
                });
                return;
              }
            }
            let dormList1 = [...new Set(dormList)]

            let params = {
              pig_farm_id: this.userInfo.farm_id,
              // Sitearea: this.formDoorObj.door_sitearea,
              door: this.formDoorObj.door_doorname,
              userId: this.formDoorObj.door_userid,
              hostid: this.formDoorObj.door_hostid,
              dorm: dormList1.join(','),
              // type: '1',
            }

            if (this.isDoorEdit == 2) {
              params.type = '2';
              params.Sitearea = this.siteareaid;
            }else{
              params.type = '1';
              params.Sitearea = this.formDoorObj.door_sitearea
            }

            axios({
              method: 'post',
              url: "https://monitor.coyotebio-lab.com:8443/wisdomLivestockWH/PCPigstyManagement/addSitearea.hn",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              data: params,
            }).then((res)=>{
              if (res.data.success) {
                Message({
                  type: "success",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
                // this.currentDoor = 1;
                this.getDoorlist();

                this.$refs[formName].resetFields();
                this.showDoorDialog = false;
                this.formDoorObj.door_sitearea = "";
                this.formDoorObj.door_doorname = "";
                this.formDoorObj.door_userid = "";
                this.formDoorObj.door_hostid = "";
                this.info.details = [{
                  dorm_content: '',
                  dorm_start: '',
                  dorm_end: ''
                }]
                
                this.idDoor = "";
                this.siteareaid = "";
              } else {
                Message({
                  type: "warning",
                  message: res.data.msg,
                  showClose: true,
                  duration: 3000,
                });
              }
            })
          
        } else {
          return false;
        }
      });
    },
    handlerEdit(editDoorId,editSiteareaId,editHostId,administrators){
      this.editDoorId = editDoorId;
      this.editSiteareaId = editSiteareaId;
      this.editOldHostId = editHostId;
      this.formEditDoorObj.editdoor_hostid = editHostId;
      this.formEditDoorObj.editdoor_userid = administrators;
      this.editDoorDialog = true;
    },
    resetEditDoorForm(formName) {
      this.$refs[formName].resetFields();
      this.editDoorDialog = false;
      this.editDoorId = "";
      this.editSiteareaId = "";
      this.editOldHostId = "";
      this.formEditDoorObj.editdoor_hostid = "";
      this.formEditDoorObj.editdoor_userid = "";
    },
    onEditDoorSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editadministrators({
            pig_farm_id: this.userInfo.farm_id,
            door:  this.editDoorId, //（栋舍id）
            HostId: this.formEditDoorObj.editdoor_hostid,
            HostIdOld: this.editOldHostId,
            Sitearea: this.editSiteareaId,
            userId: this.formEditDoorObj.editdoor_userid,
          }).then((res) => {
            if (res.data.success) {
              Message({ type: 'success', message: res.data.msg, showClose: true, duration: 3000 })

              this.getDoorlist();

              this.editDoorDialog = false;
              this.editDoorId = "";
              this.editSiteareaId = "";
              this.editOldHostId = "";
              this.formEditDoorObj.editdoor_hostid = "";
              this.formEditDoorObj.editdoor_userid = "";

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
          return false;
        }
      });
    },
    /**
     * 猪只批量入栏
     */
    handleAvatarSuccess(res) {
      console.log(res)
      if (res.success) {
        console.log(res)
        Message({ type: 'success', message: res.msg, showClose: true, duration: 3000 });
        this.currentLairaging = 1;
        this.getLairagingList();
      }else{
        window.open(res.excelurl);
      }
    },
    beforeAvatarUpload() {
      
    },
    getLairagingList(page = 1) {
      this.currentLairaging = page;
      getLairagingList({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentLairaging,
        limit: this.limitLairaging,
      }).then((res) => {
        if (res.data.success) {
          this.listLairaging = res.data.data;
          this.totalLairaging = parseInt(res.data.count);
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
    handleLairagingSizeChange(val){
      this.limitLairaging = val;
      this.getLairagingList();
    },
    /**
     * 猪只批量转栏
     */
    handleJumpSuccess(res) {
      console.log(res)
      if (res.success) {
        console.log(res)
        Message({ type: 'success', message: res.msg, showClose: true, duration: 3000 });
        this.currentJump = 1;
        this.getJumpList();
      }else{
        window.open(res.excelurl);
      }
    },
    beforeJumpUpload() {
      
    },
    getJumpList(page = 1) {
      this.currentJump = page;
      getJumpList({
        pig_farm_id: this.userInfo.farm_id,
        page: this.currentJump,
        limit: this.limitJump,
        start_time: (this.timeJumplist != null && this.timeJumplist.length > 0) ? this.dateFormat(this.timeJumplist[0]) : '',
        end_time: (this.timeJumplist != null && this.timeJumplist.length > 0) ? this.dateFormat(this.timeJumplist[1]) : '',
        source_label: this.jump_source_label
      }).then((res) => {
        if (res.data.success) {
          this.listJump = res.data.data;
          this.totalJump = parseInt(res.data.count);
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
    handleJumpSizeChange(val){
      this.limitJump = val;
      this.getJumpList();
    },

    /**
     * 删除
     */
    handlerDelete(id) {
      if(this.numberType == 3){
        this.deleteOzoneDialog = true;
        this.idDis = id;
      } else if(this.numberType == 4){
        this.deleteOzoneDialog = true;
        this.idDoor = id;
      }
    },
    deleteOzoneClick() {
      if(this.numberType == 3){
        if (this.idDis) {
          deletePigfile({
            id: this.idDis,
            userid: this.userInfo.userId,
            pig_farm_id: this.userInfo.farm_id
          }).then((res) => {
            if (res.data.success) {
              Message({
                type: "success",
                message: res.data.msg,
                showClose: true,
                duration: 3000,
              });

              // this.limitPig = 10;
              // this.currentPig = 1;
              // this.resetOzoneForm('formDisObj');
              this.deleteOzoneDialog = false;
              this.getpiglist();
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
      } else if(this.numberType == 4){
        deleteDoor({
            door: this.idDoor,
            pig_farm_id: this.userInfo.farm_id
          }).then((res) => {
            if (res.data.success) {
              Message({
                type: "success",
                message: res.data.msg,
                showClose: true,
                duration: 3000,
              });

              // this.limitDoor = 10;
              // this.currentDoor = 1;
              // this.resetOzoneForm('formDoorObj');
              this.deleteOzoneDialog = false;
              this.getDoorlist();
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
    /**
     * 其他
     */
    handlerClick(e){
      alert(e)
    },
    handleClick(number) {
      this.numberType = number;
      if(number == 6){
        this.timeJumplist = [];
        this.currentJump = 1;
        this.limitJump = 10;
        this.getJumpList();
      } else if(number == 5){
        this.currentLairaging = 1;
        this.limitLairaging = 10;
        this.getLairagingList();
      } else if(number == 4){
        this.limitDoor = 10;
        this.currentDoor = 1;
        this.getEmployeesLists();
        this.getHostList();
        this.getDoorlist();
      } else if(number == 3){
        this.limitPig = 10;
        this.currentPig = 1;
        this.getpiglist();
        this.getBreedlist();
      } else if (number == 2){
        this.limit2 = 10;
        this.current2 = 1;
        this.logisticsDialog = true;
        this.getPigHistorylist();
        this.getPigSitearea();
        this.getAllPiggery();
        // this.getStyByPiggery();
      } else {
        this.getdisplaysum();
      }
    },
  },
};
</script>

<style>
.el-tabs__item {
  font-size: 18px !important;
}

.measure-index-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

.measure-container-left {
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  position: fixed;
  height: 600px;
}

.measure-container-right {
  width: 1160px;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  flex-direction: column;
  padding: 0px 20px;
  margin-left: 200px;
  height: 600px;
  /* height: 800px; */
  /* overflow-y: scroll; */
}

.measure-pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.measure-demo-form-inline {
  margin-top: 20px;
}

.measure-img{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0px;
}
.measure-click_view{
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

.measure-click_view_activity{
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


.measure-flex-device {
  display: flex;
  align-items: center;
  justify-content: center;
}

.measure-top-view{
  display: flex;
  align-items: center;
    width: 100%;
    padding: 15px 0px;
    border-bottom: 1px solid #EEEEEE;
    margin-bottom: 20px;
}

.measure-title{
  
}

.measure-flex-space {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}

.measure-flex-center{
  display: flex;
  /* align-items: center; */
  margin-left: 40px;
  justify-content: center;
  flex-direction: column;
}

.measure-from-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.measure-div_view {
  overflow-y: scroll;
  height: 500px;
}


.measure-view_1 {
  /* width: 1200px; */
}

.measure-box-col {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.measure-box-card {
  width: 240px;
}

.measure-time {
  font-size: 13px;
  color: #999;
}

.measure-bottom {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  padding: 0px 15px;
}

.measure-button {
  padding: 0;
  float: right;
}

.measure-image_view {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin-top: 0px;
  /* border-radius: 100%; */
  background: #FFFFFF;
  padding: 0px 15px;
}
.measure-image {
      width: 30px;
    height: 30px;
    display: block;
    /* border-radius: 100%; */
    margin-right: 10px;
}

.measure-icon-image{
      width: 40px;
    height: 40px;
    display: block;
    margin-right: 10px;
}

.measure-item_view {
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
  /* width: 42%; */
  padding: 0px 0px;
}

.measure-item_view_1 {
  font-size: 12px;
  color: #606266;
}

.measure-item_view_2 {
  margin-top: 0px;
  font-size: 18px;
}

.measure-clearfix:before,
.measure-clearfix:after {
  display: table;
  content: "";
}

.measure-clearfix:after {
  clear: both;
}

.measure-name_span {
  margin-top: 20px;
  height: 40px;
  background: #F5FAFF;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  color: #606266;
}

.measure-total_view {
  margin-bottom: 20px;
  margin-left: 20px;
}


.measure-view_2 {
  /* width: 1200px; */
  overflow-y: scroll;
  height: 600px;
}

.measure-view_2_1{
    margin-left: 0px;
}

.measure-demo-form-inline2{
    margin-top: 20px;
    display: flex;
}

.measure-view_2_top {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 1150px;
}

.measure-view_2_top_1 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}

.measure-view_2_top_1_1 {
  font-size: 20px;
}

.measure-view_2_top_1_2 {
  margin-top: 10px;
  font-size: 16px;
}


.measure-echarts_view{
    margin-top: 10px;
}

.measure-echarts_view_top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}

.measure-echarts_view_l{
    display: flex;
    flex-direction: column;
}

.measure-echarts_view_title{
    font-size: 18px;
}

.measure-echarts_view_center{

}

.measure-box-card-center{
  display: flex;
  align-items: center;
  
}

.measure-box-card-line{
  height: 30px;
    width: 1px;
    margin: 0px 20px;
    background: darkgray;
}

.measure-date-view{
  display: flex;
  align-items: center;
}

.measure-date-view-click{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
  margin-top: 0px; 
  margin-left: 20px;
  font-size: 14px;
  border-radius: 10px;
}

.measure-date-view-click-activity{
  color: #409EFF;
  /* background-color: #409EFF; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  border: 1px solid #409EFF;
  margin-top: 0px; 
  margin-left: 20px;
  font-size: 14px;
  border-radius: 10px;
}

.measure-flex-center{
  display: flex;
  /* align-items: center; */
  margin-left: 40px;
  justify-content: center;
  flex-direction: column;
}

.measure-from-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.measure-dorm-view{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.measure-dorm-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.measure-dorm-top-title{
  width: 160px;
  /* text-align: right; */
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
}

.measure-dorm-top-button{
  display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #58A4FD;
    border: 1px solid #58A4FD;
    border-radius: 30px;
    margin-left: 160px;
    height: 22px;
    padding: 6px 20px;
}

.measure-dorm_item{
  width: 480px;
  height: 40px;
  justify-content: space-between;
  margin: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.measure-group1 {
  height: 40px;
  border-radius: 12px;
  width: 200px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
}
.measure-flex-col {
  display: flex;
  flex-direction: column;
}

.measure-word6 {
  width: 180px;
  height: 40px;
  display: block;
  overflow-wrap: break-word;
  color:black;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  white-space: nowrap;
  text-align: left;
}

.measure-group2 {
  height: 40px;
  border-radius: 12px;
  width: 120px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
}

.measure-txt2 {
  width: 100px;
  height: 40px;
  display: block;
  overflow-wrap: break-word;
  color: black;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  white-space: nowrap;
  text-align: left;
}

.measure-closeView{
  width: 20px;
  height: 20px;
}

</style>