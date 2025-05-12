import {
	req
} from '../../utils/req.js';
export default {
	// 会员首页
	index(param) {
		return req.get("member/app/IndexMember/index", param)
	}, 
	// 会员设置
	configInfo(param) {
		return req.get("member/app/IndexMember/configInfo", param)
	},
	// 权益详情
	rightsInfo(param) {
		return req.get("member/app/IndexMember/rightsInfo", param)
	},
	// 成长值明细
	growthList(param) {
		return req.get("member/app/IndexMember/growthList", param)
	},
}