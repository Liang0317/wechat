<template>
	<!-- 轮播图广告 -->
	<!-- :current="activeIndex" -->
	<view class='swiper-box' :style='{margin:`0 ${margin}rpx`}' v-if="showModuleData">
		<swiper class="swiper-ad" :indicator-dots="false" :autoplay="playVideo ? false : autoplay"
			:indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :circular="circular"
			:previous-margin="list.length>1?previousMargin:0" :next-margin="list.length>1?nextMargin:0"
			@change="handerChange" :style="{height:height+'rpx'}" easing-function="linear">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class='img-box' @tap.stop='changeItem(item)'>
					<block v-if="item.jump_type == 'video'">
						<block v-if="!playVideo">
							<view @tap.stop="playCurrent" class="play-video-info flex-center c-base abs">
								<view class="play-video flex-center c-base radius">
									<i class="iconfont icon-play-video"></i>
								</view>
							</view>
							<image mode="aspectFill" :src='item.img' class="swiper-ad__img"
								:style="{borderRadius:borderRadius+'rpx'}" />
						</block>
						<view class="video-box" v-if="playVideo">
							<video :id="`video_id`" class="my-video" object-fit="contain" :loop="false"
								enable-play-gesture :enable-progress-gesture="false" :src="item.jump_url"
								:autoplay="playVideo" @play="onPlay" @pause="onPause" @ended="onEnded"
								@timeupdate="onTimeUpdate" @waiting="onWaiting" @progress="onProgress"
								@loadedmetadata="onLoadedMetaData"></video>
						</view>
					</block>
					<image mode="aspectFill" :src='item.img ? item.linkType ? item.img[0].url : item.img : item'
						class="swiper-ad__img" :style="{borderRadius:borderRadius+'rpx'}" v-else />
				</view>
			</swiper-item>
		</swiper>
		<view class='numbers' v-if="list.length>1&&indicatorType=='number' && !playVideo"
			:style="{textAlign:indicatorStyle}">
			<view class="number">{{activeIndex+1}}/{{list.length}}</view>
		</view>
		<view class='dots' v-if="list.length>1&&indicatorType=='dot'"
			:style="{textAlign:indicatorStyle,bottom:`${dotBottom}rpx`}">
			<view class='dot' v-for="(item,index) in list" :key="index"
				:style='{backgroundColor:index==activeIndex?indicatorActiveColor:indicatorColor,width:index==activeIndex? `${dotWidth}rpx` :"12rpx"}'>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'banner',
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			height: {
				type: Number,
				default () {
					return 400
				}
			},
			indicatorType: {
				type: String,
				default () {
					return "dot"
				}
			},
			indicatorColor: {
				type: String,
				default () {
					return "#FEFFFE"
				}
			},
			indicatorActiveColor: {
				type: String,
				default () {
					return "#fff"
				}
			},
			indicatorStyle: {
				type: String,
				default () {
					return 'center'
				}
			},
			circular: {
				type: Boolean,
				default () {
					return true
				}
			},
			autoplay: {
				type: Boolean,
				default () {
					return false
				}
			},
			previousMargin: {
				type: Number,
				default () {
					return 0
				}
			},
			nextMargin: {
				type: Number,
				default () {
					return 0
				}
			},
			dotWidth: {
				type: Number,
				default () {
					return 12
				}
			},
			dotBottom: {
				type: Number,
				default () {
					return 20
				}
			},
			margin: {
				type: Number,
				default () {
					return 0
				}
			},
			borderRadius: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		created() {
			this.videoContexts = uni.createVideoContext(`video_id`, this)
		},
		data() {
			return {
				showModuleData: true,
				activeIndex: 0,
				videoContexts: {},
				playVideo: false,
			}
		},
		watch: {
			list(newlist, oldlist) {
				this.activeIndex = 0
				this.showModuleData = false;
				setTimeout(() => {
					this.$nextTick(() => {
						this.showModuleData = true
					});
				})
			}
		},
		computed: mapState({
			configInfo: state => state.config.configInfo,
		}),
		methods: {
			handerChange: function(e) {
				let {
					current
				} = e.detail
				this.activeIndex = current
				let ind = this.list.findIndex(item => {
					return item.jump_type == 'video'
				})
				if (ind == -1) return
				if (current == ind + 1 || current == this.list.length - 1) {
					this.videoContexts.pause()
					this.playVideo = false
				}
			},
			changeItem(item) {
				let {
					jump_type = ''
				} = item
				if (jump_type == 'video') return
				this.$emit("change", item)
			},
			playCurrent() {
				this.videoContexts.play()
				this.playVideo = true
			},
			onPlay(e) {},
			onPause(e) {
				this.playVideo = false
			},
			onEnded(e) {},
			onError(e) {},
			onTimeUpdate(e) {},
			onWaiting(e) {},
			onProgress(e) {},
			onLoadedMetaData(e) {}
		}
	}
</script>

<style lang="scss">
	.swiper-box {
		position: relative;

		.img-box {
			width: 100%;
			height: 100%;

			.swiper-ad__img {
				width: 100%;
				height: 100%;
				background: #fff;
			}

			.play-video-info {
				top: 0rpx;
				width: 100%;
				height: 100%;
				z-index: 9;

				.play-video {
					width: 66rpx;
					height: 66rpx;
					background: rgba(2, 2, 2, 0.5);

					.iconfont {
						font-size: 28rpx;
					}
				}
			}

			.video-box {
				width: 100%;
				height: 100%;

				.my-video {
					width: 100%;
					height: 100%;
				}
			}

		}

		.dots {
			position: absolute;
			z-index: 20rpx;
			text-align: right;
			width: 100%;
			padding: 0 20rpx;

			.dot {
				display: inline-block;
				height: 12rpx;
				width: 12rpx;
				background-color: #FEFFFE;
				border-radius: 6rpx;
				margin: 0 8rpx;

			}
		}


		.numbers {
			position: absolute;
			z-index: 20rpx;
			text-align: right;
			width: 100%;
			transform: translateY(-70rpx);
			padding: 0 15rpx;

			.number {
				display: inline-block;
				width: 66rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				color: #fff;
				text-align: center;
				border-radius: 33rpx;
				background: rgba(0, 0, 0, 0.4);
			}
		}
	}
</style>