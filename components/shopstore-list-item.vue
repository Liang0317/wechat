<template>
	<view class="shopstore-list-item">

		<view @tap.stop="goDetail" class="list-item flex-center pd-lg mt-md ml-md mr-md fill-base radius-16">
			<!-- #ifdef H5 -->
			<view class="item-img radius-16">
				<view class="h5-image item-img radius-16" :style="{ backgroundImage : `url('${info.cover}')`}">
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<image mode="aspectFill" class="item-img radius-16" :src="info.cover">
			</image>
			<!-- #endif -->
			<view class="flex-1 ml-md max-510">
				<view class="flex-y-center f-title c-title">
					<view class="text-bold max-380 ellipsis">{{info.title}}</view>
					<view class="store-status-btn flex-center ml-sm f-icontext"
						:style="{color:info.work_status==1?primaryColor:'#888',borderColor:info.work_status==1?primaryColor:'#888'}">
						{{info.work_status==1?'营业中':'休息中'}}
					</view>
				</view>
				<view class="flex-between f-icontext mt-sm">
					<view class="icon-item flex-y-center c-caption">
						<view class="flex-y-center mr-lg"><i class="iconfont iconpingfen1 icon-font-color"></i>
							<view class="star-text">{{info.star}}</view>
						</view>
						<view class="flex-y-center"><i
								class="iconfont iconyingyeshijian"></i>{{info.start_time && info.end_time?`${info.start_time} - ${info.end_time}`:'暂未设置'}}
						</view>
					</view>
					<view style="color: #E67D4B;"> {{info.total_num}}+次服务</view>
				</view>
				<view class="flex-between f-icontext mt-md">
					<view class="rate-info flex-center c-base rel" :style="{color:primaryColor}">
						<view class="bg abs" :style="{background:primaryColor}"></view>
						<view class="mr-sm">好评率</view>{{info.positive_rate}}% <view class="ml-md mr-sm">接单率</view>
						{{info.order_rate}}%
					</view>
					<view style="color: #636363;">{{info.distance}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		components: {},
		props: {
			from: {
				type: String,
				default () {
					return 'list'
				}
			},
			sid: {
				type: Number,
				default () {
					return 0
				}
			},
			info: {
				type: Object,
				default () {
					return {}
				}
			},
			maxWidth: {
				type: String,
				default () {
					return '450rpx'
				}
			}
		},
		data() {
			return {
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约',
					4: '不可预约'
				},
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo,
		}),
		methods: {
			// 详情
			goDetail() {
				let {
					id
				} = this.info
				this.$util.goUrl({
					url: `/shopstore/pages/detail?id=${id}`
				})
			},
			toEmit(key) {
				this.$emit(key)
			}
		}
	}
</script>

<style scoped lang="scss">
	.shopstore-list-item {
		.list-item {
			.item-img {
				width: 160rpx;
				height: 143rpx;
			}

			.store-status-btn {
				width: 76rpx;
				height: 28rpx;
				border-radius: 2rpx;
				border: 1rpx solid #888;
				transform: rotateZ(360deg);
			}

			.iconpingfen1 {
				background-image: -webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%);
			}

			.icon-item {
				color: #4D4D4D;

				.iconfont {
					font-size: 24rpx;
					margin-right: 6rpx;
				}
			}

			.star-text {
				color: #FF9519;
			}

			.rate-info {
				height: 30rpx;
				border-radius: 4rpx;
				padding: 1rpx 12rpx 0 12rpx;

				.bg {
					opacity: 0.1;
					border-radius: 4rpx;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}
			}
		}

	}
</style>