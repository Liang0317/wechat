<template>
	<view class="pt-md" style="background-color: #F4F6F7;">
		<view class="hideCanvasView">
			<l-painter class="hideCanvas" ref="painter" useCORS />
		</view>
		<block v-if="src">
			<image :src="src" class="code-img ml-md" @tap="previewImage"></image>
			<view class="space-max-footer"></view>
			<fix-bottom-button @cancel="$util.goUrl({url:`/user/pages/coachbroker/share-set`})" @confirm="toPreviewSave"
				:text="[{text: '分享设置',type:'cancel'},{text: confirmText,type:'confirm'}]"
				bgColor="#fff" :classType="2">
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
				cover: '',
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
			let {
				broker_poster = ''
			} = this.$util.getPage(-1).detail
			this.cover = broker_poster || 'https://lbqny.migugu.com/admin/anmo/mine/inv_coach.png'
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
				let {
					cover,
					admin_id = 0,
					check_admin = {}
				} = this
				let {
					id = 0
				} = check_admin
				if (refresh && id) {
					admin_id = id
				}
				this.$util.showLoading()
				let qr_code = await this.$api.coachbroker.resellerInvCoachQr({
					admin_id
				})
 
				let qr_radius = '0rpx'
				// #ifdef MP-WEIXIN
				qr_radius = '157rpx'
				// #endif

				let poster = {
					css: {
						width: '710rpx',
						height: '1138rpx',
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
						this.src = res.tempFilePath
						this.$util.hideAll()
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
		height: 1138rpx;
	}
</style>