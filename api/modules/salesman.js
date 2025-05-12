import {
	req
} from '../../utils/req.js';
export default {
	// 申请业务员
	applySalesman(param) {
		return req.post("massage/app/IndexUser/applySalesman", param)
	},
	// 业务员信息
	salesmanInfo(param) {
		return req.get("massage/app/IndexUser/salesmanInfo", param)
	},
	// 业务员首页
	index(param) {
		return req.get("massage/app/IndexSalesman/index", param)
	},
	// 业务员二维码
	salesmanQr(param) {
		return req.get("massage/app/IndexSalesman/salesmanQr", param)
	},
	// 申请提现
	applyWallet(param) {
		return req.post("massage/app/IndexSalesman/applyWallet", param)
	},
	// 提现记录
	walletList(param) {
		return req.get("massage/app/IndexSalesman/walletList", param)
	},
	// 渠道明细
	salesmanChannelCash(param) {
		return req.get("massage/app/IndexSalesman/salesmanChannelCash", param)
	},
	// 业务员渠道-商明细详情
	salesmanChannelOrderList(param) {
		return req.get("massage/app/IndexSalesman/salesmanChannelOrderList", param)
	},
	// 佣金明细
	salesmanChannelOrderListV2(param) {
		return req.get("massage/app/IndexSalesman/salesmanChannelOrderListV2", param)
	},
	// 解除绑定
	unfriendChannel(param) {
		return req.post("massage/app/IndexSalesman/unfriendChannel", param)
	},
	// 设置提成比例
	setSalesmanBalance(param) {
		return req.post("massage/app/IndexSalesman/setSalesmanBalance", param)
	},
	// 设置提成比例
	setInvChannelBalance(param) {
		return req.post("massage/app/IndexSalesman/setInvChannelBalance", param)
	},
}