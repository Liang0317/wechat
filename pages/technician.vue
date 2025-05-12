<template>
	<view class="pages-technician">
		<fixed @height="initFixHeight" :initHeight="configInfo">
			<block v-if="configInfo.user_update_location">
				<uni-nav-bar :fixed="false" :shadow="false" :statusBar="true" :onlyLeft="true" :color="`#fff`"
					:backgroundColor="primaryColor">
					<view @tap.stop="toChooseLocation" class="map-info flex-y-center" slot="left">
						<view class="flex-y-center c-base">
							<i class="iconfont iconjuli mr-sm"></i>
							<view class="map-text max-400 ellipsis">
								{{location&&location.address ? location.address : isLoad ? '定位失败' : '定位中...'}}
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
			<view class="fix-info rel" :class="[{'fill-base':cityIndex==-1},{'fill-body':cityIndex!==-1}]"
				:style="{height:configInfo.coach_filter_show ? configInfo.coach_format == 2 ?'230rpx':'330rpx': configInfo.coach_format == 2 ?'144rpx':'244rpx'}">
				<!-- #ifdef H5 -->
				<view class="space-top abs" :style="{background:primaryColor}" v-if="configInfo.user_update_location">
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<view class="space-top abs" :style="{background:primaryColor}"></view>
				<!-- #endif -->
				<view class="abs" style="width:100%;top:0">
					<view class="search-info fill-base pt-lg pl-lg pr-lg"
						:class="[{'pb-md':configInfo.coach_format!=2}]">
						<view class="flex-center"
							:class="[{'pb-md':configInfo.coach_format!=2},{'pb-lg':configInfo.coach_format==2}]">
							<view class="city-info">
								<!-- #ifdef APP-PLUS -->
								<picker @change="pickerChange($event)" :value="cityIndex" :range="cityList"
									range-key="title" v-if="location.lat && location.lng">
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
								<view @tap.stop="toOpenLocation" class="city-info flex-y-center" v-else>
									<view> 未知 </view>
									<i class="iconfont iconshaixuanxia-1 ml-sm"></i>
								</view>

								<!-- #endif -->
								<!-- #ifndef APP-PLUS -->
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
								<!-- #endif -->
							</view>
							<view class="flex-1">
								<search @input="toSearch" type="input" :keyword="param.coach_name" :padding="0"
									:radius="30" backgroundColor="#F0F0F0"
									:placeholder="'请输入'+$t('action.attendantName')+'姓名'">
								</search>
							</view>
						</view>
						<block v-if="configInfo.coach_format != 2">
							<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1"
								:activeColor="primaryColor" width="25%" height="90rpx" fontSize="28rpx"></tab>
						</block>
					</view>
					<view class="search-cate-list flex-warp mt-md ml-md mr-md pb-md"
						v-if="configInfo.coach_filter_show">
						<view @tap.stop="toChangeItem('recommend', check.recommend == 0 ? 1 : 0,1)"
							class="item-child flex-center f-desc radius-16 mr-lg"
							:style="{background:check.recommend?primaryColor:'',color:check.recommend?'#fff':''}"
							v-if="configInfo.plugAuth.recommend">
							<view class="ellipsis">推荐{{$t('action.attendantName')}}</view>
						</view>
						<view @tap.stop="toChangeItem('free_fare', check.free_fare == 0 ? 1 : 0,1)"
							class="item-child flex-center f-desc radius-16 mr-lg"
							:style="{background:check.free_fare?primaryColor:'',color:check.free_fare?'#fff':''}"
							v-if="configInfo.free_fare_bear">
							<view class="ellipsis">免出行费</view>
						</view>
						<view @tap.stop="toChangeItem('cate_id',item.id,1)"
							class="item-child flex-center f-desc radius-16 mr-lg"
							:style="{background:check.cate_id == item.id ?primaryColor:'',color:check.cate_id == item.id?'#fff':''}"
							v-for="(item,index) in serviceCateList" :key="index"
							v-show="((configInfo.free_fare_bear && configInfo.plugAuth.recommend && index < 1) || ((!configInfo.free_fare_bear || !configInfo.plugAuth.recommend) && index < 2) || (!configInfo.free_fare_bear && !configInfo.plugAuth.recommend && index < 3))">
							<view class="ellipsis">{{item.title}}</view>
						</view>
						<view @tap.stop="toPopup('search_item','open')" class="item-child flex-center f-desc radius-16">
							更多筛选</view>
					</view>
				</view>
			</view>
		</fixed>

		<view class="ml-md mr-md" :class="[{'flex-warp':[2,3].includes(configInfo.coach_list_format)}]"
			v-if="pageActive && list.data && list.data.length>0">

			<view
				:class="[{'mt-md':(configInfo.coach_list_format===1&&index!=0) || ([2,3].includes(configInfo.coach_list_format) && index>1)},{'mr-md':[2,3].includes(configInfo.coach_list_format) && index%2==0}]"
				v-for="(item,index) in list.data" :key="index">
				<technician-list-item @comment="toShowPopup(index,'message')" @collect="toCollect(index)"
					@order="toShowPopup(index,'technician')" :info="item">
				</technician-list-item>
			</view>
		</view>


		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0&&location.lng" :loading="loading"
			v-if="loading">
		</load-more>

		<block v-if="!loading&&list.data.length<=0&&list.current_page==1">
			<abnor
				:tip="[{ text:  `该城市暂无${check.recommend && check.free_fare ?'推荐的免出行费': check.recommend ?'推荐': check.free_fare ? '免出行费':''}${$t('action.attendantName')}上线~`, color: 0 }]"
				v-if="location.lat&&location.lng&&cityIndex!==-1"></abnor>
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


		<view class="fill-base fix" :style="{top:`${popupHeight}px`,bottom:`${configInfo.tabbarHeight}px`}"
			v-if="!loading&&list.data.length<=0&&list.current_page==1&&cityIndex===-1&&location.lat&&location.lng">
			<open-city-item ref="open_city_item" :height="popupHeight"></open-city-item>
		</view>

		<view class="space-footer"></view>

		<technician-list-popup ref="technician_list_popup"></technician-list-popup>

		<uni-popup ref="choose_city_item" type="top" :custom="true" :zIndex="999">
			<view :style="{height:configInfo.navBarHeight + 8 + 'px'}"></view>
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

		<uni-popup @change="toChangePopupShow" ref="search_item" type="top" left="164rpx" :custom="true" :zIndex="999">
			<view class="search-popup">
				<!-- #ifdef H5 -->
				<view :style="{height:configInfo.navBarHeight + 'px'}" v-if="configInfo.user_update_location"></view>
				<view class="fill-base pd-lg"
					:style="{height:`calc(100% - ${configInfo.user_update_location ? configInfo.navBarHeight : 0}px)`}">
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<view :style="{height:configInfo.navBarHeight + 'px'}"></view>
					<view class="fill-base pd-lg" :style="{height:`calc(100% - ${configInfo.navBarHeight}px)`}">
						<!-- #endif -->
						<view class="f-desc c-title text-bold">{{$t('action.attendantName')}}性别
						</view>
						<view class="flex-warp">
							<view @tap.stop="toChangeItem('sex',item.id)"
								class="list-item flex-center mt-md mr-md f-paragraph c-paragraph radius"
								:style="{background:check.sex==item.id?primaryColor:'',color:check.sex==item.id?'#fff':''}"
								v-for="(item,index) in sexList" :key="index">{{item.title}}
							</view>
						</view>
						<block v-if="serviceCateList && serviceCateList.length>0">
							<view class="f-desc c-title text-bold pt-lg mt-md">
								服务分类
							</view>
							<view class="service-cate-scroll">
								<scroll-view scroll-y>
									<view class="flex-warp">
										<view @tap.stop="toChangeItem('cate_id',item.id)"
											class="list-item flex-center mt-md mr-md f-paragraph c-paragraph radius"
											:style="{background:check.cate_id==item.id?primaryColor:'',color:check.cate_id==item.id?'#fff':''}"
											v-for="(item,index) in serviceCateList" :key="index">{{item.title}}
										</view>
									</view>
								</scroll-view>
							</view>
						</block>
						<block v-if="configInfo.plugAuth.store">
							<view class="f-desc c-title text-bold pt-lg mt-md">服务类型
							</view>
							<view class="flex-warp">
								<view @tap.stop="toChangeItem('service_type',item.id)"
									class="list-item flex-center mt-md mr-md f-paragraph c-paragraph radius"
									:style="{background:check.service_type==item.id?primaryColor:'',color:check.service_type==item.id?'#fff':''}"
									v-for="(item,index) in serviceTypeList" :key="index">{{item.title}}
								</view>
							</view>
							<view class="f-desc c-title text-bold pt-lg mt-md">个性筛选
							</view>
							<input type="text" v-model="check.store_name" placeholder="请输入店铺名称" :adjust-position="true"
								class="list-item text-center mt-md f-paragraph c-paragraph radius" style="width:100%" />
							<block v-if="1==2">
								<!-- #ifdef H5 -->
								<input @focus="maxHeight = '10vh'" @blur="maxHeight = '37vh'" type="text"
									v-model="check.store_name" placeholder="请输入店铺名称" :adjust-position="true"
									class="list-item text-center mt-md f-paragraph c-paragraph radius"
									style="width:100%" />
								<!-- #endif -->
								<!-- #ifndef H5 -->
								<input type="text" v-model="check.store_name" placeholder="请输入店铺名称"
									:adjust-position="true"
									class="list-item text-center mt-md f-paragraph c-paragraph radius"
									style="width:100%" />
								<!-- #endif -->
							</block>
						</block>
						<view style="height:60rpx"></view>
						<view class="flex-center">
							<view @tap.stop="toReset" class="search-btn flex-center f-mini-title c-title radius">重置
							</view>
							<view @tap.stop="toConfirm" class="search-btn flex-center ml-lg f-mini-title c-base radius"
								:style="{background:primaryColor,borderColor:primaryColor}">确定</view>
						</view>
					</view>
				</view>
		</uni-popup>

		<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
		<tabbar :cur="2"></tabbar>

		<!-- #ifdef APP-PLUS -->
		<login-info></login-info>
		<!-- #endif -->
		<change-user-type></change-user-type>

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
	import tabbar from "@/components/tabbar.vue"
	import technicianListItem from "@/components/technician-list-item.vue"
	import technicianListPopup from "@/components/technician-list-popup.vue"
	import openCityItem from "@/components/open-city-item.vue"
	export default {
		components: {
			tabbar,
			technicianListItem,
			technicianListPopup,
			openCityItem
		},
		data() {
			return {
				isLoad: false,
				options: {},
				navTitle: '',
				popupHeight: '',
				maxHeight: '37vh',
				loading: true,
				lockTap: false,
			}
		},
		computed: mapState({
			pageActive: state => state.technician.pageActive,
			haveOperItem: state => state.technician.haveOperItem,
			cityId: state => state.technician.cityId,
			cityIndex: state => state.technician.cityIndex,
			cityList: state => state.technician.cityList,
			activeIndex: state => state.technician.activeIndex,
			tabList: state => state.technician.tabList,
			sexList: state => state.technician.sexList,
			serviceCateList: state => state.technician.serviceCateList,
			serviceTypeList: state => state.technician.serviceTypeList,
			check: state => state.technician.check,
			param: state => state.technician.param,
			list: state => state.technician.list,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			loginType: state => state.user.loginType,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			locaRefuse: state => state.user.locaRefuse,
			changeAddr: state => state.user.changeAddr,
			isGzhLogin: state => state.user.isGzhLogin,
			haveShieldOper: state => state.user.haveShieldOper,
			useChooseLocation: state => state.user.useChooseLocation,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		async onLoad(options) {
			console.log("====onLoad technician")
			this.options = options
			let {
				pid = 0,
					city_id = 0,
					coach_id = 0,
					coach_name = ''
			} = options

			let param = this.$util.deepCopy(this.param)
			if ((param.coach_id && !coach_id) || (param.coach_name && !coach_name)) {
				this.updateTechnicianItem({
					key: 'pageActive',
					val: false
				})
			}
			param.coach_id = coach_id
			param.coach_name = coach_name
			this.updateTechnicianItem({
				key: 'param',
				val: param
			})

			if (coach_id) {
				this.updateTechnicianItem({
					key: 'cityId',
					val: city_id
				})
			}

			let {
				data = []
			} = this.list
			let city_refresh = data.length == 0 || data[0].city_id != this.cityId

			let {
				realtime_location = 0,
					tabBar
			} = this.configInfo
			let ind = tabBar.findIndex(item => {
				return item.id == 2
			})
			let navTitle = ind == -1 ? this.$t('action.attendantName') : tabBar[ind].name
			this.navTitle = navTitle
			// #ifdef H5
			uni.setNavigationBarTitle({
				title: navTitle
			})
			// #endif
			let {
				pageActive,
				changeAddr
			} = this
			if (pageActive && (!realtime_location && !changeAddr) && (!coach_id || !pid) && !city_refresh) {
				this.isLoad = true
				this.loading = false
				this.$util.hideAll()
				return
			}
			await this.initIndex()
		},
		async onShow() {
			console.log("====onShow technician")
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
			if (this.haveShieldOper == 2 || this.haveOperItem) {
				this.initIndex()
				this.updateUserItem({
					key: 'haveShieldOper',
					val: 0
				})
				this.updateTechnicianItem({
					key: 'haveOperItem',
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
			let path = `/pages/technician?pid=${pid}`
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
			...mapActions(['getConfigInfo', 'getUserInfo', 'getServiceCate', 'getCityList', 'getServiceCoachList']),
			...mapMutations(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
				'updateDynamicItem', 'updateShopstoreItem'
			]),
			async initIndex(refresh = false) {
				let {
					pid = 0
				} = this.options
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

				if (!this.configInfo.id || !this.configInfo.hasOwnProperty('free_fare_bear') || refresh) {
					await this.getConfigInfo()
				}
				await this.getServiceCate()
				await this.getList(1, true)
				this.updateTechnicianItem({
					key: 'pageActive',
					val: true
				})
			},
			async initRefresh() {
				this.param.page = 1
				await this.initIndex(true)
				let {
					tabBar
				} = this.configInfo
				let ind = tabBar.findIndex(item => {
					return item.id == 2
				})
				let navTitle = ind == -1 ? this.$t('action.attendantName') : tabBar[ind].name
				this.navTitle = navTitle
				// #ifdef H5
				uni.setNavigationBarTitle({
					title: navTitle
				})
				// #endif
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
					let updateArr = ['updateServiceItem', 'updateMapItem',
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
				this.initIndex()
				// #endif
			},
			toAppShare() {
				let {
					id: pid = 0
				} = this.userInfo
				let title = this.$t('action.attendantName')
				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/pages/technician?pid=${pid}`
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
				this.getList(1)
			},
			toSearch(val) {
				let param = this.$util.deepCopy(this.param)
				param.coach_id = ''
				param.coach_name = val
				this.updateTechnicianItem({
					key: 'param',
					val: param
				})
				this.getList(1)
			},
			// 选择地址
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
				if (this.$refs.open_city_item) {
					this.$refs.open_city_item.city = ''
				}
				let {
					coach_id: cid = 0
				} = this.param
				await this.getCityList({
					lat,
					lng,
					change: cid ? 0 : 1
				})
				await this.getList(1)
			},
			async getList(page = 0, refresh = false) {
				if (page) {
					let param = this.$util.deepCopy(this.param)
					param.page = page
					this.updateTechnicianItem({
						key: 'param',
						val: param
					})
				}
				this.loading = true
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

				if (this.param.page == 1) {

					// #ifdef APP-PLUS
					if (!locaRefuse && ((!location.lat || (location.lat && location.address == '暂未获取到位置信息')) || (
							refresh &&
							realtime_location && !changeAddr))) {
						// #endif
						// #ifndef APP-PLUS
						if ((!location.lat || (location.lat && location.address == '暂未获取到位置信息')) || (refresh &&
								realtime_location && !changeAddr)) {
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
										noloca,
										refresh
									}
								})
								if (this.noChangeLoca.noloca) return
								this.initUtilLocaData(refresh)
							} else {
								this.getUtilLocation(refresh)
							}
						} else {
							this.initUtilLocaData(refresh)
						}
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
								let {
									coach_id: cid = 0
								} = this.param
								await this.getCityList({
									lng,
									lat,
									change: cid ? 0 : 1
								})
							}

							// #ifdef APP-PLUS
							if (!lat && !lng) {
								this.updateTechnicianItem({
									key: 'cityIndex',
									val: -1
								})
								this.isLoad = true
								this.loading = false
								this.$util.hideAll()
								this.updateTechnicianItem({
									key: 'list',
									val: {
										data: [],
										last_page: 1,
										current_page: 1
									}
								})
								return
							}
							// #endif

							let {
								list: oldList,
								activeIndex,
								tabList,
								cityList,
								cityIndex,
								cityId: city_id
							} = this

							let param = this.$util.deepCopy(this.param)

							let ind = cityList.findIndex(item => {
								return item.id == city_id
							})

							if (ind == -1) {
								if (param.page == 1 && (is_util_loca || (realtime_location && !changeAddr))) {
									await this.$util.getMapInfo(true, {}, changeAddr)
								}
								// this.$refs.choose_city_item.open()
								if (this.$refs.open_city_item) {
									this.$refs.open_city_item.initIndex()
								}
								this.loading = false
								this.$util.hideAll()
								this.updateTechnicianItem({
									key: 'list',
									val: {
										data: [],
										last_page: 1,
										current_page: 1
									}
								})
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
							let {
								coach_format = 1,
									coach_filter_show = 0
							} = this.configInfo
							param = Object.assign({}, param, this.check, {
								lat,
								lng,
								city_id
							})
							if (coach_format == 1) {
								param.type = tabList[activeIndex].id
							}
							if (!coach_filter_show) {
								delete param.sex
								delete param.cate_id
								delete param.recommend
								delete param.free_fare
								delete param.service_type
								delete param.store_name
							} else {
								if (param.sex === -1) {
									delete param.sex
								}
								if (param.recommend === 0) {
									delete param.recommend
								}
								if (param.cate_id === 0) {
									delete param.cate_id
								}
								if (param.service_type === 0) {
									delete param.service_type
								}
							}
							await this.getServiceCoachList(param)
							this.loading = false
							this.$util.hideAll()
							if (param.page == 1 && (is_util_loca || (realtime_location && !changeAddr))) {
								this.$util.getMapInfo(true, {}, changeAddr)
							}
						},
						handerTabChange(index) {
							this.updateTechnicianItem({
								key: 'activeIndex',
								val: index
							})
							this.$util.showLoading()
							uni.pageScrollTo({
								scrollTop: 0
							})
							this.getList(1)
						},
						toChangeItem(key, id, flag = 0) {
							if (key === 'cate_id' && this.check[key] == id) {
								id = 0
							}
							let checkVal = Object.assign({}, this.check, {
								[key]: id
							})
							this.updateTechnicianItem({
								key: 'check',
								val: checkVal
							})
							if (!flag) return
							this.toConfirm(0)
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
							this.updateTechnicianItem({
								key: 'check',
								val: this.$util.pick(this.param, ['sex', 'cate_id', 'recommend',
									'service_type',
									'store_name',
									'free_fare'
								])
							})
						},
						toReset() {
							this.updateTechnicianItem({
								key: 'check',
								val: {
									sex: -1,
									cate_id: 0,
									recommend: 0,
									free_fare: 0,
									service_type: 0,
									store_name: ''
								}
							})
							this.toConfirm()
						},
						toConfirm(flag = 1) {
							let param = Object.assign({}, this.param, this.check)
							this.updateTechnicianItem({
								key: 'param',
								val: param
							})
							this.getList(1)
							if (!flag) return
							// #ifdef H5
							this.maxHeight = '37vh'
							// #endif
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
							}
			}
		}
</script>


<style lang="scss">
	.search-popup {
		width: calc(100% - 164rpx);
		height: 100vh;

		.service-cate-scroll {
			width: 100%;
			/* #ifdef H5 */
			max-height: 35%;
			/* #endif */
			/* #ifndef H5 */
			max-height: 40%;
			/* #endif */
			overflow: auto;
		}

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
</style>