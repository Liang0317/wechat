<template>
	<view class="pages-technician">
		<fixed :initHeight="configInfo.coach_format">
			<view class="fix-info fill-body rel" :style="{height:'124rpx'}">
				<view class="search-info fill-base pd-lg abs" style="border-radius:0 0 40rpx 40rpx">
					<search @input="toSearch" type="input" :keyword="param.coach_name" :padding="0" :radius="30"
						backgroundColor="#F0F0F0" :placeholder="'请输入'+$t('action.attendantName')+'姓名'">
					</search>
				</view>
			</view>
		</fixed>


		<view class="ml-md mr-md" :class="[{'flex-warp':[2,3].includes(configInfo.coach_list_format)}]"
			v-if="list.data && list.data.length>0">

			<view class="mt-md" :class="[{'mr-md':[2,3].includes(configInfo.coach_list_format) && index%2==0}]"
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


		<view class="space-footer"></view>

		<technician-list-popup ref="technician_list_popup" :sid="options.id"></technician-list-popup>

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
				activeIndex: 0,
				param: {
					page: 1,
					coach_name: ''
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false,
			}
		},
		computed: mapState({
			pageActive: state => state.technician.pageActive,
			tabList: state => state.technician.tabList,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			loginType: state => state.user.loginType,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
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
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			uni.setNavigationBarTitle({
				title: this.$t('action.attendantName') + '列表'
			})
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
			...mapActions(['getConfigInfo', 'getUserInfo']),
			...mapMutations(['updateUserItem', 'updateMapItem']),
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
				await this.getList()
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
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
			toSearch(val) {
				this.param.coach_name = val
				this.getList(1)
			},
			async getList(page = 0, refresh = false, change = 0) {
				if (page) {
					this.param.page = 1
				}
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
					lng = 0,
						lat = 0,
						is_util_loca = 0
				} = this.location

				let {
					list: oldList,
					tabList,
					activeIndex,
				} = this
				let {
					id: store_id
				} = this.options
				let param = this.$util.deepCopy(this.param)
				param = Object.assign({}, param, {
					lat,
					lng,
					store_id
				})

				let {
					coach_format = 1
				} = this.configInfo

				if (coach_format == 1) {
					param.type = tabList[activeIndex].id
				}

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
				if (param.page == 1 && lat && lng && is_util_loca) {
					this.$util.getMapInfo()
				}
			},
			handerTabChange(index) {
				this.activeIndex = index
				this.$util.showLoading()
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.getList(1)
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
</style>