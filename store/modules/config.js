import $util from "@/utils/index.js"
import $api from "@/api/index.js"
export default {
	state: {
		old_attendant_name: '技师',
		old_channel_menu_name: '渠道商',
		configInfo: {
			id: 0,
			isIos: uni.getSystemInfoSync().system.includes('iOS'),
			navBarHeight: uni.getSystemInfoSync().statusBarHeight * 1 + 44,
			curSysHeight: '',
			tabbarHeight: '',
			methodObj: {
				1: 'call',
				2: 'miniProgram',
				3: 'web',
				4: 'navigateTo'
			},
			tabBar: [],
		},
		pageArr: ['/pages/service', '/pages/technician', '/pages/shopstore', '/pages/dynamic', '/pages/map',
			'/pages/order', '/pages/mine'
		],
		play_method: [{
			method: 'onPlay',
			msg: '开始播放',
			status: true,
		}, {
			method: 'onStop',
			msg: '结束播放',
			status: false,
		}, {
			method: 'onError',
			msg: '报错Error',
			status: false,
		}, {
			method: 'onEnded',
			msg: '自然结束播放',
			status: false,
		}],
		audioBg: {},
		audioType: 'service_start_recording',
		playBg: false,
		isHaveAudio: false
	},
	mutations: {
		//修改信息
		updateConfigItem(state, item) {
			let {
				key,
				val
			} = item
			state[key] = val
			if (!['configInfo', 'audioType'].includes(key)) return
			let src = state.configInfo[state.audioType]
			if (key == 'configInfo') {
				uni.setStorageSync('configInfo', val)
			}
			if (key == 'audioType') {
				// if (!src) return
				if (state.playBg) {
					state.audioBg.stop()
				}
			}
			if (state.isHaveAudio) {
				state.audioBg.src = src || ''
				if (key == 'configInfo') return
			} else {
				if (!src) return
				state.audioBg = uni.createInnerAudioContext();
				state.isHaveAudio = true
				state.audioBg.src = src
				// #ifndef APP-PLUS
				state.audioBg.obeyMuteSwitch = false
				// #endif
				state.play_method.map(item => {
					state.audioBg[item.method](() => {
						console.log('bg=>', item.msg)
						state.playBg = item.status;
					})
				})
			}
			if (key == 'audioType') {
				state.audioBg.play()
			}
		}
	},
	actions: {
		// 获取基本配置
		async getConfigInfo({
			commit,
			state
		}, param) {
			let rules_status = 0
			if (param && param.rules_status) {
				rules_status = param.rules_status
			}
			let config = await $api.base.configInfo({
				rules_status: rules_status == 0 ? 1 : 0
			})
			if (!config.primaryColor) {
				config.primaryColor = '#A40035'
			}
			if (!config.subColor) {
				config.subColor = '#F1C06B'
			}
			if (!config.user_image) {
				config.user_image = 'https://lbqny.migugu.com/admin/anmo/mine/bg.png'
			}
			if (!config.coach_image) {
				config.coach_image = 'https://lbqny.migugu.com/admin/anmo/mine/bg.png'
			}
			if (!config.service_btn_color) {
				config.service_btn_color = '#282B34'
			}
			if (!config.service_font_color) {
				config.service_font_color = '#EBDDB1'
			}
			if (!config.user_font_color) {
				config.user_font_color = '#ffffff'
			}
			if (!config.coach_font_color) {
				config.coach_font_color = '#ffffff'
			}

			let base_config = $util.pick(state.configInfo, ['isIos', 'navBarHeight', 'curSysHeight',
				'tabbarHeight', 'methodObj'
			])

			let data = Object.assign({}, config, base_config)
			commit('updateConfigItem', {
				key: 'configInfo',
				val: data
			})
		},
		toPlayAudio({
			commit,
			state
		}, param) {
			let {
				key
			} = param
			console.log("toPlayAudio========", key)
			commit('updateConfigItem', {
				key: 'audioType',
				val: key
			})
		}
	}
}