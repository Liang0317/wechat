import $util from "@/utils/index.js"
import $api from "@/api/index.js"
import $store from "@/store/index.js"
import {
	req
} from '@/utils/req.js';
export default {
	state: {
		autograph: '',
		userInfo: {},
		appLogin: '',
		loginType: '',
		loginPage: '',
		isGzhLogin: false,
		isShowLogin: false,
		locationChange: false,
		commonOptions: {
			id: 0,
			pid: 0,
			admin_id: 0,
			coach_id: 0,
			channel_id: 0,
		},
		location: {
			lat: '',
			lng: '',
			address: '',
			is_util_loca: 0
		},
		locaRefuse: false,
		changeAddr: false,
		isShowAuth: true,
		mineInfo: {}, // 用户个人中心
		userPageType: 2, // 1用户，2技-师
		coachInfo: {},
		userCoachStatus: {},
		useChooseLocation: false,
		changeOnAddr: {},
		noChangeLoca: {
			noloca: false
		},
		haveShieldOper: 0,
		personVerifyUrl: '',
		fddExtsign: '',
		oldMovable: {
			x: 0,
			y: 0
		},
		userPrivacySetting: {},
		resolvePrivacy: {},
		wecom_staff: '',
		scanRecordId: 0
	},
	mutations: {
		//更新内容
		async updateUserItem(state, item) {
			let {
				key,
				val
			} = item
			if (key == 'userInfo' && val && val.id) {
				let {
					phone = '',
						create_time,
						alipay_number = '',
						bank_card_id = ''
				} = val
				if (phone) {
					val.split_phone = phone.substring(0, 3) + '****' + phone.substring(7, 11)
				}
				val.create_date = $util.formatTime(create_time * 1000, 'YY-M-D')
				if (alipay_number) {
					let len = alipay_number.length
					val.split_alipay_number = alipay_number.substring(0, len > 3 ? 3 : 1) + '***'
					if (len > 6) {
						val.split_alipay_number += alipay_number.substring(len == 6 ? len - 2 :
							len - 3, len)
					}
				}
				if (bank_card_id) {
					val.split_card_id = bank_card_id.substring(0, 4) + '***' + bank_card_id.substring(
						bank_card_id.length - 4, bank_card_id.length)
				}
			}

			if (key == 'mineInfo' && val && val.id == -1) {
				let storeArr = ['userInfo', 'appLogin', 'loginType', 'loginPage', 'isShowLogin',
					'isGzhLogin'
				]
				storeArr.map(key => {
					let syncVal = key == 'isShowLogin' ? true : ''
					state[key] = syncVal
					uni.setStorageSync(key, syncVal)
				})
			}

			if (['autograph', 'userInfo', 'location', 'appLogin', 'loginType', 'loginPage', 'isShowLogin',
					'isGzhLogin'
				]
				.includes(key)) {
				uni.setStorageSync(key, val)
			}
			// #ifdef APP-PLUS
			if (key === 'location') {
				let locaRefuse = !val || (val && !val.lat && !val.lng) ? true : false
				state.locaRefuse = locaRefuse
				uni.setStorageSync('locaRefuse', locaRefuse)
			}

			if (key === 'locaRefuse') {
				uni.setStorageSync('locaRefuse', val)
			}
			// #endif

			state[key] = val
		}
	},
	actions: {
		//获取个人信息
		async getUserInfo({
			commit,
			state
		}, param) {
			let data = await $api.user.userInfo()
			let {
				id
			} = data
			if (!id) {
				data = {
					avatarUrl: `https://lbqny.migugu.com/admin/farm/default-user.png`
				}
			}
			commit('updateUserItem', {
				key: 'userInfo',
				val: data
			})
		},
		//获取用户个人中心数据
		async getMineInfo({
			commit,
			state
		}, param) {
			let data = await $api.mine.index()
			let {
				id = 0,
					fx_status
			} = data
			if (!id) {
				data = {
					id: -1
				}
			}
			let {
				fx_check = 0
			} = $store.state.config.configInfo
			data.is_fx = !fx_check || (fx_check && fx_status == 2)
			commit('updateUserItem', {
				key: 'mineInfo',
				val: data
			})
		},
		//获取技-师信息
		async getCoachInfo({
			commit,
			state
		}, param) {
			let data = await $api.technician.coachIndex()
			commit('updateUserItem', {
				key: 'coachInfo',
				val: data
			})
		},
		//获取技-师信息
		async getUserCoachStatus({
			commit,
			state
		}, param = {
			delay: 0
		}) {
			let {
				delay = 0
			} = param
			let data = await $api.mine.getUserCoachStatus()
			let {
				status = -1,
					coach_position = 0
			} = data
			data.auto_coach_position = coach_position
			commit('updateUserItem', {
				key: 'userCoachStatus',
				val: data
			})
		},
		//获取客服
		async getWecomStaff({
			commit,
			state
		}, param) {
			let data = await $api.mine.getWecomStaff()
			commit('updateUserItem', {
				key: 'wecom_staff',
				val: data
			})
		},
		//添加扫码记录
		async addScanRecord({
			commit,
			state
		}, param) {
			let data = await $api.mine.addScanRecord(param)
			if (data) {
				commit('updateUserItem', {
					key: 'scanRecordId',
					val: data
				})
			}
		},
		//更新扫码记录
		async updateScanRecord({
			commit,
			state
		}, param) {
			let id = state.scanRecordId
			let data = await $api.mine.updateScanRecord({
				id
			})
			commit('updateUserItem', {
				key: 'scanRecordId',
				val: 0
			})
		},
		// 获取用户信息
		async getAuthUserProfile({
			commit,
			state
		}, param) {
			let {
				nickName,
				avatarUrl
			} = param
			await $api.user.userUpdate(param)
			let data = Object.assign({}, state.userInfo, {
				nickName,
				avatarUrl
			})
			commit('updateUserItem', {
				key: 'userInfo',
				val: data
			})
		},
		// 获取手机号
		async getAuthPhone({
			commit,
			state
		}, {
			e = {
				detail: {}
			},
			must = false
		} = {}) {
			let {
				encryptedData = '', iv = ''
			} = e.detail;
			let phone = ''
			if (encryptedData && iv) {
				let phone = await $api.user.reportPhone({
					encryptedData,
					iv
				})
				let data = Object.assign({}, state.userInfo, {
					phone
				})
				commit('updateUserItem', {
					key: 'userInfo',
					val: data
				})
				return phone;
			}
		},
		async getPrivacySetting({
			commit,
			state
		}, param) {
			// #ifdef MP-WEIXIN
			wx.getPrivacySetting({
				success: res => {
					// 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
					commit('updateUserItem', {
						key: 'userPrivacySetting',
						val: res
					})
				},
				fail: () => {},
				complete: () => {}
			})
			// #endif
			// #ifndef MP-WEIXIN
			commit('updateUserItem', {
				key: 'userPrivacySetting',
				val: {
					needAuthorization: false,
					privacyContractName: ''
				}
			})
			// #endif
		},
		// 更新公共参数
		async updateCommonOptions({
			commit,
			state
		}, param) {
			let target = {}
			if (param.scene) {
				let res = await $api.base.getWxCodeData({
					code_id: param.scene
				})
				target = Object.assign({}, state.commonOptions, res.data)
			} else {
				target = Object.assign({}, state.commonOptions, param)
			}
			let data = $util.pick(target, ['id', 'pid', 'admin_id', 'channel_id', 'coach_id'])
			commit('updateUserItem', {
				key: 'commonOptions',
				val: data
			})
			return target
		}
	}
}