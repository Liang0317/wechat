<template>
	<view>

		<view
			:class="[{'flex-warp':!imgclass || imgclass =='mini' || imgclass == 'apply'},{'flex-center flex-column':imgclass && imgclass != 'mini' && imgclass!=='apply'}]">
			<block v-for="(item,index) in imagelist" :key="index">
				<view class="rel item-child radius-16" :class="[imgclass,{'margin': imgsize > 1}]"
					:style="{border:imgclass == 'apply' || imgclass == 'apply-idcard'?`4rpx solid ${primaryColor}`:''}">
					<!-- #ifdef H5 -->
					<view class="upload-img radius-16" v-if="filetype == 'picture'">
						<view @tap.stop="previewImage(item,imagelist)" class="h5-image upload-img radius-16"
							:style="{ backgroundImage : `url('${item.path}')`}">
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" @tap.stop="previewImage(item,imagelist)" class="upload-img radius-16"
						:src="item.path" v-if="filetype == 'picture'"></image>
					<!-- #endif -->

					<video :id="`video_${index}`" class="upload-video rel radius-16" :loop="false" enable-play-gesture
						enable-progress-gesture :show-center-play-btn="true" :controls="true" :src="item.path"
						:data-id="item.id" objectFit="cover" :data-index="index" @play="onPlay" @pause="onPause"
						@ended="onEnded" @timeupdate="onTimeUpdate" @waiting="onWaiting" @progress="onProgress"
						@loadedmetadata="onLoadedMetaData" v-if="filetype == 'video'">
						<cover-view @tap="toDel(index)" class="item-delete abs flex-center f-icontext c-base"
							v-if="isEdit" :style="{background:primaryColor}">
							删除
						</cover-view>
					</video>

					<block v-if="filetype == 'picture' && isEdit">
						<view @tap="toDel(index)" class="guanbi abs flex-center" :class="[imgclass]" style="z-index: 1;"
							v-if="imgsize>1"><i class="iconfont icon-add rotate-45 c-base"></i></view>
						<view @tap="chooseImage" class="flex-center flex-column item-child upload-item radius-16 abs"
							style="top:0;margin-top:0;background:rgba(0,0,0,0.5);" v-else>
							<view class="upload-icon flex-center c-title radius-10">
								<i class="iconfont icon-camera"></i>
							</view>
							<view class="f-caption c-base mt-sm">重新上传</view>
						</view>
					</block>
				</view>
			</block>
			<view @tap="chooseImage" class="radius-16 item-child fill-body radius-16"
				:class="[imgclass,{'margin': imgsize > 1}]"
				:style="{border:imgclass == 'apply' || imgclass == 'apply-idcard'?`4rpx solid ${primaryColor}`:''}"
				v-if="imagelist.length < imgsize && isEdit">
				<view class="flex-center flex-column upload-item">
					<view class="upload-icon flex-center c-title radius-10">
						<i class="iconfont icon-camera"></i>
					</view>
					<view class="f-caption c-caption mt-sm" v-if="text">{{text}}</view>
					<view class="cur-imgsize f-caption c-caption" v-if="imgsize>1">{{`${imagelist.length}/${imgsize}`}}
					</view>
				</view>
			</view>
			<view class="radius-16 item-child fill-body radius-16" :class="[imgclass]"
				:style="{border:imgclass == 'apply' || imgclass == 'apply-idcard'?`4rpx solid ${primaryColor}`:''}"
				v-if="imagelist.length < imgsize && !isEdit">
				<view class="flex-center flex-column upload-item">
					<view class="upload-icon flex-center c-title radius-10">
						<i class="iconfont icon-camera"></i>
					</view>
					<view class="f-caption c-caption mt-sm">暂未上传</view>
				</view>
			</view>
		</view>
		<w-compress ref='wCompress' />
		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	import WCompress from '@/components/w-compress/w-compress.vue'
	import {
		mapState,
		mapActions,
	} from 'vuex';
	export default {
		components: {
			WCompress
		},
		props: {
			// 图片列表
			imagelist: {
				type: Array,
				default () {
					return []
				}
			},
			// 图片参数名
			imgtype: {
				type: String,
				default () {
					return ''
				}
			},
			// 图片张数
			imgsize: {
				type: Number,
				default () {
					return 9
				}
			},
			// 上传类型
			filetype: {
				type: String,
				default () {
					return 'picture'
				}
			},
			// 图片样式
			imgclass: {
				type: String,
				default () {
					return ''
				}
			},
			// 备注信息
			text: {
				type: String,
				default () {
					return ''
				}
			},
			// 视频大小限制
			videoSize: {
				type: Number,
				default () {
					return 50
				}
			},
			// 上传类型
			sourceType: {
				type: Number,
				default () {
					return 1
				}
			},
			// 是否可上传/删除
			isEdit: {
				type: Boolean,
				default () {
					return true
				}
			},
			// 压缩图片
			isCompress: {
				type: Boolean,
				default () {
					return true
				}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo
		}),
		methods: {
			previewImage(current, urls) {
				let res_urls = [];
				urls = this.$util.deepCopy(urls);
				urls.forEach((item, index) => {
					res_urls.push(item.path)
				})
				uni.previewImage({
					current: current.path,
					urls: res_urls,
				})
			},
			async toDel(index) {
				let fileName = this.filetype == 'picture' ? '图片' : '视频'
				let [res_del, {
					confirm
				}] = await uni.showModal({
					content: `请确认是否要删除${fileName}`,
				})
				if (!confirm) return;
				this.imagelist.splice(index, 1);
				this.$emit('del', {
					imgtype: this.imgtype,
					imagelist: this.imagelist
				});
			},
			async chooseImage() {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				let {
					imgtype,
					imgsize,
					filetype,
					videoSize,
					sourceType,
					isCompress,
				} = this
				// #ifdef APP-PLUS
				isCompress = false
				// #endif
				let imagelist = this.$util.deepCopy(this.imagelist)
				let is_upload_img = filetype == 'picture'
				let chooseModel = is_upload_img ? 'chooseImage' : 'chooseVideo'
				let count = 1
				// #ifndef H5
				count = imgsize == 1 ? 1 : imgsize - imagelist.length * 1
				// #endif
				let param = {
					count
				}
				if (is_upload_img) {
					param.sizeType = ['compressed']
				}
				param.sourceType = sourceType == 1 ? ['camera', 'album'] : ['camera']
				let [res_upload, res_info] = await uni[chooseModel](param)
				if (res_upload) return
				let {
					size = 0,
						tempFiles,
						tempFilePath = ''
				} = res_info
				console.log(is_upload_img, size, size / 1024 / 1024, "=====size")
				if (filetype == 'video' && size / 1024 / 1024 > videoSize) {
					this.$util.showToast({
						title: `上传视频大小超过限制${videoSize}M`
					})
					return
				}
				let filePath = [];
				// 格式化图片参数
				if (is_upload_img) {
					let arr = tempFiles.map(item => {
						return item.path
					})
					if (isCompress) {
						uni.showLoading({
							title: '图片压缩中...',
							mask: true
						})
						this.$refs.wCompress.start(arr, {
							pixels: 1000000, // 最大分辨率，默认二百万
							quality: 0.9
						}).then(res => {
							// console.log(res, "=============== wCompress res")
							this.$util.hideAll()
							this.toCompressImg(res, imgtype, imgsize, imagelist)
						}).catch(e => {
							console.log(e)
							this.$util.hideAll()
						})
					} else {
						this.toCompressImg(arr, imgtype, imgsize, imagelist)
					}
				} else {
					this.$util.showLoading({
						title: "上传中"
					});
					let {
						attachment_path: path
					} = await this.$api.base.uploadFile({
						filePath: tempFilePath,
						formData: {
							type: this.filetype
						}
					})
					imagelist.push({
						path
					})
					this.$util.hideAll()
					this.$emit('upload', {
						imgtype,
						imagelist
					})
				}
			},
			async toCompressImg(imgs, imgtype, imgsize, imagelist) {
				this.$util.showLoading({
					title: "上传中"
				});
				for (let i = 0; i < imgs.length; i++) {
					let {
						attachment_path: path
					} = await this.$api.base.uploadFile({
						filePath: imgs[i],
						formData: {
							type: this.filetype
						}
					})
					if (imgsize > 1) {
						imagelist.push({
							path
						})
					} else {
						imagelist = [{
							path
						}]
					}
				}
				this.$util.hideAll()
				this.$emit('upload', {
					imgtype,
					imagelist
				})
			},
			onPlay(e) {},
			onPause(e) {},
			onEnded(e) {},
			onTimeUpdate(e) {},
			onWaiting(e) {},
			onProgress(e) {},
			onLoadedMetaData(e) {},
		}
	}
