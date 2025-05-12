<template>
	<view class="user-distribution-team">

		<fixed>
			<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
				width="50%" height="100rpx" color="#999999"></tab>
		</fixed>
		
		
		<view class="list-item flex-center fill-base mt-md ml-md mr-md pd-lg radius-16"
			v-for="(item,index) in list.data" :key="index">
			<image mode="aspectFill" class="avatar radius" :src="item.avatarUrl"></image>
			<view class="flex-1 ml-md">
				<block v-if="activeIndex==0">
					<view class="f-title c-black text-bold max-500 ellipsis"> {{item.user_name}} </view>
					<view class="flex-between mt-sm" v-if="configInfo.plugAuth.payreseller">
						<view class="flex-y-center f-desc c-paragraph">
							<view class="item-text">推荐费:</view>
							<view class="c-title">
								¥{{item.cash || 0}}
							</view>
						</view>
						<view class="f-desc c-caption">
							{{item.reseller_level==1?'一级分销':'二级分销'}}
						</view>
					</view>
					<view class="flex-y-center f-desc c-paragraph mt-sm">
						<view class="item-text">加入时间:</view>
						<view class="c-title">
							{{item.sh_time}}
						</view>
					</view>
				</block>
				<view class="f-title c-black text-bold max-500 ellipsis" v-if="activeIndex==1">
					{{item.nickName}}
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
				tabList: [{
					id: 1,
					title: '下级分销',
					methodModel: 'subReseller'
				}, {
					id: 2,
					title: '邀请的用户',
					methodModel: 'myTeam'
				}],
				activeIndex: 0,
				param: {
					page: 1,
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
			handerTabChange(index) {
				this.activeIndex = index
				this.list.data = []
				this.$util.showLoading()
				this.param.page = 1;
				this.getList();
			},
			async getList() {
				let {
					list: oldList,
					param,
					tabList,
					activeIndex
				} = this
				let {
					methodModel,
				} = tabList[activeIndex]
				let newList = await this.$api.mine[methodModel](param)
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
	.user-distribution-team {

		.list-item {
			.avatar {
				width: 124rpx;
				height: 124rpx;
			}

			.item-text {
				width: 128rpx
			}

			.remove-btn {
				width: 146rpx;
				height: 56rpx;
				transform: rotateZ(360deg);
			}
		}
	}
</style>