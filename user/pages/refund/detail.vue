<template>
	<view class="order-pages" v-if="detail.id">

		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-base radius-16"
			:style="{background:primaryColor}">
			<view @tap.stop="detail.status==5&&detail.failure_reason?$refs.show_rule_item.open():''"
				class="flex-center text-bold">{{statusType[detail.status]}}<i
					class="iconfont iconwentifankui3 ml-sm text-normal" style="font-size: 28rpx;"
					v-if="detail.status==5&&detail.failure_reason"></i>
				<view class="flex-warp f-caption text-normal ml-md" style="width:494rpx" v-if="detail.status == 2">
					退款金额¥{{detail.refund_price}}
					<view class="ml-md c-warning" v-if="(detail.refund_car_price * 1 === -1 && detail.car_price*1>0 && !detail.free_fare) || (detail.refund_car_price * 1 > 0 &&
					      detail.refund_car_price * 1 > 0)">
						含车费：¥{{ detail.refund_car_price * 1 === -1  ? detail.car_price  : detail.refund_car_price}}
					</view>
					<view class="ml-md c-warning" v-if="detail.refund_material_price * 1 > 0">
						含物料费：¥{{ detail.refund_material_price }}
					</view>
				</view>
			</view>
		</view>

		<view class="address-info flex-warp mt-lg ml-lg mr-lg pd-lg fill-base radius-16" v-if="!detail.store_id">
			<view class="address-icon flex-center c-base radius"
				:style="{background:`linear-gradient(to right, ${subColor}, ${primaryColor})`}"><i
					class="iconfont iconjuli"></i></view>
			<view class="flex-1 flex-between ml-md">
				<view class="max-540">
					<view class="flex-y-baseline username c-title text-bold">{{detail.address_info.user_name}}
						<view class="ml-md f-desc c-caption">{{detail.address_info.mobile}}</view>
					</view>
					<view class="f-desc c-title">
						{{`${detail.address_info.address} ${detail.address_info.address_info}`}}
					</view>
				</view>
			</view>
		</view>


		<view class="mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16" v-if="detail.store_id">
			<view class="flex-between">
				<view>下单人</view>
				<view class="c-title">{{detail.address_info.user_name}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>联系方式</view>
				<view class="c-title">{{detail.address_info.mobile}}</view>
			</view>
		</view>

		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16">

			<view class="flex-warp mb-lg" v-for="(aitem,aindex) in detail.order_goods" :key="aindex">
				<image mode="aspectFill" class="avatar lg radius-16" :src="aitem.goods_cover"></image>
				<view class="flex-1 ml-md">
					<view class="f-mini-title c-title text-bold max-450 ellipsis"> {{aitem.goods_name}} </view>
					<view class="f-caption c-caption mt-md max-450 ellipsis">
						服务{{$t('action.attendantName')}}：{{detail.coach_info ? detail.coach_info.coach_name : '-'}}
					</view>
					<view class="flex-between">
						<view class="flex-y-baseline f-caption c-warning">¥<view class="f-title text-bold">
								{{aitem.goods_price}}
							</view>
						</view>
						<view class="c-paragraph">x{{aitem.num}}</view>
					</view>
				</view>
			</view>
			<view class="flex-between">
				<veiw class="flex-1"></veiw>
				<view class="flex-y-center f-desc c-title text-bold">
					共
					<view class="c-warning">{{detail.all_goods_num}}
					</view>
					件
					合计：<view class="f-icontext">¥</view>{{detail.apply_price}}
					<view class="flex-y-center ml-md" v-if="detail.car_price*1>0&&!detail.free_fare">含车费：
						<view class="f-icontext">¥</view>{{detail.car_price}}
					</view>
				</view>
			</view>
			<view class="flex-between mt-lg" v-if="![2,4].includes(detail.status)">
				<view class="flex-1"></view>
				<button @tap.stop="toTel" class="clear-btn order" v-if="[3,5].includes(detail.status)">联系平台</button>
				<button @tap.stop="toCancel" class="clear-btn order"
					:style="{color:'#fff',background:primaryColor,border:`1rpx solid ${primaryColor}`}"
					v-if="detail.status == 1">取消退款</button>
			</view>
		</view>


		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16">
			<view class="flex-between pb-lg f-title c-title text-bold b-1px-b">退款信息</view>
			<view class="pt-lg f-desc">
				<view class="flex-between mb-md">
					<view>退款单号</view>
					<view class="c-caption flex-y-center ml-md">
						<view class="max-350 ellipsis">{{detail.order_code}}</view>
						<view @tap="toCopy(detail.order_code)" class="copy-btn flex-center radius-5 f-icontext ml-sm"
							:style="{color:primaryColor,borderColor:primaryColor}">复制</view>
					</view>
				</view>
				<view class="flex-between mb-md" v-if="detail.out_refund_no">
					<view>微信退款单号</view>
					<view class="c-caption flex-y-center ml-md">
						<view class="max-350 ellipsis">{{detail.out_refund_no}}</view>
						<view @tap="toCopy(detail.out_refund_no)" class="copy-btn flex-center radius-5 f-icontext ml-sm"
							:style="{color:primaryColor,borderColor:primaryColor}">复制</view>
					</view>
				</view>
				<view class="flex-warp mb-md">
					<view>提交日期</view>
					<view class="c-caption text-right flex-1 ml-md">{{detail.create_time}}</view>
				</view>
				<view class="flex-warp mb-md" v-if="detail.refund_time">
					<view>审核日期</view>
					<view class="c-caption text-right flex-1 ml-md">{{detail.refund_time}}</view>
				</view>
				<view class="flex-warp mb-md" v-if="detail.check_user_name">
					<view>审核人</view>
					<view class="c-caption text-right flex-1 ml-md">{{detail.check_user_name}}</view>
				</view>
				<view class="flex-column mb-md">
					<view>退款原因</view>
					<view class="c-caption mt-sm">
						<text decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
					</view>
				</view>
				<view class="flex-column" v-if="detail.imgs && detail.imgs.length > 0">
					<view>上传图片</view>
					<view class="flex-warp">
						<block v-for="(item,index) in detail.imgs" :key="index">
							<image @tap.top="previewImage(item,detail.imgs)" class="refund-img mt-md mr-md radius-10"
								:src="item" />
						</block>
					</view>
				</view>
			</view>
		</view>

		<view class="space-footer"></view>

		<common-popup @confirm="confirmCancel" ref="cancel_item" type="CANCEL_REFUND_ORDER" :info="popupInfo">
		</common-popup>

		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">失败原因</view>
				<view class="f-desc c-title mt-lg">
					{{detail.failure_reason}}
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_rule_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
				</view>
			</view>
		</uni-popup>

		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				options: {},
				statusType: {
					'-1': '已取消',
					1: '待退款',
					2: '同意退款',
					3: '拒绝退款',
					4: '退款中',
					5: '退款失败'
				},
				detail: {},
				popupInfo: {}
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
		methods: {
			...mapMutations(['']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				let {
					id
				} = this.options
				this.detail = await this.$api.order.refundOrderInfo({
					id
				})
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.initIndex(true)
			},
			// 取消退款
			async toCancel() {
				let {
					order_code,
					order_goods,
				} = this.detail
				let {
					goods_cover: image,
				} = order_goods[0]
				this.popupInfo = {
					name: `退款单号：${order_code}`,
					image,
				}
				this.$refs.cancel_item.open()
			},
			// 确认：取消退款
			async confirmCancel() {
				let {
					id,
				} = this.detail
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.order.cancelRefundOrder({
						id
					})
					this.$util.hideAll()
					this.$util.showToast({
						title: `取消成功`
					})
					this.$refs.cancel_item.close()
					setTimeout(() => {
						this.lockTap = false
						this.$util.back()
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			toTel() {
				let {
					mobile: url
				} = this.configInfo
				this.$util.goUrl({
					url,
					openType: `call`
				})
			},
			previewImage(current, urls) {
				this.$util.previewImage({
					current,
					urls
				})
			},
			toCopy(url) {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				this.$util.goUrl({
					url,
					openType: 'copy'
				})
			}
		}
	}
</script>


<style lang="scss">
	button.order {
		border-radius: 30rpx;
	}
</style>