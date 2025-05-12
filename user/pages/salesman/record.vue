<template>
	<view class="user-salesman-record" v-if="isLoad">
		<fixed>
			<view class="fill-base flex-center pd-lg">
				<view class="flex-1">
					<search @input="toSearch" type="input" :padding="0" :radius="30" height="70rpx"
						placeholder="搜索渠道码来源">
					</search>
				</view>
				<view @tap.stop="$refs.show_choose_time.open()" class="flex-y-center pl-lg">筛选<i
						class="iconfont iconshaixuanxia-1 c-caption"></i></view>
			</view>
		</fixed>
		<view class="list-item fill-base mt-md ml-md mr-md pd-lg radius-16" v-for="(item,index) in list.data"
			:key="index">
			<view class="flex-between pb-lg b-1px-b">
				<view class="flex-y-center f-desc c-paragraph">下单人：<view class="f-mini-title c-title text-bold max-400 ellipsis">
						{{item.address_info.user_name}}
					</view>
				</view>
				<view class="f-paragraph text-bold" :style="{color:item.status==1?primaryColor:'#F99346'}">
					{{item.status===1?'已入账':'未入账'}}
				</view>
			</view>
			<view @tap.stop="$util.goUrl({url:item.order_code,openType:`copy`})"
				class="flex-y-center f-desc c-paragraph mt-lg">
				<view class="item-text">订单号:</view>
				<view class="c-title">{{item.order_code}}</view>
			</view>
			<view class="flex-y-center f-desc c-paragraph mt-md">
				<view class="item-text">项目付款:</view>
				<view class="c-title">¥{{item.service_price}}</view>
			</view>
			<view class="flex-y-center f-desc c-paragraph mt-md">
				<view class="item-text">物料费:</view>
				<view class="c-title">¥{{item.material_price}}</view>
			</view>
			<view class="flex-y-center f-desc c-paragraph mt-md">
				<view class="item-text">下单时间:</view>
				<view class="c-title">{{item.create_time}}</view>
			</view>
			<view class="flex-y-center f-desc c-paragraph mt-md">
				<view class="item-text">预计佣金:</view>
				<view class="flex-y-center c-warning text-bold">
					¥{{item.salesman_cash_info.cash}}
					<view v-if="item.salesman_cash_info.point_cash*1>0">(手续费¥{{item.salesman_cash_info.point_cash}})</view>
				</view>
			</view>
			<view class="flex-y-center f-desc c-paragraph mt-md">
				<view class="item-text">渠道码来源:</view>
				<view class="c-title">{{item.channel.channel_name}}({{item.channel.balance}}%)</view>
			</view>
		</view>


		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1">
		</abnor>

		<view class="space-footer"></view>

		<uni-popup ref="show_choose_time" type="bottom" :maskClick="false">
			<view class="popup-rank fill-base">
				<view class="flex-between pd-lg">
					<view class="f-title c-title text-bold">选择筛选条件</view>
					<view @tap="toConfirm(1)" class="f-caption c-caption">取消</view>
				</view>
				<view class="pd-lg">
					<view class="pt-lg pb-lg f-paragraph text-bold">状态</view>
					<view class="flex-warp pb-sm">
						<view @tap="toChangeItem(index,'statusInd')"
							class="item-rank channel mb-md flex-center f-desc c-title radius-16"
							:style="{background:index==statusInd?primaryColor:'',color:index==statusInd?'#fff':'',borderColor:index==statusInd?primaryColor:''}"
							v-for="(item,index) in base_status" :key="index">
							<view class="ellipsis" style="max-width: 180rpx;"> {{item.title}}</view>
						</view>
					</view>
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
				options: {},
				today: '',
				preCheck: {
					tabInd: 2,
					statusInd: 0,
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
				base_status: [{
					id: -1,
					title: '全部'
				}, {
					id: 0,
					title: '未入账'
				}, {
					id: 1,
					title: '已入账'
				}],
				statusInd: 0,
				param: {
					page: 1,
					channel_name: ''
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo,
			haveOperItem: state => state.order.haveOperItem,
		}),
		onLoad(options) {
			this.options = options
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
		methods: {
			...mapMutations(['updateUserItem', 'updateOrderItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
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
				this.isLoad = true
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			toSearch(val) {
				this.param.page = 1
				this.param.channel_name = val
				this.getList()
			},
			async getList(page) {
				if (page) {
					this.param.page = 1
					this.list.data = []
					uni.pageScrollTo({
						scrollTop: 0
					})
				}
				let {
					list: oldList,
					tabInd,
					tabList,
					statusInd,
					base_status
				} = this
				let {
					start_time,
					end_time
				} = tabList[tabInd]
				let {
					id: status
				} = base_status[statusInd]
				let param = this.$util.deepCopy(this.param)
				if (status != -1) {
					param.status = status
				}
				param.start_time = this.$util.DateToUnix(start_time)
				param.end_time = this.$util.DateToUnix(end_time) + 24 * 3600 - 1
				let newList = await this.$api.salesman.salesmanChannelOrderListV2(param);
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
					this.statusInd = 0
					this.preCheck.statusInd = 0
				}
				let {
					start_time = '',
						end_time = ''
				} = type == 1 ? this.preCheck : this.tabList[ind]
				let {
					tabInd,
				} = type == 2 ? {
					tabInd: 2,
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
				} else {
					this.tabList[ind].start_time = start_time
					this.tabList[ind].end_time = end_time
					this.tabInd = tabInd
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
	.user-salesman-record {

		.iconshaixuanxia-1 {
			color: #525252;
			font-size: 20rpx;
			transform: scale(0.7);
		}

		.list-item {
			.item-text {
				width: 200rpx
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