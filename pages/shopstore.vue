<template>
	<view class="pages-shopstore">
		<block v-if="isLoad">
			<block v-if="configInfo.plugAuth.store">

				<fixed>
					<search @input="toSearch" type="input" :padding="30" :radius="0" backgroundColor="#fff"
						placeholder="请输入门店名称">
					</search>
				</fixed>

				<view class="fill-base mt-md ml-md mr-md radius-16" style="overflow: hidden;" v-if="cateList.length>0">
					<column @change="goCate" :list="cateList" :indicatorActiveColor="primaryColor" :colNum="5"
						:rowNum="2">
					</column>
				</view>


				<block v-for="(item,index) in list.data" :key="index">
					<shopstore-list-item :info="item"></shopstore-list-item>
				</block>

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
			<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
			<tabbar :cur="6"></tabbar>

			<!-- #ifdef APP-PLUS -->
			<open-location-info ref="open_location_info" :isAdd="false"></open-location-info>
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
	import shopstoreListItem from "@/components/shopstore-list-item.vue"
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			shopstoreListItem,
			tabbar
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
			pageActive: state => state.shopstore.pageActive,
			cateList: state => state.shopstore.cateList,
			param: state => state.shopstore.param,
			list: state => state.shopstore.list,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			autograph: state => state.user.autograph,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			locaRefuse: state => state.user.locaRefuse,
			isGzhLogin: state => state.user.isGzhLogin,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		async onLoad(options) {
			this.$util.showLoading()
			this.options = options
			// #ifndef H5
			this.$util.showLoading()
			// #endif
			await this.initIndex()
			let {
				tabBar
			} = this.configInfo
			let ind = tabBar.findIndex(item => {
				return item.id == 6
			})
			let navTitle = ind == -1 ? '门店' : tabBar[ind].name
			this.navTitle = navTitle
			uni.setNavigationBarTitle({
				title: navTitle
			})
			this.updateShopstoreItem({
				key: 'pageActive',
				val: true
			})
		},
		async onShow() {
			// #ifdef H5
			if (this.$jweixin.isWechat()) {
				await this.$jweixin.initJssdk();
				this.toAppShare()
			}
			// #endif
			if (!this.location.lat && this.locaRefuse) {
				this.toResetUtilLoca()
			}
		},
		onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif
			this.initRefresh();
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.list.current_page >= this.list.last_page || this.loading) return;
			this.param.page = this.param.page + 1;
			this.loading = true;
			this.getList();
		},
		onShareAppMessage(e) {
			let {
				id: pid = 0
			} = this.userInfo
			let path = `/pages/shopstore?pid=${pid}`
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
				'getShopstoreIndex', 'getShopstoreList'
			]),
			...mapMutations(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
				'updateDynamicItem', 'updateShopstoreItem'
			]),
			async initIndex(refresh = false) {
				let {
					pid = 0
				} = this.options

				if (!refresh && this.pageActive && !pid) {
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

				if (!this.configInfo.id || refresh || (this.configInfo.id && !this.configInfo.plugAuth.hasOwnProperty(
						'store'))) {
					await this.getConfigInfo()
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})

				let {
					store = false
				} = this.configInfo.plugAuth
				if (!store) {
					this.isLoad = true
					this.loading = false
					this.$util.hideAll()
					return
				}

				await Promise.all([this.getShopstoreIndex(), this.getList(1)])
			},
			async initRefresh() {
				await this.initIndex(true)
				let {
					tabBar
				} = this.configInfo
				let ind = tabBar.findIndex(item => {
					return item.id == 6
				})
				let navTitle = ind == -1 ? '门店' : tabBar[ind].name
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
					this.$refs.open_location_info.pShow = false
					await this.getList(1)
					let updateArr = ['updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
						'updateDynamicItem'
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
				let title = '动态'
				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/pages/shopstore?pid=${pid}`
				let imageUrl = ''
				this.$jweixin.wxReady(() => {
					this.$jweixin.showOptionMenu()
					this.$jweixin.shareAppMessage(title, '', href, imageUrl)
					this.$jweixin.shareTimelineMessage(title, href, imageUrl)
				})
			},
			toSearch(val) {
				this.param.title = val
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
								this.updateShopstoreItem({
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

							await this.getShopstoreList(param)
							this.isLoad = true
							this.loading = false
							this.$util.hideAll()
							if (param.page == 1 && lat && lng && is_util_loca) {
								this.$util.getMapInfo()
							}
						},
						goCate(e) {
							let {
								id,
								title,
							} = e
							let url = `/shopstore/pages/store-list?id=${id}&title=${title}`
							this.$util.goUrl({
								url
							})
						},
			}
		}
</script>


<style lang="scss">
</style>