<template>
	<view class="merchant-info ml-lg mr-lg" v-if="detail.id">
		<view class="flex-y-center pt-lg pb-lg c-title">
			<i class="iconfont iconshangjia_1" style="margin-right: 6rpx;"></i>
			<view class="f-title text-bold mr-md">{{detail.merchant_name||'暂未设置'}}</view>
			<view class="mearchant-label flex-center f-icontext c-base rel" :style="{color:primaryColor}">
				<view class="bg abs" :style="{background:primaryColor}"></view>
				签约商家
			</view>
		</view>
		<view class="flex-y-center f-paragraph c-paragraph text-bold mt-md mb-lg">营业执照
			<view class="f-caption c-caption ml-sm" v-if="!detail.license">暂未设置</view>
		</view>
		<view class="license-info flex-center mt-md f-paragraph c-paragraph radius-18" v-if="detail.license">
			<image @tap.stop="$util.previewImage({current:detail.license,urls:[detail.license]})" mode="aspectFill"
				class="img-item radius-16" :src="detail.license">
			</image>
		</view>
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
				await this.getDetail()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			async getDetail() {
				let {
					id
				} = this.options
				let data = await this.$api.agent.agentInfo({
					admin_id: id
				})
				this.detail = data
				this.$util.hideAll()
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: #fff;
	}

	.merchant-info {
		.f-title {
			max-width: 530rpx;
		}

		.mearchant-label {
			width: 100rpx;
			height: 34rpx;
			border-radius: 4rpx;

			.bg {
				opacity: 0.1;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
				border-radius: 4rpx;
			}
		}

		.license-info {
			height: 345rpx;
			background: #F4F4F4;
		}

		.img-item {
			width: 315rpx;
			height: 232rpx;
		}

	}
</style>