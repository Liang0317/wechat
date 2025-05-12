import $api from "@/api/index.js"
import $store from "@/store/index.js"
export default {
	state: {
		pageActive: false,
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
		yearList: [{
			id: 0,
			title: '不限',
			year: [0, 0]
		}, {
			id: 1,
			title: '1-3年',
			year: [1, 3]
		}, {
			id: 2,
			title: '3-5年',
			year: [3, 5]
		}, {
			id: 3,
			title: '5-10年',
			year: [5, 10]
		}, {
			id: 4,
			title: '10年以上',
			year: [10, 200]
		}],
		map: {
			latitude: 0,
			longitude: 0,
			scale: 16,
			controls: []
		},
		covers: [],
		service_cate: [],
		param: {
			page: 1,
			sex: -1,
			year: 0,
			cate_id: 0,
			activeIndex: 0,
			coach_name: '',
			service_time: ''
		},
		check: {
			sex: -1,
			year: 0,
			coach_name: '',
			service_time: ''
		},
		mapList: [],
		list: {
			data: [],
			last_page: 1,
			current_page: 1
		},
		mapType: 'map'
	},
	mutations: {
		async updateMapItem(state, item) {
			let {
				key,
				val
			} = item

			state[key] = val
		}
	},
	actions: {
		async getMapIndex({
			commit,
			state
		}, param) {
			let d = await $api.service.serviceCateList(param)
			d.unshift({
				id: 0,
				title: '全部'
			})
			commit('updateMapItem', {
				key: 'service_cate',
				val: d
			})
		},
		async getMapList({
			commit,
			state
		}, param) {
			let d = await $api.service.mapCoachList(param)
			let map = Object.assign({}, state.map, {
				latitude: param.lat,
				longitude: param.lng,
			})
			let arr = []


			d.map((item, index) => {
				arr.push({
					id: index,
					latitude: item.lat,
					longitude: item.lng,
					iconPath: item.work_img,
					width: 40,
					height: 40
				})
			})
			commit('updateMapItem', {
				key: 'map',
				val: map
			})
			commit('updateMapItem', {
				key: 'covers',
				val: arr
			})
			commit('updateMapItem', {
				key: 'mapList',
				val: d
			})
		},
		async getMapCoachList({
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
			commit('updateMapItem', {
				key: 'list',
				val: list
			})
		}
	},
}