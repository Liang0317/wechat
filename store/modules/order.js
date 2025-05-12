import $util from "@/utils/index.js"
import $api from "@/api/index.js"
import {
	req
} from '@/utils/req.js';
export default {
	state: {
		pageActive: false,
		// pay_type 1待支付，2待服务，3技-师接单，4技-师出发，5技-师到达，6服务中，7已完成
		activeIndex: 0,
		tabList: [{
			title: '全部',
			id: 0
		}, {
			title: '待支付',
			id: 1,
			// number: 10
		}, {
			title: '待服务',
			id: 5
		}, {
			title: '服务中',
			id: 6
		}, {
			title: '已完成',
			id: 7
		}],
		param: {
			page: 1,
			pay_type: 0,
		},
		list: {
			data: [],
			last_page: 1,
			current_page: 1
		},
		carList: {},
		haveOperItem: false,
		bellOrderParams: {},
		alipayOrderParams: {},
		isUserMedia: false,
		recorder: null,
		recorder_status: false,
		recorder_order_id: 0,
		coach_travel_order_id: 0,
		coach_travel_arrive_id: 0,
		order_unix_list: []
	},
	mutations: {
		updateOrderItem(state, item) {
			let {
				key,
				val
			} = item
			state[key] = val
		}
	},
	actions: {
		async getOrderList({
			commit,
			state
		}, param) {
			let d = await $api.order.orderList(param)
			let oldList = state.list;
			let newList = d;
			let list = {}
			if (param.page == 1) {
				let {
					current_page = 0
				} = newList
				if (!current_page) {
					newList = {
						data: [],
						last_page: 1,
						current_page: 1
					}
				}
				list = newList;
			} else {
				newList.data = oldList.data.concat(newList.data)
				list = newList;
			}
			commit('updateOrderItem', {
				key: 'list',
				val: list
			})
		},
		// 获取购物车数据
		async getCarList({
			commit,
			state
		}, param) {
			let carList = await $api.order.carInfo(param)
			carList.list.map(item => {
				item.checked = false
			})
			commit('updateOrderItem', {
				key: 'carList',
				val: carList
			})
		},
	}
}