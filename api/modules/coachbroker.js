import {
	req
} from '../../utils/req.js';
export default {
	//申请经纪人
	applyBroker(param) {
		return req.post("massage/app/IndexUser/applyBroker", param)
	},
	//经纪人详情
	brokerInfo(param) {
		return req.get("massage/app/IndexUser/brokerInfo", param)
	},
	//我的收益
	brokerCashList(param) {
		return req.get("coachbroker/app/IndexBroker/brokerCashList", param)
	},
	//申请提现
	applyWallet(param) {
		return req.post("coachbroker/app/IndexBroker/applyWallet", param)
	},
	//提现记录
	walletList(param) {
		return req.get("coachbroker/app/IndexBroker/walletList", param)
	},
	//经纪人首页
	brokerIndex(param) {
		return req.get("coachbroker/app/IndexBroker/brokerIndex", param)
	},
	//邀请的技-师
	brokerCoachList(param) {
		return req.get("coachbroker/app/IndexBroker/brokerCoachList", param)
	}, 
	//邀请技-师
	resellerInvCoachQr(param) {
		return req.get("coachbroker/app/IndexBroker/resellerInvCoachQr", param)
	},
	//选择代理商
	adminList(param) {
		return req.get("coachbroker/app/IndexBroker/adminList", param)
	},
}
