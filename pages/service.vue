<template>
	<view class="pages-home">
		<block v-if="isLoad">
			<!-- #ifndef H5 -->
			<uni-nav-bar :fixed="true" :shadow="false" :statusBar="true" :title="configInfo.app_text" color="#ffffff"
				:backgroundColor="primaryColor">
			</uni-nav-bar>
			<view :style="{height:`${configInfo.navBarHeight}px`}"></view>
			<!-- #endif -->
			<view :class="[{'mt-md':banner.list.length ==0},{'rel':banner.list.length >0}]"
				:style="{height:banner.list.length > 0? banner.banner_height + (banner.service_filter ? 64 : 0) + 'rpx' :`84rpx`}"
				v-if="banner.list.length > 0 || banner.service_filter">
				<banner @change="goBanner" :list="banner.list" :height="banner.banner_height" :margin="0"
					:autoplay="true" :indicatorActiveColor="primaryColor" :dotWidth="20" :dotBottom="30"
					v-if="banner.list.length > 0">
				</banner>
				<view class="search-box flex-center fill-base ml-md mr-md radius"
					:class="[{'abs':banner.list.length>0}]" v-if="banner.service_filter">
					<view style="width: 92%;">
						<tab @change="handerTabChange" :isLine="false" :list="tabList" :activeIndex="activeIndex*1"
							:activeColor="primaryColor" :width="100/tabList.length + '%'" height="84rpx"></tab>
					</view>
					<view style="width: 8%;"></view>
				</view>
			</view>

			<!-- 	<view class="pd-lg" style="word-break: break-all;">{{JSON.stringify(userCoachStatus)}}</view>
			<view class="pd-lg" style="word-break: break-all;">changeOnAddr=={{JSON.stringify(changeOnAddr)}}</view>
			<view class="pd-lg" style="word-break: break-all;">{{useChooseLocation}}</view>
			<view class="pd-lg" style="word-break: break-all;">noChangeLoca=={{JSON.stringify(noChangeLoca)}}</view> -->

			<!-- 分类 -->
			<view class="fill-base mt-md ml-md mr-md radius-16" style="overflow: hidden;"
				v-if="service_cate.list.length>0">
				<column @change="goCate" :list="service_cate.list" :indicatorActiveColor="primaryColor"
					:colNum="service_cate.col_num" :rowNum="service_cate.row_num">
				</column>
			</view>

			<view class="fill-base mt-md ml-md mr-md pt-lg pl-lg pr-md pb-lg radius-16"
				v-if="recommend_list && recommend_list.length > 0">
				<view @tap.stop="$util.goUrl({url: `/pages/technician`,openType: `reLaunch`})"
					class="flex-between pb-lg">
					<view class="f-paragraph c-black text-bold">推荐{{$t('action.attendantName')}}</view>
					<view class="flex-y-center f-caption c-caption">查看更多<i class="iconfont icon-right"
							style="font-size: 24rpx;"></i></view>
				</view>
				<scroll-view scroll-x class="recommend-technician">
					<block v-for="(item,index) in recommend_list" :key="index">
						<view @tap.stop="toTechnician(index)" class="recommend-item type-1" v-if="recommend_style == 1">
							<!-- #ifdef H5 -->
							<view class="cover radius-16">
								<view class="h5-image cover radius-16"
									:style="{ backgroundImage : `url('${item.work_img}')`}">
								</view>
							</view>
							<!-- #endif -->
							<!-- #ifndef H5 -->
							<image mode="aspectFill" lazy-load class="cover radius-16" :src="item.work_img"></image>
							<!-- #endif -->
							<view class="flex-center f-desc c-title mt-md">
								<view class="ellipsis">{{item.coach_name}}</view>
							</view>
						</view>
						<view @tap.stop="toTechnician(index)" class="recommend-item type-2 pd-md"
							v-if="recommend_style == 2">
							<view class="flex-center pb-sm">
								<!-- #ifdef H5 -->
								<view class="cover radius">
									<view class="h5-image cover radius"
										:style="{ backgroundImage : `url('${item.work_img}')`}">
									</view>
								</view>
								<!-- #endif -->
								<!-- #ifndef H5 -->
								<image mode="aspectFill" lazy-load class="cover radius" :src="item.work_img"></image>
								<!-- #endif -->
								<view class="flex-1 ml-sm">
									<view class="f-desc ellipsis">{{item.coach_name}}</view>
									<view class="flex-y-baseline" style="margin-top: 4rpx;">
										<i class="iconfont iconyduixingxingshixin icon-font-color"></i>
										<view class="star-text flex-y-center f-caption">{{item.star}}</view>
									</view>
								</view>
							</view>
							<view class="flex-center">
								<view class="new-technician flex-center f-icontext"
									:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}"
									v-if="item.is_new">新人
								</view>
								<view class="f-icontext c-caption" v-else>30天接单{{item.order_count||0}}
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>


			<view class="fill-base mt-md ml-md mr-md pd-lg radius-16" v-for="(item,index) in list.data" :key="index">
				<service-list-item :info="item"></service-list-item>
			</view>

			<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0&&location.lng" :loading="loading"
				v-if="loading">
			</load-more>

			<block v-if="!loading&&list.data.length<=0&&list.current_page==1">
				<abnor v-if="location.lat&&location.lng">
				</abnor>
				<block v-if="!location.lat&&!location.lng">
					<!-- #ifdef H5 -->
					<abnor type="NOT_LOCATION" title="暂无数据"></abnor>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<abnor type="NOT_LOCATION" title="暂无数据" @confirm="toOpenLocation"
						:button="[{ text: '开启定位' , type: 'confirm' }]" btnSize=""></abnor>
					<!-- #endif -->
				</block>
			</block>

			<view class="space-footer"></view>
			<uni-popup ref="coupon_auto_item" type="center" :maskClick="false">
				<view class="coupon-auto-popup rel">
					<!-- #ifdef H5 -->
					<view class="h5-image bg-img abs"
						:style="{ backgroundImage : `url('https://lbqny.migugu.com/admin/anmo/mine/coupon-bg.png')`}">
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" lazy-load class="bg-img abs"
						src="https://lbqny.migugu.com/admin/anmo/mine/coupon-bg.png">
					</image>
					<!-- #endif -->
					<i @tap.stop="$refs.coupon_auto_item.close()" class="iconfont icon-guanbi-fill c-base abs"></i>
					<view class="content flex-center flex-column abs">
						<view class="title text-bold flex-center">恭喜获得</view>
						<view class="f-mini-title text-bold">价值{{coupon_discount||0}}元的优惠券,
							已自动发放到您的卡包,点击下方按钮前去查看吧~</view>
					</view>

					<image class="get-btn abs" src="https://lbqny.migugu.com/admin/anmo/mine/coupon-get-btn.png">
					</image>
					<view @tap.stop="toCouponGetBtn" class="get-btn flex-center f-mini-title text-bold c-base abs">
						前往卡包查看
					</view>
				</view>
			</uni-popup>

			<uni-popup ref="coupon_item" type="center" :maskClick="false">
				<view class="coupon-popup flex-center rel">
					<!-- #ifdef H5 -->
					<view class="h5-image bg-img"
						:style="{ backgroundImage : `url('https://lbqnyv2.migugu.com/bianzu3.png')`}">
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" lazy-load class="bg-img" src="https://lbqnyv2.migugu.com/bianzu3.png">
					</image>
					<!-- #endif -->

					<i @tap.stop="$refs.coupon_item.close()" class="iconfont icon-close c-base abs"></i>
					<view class="coupon-info flex-center flex-column">
						<view class="tops flex-center flex-column">
							<view class="">
								成功领取
							</view>
							<view class="">
								卡券将放入“我的-我的卡券”
							</view>
						</view>
						<view class="lists flex-center">
							<scroll-view scroll-y style="width: 420rpx;height:100%;">
								<view class="list flex-between" v-for="(item, index) in couponList" :key="index">
									<image src="https://lbqny.migugu.com/admin/anmo/coupon/coupon.png"
										mode="aspectFill">
									</image>
									<view class="flex-between">
										<view class="flex-center flex-column">
											<view class="price">
												{{item.discount}}
											</view>
											<view class="price_text">
												{{item.full*1>0?`满${item.full}可用`:`立减`}}
											</view>
										</view>
										<view class="title flex-y-center">
											<view class="ellipsis-3">
												{{item.title}}
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<view class="btns flex-center" @tap.stop="userGetCoupon">
						<view class="flex-center">
							领取到卡包
						</view>
					</view>
				</view>
			</uni-popup>
			<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
			<tabbar :cur="1"></tabbar>

			<!-- #ifdef APP-PLUS -->
			<open-location-info ref="open_location_info" :pageActive="pageActive" :home="true"></open-location-info>
			<login-info></login-info>
			<!-- #endif -->

			<change-user-type></change-user-type>

		</block>

		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->

		<!-- #ifdef H5 -->
		<open-mini-program ref="open_mini_program" :info="openMiniForm"></open-mini-program>
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
	import serviceListItem from "@/components/service-list-item.vue"
	import openMiniProgram from "@/components/open-mini-program.vue"
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			serviceListItem,
			openMiniProgram,
			tabbar
		},
		data() {
			return {
				couponList: [], //优惠券 
				coupon_discount: 0, //优惠券 
				isLoad: false,
				options: {},
				loading: true,
				lockTap: false,
				openMiniForm: {}
			}
		},
		computed: mapState({
			pageActive: state => state.service.pageActive,
			activeIndex: state => state.service.activeIndex,
			tabList: state => state.service.tabList,
			param: state => state.service.param,
			list: state => state.service.list,
			banner: state => state.service.banner,
			service_cate: state => state.service.service_cate,
			recommend_list: state => state.service.recommend_list,
			recommend_style: state => state.service.recommend_style,
			have_coupon: state => state.service.have_coupon,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			autograph: state => state.user.autograph,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			locaRefuse: state => state.user.locaRefuse,
			changeAddr: state => state.user.changeAddr,
			isGzhLogin: state => state.user.isGzhLogin,
			haveShieldOper: state => state.user.haveShieldOper,
			userCoachStatus: state => state.user.userCoachStatus,
			useChooseLocation: state => state.user.useChooseLocation,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
			scanRecordId: state => state.user.scanRecordId,
		}),
		async onLoad(options) {
			let {
				channel_id = 0
			} = options
			if (channel_id) {
				this.addScanRecord({
					type: 1,
					qr_id: channel_id
				})
			}
			options = channel_id ? await this.updateCommonOptions(options) : options
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
			uni.onNetworkStatusChange((res) => {
				let {
					isConnected
				} = res
				if (isConnected && (!pageActive || (pageActive && (realtime_location || changeAddr)))) {
					this.initIndex()
					return
				}
			})
			await this.initIndex()
			// #ifdef H5
			let {
				app_text
			} = this.configInfo
			uni.setNavigationBarTitle({
				title: app_text || '首页'
			})
			// #endif 
		},
		async onShow() {
			// #ifdef H5
			if (this.$jweixin.isWechat()) {
				await this.$jweixin.initJssdk();
				this.toAppShare()
			}
			let {
				app_text
			} = this.configInfo
			uni.setNavigationBarTitle({
				title: app_text || '首页'
			})
			// #endif 
			if (this.haveShieldOper == 2) {
				this.initIndex()
				this.updateUserItem({
					key: 'haveShieldOper',
					val: 0
				})
			}
			if (this.pageActive && this.userInfo.id) {
				this.getCouponList()
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
			let path = `/pages/service?pid=${pid}`
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
			...mapActions(['getConfigInfo', 'getUserInfo', 'updateCommonOptions', 'addScanRecord', 'updateScanRecord',
				'getServiceIndex', 'getRecommendList', 'getServiceList'
			]),
			...mapMutations(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
				'updateDynamicItem', 'updateShopstoreItem'
			]),
			async initIndex(refresh = false) {
					if (!this.configInfo.id || refresh) {
						await this.getConfigInfo()
					}
					let {
						pid = 0,
							channel_id = 0
					} = this.options
					let {
						realtime_location: rloca = 0
					} = this.configInfo
					if (!refresh && this.pageActive && (!rloca && !this.changeAddr) && (!pid || !channel_id)) {
						this.isLoad = true
						this.loading = false
						this.$util.hideAll()
						return
					}

					// #ifdef H5
					if (this.isGzhLogin) {
						setTimeout(() => {
							this.toBindChannel()
						}, 1000)
					} else {
						await this.toBindChannel()
					}
					// #endif
					// #ifndef H5
					await this.toBindChannel()
					// #endif  

					await this.getServiceIndex()
					this.isLoad = true




					let {
						location,
						locaRefuse,
						changeAddr
					} = this
					let {
						plugAuth = {},
							realtime_location = 0
					} = this.configInfo
					let {
						recommend = false
					} = plugAuth


					let {
						status: coach_status,
						coach_position
					} = this.userCoachStatus

					// #ifdef APP-PLUS
					if (!locaRefuse && ((realtime_location && !changeAddr) || (!realtime_location && recommend && !location
							.lat))) {
						// #endif
						// #ifndef APP-PLUS
						if ((realtime_location && !changeAddr) || (!realtime_location && recommend && !location.lat)) {
							// #endif
							// #ifdef MP-WEIXIN
							let privacyCheck = this.$refs.user_privacy.check()
							if (privacyCheck) {
								this.$refs.user_privacy.open()
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
								// await this.$jweixin.wxReady3()
								// let {
								// 	latitude: lat = 0,
								// 	longitude: lng = 0
								// } = await this.$jweixin.getWxLocation()
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
								lng = 0,
									lat = 0
							} = this.location
							this.updateServiceItem({
								key: 'pageActive',
								val: true
							})
							this.$util.hideAll()

							let {
								plugAuth = {},
									realtime_location = 0
							} = this.configInfo
							let {
								recommend = false
							} = plugAuth

							// #ifndef H5
							// #ifdef APP-PLUS
							if (!lat && !lng) {
								// #endif 
								// #ifdef MP-WEIXIN
								if (!lat && !lng && (realtime_location || (!realtime_location && recommend))) {
									// #endif

									if (this.userInfo.id && this.have_coupon) {
										this.getCouponList()
									}
									this.updateServiceItem({
										key: 'recommend_list',
										val: []
									})
									this.updateServiceItem({
										key: 'list',
										val: {
											data: [],
											last_page: 1,
											current_page: 1
										}
									})
									this.loading = false
									this.$util.hideAll()
									return
								}
								// #endif

								if (recommend) {
									await Promise.all([this.getRecommendList({
										lat,
										lng
									}), this.getList(1)])
								} else {
									await this.getList(1)
								}

								if ((realtime_location || (!realtime_location && recommend)) && !this.changeAddr) {
									this.$util.getMapInfo()
								}
								if (this.userInfo.id && this.have_coupon) {
									this.getCouponList()
								}
							},
							initRefresh() {
									this.initIndex(true)
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
											this.$refs.open_location_info.pShow = false
											let {
												recommend
											} = this.configInfo.plugAuth
											if (recommend) {
												await Promise.all([this.getRecommendList({
													lat,
													lng
												}), this.getList(1)])
											} else {
												await this.getList(1)
											}
											this.$util.getMapInfo()
											let updateArr = ['updateTechnicianItem', 'updateMapItem',
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
										async getList(page = 0) {
											let {
												realtime_location = 0
											} = this.configInfo
											if (page) {
												let {
													tabList,
													activeIndex
												} = this
												let {
													service_filter = true
												} = this.banner
												if (!service_filter) {
													activeIndex = 0
												}
												let {
													sort,
													sign
												} = tabList[activeIndex]

												if (realtime_location && activeIndex == 0) {
													sort = 'type desc'
												}
												let desc = activeIndex == 0 || sign == 1 ? '' : 'desc'
												this.updateServiceItem({
													key: 'param',
													val: {
														page: page,
														sort: `${sort} ${desc}`
													}
												})
											}
											this.loading = true
											let {
												list: oldList,
												location,
											} = this


											let {
												lng = 0,
													lat = 0
											} = location
											// #ifdef APP-PLUS
											if (!lat && !lng) {
												// #endif
												// #ifndef APP-PLUS
												if (!lat && !lng && realtime_location) {
													// #endif
													this.loading = false
													this.$util.hideAll()
													return
												}

												let param = Object.assign({}, this.param, {
													lat,
													lng
												})
												await this.getServiceList(param)
												this.loading = false
												this.$util.hideAll()
											},
											handerTabChange(index) {
													this.updateServiceItem({
														key: 'activeIndex',
														val: index
													})
													let tabList = this.$util.deepCopy(this.tabList)
													let {
														is_sign,
														sign,
													} = tabList[index];
													if (is_sign) {
														tabList[index].sign = sign == 0 ? 1 : 0;
													}
													this.updateServiceItem({
														key: 'tabList',
														val: tabList
													})
													this.$util.showLoading()
													uni.pageScrollTo({
														scrollTop: 0
													})
													this.getList(1)
												},
												async getCouponList() {
														let {
															lat,
															lng
														} = this.location
														let {
															discount = 0,
																list
														} = await this.$api.service.couponList({
															lat,
															lng
														})
														this.couponList = list
														this.coupon_discount = discount
														if (this.isLoad) {
															if (discount * 1 > 0) {
																this.$refs.coupon_auto_item.open()
															}
															if (discount * 1 == 0 && list.length > 0) {
																this.$refs.coupon_item.open()
															}
														}
														this.loading = false
														this.$util.hideAll()
													},
													toAppShare() {
														let {
															id: pid = 0
														} = this.userInfo
														let title = '首页'
														let {
															siteroot
														} = siteInfo
														let url = siteroot.split('/index.php')[0]
														let href = `${url}/h5/#/pages/service?pid=${pid}`
														let imageUrl = ''
														this.$jweixin.wxReady(() => {
															this.$jweixin.showOptionMenu()
															this.$jweixin.shareAppMessage(title, '',
																href,
																imageUrl)
															this.$jweixin.shareTimelineMessage(title,
																href,
																imageUrl)
														})
													},
													async toBindChannel() {
															let {
																pid = 0,
																	channel_id = 0
															} = this.options
															let {
																id = 0
															} = this.userInfo
															if ((pid || channel_id) && !id) {
																await this.getUserInfo()
															}
															let {
																id: uid
															} = this.userInfo
															if (channel_id && uid) {
																await this.$api.user.bindChannel({
																	channel_id
																})
															}
															if (this.scanRecordId) {
																this.updateScanRecord()
															}
														},
														// 轮播图
														goBanner(e) {
															// connect_type 1查看大图，2文章
															let {
																connect_type,
																type_id: id = 0,
																img: current,
																linkType = 0,
																link = []
															} = e
															if (connect_type) {
																switch (connect_type) {
																	case 1:
																		this.$util.previewImage({
																			current,
																			urls: [current]
																		})
																		break;
																	case 2:
																		this.$util.goUrl({
																			url: `/user/pages/article?id=${id}`
																		})
																		break;
																}
																return
															}
															let {
																url
															} = link[0]
															this.toConfirmGoUrl(url, linkType, current[0].url)
														},
														// 导航栏
														goCate(e) {
															let {
																id,
																title,
																url = '',
																linkType = 0,
																link = [],
																img = []
															} = e
															if (linkType) {
																url = link[0].url
															}
															if (!url) {
																url =
																	`/user/pages/service/list?id=${id}&title=${title}`
															}
															if (['/technician/pages/apply?type=1',
																	'/agent/pages/apply'
																].includes(
																	url)) {
																this.$util.toCheckLogin({
																	url
																})
																return
															}

															if (!linkType) {
																this.$util.goUrl({
																	url
																})
																return
															}
															this.toConfirmGoUrl(url, linkType, img[0].url,
																title)
														},
														toConfirmGoUrl(url, linkType, current, title = '') {
															if (['/technician/pages/apply?type=1',
																	'/agent/pages/apply'
																].includes(
																	url)) {
																this.$util.toCheckLogin({
																	url
																})
																return
															}
															if (linkType == 5) {
																this.$util.previewImage({
																	current,
																	urls: [current]
																})
																return
															}

															let {
																methodObj
															} = this.configInfo
															let openType = methodObj[linkType]
															// #ifdef H5
															if (openType === 'web') {
																window.location.href = url
																return
															}
															if (openType === 'miniProgram') {
																let arr = url.split(";")
																let appid = arr[0]
																let path = arr.length > 1 ? arr[1] : ''
																this.openMiniForm = {
																	title,
																	appid,
																	path,
																	img: current
																}
																this.$refs.open_mini_program.open()
																return
															}
															// #endif
															this.$util.goUrl({
																url,
																openType
															})
														},
														async userGetCoupon() {
																let ids = []
																this.couponList.forEach(v => {
																	ids.push(v.id)
																})
																let res = await this.$api.service
																	.userGetCoupon({
																		coupon_id: ids
																	})
																this.$util.showToast({
																	title: `领取成功`
																})
																setTimeout(() => {
																	this.$util.goUrl({
																		url: '/user/pages/coupon/list'
																	})
																}, 1000)
																this.$refs.coupon_item.close()
																this.loading = false
																this.$util.hideAll()
															},
															async toCouponGetBtn() {
																	this.$refs.coupon_auto_item.close()
																	this.$util.goUrl({
																		url: '/user/pages/coupon/list'
																	})
																},
																toTechnician(index) {
																	let {
																		id,
																		city_id,
																		coach_name
																	} = this.recommend_list[index]
																	this.updateTechnicianItem({
																		key: 'pageActive',
																		val: false
																	})
																	this.$util.goUrl({
																		url: `/pages/technician?coach_id=${id}&coach_name=${coach_name}&city_id=${city_id}`,
																		openType: `reLaunch`
																	})
																}
										}
						}
</script>


<style lang="scss">
	.pages-home {
		.search-box {
			width: 710rpx;
			bottom: 0;
			z-index: 9;
			overflow: hidden;
		}

		.recommend-technician {
			white-space: nowrap;
			width: 650rpx;

			.recommend-item {
				display: inline-block;
			}

			.recommend-item.type-1 {
				width: 143rpx;
				margin-left: 26rpx;

				.cover {
					width: 143rpx;
					height: 143rpx;
				}

				.ellipsis {
					max-width: 143rpx;
				}
			}

			.recommend-item.type-2 {
				width: 203rpx;
				height: 151rpx;
				background: #F4F6F7;
				border-radius: 12rpx;
				margin-left: 20rpx;

				.cover {
					width: 70rpx;
					height: 70rpx;
				}

				.ellipsis {
					max-width: 82rpx;
				}

				.iconyduixingxingshixin {
					font-size: 26rpx;
					background-image: -webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%);
				}

				.star-text {
					height: 26rpx;
					color: #FF9519;
					margin-left: 6rpx;
				}

				.new-technician {
					width: 67rpx;
					height: 30rpx;
					border-radius: 8rpx;
					transform: rotateZ(360deg);
				}
			}

			.recommend-item:nth-child(1) {
				margin-left: 0;
			}
		}

	}

	.coupon-auto-popup {
		width: 600rpx;
		height: 737rpx;
		padding: 0 40rpx;

		.bg-img {
			top: 0;
			left: 40rpx;
			width: 520rpx;
			height: 607rpx;
		}

		.icon-guanbi-fill {
			font-size: 40rpx;
			top: 22rpx;
			right: 0;
			z-index: 999;
		}

		.content {
			top: 200rpx;
			left: 40rpx;
			width: 520rpx;
			height: 365rpx;
			padding: 0rpx 60rpx;

			.title {
				font-size: 52rpx;
				color: #F12E1A;
				margin-bottom: 16rpx;
			}

			.f-mini-title {
				color: #3A3A3A;
			}
		}

		.get-btn {
			top: 657rpx;
			left: 77rpx;
			width: 448rpx;
			height: 81rpx;
			z-index: 1;
		}

		.get-btn.flex-center {
			z-index: 2
		}
	}

	.coupon-popup {
		width: 658rpx;
		height: 865rpx;

		.bg-img {
			width: 100%;
			height: 100%;
		}

		.icon-close {
			font-size: 60rpx;
			top: 50rpx;
			right: 60rpx;
			z-index: 999;
		}

		.coupon-info {
			position: absolute;
			width: 100%;
			height: 100%;
			bottom: 0;
			left: 0;

			.tops {
				width: 480rpx;
				color: #FB4523;
				position: absolute;
				top: 260rpx;

				>view:nth-child(1) {
					font-weight: bold;
					font-size: 30rpx;
				}
			}

			.lists {
				width: 500rpx;
				height: 300rpx;
				padding: 10rpx;
				overflow-x: hidden;
				position: absolute;
				bottom: 222rpx;

				.list {
					width: 420rpx;
					height: 130rpx;
					margin-bottom: 10rpx;
					margin-top: 5rpx;
					position: relative;

					>image {
						width: 100%;
						height: 100%;
					}

					>view {
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						left: 8rpx;

						>view:nth-child(1) {
							width: 38%;
						}

						>view:nth-child(2) {
							display: flex;
							justify-content: center;
							flex: 1;
							padding: 0 15rpx;
							box-sizing: border-box;
						}

						.price {
							font-size: 30rpx;
							color: #FB4523;
						}

						.title {
							font-size: 30rpx;
							line-height: 36rpx;
							font-weight: bold;
						}

						.price_text {
							color: #ccc;
						}
					}
				}
			}
		}

		view.btns {
			width: 100%;
			position: absolute;
			height: 82rpx;
			bottom: 0rpx;
			left: 0;

			>view {
				width: 422rpx;
				height: 82rpx;

				border-radius: 40rpx;
				font-size: 34rpx;
				color: #FFFFFF;
			}
		}
	}
</style>