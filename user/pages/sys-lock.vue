<template>
	<view class="flex-center flex-column" v-if="isLoad">
		<image mode="widthFix" class="lock-img" src="https://lbqny.migugu.com/admin/anmo/mine/sys-lock.png">
		</image>
		<view class="f-mini-title c-title">很抱歉,您无法进入该系统</view>
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
				isLoad: false,
				options: {},
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		async onLoad(options) {
			await this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo']),
			...mapMutations(['updateConfigItem']),
			async initIndex() {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				this.$util.setNavigationBarColor({
					bg: '#ffffff',
					color: '#000000'
				})
				this.isLoad = true
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: #fff;
	}

	.lock-img {
		width: 413rpx;
		height: 361rpx;
		margin-top: 300rpx;
	}
</style>