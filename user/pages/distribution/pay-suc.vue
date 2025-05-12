<template>
	<view class="flex-center flex-column" v-if="isLoad">
		<i class="iconfont iconjishiwancheng" :style="{color:primaryColor}"></i>
		<view class="f-paragraph mt-md" style="color:#3A3A3A">支付成功</view>
		<view @tap.stop="$util.goUrl({url:`/user/pages/distribution/income`,openType:`reLaunch`})"
			class="jump-btn flex-center f-mini-title radius" :style="{color:primaryColor,borderColor:primaryColor}">
			跳转分销员操作端</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"

	export default {
		components: {},
		data() {
			return {
				options: {},
				isLoad: false,
				status: 1
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			mineInfo: state => state.user.mineInfo,
		}),
		async onLoad(options) {
			this.$util.showLoading()
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
		methods: {
			...mapActions(['getUserInfo', 'getMineInfo', 'getConfigInfo']),
			...mapMutations(['updateUserItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				if (!this.configInfo.id) {
					await this.getConfigInfo()
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				await this.getMineInfo()
				this.$util.hideAll()
				this.isLoad = true
			},
			initRefresh() {
				this.isLoad = false
				this.initIndex(true)
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: #fff;
	}

	.iconjishiwancheng {
		margin-top: 127rpx;
		font-size: 233rpx;
	}

	.jump-btn {
		width: 386rpx;
		height: 82rpx;
		margin-top: 94rpx;
		border: 1rpx solid #fff;
		transform: rotateZ(360deg);
	}
</style>