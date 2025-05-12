<template>
	<view class="pages-technician">
		<fixed :initHeight="configInfo">
			<block v-if="configInfo.user_update_location">
				<uni-nav-bar :fixed="false" :shadow="false" :statusBar="true" :onlyLeft="true" :color="`#fff`"
					:backgroundColor="primaryColor">
					<view @tap.stop="toChooseLocation" class="map-info flex-y-center" slot="left">
						<view class="flex-y-center c-base">
							<i class="iconfont iconjuli mr-sm"></i>
							<view class="map-text max-400 ellipsis">
								{{location&&location.address ?location.address : isLoad ? '定位失败' : '定位中...'}}
							</view>
							<i class="iconfont icon-down"></i>
						</view>
					</view>
				</uni-nav-bar>
			</block>
			<block v-else>
				<!-- #ifndef H5 -->
				<uni-nav-bar :fixed="false" :shadow="false" :statusBar="true" :title="navTitle" color="#ffffff"
					:backgroundColor="primaryColor">
				</uni-nav-bar>
				<!-- #endif -->
			</block>

			<view class="fix-info choose fill-body rel">
				<!-- #ifdef H5 -->
				<view class="space-top abs" :style="{background:primaryColor}" v-if="configInfo.user_update_location">
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view class="space-top abs" :style="{background:primaryColor}"></view>
				<!-- #endif -->
				<view class="search-info fill-base pt-lg pl-lg pr-lg pb-md abs">
					<view class="flex-center pb-md">
						<view class="city-info">
							<picker @change="pickerChange($event)" :value="cityIndex" :range="cityList"
								range-key="title">
								<view class="city-info flex-y-center">
									<view>
										<block v-if="cityList&&cityList.length > 0">
											{{cityIndex === -1 ? '未知' : cityList[cityIndex].title.length > 3 ? cityList[cityIndex].title.substring(0,3) + '...':cityList[cityIndex].title}}
										</block>
										<block v-else>请选择</block>
									</view>
									<i class="iconfont iconshaixuanxia-1 ml-sm"></i>
								</view>
							</picker>
						</view>
						<view class="flex-1">
							<search @input="toSearch" type="input" :keyword="param.coach_name" :padding="0" :radius="30"
								backgroundColor="#F0F0F0" :placeholder="'请输入'+$t('action.attendantName')+'姓名'">
							</search>
						</view>
					</view>
				</view>
			</view>
		</fixed>


		<view class="ml-md mr-md" :class="[{'flex-warp':[2,3].includes(configInfo.coach_list_format)}]"
			v-if="list.data && list.data.length>0">

			<view
				:class="[{'mt-md':(configInfo.coach_list_format===1) || [2,3].includes(configInfo.coach_list_format)},{'mr-md':[2,3].includes(configInfo.coach_list_format) && index%2==0}]"
				v-for="(item,index) in list.data" :key="index">
				<technician-list-item @comment="toShowPopup(index,'message')" @collect="toCollect(index)"
					@order="toOrder(index)" :info="item">
				</technician-list-item>
			</view>
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0&&location.lng" :loading="loading"
			v-if="loading">
		</load-more>

		<block v-if="!loading&&list.data.length<=0&&list.current_page==1">
			<abnor v-if="location.lat&&location.lng">
			</abnor>
			<block v-if="!location.lat&&!location.lng">
				<!-- #ifdef H5 -->
				<abnor type="NOT_LOCATION" :title="`暂无${$t('action.attendantName')}数据`"></abnor>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<abnor type="NOT_LOCATION" :title="`暂无${$t('action.attendantName')}数据`" @confirm="toOpenLocation"
					:button="[{ text: '开启定位' , type: 'confirm' }]" btnSize=""></abnor>
				<!-- #endif -->
			</block>
		</block>

		<technician-list-popup ref="technician_list_popup"></technician-list-popup>

		<uni-popup ref="choose_city_item" type="top" :custom="true" :zIndex="999">
			<!-- #ifdef H5 -->
			<view :style="{height:configInfo.user_update_location ? configInfo.navBarHeight + 8 + 'px' : '9px'}"></view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view :style="{height:configInfo.navBarHeight + 8 + 'px'}"></view>
			<!-- #endif -->
			<view class="choose-city-popup rel">
				<image class="city-img" src="https://lbqny.migugu.com/admin/anmo/technician/no_city.png"></image>
				<view class="text f-paragraph c-base abs">
					很抱歉,该城市未开通, 点击左上角切换其他城市下单服务
				</view>
				<view class="flex-between">
					<view></view>
					<view @tap.stop="$refs.choose_city_item.close()"
						class="item-btn flex-center f-paragraph c-title text-bold radius">知道了</view>
				</view>
			</view>
		</uni-popup>


		<view class="space-max-footer"></view>
		<fix-bottom-button @confirm="toBack" :text="[{type:'confirm',text:pageLen>1?`返回上页`:`返回首页`}]" bgColor="#fff">
		</fix-bottom-button>

		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import technicianListItem from "@/components/technician-list-item.vue"
	import technicianListPopup from "@/components/technician-list-popup.vue"
	export default {
		components: {
			technicianListItem,
			technicianListPopup
		},
		data() {
			return {
				isLoad: false,
				options: {},
				navTitle: '',
				param: {
					page: 1,
					ser_id: 0,
					coach_name: ''
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false,
				pageLen: 1
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			cityId: state => state.technician.cityId,
			cityIndex: state => state.technician.cityIndex,
			cityList: state => state.technician.cityList,
			loginType: state => state.user.loginType,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			changeAddr: state => state.user.changeAddr,
			locaRefuse: state => state.user.locaRefuse,
			useChooseLocation: state => state.user.useChooseLocation,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		async onLoad(options) {
			console.log("====onLoad choose-technician")
			this.options = options
			// #ifndef H5
			this.$util.showLoading()
			// #endif
			await this.initIndex()
			let title = `选择${this.$t('action.attendantName')}`
			this.navTitle = title
			uni.setNavigationBarTitle({
				title
			})
			this.isLoad = true
		},
		async onShow() {
			if (this.useChooseLocation) {
				this.updateUserItem({
					key: 'useChooseLocation',
					val: false
				})
			}
			if (!this.location.lat && this.locaRefuse) {
				this.toResetUtilLoca()
			}
		},
		onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif 
			this.updateUserItem({
				key: 'changeAddr',
				val: false
			})
			this.initRefresh();
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.list.current_page >= this.list.last_page || this.loading) return;
			this.param.page = this.param.page + 1;
			this.loading = true;
			this.getList();
		},
		watch: {
			locaRefuse(newval, oldval) {
				if (!newval) {
					this.toResetUtilLoca()
				}
			},
			changeOnAddr(newval, oldval) {
				let {
					noloca,
					refresh
				} = this.noChangeLoca
				if (newval && noloca) {
					this.initUtilLocaData(refresh)
				}
			},
			noChangeLoca(newval, oldval) {
				setTimeout(() => {
					let {
						lat,
						lng,
						unix = 0
					} = this.changeOnAddr
					let {
						noloca,
						refresh
					} = this.noChangeLoca
					let cur_unix = this.$util.DateToUnix(this.$util.formatTime(new Date(), 'YY-M-D h:m:s'))
					if (noloca && ((!lat && !lng) || !unix || (unix && (cur_unix - unix >= 1)))) {
						this.getUtilLocation(refresh)
					}
				}, 800)
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getCityList']),
			...mapMutations(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				this.pageLen = getCurrentPages().length
				this.getList(refresh === false ? this.cityList.length == 0 : true)
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			async toResetUtilLoca() {
				// #ifdef APP-PLUS
				let {
					lat: locaLat = 0
				} = this.location
				if (!locaLat) {
					let {
						lng = 0,
							lat = 0
					} = await this.$util.getUtilLocation()
					if (!lat && !lng) return
					await this.initRefresh()
				}
				// #endif
			},
			async toOpenLocation() {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				await this.$util.checkAuth({
					type: 'userLocation',
					checkApp: true
				})
				// #ifdef MP-WEIXIN
				this.initRefresh()
				// #endif
			},
			pickerChange(e, val) {
				let ind = e.target.value
				this.updateTechnicianItem({
					key: 'cityIndex',
					val: ind
				})
				this.updateTechnicianItem({
					key: 'cityId',
					val: this.cityList[ind].id
				})
				this.param.page = 1
				this.getList()
			},
			toSearch(val) {
				this.param.page = 1
				this.param.coach_name = val
				this.getList()
			},
			// 选择地区
			async toChooseLocation() {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				this.updateUserItem({
					key: 'useChooseLocation',
					val: true
				})
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					let wxReady = await this.$jweixin.wxReady2();
					let {
						latitude,
						longitude
					} = wxReady ? await this.$jweixin.getWxLocation() : {
						latitude: 0,
						longitude: 0
					}
					this.initChooseLoca({
						latitude,
						longitude
					})
				}
				// #endif
				// #ifdef APP-PLUS 
				if (!this.location.lat) {
					await this.$util.checkAuth({
						type: 'userLocation',
						checkApp: true
					})
					this.updateUserItem({
						key: 'useChooseLocation',
						val: false
					})
					return
				}
				let {
					lat: latitude,
					lng: longitude
				} = await this.$util.getLocation()
				this.initChooseLoca({
					latitude,
					longitude
				})
				// #endif 
				// #ifdef MP-WEIXIN
				await this.$util.checkAuth({
					type: 'userLocation'
				})
				this.initChooseLoca()
				// #endif
			},
			async initChooseLoca(param = {}) {
				let [err, loca_data] = await uni.chooseLocation(param)
				let {
					name = '',
						address = '',
						latitude: lat = '',
						longitude: lng = ''
				} = err ? {
					name: '',
					address: '',
					latitude: '',
					longitude: ''
				} : loca_data
				address = address || name
				let location = {
					lat,
					lng,
					address,
					province: '',
					city: '',
					district: ''
				}
				this.updateUserItem({
					key: 'useChooseLocation',
					val: false
				})
				if (!lat) return
				if (this.realtimeTimer) clearInterval(this.realtimeTimer)
				this.updateUserItem({
					key: 'location',
					val: location
				})
				this.updateUserItem({
					key: 'changeAddr',
					val: true
				})
				this.param.page = 1
				await this.getCityList({
					lng,
					lat,
					change: 1
				})
				await this.getList()
			},
			async getList(refresh = false) {
				let {
					location,
					changeAddr
				} = this

				let {
					realtime_location = 0
				} = this.configInfo

				let {
					status: coach_status,
					coach_position
				} = this.userCoachStatus

				if (this.param.page == 1 && ((!location.lat || (location.lat && location.address == '暂未获取到位置信息')) || (
						refresh && realtime_location && !changeAddr))) {
					if (coach_status == 2 && coach_position) {
						let {
							lat: change_lat = 0,
							lng: change_lng = 0,
							unix = 0
						} = this.changeOnAddr
						let cur_unix = this.$util.DateToUnix(this.$util.formatTime(new Date(), 'YY-M-D h:m:s'))
						let noloca = change_lat && change_lng && (unix && (cur_unix - unix < 3)) ? false : true
						if (!noloca) {
							let loca = Object.assign({}, this.location, {
								lat: change_lat,
								lng: change_lng,
								is_util_loca: 1
							})
							this.updateUserItem({
								key: 'location',
								val: loca
							})
						}
						this.updateUserItem({
							key: 'noChangeLoca',
							val: {
								noloca,
								refresh
							}
						})
						if (this.noChangeLoca.noloca) return
						this.initUtilLocaData(refresh)
					} else {
						this.getUtilLocation(refresh)
					}
					this.updateServiceItem({
						key: 'pageActive',
						val: false
					})
					this.updateMapItem({
						key: 'pageActive',
						val: false
					})
					return
				}
				this.initUtilLocaData(refresh)
			},
			async getUtilLocation(refresh) {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					let wxReady = await this.$jweixin.wxReady2();
					let {
						latitude: lat = 0,
						longitude: lng = 0
					} = wxReady ? await this.$jweixin.getWxLocation() : {
						latitude: 0,
						longitude: 0
					}
					let val = Object.assign({}, this.location, {
						lat,
						lng,
						is_util_loca: 1
					})
					this.updateUserItem({
						key: 'location',
						val
					})
					this.initUtilLocaData(refresh)
				}
				// #endif
				// #ifndef H5
				let {
					lat = 0,
						lng = 0
				} = await this.$util.getLocation()
				let val = Object.assign({}, this.location, {
					lat,
					lng,
					is_util_loca: 1
				})
				this.updateUserItem({
					key: 'location',
					val
				})
				this.initUtilLocaData(refresh)
				// #endif
			},
			async initUtilLocaData(refresh) {
				this.updateUserItem({
					key: 'noChangeLoca',
					val: {
						noloca: false
					}
				})
				let {
					changeAddr
				} = this

				let {
					realtime_location = 0
				} = this.configInfo
				let {
					lng = 0,
						lat = 0,
						is_util_loca = 0
				} = this.location
				if (refresh) {
					await this.getCityList({
						lng,
						lat,
						change: 1
					})
				}

				let {
					id: ser_id,
					store_id = 0
				} = this.options
				let {
					list: oldList,
					param,
					cityList,
					cityIndex,
					cityId: city_id
				} = this

				let ind = cityList.findIndex(item => {
					return item.id == city_id
				})

				if (ind == -1) {
					this.$refs.choose_city_item.open()
					this.loading = false
					this.$util.hideAll()
					this.list = {
						data: [],
						last_page: 1,
						current_page: 1
					}
					return
				}

				city_id = ind == -1 ? 0 : city_id
				cityIndex = ind == -1 ? 0 : ind


				this.updateTechnicianItem({
					key: 'cityIndex',
					val: cityIndex
				})

				this.updateTechnicianItem({
					key: 'cityId',
					val: city_id
				})

				param = Object.assign({}, param, {
					ser_id,
					city_id,
					lat,
					lng,
					store_id
				})

				let {
					coach_format = 1
				} = this.configInfo

				let methodModel = coach_format == 1 ? 'serviceCoachList' : 'typeServiceCoachList'

				let newList = await this.$api.service[methodModel](param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
				if (param.page == 1 && (is_util_loca || (realtime_location && !changeAddr))) {
					this.$util.getMapInfo(true, {}, changeAddr)
				}
			},
			async toShowPopup(index, key) {
				this.$refs.technician_list_popup.toShowPopup(this.list.data[index], key)
			},
			async toCollect(index) {
				let {
					id,
					is_collect,
					collect_num
				} = this.list.data[index]
				let methodModel = is_collect ? 'delCollect' : 'addCollect'
				await this.$api.mine[methodModel]({
					coach_id: id
				})
				this.$util.showToast({
					title: is_collect ? '取消成功' : '收藏成功'
				})
				this.list.data[index].is_collect = is_collect == 1 ? 0 : 1
				this.list.data[index].collect_num = is_collect == 1 ? collect_num - 1 : collect_num + 1
			},
			// 预约
			async toOrder(index) {
				let {
					id: coach_id,
					is_work = 0
				} = this.list.data[index]
				if (!is_work) return
				let {
					id: service_id
				} = this.options
				if (this.lockTap) return;
				this.lockTap = true;
				try {
					await this.$api.order.addCar({
						service_id,
						coach_id,
						num: 1,
						is_top: 1,
						coach_service: 1
					})
					this.lockTap = false
					let url = `/user/pages/order?id=${coach_id}&ser_id=${service_id}`
					this.$util.goUrl({
						url
					})
				} catch (e) {
					this.lockTap = false
				}
			},
			toBack() {
				let {
					pageLen
				} = this
				let url = pageLen > 1 ? 1 : `/pages/service`
				let openType = pageLen > 1 ? `navigateBack` : `reLaunch`
				this.$util.goUrl({
					url,
					openType
				})
			}
		}
	}
</script>


<style lang="scss">
</style>