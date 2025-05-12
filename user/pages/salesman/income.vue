<template>
	<view class="user-distribution-income rel" v-if="isLoad">
		<view class="bg abs" :style="{background: `linear-gradient(180deg, ${primaryColor} 0%, #fff 100%)`}"></view>
		<view class="flex-center pd-lg rel">
			<image mode="aspectFill" class="avatar radius"
				:src="detail.avatarUrl || `https://lbqny.migugu.com/admin/farm/default-user.png`">
			</image>
			<view class="flex-1 ml-lg">
				<view class="f-md-title c-base max-500 ellipsis">{{detail.user_name}}</view>
				<view class="f-desc c-base">提成比例：{{detail.balance}}%</view>
			</view>
		</view>

		<view class="mine-menu-list fill-base radius-16 rel" style="margin-top: 0;">
			<view class="flex-between pd-lg b-1px-b">
				<view class="f-paragraph c-title">可提现(元)</view>
				<view class="f-md-title c-title">{{detail.cash}}</view>
			</view>
			<view class="flex-warp pt-md">
				<view class="item-child flex-center flex-column" :class="[{'b-1px-r':index!==2}]"
					v-for="(item, index) in countList" :key="index">
					<view class="f-sm-title c-title text-bold">{{detail[item.key]}}</view>
					<view class="f-icontext c-caption">{{ item.text }}</view>
					<view class="f-icontext" :class="[{'c-base':index==1},{'c-caption':index!=1}]">
						{{index==0?'不含手续费':index==2?'不含物料费':item.text}}
					</view>
				</view>
			</view>
			<view class="flex-center pt-lg pb-lg">
				<view @tap.stop="$util.goUrl({url:`/user/pages/cash-out?type=salesman`})"
					class="cash-btn flex-center ml-lg f-mini-title c-base radius"
					:style="{background:primaryColor,border:`1rpx solid ${primaryColor}`}">
					我要提现
				</view>
			</view>
		</view>

		<view class="count-list flex-center fill-base pt-lg pb-lg f-caption c-title radius-16">
			<view @tap.stop="$util.goUrl({url:`/user/pages/salesman/record`})"
				class="list-item flex-center flex-column">
				<view class="radius flex-center c-base" :style="{background:primaryColor}">
					<i class="iconfont iconqudaomingxi"></i>
				</view>
				<view>渠道明细</view>
			</view>
			<view @tap.stop="$util.goUrl({url:`/user/pages/salesman/channel`})"
				class="list-item flex-center flex-column">
				<view class="radius flex-center c-base" :style="{background:primaryColor}">
					<i class="iconfont iconwodequdaoshang"></i>
				</view>
				<view>我的{{$t('action.channelName')}}</view>
			</view>
			<view @tap.stop="$util.goUrl({url:`/user/pages/distribution/record?type=6`})"
				class="list-item flex-center flex-column">
				<view class="radius flex-center c-base" :style="{background:primaryColor}">
					<i class="iconfont icontixianjilu_1"></i>
				</view>
				<view>提现记录</view>
			</view>
		</view>

		<image @tap.stop="toPoster" class="salesman-channel-share mt-md ml-md"
			src="https://lbqny.migugu.com/admin/anmo/mine/salesman-channel-share.png">
		</image>

		<view class="space-footer"></view>


		<uni-popup ref="balance_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">绑定{{$t('action.channelName')}}</view>
				<view class="space-md"></view>
				<view class="flex-warp mt-md c-title" style="width: 100%;">
					您当前的提成比例为{{detail.balance}}%，若设置渠道提成比例为1%，当用户通过该渠道来产生消费时，您的提成比例就是（{{detail.balance}} - 1）%
				</view>
				<input v-model="balance" maxlength="3" type="number"
					class="item-input f-mini-title mt-lg pl-lg pr-lg c-title" placeholder="请输入渠道提成比例" />
				<view class="button">
					<view @tap.stop="$refs.balance_item.close()" class="item-child">取消</view>
					<view @tap.stop="confirmChangeItem" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">确定</view>
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
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				countList: [{
					key: 'total_cash',
					text: '累计佣金(元)'
				}, {
					key: 'wallet_cash',
					text: '已提现(元)'
				}, {
					key: 'order_price',
					text: '总成交金额(元)'
				}],
				detail: {},
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				loading: true,
				balance: ''
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo
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
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.$util.showLoading()
				this.detail = await this.$api.salesman.index()
				this.isLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			toSetBalance() {
				let {
					inv_channel_balance
				} = this.detail
				this.balance = inv_channel_balance * 1 == -1 ? '' : inv_channel_balance
				this.$refs.balance_item.open()
			},
			toPoster() {
				let {
					salesman_channel_fx_type,
					inv_channel_balance
				} = this.detail
				if (salesman_channel_fx_type === 2) {
					this.toSetBalance()
					return
				}
				this.$util.goUrl({
					url: `/user/pages/salesman/channel-poster`
				})
			},
			async confirmChangeItem() {
				let {
					balance
				} = this
				let {
					balance: max
				} = this.detail
				let reg = /^\+?[0-9]*$/
				if (balance == '' || !reg.test(balance) || (balance > max * 1)) {
					this.$util.showToast({
						title: `请输入提成比例，不支持小数，最大不能超过${max}%`
					})
					return
				}
				await this.$api.salesman.setInvChannelBalance({
					balance
				})
				this.detail.inv_channel_balance = balance
				this.$util.showToast({
					title: `设置成功`
				})
				this.$refs.balance_item.close()
				setTimeout(() => {
					this.$util.goUrl({
						url: `/user/pages/salesman/channel-poster`
					})
				}, 1000)
			}
		}
	}
</script>


<style lang="scss">
	.user-distribution-income {
		.bg {
			width: 100%;
			height: 388rpx;
		}

		.mine-menu-list {
			margin: 20rpx 20rpx 0 20rpx;

			.cash-btn {
				width: 606rpx;
				height: 70rpx;
				transform: rotateZ(360deg);
			}

			.item-child {
				width: 33.33%;
				margin: 10rpx 0;

				.iconfont {
					font-size: 86rpx;
				}
			}

			.item-child.b-1px-r::after {
				top: 38rpx;
				bottom: 38rpx;
			}
		}

		.count-list {
			margin: 35rpx 20rpx;

			.list-item {
				width: 33.33%;

				.radius {
					width: 86rpx;
					height: 86rpx;
					margin-bottom: 10rpx;

					.iconfont {
						font-size: 48rpx;
					}
				}
			}
		}

		.salesman-channel-share {
			width: 710rpx;
			height: 180rpx;
		}

		.common-popup-content {
			.item-input {
				width: 450rpx;
				height: 78rpx;
				border-radius: 10rpx;
				border: 1rpx solid #eee;
			}
		}

	}
</style>