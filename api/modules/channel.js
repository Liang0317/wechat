import {
	req
} from '../../utils/req.js';
export default {
	// 渠道-商下拉
	channelCateSelect(param) {
		return req.get("massage/app/IndexUser/channelCateSelect", param)
	},
	// 申请渠道-商
	applyChannel(param) {
		return req.post("massage/app/IndexUser/applyChannel", param)
	},
	// 渠道-商信息
	channelInfo(param) {
		return req.get("massage/app/IndexUser/channelInfo", param)
	},
	// 渠道-商首页
	index(param) {
		return req.get("massage/app/IndexChannel/index", param)
	},
	// 渠道-商二维码
	channelQr(param) {
		return req.get("massage/app/IndexChannel/channelQr", param)
	},
	// 渠道-商二维码下拉列表
	channelQrSelect(param) {
		return req.get("massage/app/IndexChannel/channelQrSelect", param)
	},
	// 渠道-商二维码
	channelQrList(param) {
		return req.get("massage/app/IndexChannel/channelQrList", param)
	},
	// 二维码详情
	channelQrInfo(param) {
		return req.get("massage/app/IndexChannel/channelQrInfo", param)
	},
	// 订单列表
	orderList(param) {
		return req.get("massage/app/IndexChannel/orderList", param)
	},
	//申请提现
	applyWallet(param) {
		return req.post("massage/app/IndexChannel/applyWallet", param)
	},
	//提现记录
	walletList(param) {
		return req.get("massage/app/IndexChannel/walletList", param)
	},
}
