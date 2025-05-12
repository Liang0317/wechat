<template>
	<view class="dynamic-follow">
		<fixed>
			<view>
				<search @input="toSearch" type="input" :padding="30" :radius="0" backgroundColor="#fff"
					:placeholder="'请输入'+$t('action.attendantName')+'姓名'">
				</search>
			</view>
		</fixed>
		<view @tap.stop="toCheck(index)" class="list-item flex-center mt-md ml-md mr-md"
			v-for="(item,index) in list.data" :key="index">
			<i class="iconfont mr-md"
				:class="[{'icon-xuanze':coach_info.id != item.id},{'icon-radio-fill':coach_info.id == item.id}]"
				:style="{color:coach_info.id == item.id?primaryColor:'#BEC3CE'}"></i>
			<view class="flex-1 flex-center fill-base pd-lg radius-16">
				<image mode="aspectFill" class="avatar radius" :src="item.work_img"></image>
				<view class="flex-1 flex-between ml-md">
					<view class="f-title c-black text-bold max-200 ellipsis">{{item.coach_name}}
					</view>
					<view class="flex-center f-desc c-black"> <i class="iconfont iconjuli"
							:style="{color:primaryColor}"></i>
						{{item.distance}}
					</view>
				</view>
			</view>
		</view>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<view class="space-max-footer"></view>

		<fix-bottom-button @confirm="submit" :text="[{text:'确定选择',type:'confirm'}]" bgColor="#fff">
		</fix-bottom-button>
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
				coach_info: {},
				loading: true,
				param: {
					page: 1
				},
				list: {
					data: []
				},
				lockTap: false
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
			let {
				coach_info = {}
			} = this.$util.getPage(-1)
			this.coach_info = coach_info
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			uni.setNavigationBarTitle({
				title: '选择' + this.$t('action.attendantName')
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
				param = Object.assign({}, param, {
					lat,
					lng
				})

				let newList = await this.$api.mine.coachList(param)
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
			toSearch(val) {
				this.param.page = 1
				this.param.coach_name = val
				this.getList()
			},
			toCheck(index) {
				let item = this.list.data[index]
				this.coach_info = item
			},
			submit() {
				let {
					id = 0
				} = this.coach_info
				if (!id) {
					this.$util.showToast({
						title: `请选择${this.$t('action.attendantName')}`
					})
					return
				}
				this.$util.getPage(-1).coach_info = this.coach_info
				setTimeout(() => {
					this.$util.goUrl({
						url: 1,
						openType: `navigateBack`
					})
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.dynamic-follow {
		.list-item {

			.iconfont {
				font-size: 40rpx;
			}

			.avatar {
				width: 90rpx;
				height: 90rpx;
			}

			.text {
				color: #4D4D4D;
				margin-top: 6rpx;
			}

			.iconjuli {
				font-size: 26rpx;
			}
		}
	}
</style>