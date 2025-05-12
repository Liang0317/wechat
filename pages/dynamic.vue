<template>
	<view class="pages-dynamic">
		<block v-if="isLoad">
			<block v-if="configInfo.plugAuth.dynamic">
				<fixed>
					<!-- #ifndef H5 -->
					<uni-nav-bar :fixed="false" :shadow="false" :statusBar="true" :title="navTitle" color="#ffffff"
						:backgroundColor="primaryColor">
					</uni-nav-bar>
					<!-- #endif -->
					<view class="fix-info fill-body rel">
						<!-- #ifndef H5 -->
						<view class="space-top abs" :style="{background:primaryColor}"></view>
						<!-- #endif -->
						<view class="search-info fill-base pt-lg pl-lg pr-lg pb-md abs">
							<view class="flex-center pb-md">
								<view @tap.stop="$refs.show_item.open()"
									class="dynamic-btn flex-center f-caption mr-lg radius"
									:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}"
									v-if="coach_status == 1 && configInfo.web_coach_port">
									<i class="iconfont icon-jia-bold"></i>
									发动态
								</view>
								<view class="flex-1">
									<search @input="toSearch" type="input" :padding="0" :radius="30"
										backgroundColor="#F0F0F0" :placeholder="'请输入'+$t('action.attendantName')+'姓名'">
									</search>
								</view>
							</view>
							<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1"
								:activeColor="primaryColor" width="50%" height="90rpx" fontSize="28rpx" :numberType="2"
								lineClass="sm"></tab>
						</view>
					</view>
				</fixed>

				<view class="space-md"></view>
				<wfalls-flow :list="list.data" :path="1" ref="dynamic_wfalls" v-if="list.data.length > 0"></wfalls-flow>
				<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading"
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

			</block>
			<block v-else>
				<abnor type="NOT_AUTH"></abnor>
			</block>


			<view class="space-footer"></view>

			<uni-popup ref="show_item" type="bottom">
				<view class="show-popup pd-lg">
					<view @tap.stop="toAddDynamic(1)" class="show-item flex-center f-paragraph mt-md radius-16">发布图片
					</view>
					<view @tap.stop="toAddDynamic(2)" class="show-item flex-center f-paragraph mt-md radius-16">发布视频
					</view>
					<view @tap.stop="$refs.show_item.close()" class="show-item flex-center f-paragraph mt-md radius-16"
						:style="{color:primaryColor}">取消</view>
					<view class="space-safe"></view>
				</view>
			</uni-popup>


			<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
			<tabbar :cur="3"></tabbar>

			<!-- #ifdef APP-PLUS -->
			<open-location-info ref="open_location_info"></open-location-info>
			<login-info></login-info>
			<!-- #endif -->
			<change-user-type></change-user-type>
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
	import tabbar from "@/components/tabbar.vue"
	import wfallsFlow from "@/components/wfalls-flow.vue"
	export default {
		components: {
			tabbar,
			wfallsFlow
		},
		data() {
			return {
				isLoad: false,
				options: {},
				navTitle: '',
				loading: true,
				lockTap: false
			}
		},
		computed: mapState({
			pageActive: state => state.dynamic.pageActive,
			activeIndex: state => state.dynamic.activeIndex,
			tabList: state => state.dynamic.tabList,
			param: state => state.dynamic.param,
			list: state => state.dynamic.list,
			coach_status: state => state.dynamic.coach_status,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			autograph: state => state.user.autograph,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			locaRefuse: state => state.user.locaRefuse,
			isGzhLogin: state => state.user.isGzhLogin,
			haveShieldOper: state => state.user.haveShieldOper,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		async onLoad(options) {
			this.options = options
			// #ifndef H5
			this.$util.showLoading()
			// #endif
			await this.initIndex()
			this.updateDynamicItem({
				key: 'pageActive',
				val: true
			})
			let {
				tabBar
			} = this.configInfo
			let ind = tabBar.findIndex(item => {
				return item.id == 3
			})
			let navTitle = ind == -1 ? '动态' : tabBar[ind].name
			this.navTitle = navTitle
			// #ifdef H5
			uni.setNavigationBarTitle({
				title: navTitle
			})
			// #endif
		},
		async onShow() {
			// #ifdef H5
			if (this.$jweixin.isWechat()) {
				await this.$jweixin.initJssdk();
				this.toAppShare()
			}
			// #endif
			if (this.haveShieldOper == 1) {
				await this.initIndex()
				this.updateUserItem({
					key: 'haveShieldOper',
					val: 0
				})
			}
			if (!this.location.lat && this.locaRefuse) {
				this.toResetUtilLoca()
			}

		},
		async onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif
			await this.initRefresh();
			uni.stopPullDownRefresh()
		},
		async onReachBottom() {
			if (this.list.current_page >= this.list.last_page || this.loading) return;
			this.param.page = this.param.page + 1;
			this.loading = true;
			await this.getList();
			setTimeout(() => {
				this.$refs.dynamic_wfalls.handleViewRender();
			}, 0)
		},
		onShareAppMessage(e) {
			let {
				id: pid = 0
			} = this.userInfo
			let path = `/pages/dynamic?pid=${pid}`
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
			...mapActions(['getConfigInfo', 'getUserInfo', 'getDynamicIndex',
				'getDynamicList'
			]),
			...mapMutations(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
				'updateDynamicItem', 'updateShopstoreItem'
			]),
			async initIndex(refresh = false) {
				let {
					pid = 0
				} = this.options

				if (!refresh && this.pageActive && !pid) {
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

				if (!this.configInfo.id || refresh || (this.configInfo.id && !this.configInfo.plugAuth.hasOwnProperty(
						'dynamic'))) {
					await this.getConfigInfo()
				}

				let {
					dynamic = false
				} = this.configInfo.plugAuth
				if (!dynamic) {
					this.isLoad = true
					this.loading = false
					this.$util.hideAll()
					return
				}

				await Promise.all([this.getDynamicIndex(), this.getList(1)])
			},
			async initRefresh() {
				await this.initIndex(true)
				let {
					tabBar
				} = this.configInfo
				let ind = tabBar.findIndex(item => {
					return item.id == 3
				})
				let navTitle = ind == -1 ? '动态' : tabBar[ind].name
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
					this.$refs.open_location_info.pShow = false
					await this.getList(1)
					let updateArr = ['updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
						'updateShopstoreItem'
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
			toAppShare() {
				let {
					id: pid = 0
				} = this.userInfo
				let {
					title
				} = this.detail
				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/pages/dynamic?pid=${pid}`
				let imageUrl = ''
				this.$jweixin.wxReady(() => {
					this.$jweixin.showOptionMenu()
					this.$jweixin.shareAppMessage(title, '', href, imageUrl)
					this.$jweixin.shareTimelineMessage(title, href, imageUrl)
				})
			},
			async handerTabChange(index) {
				this.updateDynamicItem({
					key: 'activeIndex',
					val: index
				})
				uni.pageScrollTo({
					scrollTop: 0
				})
				await this.getList(1)
				if (index == 1) {
					await this.getDynamicIndex()
				}
			},
			toSearch(val) {
				this.param.coach_name = val
				this.getList(1)
			},
			async getList(page) {
				if (page) {
					this.param.page = 1
					this.list.data = []
				}
				let {
					location,
					locaRefuse
				} = this


				let {
					status: coach_status,
					coach_position
				} = this.userCoachStatus

				// #ifdef APP-PLUS
				if (this.param.page == 1 && !locaRefuse && (!location.lat || (location.lat && location.address ==
						'暂未获取到位置信息'))) {
					// #endif
					// #ifndef APP-PLUS
					if (this.param.page == 1 && (!location.lat || (location.lat && location.address == '暂未获取到位置信息'))) {
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
						this.updateMapItem({
							key: 'pageActive',
							val: false
						})
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
								lat = 0, lng = 0, is_util_loca = 0
							} = this.location

							// #ifdef APP-PLUS
							if (!lat && !lng) {
								this.updateDynamicItem({
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
							let {
								list: oldList,
							} = this
							let param = Object.assign({}, this.param, {
								lat,
								lng
							});
							await this.getDynamicList(param)
							this.isLoad = true
							this.loading = false
							this.$util.hideAll()
							if (param.page == 1 && lat && lng && is_util_loca) {
								this.$util.getMapInfo()
							}
						},
						toAddDynamic(type) {
							this.$refs.show_item.close()
							this.$util.goUrl({
								url: `/dynamic/pages/technician/edit?type=${type}`
							})
						}
			}
		}
</script>


<style lang="scss">
	.pages-dynamic {
		.fix-info {
			height: 225rpx;

			.space-top {
				width: 100%;
				height: 40rpx;
				top: 0;
			}

			.search-info {
				width: 100%;
				top: 0;
				border-radius: 40rpx;

				.dynamic-btn {
					width: 134rpx;
					height: 56rpx;
					transform: rotateZ(360deg);

					.iconfont {
						font-size: 24rpx;
						margin-right: 6rpx;
					}
				}
			}
		}

		.show-popup {
			width: 750rpx;
			background: #F3F3F5;
			border-radius: 30rpx 30rpx 0 0;

			.avatar {
				width: 84rpx;
				height: 84rpx;
			}

			.show-item {
				color: #222;
				height: 100rpx;
				background: #fff;
			}
		}

	}
</style>