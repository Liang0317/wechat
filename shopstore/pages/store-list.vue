<template>
	<view class="shopstore-service">

		<block v-for="(item,index) in list.data" :key="index">
			<shopstore-list-item :info="item"></shopstore-list-item>
		</block>


		<load-more :noMore="list.current_page >= list.last_page && list.data.length > 0" :loading="loading"
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


		<!-- #ifdef APP-PLUS -->
		<open-location-info ref="open_location_info" :isAdd="false"></open-location-info>
		<!-- #endif -->
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
	import shopstoreListItem from "@/components/shopstore-list-item.vue"
	export default {
		components: {
			shopstoreListItem
		},
		data() {
			return {
				options: {},
				loading: true,
				param: {
					page: 1,
				},
				list: {
					data: []
				}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		onLoad(options) {
			let {
				title
			} = options
			this.options = options
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			uni.setNavigationBarTitle({
				title
			})
			this.$util.showLoading()
			this.initIndex()
		},
		async onShow() {
			// #ifdef APP-PLUS
			let {
				lat: locaLat = 0
			} = this.location
			if (!locaLat) {
				let {
					lng = 0,
						lat = 0
				} = await this.$util.getUtilLocation()
				this.$refs.open_location_info.pShow = false
				this.$util.getPage(-1).$refs.open_location_info.pShow = false
				await this.initRefresh()
				this.$util.back()
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
		watch: {
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
			...mapMutations(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
				'updateDynamicItem', 'updateShopstoreItem'
			]),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				this.getList()
			},
			async initRefresh() {
				this.param.page = 1
				await this.initIndex(true)
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
			async getList() {
				let {
					location
				} = this

				let {
					status: coach_status,
					coach_position
				} = this.userCoachStatus

				if (this.param.page == 1 && (!location.lat || (location.lat && location.address == '暂未获取到位置信息'))) {
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
					list: oldList,
				} = this
				let {
					id: cate_id = 0
				} = this.options
				let {
					lat = 0, lng = 0, is_util_loca = 0
				} = this.location
				// #ifdef APP-PLUS
				if (!lat && !lng) {
					this.list = {
						data: [],
						last_page: 1,
						current_page: 1
					}
					this.loading = false
					this.$util.hideAll()
					return
				}
				// #endif
				let param = Object.assign({}, this.param, {
					cate_id,
					lat,
					lng
				})

				let newList = await this.$api.shopstore.storeList(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
				if (param.page == 1 && lat && lng && is_util_loca) {
					this.$util.getMapInfo()
				}
			}
		}
	}
</script>

<style lang="scss">
</style>