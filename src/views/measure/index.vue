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
              <el-form-item label="栋舍" prop="door">
                <el-input v-model="door" placeholder="请输入栋舍" clearable />
              </el-form-item>

              <el-button
                style="margin-left:20px;"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="getList()">查询</el-button>
              
            </el-form>
            <el-table :data="list" stripe style="width: 1140px;" border>
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
                prop="farm_name"
                width="200"
                label="饲养员"
                align="center"
              />
              <el-table-column
                prop="farm_name"
                width="200"
                label="耳环工作站"
                align="center"
              />

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

            <!-- 分页 -->
            <div class="block" style="margin-top: 15px">
              <el-pagination
                :current-page="current"
                :page-size="limit"
                :total="total"
                style="padding: 30px 0; text-align: center"
                layout="total, sizes, prev, pager, next"
                @current-change="getList"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="numberType == 5">
        <div class="measure-view_2">
          <div class="measure-view_2_1">
            <el-form :inline="true" class="measure-demo-form-inline">
              <el-button
                style="margin-left:0px;"
                type="primary"
                size="medium"
                icon="el-icon-plus"
                @click="add()">增加</el-button>
              <el-button type="primary" size="medium" @click="importData()" style="margin-left:20px;" icon="el-icon-document-add">导入Excel</el-button>
            </el-form>
            <div style="height: 30px;"></div>
            <el-table :data="list" stripe style="width: 1160px;" border>
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
                prop="status"
                width="120"
                label="品种"
                align="center"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.status == '1'">大白</p>
                  <p v-if="scope.row.status == '4'">小白</p>
                  <p v-if="scope.row.status == '2'">杜洛克</p>
                  <p v-if="scope.row.status == '3'">长白山</p>
                </template>
              </el-table-column>

              <el-table-column
                prop="door"
                width="80"
                label="性别"
                align="center"
              />
              <el-table-column
                prop="check_in_time"
                width="180"
                label="入栏时间"
                align="center"
              />
            </el-table>

             <!-- 分页 -->
            <div class="block" style="margin-top: 15px">
              <el-pagination
                :current-page="current"
                :page-size="limit"
                :total="total"
                style="padding: 30px 0; text-align: center"
                layout="total, sizes, prev, pager, next"
                @current-change="getList"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 40]"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="numberType == 6">
        <div class="measure-view_2">
            <div class="measure-view_2_1">
                <el-form :inline="true" class="measure-demo-form-inline">
                    <el-form-item label="时间范围">
                        <el-date-picker
                        v-model="timelist"
                        type="datetimerange"
                        @change="consoledata()"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>

                <el-form-item label="耳号" prop="source_label">
                    <el-input
                    v-model="source_label"
                    placeholder="请输入耳号"
                    clearable
                    />
                </el-form-item>

                <el-button
                    style="margin-left:20px;"
                    type="primary"
                    size="medium"
                    icon="el-icon-search"
                    @click="getDetailsList()">查询</el-button>

                <el-button
                    style="margin-left:20px;"
                    type="primary"
                    size="medium"
                    icon="el-icon-plus"
                    @click="add()">增加</el-button>
                <el-button type="primary" size="medium" @click="importData()" style="margin-left:20px;" icon="el-icon-document-add">导入Excel</el-button>
                </el-form>
                <el-table :data="list" stripe style="width: 1100px;" border>
                    <el-table-column
                    prop="check_in_time"
                    width="200"
                    label="日期"
                    align="center"
                />
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
                    prop="door"
                    width="260"
                    label="转出栋舍"
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
                
                </el-table>

                <!-- 分页 -->
                <div class="block" style="margin-top: 15px;">
                <el-pagination
                    :current-page="current"
                    :page-size="limit"
                    :total="total"
                    style="padding: 30px 0; text-align: center"
                    layout="total, sizes, prev, pager, next"
                    @current-change="getList"
                    @size-change="handleSizeChange"
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
          <el-form-item label="耳号*：">
            <el-input
              v-model="formDisObj.dis_sn"
              style="width: 260px"
              placeholder="请输入耳号"></el-input>
          </el-form-item>

          <el-form-item label="电子耳标：" style="margin-left:0px;">
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
      <span>确定要删除该记录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteOzoneDialog = false">取 消</el-button>
        <el-button @click="deleteOzoneClick()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
          <div class="measure-aa-container">
            <el-form :inline="true" :model="Obj" class="measure-demo-form-inline" ref="Obj">
              <el-form-item label="日期">
                <el-date-picker
                  v-model="value2"
                  value-format="timestamp"
                  type="date"
                  placeholder="请选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-button type="primary" size="medium" @click="handlerTransfer()">转舍</el-button>
            </el-form>
            <div style="height: 30px;"></div>
            <el-table :data="list" stripe style="width: 760px;" border>
              <el-table-column
                prop="source_label"
                width="120"
                label="耳号"
                align="center"
              />
              <el-table-column
                prop="label_id"
                width="120"
                label="电子耳标"
                align="center"
              />
              <el-table-column
                prop="Sitearea"
                width="180"
                label="转入场区"
                align="center"
              />
              <el-table-column
                prop="door"
                width="180"
                label="转入栋舍"
                align="center"
              />
              <el-table-column
                prop="dorm"
                width="180"
                label="转入栏位"
                align="center"
              />
            </el-table>
          </div>
        </el-dialog> -->

    <!--新添/修改弹框 -->
    <!-- <el-dialog
      title="新添/修改"
      :visible.sync="showOzoneDialog"
      width="55%"
      center
      :close-on-click-modal="false"
      :show-close="false">
      <el-form ref="formOzoneObj" :model="formOzoneObj" label-width="140px">
        <div class="measure-flex-space">
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

        <div class="measure-flex-space">
          <el-form-item label="消毒时长(分钟)*：">
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
        <div class="measure-from-footer">
          <el-button @click="resetOzoneForm('formOzoneObj')">取消</el-button>
          <el-button type="primary" @click="onOzoneSubmit('formOzoneObj')">保存</el-button>
        </div>
      </el-form>
    </el-dialog> -->

    
  </div>
