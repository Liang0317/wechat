<template>
	<view class="technician-income-index" v-if="isLoad">
		<view @tap.stop="$util.goUrl({url:`/user/pages/cash-out?type=technician`})" class="mine-menu-list c-base"
			:style="{background:primaryColor}">
			<view class="space-lg"></view>
			<view class="space-lg"></view>
			<view class="flex-center f-caption mt-sm">可提现金额(元)</view>
			<view class="money-info flex-center flex-y-baseline mt-sm mb-sm">¥<view class="money">
					{{detail.cap_cash}}
				</view>
			</view>
			<view class="flex-center pt-md pb-md f-caption c-base-rgba">每月提现不限次数</view>
			<view class="cash-out-btn flex-center fill-base f-paragraph radius" :style="{color: primaryColor}">提现
			</view>
			<view class="space-lg"></view>
			<view class="space-lg"></view>
		</view>
		<view class="money-count fill-base flex-center pt-md pb-md">
			<view class="item-child flex-center flex-column">
				<view class="flex-y-baseline f-md-title mb-sm">{{detail.extract_total_price}}</view>
				<view class="f-caption c-caption">总收入(元)</view>
			</view>
			<view class="item-child flex-center flex-column b-1px-l">
				<view class="flex-y-baseline f-md-title mb-sm">{{detail.no_received}}</view>
				<view class="f-caption c-caption">未入账(元)</view>
			</view>
		</view>
		<view @tap.stop="$util.goUrl({url:`/user/pages/distribution/record?type=2`})"
			class="flex-between mt-md pt-lg pb-lg pl-lg pr-md fill-base">
			<view class="f-title c-title">提现记录</view>
			<view class="flex-y-center f-paragraph c-title">
				<view class="c-warning" v-if="detail.extract_ing_price*1>0">提现中 {{detail.extract_ing_price}}元</view>
				<i class="iconfont icon-right ml-sm"></i>
			</view>
		</view>
		<view class="space-footer"></view>
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
				detail: {},
				isLoad: false
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
				this.detail = await this.$api.technician.capCashInfo()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.isLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
		}
	}
</script>


<style lang="scss">
	.technician-income-index {

		.mine-menu-list {
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

	}
</style>
