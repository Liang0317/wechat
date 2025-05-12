<template>
	<view class="user-channel-index" v-if="isLoad">
		<view class="mine-menu-list c-base" :style="{background:primaryColor}">
			<view class="flex-between pt-md pl-lg pb-lg">
				<view class="flex-center">
					<view class="f-desc mr-sm">上级</view>
					<view class="f-title max-400 ellipsis">{{detail.salesman_name || detail.agent_name || '平台'}}</view>
				</view>
				<view @tap.stop="$util.goUrl({url:`/user/pages/channel/qr`})"
					class="channel-code flex-center f-icontext">
					<i class="iconfont iconerweima"></i>
					渠道码
					<i class="iconfont icon-down"></i>
				</view>
			</view>
			<view class="money-count flex-center pb-lg">
				<view class="item-child flex-center flex-column">
					<view class="num text-bold">{{detail.order_price}}</view>
					<view class="f-caption">订单总金额</view>
					<view class="f-caption" style="height:36rpx">不含物料费</view>
				</view>
				<view class="line"></view>
				<view class="item-child flex-center flex-column">
					<view class="num text-bold">{{detail.order_count}}</view>
					<view class="f-caption">订单数量</view>
					<view style="height:36rpx"></view>
				</view>
				<view class="line"></view>
				<view class="item-child flex-center flex-column">
					<view class="num text-bold">{{detail.total_cash}}</view>
					<view class="f-caption">总佣金</view>
					<view class="f-caption" style="height:36rpx">不含手续费</view>
				</view>
			</view>
			<view class="cash-out-list flex-center">
				<view @tap.stop="$util.goUrl({url:`/user/pages/distribution/record?type=4`})"
					class="item-child flex-center f-mini-title c-base radius">提现记录</view>
				<view @tap.stop="$util.goUrl({url:`/user/pages/cash-out?type=channel`})"
					class="item-child flex-center f-mini-title c-base radius" :style="{color:primaryColor}">申请提现
				</view>
			</view>
		</view>
		<view class="search-info flex-between fill-base">
			<view class="item-search">
				<search @input="toSearch" @confirm="toSearch" type="input" placeholder="请输入服务名称/订单号"></search>
			</view>
			<view @tap="$refs.show_choose_time.open()" class="flex-center pr-md f-paragraph c-title">
				筛选
				<i class="iconfont iconshaixuanxia-1"></i>
			</view>
		</view>

		<view class="order-pages">
			<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16" v-for="(item,index) in list.data"
				:key="index">
				<view class="flex-between pb-lg">
					<view class="f-paragraph c-title max-350 ellipsis">下单人：{{item.address_info.user_name}}</view>
					<view class="f-caption c-caption">{{item.create_time}}</view>
				</view>
				<view class="flex-center mb-lg" v-for="(aitem,aindex) in item.order_goods" :key="aindex">
					<image mode="aspectFill" class="avatar lg radius-16" :src="aitem.goods_cover"></image>
					<view class="flex-1 ml-md">
						<view class="flex-between">
							<view class="f-mini-title c-title text-bold ellipsis"
								:class="[{'max-300':aitem.refund_num>0},{'max-450':aitem.refund_num==0}]">
								{{aitem.goods_name}}
							</view>
							<view class="f-caption c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
						</view>
						<view class="f-caption c-caption mt-sm mb-sm">
							服务{{$t('action.attendantName')}}：{{item.coach_info ? item.coach_info.coach_name : '-'}}
						</view>
						<view class="flex-between">
							<view class="flex-y-baseline f-caption c-warning">¥<view class="f-title text-bold">
									{{aitem.true_price}}
								</view>
								<view class="c-caption ml-sm" v-if="aitem.material_price*1>0">
									物料费:¥{{aitem.material_price}}</view>
							</view>
							<view class="c-paragraph">x{{aitem.num}}</view>
						</view>
					</view>
				</view>
				<view class="flex-between f-caption">
					<view>
						<view class="flex-y-center">
							分销佣金：<view class="c-warning mr-sm">¥{{item.channel_cash}}</view>
						</view>
						<view class="flex-y-center">
							手续费：<view class="c-warning">¥{{item.point_cash}}</view>
						</view>
						<view class="flex-y-center" style="margin-top: 4rpx;" v-if="item.refund_price*1>0">
							总计退款：<view class="c-warning">¥{{item.refund_price}}</view>
						</view>
					</view>
					<view>
						<view class="flex-between">
							<view></view>
							<view class="flex-y-center f-desc c-title">付款：
								<view class="text-bold">¥{{item.true_service_price}}</view>
							</view>
						</view>
						<view class="c-caption" v-if="item.material_price*1>0">含物料费{{item.material_price}}元
						</view>
					</view>
				</view>
			</view>
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		<view class="space-footer"></view>

		<uni-popup ref="show_choose_time" type="bottom" :maskClick="false">
			<view class="popup-rank fill-base">
				<view class="flex-between pd-lg">
					<view class="f-title c-title text-bold">选择筛选条件</view>
					<view @tap="toConfirm(1)" class="f-caption c-caption">取消</view>
				</view>
				<view class="pd-lg">
					<!-- <block v-if="(detail.is_qr && base_channel.length>1) || (!detail.is_qr && base_channel.length>2)"> -->
					<view class="pt-lg pb-lg f-paragraph text-bold">渠道码</view>
					<view class="flex-warp pb-sm" style="max-height: 28vh;overflow: auto;">
						<view @tap="toChangeItem(index,'channelInd')"
							class="item-rank channel mb-md flex-center f-desc c-title radius-16"
							:style="{background:index==channelInd?primaryColor:'',color:index==channelInd?'#fff':'',borderColor:index==channelInd?primaryColor:''}"
							v-for="(item,index) in base_channel" :key="index">
							<view class="ellipsis" style="max-width: 180rpx;"> {{item.title}}</view>
						</view>
					</view>
					<!-- </block> -->
					<view class="pt-lg pb-lg f-paragraph text-bold">时间</view>
					<view class="flex-warp pb-lg">
						<view @tap="toChangeItem(index,'tabInd')" class="item-rank flex-center f-desc c-title radius-16"
							:class="[{'ml-md':index!=0}]"
							:style="{background:index==tabInd?primaryColor:'',color:index==tabInd?'#fff':'',borderColor:index==tabInd?primaryColor:''}"
							v-for="(item,index) in tabList" :key="index">{{item.title}}</view>
					</view>
					<view class="flex-between pt-lg pb-lg" v-if="tabInd==3">
						<view class="f-paragraph text-bold">开始时间</view>
						<picker mode="date" start="1900-01-01" :end="today" @change="pickerChange($event,'start_time')">
							<view class="flex-y-center f-title"
								:class="[{'c-title':tabList[3].start_time},{'f-caption c-caption':!tabList[3].start_time}]">
								{{tabList[3].start_time || '请选择'}} <i class="iconfont icon-right c-caption"></i>
							</view>
						</picker>
					</view>
					<view class="flex-between pt-md pb-lg" v-if="tabInd==3">
						<view class="f-paragraph text-bold">结束时间</view>
						<picker mode="date" start="1900-01-01" :end="today" @change="pickerChange($event,'end_time')">
							<view class="flex-y-center f-title"
								:class="[{'c-title':tabList[3].end_time},{'f-caption c-caption':!tabList[3].end_time}]">
								{{tabList[3].end_time || '请选择'}} <i class="iconfont icon-right c-caption"></i>
							</view>
						</picker>
					</view>
				</view>
				<view class="btn-info flex-center pd-lg">
					<view @tap="toConfirm(2)" class="item-child flex-center fill-base f-desc radius">重置</view>
					<view @tap="toConfirm(3)" class="item-child flex-center f-desc c-base radius"
						:style="{background:primaryColor,borderColor:primaryColor}">查询</view>
				</view>
				<view class="space-safe"></view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				today: '',
				preCheck: {
					tabInd: 2,
					channelInd: 0,
					start_time: '',
					end_time: ''
				},
				tabInd: 2,
				tabList: [{
					id: 1,
					title: '今日',
					start_time: '',
					end_time: ''
				}, {
					id: 2,
					title: '近7日',
					start_time: '',
					end_time: ''
				}, {
					id: 3,
					title: '近30日',
					start_time: '',
					end_time: ''
				}, {
					id: 4,
					title: '自定义',
					start_time: '',
					end_time: ''
				}],
				detail: {},
				base_channel: [],
				channelInd: 0,
				param: {
					page: 1,
					name: ''
				},
				list: {
					data: []
				},
				loading: true,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad() {
			this.initIndex()
		},
		// #ifdef H5
		destroyed() {
			this.$util.back()
		},
		// #endif
		// #ifndef H5
		onUnload() {
			this.$util.back()
		},
		// #endif  
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
		methods: {
			...mapMutations([]),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				this.$util.showLoading()
				let cur_time = new Date(Math.ceil(new Date().getTime()))
				let today = this.$util.formatTime(cur_time, 'YY-M-D')
				let one = 3600 * 24 * 1000
				let time = this.$util.DateToUnix(today) * 1000
				this.today = today
				this.tabList[0].start_time = today
				this.tabList[0].end_time = today
				this.tabList[1].start_time = this.$util.formatTime(time - 7 * one, 'YY-M-D')
				this.tabList[1].end_time = today
				this.tabList[2].start_time = this.$util.formatTime(time - 30 * one, 'YY-M-D')
				this.tabList[2].end_time = today
				await this.getList()
				let channel = await this.$api.channel.channelQrSelect()
				// if (!this.detail.is_qr) {
				channel.unshift({
					id: 0,
					title: `默认码`
				})
				// }
				channel.unshift({
					id: -1,
					title: `全部`
				})
				this.base_channel = channel
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				uni.setNavigationBarTitle({
					title: '我是' + this.$t('action.channelName')
				})
				this.isLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.param.page == 1
				this.initIndex(true)
			},
			toSearch(val) {
				this.param.page = 1
				this.param.name = val
				this.getList()
			},
			async getList() {
				let {
					list: oldList,
					tabInd,
					tabList,
					channelInd,
					base_channel
				} = this
				let {
					start_time,
					end_time
				} = tabList[tabInd]
				let param = this.$util.deepCopy(this.param)
				param.start_time = this.$util.DateToUnix(start_time)
				param.end_time = this.$util.DateToUnix(end_time) + 24 * 3600 - 1
				if (base_channel.length > 0) {
					let {
						id: qr_id = -1
					} = base_channel[channelInd]
					if (qr_id !== -1) {
						param.qr_id = qr_id
					}
				}

				if (param.page == 1) {
					let param_key = this.$util.deepCopy(param)
					delete param_key.page
					this.detail = await this.$api.channel.index(param_key)
				}
				let newList = await this.$api.channel.orderList(param);
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			pickerChange(e, type) {
				let {
					start_time,
					end_time
				} = this.tabList[3]
				if (type == 'start_time') {
					start_time = e.detail.value
				} else {
					end_time = e.detail.value
				}

				if (start_time && end_time && this.$util.DateToUnix(start_time) > this.$util.DateToUnix(end_time)) {
					this.$util.showToast({
						title: `开始时间不能大于结束时间`
					})
					return
				}

				this.tabList[3][type] = e.detail.value
			},
			toChangeItem(index, key) {
				this[key] = index
			},
			// type 1取消；2重置；3查询
			toConfirm(type, ind = 3) {
				if (type == 2) {
					ind = 0
				}
				let {
					start_time = '',
						end_time = ''
				} = type == 1 ? this.preCheck : this.tabList[ind]
				let {
					tabInd,
					channelInd
				} = type == 2 ? {
					tabInd: 2,
					channelInd: 0
				} : type == 3 ? this : this.preCheck
				if (type == 3) {
					if ((!start_time || !end_time) && tabInd == 3) {
						this.$util.showToast({
							title: !start_time ? `请选择开始时间` : `请选择结束时间`
						})
						return
					}
					this.preCheck.start_time = start_time
					this.preCheck.end_time = end_time
					this.preCheck.tabInd = tabInd
					this.preCheck.channelInd = channelInd
				} else {
					this.tabList[ind].start_time = start_time
					this.tabList[ind].end_time = end_time
					this.tabInd = tabInd
					this.channelInd = channelInd
				}
				if (type != 2) {
					this.$refs.show_choose_time.close()
					this.param.page = 1
					this.getList()
				}
			}
		}
	}
