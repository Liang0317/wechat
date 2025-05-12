<template>
	<view class="pages-map">

		<block v-if="isLoad">
			<block v-if="configInfo.plugAuth.map">

				<fixed @height="initFixHeight" :zIndex="990">
					<view class="fill-base" style="height:196rpx">
						<view class="map-info flex-between pd-lg">
							<view @tap.stop="toChooseLocation" class="flex-y-center">
								<i class="iconfont iconjuli mr-sm"></i>
								<view class="f-mini-title c-title max-400 ellipsis">
									{{location&&location.address ?location.address : '定位中...'}}
								</view>
								<i class="iconfont icon-down"></i>
							</view>
							<view class="map-list-item flex-y-center">
								<view @tap.stop="toChangeItem('map')" class="list-btn flex-center f-icontext rel"
									:style="{color:mapType=='map'?primaryColor:'',borderColor:mapType=='map'?primaryColor:'',borderRight: mapType=='list'?'none':''}">
									<view class="list-btn abs" :style="{background:primaryColor}" v-if="mapType=='map'">
									</view>
									<i class="iconfont icondituzhaoren2"></i>
									地图
								</view>
								<view @tap.stop="toChangeItem('list')" class="list-btn flex-center f-icontext rel"
									:style="{color:mapType=='list'?primaryColor:'',borderColor:mapType=='list'?primaryColor:'',borderLeft: mapType=='map'?'none':''}">
									<view class="list-btn abs" :style="{background:primaryColor}"
										v-if="mapType=='list'">
									</view>
									<i class="iconfont iconliebiaomoshi2"></i>
									列表
								</view>
							</view>
						</view>

						<view class="tab-info flex-center pr-lg">
							<view class="tab-list-item">
								<tab @change="handerTabChange" :list="service_cate" :activeIndex="param.activeIndex*1"
									:activeColor="primaryColor" height="80rpx" fontSize="28rpx" :numberType="2"
									lineClass="sm">
								</tab>
							</view>
							<view @tap.stop="toPopup('search_item','open')"
								class="tab-select-item flex-1 flex-between ml-sm">
								<view></view>
								<i class="iconfont iconshaixuan"></i>
							</view>
						</view>
					</view>
				</fixed>
				<block v-if="mapType=='map'">
					<block v-if="location.lat && location.lng && location.address">
						<!-- #ifdef APP-PLUS -->
						<a-map ref="amap" @detail="goDetail" :info="{amapKey:configInfo.amap_key,location,mapList}"
							:style="{height: `calc(100vh - ${popupHeight + configInfo.tabbarHeight}px)`}"
							style="overflow: hidden;"></a-map>
						<!-- #endif -->
						<!-- #ifndef APP-PLUS -->
						<map class="map-box"
							:style="{height: `calc(100vh - ${popupHeight + configInfo.tabbarHeight}px)`}"
							:controls="map.controls" :scale="map.scale" :latitude="map.latitude"
							:longitude="map.longitude" :markers="covers" @callouttap="goDetail"
							@markertap="goDetail"></map>
						<!-- #endif -->
					</block>

				</block>

				<block v-if="mapType=='list'">


					<view class="ml-md mr-md" :class="[{'flex-warp':[2,3].includes(configInfo.coach_list_format)}]"
						v-if="list.data && list.data.length>0">

						<view
							:class="[{'mt-md':(configInfo.coach_list_format===1&&index!=0) || [2,3].includes(configInfo.coach_list_format)},{'mr-md':[2,3].includes(configInfo.coach_list_format) && index%2==0}]"
							v-for="(item,index) in list.data" :key="index">
							<technician-list-item @comment="toShowPopup(index,'message')" @collect="toCollect(index)"
								@order="toShowPopup(index,'technician')" :info="item">
							</technician-list-item>
						</view>

					</view>

					<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading"
						v-if="loading">
					</load-more>
					<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1&&location.lng"></abnor>

					<view class="space-footer"></view>
					<technician-list-popup ref="technician_list_popup"></technician-list-popup>
				</block>

				<block
					v-if="!location.lat&&!location.lng && (mapType=='map' || (mapType=='list'&&!loading&&list.data.length<=0&&list.current_page==1))">
					<!-- #ifdef H5 -->
					<abnor type="NOT_LOCATION"></abnor>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<abnor type="NOT_LOCATION" @confirm="toOpenLocation" :button="[{ text: '开启定位' , type: 'confirm' }]"
						btnSize=""></abnor>
					<!-- #endif -->
				</block>

			</block>
			<block v-else>
				<abnor type="NOT_AUTH"></abnor>
			</block>

			<uni-popup @change="toChangePopupShow" ref="search_item" type="top" left="164rpx" :custom="true">
				<view class="search-popup pd-lg fill-base">
					<view class="f-desc c-title text-bold">{{$t('action.attendantName')}}性别
					</view>
					<view class="flex-warp">
						<view @tap.stop="toChangeItem('sex',item.id)"
							class="list-item flex-center mt-md mr-md f-paragraph c-paragraph radius"
							:style="{background:check.sex==item.id?primaryColor:'',color:check.sex==item.id?'#fff':''}"
							v-for="(item,index) in sexList" :key="index">{{item.title}}
						</view>
					</view>
					<view class="f-desc c-title text-bold pt-lg mt-md">从业年份
					</view>
					<view class="flex-warp">
						<view @tap.stop="toChangeItem('year',item.id)"
							class="list-item flex-center mt-md mr-md f-paragraph c-paragraph radius"
							:style="{background:check.year==item.id?primaryColor:'',color:check.year==item.id?'#fff':''}"
							v-for="(item,index) in yearList" :key="index">{{item.title}}
						</view>
					</view>
					<view class="f-desc c-title text-bold pt-lg mt-md">上门时间
					</view>
					<view @tap.stop="toShowDate"
						class="list-item flex-center mt-md mr-md f-paragraph c-paragraph radius rel" style="width:100%">
						{{check.service_time || '选择期望上门时间'}}
						<i @tap.stop="toClearServiceTime" class="iconfont icon-guanbi-fill abs"
							:style="{color:primaryColor}" v-if="check.service_time"></i>
					</view>
					<view class="f-desc c-title text-bold pt-lg mt-md">个性筛选
					</view>
					<input type="text" v-model="check.coach_name" :placeholder="'请输入'+$t('action.attendantName')+'姓名'"
						class="list-item text-center mt-md f-paragraph c-paragraph radius" style="width:100%" />
					<view style="height:60rpx"></view>
					<view class="flex-center">
						<view @tap.stop="toReset" class="search-btn flex-center f-mini-title c-title radius">重置</view>
						<view @tap.stop="toConfirm" class="search-btn flex-center ml-lg f-mini-title c-base radius"
							:style="{background:primaryColor,borderColor:primaryColor}">确定</view>
					</view>
				</view>
			</uni-popup>

			<uni-popup ref="technician_info_item" type="center">
				<view @touchmove.stop.prevent class="technician-info-popup fill-base ml-lg mr-lg radius-16">
					<image @tap.stop="goInfo" mode="aspectFill" class="work-img" :src="detail.work_img"></image>
					<view @tap.stop="goInfo" class="pt-lg pl-lg pr-lg">
						<view class="flex-between">
							<view class="f-title c-black text-bold max-400">{{detail.coach_name || '-'}}</view>
							<view class="flex-center">
								<i class="iconfont iconjuli" :style="{color:primaryColor}"></i>
								<view class="f-desc c-title">{{detail.distance}}</view>
							</view>
						</view>
						<view class="flex-y-center mt-sm">
							<view class="service-label flex-center f-icontext">
								{{textType[detail.text_type]}}
							</view>
							<view class="time-label flex-y-center ml-md f-icontext c-paragraph" v-if="detail.near_time">
								<view class="near-text flex-center">最早可约</view>
								<view class="near-time flex-center c-base rel" :style="{color:primaryColor}">
									<view class="bg abs" :style="{background:primaryColor}"></view>
									{{detail.near_time}}
								</view>
							</view>
						</view>
						<view class="flex-y-center mt-lg f-icontext c-caption"
							v-if="(configInfo.merchant_switch_show && detail.admin_id && detail.merchant_name) || (configInfo.plugAuth.store && detail.store_id && detail.store_name)">
							<i class="iconfont iconshangjia_1"
								v-if="configInfo.merchant_switch_show && detail.admin_id && detail.merchant_name"></i>
							<i class="iconfont icondianpu" v-else></i>
							<view class="max-500 ellipsis">
								{{configInfo.merchant_switch_show && detail.admin_id && detail.merchant_name ? detail.merchant_name : detail.store_name}}
							</view>
						</view>
						<view class="space-md" v-else></view>
						<view class="flex-y-center f-icontext c-caption mt-sm">
							<view class="flex-y-baseline">
								<i class="iconfont iconpingfen1 icon-font-color"></i>
								<view class="star-text flex-y-center f-caption">{{detail.star || 0}}</view>
							</view>
							<block v-if="detail.show_salenum">
								<view class="line"></view>
								<view>已服务{{detail.order_num>9999?'9999+':detail.order_num}}单</view>
							</block>
							<view class="line"></view>
							<view>从业{{detail.work_time}}年</view>
						</view>
					</view>
					<view class="pd-lg">
						<view class="introduce-info pd-lg f-paragraph c-title radius-16">
							<text decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
						</view>
					</view>
				</view>
				<view @tap.stop="toPopup('technician_info_item','close')" class="flex-center mt-lg"><i
						class="iconfont icon-close c-base"></i></view>
			</uni-popup>


			<w-picker mode="date" :startYear="startYear-100" :endYear="startYear" :value="toDay" :current="false"
				fields="minute" @confirm="onConfirm($event)" :disabled-after="false" ref="day"
				:themeColor="primaryColor" :visible.sync="showDate">
			</w-picker>

			<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
			<tabbar :cur="7"></tabbar>

			<!-- #ifdef APP-PLUS -->
			<login-info></login-info>
			<!-- #endif -->
		</block>


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
	import siteInfo from '@/siteinfo.js';
	import aMap from "@/components/amap.vue"
	import tabbar from "@/components/tabbar.vue"
	import technicianListItem from "@/components/technician-list-item.vue"
	import technicianListPopup from "@/components/technician-list-popup.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			aMap,
			tabbar,
			technicianListItem,
			technicianListPopup,
			wPicker
		},
		data() {
			return {
				isLoad: false,
				options: {},
				navTitle: '',
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约',
					4: '不可预约'
				},
				popupHeight: '',
				startYear: '',
				toDay: '',
				showDate: false,
				detail: {},
				mapSrc: '',
				loading: true,
				lockTap: false,
				popupTap: false
			}
		},
		computed: mapState({
			pageActive: state => state.map.pageActive,
			sexList: state => state.map.sexList,
			yearList: state => state.map.yearList,
			check: state => state.map.check,
			param: state => state.map.param,
			service_cate: state => state.map.service_cate,
			mapList: state => state.map.mapList,
			list: state => state.map.list,
			mapType: state => state.map.mapType,
			map: state => state.map.map,
			covers: state => state.map.covers,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			autograph: state => state.user.autograph,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			locaRefuse: state => state.user.locaRefuse,
			changeAddr: state => state.user.changeAddr,
			isGzhLogin: state => state.user.isGzhLogin,
			loginType: state => state.user.loginType,
			useChooseLocation: state => state.user.useChooseLocation,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		async onLoad(options) {
			console.log("====onLoad map")
			this.options = options
			let {
				realtime_location = 0
			} = this.configInfo
			let {
				pageActive,
				changeAddr
			} = this
			if (!pageActive) {
				this.$util.showLoading()
			}
			let {
				tabBar
			} = this.configInfo
			let ind = tabBar.findIndex(item => {
				return item.id == 7
			})
			let navTitle = ind == -1 ? '地图找人' : tabBar[ind].name
			this.navTitle = navTitle
			uni.setNavigationBarTitle({
				title: navTitle
			})
			if (pageActive && (!realtime_location && !changeAddr)) {
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.isLoad = true
				this.loading = false
				this.$util.hideAll()
				return
			}
			await this.initIndex()
		},
		async onShow() {
			console.log("====onShow map")
			// #ifdef H5
			if (this.$jweixin.isWechat()) {
				await this.$jweixin.initJssdk();
				this.toAppShare()
			}
			// #endif

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
			this.loading = true;
			this.getList(this.param.page + 1);
		},
		onShareAppMessage(e) {
			let {
				id: pid = 0
			} = this.userInfo
			let path = `/pages/map?pid=${pid}`
			this.$util.log(path)
			return {
				title: '',
				imageUrl: '',
				path,
			}
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
				} = this.noChangeLoca
				if (newval && noloca) {
					this.initUtilLocaData()
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
						noloca
					} = this.noChangeLoca
					let cur_unix = this.$util.DateToUnix(this.$util.formatTime(new Date(), 'YY-M-D h:m:s'))
					if (noloca && ((!lat && !lng) || !unix || (unix && (cur_unix - unix >= 1)))) {
						this.getUtilLocation()
					}
				}, 800)
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo',
				'getMapIndex', 'getMapList', 'getMapCoachList'
			]),
			...mapMutations(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
				'updateDynamicItem', 'updateShopstoreItem'
			]),
			async initIndex(refresh = false) {
				let {
					pid = 0,
				} = this.options
				let {
					realtime_location: rloca = 0
				} = this.configInfo
				console.log(rloca, this.changeAddr)
				if (!refresh && this.pageActive && (!rloca && !this.changeAddr) && !pid) {
					console.log('=======')
					this.$util.setNavigationBarColor({
						bg: this.primaryColor
					})
					this.isLoad = true
					this.loading = false
					this.$util.hideAll()
					return
				}

				let {
					isGzhLogin
				} = this
				let {
					id: uid = 0
				} = this.userInfo
				if (pid && !uid) {
					// #ifdef H5
					if (isGzhLogin) {
						setTimeout(() => {
							this.getUserInfo()
						}, 1000)
					} else {
						this.getUserInfo()
					}
					// #endif
					// #ifndef H5
					await this.getUserInfo()
					// #endif 
				}

				if (!this.configInfo.id || refresh || (this.configInfo.id && !this.configInfo.plugAuth
						.hasOwnProperty(
							'map'))) {
					await this.getConfigInfo()
				}

				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				let cur_time = new Date(Math.ceil(new Date().getTime()))
				this.startYear = this.$util.formatTime(cur_time, 'YY')
				this.toDay = this.$util.formatTime(cur_time, 'YY-M-D')

				let {
					plugAuth = {},
						realtime_location = 0
				} = this.configInfo
				let {
					map = false
				} = plugAuth
				if (!map) {
					this.isLoad = true
					this.loading = false
					this.$util.hideAll()
					return
				}

				await this.getMapIndex()
				await this.getList(1, true)
				this.updateMapItem({
					key: 'pageActive',
					val: true
				})
				this.updateTechnicianItem({
					key: 'pageActive',
					val: false
				})
				this.isLoad = true
			},
			async initRefresh() {
				await this.initIndex(true)
				let {
					tabBar
				} = this.configInfo
				let ind = tabBar.findIndex(item => {
					return item.id == 7
				})
				let navTitle = ind == -1 ? '地图找人' : tabBar[ind].name
				this.navTitle = navTitle
				uni.setNavigationBarTitle({
					title: navTitle
				})
			},
			async toResetUtilLoca() {
				// #ifdef APP-PLUS
				let {
					lat: locaLat = 0
				} = this.location
				if (!locaLat && this.pageActive) {
					let {
						lng = 0,
							lat = 0
					} = await this.$util.getUtilLocation()
					if (!lat && !lng) return
					await this.getList(1, true)
					let updateArr = ['updateServiceItem', 'updateTechnicianItem',
						'updateDynamicItem', 'updateShopstoreItem'
					]
					updateArr.map(item => {
						this[item]({
							key: 'pageActive',
							val: false
						})
					})
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
			handerTabChange(index) {
				let {
					id: cate_id
				} = this.service_cate[index]
				let param = Object.assign({}, this.param, {
					cate_id,
					page: 1,
					activeIndex: index
				})
				this.updateMapItem({
					key: 'param',
					val: param
				})
				this.getList()
			},
			async getList(page = 0, refresh = false) {
				if (page) {
					let param = this.$util.deepCopy(this.param)
					param.page = page
					this.updateMapItem({
						key: 'param',
						val: param
					})
				}

				let {
					location,
					locaRefuse,
					changeAddr
				} = this

				let {
					realtime_location = 0
				} = this.configInfo


				let {
					status: coach_status,
					coach_position
				} = this.userCoachStatus

				let {
					mapType
				} = this


				if (mapType == 'map' || (mapType != 'map' && this.param.page == 1)) {
					// #ifdef APP-PLUS
					if (!locaRefuse && ((!location.lat || (location.lat && location.address == '暂未获取到位置信息')) || (
							refresh &&
							realtime_location && !changeAddr))) {
						// #endif
						// #ifndef APP-PLUS
						if ((!location.lat || (location.lat && location.address == '暂未获取到位置信息')) || (refresh &&
								realtime_location && !
								changeAddr)) {
							// #endif

							// #ifdef MP-WEIXIN
							let privacyCheck = this.$refs.user_privacy.check()
							if (privacyCheck) {
								this.$refs.user_privacy.open()
								this.isLoad = true
								this.loading = false
								this.$util.hideAll()
								return
							}
							// #endif

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
										noloca
									}
								})
								if (this.noChangeLoca.noloca) return
								this.initUtilLocaData()
							} else {
								this.getUtilLocation()
							}
						} else {
							this.initUtilLocaData()
						}
						return
					}
					this.initUtilLocaData()
				},
				async getUtilLocation() {
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
							this.initUtilLocaData()
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
						this.initUtilLocaData()
						// #endif
					},
					async initUtilLocaData() {
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

							// #ifdef APP-PLUS

							if (!lat && !lng) {
								this.updateMapItem({
									key: 'map',
									val: {
										latitude: 0,
										longitude: 0,
										scale: 16,
										controls: []
									}
								})
								this.updateMapItem({
									key: 'mapList',
									val: []
								})
								this.updateMapItem({
									key: 'list',
									val: {
										data: [],
										last_page: 1,
										current_page: 1
									}
								})
								this.isLoad = true
								this.loading = false
								this.$util.hideAll()
								return
							}
							// #endif

							this.loading = true
							let param = Object.assign({}, this.param, {
								lat,
								lng
							})

							let {
								cate_id = 0
							} = param
							let ind = this.service_cate.findIndex(item => {
								return item.id == cate_id
							})
							ind = ind == -1 ? 0 : ind
							cate_id = this.service_cate[ind].id
							param.cate_id = cate_id

							let params = Object.assign({}, this.param, {
								cate_id,
								activeIndex: ind
							})

							let {
								mapType
							} = this
							if (mapType === 'map') {
								params.sex = -1
								params.year = 0
								params.coach_name = ''
								params.service_time = ''
							}
							this.updateMapItem({
								key: 'param',
								val: params
							})

							let arr = this.yearList.filter(item => {
								return item.id == param.year
							})[0].year
							param.work_time_start = arr[0]
							param.work_time_end = arr[1]
							param.service_time = param.service_time ? this.$util.DateToUnix(param.service_time) :
								''
							if (param.sex == -1) {
								delete param.sex
							}
							if (mapType == 'map') {
								delete param.page
								if (param.work_time_start) {
									delete param.work_time_start
									delete param.work_time_end
								}
								this.updateMapItem({
									key: 'check',
									val: {
										sex: -1,
										year: 0,
										coach_name: '',
										service_time: ''
									}
								})
								this.updateMapItem({
									key: 'covers',
									val: []
								})
							}

							delete param.activeIndex
							delete param.year
							let methodModel = mapType == 'map' ? 'getMapList' : 'getMapCoachList'
							await this[methodModel](param)
							this.$util.hideAll()
							this.loading = false
							if (lat && lng && (mapType == 'map' || (mapType != 'map' && param.page == 1)) && (
									is_util_loca || (
										realtime_location && !changeAddr))) {
								this.$util.getMapInfo(true, {}, changeAddr, true)
							}
						},
						toAppShare() {
							let {
								id: pid = 0
							} = this.userInfo
							let title = '地图找人'
							let {
								siteroot
							} = siteInfo
							let url = siteroot.split('/index.php')[0]
							let href = `${url}/h5/#/pages/map?pid=${pid}`
							let imageUrl = ''
							this.$jweixin.wxReady(() => {
								this.$jweixin.showOptionMenu()
								this.$jweixin.shareAppMessage(title, '', href, imageUrl)
								this.$jweixin.shareTimelineMessage(title, href, imageUrl)
							})
						},
						initFixHeight(val) {
							this.popupHeight = val
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
									this.updateUserItem({
										key: 'location',
										val: location
									})
									this.updateUserItem({
										key: 'changeAddr',
										val: true
									})
									await this.getList(1)
								},
								toChangeItem(key, id) {
									if (['sex', 'year'].includes(key)) {
										let checkVal = Object.assign({}, this.check, {
											[key]: id
										})
										this.updateMapItem({
											key: 'check',
											val: checkVal
										})
										return
									}
									this.updateMapItem({
										key: 'mapType',
										val: key
									})
									this.getList(1)
								},
								toPopup(refs_key, method) {
									this.$refs[refs_key][method]()
									this.popupTap = method === 'open' ? true : false
								},
								toChangePopupShow(e) {
									let {
										show
									} = e
									if (show) return
									this.updateMapItem({
										key: 'check',
										val: this.$util.pick(this.param, ['sex', 'year', 'coach_name',
											'service_time'
										])
									})
								},
								toClearServiceTime() {
									this.check.service_time = ''
								},
								toShowDate() {
									this.showDate = true
								},
								async onConfirm(val) {
										let {
											result
										} = val
										let cur = this.$util.formatTime(new Date().getTime(), 'YY-M-D h:m')
										if (this.$util.DateToUnix(result) <= this.$util.DateToUnix(cur)) {
											this.$util.showToast({
												title: `只能选择未来时间哦`
											})
											return
										}

										let checkVal = Object.assign({}, this.check, {
											service_time: result
										})
										this.updateMapItem({
											key: 'check',
											val: checkVal
										})
									},
									toReset() {
										this.updateMapItem({
											key: 'check',
											val: {
												sex: -1,
												year: 0,
												coach_name: '',
												service_time: ''
											}
										})
										this.toConfirm()
									},
									toConfirm() {
										let param = Object.assign({}, this.param, this.check)
										this.updateMapItem({
											key: 'param',
											val: param
										})

										this.updateMapItem({
											key: 'mapType',
											val: 'list'
										})
										this.getList(1)
										this.$refs.search_item.close()
										this.popupTap = false
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
												this.list.data[index].collect_num = is_collect == 1 ? collect_num - 1 :
													collect_num + 1
											},
											async goDetail(e) {
													let {
														markerId
													} = e.detail
													let {
														id,
														distance
													} = this.mapList[markerId]
													let data = await this.$api.service.coachInfo({
														id
													})
													data.distance = distance
													this.detail = data
													this.$refs.technician_info_item.open()
													this.popupTap = true
												},
												// 技-师详情
												goInfo() {
													let {
														id: uid = 0,
														phone = ''
													} = this.userInfo

													let {
														short_code_status = 0,
															bind_phone_type = 0
													} = this.configInfo
													if (!uid || (short_code_status && bind_phone_type && !phone)) {
														this.updateUserItem({
															key: 'loginPage',
															val: `/pages/map`
														})
														this.$util.goUrl({
															url: !uid ? `/pages/login` : `/user/pages/phone`
														})
														return
													}

													let {
														id,
													} = this.detail
													this.$refs.technician_info_item.close()
													this.popupTap = false
													this.$util.goUrl({
														url: `/user/pages/technician-info?id=${id}`
													})
												},
			}
		}
