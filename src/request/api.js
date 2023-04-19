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















export const udateH5Images = val => requestH5Imgs('', val, 'post');

export const getVerification = val => requestH5Other('/store/Verification.hn', val, 'get'); //获取验证码

export const getBindbutn = val => requestH5Other('/store/bindbutn.hn', val, 'get'); // 首页上的绑定按钮

export const bindinstrument = val => requestH5Other('/store/bindinstrument.hn', val, 'post'); // 绑定按钮

export const uploadImgSelect = val => requestH5Other('/store/upload.hn', val, 'post'); //上传图片

export const getInstrumentList = val => requestH5Other('/store/searchinstrument.hn', val, 'get'); // 查询仪器信息

export const getUnBindSearch = val => requestH5Other('/store/search.hn', val, 'get'); //解绑时查询仪器信息

export const Unboundinstrument = val => requestH5Other('/store/Unboundinstrument.hn', val, 'get'); //解绑按钮

export const saveinstrument = val => requestH5Other('/store/saveinstrument.hn', val, 'get'); //保存按钮

export const searchSN = val => requestH5Other('/store/searchSN.hn', val, 'post'); // 查询序列号是否存在   每次输入（仪器或模块）序列号的时候调一次查询

export const uploadImgBind = val => requestH5Other('/store/bind_batch.hn', val, 'post'); // 上传图片

export const getJSSDKHELP = val => requestH5Other('/store/JSSDKHELP.hn', val, 'get');


export const getModule = val => requestH5Other('/store/getModule.hn', val, 'get'); // 仪器序列号获取模块

export const UnboundModule = val => requestH5Other('/store/UnboundModule.hn', val, 'get'); // 仪器序列号获取模块


export const searchLabelSN = val => requestH5Other('/store/getLabel.hn', val, 'get'); // 根据耳环编号查询








