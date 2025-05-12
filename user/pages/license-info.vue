<template>
	<view class="license-info" v-if="detail.id">
		<image @tap.stop="toPreviewImage(index)" mode="aspectFill" class="item-img" :src="item"
			v-for="(item,index) in detail.license" :key="index">
		</image>
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
				options: {},
				detail: {},
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo,
		}),
		onLoad(options) {
			this.options = options
			this.initIndex()
		},
		methods: {
			...mapMutations(['updateUserItem']),
			async initIndex() {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif

				let {
					id,
					license
				} = this.$util.getPage(-1).detail 
				this.detail = {
					id,
					license
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			toPreviewImage(index) {
				let urls = this.detail.license
				this.$util.previewImage({
					current: urls[index],
					urls
				})
			},
		}
	}
</script>


<style lang="scss">
	.license-info {

		.item-img {
			width: 686rpx;
			height: 432rpx;
			margin: 20rpx 32rpx 0 32rpx;
		}

	}
</style>