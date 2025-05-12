<template>
	<view class="user-salesman-channel" v-if="isLoad">
		<view class="list-item fill-base mt-md ml-md mr-md pd-lg radius-16" v-for="(item,index) in list.data"
			:key="index">
			<view class="flex-warp pb-lg b-1px-b">
				<image class="cover radius"
					:src="item.avatarUrl||`https://lbqny.migugu.com/admin/farm/default-user.png`"></image>
				<view class="flex-1" style="margin-left: 24rpx;">
					<view class="f-mini-title c-title text-bold ellipsis" style="max-width: 490rpx">{{item.user_name}}
					</view>
					<view class="flex-between mt-sm">
						<view class="f-desc c-paragraph">累计项目金额</view>
						<view class="f-title c-warning text-bold">¥{{item.order_price}}</view>
					</view>
					<view class="flex-between mt-sm">
						<view class="f-desc c-paragraph">累计物料费</view>
						<view class="f-title c-title text-bold">¥{{item.material_price}}</view>
					</view>
				</view>
			</view>
			<view class="flex-between pt-lg">
				<view class="f-desc c-paragraph">
					<view class="flex-y-center">累计佣金：<view class="f-caption c-title text-bold">¥{{item.salesman_cash}}
						</view>
					</view>
					<view class="flex-y-center mt-sm">佣金比例：<view class="f-caption c-title text-bold">{{item.balance}}%
						</view>
					</view>
				</view>
				<view class="flex-warp f-caption">
					<view @tap.stop="toChangeItem(index,'unfriend_item')" class="flex-center flex-column"
						style="color:#FF361B">
						<i class="iconfont iconjiechuguanxi1"></i>
						解除关系
					</view>
					<view @tap.stop="toChangeItem(index,'balance_item')" class="flex-center flex-column"
						style="margin-left: 50rpx;" v-if="list.salesman_channel_fx_type==2">
						<i class="iconfont iconbianji1"></i>
						编辑
					</view>
				</view>
			</view>
		</view>


		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1">
		</abnor>

		<view class="space-footer"></view>
		<common-popup @confirm="confirmChangeItem" ref="unfriend_item" type="UNFRIEND_CHANNEL" :info="popupInfo">
		</common-popup>

		<uni-popup ref="balance_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">设置提成比例</view>
				<view class="space-md"></view>
				<view class="flex-warp mt-md c-title" style="width: 100%;">
					{{popupInfo.name}}
				</view>
				<input v-model="balance" maxlength="3" type="number"
					class="item-input f-mini-title mt-lg pl-lg pr-lg c-title" placeholder="请输入提成比例" />
				<view class="button">
					<view @tap.stop="$refs.balance_item.close()" class="item-child">取消</view>
					<view @tap.stop="confirmChangeItem" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">确定</view>
				</view>
			</view>
		</uni-popup>

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
				options: {},
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false,
				popupInfo: {},
				balance: '',
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
			uni.setNavigationBarTitle({
				title: '我的' + this.$t('action.channelName')
			})
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
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				await this.getList()
				this.isLoad = true
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
				let newList = await this.$api.salesman.salesmanChannelCash(param);

				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			toChangeItem(index, refs_key) {
				let {
					id,
					user_name,
					avatarUrl,
					balance
				} = this.list.data[index]
				avatarUrl = avatarUrl || `https://lbqny.migugu.com/admin/farm/default-user.png`
				this.balance = balance
				this.popupInfo = {
					id,
					name: `${this.$t('action.channelName')}：${user_name}`,
					image: avatarUrl,
					index,
					refs_key
				}
				this.$refs[refs_key].open()
			},
			// 确认
			async confirmChangeItem() {
				let {
					id,
					index,
					refs_key
				} = this.popupInfo
				let {
					balance
				} = this
				let {
					balance: max = 0
				} = this.$util.getPage(-1).detail
				let reg = /^\+?[0-9]*$/
				if (refs_key == 'balance_item' && (balance == '' || !reg.test(balance * 1) || (balance * 1 > max *
					1))) {
					this.$util.showToast({
						title: `请输入提成比例，不支持小数，最大不能超过${max}%`
					})
					return
				}
				let methodArr = {
					unfriend_item: ['unfriendChannel', '解除成功', {
						channel_id: id
					}],
					balance_item: ['setSalesmanBalance', '设置成功', {
						channel_id: id,
						balance
					}]
				}
				let methodModel = methodArr[refs_key][0]
				let title = methodArr[refs_key][1]
				let param = methodArr[refs_key][2]
				await this.$api.salesman[methodModel](param)
				this.$util.showToast({
					title
				})
				this.initRefresh()
				this.$refs[refs_key].close()
			}
		}
	}
</script>


<style lang="scss">
	.user-salesman-channel {
		.list-item {
			box-shadow: 0px 2 16px 2px rgba(153, 165, 156, 0.05);

			.cover {
				width: 132rpx;
				height: 132rpx;
			}

			.iconfont {
				font-size: 40rpx;
				margin-bottom: 5rpx;
			}
		}

		.common-popup-content {
			.item-input {
				width: 450rpx;
				height: 78rpx;
				border-radius: 10rpx;
				border: 1rpx solid #eee;
			}
		}
	}
</style>