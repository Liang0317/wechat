<template>
	<view class="agent-account pd-lg" v-if="isLoad">

		<view class="pt-md pb-md c-title text-bold" style="font-size:34rpx">账号信息</view>

		<view class="flex-warp pb-lg">
			<view class="f-paragraph">账号名称</view>
			<view class="f-desc">{{detail.username}}</view>
		</view>
		<view class="flex-warp pb-lg">
			<view class="f-paragraph">账号密码</view>
			<view class="f-desc">{{detail.passwd_text | handlePassWord}}</view>
		</view>
		<view class="flex-warp pb-lg">
			<view class="f-paragraph">真实姓名</view>
			<view class="f-desc">{{detail.agent_name}}</view>
		</view>
		<view class="flex-warp pt-lg pb-lg b-1px-t">
			<view class="f-paragraph">当前等级</view>
			<view class="f-desc">{{cityType[detail.city_type]}}代理({{detail.city_name}})</view>
		</view>
		<!-- 省/市 查下级；区县查上级 -->
		<view class="flex-warp pb-lg" v-if="detail.city_type != 3">
			<view class="f-paragraph">关联上级代理</view>
			<view class="f-desc">
				{{detail.top_data && detail.top_data.hasOwnProperty('username')?detail.top_data.username:'-'}}
			</view>
		</view>
		<view class="flex-warp pb-lg" v-if="detail.city_type != 2">
			<view class="f-paragraph">关联下级代理</view>
			<view class="f-desc">
				<block v-if="detail.sub_data.length==0">-</block>
				<view class="mb-sm" v-for="(item,index) in detail.sub_data" :key="index">{{item.agent_name}}</view>
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
		data() {
			return {
				isLoad: false,
				detail: {},
				cityType: {
					1: '城市',
					2: '区县',
					3: '省'
				},
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad() {
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
			...mapMutations([]),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				this.$util.showLoading()
				this.detail = await this.$api.agent.adminInfoData()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.isLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			toJump(key, index) {
				let {
					url
				} = this[key][index]
				this.$util.goUrl({
					url
				})
			},
		},
		filters: {
			handlePassWord(val) {
				let len = val.length
				let text = val.substring(0, len > 6 ? 3 : 1) + '***'
				text += val.substring(len == 6 ? len - 2 : len - 3, len)
				return text
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: #fff
	}

	.agent-account {

		.f-paragraph {
			width: 200rpx;
			color: #4A4A4A;
		}

		.f-desc {
			width: 490rpx;
			color: #777777;
		}

	}
</style>