import {
	req
} from '../../utils/req.js';
export default {
	// 开通城市
	expectationCityCheck(param) {
		return req.get("massage/app/Index/expectationCityCheck", param)
	},
	expectationCity(param) {
		return req.post("massage/app/Index/expectationCity", param)
	}, 
	// 申请技-师
	coachApply(param) {
		return req.post("massage/app/IndexUser/coachApply", param)
	},
	// 获取是否开启合同
	getFddStatus(param) {
		return req.get("massage/app/IndexCoach/getFddStatus", param)
	},
	// 获取是否已签合同
	getFddRecord(param) {
		return req.get("massage/app/IndexCoach/getFddRecord", param)
	},
	// 获取发大大实名认证地址
	getPersonVerifyUrl(param) {
		return req.get("massage/app/IndexCoach/getPersonVerifyUrl", param)
	},
	// 获取用户实名注册信息
	getAttestationInfo(param) {
		return req.get("massage/app/IndexCoach/getAttestationInfo", param)
	},
	// 签署合同
	Extsign(param) {
		return req.post("massage/app/IndexCoach/Extsign", param)
	},
	// 技-师信息
	coachInfo(param) {
		return req.get("massage/app/IndexUser/coachInfo", param)
	},
	// 编辑技-师
	coachUpdate(param) {
		return req.post("massage/app/IndexCoach/coachUpdate", param)
	},
	// 编辑技-师
	coachUpdateV2(param) {
		return req.post("massage/app/IndexCoach/coachUpdateV2", param)
	},
	// 技-师等级
	coachLevel(param) {
		return req.get("massage/app/IndexCoach/coachLevel", param)
	},
	// 技-师首页
	coachIndex(param) {
		return req.get("massage/app/IndexCoach/coachIndex", param)
	},
	// 技-师报警
	police(param) {
		return req.post("massage/app/IndexCoach/police", param)
	},
	// 订单列表
	orderList(param) {
		return req.get("massage/app/IndexCoach/orderList", param)
	},
	// 订单详情
	orderInfo(param) {
		return req.get("massage/app/IndexCoach/orderInfo", param)
	},
	// 修改订单状态(type,order_id)
	updateOrder(param) {
		return req.post("massage/app/IndexCoach/updateOrder", param)
	},
	// 异常订单详情
	abnOrderInfo(param) {
		return req.get("massage/app/IndexCoach/abnOrderInfo", param)
	},
	// 记录技-师轨迹
	coachTrajectoryAdd(param) {
		return req.post("massage/app/IndexCoach/coachTrajectoryAdd", param)
	},
	// 拨打客户电话
	getVirtualPhone(param) {
		return req.post("massage/app/IndexCoach/getVirtualPhone", param)
	},
	// 评价管理
	commentList(param) {
		return req.get("massage/app/IndexCoach/commentList", param)
	},
	// 设为/取消优质评价
	updateCommentGood(param) {
		return req.post("massage/app/IndexCoach/updateCommentGood", param)
	},
	//佣金信息
	capCashInfo(param) {
		return req.get("massage/app/IndexCoach/capCashInfo", param)
	},
	//佣金信息（车费）
	capCashInfoCar(param) {
		return req.get("massage/app/IndexCoach/capCashInfoCar", param)
	},
	//申请提现 (apply_price,text,type：1服务费提现，2车费提现)
	applyWallet(param) {
		return req.post("massage/app/IndexCoach/applyWallet", param)
	},
	//提现记录
	capCashList(param) {
		return req.get("massage/app/IndexCoach/capCashList", param)
	},
	//时间管理回显
	timeConfig(param) {
		return req.get("massage/app/IndexCoach/timeConfig", param)
	},
	//时间管理设置
	setTimeConfig(param) {
		return req.post("massage/app/IndexCoach/timeConfig", param)
	},
	//根据接单时间获取时间节点
	getTime(param) {
		return req.get("massage/app/IndexCoach/getTime", param)
	},
	//根据接单时间获取时间节点
	getOrderNum(param) {
		return req.get("massage/app/IndexCoach/getOrderNum", param)
	},
	//物料商城-商品列表
	goodsList(param) {
		return req.get("massage/app/IndexCoach/goodsList", param)
	},
	//物料商城-分类列表
	carteList(param) {
		return req.get("massage/app/IndexCoach/carteList", param)
	},
	//物料商城-商品详情
	goodsInfo(param) {
		return req.get("massage/app/IndexCoach/goodsInfo", param)
	},
	//车费明细列表
	carMoneyList(param) {
		return req.get("massage/app/IndexCoach/carMoneyList", param)
	},
	//差评申诉 订单列表
	appealOrder(param) {
		return req.get("massage/app/IndexCoach/appealOrder", param)
	},
	//差评申诉 提交申诉
	addAppeal(param) {
		return req.post("massage/app/IndexCoach/addAppeal", param)
	},
	//差评申诉 申诉记录列表
	appealList(param) {
		return req.get("massage/app/IndexCoach/appealList", param)
	},
	//标签列表
	labelList(param) {
		return req.get("massage/app/IndexCoach/labelList", param)
	},
	//添加用户评价
	userLabelAdd(param) {
		return req.post("massage/app/IndexCoach/userLabelAdd", param)
	},
	//获取用户当前标签
	userLabelList(param) {
		return req.get("massage/app/IndexCoach/userLabelList", param)
	},
	//获取用户当前评价
	coachCommentUserData(param) {
		return req.get("massage/app/IndexCoach/coachCommentUserData", param)
	},
	//储值返佣列表
	balanceCommissionList(param) {
		return req.get("massage/app/IndexCoach/balanceCommissionList", param)
	},
	//储值返佣金额统计
	balanceCommissionData(param) {
		return req.get("massage/app/IndexCoach/balanceCommissionData", param)
	},
	//分成明细
	coachCommissionList(param) {
		return req.get("massage/app/IndexCoach/coachCommissionList", param)
	},
	//分成明细金额统计
	coachCommissionData(param) {
		return req.get("massage/app/IndexCoach/coachCommissionData", param)
	},
	//收益详情
	coachCommissionInfo(param) {
		return req.get("massage/app/IndexCoach/coachCommissionInfo", param)
	},
	//拉黑用户
	shieldUserAdd(param) {
		return req.post("massage/app/IndexCoach/shieldUserAdd", param)
	},
	//移除拉黑用户
	shieldUserDel(param) {
		return req.post("massage/app/IndexCoach/shieldUserDel", param)
	},
	//拉黑用户列表
	shieldCoachList(param) {
		return req.get("massage/app/IndexCoach/shieldCoachList", param)
	},
	// 订单服务录音
	recordingAdd(param) {
		return req.post("recording/app/Recording/recordingAdd", param)
	},
	// 信用分
	getCreditValueData(param) {
		return req.get("massage/app/IndexCoach/getCreditValueData", param)
	},
}