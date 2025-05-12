<template>
	<view class="user-distribution-income">
		<view class="flex-center flex-column mt-md ml-md mr-md bg-info radius-32 rel">
			<view class="bg abs"></view>
			<view class="title c-black text-bold">升级分销员</view>
			<image class="fx-pay-order mt-md" src="https://lbqny.migugu.com/admin/anmo/mine/fx-pay-order.png"></image>
			<view class="flex-between f-mini-title mt-lg pt-sm" style="width:560rpx">
				<view class="flex-y-center">
					<view class="dot"></view>需支付{{options.price}}元升级到一级分销员哟~
				</view>
				<view></view>
			</view>
			<view class="flex-y-center f-mini-title" style="width:560rpx;margin-top:15rpx">
				<view class="dot"></view>升级之后可享受更多权益，快去升级吧~
			</view>
		</view>
		<view class="pd-lg mt-md ml-md mr-md fill-base radius-32">
			<view class="f-mini-title c-title text-bold">支付方式</view>
			<view @tap.stop="toChangeItem('payInd',index)" class="flex-between mt-lg" v-for="(item,index) in payList"
				:key="index">
				<view class="pay-item flex-y-center">
					<view class="item-icon flex-center mr-md" :class="[{'wechat':item.id==1},{'alipay':item.id==3}]">
						<i class="iconfont icon-font-color" :class="[item.icon]"></i>
					</view>
					<view class="flex-y-baseline item-title">{{item.title}}
					</view>
				</view>
				<i class="pay-icon iconfont c-caption"
					:class="[{'icon-xuanze':payInd != index},{'icon-radio-fill':payInd == index}]"
					:style="{color:payInd==index?primaryColor:'#BEC3CE'}"></i>
			</view>
		</view>

		<view class="space-max-footer"></view>
		<fix-bottom-button @confirm="toConfirm" :text="[{text:'去支付升级',type:'confirm'}]" bgColor="#fff">
		</fix-bottom-button>
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
				isLoad: false,
				options: {},
				payList: [{
					id: 1,
					icon: 'icon-weixin',
					title: '微信支付'
				}],
				payInd: 0,
				detail: {},
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			mineInfo: state => state.user.mineInfo,
		}),
		onLoad(options) {
			this.options = options
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
			...mapActions(['getConfigInfo', 'getMineInfo']),
			...mapMutations(['updateOrderItem']),
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
				let {
					alipay_status = 0
				} = this.configInfo
				if (alipay_status && this.payList.length == 1) {
					// #ifndef MP-WEIXIN
					this.payList.push({
						id: 3,
						icon: 'icon-alipay-fill',
						title: '支付宝支付'
					})
					// #endif
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
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
			toChangeItem(key, val) {
				this[key] = val
				this.lockTap = false
			},
			async toConfirm() {
				let pay_model = this.payList[this.payInd].id
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					let {
						order_id,
						pay_list
					} = await this.$api.mine.resellerLevelUp({
						pay_model
					})
					this.$util.hideAll()
					if (pay_list) {
						if (pay_model == 3) {
							pay_list = {
								orderInfo: pay_list,
								provider: 'alipay'
							}
						}

						// #ifdef H5
						if (pay_model == 3) {
							pay_list = Object.assign({}, pay_list, {
								order_id,
								reseller: 1,
								page_url: `/user/pages/distribution/pay-suc`
							})
							this.updateOrderItem({
								key: 'alipayOrderParams',
								val: pay_list
							})
							this.$util.goUrl({
								url: '/user/pages/alipay-result',
								openType: `redirectTo`
							})
							return
						}
						// #endif

						try {
							await this.$util.pay(pay_list)
							this.$util.showToast({
								title: `支付成功`
							})
							setTimeout(() => {
								this.$util.back()
								this.getMineInfo()
								this.lockTap = false
								this.$util.goUrl({
									url: '/user/pages/distribution/pay-suc',
									openType: `redirectTo`
								})
							}, 1000)
						} catch (e) {
							this.lockTap = false
							return
						}
					}
					this.$util.showToast({
						title: `支付成功`
					})
					setTimeout(() => {
						this.$util.back()
						this.getMineInfo()
						this.lockTap = false
						this.$util.goUrl({
							url: '/user/pages/distribution/pay-suc',
							openType: `redirectTo`
						})
					}, 1000)
				} catch (e) {
					this.$util.showToast({
						title: `支付失败`
					})
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 1000)
				}
			}
		}
	}
</script>


<style lang="scss">
	.user-distribution-income {

		.bg-info {
			width: 710rpx;
			height: 666rpx;
			background: #FEFFFE;
			overflow: hidden;

			.bg {
				top: 0;
				left: 0;
				right: 0;
				width: 100%;
				height: 364rpx;
				background: linear-gradient(180deg, #F24E29 0%, rgba(250, 202, 169, 0) 100%);
				opacity: 0.2;
			}

			.title {
				font-size: 50rpx;
			}

			.fx-pay-order {
				width: 249rpx;
				height: 312rpx
			}

			.dot {
				width: 15rpx;
				height: 15rpx;
				background: #F14E29;
				border-radius: 15rpx;
				margin-right: 14rpx
			}
		}

		.pay-item {
			.item-icon {

				width: 70rpx;
				height: 70rpx;
				border-radius: 35rpx;

				.iconfont {
					font-size: 44rpx;
				}
			}

			.item-icon.wechat {
				background: #E7F9EE;

				.iconfont {
					background-image: linear-gradient(180deg, #90EE90 0%, #32CD32 100%, #19c865 100%);
				}
			}

			.item-icon.alipay {
				background: #E9F5FE;

				.iconfont {
					background-image: linear-gradient(180deg, #46BCFF 0%, #2587FF 100%, #1976FF 100%);
				}
			}

			.item-title {
				color: #2E3541;
			}

		}
	}
</style>