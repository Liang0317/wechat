<template>
	<view class="pt-md" style="background-color: #F4F6F7">
		<view class="hideCanvasView">
			<l-painter class="hideCanvas" ref="painter" useCORS />
		</view>
		<view class="ml-md" v-if="src">
			<image :src="src" class="code-img radius-16" @tap="previewImage"></image>
			<view class="info_text fill-base flex-column mt-sm radius-16">
				<view class="f-paragraph mt-sm mb-md" style="color:#2F2F2F">
					邀请3步
				</view>
				<view class="flex-between f-paragraph" style="color:#767676">
					<view class="flex-y-center">
						1.分享海报
					</view>
					<image mode="aspectFill" class="info_text_img"
						src="https://lbqny.migugu.com/admin/anmo/coupon/btn.png"></image>
					<view class="flex-y-center">
						2.微信扫码
					</view>
					<image mode="aspectFill" class="info_text_img"
						src="https://lbqny.migugu.com/admin/anmo/coupon/btn.png"></image>
					<view class="flex-y-center">
						3.注册登录
					</view>
				</view>
			</view>
			<view class="space-max-footer"></view>
			<fix-bottom-button @confirm="toPreviewSave" :text="[{text: confirmText,type:'confirm'}]" bgColor="#fff"
				:classType="2">
			</fix-bottom-button>
		</view>
		
		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		components: {},
		props: {

		},
		data() {
			return {
				// #ifdef H5
				confirmText: '长按上图保存图片',
				// #endif
				// #ifndef H5
				confirmText: '保存图片至相册',
				// #endif
				src: ''
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		async onLoad(options) {
			// #ifdef H5
			if (this.$jweixin.isWechat()) {
				await this.$jweixin.initJssdk();
				this.$jweixin.wxReady(() => {
					this.$jweixin.hideOptionMenu()
				})
			}
			// #endif
			this.$util.showLoading()
			await this.getConfigInfo()
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			let that = this
			setTimeout(() => {
				that.canvase()
			}, 1000)
		},
		methods: {
			...mapActions(['getConfigInfo']),
			async canvase() {
				let that = this
				let qr_code = await this.$api.mine.userCommQr()
				let {
					promotion_poster_img = ''
				} = this.configInfo
				let cover = promotion_poster_img || 'https://lbqny.migugu.com/admin/anmo/mine/fx-share.png'
				let qr_radius = '0rpx'
				// #ifdef MP-WEIXIN
				qr_radius = '145rpx'
				// #endif

				let poster = {
					css: {
						width: '710rpx',
						height: '1152rpx',
					},
					views: [{
							type: 'image',
							src: cover,
							css: {
								width: '710rpx',
								height: '1152rpx',
								objectFit: "cover",
								top: '0rpx',
								left: '0rpx',
								position: 'absolute'
							}
						},
						{
							type: 'image',
							src: qr_code,
							css: {
								position: 'absolute',
								width: '290rpx',
								height: '290rpx',
								bottom: '70rpx',
								left: '210rpx',
								background: '#ffffff',
								borderRadius: qr_radius
							}
						}
					]
				}
				// 渲染
				this.$refs.painter.render(poster);
				// 生成图片
				this.$refs.painter.canvasToTempFilePathSync({
					fileType: "jpg",
					quality: 1,
					success: (res) => {
						that.$util.hideAll()
						this.src = res.tempFilePath
					},
				});
			},
			previewImage() {
				let finalPath = this.src;
				uni.previewImage({
					current: finalPath,
					urls: [finalPath]
				})
			},
			async saveImage() {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				await this.$util.checkAuth({
					type: "writePhotosAlbum"
				});
				let filePath = this.src;
				let [err, success] = await uni.saveImageToPhotosAlbum({
					filePath
				})
				if (err) return;
				uni.showToast({
					icon: 'none',
					title: '保存成功'
				})
			},
			toPreviewSave() {
				// #ifdef H5
				this.previewImage()
				// #endif
				// #ifndef H5
				this.saveImage()
				// #endif
			}
		}
	}
</script>

<style>
	.info_text {
		width: 710rpx;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
	}

	.info_text_img {
		width: 20rpx;
		height: 20rpx;
	}

	.code-img {
		width: 710rpx;
		height: 1152rpx;
	}
</style>