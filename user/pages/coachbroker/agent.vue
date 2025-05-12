<template>
	<view>
		<fixed>
			<search @input="toSearch" type="input" :padding="30" :radius="0" placeholder="请输入代理商姓名">
			</search>
		</fixed>
		<view @tap.stop="toChangeItem(index)"
			class="list-item fill-base pt-lg pb-lg pl-md pr-lg flex-center mt-md ml-md mr-md radius-16"
			v-for="(item,index) in list.data" :key="index">
			<i class="iconfont mr-md"
				:class="[{'icon-xuanze':check_admin.id!=item.id},{'icon-radio-fill':check_admin.id==item.id}]"
				:style="{color:check_admin.id==item.id?primaryColor:''}"></i>
			<view class="flex-1 flex-center">
				<image mode="aspectFill" class="avatar radius" :src="item.avatarUrl"></image>
				<view class="flex-1 ml-md">
					<view class="f-title c-title text-bold ellipsis" style="max-width:494rpx">{{item.agent_name}}</view>
					<view class="flex-between mt-sm">
						<view class="city-btn flex-center f-icontext rel" :style="{color:primaryColor}">
							<view class="bg abs" :style="{background:primaryColor}"></view>
							{{cityType[item.city_type]}}代理
						</view>
						<view></view>
					</view>
				</view>
			</view>
		</view>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<view class="space-max-footer"></view>
		<fix-bottom-button @confirm="toConfirm" :text="[{text:'确定',type:'confirm'}]" bgColor="#fff">
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
				loading: true,
				isLoad: false,
				cityType: ['', '城市', '区县', '省'],
				param: {
					page: 1,
					limit: 10,
					status: 0
				},
				list: {
					data: []
				},
				check_admin: {}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad() {
			let {
				check_admin
			} = this.$util.getPage(-1)
			this.check_admin = check_admin
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
				this.getList();
			}, 
			toSearch(val) {
				this.param.page = 1
				this.param.nickName = val
				this.check_admin = {}
				this.getList()
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			async getList() {
				this.$util.showLoading()
				let {
					list: oldList,
					param
				} = this
				let newList = await this.$api.coachbroker.adminList(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.isLoad = true
				this.loading = false
				this.$util.hideAll()
			},
			toChangeItem(index) {
				this.check_admin = this.list.data[index]
			},
			toConfirm() {
				let {
					id = 0,
				} = this.check_admin
				if (!id) {
					this.$util.showToast({
						title: `请选择代理商`
					})
					return
				}
				this.$util.getPage(-1).check_admin = this.check_admin
				this.$util.goUrl({
					url: 1,
					openType: `navigateBack`
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-item {
		.avatar {
			width: 94rpx;
			height: 94rpx;
		}


		.city-btn {
			height: 32rpx;
			padding: 0 6rpx 0 6rpx;

			.bg {
				opacity: 0.1;
				border-radius: 5rpx;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
			}
		}
	}
</style>