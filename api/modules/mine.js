import {
	req
} from '../../utils/req.js';
export default {
	// 个人中心页面
	index(param) {
		return req.get("massage/app/IndexUser/index", param)
	},
	// 添加扫码记录 type 1渠道码 2分销码 3经纪人邀请技-师码 4代理商邀请技-师 5代理商邀请业务员 6代理商邀请渠道商 7技-师邀请充值 8业务员邀请渠道商 9分销员邀请分销员 10代理商邀请分销员
	addScanRecord(param) {
		return req.post("massage/app/IndexUser/addScanRecord", param)
	},
	// 更新扫码记录
	updateScanRecord(param) {
		return req.post("massage/app/IndexUser/updateScanRecord", param)
	},
	// 获取客服
	getWecomStaff(param) {
		return req.get("massage/app/IndexUser/getWecomStaff", param)
	},
	// 获取技-师状态
	getUserCoachStatus(param) {
		return req.get("massage/app/IndexUser/getUserCoachStatus", param)
	},
	// 认证技-师
	attestationCoach(param) {
		return req.post("massage/app/IndexUser/attestationCoach", param)
	},
	// 我的收益
	capCashInfo(param) {
		return req.get("massage/app/IndexUser/userCashInfo", param)
	},
	// 申请提现
	applyWallet(param) {
		return req.post("massage/app/IndexUser/applyWallet", param)
	},
	// 提现记录
	walletList(param) {
		return req.get("massage/app/IndexUser/walletList", param)
	},
	// 获取分销员等级
	getPayResellerData(param) {
		return req.get("massage/app/IndexUser/getPayResellerData", param)
	},
	// 申请分销员
	applyReseller(param) {
		return req.post("massage/app/IndexUser/applyReseller", param)
	},
	// 分销员重新支付
	reApplyResellerOrder(param) {
		return req.post("massage/app/IndexUser/reApplyResellerOrder", param)
	},
	// 分销员详情
	resellerInfo(param) {
		return req.get("massage/app/IndexUser/resellerInfo", param)
	},
	// 分销员首页
	partnerIndex(param) {
		return req.get("massage/app/IndexReseller/partnerIndex", param)
	},
	// 升级分销员
	resellerLevelUp(param) {
		return req.post("massage/app/IndexReseller/resellerLevelUp", param)
	},
	// 推荐费收益
	invCashList(param) {
		return req.get("massage/app/IndexReseller/invCashList", param)
	},
	// 邀请的技-师
	partnerCoachList(param) {
		return req.get("massage/app/IndexReseller/partnerCoachList", param)
	},
	// 我的团队
	myTeam(param) {
		return req.get("massage/app/IndexUser/myTeam", param)
	},
	// 邀请用户
	userCommQr(param) {
		return req.get("massage/app/IndexUser/userCommQr", param)
	},
	// 邀请技-师
	resellerInvCoachQr(param) {
		return req.get("massage/app/IndexReseller/resellerInvCoachQr", param)
	},
	// 选择代理商
	adminList(param) {
		return req.get("massage/app/IndexReseller/adminList", param)
	},
	// 获取默认地址
	getDefultAddress(param) {
		return req.get("massage/app/IndexUser/getDefultAddress", param)
	},
	// 地址列表
	addressList(param) {
		return req.get("massage/app/IndexUser/addressList", param)
	},
	// 地址详情
	addressInfo(param) {
		return req.get("massage/app/IndexUser/addressInfo", param)
	},
	// 新增地址
	addressAdd(param) {
		return req.post("massage/app/IndexUser/addressAdd", param)
	},
	// 修改地址
	addressUpdate(param) {
		return req.post("massage/app/IndexUser/addressUpdate", param)
	},
	// 删除地址
	addressDel(param) {
		return req.post("massage/app/IndexUser/addressDel", param)
	},
	// 收藏技-师
	coachCollectList(param) {
		return req.get("massage/app/IndexUser/coachCollectList", param)
	},
	// 新增收藏
	addCollect(param) {
		return req.post("massage/app/IndexUser/addCollect", param)
	},
	// 删除收藏
	delCollect(param) {
		return req.post("massage/app/IndexUser/delCollect", param)
	},
	// 卡券列表
	userCouponList(param) {
		return req.get("massage/app/IndexUser/userCouponList", param)
	},
	// 删除卡券
	couponDel(param) {
		return req.post("massage/app/IndexUser/couponDel", param)
	},
	// 卡券活动
	couponAtvInfo(param) {
		return req.post("massage/app/IndexUser/couponAtvInfo", param)
	},
	// 卡券二维码
	atvQr(param) {
		return req.post("massage/app/IndexUser/atvQr", param)
	},
	// 技-师分享储值套餐
	coachBalanceQr(param) {
		return req.get("massage/app/IndexCoach/coachBalanceQr", param)
	},
	// 选择技-师
	coachList(param) {
		return req.get("massage/app/IndexBalance/coachList", param)
	},
	// 储值充值卡列表
	cardList(param) {
		return req.get("massage/app/IndexBalance/cardList", param)
	},
	// 充值余额(card_id)
	payBalanceOrder(param) {
		return req.post("massage/app/IndexBalance/payBalanceOrder", param)
	},
	// 充值订单列表(时间筛选 start_time,end_time)
	balaceOrder(param) {
		return req.get("massage/app/IndexBalance/balaceOrder", param)
	},
	// 消费明细
	payWater(param) {
		return req.get("massage/app/IndexBalance/payWater", param)
	},
	// 我的收益 废弃
	commList(param) {
		return req.get("massage/app/IndexUser/commList", param)
	},
	// 我的收益
	resellerCashList(param) {
		return req.get("massage/app/IndexReseller/resellerCashList", param)
	},
	// 邀请分销员
	resellerInvresellerQr(param) {
		return req.get("massage/app/IndexReseller/resellerInvresellerQr", param)
	},
	// 下级分销员
	subReseller(param) {
		return req.get("massage/app/IndexReseller/subReseller", param)
	},
	// 提交反馈
	addFeedback(param) {
		return req.post("massage/app/IndexCoach/addFeedback", param)
	},
	// 反馈记录
	listFeedback(param) {
		return req.get("massage/app/IndexCoach/listFeedback", param)
	},
	// 反馈详情 
	feedbackInfo(param) {
		return req.get("massage/app/IndexCoach/feedbackInfo", param)
	},
	// 屏蔽列表
	shieldCoachList(param) {
		return req.get("massage/app/IndexUser/shieldCoachList", param)
	},
	// 新增屏蔽
	shieldCoachAdd(param) {
		return req.post("massage/app/IndexUser/shieldCoachAdd", param)
	},
	// 删除屏蔽
	shieldCoachDel(param) {
		return req.post("massage/app/IndexUser/shieldCoachDel", param)
	},
	// 获取门店数据
	getStoreSelect(param) {
		return req.get("massage/app/IndexUser/getStoreSelect", param)
	},
	// 绑定支付宝账号
	bindAlipayNumber(param) {
		return req.post("massage/app/IndexUser/bindAlipayNumber", param)
	},
	// 银行卡账户
	memberInfo(param) {
		return req.get("adapay/app/IndexMember/memberInfo", param)
	},
	// 绑定银行卡
	memberAdd(param) {
		return req.post("adapay/app/IndexMember/memberAdd", param)
	},
	// 编辑银行卡
	memberUpdate(param) {
		return req.post("adapay/app/IndexMember/memberUpdate", param)
	},
	// 删除银行卡
	memberStatusUpdate(param) {
		return req.post("adapay/app/IndexMember/memberStatusUpdate", param)
	}
}