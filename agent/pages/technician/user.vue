<template>
	<view>
		<fixed>
			<search @input="toSearch" type="input" :padding="30" :radius="0" placeholder="请输入用户昵称/手机号查找">
			</search>
		</fixed>
		<view @tap.stop="toChangeItem(index)"
			class="list-item fill-base pt-lg pb-lg pl-md pr-lg flex-center mt-md ml-md mr-md radius-16"
			v-for="(item,index) in list.data" :key="index">
			<i class="iconfont mr-md"
				:class="[{'icon-xuanze':check_user.id!=item.id},{'icon-radio-fill':check_user.id==item.id}]"
				:style="{color:check_user.id==item.id?primaryColor:''}"></i>
			<view class="flex-1 flex-center">
				<image mode="aspectFill" class="avatar radius" :src="item.avatarUrl"></image>
				<view class="flex-1 ml-md">
					<view class="f-paragraph c-title text-bold ellipsis">{{item.nickName}}</view>
					<view class="phone" v-if="item.phone">{{item.phone}}</view>
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
				param: {
					page: 1,
					limit: 10,
					status: 0
				},
				list: {
					data: []
				},
				check_user: {}

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
				user_id,
				nickName
			} = this.$util.getPage(-1).form
			this.check_user = {
				id: user_id,
				nickName
			}
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
				this.check_user = {}
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
				let newList = await this.$api.agent.coachUserList(param)
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
				this.check_user = this.list.data[index]
			},
			toConfirm() {
				let {
					id,
					nickName
				} = this.check_user
				if (!id) {
					this.$util.showToast({
						title: `请选择用户`
					})
					return
				}
				this.$util.getPage(-1).form.user_id = id
				this.$util.getPage(-1).form.nickName = nickName || `用户${id}`
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
			width: 72rpx;
			height: 72rpx;
		}

		.phone {
			font-size: 25rpx;
			color: #ADADAD;
		}
	}
</style>