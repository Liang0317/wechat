<template>
	<view class="user-salesman-record" v-if="isLoad">
		<view class="list-item fill-base mt-md ml-md mr-md pd-lg radius-16" v-for="(item,index) in list.data"
			:key="index">
			<view class="flex-between f-paragraph">
				<view class="flex-y-center c-paragraph">下单人：<view
						class="f-mini-title c-title text-bold max-400 ellipsis">
						{{item.address_info.user_name}}
					</view>
				</view>
				<view :style="{color:item.pay_type==7?primaryColor:'#FF8F5B'}">
					{{item.pay_type===7?'已入账':'未入账'}}
				</view>
			</view>
			<view @tap.stop="$util.goUrl({url:item.order_code,openType:`copy`})"
				class="flex-y-center f-paragraph c-paragraph mt-md">
				<view class="item-text">订单号:</view>
				<view class="c-title text-bold">{{item.order_code}}</view>
			</view>
			<view class="flex-y-center f-paragraph c-paragraph mt-md">
				<view class="item-text">项目付款:</view>
				<view class="c-title text-bold">¥{{item.true_service_price}}</view>
			</view>
			<view class="flex-y-center f-paragraph c-paragraph mt-md">
				<view class="item-text">物料费:</view>
				<view class="c-title text-bold">¥{{item.material_price}}</view>
			</view>
			<view class="flex-y-center f-paragraph c-paragraph mt-md pb-lg b-1px-b">
				<view class="item-text">下单时间:</view>
				<view class="c-title text-bold">{{item.create_time}}</view>
			</view>
			<view class="flex-y-center f-paragraph c-paragraph mt-lg">
				<view class="item-text">返佣比例:</view>
				<view class="text-bold" :style="{color:primaryColor}"> {{item.broker_balance}}% </view>
			</view>
			<view class="flex-y-center f-paragraph c-paragraph mt-md">
				<view class="item-text">预计佣金:</view>
				<view class="flex-y-center c-warning text-bold">
					¥{{item.broker_cash}}
					<view v-if="item.point_cash*1>0">(手续费¥{{item.point_cash}})</view>
				</view>
			</view>
			<view class="flex-y-center f-paragraph c-paragraph mt-md">
				<view class="item-text">佣金来源:</view>
				<view class="c-title text-bold max-500 ellipsis">{{item.nickName}}</view>
			</view>
			<view class="flex-y-center f-paragraph c-paragraph mt-md">
				<view class="item-text">服务{{$t('action.attendantName')}}:</view>
				<view class="c-title text-bold">{{item.coach_info ? item.coach_info.coach_name : item.coach_id}}</view>
			</view>
		</view>


		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1">
		</abnor>

		<view class="space-footer"></view>

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
				param: {
					page: 1
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
				await this.getList()
				this.isLoad = true
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			async getList(page) {
				if (page) this.param.page = 1
				let {
					list: oldList,
					param
				} = this
				let newList = await this.$api.coachbroker.brokerCashList(param);
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			}
		}
	}
</script>


<style lang="scss">
	.user-salesman-record {
		.list-item {
			.item-text {
				width: 160rpx
			}

			.c-warning {
				color: #F1381F
			}

			.copy-btn {
				width: 60rpx;
				height: 32rpx;
				border: 1rpx solid #fff;
				transform: rotateZ(360deg);
			}
		}
	}
</style>