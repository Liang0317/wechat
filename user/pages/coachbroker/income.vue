<template>
	<view class="user-distribution-income rel" v-if="isLoad">
		<view class="bg abs" :style="{background: `linear-gradient(180deg, ${primaryColor} 0%, #fff 100%)`}"></view>
		<view class="flex-center pd-lg rel">
			<image mode="aspectFill" class="avatar radius"
				:src="detail.avatarUrl || `https://lbqny.migugu.com/admin/farm/default-user.png`">
			</image>
			<view class="flex-1 ml-lg f-md-title c-base ellipsis">{{detail.user_name}}</view>
		</view>

		<view class="mine-menu-list fill-base pd-lg radius-16 rel" style="margin-top: 0;">
			<view class="flex-between">
				<view class="f-icontext c-caption">可提现(元)</view>
				<i @tap.stop="$refs.show_rule_item.open()" class="iconfont iconwentifankui1" style="font-size: 32rpx;"
					:style="{color:primaryColor}"></i>
			</view>
			<view class="flex-between" style="margin-top: 28rpx;">
				<view class="c-title text-bold" style="font-size: 44rpx;">{{detail.cash}}</view>
				<view @tap.stop="$util.goUrl({url:`/user/pages/cash-out?type=coachbroker`})"
					class="cash-btn flex-center f-mini-title c-base radius" :style="{background:primaryColor}">
					我要提现
				</view>
			</view>
			<view class="flex-warp mt-lg pt-md b-1px-t">
				<view class="item-child flex-center flex-column" :class="[{'b-1px-r':index!==2}]"
					v-for="(item, index) in countList" :key="index">
					<view class="f-sm-title c-title text-bold">{{detail[item.key]}}</view>
					<view class="f-icontext c-caption">{{ item.text }}</view>
					<view class="f-icontext" :class="[{'c-base':index!=0},{'c-caption':index==0}]">不含手续费
					</view>
				</view>
			</view>
		</view>

		<view class="mine-menu-list fill-base mt-md radius-16">
			<view class="flex-warp pt-md">
				<view @tap.stop="toJump('toolList', index)" class="item-child flex-center flex-column f-caption c-title"
					style="margin:10rpx 0 20rpx 0" v-for="(item, index) in toolList" :key="index">
					<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
					<view class="mt-sm">{{ item.text }}</view>
				</view>
			</view>
		</view>

		<view class="mine-menu-list fill-base mt-md radius-16">
			<view class="flex-warp pt-md">
				<view class="item-child f-caption c-title" style="width:50%;margin:10rpx 0 20rpx 0"
					:style="{paddingLeft:index%2==0?'70rpx':'120rpx'}" v-for="(item, index) in dataList" :key="index">
					<view class="f-icontext" style="color: #777D8D;">{{ item.text }}</view>
					<view class="f-sm-title c-title text-bold">{{detail[item.key]}}</view>
				</view>
			</view>
		</view>
		<view @tap.stop="$util.goUrl({url:`/user/pages/coachbroker/bind-technician`})"
			class="mine-menu-list fill-base mt-md radius-16" style="
background: linear-gradient(90deg, #FFE9E9 0%, #FFFFFF 100%);">
			<view class="flex-center pd-lg">
				<image mode="aspectFill" class="avatar radius"
					src="https://lbqny.migugu.com/admin/anmo/mine/income.png">
				</image>
				<view class="flex-1 flex-between ml-lg">
					<view>
						<view class="f-mini-title c-title text-bold">推荐{{$t('action.attendantName')}}</view>
						<view class="f-caption mt-sm" style="color: #777D8D;">
							推荐{{$t('action.attendantName')}}入驻享佣金
						</view>
					</view>
					<view class="share-btn flex-center f-desc c-base radius">前往邀请</view>
				</view>
			</view>
		</view>
		<view class="space-footer"></view>


		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">规则说明</view>
				<view class="f-desc c-title mt-lg">
					可提现金额为已完成订单后的结算金额；未入账金额为未完成的订单，待提现佣金
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_rule_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				countList: [{
					key: 'total_cash',
					text: '累计佣金(元)'
				}, {
					key: 'wallet_cash',
					text: '已提现(元)'
				}, {
					key: 'not_recorded_cash',
					text: '未入账(元)'
				}],
				toolList: [{
					icon: 'iconyongjinliushui',
					text: '我的收益',
					url: '/user/pages/coachbroker/record'
				}, {
					icon: 'iconwodeyaoqing',
					text: '我的邀请',
					url: '/user/pages/coachbroker/team'
				}, {
					icon: 'icontixianjilu',
					text: '提现记录',
					url: '/user/pages/distribution/record?type=7'
				}],
				dataList: [{
					key: 'today_order_count',
					text: '今日成交订单'
				}, {
					key: 'total_order_count',
					text: '累计成交订单'
				}, {
					key: 'today_coach_count',
					text: '今日新增' + this.$t('action.attendantName')
				}, {
					key: 'total_coach_count',
					text: '累计入驻' + this.$t('action.attendantName')
				}],
				detail: {},
				isLoad: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			mineInfo: state => state.user.mineInfo,
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
				this.detail = await this.$api.coachbroker.brokerIndex()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.isLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			toJump(key, index) {
				let {
					url,
					text
				} = this[key][index]
				this.$util.log(url)
				this.$util.toCheckLogin({
					url
				})
			},
		}
	}
</script>


<style lang="scss">
	.user-distribution-income {
		.bg {
			width: 100%;
			height: 388rpx;
		}

		.mine-list {
			.money-info {
				font-size: 50rpx;

				.money {
					font-size: 70rpx;
				}
			}

			.cash-out-btn {
				width: 169rpx;
				height: 56rpx;
				margin: 0 auto;
			}

			.menu-title {
				height: 90rpx;

				.iconfont {
					font-size: 24rpx;
				}
			}

			.item-child {
				width: 25%;
				margin: 10rpx 0;

				.iconfont {
					font-size: 46rpx;
				}
			}


		}


		.money-count {
			.item-child {
				width: 50%;
			}
		}

		// 我的订单/其他
		.mine-menu-list {
			margin: 20rpx 25rpx 0 25rpx;


			.cash-btn {
				width: 194rpx;
				height: 70rpx;
			}

			.avatar {
				width: 105rpx;
				height: 105rpx;
			}

			.share-btn {
				width: 154rpx;
				height: 56rpx;
				background: #FF6124;
			}

			.item-child {
				width: 33.33%;
				margin: 10rpx 0;

				.iconfont {
					font-size: 86rpx;
				}

				.item-img {
					width: 88rpx;
					height: 88rpx;

					.iconfont {
						font-size: 44rpx;
					}

					.item-img {
						top: 0;
						left: 0;
						opacity: 0.1;
					}
				}
			}

			.item-child:nth-child(1).b-1px-b::after {
				left: 33rpx;
			}

			.item-child:nth-child(2).b-1px-b::after {
				right: 33rpx;
			}

			.item-child.b-1px-r::after {
				top: 38rpx;
				bottom: 38rpx;
			}
		}


	}
</style>