</script>


<style lang="scss">
	.pages-map {
		.map-info {
			.iconjuli {
				font-size: 30rpx;
			}

			.icon-down {
				color: #868686;
			}

			.map-list-item {

				.list-btn {
					width: 92rpx;
					height: 46rpx;
					transform: rotateZ(360deg);
					border-radius: 4rpx 0 0 4rpx;
					border: 1rpx solid #DADFE3;

					.iconfont {
						font-size: 22rpx;
						margin-right: 4rpx;
					}
				}


				.list-btn:nth-child(2) {
					border-radius: 0 4rpx 4rpx 0;
				}

				.list-btn.abs {
					opacity: 0.3;
					border: none;
				}

			}
		}

		.tab-info {
			.tab-list-item {
				width: 90%;
			}

			.tab-select-item {
				height: 44rpx;
				box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.8);
			}
		}

		.map-box {
			width: 100%;
		}

		.search-popup {
			width: calc(100% - 164rpx);
			height: 100vh;

			.list-item {
				width: 160rpx;
				height: 70rpx;
				background: #F5F5F5;

				.icon-guanbi-fill.abs {
					top: -15rpx;
					right: 0;
					font-size: 50rpx;
				}
			}

			.list-item:nth-child(3n) {
				margin-right: 0;
			}

			.search-btn {
				width: 230rpx;
				height: 80rpx;
				border: 1rpx solid #C7C7C7;
				transform: rotateZ(360deg);
			}
		}

		.technician-info-popup {
			width: 680rpx;
			overflow: hidden;

			.work-img {
				width: 680rpx;
				height: 680rpx;
			}

			.service-label {
				min-width: 88rpx;
				height: 32rpx;
				padding: 0 10rpx;
				color: #EBDDB1;
				background: linear-gradient(270deg, #4C545A 0%, #282B34 100%);
				border-radius: 4rpx;
			}

			.time-label {

				.near-text {
					width: 100rpx;
					height: 33rpx;
					background: #F5F5F5;
					border-radius: 3rpx 0 0 3rpx;
				}

				.near-time {
					width: 66rpx;
					height: 33rpx;
					border-radius: 0 3rpx 3rpx 0;

					.bg {
						opacity: 0.1;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 1;
						border-radius: 0 3rpx 3rpx 0;
					}
				}
			}


			.icondianpu {
				margin-right: 6rpx;
			}

			.iconpingfen1 {
				font-size: 24rpx;
				background-image: -webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%);
			}

			.star-text {
				height: 26rpx;
				color: #FF9519;
				margin-left: 6rpx;
			}

			.line {
				width: 1rpx;
				height: 11rpx;
				background: #979797;
				margin: 0 18rpx;
			}

			.introduce-info {
				width: 630rpx;
				max-height: 250rpx;
				overflow-y: auto;
				background: #F9F9F9;
			}

		}

		.icon-close {
			font-size: 60rpx;
		}
	}
</style>