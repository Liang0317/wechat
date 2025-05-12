<template>
	<view class="technician-info order-pages rel" v-if="detail.id">
		<banner :list="detail.banner" :margin="0" :autoplay="true" :height="750" v-if="detail.banner.length > 0">
		</banner>
		<view class="pd-lg fill-base">
			<view class="flex-between">
				<view class="f-title c-black text-bold max-500">{{detail.coach_name || '-'}}</view>
				<view @tap.stop="toShield" class="flex-y-center">
					<view class="like-label flex-center mr-sm radius"
						:style="{background:detail.is_shield?'#FF8D4C':''}">
						<i class="iconfont"
							:class="[{'iconbuxihuan c-caption':!detail.is_shield},{'iconbuxihuan-xuanzhong c-base':detail.is_shield}]"></i>
					</view>
					屏蔽
				</view>
			</view>
			<view class="flex-y-center mt-sm">
				<view class="service-label flex-center f-icontext">
					{{textType[detail.text_type]}}
				</view>
				<view class="time-label flex-y-center ml-md f-icontext c-paragraph" v-if="detail.near_time">
					<view class="near-text flex-center">最早可约</view>
					<view class="near-time flex-center c-base rel" :style="{color:primaryColor}">
						<view class="bg abs" :style="{background:primaryColor}"></view>
						{{detail.near_time}}
					</view>
				</view>
			</view>
			<view class="flex-y-center mt-lg f-icontext c-caption">
				<block
					v-if="(configInfo.merchant_switch_show && detail.admin_id && detail.merchant_name) || (configInfo.plugAuth.store && detail.store_id && detail.store_name)">
					<view @tap.stop="goInfo" class="flex-y-center">
						<i class="iconfont iconshangjia_1"
							v-if="configInfo.merchant_switch_show && detail.admin_id && detail.merchant_name"></i>
						<i class="iconfont icondianpu" v-else></i>
						<view class="ellipsis" style="max-width: 250rpx;">
							{{configInfo.merchant_switch_show && detail.admin_id && detail.merchant_name ? detail.merchant_name : detail.store_name}}
						</view>
					</view>
					<view class="line"></view>
				</block>
				<view class="flex-y-baseline">
					<i class="iconfont iconpingfen1 icon-font-color"></i>
					<view class="star-text flex-y-center f-caption">{{detail.star || 0}}</view>
				</view>
				<block v-if="detail.show_salenum">
					<view class="line"></view>
					<view>已服务{{detail.order_num>9999?'9999+':detail.order_num}}单</view>
				</block>
				<view class="line"></view>
				<view>从业{{detail.work_time}}年</view>
			</view>

			<view class="introduce-info mt-lg pd-lg f-paragraph c-title radius-16">
				<span v-if="!detail.showText">{{detail.text.substring(0,42) + '...'}}</span>
				<view v-else>
					<text decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
				</view>
				<span @tap.stop="toShowHide('showText')" :class="[{'ml-md':!detail.showText},{'mt-md':detail.showText}]"
					:style="{color:primaryColor}" v-if="detail.have_show_text">
					{{!detail.showText?'展开':'收起'}}
					<text class="iconfont ml-sm" :class="[{'iconxia':!detail.showText},{'iconshang':detail.showText}]"
						style="font-size: 24rpx"></text>
				</span>
			</view>
		</view>
		<view @tap.stop="$util.goUrl({url:`/user/pages/license-info`})"
			class="fill-base flex-center mt-md pt-lg pl-lg pr-md pb-lg" v-if="configInfo.coach_license_show">
			<image class="zhengshu-img" src="https://lbqny.migugu.com/admin/anmo/technician/zhengshu.png"></image>
			<view class="flex-1 flex-center ml-md">
				<view class="flex-1 flex-y-center">
					<view class="f-paragraph text-bold" style="color:#AD6F00">查看资质</view>
					<view class="f-caption ml-md" style="color: #4D4D4D;">健康档案 资质齐全</view>
				</view>
				<i class="iconfont icongengduo" style="color:#C7C7C7;font-size: 24rpx"></i>
			</view>
		</view>
		<view class="fill-base mt-md pt-lg pl-lg pr-md pb-lg">
			<view class="pb-lg f-paragraph c-black text-bold">相册</view>
			<scroll-view scroll-x class="picture-list">
				<view @tap.stop="toPreviewImage(index)" class="picture-item" v-for="(item,index) in detail.self_img"
					:key="index">
					<!-- #ifdef H5 -->
					<view class="cover radius-16">
						<view class="h5-image cover radius-16" :style="{ backgroundImage : `url('${item}')`}">
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" lazy-load class="cover radius-16" :src="item"></image>
					<!-- #endif -->
				</view>
			</scroll-view>
		</view>


		<view class="fill-base mt-md pt-lg pb-lg">
			<view class="flex-between pl-lg pr-md " :class="[{'pb-lg': serviceList.length>0}]">
				<view class="f-paragraph c-black text-bold">选择项目</view>
				<view @tap.stop="toComment" class="flex-y-center f-caption c-caption">查看评价
					<i class="iconfont icongengduo" style="color:#C7C7C7;font-size: 24rpx"></i>
				</view>
			</view>

			<view class="pl-lg pr-lg" :class="[{'mt-md':index!=0},{'pb-md':index!=serviceList.length-1}]"
				v-for="(item,index) in serviceList" :key="index">
				<service-list-item @order="toOrder(index)" from="technician-info" :info="item"
					maxWidth="490rpx"></service-list-item>
			</view>
			<abnor v-if="serviceList.length == 0"></abnor>

		</view>


		<view class="space-footer"></view>

		<technician-list-popup ref="technician_list_popup" from="technician-info"></technician-list-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import serviceListItem from "@/components/service-list-item.vue"
	import technicianListPopup from "@/components/technician-list-popup.vue"
	export default {
		components: {
			serviceListItem,
			technicianListPopup
		},
		data() {
			return {
				options: {},
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约',
					4: '不可预约'
				},
				detail: {},
				serviceList: [],
				loading: true,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad(options) {
			this.options = options
			this.initIndex()
		},
		onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif
			this.initRefresh();
			uni.stopPullDownRefresh()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'getMineInfo']),
			...mapMutations(['updateTechnicianItem', 'updateUserItem']),
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
				uni.setNavigationBarTitle({
					title: this.$t('action.attendantName') + '详情'
				})
				await this.getList()
			},
			initRefresh() {
				this.initIndex(true)
			},
			async getDetail() {
				let {
					id
				} = this.options
				let data = await this.$api.service.coachInfo({
					id
				})
				data.banner = data.video ? [{
					jump_type: 'video',
					img: data.work_img,
					jump_url: data.video
				}] : [{
					img: data.work_img
				}]
				let have_show_text = data.text.length > 42
				data.have_show_text = have_show_text
				data.showText = !have_show_text
				this.detail = data
			},
			async getList() {
				let {
					id: coach_id
				} = this.options
				let {
					data
				} = await this.$api.service.coachServiceList({
					coach_id
				});
				this.serviceList = data
				this.loading = false
				this.$util.hideAll()
			},
			async toShield() {
				let {
					id
				} = this.options
				await this.$api.mine.shieldCoachAdd({
					type: 2,
					coach_id: id
				})
				this.updateUserItem({
					key: 'haveShieldOper',
					val: 2
				})
				this.$util.back()
				this.getMineInfo()
				setTimeout(() => {
					this.$util.goUrl({
						url: 1,
						openType: `navigateBack`
					})
				}, 1000)
			},
			// 预约
			async toOrder(index) {
				let {
					is_work = 0
				} = this.detail
				if (!is_work) {
					this.$util.showToast({
						title: `该${this.$t('action.attendantName')}未上班`
					})
					return
				}
				let {
					id: service_id,
				} = this.serviceList[index]
				let {
					id: coach_id
				} = this.options
				if (this.lockTap) return;
				this.lockTap = true;
				try {
					await this.$api.order.addCar({
						service_id,
						coach_id,
						num: 1,
						is_top: 1,
						coach_service: 1
					})
					this.lockTap = false
					let url = `/user/pages/order?id=${coach_id}&ser_id=${service_id}`
					this.$util.goUrl({
						url
					})
				} catch (e) {
					this.lockTap = false
				}
			},
			toShowHide(key) {
				this.detail[key] = !this.detail[key]
			},
			toComment() {
				this.$refs.technician_list_popup.toShowPopup(this.detail, 'message')
			},
			toPreviewImage(index) {
				let urls = this.detail.self_img
				this.$util.previewImage({
					current: urls[index],
					urls
				})
			},
			goInfo() {
				let {
					merchant_switch_show,
					plugAuth = {},
				} = this.configInfo

				let {
					store_id,
					admin_id,
					merchant_name
				} = this.detail
				let url = merchant_switch_show && admin_id && merchant_name ?
					`/user/pages/merchant-info?id=${admin_id}` : `/shopstore/pages/detail?id=${store_id}`
				this.$util.goUrl({
					url
				})
			}
		}
	}
