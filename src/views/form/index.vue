<template>
  <div class="index-container">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="栋舍设备布局">
        <div class="view_1">
          <div class="total_view">总数: 耳环340个 摄像头8台</div>
          <div class="div_view">
            <el-row>
              <el-col
                :span="6"
                v-for="(o, index) in 10"
                :key="o"
                class="box-col"
              >
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
      </el-tab-pane>
      <el-tab-pane label="个体健康历史记录">
        <div class="view_2">
          <div class="view_2_1" v-if="logisticsDialog">
            <div class="view_2_top pulic_box_shadow">
              <div class="view_2_top_1">
                <span class="view_2_top_1_1">50</span>
                <span class="view_2_top_1_2">总存栏</span>
              </div>
              <div class="view_2_top_1">
                <span class="view_2_top_1_1">5</span>
                <span class="view_2_top_1_2">发热</span>
              </div>
              <div class="view_2_top_1">
                <span class="view_2_top_1_1">30</span>
                <span class="view_2_top_1_2">离线</span>
              </div>
            </div>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="耳号" prop="source_label">
                <el-input
                  v-model="source_label"
                  placeholder="请输入耳号"
                  clearable
                />
              </el-form-item>
              <el-form-item label="场区" prop="sitearea">
                <el-input
                  v-model="sitearea"
                  placeholder="请输入场区"
                  clearable
                />
              </el-form-item>
              <el-form-item label="栋舍" prop="door">
                <el-input v-model="door" placeholder="请输入栋舍" clearable />
              </el-form-item>
              <el-form-item label="栏位" prop="dorm">
                <el-input v-model="dorm" placeholder="请输入栏位" clearable />
              </el-form-item>

              <el-form-item label="状态" prop="status">
                <el-select
                  v-model="status"
                  filterable
                  clearable
                  placeholder="请选择状态"
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
                @click="getList()">查询</el-button>
              <el-button type="primary" size="medium" @click="exportData()" style="margin-left:20px;">导出</el-button>
            </el-form>
            <el-table :data="list" stripe style="width: 100%" border>
              <el-table-column
                prop="source_label"
                fixed
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
                width="115"
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

              <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="logisticsClick(scope.row.id)"
                    >详情</el-button
                  >
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
          <div class="view_2_1" v-if="!logisticsDialog">
            <!-- <div class="view_2_top_1_2" @click="handlerReturn()">返回历史列表</div> -->
            <el-page-header @back="handlerReturn" content="返回历史列表"></el-page-header>
            <div class="view_2_top pulic_box_shadow" style="margin-top: 20px;">
              <div class="view_2_top_1">
                <span class="view_2_top_1_1">SN00001</span>
                <span class="view_2_top_1_2">耳号</span>
              </div>
              <div class="view_2_top_1">
                <span class="view_2_top_1_1">800090001</span>
                <span class="view_2_top_1_2">电子耳号</span>
              </div>
              <div class="view_2_top_1">
                <span class="view_2_top_1_1">母猪</span>
                <span class="view_2_top_1_2">性别</span>
              </div>
            </div>
            <el-form :inline="true" class="demo-form-inline">
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

              <el-button
                style="margin-left:20px;"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="getDetailsList()">查询</el-button>

              <el-button type="primary" size="medium" @click="exportDetailsData()" style="margin-left:20px;">导出</el-button>
            </el-form>
            <el-table :data="list" stripe style="width: 1040px;" border>
              <el-table-column
                prop="Sitearea"
                width="200"
                label="场区"
                align="center"
              />
              <el-table-column
                prop="door"
                width="200"
                label="栋舍"
                align="center"
              />
              <el-table-column
                prop="dorm"
                width="200"
                label="栏位"
                align="center"
              />
              <el-table-column
                prop="temperature"
                width="120"
                label="体温(°C)"
                align="center"
              />
              <!-- <el-table-column
                prop="activity"
                width="120"
                label="活跃度"
                align="center"
              /> -->
              <el-table-column
                prop="activity"
                width="120"
                label="活跃度"
                align="center"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.activity == '0'">无</p>
                  <p v-if="scope.row.activity == '1'">低</p>
                  <p v-if="scope.row.activity == '2'">中</p>
                  <p v-if="scope.row.activity == '3'">高</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="check_in_time"
                width="200"
                label="更新时间"
                align="center"
              />
              
            </el-table>

            <div class="echarts_view">
                <el-row>
                    <el-button round>天</el-button>
                    <el-button round>周</el-button>
                    <el-button round>6个月</el-button>
                    <el-button round style="margin-right: 10px;">上一天</el-button>
                    <el-date-picker
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button round style="margin-left: 10px;">下一天</el-button>
                    <el-button round>前一天</el-button>
                    <el-button round>前二天</el-button>
                    <el-button round>前三天</el-button>
                </el-row>
                <div class="echarts_view_top">
                    <div class="echarts_view_l">
                        <div class="echarts_view_title">猪只体温曲线图</div>
                        <div id="echarttemp" style="width: 600px;height:400px;"></div>
                    </div>
                    <div class="echarts_view_r">
                        <div class="echarts_view_title">猪只活跃度</div>
                        <div id="echartact" style="width: 600px;height:400px;"></div>
                    </div>
                </div>
                <div class="echarts_view_center">
                    
                </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="猪只个体档案管理">
        <div class="view_2">
          <div class="view_2_1">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="耳号" prop="source_label">
                <el-input
                  v-model="source_label"
                  placeholder="请输入耳号"
                  clearable
                />
              </el-form-item>
              <el-form-item label="品种" prop="breed">
                <el-input
                  v-model="source_label"
                  placeholder="请输入品种"
                  clearable
                />
              </el-form-item>
              <el-form-item label="在场情况" prop="presence_situation">
                <el-input
                  v-model="source_label"
                  placeholder="请输入在场情况"
                  clearable
                />
              </el-form-item>

              <el-button
                style="margin-left:20px;"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="getList()">查询</el-button>
              
            </el-form>
            <el-table :data="list" stripe style="width: 100%" border>
              <el-table-column
                prop="source_label"
                fixed
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
                label="品种"
                align="center"
              />
              <el-table-column
                prop="door"
                width="190"
                label="性别"
                align="center"
              />
              <el-table-column
                prop="status"
                width="120"
                label="在场情况"
                align="center"
              >
                <template slot-scope="scope">
                  <p v-if="scope.row.status == '1'">正常</p>
                  <p v-if="scope.row.status == '4'">发热</p>
                  <p v-if="scope.row.status == '2'">离线</p>
                  <p v-if="scope.row.status == '3'">离场</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="check_in_time"
                width="200"
                label="更新时间"
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
      </el-tab-pane>
      <el-tab-pane label="栋舍信息管理">
        <div class="view_2">
          <div class="view_2_1">
            <el-form :inline="true" class="demo-form-inline">
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
      </el-tab-pane>
      <el-tab-pane label="猪只批量入栏">
        <div class="view_2">
          <div class="view_2_1">
            <el-form :inline="true" class="demo-form-inline">
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

            
          </div>
        </div>

        <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
          <div class="aa-container">
            <el-form :inline="true" :model="Obj" class="demo-form-inline" ref="Obj">
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
        </el-dialog>

      </el-tab-pane>
      <el-tab-pane label="猪只批量转栏">
          <div class="view_2_1">
            <el-form :inline="true" class="demo-form-inline">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      tabPosition: "left",
      currentDate: new Date(),
      source_label: "",
      sitearea: "",
      door: "",
      dorm: "",
      status: "",
      current: 1, //当前页
      limit: 20, //每页显示记录数
      total: 60, //总记录数
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
      logisticsDialog: true,
      timelist: [
          new Date().getTime() - 3 * 24 * 60 * 60 * 1000,
          new Date().getTime(),
        ],
      chartTempDom: "",
      myChartTemp: "",
      optionTemp: "",
      chartActDom: "",
      myChartAct: "",
      optionAct: "",

      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: new Date(),
        centerDialogVisible: false,
    };
  },
  created() {
    // this.getList();
    
  },
  mounted(){
    
  },
  methods: {
    handlerReturn(){
        this.logisticsDialog = true
    },
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
    logisticsClick(id) {
      this.logisticsDialog = false;
    //   this.initChart();
    this.$nextTick(() => {
      this.chartTempDom = document.getElementById("echarttemp");
      this.myChartTemp = echarts.init(this.chartTempDom);

      this.chartActDom = document.getElementById("echartact");
      this.myChartAct = echarts.init(this.chartActDom);

      this.initChart();
    });
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
    initChart(){
        // 绘制图表

        this.myChartTemp.setOption({
            title: {
                text: ''
            },
            tooltip: {},
            xAxis: {
                data: ['张三', '李四', '王五', '小明', '赵六', '哈哈']
            },
            yAxis: {},
            series: [
                {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
                }
            ]
        });

        // 绘制图表
        this.myChartAct.setOption({
            title: {
                text: ''
            },
            tooltip: {},
            xAxis: {
                data: ['张三', '李四', '王五', '小明', '赵六', '哈哈']
            },
            yAxis: {},
            series: [
                {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
                }
            ]
        });
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

.view_1 {
  width: 1200px;
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

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button {
  padding: 0;
  float: right;
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.name_span {
  margin-top: 10px;
}

.total_view {
  margin-bottom: 20px;
  margin-left: 20px;
}

.div_view {
  overflow-y: scroll;
  height: 600px;
}

.pulic_box_shadow {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* padding: 20px 0px; */
}

.view_2 {
  width: 1200px;
  overflow-y: scroll;
  height: 600px;
}

.view_2_1{
    margin-left: 20px;
}

.demo-form-inline{
    margin-top: 20px;
}

.view_2_top {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 1174px;
}

.view_2_top_1 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}

.view_2_top_1_1 {
  font-size: 20px;
}

.view_2_top_1_2 {
  margin-top: 10px;
  font-size: 16px;
}


.echarts_view{
    margin-top: 50px;
}

.echarts_view_top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

.echarts_view_l{
    display: flex;
    flex-direction: column;
}

.echarts_view_title{
    font-size: 18px;
}

.echarts_view_center{

}
</style>