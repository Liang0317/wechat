<template>
	<view class="user-distribution-income rel" v-if="isLoad">
		<view class="bg abs" :style="{background: `linear-gradient(180deg, ${primaryColor} 0%, #fff 100%)`}"></view>
		<view class="flex-warp pd-lg rel">
			<image mode="aspectFill" class="avatar radius"
				:src="detail.avatarUrl || `https://lbqny.migugu.com/admin/farm/default-user.png`">
			</image>
			<view class="flex-1 ml-lg c-base" style="max-width: calc(100% - 150rpx);">
				<view class="f-md-title ellipsis">{{detail.nickName}}</view>
				<view class="mt-sm f-paragraph ellipsis">{{detail.admin_name?`所属代理商：${detail.admin_name}`:`平台`}}</view>
				<view class="mt-sm flex-between" v-if="configInfo.plugAuth.payreseller">
					<view class="f-paragraph ellipsis">当前身份：{{detail.reseller_level==1?'一级分销员':'二级分销员'}}</view>
					<view
						@tap.stop="$util.goUrl({url:`/user/pages/distribution/pay-order?price=${detail.reseller_up_price}`})"
						class="pay-btn flex-center f-caption c-base" v-if="detail.reseller_level != 1">去升级</view>
				</view>
			</view>
		</view>

		<view class="mine-menu-list fill-base radius-16 rel" style="margin-top: 0;">
			<view @tap.stop="$refs.show_rule_item.open()" class="abs close-info flex-center">
				<i class="iconfont iconwentifankui1" style="font-size: 32rpx;" :style="{color:primaryColor}"></i>
			</view>
			<view class="flex-warp pt-md">
				<view class="item-child flex-center flex-column"
					:class="[{'b-1px-b':index<2},{'b-1px-r':index>1&&index<4}]"
					:style="{width:index<2?'50%':'33.33%',padding:index<2?'20rpx 0 30rpx 0':'10rpx 0'}"
					v-for="(item, index) in countList" :key="index">
					<view class="f-sm-title c-title text-bold">{{detail[item.key]}}</view>
					<view class="f-icontext c-caption">{{ item.text }}</view>
					<view class="f-icontext" :class="[{'c-base':index!=2},{'c-caption':index==2}]" v-if="index>1">不含手续费
					</view>
				</view>
			</view>
			<view class="flex-center pt-md" style="padding-bottom: 35rpx;">
				<view @tap.stop="$util.goUrl({url:`/user/pages/cash-out?type=distribution`})"
					class="cash-btn flex-center f-mini-title c-base radius" :style="{background:primaryColor}">
					我要提现
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
		<view @tap.stop="$util.goUrl({url:`/user/pages/distribution/poster`})"
			class="mine-menu-list fill-base mt-md radius-16" style="
background: linear-gradient(90deg, #FFE9E9 0%, #FFFFFF 100%)">
			<view class="flex-center pd-lg">
				<image mode="aspectFill" class="avatar radius"
					src="https://lbqny.migugu.com/admin/anmo/mine/income_user.png">
				</image>
				<view class="flex-1 flex-between ml-lg">
					<view>
						<view class="f-mini-title c-title text-bold">邀请用户</view>
						<view class="f-caption mt-sm" style="color: #777D8D;">
							推荐用户下单享佣金
						</view>
					</view>
					<view class="share-btn flex-center f-desc c-base radius">前往邀请</view>
				</view>
			</view>
		</view>
		<view @tap.stop="$util.goUrl({url:`/user/pages/distribution/fx-poster`})"
			class="mine-menu-list fill-base mt-md radius-16" style="
background: linear-gradient(90deg, #FFE9E9 0%, #FFFFFF 100%)"
			v-if="configInfo.fx_check===1 && detail.id*1 !=-1 &&((configInfo.plugAuth.payreseller && detail.reseller_level==1) || !configInfo.plugAuth.payreseller)">
			<view class="flex-center pd-lg">
				<image mode="aspectFill" class="avatar radius"
					src="https://lbqny.migugu.com/admin/anmo/mine/income_fx.png">
				</image>
				<view class="flex-1 flex-between ml-lg">
					<view>
						<view class="f-mini-title c-title text-bold">推荐收入</view>
						<view class="f-caption max-300" style="color: #777D8D;margin-top:5rpx;line-height:32rpx">
							推荐用户成为分销员, 他的提成你也能有
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
		mapActions,
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
					key: 'new_cash',
					text: '可提现(元)'
				}, {
					key: 'not_recorded',
					text: '未入账(元)'
				}, {
					key: 'order_comm_cash',
					text: '累计佣金(元)'
				}, {
					key: 'wallet_cash',
					text: '已提现(元)'
				}, {
					key: 'order_cash',
					text: '总成交金额(元)'
				}],
				toolList: [{
					icon: 'iconyongjinliushui',
					text: '我的收益',
					url: '/user/pages/stored/commission'
				}, {
					icon: 'iconwodeyaoqing',
					text: '我的邀请',
					url: '/user/pages/distribution/team'
				}, {
					icon: 'icontixianjilu',
					text: '提现记录',
					url: '/user/pages/distribution/record?type=1'
				}],
				dataList: [{
					key: 'today_order_count',
					text: '今日成交订单'
				}, {
					key: 'total_order_count',
					text: '累计成交订单'
				}, {
					key: 'today_user_count',
					text: '今日邀请粉丝'
				}, {
					key: 'total_user_count',
					text: '累计邀请粉丝'
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
			...mapActions(['getConfigInfo']),
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
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				this.detail = await this.$api.mine.partnerIndex()
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

		.pay-btn {
			width: 100rpx;
			height: 40rpx;
			border-radius: 5rpx;
			border: 1rpx solid #fff;
		}

		// 我的订单/其他
		.mine-menu-list {
			margin: 20rpx 25rpx 0 25rpx;

			.close-info {
				width: 80rpx;
				height: 80rpx;
				top: 0;
				right: 0;
				z-index: 1;
			}

			.cash-btn {
				width: 580rpx;
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