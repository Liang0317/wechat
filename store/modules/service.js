import $api from "@/api/index.js"
import $util from "@/utils/index.js"
import $store from "@/store/index.js"
export default {
	state: {
		pageActive: false,
		activeIndex: 0,
		tabList: [{
			title: '全部',
			sort: 'top desc',
		}, {
			title: '价格',
			sort: 'price',
			sign: 0,
			is_sign: 1,
		}, {
			title: '销量',
			sort: 'total_sale',
			sign: 0,
			is_sign: 1,
		}, {
			title: '好评度',
			sort: 'star',
			sign: 0,
			is_sign: 1,
		}],
		param: {
			page: 1,
			sort: ''
		},
		list: {
			data: [],
			last_page: 1,
			current_page: 1
		},
		banner: [],
		service_cate: [],
		service_all_cate: [],
		recommend_list: [],
		recommend_style: 1,
		have_coupon: false
	},
	mutations: {
		async updateServiceItem(state, item) {
			let {
				key,
				val
			} = item
			state[key] = val
		}
	},
	actions: {
		async getServiceIndex({
			commit,
			state
		}, param) {
			let d = await $api.service.index(param);
			let {
				banner = [],
					service_cate = [],
					recommend_style = 1,
					coach_apply_show = 0,
					have_coupon = false
			} = d

			let {
				attendant_name,
				page = {}
			} = $store.state.config.configInfo
			let cate = $util.deepCopy(service_cate)
			let col_num = 5
			let row_num = 2
			let banner_height = 400
			let service_filter = true
			if (page && page[1] && page[1].length > 0) {
				let bannerInd = page[1].findIndex(item => {
					return item.type == 'banner'
				})
				let sBannerInd = page[1].findIndex(item => {
					return item.type == 'service-banner'
				})
				let columnInd = page[1].findIndex(item => {
					return item.type == 'column'
				})
				if (bannerInd != -1) {
					let {
						style,
						bannerList,
					} = page[1][bannerInd].data
					// #ifdef APP-PLUS
					bannerList = bannerList.filter(item => {
						return item.linkType !== 2
					})
					// #endif
					banner_height = style.number
					banner = bannerList
				}

				let {
					isShowFilter = true
				} = bannerInd == -1 && sBannerInd == -1 ? {
					isShowFilter: true
				} : page[1][bannerInd == -1 ? sBannerInd : bannerInd].data
				service_filter = isShowFilter
				
				if (columnInd != -1) {
					let {
						col,
						row,
						columnList
					} = page[1][columnInd].data
					// #ifdef APP-PLUS
					columnList = columnList.filter(item => {
						return item.linkType !== 2
					})
					// #endif
					cate = columnList
					col_num = col.number
					row_num = row.number
				}
			} else {
				let cateLen = service_cate.length
				if (coach_apply_show) {
					cate.splice(cateLen > 4 ? 4 : cateLen, 0, {
						id: -1,
						title: $store.state.config.configInfo.attendant_name + '入驻',
						cover: 'https://lbqny.migugu.com/admin/anmo/technician/default_technician.png',
						url: '/technician/pages/apply?type=1'
					})
				}
				let num = ((coach_apply_show && cateLen > 28) || (!coach_apply_show && cateLen > 29)) ? 29 :
					coach_apply_show ? cateLen + 1 : cateLen
				cate = cate.slice(0, num)
				if ((cateLen > (coach_apply_show ? 28 : 29))) {
					cate.push({
						id: 0,
						title: '全部分类',
						cover: '',
						icon: 'iconfenleiyingyongtongzhi2',
						url: '/user/pages/service/cate'
					})
				}
				let cateInd = service_cate.findIndex(item => {
					return item.id == 0
				})
				if (cateInd !== -1) {
					service_cate.splice(cateInd, 1)
				}
			}
			commit('updateServiceItem', {
				key: 'banner',
				val: {
					list: banner,
					banner_height,
					service_filter
				}
			})
			commit('updateServiceItem', {
				key: 'service_cate',
				val: {
					list: cate,
					col_num,
					row_num
				}
			})
			commit('updateServiceItem', {
				key: 'service_all_cate',
				val: service_cate
			})
			commit('updateServiceItem', {
				key: 'recommend_style',
				val: recommend_style
			})
			commit('updateServiceItem', {
				key: 'have_coupon',
				val: have_coupon
			})
		},
		async getRecommendList({
			commit,
			state
		}, param) {
			let d = await $api.service.recommendList(param)
			commit('updateServiceItem', {
				key: 'recommend_list',
				val: d
			})
		},
		async getServiceList({
			commit,
			state
		}, param) {
			let {
				realtime_location = 0
			} = $store.state.config.configInfo
			if (!realtime_location) {
				delete param.lat
				delete param.lng
			}
			let methodModel = realtime_location ? 'getCoachService' : 'serviceList'
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
			commit('updateServiceItem', {
				key: 'list',
				val: list
			})
		}
	},
}