</script>

<style lang="scss">
	.item-child {
		width: 216rpx;
		height: 216rpx;
		background: #F7F7F7;
		margin-bottom: 20rpx;
	}

	.margin {
		margin: 0 21rpx 21rpx 0;
	}

	.item-child:nth-child(3n) {
		margin-right: 0rpx;
	}

	.item-child.sm {
		width: 140rpx;
		height: 140rpx;
	}

	.item-child.apply {
		width: 176rpx;
		height: 176rpx;
		transform: scaleZ(360deg);
	}

	.item-child.apply-idcard {
		width: 290rpx;
		height: 182rpx;
		transform: scaleZ(360deg);
	}

	.item-child.mini {
		width: 196rpx;
		height: 196rpx;
	}

	.item-child.md {
		width: 335rpx;
		height: 210rpx;
		margin: 0rpx;
	}

	.item-child.lg {
		width: 686rpx;
		height: 400rpx;
	}

	.upload-img,
	.upload-video {
		width: 100%;
		height: 100%;
	}


	.upload-video {
		.item-delete {
			width: 60rpx;
			height: 32rpx;
			top: 0;
			right: 0;
			z-index: 2;
		}
	}

	.upload-item {
		width: 100%;
		height: 100%;

		.upload-icon {
			width: 80rpx;
			height: 76rpx;
			background: #FFFFFF;

			.iconfont {
				font-size: 40rpx;
				display: block;
			}
		}

		.cur-imgsize {
			line-height: 1.1;
		}

	}

	.upload-item.margin {
		margin-bottom: 0;
	}

	.guanbi {
		width: 32rpx;
		height: 32rpx;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0 15rpx 0 0;
		top: 0rpx;
		right: 0rpx;
		z-index: 1;

		.iconfont {
			font-size: 28rpx;
		}
	}

	.guanbi.lg {
		width: 50rpx;
		height: 50rpx;

		.iconfont {
			font-size: 38rpx;
		}
	}
</style>