</script>


<style lang="scss">
	.user-channel-index {

		.mine-menu-list {
			height: 370rpx;

			.channel-code {
				width: 134rpx;
				height: 54rpx;
				background: rgba(255, 255, 255, 0.1);
				border-radius: 100rpx 0 0 100rpx;

				.iconerweima {
					font-size: 28rpx;
					margin: 0 5rpx;
				}

				.icon-down {
					font-size: 18rpx;
					transform: scale(0.5) rotate(270deg);
				}
			}

			.money-count {
				.item-child {
					width: 50%;

					.num {
						font-size: 49rpx;
					}
				}

				.line {
					width: 1rpx;
					height: 47rpx;
					background: rgba(255, 255, 255, 0.3);
				}
			}

			.cash-out-list {
				.item-child {
					width: 300rpx;
					height: 70rpx;
					background: #FFFFFF;
				}

				.item-child:nth-child(1) {
					background: rgba(255, 255, 255, 0.5);
					margin-right: 40rpx;
				}
			}

		}

		.search-info {
			border-radius: 0 0 16rpx 16rpx;
			overflow: hidden;

			.item-search {
				width: 630rpx;
			}

			.iconshaixuanxia-1 {
				font-size: 20rpx;
				color: #CDCDCD;
				transform: scale(0.65);
			}
		}

		.popup-rank {
			border-radius: 34rpx 34rpx 0 0;

			.item-rank {
				width: 157rpx;
				height: 72rpx;
				border: 1px solid #E5E5E5;
			}

			.item-rank.channel {
				width: 216rpx;
			}

			.item-rank.channel:nth-child(3n-1) {
				margin: 0 20rpx;
			}

			.btn-info {
				background: #F9F9F9;

				.item-child {
					width: 320rpx;
					height: 80rpx;
					background: #FFFFFF;
					border: 1rpx solid #C7C7C7;
					margin: 0 14rpx;
				}
			}

			.space-safe {
				background: #F9F9F9;
			}
		}
	}
</style>