<template>
	<view>
		<view class="pd-lg">
			<view class="flex-between pb-lg b-1px-b">
				<view class="flex-y-center">
					<i class="iconfont iconanmo3" :style="{color:primaryColor}"></i>
					<view class="f-mini-title c-title ml-sm">为谁拉{{$t('action.attendantName')}}</view>
				</view>
				<view @tap.stop="$util.goUrl({url:`/user/pages/coachbroker/agent`})" class="flex-y-center">
					<view class="f-mini-title max-300"
						:class="[{'c-title text-bold':check_admin.id},{'c-caption':!check_admin.id}]">
						{{check_admin.id ? check_admin.agent_name : '选择代理商'}}
					</view>
					<i class="iconfont icon-right ml-sm"></i>
				</view>
			</view>
			<view class="flex-y-center pt-lg pb-lg">
				<i class="iconfont iconjingjirenshuoming" :style="{color:primaryColor}"></i>
				<view class="f-mini-title c-title text-bold ml-sm">{{$t('action.attendantName')}}经纪人说明</view>
			</view>
			<view class="f-paragraph" style="color:#4A4A4A">
				{{$t('action.attendantName')}}经纪人申请和审核由平台处理，经纪人邀请{{$t('action.attendantName')}}不限制地区，经纪人邀请{{$t('action.attendantName')}}时，可以选择为某个代理商邀请{{$t('action.attendantName')}}，邀请成功之后，该{{$t('action.attendantName')}}产生了订单，经纪人可获得分佣，分佣由代理商提成部分扣除，例如后台设置经纪人获得5%分佣，某A{{$t('action.attendantName')}}成单后，应该由A{{$t('action.attendantName')}}以及A{{$t('action.attendantName')}}绑定的上级代理商/平台承担分销费用，则该经纪人可获得佣金=订单实际金额*5%
			</view>
		</view>

		<view class="space-footer"></view>
		<fix-bottom-button @cancel="toConfirm(1)" @confirm="toConfirm"
			:text="[{text:'为平台邀请',type:'cancel'},{text:'为代理商邀请',type:'confirm'}]" bgColor="#fff">
		</fix-bottom-button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				isLoad: false,
				check_admin: {
					id: 0
				}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad() {
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			this.initIndex()
		},
		methods: {
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
			},
			toConfirm(type = 0) {
				let {
					id = 0,
				} = this.check_admin
				if (type == 0 && !id) {
					this.$util.showToast({
						title: `请选择代理商`
					})
					return
				}
				this.$util.getPage(-1).check_admin = type == 1 ? {
					id: 0,
					agent_name: '平台'
				} : this.check_admin
				this.$util.back()
				this.$util.goUrl({
					url: 1,
					openType: `navigateBack`
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.icon-right {
		color: #5A677E;
		font-size: 22rpx;
	}
</style>