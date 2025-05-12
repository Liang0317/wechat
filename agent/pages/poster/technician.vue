<template>
	<view class="pt-md" style="background-color: #F4F6F7;">
		<view class="hideCanvasView">
			<l-painter class="hideCanvas" ref="painter" useCORS />
		</view>
		<block v-if="src">
			<image :src="src" class="code-img ml-md" @tap="previewImage"></image>
			<view class="space-max-footer"></view>
			<fix-bottom-button @confirm="toPreviewSave" :text="[{text: confirmText,type:'confirm'}]" bgColor="#fff"
				:classType="2">
			</fix-bottom-button>
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
				options: {},
				// #ifdef H5
				confirmText: '长按上图保存图片',
				// #endif
				// #ifndef H5
				confirmText: '保存图片至相册',
				// #endif
				src: '',
				admin_id: 0,
				check_admin: {
					id: 0,
					agent_name: '平台'
				}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			mineInfo: state => state.user.mineInfo,
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
			let title = '邀请绑定' + this.$t('action.attendantName')
			uni.setNavigationBarTitle({
				title
			})
			let that = this
			setTimeout(() => {
				that.renderToCanvas()
			}, 1000)
		},
		methods: {
			...mapActions(['getConfigInfo']),
			initRefresh() {
				this.src = ''
				this.$util.showLoading()
				this.renderToCanvas(true)
			},
			async renderToCanvas(refresh = false) {
				let that = this;
				let {
					type = 0
				} = that.options
				let qr_code = await this.$api.agent.adminCoachQr()
				let {
					bind_technician_img = ''
				} = this.configInfo
				let cover = bind_technician_img || 'https://lbqny.migugu.com/admin/anmo/mine/inv_coach.png'
				let {
					agent_name: nickName,
				} = this.$util.getPage(-1).detail
				let {
					avatarUrl
				} = this.userInfo
				nickName = nickName.length > 15 ? nickName.substring(0, 15) + '...' : nickName
				let qr_radius = '0rpx'
				// #ifdef MP-WEIXIN
				qr_radius = '157rpx'
				// #endif

				let poster = {
					css: {
						width: '710rpx',
						height: '1278rpx',
					},
					views: [{
							type: 'image',
							src: cover,
							css: {
								width: '710rpx',
								height: '1138rpx',
								objectFit: "cover",
								top: '0rpx',
								left: '0rpx',
								position: 'absolute'
							}
						},
						{
							type: 'view',
							css: {
								background: '#fff',
								width: '710rpx',
								height: '140rpx',
								bottom: '0rpx',
								left: '0rpx',
								position: 'absolute'
							},
							views: [{
									type: 'image',
									src: avatarUrl,
									css: {
										position: 'absolute',
										width: '94rpx',
										height: '94rpx',
										objectFit: "cover",
										borderRadius: '50rpx',
										bottom: '23rpx',
										left: '20rpx'
									}
								},
								{
									type: 'text',
									text: nickName,
									css: {
										position: 'absolute',
										bottom: '72rpx',
										left: '130rpx',
										width: '600rpx',
										fontSize: '32rpx',
										fontWeight: '300',
										color: '#0C0C0C'
									}
								},
								{
									type: 'text',
									text: '邀请您成为' + this.$t('action.attendantName') + ' 快快扫码加盟我们吧!',
									css: {
										position: 'absolute',
										bottom: '28rpx',
										left: '130rpx',
										width: '600rpx',
										fontSize: '26rpx',
										color: '#999999',
									}
								}
							],
						},
						{
							type: 'image',
							src: qr_code,
							css: {
								position: 'absolute',
								width: '314rpx',
								height: '314rpx',
								top: '588rpx',
								left: '198rpx',
								background: '#ffffff',
								borderRadius: qr_radius
							}
						},

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
	.code-img {
		width: 710rpx;
		height: 1278rpx;
	}
</style>