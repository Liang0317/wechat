import {
	req
} from '../../utils/req.js';
export default {
	// 首页
	index(param) {
		return req.get("mobilenode/app/IndexAdminOrder/index", param)
	}, 
	// 拨打客户电话
	getVirtualPhone(param) {
		return req.post("mobilenode/app/IndexAdminOrder/getVirtualPhone", param)
	},
	// 编辑通知状态
	noticeUpdate(param) {
		return req.post("mobilenode/app/IndexAdminOrder/noticeUpdate", param)
	},
	// 订单列表
	orderList(param) {
		return req.get("mobilenode/app/IndexAdminOrder/orderList", param)
	}, 
	// 订单详情
	orderInfo(param) {
		return req.get("mobilenode/app/IndexAdminOrder/orderInfo", param)
	}, 
	// 异常订单详情
	abnOrderInfo(param) {
		return req.get("mobilenode/app/IndexAdminOrder/abnOrderInfo", param)
	}, 
	// 可退款服务详情
	canRefundOrderInfo(param) {
		return req.get("mobilenode/app/IndexAdminOrder/canRefundOrderInfo", param)
	}, 
	// 管理员操作退款
	applyOrderRefund(param) {
		return req.post("mobilenode/app/IndexAdminOrder/applyOrderRefund", param)
	}, 
	// 退款
	passRefundV2(param) {
		return req.post("mobilenode/app/IndexAdminOrder/passRefundV2", param)
	}, 
	// 修改订单状态
	adminUpdateOrder(param) {
		return req.post("mobilenode/app/IndexAdminOrder/adminUpdateOrder", param)
	}, 
	// 修改订单状态
	adminUpdateOrder(param) {
		return req.post("mobilenode/app/IndexAdminOrder/adminUpdateOrder", param)
	}, 
	// 退款列表
	refundOrderList(param) {
		return req.get("mobilenode/app/IndexAdminOrder/refundOrderList", param)
	}, 
	// 退款详情
	refundOrderInfo(param) {
		return req.get("mobilenode/app/IndexAdminOrder/refundOrderInfo", param)
	}, 
	// 同意退款
	passRefund(param) {
		return req.post("mobilenode/app/IndexAdminOrder/passRefund", param)
	}, 
	// 拒绝退款
	noPassRefund(param) {
		return req.post("mobilenode/app/IndexAdminOrder/noPassRefund", param)
	}, 
	// 代理商列表
	adminSelect(param) {
		return req.get("mobilenode/app/IndexAdminOrder/adminSelect", param)
	}, 
	// 更换技-师
	orderChangeCoach(param) {
		return req.post("mobilenode/app/IndexAdminOrder/orderChangeCoach", param)
	}, 
	// 转派技-师列表
	orderChangeCoachList(param) {
		return req.get("mobilenode/app/IndexAdminOrder/orderChangeCoachList", param)
	}, 
}
