(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e0e2b12"],{"0ae5":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ozone-index-container"},[i("div",{staticClass:"ozone-container-left ozone-pulic_box_shadow"},[i("div",{class:[1==t.numberType?"ozone-click_view_activity":"ozone-click_view"],on:{click:function(e){return t.handleClick(1)}}},[t._v("今日臭氧预警")]),i("div",{class:[2==t.numberType?"ozone-click_view_activity":"ozone-click_view"],on:{click:function(e){return t.handleClick(2)}}},[t._v("今日臭氧记录")]),i("div",{class:[3==t.numberType?"ozone-click_view_activity":"ozone-click_view"],on:{click:function(e){return t.handleClick(3)}}},[t._v("臭氧消毒记录")]),i("div",{class:[4==t.numberType?"ozone-click_view_activity":"ozone-click_view"],on:{click:function(e){return t.handleClick(4)}}},[t._v("液体消毒记录")])]),i("div",{staticClass:"ozone-container-right ozone-pulic_box_shadow"},[i("div",{directives:[{name:"show",rawName:"v-show",value:1==t.numberType||2==t.numberType||3==t.numberType,expression:"numberType== 1 || numberType == 2 || numberType == 3"}],staticClass:"ozonemodule-dis-flex"},[i("div",{staticStyle:{width:"100%","margin-top":"20px","font-size":"20px"}},[t._v("物资臭氧监测记录")]),i("el-form",{staticClass:"ozone-demo-form-inline1",attrs:{inline:!0}},[i("el-form-item",{attrs:{label:"时间范围"}},[i("el-date-picker",{staticStyle:{width:"260px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",readonly:3!=t.numberType},model:{value:t.timelist,callback:function(e){t.timelist=e},expression:"timelist"}})],1),i("el-form-item",{attrs:{label:"位置",prop:"location_id"}},[i("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择位置"},model:{value:t.location_id,callback:function(e){t.location_id=e},expression:"location_id"}},t._l(t.listDevice,(function(t,e){return i("el-option",{key:e,attrs:{label:t.location_descr,value:t.layout_id}})})),1)],1),2==t.numberType||3==t.numberType?i("el-form-item",{attrs:{label:"结果",prop:"results"}},[i("el-select",{staticStyle:{width:"160px"},attrs:{filterable:"",clearable:"",placeholder:"请选择结果"},model:{value:t.results,callback:function(e){t.results=e},expression:"results"}},[i("el-option",{attrs:{label:"正常",value:"0"}}),i("el-option",{attrs:{label:"违规",value:"1"}})],1)],1):t._e(),i("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"medium",icon:"el-icon-search"},on:{click:function(e){return t.getGoodslistinfos()}}},[t._v("查询")])],1),i("el-table",{staticStyle:{width:"1150px"},attrs:{data:t.listOzone,stripe:"",border:"","row-style":t.iRowStyle,"cell-style":t.iCellStyle,"header-row-style":t.iHeaderRowStyle,"header-cell-style":t.iHeaderCellStyle}},[i("el-table-column",{attrs:{prop:"address",width:"160",label:"位置",align:"center"}}),i("el-table-column",{attrs:{prop:"start_fumigation_time",width:"180",label:"时间",align:"center"}}),i("el-table-column",{attrs:{prop:"duration",width:"100",label:"时长(分钟)",align:"center"}}),i("el-table-column",{attrs:{prop:"status",width:"120",label:"结果",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.status||"2"==e.row.status||"3"==e.row.status||"6"==e.row.status?i("p",[t._v("正常")]):t._e(),"0"==e.row.status||"4"==e.row.status||"5"==e.row.status?i("p",[t._v("违规")]):t._e()]}}])}),i("el-table-column",{attrs:{prop:"ViolationReason",width:"210",label:"原因",align:"center"}}),i("el-table-column",{attrs:{prop:"status",width:"140",label:"审批状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return["3"==e.row.status?i("p",[t._v("待审批")]):t._e(),"5"==e.row.status?i("p",[t._v("审批失败")]):t._e(),"6"==e.row.status?i("p",[t._v("审批通过")]):t._e()]}}])}),i("el-table-column",{attrs:{prop:"img",width:"240",label:"图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("div",{staticClass:"ozone-img"},[i("el-image",{staticStyle:{width:"200px",height:"60px"},attrs:{fit:"cover",src:t.row.img[0],"preview-src-list":t.row.img}})],1)]}}])})],1),i("div",{staticClass:"block",staticStyle:{"margin-top":"0px"}},[i("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.current,"page-size":t.limit,total:t.total,layout:"total, sizes, prev, pager, next","page-sizes":[10,20,30,40]},on:{"current-change":t.getGoodslistinfos,"size-change":t.handleSizeChange}})],1),i("div",{staticClass:"ozone-echarts_view"},[i("div",{staticClass:"ozone-echarts_view_top"},[i("div",{staticClass:"ozone-echarts_view_l"},[i("el-form",{staticClass:"ozone-demo-form-inline",attrs:{inline:!0}},[i("el-form-item",{attrs:{label:"时间范围"}},[i("el-date-picker",{attrs:{align:"right",type:"month",placeholder:"选择月份",clearable:!1},model:{value:t.currentMonth,callback:function(e){t.currentMonth=e},expression:"currentMonth"}})],1),i("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"medium",icon:"el-icon-search"},on:{click:function(e){return t.getGoodsChart()}}},[t._v("查询")])],1),i("div",{ref:"echarttemp",staticStyle:{width:"1150px",height:"400px","margin-top":"20px"},attrs:{id:"echarttemp"}})],1),i("div",{staticClass:"ozone-echarts_view_r"})]),i("div",{staticClass:"ozone-echarts_view_center"})])],1),i("div",{directives:[{name:"show",rawName:"v-show",value:4==t.numberType,expression:"numberType== 4"}],staticClass:"ozonemodule-dis-flex"},[i("div",{staticStyle:{width:"100%","margin-top":"20px","font-size":"20px"}},[t._v("液体浸泡消毒历史记录")]),i("el-form",{staticClass:"ozone-demo-form-inline1",attrs:{inline:!0}},[i("el-form-item",{attrs:{label:"时间范围"}},[i("el-date-picker",{staticStyle:{width:"260px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",readonly:3!=t.numberType},model:{value:t.timelist1,callback:function(e){t.timelist1=e},expression:"timelist1"}})],1),i("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"medium",icon:"el-icon-search"},on:{click:function(e){return t.getLiquidlist()}}},[t._v("查询")])],1),i("el-table",{staticStyle:{width:"1150px"},attrs:{data:t.listOzone1,stripe:"",border:"","row-style":t.iRowStyle,"cell-style":t.iCellStyle,"header-row-style":t.iHeaderRowStyle,"header-cell-style":t.iHeaderCellStyle}},[i("el-table-column",{attrs:{prop:"SN",width:"140",label:"SN号",align:"center"}}),i("el-table-column",{attrs:{prop:"address",width:"180",label:"位置",align:"center"}}),i("el-table-column",{attrs:{prop:"create_time",width:"180",label:"创建时间",align:"center"}}),i("el-table-column",{attrs:{prop:"remain_time",width:"140",label:"时:分:秒",align:"center"}}),i("el-table-column",{attrs:{prop:"remain_time",width:"120",label:"PH值/浓度值",align:"center"}},[[i("p",[t._v("-")])]],2),i("el-table-column",{attrs:{prop:"status",width:"150",label:"结果",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return["4"==e.row.status?i("p",[t._v("失败")]):i("p",[t._v("正常")])]}}])}),i("el-table-column",{attrs:{prop:"img",width:"240",label:"图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"ozone-img"},[i("el-image",{staticStyle:{width:"200px",height:"60px"},attrs:{fit:"cover",src:e.row.img,"preview-src-list":t.imgList}})],1)]}}])})],1),i("div",{staticClass:"block",staticStyle:{"margin-top":"0px"}},[i("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":t.current1,"page-size":t.limit1,total:t.total1,layout:"total, sizes, prev, pager, next","page-sizes":[10,20,30,40]},on:{"current-change":t.getLiquidlist,"size-change":t.handleSizeChange1}})],1),i("div",{staticClass:"ozone-echarts_view"},[i("div",{staticClass:"ozone-echarts_view_top"},[i("div",{staticClass:"ozone-echarts_view_l"},[i("el-form",{staticClass:"ozone-demo-form-inline",attrs:{inline:!0}},[i("el-form-item",{attrs:{label:"时间范围"}},[i("el-date-picker",{attrs:{align:"right",type:"year",placeholder:"选择年份"},model:{value:t.currentMonth1,callback:function(e){t.currentMonth1=e},expression:"currentMonth1"}})],1),i("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"medium",icon:"el-icon-search"},on:{click:function(e){return t.getLiquidChart()}}},[t._v("查询")])],1),i("div",{ref:"echarttempLiu",staticStyle:{width:"1150px",height:"400px","margin-top":"20px"},attrs:{id:"echarttempLiu"}})],1),i("div",{staticClass:"ozone-echarts_view_r"})]),i("div",{staticClass:"ozone-echarts_view_center"})])],1)])])},s=[],n=(i("159b"),i("313e")),l=i("c1df"),o=i.n(l),r=i("fd03"),c=i("5c96"),d={data:function(){return{userInfo:JSON.parse(window.localStorage.getItem("userInfo")),location_id:"",results:"1",current:1,limit:10,total:0,listDevice:[],listOzone:[],timelist:[(new Date).getTime(),(new Date).getTime()],chartTempDom:"",myChartTemp:"",optionTemp:"",timeEchartslist:[(new Date).getTime(),(new Date).getTime()],currentMonth:(new Date).getTime(),numberType:1,current1:1,limit1:10,total1:0,listOzone1:[],timelist1:[],chartTempDomLiu:"",myChartTempLiu:"",currentMonth1:(new Date).getTime(),imgList:[]}},created:function(){},mounted:function(){var t=this;this.$nextTick((function(){t.chartTempDom=t.$refs.echarttemp,t.myChartTemp=n["a"](t.chartTempDom),t.getGoodslistinfos(),t.getGoodsChart(),t.getDeviceInfo()}))},methods:{iRowStyle:function(t){t.row,t.rowIndex;return"height:35px"},iHeaderRowStyle:function(t){t.row,t.rowIndex;return"height:46px"},iCellStyle:function(t){t.row,t.column,t.rowIndex,t.columnIndex;return"padding:0px"},iHeaderCellStyle:function(t){t.row,t.column,t.rowIndex,t.columnIndex;return"padding:0px"},dateFormat:function(t){return void 0==t?"":o()(t).format("YYYY-MM-DD")},dateFormatMonth:function(t){return void 0==t?"":o()(t).format("YYYY-MM")},dateFormatMonth1:function(t){return void 0==t?"":o()(t).format("YYYY")},isEmpty:function(t){return null==t||void 0==t||""==t},getDeviceInfo:function(){var t=this;Object(r["H"])({pig_farm_id:this.userInfo.farm_id,type:"2"}).then((function(e){e.data.success?t.listDevice=e.data.data:Object(c["Message"])({type:"warning",message:e.data.msg,showClose:!0,duration:3e3})}))},getGoodsChart:function(){var t=this;console.log(this.currentMonth),Object(r["P"])({pig_farm_id:this.userInfo.farm_id,month:this.dateFormatMonth(this.currentMonth)}).then((function(e){if(e.data.success){var i=e.data.xdata,a=e.data.ysuccess,s=e.data.yfail,n=[{name:"正常",type:"bar",color:"#5470c6",data:a,barWidth:12},{name:"违规",type:"bar",color:"#91cc75",data:s,barWidth:12}];t.initChart(i,n)}else Object(c["Message"])({type:"warning",message:e.data.msg,showClose:!0,duration:3e3})}))},getGoodslistinfos:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.current=e;var i={pig_farm_id:this.userInfo.farm_id,page:this.current,limit:this.limit,start_time:null!=this.timelist&&this.timelist.length>0?this.dateFormat(this.timelist[0])+" 00:00:00":"",end_time:null!=this.timelist&&this.timelist.length>0?this.dateFormat(this.timelist[1])+" 23:59:59":"",address:this.location_id,status:this.results};console.log(i),Object(r["R"])(i).then((function(e){e.data.success?(t.listOzone=e.data.data,t.total=parseInt(e.data.count)):Object(c["Message"])({type:"warning",message:e.data.msg,showClose:!0,duration:3e3})}))},handleSizeChange:function(t){this.limit=t,this.getGoodslistinfos()},initChart:function(t,e){this.myChartTemp.setOption({title:{text:"臭氧消毒监测结果月统计图"},tooltip:{show:!0,trigger:"axis"},legend:{show:!0},toolbox:{show:!1,orient:"vertical",left:"right",top:"center",feature:{mark:{show:!0},magicType:{show:!0,type:["line","bar","stack"]},restore:{show:!0},saveAsImage:{show:!1}}},xAxis:{type:"category",axisTick:{show:!1},name:"天",data:t},yAxis:{name:"数量(次)",min:0,minInterval:1},series:e})},handleClick:function(t){var e=this;this.numberType=t,4==t?this.$nextTick((function(){e.chartTempDomLiu=document.getElementById("echarttempLiu"),e.myChartTempLiu=n["a"](e.chartTempDomLiu),e.timelist1=[],e.current1=1,e.limit1=10,e.getLiquidlist(),e.getLiquidChart()})):3==t?(this.results="",this.timelist=[],this.location_id="",this.current=1,this.limit=10,this.getGoodslistinfos(),this.getGoodsChart()):2==t?(this.results="",this.timelist=[(new Date).getTime(),(new Date).getTime()],this.location_id="",this.current=1,this.limit=10,this.getGoodslistinfos(),this.getGoodsChart()):(this.results="1",this.timelist=[(new Date).getTime(),(new Date).getTime()],this.location_id="",this.current=1,this.limit=10,this.getGoodslistinfos(),this.getGoodsChart())},getLiquidChart:function(){var t=this;Object(r["Y"])({pig_farm_id:this.userInfo.farm_id,year:this.dateFormatMonth1(this.currentMonth1)}).then((function(e){if(e.data.success){var i=e.data.xdata,a=e.data.ydata,s=[{name:"数量",color:"#5470c6",data:a,type:"line",areaStyle:{}}];t.initChartLiu(i,s)}else Object(c["Message"])({type:"warning",message:e.data.msg,showClose:!0,duration:3e3})}))},getLiquidlist:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.current1=e;var i={pig_farm_id:this.userInfo.farm_id,page:this.current1,limit:this.limit1,start_time:null!=this.timelist1&&this.timelist1.length>0?this.dateFormat(this.timelist1[0])+" 00:00:00":"",end_time:null!=this.timelist1&&this.timelist1.length>0?this.dateFormat(this.timelist1[1])+" 23:59:59":""};Object(r["ab"])(i).then((function(e){e.data.success?(t.listOzone1=e.data.data,t.total1=parseInt(e.data.count),t.listOzone1.forEach((function(e){t.imgList.push(e.img)}))):Object(c["Message"])({type:"warning",message:e.data.msg,showClose:!0,duration:3e3})}))},handleSizeChange1:function(t){this.limit1=t,this.getLiquidlist()},initChartLiu:function(t,e){this.myChartTempLiu.setOption({title:{text:"年度消毒次数统计（面积图）"},tooltip:{show:!0,trigger:"axis"},legend:{show:!0},toolbox:{show:!1,orient:"vertical",left:"right",top:"center",feature:{mark:{show:!0},magicType:{show:!0,type:["line","bar","stack"]},restore:{show:!0},saveAsImage:{show:!1}}},xAxis:{type:"category",axisTick:{show:!1},name:"月",data:t,boundaryGap:!1},yAxis:{name:"数量(次)",min:0,minInterval:1},series:e})}}},u=d,m=(i("7ace"),i("2877")),h=Object(m["a"])(u,a,s,!1,null,null,null);e["default"]=h.exports},4670:function(t,e,i){},"7ace":function(t,e,i){"use strict";i("4670")}}]);