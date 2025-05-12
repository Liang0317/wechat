<template>
	<view>
		<view class='record-box fill-base'>
			<view class='record-item rel ml-sm b-1px-l' :style="{padding:index==list.length -1?'0 0 0 30rpx':''}"
				v-for="(item,index) in list" :key="index">

				<text class="item-tag abs" :class="[{'cur':info[item.time]}]"
					:style="{border:`2rpx solid ${primaryColor}`,background: info[item.time] ? primaryColor : ''}"></text>

				<view class='c-title'>
					<view class="item-text f-paragraph flex-y-baseline">
						{{item.title}}
						<view class="ml-md f-caption c-caption">
							{{info[item.time]? '' :item.title == '签字确认' && !info.sign_img ? '暂未签字确认' :  '状态未开始' }}
						</view>
					</view>
					<view class="c-caption" v-if="info[item.time]">
						{{info[item.time]}}
					</view>
				</view>
				<view @tap.stop="toMap(item.addr)" class="flex-y-center mt-md f-caption c-title"
					v-if="item.addr && info[item.addr]">
					<i class="iconfont iconjuli mr-sm" :style="{color:primaryColor}"></i>{{info[item.addr]}}
				</view>
				<block
					v-if="item.img && info[item.img] && (!type || (type && (item.title != '签字确认' && !configInfo.hide_coach_image) || item.title== '签字确认'))">
					<!-- #ifdef H5 -->
					<view @tap.stop="toPreviewImage(item.img)" class="item-img mt-md radius-5">
						<view class="h5-image item-img mt-md radius-5"
							:style="{ backgroundImage : `url('${info[item.img]}')`}">
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image @tap.stop="toPreviewImage(item.img)" mode="widthFix" class="item-img mt-md radius-5"
						:src="info[item.img]">
					</image>
					<!-- #endif -->
				</block> 
				<view class="flex-between"
					v-if="type && !info.is_add && item.title== '签字确认' && info.order_end_time && !info.sign_img">
					<view @tap.stop="toSign" class="item-btn flex-center mt-md c-base radius"
						:style="{background:primaryColor}">
						签字确认
					</view>
					<view></view>
				</view>
			</view>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		name: 'timeline',
		props: {
			list: {
				type: Array,
				default () {
					return {}
				}
			},
			info: {
				type: Object,
				default () {
					return {}
				}
			},
			type: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {

			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
		}),
		methods: {
			toPreviewImage(key) {
				let curent = this.info[key]
				this.$util.previewImage({
					curent,
					urls: [curent]
				})
			},
			// 查看定位
			async toMap(key) {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				let arr = key.split('_')[0]
				let {
					info
				} = this
				await this.$util.checkAuth({
					type: 'userLocation'
				})
				await uni.getLocation({
					type: 'gcj02',
				})
				await uni.openLocation({
					latitude: info[`${arr}_lat`] * 1,
					longitude: info[`${arr}_lng`] * 1,
					name: info[key],
					scale: 28
				})
			},
			toSign() {
				let {
					id
				} = this.info
				let url = `/user/pages/order/sign?id=${id}`
				this.$util.goUrl({
					url
				})
			}
		},
	}
</script>

<style lang="scss">
	.record-item {
		padding: 0 0 30rpx 30rpx;

		.item-tag {
			width: 14px;
			height: 14px;
			display: block;
			background: #fff;
			border-radius: 50%;
			top: 0;
			left: -7px;
			transform: rotateZ(360deg);
		}

		.item-text {
			line-height: 34rpx;
		}

		.item-img {
			width: 180rpx;
			min-height: 120rpx;
		}

		.item-btn {
			width: 160rpx;
			height: 64rpx;
			background: #EEEEEE;
		}
	}

	.record-item.b-1px-l::before {
		border-left: 2px solid #ccc;
	}

	.record-item:last-child {
		padding-bottom: 0;
	}
</style>