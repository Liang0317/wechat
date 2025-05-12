import {
	req
} from '../../utils/req.js';
export default {
	// 合作加盟
	agentApply(param) {
		return req.post("massage/app/IndexUser/agentApply", param)
	}, 
	//代理商详情
	agentInfo(param) {
		return req.get("massage/app/Index/agentInfo", param)
	},
	// 首页
	index(param) {
		return req.get("mobilenode/app/IndexAgentOrder/index", param)
	}, 
	// 绑定技-师
	adminCoachQr(param) {
		return req.get("massage/app/IndexUser/adminCoachQr", param)
	},
	// 邀请 1渠道商 2业务员
	agentInviteQr(param) {
		return req.get("mobilenode/app/IndexAgentOrder/agentInviteQr", param)
	}, 
	// 邀请分销员
	agentInvresellerQr(param) {
		return req.get("mobilenode/app/IndexAgentOrder/agentInvresellerQr", param)
	}, 
	//申请提现
	applyWallet(param) {
		return req.post("mobilenode/app/IndexAgentOrder/applyWallet", param)
	},
	//提现记录
	walletList(param) {
		return req.get("mobilenode/app/IndexAgentOrder/walletList", param)
	},
	//账号设置
	adminInfoData(param) {
		return req.get("mobilenode/app/IndexAgentOrder/adminInfoData", param)
	},
	// 门店下拉列表
	storeSelect(param) {
		return req.get("mobilenode/app/IndexAgentOrder/storeSelect", param)
	},
	//技-师列表
	coachList(param) {
		return req.get("mobilenode/app/IndexAgentOrder/coachList", param)
	},
	//技-师详情
	coachInfo(param) {
		return req.get("mobilenode/app/IndexAgentOrder/coachInfo", param)
	},
	//新增技-师
	coachApply(param) {
		return req.post("mobilenode/app/IndexAgentOrder/coachApply", param)
	},
	//编辑技-师
	coachUpdateAdmin(param) {
		return req.post("mobilenode/app/IndexAgentOrder/coachUpdateAdmin", param)
	},
	//技-师关联用户
	coachUserList(param) {
		return req.get("mobilenode/app/IndexAgentOrder/coachUserList", param)
	},
	//佣金列表
	commList(param) {
		return req.get("mobilenode/app/IndexAgentOrder/commList", param)
	},
	// 拨打客户电话
	getVirtualPhone(param) {
		return req.post("mobilenode/app/IndexAgentOrder/getVirtualPhone", param)
	},
	// 编辑通知状态
	noticeUpdate(param) {
		return req.post("mobilenode/app/IndexAgentOrder/noticeUpdate", param)
	},
	// 订单列表
	orderList(param) {
		return req.get("mobilenode/app/IndexAgentOrder/orderList", param)
	}, 
	// 订单详情
	orderInfo(param) {
		return req.get("mobilenode/app/IndexAgentOrder/orderInfo", param)
	}, 
	// 异常订单详情
	abnOrderInfo(param) {
		return req.get("mobilenode/app/IndexAgentOrder/abnOrderInfo", param)
	}, 
	// 可退款服务详情
	canRefundOrderInfo(param) {
		return req.get("mobilenode/app/IndexAgentOrder/canRefundOrderInfo", param)
	}, 
	// 管理员操作退款
	applyOrderRefund(param) {
		return req.post("mobilenode/app/IndexAgentOrder/applyOrderRefund", param)
	}, 
	// 退款
	passRefundV2(param) {
		return req.post("mobilenode/app/IndexAgentOrder/passRefundV2", param)
	}, 
	// 修改订单状态
	adminUpdateOrder(param) {
		return req.post("mobilenode/app/IndexAgentOrder/adminUpdateOrder", param)
	}, 
	// 修改订单状态
	adminUpdateOrder(param) {
		return req.post("mobilenode/app/IndexAgentOrder/adminUpdateOrder", param)
	}, 
	// 退款列表
	refundOrderList(param) {
		return req.get("mobilenode/app/IndexAgentOrder/refundOrderList", param)
	}, 
	// 退款详情
	refundOrderInfo(param) {
		return req.get("mobilenode/app/IndexAgentOrder/refundOrderInfo", param)
	}, 
	// 同意退款
	passRefund(param) {
		return req.post("mobilenode/app/IndexAgentOrder/passRefund", param)
	}, 
	// 拒绝退款
	noPassRefund(param) {
		return req.post("mobilenode/app/IndexAgentOrder/noPassRefund", param)
	}, 
	// 代理商下拉列表
	adminSelect(param) {
		return req.get("mobilenode/app/IndexAgentOrder/adminSelect", param)
	},
	// 更换技-师
	orderChangeCoach(param) {
		return req.post("mobilenode/app/IndexAgentOrder/orderChangeCoach", param)
	}, 
	// 转派技-师列表
	orderChangeCoachList(param) {
		return req.get("mobilenode/app/IndexAgentOrder/orderChangeCoachList", param)
	}, 
}
