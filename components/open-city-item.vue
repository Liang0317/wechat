<template>
	<view class="open-city-item" v-if="detail.id">

		<view class="flex-center flex-column mt-lg">
			<image class="no-city-img" src="https://lbqny.migugu.com/admin/anmo/technician/no_city_data.png"></image>
			<view class="f-desc" style="color: #777;">{{`当前城市暂未开放${$t('action.attendantName')}上线~`}}</view>
		</view>

		<view class="city-box ml-lg mr-lg" v-if="city">
			<view class="rel">
				<view class="flex-center">
					<image class="open-city-nav" src="https://lbqny.migugu.com/admin/anmo/technician/open_city_nav.png">
					</image>
				</view>
				<view class="open-title abs">
					<view class="flex-center f-title text-bold">开通您城市的业务</view>
				</view>
			</view>
			<span class="f-paragraph" style="color: #777;">若您希望您所在城市尽快开通, 请为当前城市开通投上您宝贵的一票<span class="ml-sm"
					style="color: #F8958C;">*
					每人仅1次机会</span></span>
			<view class="flex-center flex-column" style="margin-top: 66rpx;">
				<view class="user-num">{{detail.num || 0}}</view>
				<view class="f-desc">已投票人数</view>
				<view class="flex-y-baseline f-paragraph c-title mt-md"><i class="iconfont iconjuli1"></i>{{city}}
				</view>
			</view>
			<view class="flex-center" style="margin-top: 69rpx;">
				<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
					:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toOpenCity" style="width:284rpx">
					<view class="city-btn flex-center f-sm-title c-base">期待开通</view>
				</auth>
				<view @tap.stop="$util.goUrl({url:`/agent/pages/apply`})"
					class="city-btn agent flex-center f-sm-title c-base ml-md" v-if="!detail.is_admin">直接做代理</view>
			</view>
		</view>
		<view class="space-lg"></view>

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
			height: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {
				city: '',
				detail: {}
			}
		},
		mounted() {
			this.initIndex()
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
		}),
		methods: {
			async initIndex() {
				let {
					address
				} = this.location
				var reg = /.+?(省|市|自治区|自治州|县|区)/g;
				var reg1 = /.+?(市|自治区|自治州|县|区)/g;
				let cityArr = Array.from(address.match(reg))
				let arr = ['北京市', '天津市', '上海市', '重庆市', '香港特别行政区', '澳门特别行政区', '台湾省'].includes(cityArr[0]) ? [cityArr[
					0]] : cityArr
				let arr1 = arr.length === 1 ? arr[0] === '台湾省' ? arr : arr[0].match(reg1) : []
				console.log(address, arr, arr1, "==========")
				let text = arr.length > 1 ? arr[1] : arr1 && arr1.length > 0 ? arr[0] : ''
				let city = text.includes('特别行政区') ? text : text.includes('区') ? '' : text
				this.city = city
				let data = await this.$api.technician.expectationCityCheck({
					city
				})
				data.id = 1
				this.detail = data
			},
			async toOpenCity() {
				let {
					city
				} = this
				await this.$api.technician.expectationCity({
					city
				})
				let {
					num
				} = this.detail
				this.detail.num = num + 1
				this.$util.showToast({
					title: `投票成功`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.open-city-item {
		width: 100%;
		height: 100%;
		overflow: auto;

		.no-city-img {
			width: 348rpx;
			height: 234rpx
		}

		.city-box {
			width: 690rpx;
			height: 650rpx;
			padding: 0 48rpx;
			margin-top: 90rpx;
			background: linear-gradient(180deg, #FFF8D7 0%, #FFFFFF 100%);
			box-shadow: 0rpx 20rpx 50rpx 0rpx rgba(211, 218, 213, 0.46);
			border-radius: 32rpx;

			.open-city-nav {
				width: 522rpx;
				height: 110rpx;
			}

			.open-title {
				top: 0;
				width: 100%;
				color: #765518;

				.f-title {
					height: 82rpx;
				}
			}

			.user-num {
				font-size: 70rpx;
				color: #44A860;
				line-height: 76rpx;
			}

			.f-desc {
				color: #44A860;
			}

			.iconjuli1 {
				font-size: 28rpx;
				margin-right: 5rpx;
			}

			.city-btn {
				width: 284rpx;
				height: 100rpx;
				background: #F68510;
				box-shadow: 0rpx 20rpx 50rpx 0rpx rgba(211, 218, 213, 0.46);
				border-radius: 50rpx;
			}

			.city-btn.agent {
				background: #44A860;
				box-shadow: 0rpx 20rpx 50rpx 0rpx rgba(211, 218, 213, 0.46);
			}
		}
	}
</style>