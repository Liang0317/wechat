import {
	req
} from '../../utils/req.js';
export default {
	// 分类列表
	storeCateList(param) {
		return req.get("store/app/IndexStore/storeCateList", param)
	},
	// 门店列表
	storeList(param) {
		return req.get("store/app/IndexStore/storeList", param)
	},
	// 门店详情
	storeInfo(param) {
		return req.get("store/app/IndexStore/storeInfo", param)
	},
	// 门店服务列表
	storeServiceList(param) {
		return req.get("store/app/IndexStore/storeServiceList", param)
	},
	// 门店评价列表
	commentList(param) {
		return req.get("store/app/IndexStore/commentList", param)
	}
}
