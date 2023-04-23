import { 
    get
} from './http'

import requestH5Imgs from './requestH5Img'
import requestH5Other from './requestH5Other'

//PC端登录
export const getLogin = val => requestH5Other('/wisdomLivestockWH/BaseInstall/Vuelogin.hn', val, 'get');

//获取pc端目录
export const getMenu = val => requestH5Other('/wisdomLivestockWH/BaseInstall/getVueMenu.hn', val, 'get');

//风险预警  pig/newindex/
//获取小动物预警
export const getAnimalRecord = val => requestH5Other('/wisdomLivestockWH/pig/newindex/getAnimalRecord.hn', val, 'get');

//获取物品熏蒸预警
export const getGoodsRecord = val => requestH5Other('/wisdomLivestockWH/pig/newindex/getGoodsRecord.hn', val, 'get');

//首页获取发热耳环数据
export const getFeverLabelInfo = val => requestH5Other('/wisdomLivestockWH/pig/newindex/getFeverLabelInfo.hn', val, 'get');

//获取洗消报警数据
export const getAlarmList = val => requestH5Other('/wisdomLivestockWH/pig/newindex/getAlarmList.hn', val, 'get');

//获取猪只概况
export const getPigSurvey = val => requestH5Other('/wisdomLivestockWH/pig/newindex/getPigSurvey.hn', val, 'get');

//获取员工列表方法
export const getEmployeesLists = val => requestH5Other('/wisdomLivestockWH/PCpersonnelManagement/getEmployeesLists.hn', val, 'get');

//获取角色信息
export const getRoleinfo = val => requestH5Other('/wisdomLivestockWH/PCpersonnelManagement/getRoleinfo.hn', val, 'get');

//上传图片
export const uploadImg = val => requestH5Other('/wisdomLivestockWH/PCpersonnelManagement/upload.hn', val, 'get');

//删除员工
export const deleteEmployee = val => requestH5Other('/wisdomLivestockWH/PCpersonnelManagement/deleteEmployee.hn', val, 'get');

//新增人员
export const adduserinfo = val => requestH5Other('/wisdomLivestockWH/PCpersonnelManagement/adduserinfo.hn', val, 'get');

//根据id获取员工信息
export const getuserinfo = val => requestH5Other('/wisdomLivestockWH/PCpersonnelManagement/getuserinfo.hn', val, 'get');

//修改员工信息
export const edituserinfo = val => requestH5Other('/wisdomLivestockWH/PCpersonnelManagement/edituserinfo.hn', val, 'get');

//导出数据
export const ExportEmployeesLists = val => requestH5Other('/wisdomLivestockWH/PCpersonnelManagement/ExportEmployeesLists.hn', val, 'get');

//获取门禁列表
export const getEntranceGuardList = val => requestH5Other('/wisdomLivestockWH/PCAccessManagement/getEntranceGuardList.hn', val, 'get');

//获取门禁的位置信息用于筛选
export const getAccesslayoutdescr = val => requestH5Other('/wisdomLivestockWH/PCAccessManagement/getAccesslayoutdescr.hn', val, 'get');

//获取洗消信息列表方法
export const getIwadomlistinfos = val => requestH5Other('/wisdomLivestockWH/PCiwadom/getIwadomlistinfos.hn', val, 'get');

//获取自然月洗消结果图
export const getIwadomChart = val => requestH5Other('/wisdomLivestockWH/PCiwadom/getIwadomChart.hn', val, 'get');

//导出洗消列表方法
export const ExportIwadomLists = val => requestH5Other('/wisdomLivestockWH/PCiwadom/ExportIwadomLists.hn', val, 'get');

//获取物资熏蒸详情列表
export const getGoodslistinfos = val => requestH5Other('/wisdomLivestockWH/PCgoodsManagement/getGoodslistinfos.hn', val, 'get');

//获取指定时间熏蒸设备数据图方法
export const getGoodsChart = val => requestH5Other('/wisdomLivestockWH/PCgoodsManagement/getgoodsChart.hn', val, 'get');

//获取熏蒸设备位置
export const getDeviceInfo = val => requestH5Other('/wisdomLivestockWH/PCgoodsManagement/getDeviceInfo.hn', val, 'get');

//获取物小动物详情列表 
export const getAnimallistinfos = val => requestH5Other('/wisdomLivestockWH/PCanimalManagement/getAnimallistinfos.hn', val, 'get');

//获取当月小动物设备数据图方法 
export const getAnimalChart = val => requestH5Other('/wisdomLivestockWH/PCanimalManagement/getanimalChart.hn', val, 'get');

//获取设备的位置描述  <04-23>
export const getFarmlayout = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/getFarmlayout.hn', val, 'get');

//获取熏蒸设备的详情列表 
export const getzonedevicelist = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/getzonedevicelist.hn', val, 'get');

//新增臭氧熏蒸设备信息 
export const addozonedeviceinfo = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/addozonedeviceinfo.hn', val, 'get');

//删除，设备信息（共用）
export const deletedeviceinfo = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/deletedeviceinfo.hn', val, 'get');

//根据id获取设备信息（共用） 
export const getdeviceinfobyid = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/getdeviceinfobyid.hn', val, 'get');

//修改臭氧熏蒸设备信息 
export const editdeviceinfo = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/editdeviceinfo.hn', val, 'get');

//获取洗消设备列表 
export const getdeviceinfo = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/getdeviceinfo.hn', val, 'get');

//新增洗消设备信息 
export const addDecontaminationdeviceinfo = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/addDecontaminationdeviceinfo.hn', val, 'get');

//修改洗消设备 
export const editDecontaminationdeviceinfo = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/editDecontaminationdeviceinfo.hn', val, 'get');

//获取异物设备位点信息列表 
export const getForeignMatterManageList = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/getForeignMatterManageList.hn', val, 'get');

//新增异物检测设备信息方法 
export const addForeignMatter = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/addForeignMatter.hn', val, 'get');

//修改异物设备信息 
export const editForeignMatterinfo = val => requestH5Other('/wisdomLivestockWH/PCequipmentManagement/editForeignMatterinfo.hn', val, 'get');

//获取门禁位点信息列表  门禁  PCAccessManagement
export const getEntranceGuardManageList = val => requestH5Other('/wisdomLivestockWH/PCAccessManagement/getEntranceGuardManageList.hn', val, 'get');

//新增门禁设备
export const addEntranceGuard = val => requestH5Other('/wisdomLivestockWH/PCAccessManagement/addEntranceGuard.hn', val, 'get');

//根据id获取门禁信息
export const getAccessdeviceinfobyid = val => requestH5Other('/wisdomLivestockWH/PCAccessManagement/getAccessdeviceinfobyid.hn', val, 'get');

//修改门禁设备
export const editEntranceGuard = val => requestH5Other('/wisdomLivestockWH/PCAccessManagement/editEntranceGuard.hn', val, 'get');

//删除门禁
export const deleteEntranceGuardInfo = val => requestH5Other('/wisdomLivestockWH/PCAccessManagement/deleteEntranceGuardInfo.hn', val, 'get');

