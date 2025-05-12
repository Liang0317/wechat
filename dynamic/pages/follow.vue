<template>
	<view class="dynamic-follow">
		<view @tap.stop="goDetail(index)"
			class="list-item flex-center fill-base mt-md ml-md mr-md pd-lg radius-16 box-shadow"
			v-for="(item,index) in list.data" :key="index">
			<image mode="aspectFill" class="avatar radius" :src="item.work_img"></image>
			<view class="flex-1 ml-md">
				<view class="flex-between">
					<view class="f-title c-black text-bold ellipsis" style="max-width: 150rpx;">
						{{item.coach_name || '-'}}
					</view>
					<view class="flex-y-baseline f-desc c-black"> <i class="iconfont iconjuli"
							:style="{color:primaryColor}"></i>
						{{item.distance}}
					</view>
				</view>
				<view class="flex-y-baseline">
					<view class="text flex-y-center f-desc">已接单<view class="ml-sm" :style="{color:primaryColor}">
							{{item.order_num}}
						</view>
					</view>
					<view class="flex-y-center f-caption c-caption ml-md"> 粉丝数 <view class="c-title ml-sm">
							{{item.fans_num}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<view class="space-footer"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				loading: true,
				param: {
					page: 1
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
		onLoad() {
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			this.$util.showLoading()
			this.initIndex()
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
				this.getList();
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
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
					param,
				} = this

				let {
					lat = 0, lng = 0, is_util_loca = 0
				} = this.location
				param.lat = lat
				param.lng = lng

				let newList = await this.$api.dynamic.followCoachList(param)
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
			goDetail(index) {
				let {
					coach_id
				} = this.list.data[index]
				this.$util.goUrl({
					url: `/user/pages/technician-info?id=${coach_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.dynamic-follow {
		.list-item {
			.avatar {
				width: 124rpx;
				height: 124rpx;
			}

			.text {
				color: #4D4D4D;
				margin-top: 6rpx;
			}
		}
	}
</style>