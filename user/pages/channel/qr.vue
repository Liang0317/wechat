<template>
	<view class="user-channel-qr">
		<view @tap.stop="$util.goUrl({url:`/user/pages/channel/poster?index=${index}`})"
			class="item-child mt-md ml-lg mr-lg pl-md pr-lg fill-base radius-24" v-for="(item,index) in list.data"
			:key="index">
			<view class="flex-warp pt-lg pb-lg b-1px-b">
				<image mode="aspectFill" class="avatar radius-16" :src="item.qr"></image>
				<view class="flex-1 ml-md">
					<view class="flex-between">
						<view class="f-mini-title c-title text-bold">{{item.title}} </view>
						<view>{{item.balance}}%</view>
					</view>
					<view class="flex-between mt-md">
						<view class="f-desc c-caption">编码：{{item.code}}</view>
						<view class="download-btn flex-center f-paragraph c-base radius"
							:style="{background:primaryColor}">下载</view>
					</view>
				</view>
			</view>
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1">
		</abnor>
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
				check_id: 0,
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo,
			haveOperItem: state => state.order.haveOperItem,
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
			...mapMutations(['updateUserItem', 'updateOrderItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif

				await this.getList()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			async getList() {
				let {
					list: oldList,
					param
				} = this
				let newList = await this.$api.channel.channelQrList(param);

				if (this.param.page == 1) {
					let {
						id,
						is_qr = 0,
						balance = 0
					} = this.$util.getPage(-1).detail
					// if (!is_qr) {
					let qr_img = await this.$api.channel.channelQr()
					newList.data.unshift({
						id: 0,
						title: `默认渠道码`,
						code: `${this.$t('action.channelName')}ID ${id}`,
						qr: qr_img,
						qr_img,
						balance
					})
					// }
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
	.user-channel-qr {

		.download-btn {
			width: 140rpx;
			height: 58rpx;
		}
	}
</style>