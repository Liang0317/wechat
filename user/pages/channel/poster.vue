<template>
	<view style="padding:20rpx 0">
		<view class="hideCanvasView">
			<l-painter class="hideCanvas" ref="painter" useCORS />
		</view>
		<block v-if="src">
			<image :src="src" class="code-img" @tap="previewImage"></image>
			<view class="btns">
				<!-- #ifdef H5 -->
				<button class="save-btn flex-center radius" :style="{background:primaryColor}"
					@tap="previewImage">长按上图保存图片</button>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<button class="save-btn flex-center radius" :style="{background:primaryColor}"
					@tap="saveImage">保存图片至相册</button>
				<!-- #endif -->
			</view>
		</block>
		
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
				src: '',
				options: '',
				poster: {}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		async onLoad(options) {
			this.options = options
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
				let {
					index
				} = that.options
				let {
					id,
					qr_img,
					code
				} = that.$util.getPage(-1).list.data[index]

				if (id) {
					let {
						qr_img: qr
					} = await this.$api.channel.channelQrInfo({
						id
					})
					qr_img = qr
				}

				let poster = {
					css: {
						width: '750rpx',
						height: '750rpx',
						background: '#ffffff',
					},
					views: id ? [{
						type: 'image',
						src: qr_img,
						css: {
							width: '750rpx',
							height: '750rpx'
						}
					}] : [{
						type: 'image',
						src: qr_img,
						css: {
							width: '680rpx',
							height: '680rpx',
							position: 'absolute',
							top: '5rpx',
							left: '35rpx'
						}
					}, {
						type: 'text',
						text: code,
						css: {
							position: 'absolute',
							bottom: '25rpx',
							left: '0',
							width: '750rpx',
							fontSize: '44rpx',
							fontWeight: '400',
							color: '#0C0C0C',
							textAlign: 'center'
						}
					}]
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
						console.log(res.tempFilePath);
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
			}
		},

	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.code-img {
		width: 500rpx;
		height: 500rpx;
		margin: 50rpx auto;
	}

	.btns {
		display: flex;
		justify-content: center;
		padding: 15rpx;
		background-color: #fff;
		margin-top: 20rpx;

		.save-btn {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 auto;
		}
	}
</style>