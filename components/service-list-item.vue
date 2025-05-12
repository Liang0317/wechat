<template>
	<view class="service-list-item">

		<view @tap.stop="goDetail" class="list-item flex-warp">
			<!-- #ifdef H5 -->
			<view class="cover radius-16">
				<view class="h5-image cover radius-16" :style="{ backgroundImage : `url('${info.cover}')`}">
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<image mode="aspectFill" lazy-load class="cover radius-16" :src="info.cover"></image>
			<!-- #endif -->


			<view class="flex-1 ml-md" :style="{maxWidth:maxWidth}">
				<view :class="[{'flex-between':info.show_salenum}]">
					<view class="f-mini-title c-title text-bold ellipsis" :class="[{'max-270':info.show_salenum}]">
						{{ info.title }}</view>
					<view class="f-caption c-caption" v-if="info.show_salenum">{{ info.total_sale }}人已预约</view>
				</view>
				<view class="f-caption c-caption ellipsis" style="margin-top: 6rpx;">{{ info.sub_title || '' }}
				</view>
				<view class="flex-y-center f-caption c-caption"><i class="iconfont iconshijian"
						style="font-size:24rpx;margin-right: 5rpx;"
						:style="{color:primaryColor}"></i>{{info.time_long}}分钟
				</view>
				<view class="flex-between mt-sm">
					<view class="flex-y-center f-desc c-caption ellipsis"
						:style="{width:attendant_name.length===5?'240rpx':attendant_name.length===4?'260rpx':attendant_name.length===3?'280rpx':'300rpx'}">
						<view class="flex-y-baseline f-icontext c-warning mr-sm">¥<view class="f-sm-title">
								{{ info.price }}
							</view>
						</view>
						<view class="member-canbuy-level" v-if="info.member_info && info.member_info.title">
							<view class="text flex-center">{{info.member_info.title}}专享</view>
						</view>
					</view>
					<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toChoose"
						:style="{width:attendant_name.length===5?'200rpx':attendant_name.length===4?'180rpx':attendant_name.length===3?'160rpx':'140rpx'}">
						<view class="flex-between">
							<view></view>
							<view class="item-btn flex-center f-caption c-base" :style="{ background: primaryColor }">
								{{ from == 'technician-info' ? `立即预约` : `选择${$t('action.attendantName')}`}}
							</view>
						</view>
					</auth>
				</view>
				<!-- <view class="flex-between mt-md">
					<view class="flex-y-center f-desc c-caption max-350 ellipsis">
						<view class="time-long flex-center">{{ info.time_long }}分钟</view>
						<view class="flex-y-baseline f-icontext c-warning mr-sm">¥<view class="f-sm-title">
								{{ info.price }}
							</view>
						</view>
						<view class="text-delete" v-if="info.init_price">¥{{ info.init_price }}</view>
					</view>
					<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toChoose" style="width:200rpx">
						<view class="flex-between">
							<view></view>
							<view class="item-btn flex-center f-caption c-base" :style="{ background: primaryColor }">
								{{ from == 'technician-info' ? `立即预约` : `选择${$t('action.attendantName')}`}}
							</view>
						</view>
					</auth>
				</view> -->
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
			attendant_name: state => state.config.configInfo.attendant_name,
			userInfo: state => state.user.userInfo,
		}),
		methods: {
			// 详情
			goDetail() {
				let {
					id
				} = this.info
				let {
					sid: store_id = 0
				} = this
				let url = `/user/pages/detail?id=${id}&store_id=${store_id}`
				this.$util.goUrl({
					url
				})
			},
			// 选择技-师
			toChoose() {
				let {
					can_buy,
					title
				} = this.info.member_info
				if (!can_buy) {
					let msg = title ? title.includes('会员') ? title : `${title}会员` : '会员'
					this.$util.showToast({
						title: `您还不是${msg}`
					})
					return
				}
				let {
					from
				} = this
				if (from == 'technician-info') {
					this.$emit('order')
					return
				}
				let {
					id
				} = this.info
				let {
					sid: store_id = 0
				} = this
				let url = `/user/pages/choose-technician?id=${id}&store_id=${store_id}`
				this.$util.goUrl({
					url
				})
			},
			toEmit(key) {
				this.$emit(key)
			}
		}
	}
</script>

<style scoped lang="scss">
	.service-list-item {
		.list-item {
			.cover {
				width: 180rpx;
				height: 180rpx;
			}

			.time-long {
				min-width: 72rpx;
				height: 30rpx;
				padding: 0 5rpx;
				background: linear-gradient(270deg, #4C545A 0%, #282B34 100%);
				border-radius: 4rpx;
				font-size: 20rpx;
				color: #FFEEB9;
				margin-right: 16rpx;
			}

			.f-icontext {
				font-size: 18rpx;
			}

			.text-delete {
				font-size: 20rpx;
				color: #B9B9B9;
			}

			.item-btn {
				min-width: 130rpx;
				height: 52rpx;
				padding: 0 10rpx;
				border-radius: 8rpx;
			}
		}
	}
</style>