<template>
	<view class="user-coachbroker-team">
		<fixed>
			<view class="fill-base pd-lg">
				<search @input="toSearch" @confirm="toSearch" type="input" :keyword="param.coach_name" height="70rpx"
					:padding="0" :radius="30" backgroundColor="#F4F4F4"
					:placeholder="'搜索'+$t('action.attendantName')+'姓名'">
				</search>
			</view>
		</fixed>
		<view class="list-item flex-center fill-base mt-md ml-md mr-md pd-lg radius-16"
			v-for="(item,index) in list.data" :key="index">
			<image mode="aspectFill" class="avatar radius" :src="item.work_img"></image>
			<view class="flex-1 ml-md">
				<view class="flex-between">
					<view class="f-title c-black text-bold max-300 ellipsis">
						{{item.coach_name}}
					</view>
					<view class="f-desc max-200 ellipsis" style="color: #777;">
						{{item.city}}
					</view>
				</view>
				<view class="flex-y-center f-desc c-caption" style="margin: 2rpx 0;">
					<view class="item-text">所属代理商：</view>
					<view class="c-title max-350 ellipsis">
						{{item.admin_name || '-'}}
					</view>
				</view>
				<view class="flex-y-center f-desc c-caption">
					<view class="item-text">入驻时间：</view>
					<view class="c-title">{{item.sh_time}}</view>
				</view>
			</view>
		</view>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<view class="space-footer"></view>
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
				param: {
					page: 1,
					coach_name: ''
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
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
		onReachBottom() {
			if (this.list.current_page >= this.list.last_page || this.loading) return;
			this.param.page = this.param.page + 1;
			this.loading = true;
			this.getList();
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
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				await this.getList()
			},
			initRefresh() {
				this.param.page = 1;
				this.initIndex(true)
			},
			toSearch(val) {
				this.param.page = 1
				this.param.coach_name = val
				this.getList()
			},
			async getList() {
				let {
					list: oldList,
					param,
				} = this
				let newList = await this.$api.coachbroker.brokerCoachList(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			}
		}
	}
</script>


<style lang="scss">
	.user-coachbroker-team {

		.list-item {
			.avatar {
				width: 124rpx;
				height: 124rpx;
			}

			.item-text {
				width: 156rpx;
			}

			.text {
				color: #4D4D4D;
				margin-top: 6rpx;
			}

			.remove-btn {
				width: 146rpx;
				height: 56rpx;
				transform: rotateZ(360deg);
			}
		}
	}
</style>