import $api from "@/api/index.js"
import $store from "@/store/index.js"
export default {
	state: {
		pageActive: false,
		haveOperItem: false,
		activeIndex: 0,
		tabList: [{
			title: '全部',
			id: 0,
		}, {
			title: '可服务',
			id: 1,
		}, {
			title: '服务中',
			id: 2
		}, {
			title: '可预约',
			id: 3
		}],
		sexList: [{
			id: -1,
			title: '不限'
		}, {
			id: 0,
			title: '男'
		}, {
			id: 1,
			title: '女'
		}],
		serviceTypeList: [{
			id: 0,
			title: '不限'
		}, {
			id: 2,
			title: '上门'
		}, {
			id: 1,
			title: '到店'
		}],
		cityId: 0,
		cityIndex: -1,
		cityList: [],
		serviceCateList: [],
		check: {
			sex: -1,
			cate_id: 0,
			recommend: 0,
			free_fare: 0,
			service_type: 0, // 1到店，2上门
			store_name: ''
		},
		param: {
			page: 1,
			ser_id: 0,
			coach_name: ''
		},
		list: {
			data: [],
			last_page: 1,
			current_page: 1
		}
	},
	mutations: {
		async updateTechnicianItem(state, item) {
			let {
				key,
				val
			} = item
			state[key] = val
		}
	},
	actions: {
		async getServiceCate({
			commit,
			state
		}, param) {
			let d = await $api.service.serviceCateList()
			commit('updateTechnicianItem', {
				key: 'serviceCateList',
				val: d
			})
		},
		async getCityList({
			commit,
			state
		}, param) {
			let {
				lat,
				lng,
				change = 0
			} = param
			let d = await $api.base.getCity({
				lat,
				lng
			})
			let {
				cityId = 0
			} = state
			let ind = d.findIndex(v => {
				return change || !cityId ? v.is_select : v.id == cityId
			})
			commit('updateTechnicianItem', {
				key: 'cityList',
				val: d
			})
			let cityIndex = ind
			commit('updateTechnicianItem', {
				key: 'cityIndex',
				val: cityIndex
			})
			commit('updateTechnicianItem', {
				key: 'cityId',
				val: d && d.length > 0 && cityIndex !== -1 ? d[cityIndex].id : 0
			})
		},
		async getServiceCoachList({
			commit,
			state
		}, param) {
			let {
				coach_format = 1
			} = $store.state.config.configInfo
			let methodModel = coach_format == 1 ? 'serviceCoachList' : 'typeServiceCoachList'
			let d = await $api.service[methodModel](param)
			let oldList = state.list;
			let newList = d;
			let list = {}
			if (param.page == 1) {
				list = newList;
			} else {
				newList.data = oldList.data.concat(newList.data)
				list = newList;
			} 
			commit('updateTechnicianItem', {
				key: 'list',
				val: list
			})
		}
	},
}