</template>

<script>
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
  deletePigfile
} from "../../request/api";
import { Message } from "element-ui";
import { stringify } from "qs";
import {
  getTodayLine,
  getPreMonthDay
} from "../../utils/utils";
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



      timelist: [
        new Date().getTime() - 3 * 24 * 60 * 60 * 1000,
        new Date().getTime(),
      ],
      centerDialogVisible: false,
      current: 1, //当前页
      limit: 10, //每页显示记录数
      total: 0, //总记录数
      list: [
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000731",
          source_label: "Y173708",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5809,
          parent_id: 3291,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000899",
          source_label: "L90904",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5810,
          parent_id: 3291,
          temperature: 35.5,
          activity: 1
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000860",
          source_label: "Y174004",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5811,
          parent_id: 3291,
          temperature: 35,
          activity: 0
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000512",
          source_label: "Y174110",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5813,
          parent_id: 3291,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000749",
          source_label: "Y173802",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5814,
          parent_id: 3291,
          temperature: 37,
          activity: 3
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏27",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3318,
          label_id: "89000423",
          source_label: "Y174002",
          door: "西10舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 18:43",
          serial: 5812,
          parent_id: 3291,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 3,
          dorm: "栏33",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3369,
          label_id: "89000774",
          source_label: "Y170704",
          door: "西11舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 10:21",
          serial: 5633,
          parent_id: 3336,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏18",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3215,
          label_id: "89000784",
          source_label: "Y129711",
          door: "西3舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 10:21",
          serial: 5596,
          parent_id: 3197,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏18",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3215,
          label_id: "89000558",
          source_label: "Y131611",
          door: "西3舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 10:21",
          serial: 5595,
          parent_id: 3197,
          temperature: 36,
          activity: 2
        },
        {
          operation: 1,
          label_type: 1,
          dorm: "栏18",
          status: 1,
          Sitearea: "顺鑫西区",
          layout_id: 3215,
          label_id: "89000479",
          source_label: "Y130807",
          door: "西3舍",
          farm_name: "顺鑫猪场",
          check_in_time: "2023-04-06 10:21",
          serial: 5594,
          parent_id: 3197,
          temperature: 36,
          activity: 2
        },
      ],
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
        start_time: this.dateFormat(this.timeEchartslist[0]),
        end_time: this.dateFormat(this.timeEchartslist[1]),
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
        `http://syrdev.coyotebio-lab.com:8080/wisdomLivestockWH/PCpigManagement/ExportPigHistoryList.hn?${stringify(
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
        start_time: this.dateFormat(this.timepiglist[0]),
        end_time: this.dateFormat(this.timepiglist[1]),
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
        start_time: this.dateFormat(this.timepiglist[0]),
        end_time: this.dateFormat(this.timepiglist[1]),
        serial: this.pigInfoObj.serial,
      };
      window.open(
        `http://syrdev.coyotebio-lab.com:8080/wisdomLivestockWH/PCpigManagement/ExportLabelInfo.hn?${stringify(
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
     * 删除
     */
    handlerDelete(id) {
      if(this.numberType == 3){
        this.deleteOzoneDialog = true;
        this.idDis = id;
      } else if(this.numberType == 4){
        this.deleteOzoneDialog = true;
        // this.idAccess = id;
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

      } else if(number == 5){

      } else if(number == 4){
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
    // 导出
    exportData() {
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
    add(){
      this.centerDialogVisible = true;
    }
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

.measure-demo-form-inline{
    margin-top: 20px;
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
}
</style>