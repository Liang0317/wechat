<template>
	<view class="order-pages" v-if="detail.id">
		<view class="ml-md mr-md mt-md pd-lg fill-base f-desc radius-16">
			<view class="text">异常类型</view>
			<view class="f-paragraph c-title mt-md">{{detail.type | handleTitle(abnormalTypeList)}}</view>
			<view class="text mt-md">差评原因</view>
			<view class="f-paragraph c-title mt-md">
				<text decode="emsp" style="word-break:break-all;">{{detail.bad_text}}</text>
			</view>
			<view class="text mt-md">客服处理意见</view>
			<view class="f-paragraph c-title mt-md">
				<text decode="emsp" style="word-break:break-all;">{{detail.customer_text}}</text>
			</view>
			<view class="text mt-md">建议扣款</view>
			<view class="f-paragraph c-title mt-md">¥{{detail.deduct_cash}}</view>
		</view>

		<view class="ml-md mr-md mt-md pd-lg fill-base f-desc radius-16">
			<view class="flex-center">
				<view class="text">首次处理时间</view>
				<view class="flex-1 f-paragraph c-title">{{detail.first_handle.time}}</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="text">首次处理人</view>
				<view class="flex-1 f-paragraph c-title">
					<block v-if="detail.first_handle">
						{{detail.first_handle.user_name || '-'}}
						<span v-if="detail.first_handle.role"> ({{ detail.first_handle.role }}) </span>
					</block>
					<block v-else>-</block>
				</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="text">是否已扣款</view>
				<view class="flex-1 f-paragraph c-title">{{detail.is_deduct === 1 ? '是' : '否'}}</view>
			</view>
			<view class="flex-center mt-lg" v-if="detail.is_deduct === 1">
				<view class="text">扣除分成金额</view>
				<view class="flex-1 f-paragraph c-warning">¥{{detail.have_deduct_cash}}</view>
			</view>
			<view class="flex-warp mt-lg">
				<view class="text">最终处理意见</view>
				<view class="flex-1 f-paragraph c-title">
					<block v-if="detail.end_handle && detail.end_handle.time">
						{{detail.end_handle.user_name || '-'}}
						<span v-if="detail.end_handle.role">
							({{ detail.end_handle.role }})
						</span>
						<span class="agreen-btn f-icontext ml-md"
							:style="{color:detail.end_handle.status===2?primaryColor:subColor,borderColor:detail.end_handle.status===2?primaryColor:subColor}">
							{{ ['', '', '同意', '拒绝'][detail.end_handle.status] }}
						</span>
					</block>
					<block v-else>-</block>
				</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="text">最终处理时间</view>
				<view class="flex-1 f-paragraph c-title">
					<block v-if="detail.end_handle && detail.end_handle.time">
						{{detail.end_handle.time }}
					</block>
					<block v-else>-</block>
				</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="text">最终完成时间</view>
				<view class="flex-1 f-paragraph c-title">{{detail.deduct_time || '-'}}</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="text">当前进度</view>
				<view class="flex-1 f-paragraph c-title">{{detail.status === 1 ? '待处理' : '已处理'}}</view>
			</view>
		</view>

		<view class="space-footer"></view>


	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				options: {},
				abnormalTypeList: [{
					id: 1,
					title: `${this.$t('action.attendantName')}拒单`
				}, {
					id: 2,
					title: '超时接单'
				}, {
					id: 3,
					title: '客户差评'
				}, {
					id: 4,
					title: '行为规范'
				}, {
					id: 5,
					title: '话术规范'
				}, {
					id: 6,
					title: '客户投诉'
				}, {
					id: 7,
					title: '退车费'
				}, {
					id: 8,
					title: '到达后取消'
				}, {
					id: 9,
					title: '订单取消'
				}, {
					id: 10,
					title: '私收小费'
				}, {
					id: 11,
					title: '用户退款'
				}, {
					id: 12,
					title: '分城市提交'
				}, {
					id: 13,
					title: '其他'
				}],
				detail: {}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
		}),
		onLoad(options) {
			let {
				agent = 0
			} = options
			options.agent = agent * 1
			this.options = options
			this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getCoachInfo', 'toPlayAudio']),
			...mapMutations(['updateOrderItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				if (!this.configInfo.id) {
					await this.getConfigInfo()
				}
				let {
					id,
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				let data = await this.$api[methodKey].abnOrderInfo({
					id
				})
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.detail = data.info
			},
			initRefresh() {
				this.initIndex(true)
			}
		},
		filters: {
			handleTitle(val, list) {
				let arr = list.filter(item => {
					return item.id === val
				})
				return arr && arr.length > 0 ? arr[0].title : ''
			}
		}
	}
</script>


<style lang="scss">
	.text {
		color: #777;
		width: 195rpx;
	}

	.agreen-btn {
		padding: 4rpx 14rpx;
		border-radius: 8rpx;
		border: 1rpx solid #fff;
		transform: rotateZ(360deg);
	}
</style>