</script>


<style lang="scss">
	.technician-info {
		.cover-img {
			width: 750rpx;
			height: 417rpx;
		}


		.like-label {
			width: 42rpx;
			height: 42rpx;
			background: #EFEFEF;

			.iconfont {
				font-size: 24rpx;
				margin-top: 5rpx;
			}
		}

		.service-label {
			min-width: 88rpx;
			height: 32rpx;
			padding: 0 10rpx;
			color: #EBDDB1;
			background: linear-gradient(270deg, #4C545A 0%, #282B34 100%);
			border-radius: 4rpx;
		}

		.time-label {

			.near-text {
				width: 100rpx;
				height: 33rpx;
				background: #F5F5F5;
				border-radius: 3rpx 0 0 3rpx;
			}

			.near-time {
				width: 66rpx;
				height: 33rpx;
				border-radius: 0 3rpx 3rpx 0;

				.bg {
					opacity: 0.1;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
					border-radius: 0 3rpx 3rpx 0;
				}
			}
		}

		.icondianpu {
			margin-right: 6rpx;
		}

		.iconpingfen1 {
			font-size: 24rpx;
			background-image: -webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%);
		}

		.star-text {
			height: 26rpx;
			color: #FF9519;
			margin-left: 6rpx;
		}

		.line {
			width: 1rpx;
			height: 11rpx;
			background: #979797;
			margin: 0 18rpx;
		}

		.introduce-info {
			width: 690rpx;
			background: #F9F9F9;
		}

		.zhengshu-img {
			width: 37rpx;
			height: 40rpx;
		}

		.picture-list {
			white-space: nowrap;
			width: 690rpx;

			.picture-item {
				width: 122rpx;
				margin-left: 20rpx;
				display: inline-block;

				.cover {
					width: 122rpx;
					height: 122rpx;
				}
			}

			.picture-item:nth-child(1) {
				margin-left: 0;
			}
		}

		.comment-item {
			.avatar {
				width: 52rpx;
				height: 52rpx;
				background: #f4f6f8;
			}

			.iconpingfen1 {
				font-size: 28rpx;
				margin-right: 5rpx;
				font-size: 28rpx;
			}
		}

	}
</style>