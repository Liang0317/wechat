<template>
	<view class="order-pages">
		<fixed>
			<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
				width="160rpx" height="100rpx"></tab>
			<view class="b-1px-b"></view>
		</fixed>

		<view @tap.stop="goDetail(index)" class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16"
			v-for="(item,index) in list.data" :key="index">
			<view class="flex-between pb-lg">
				<view class="f-paragraph c-title max-380 ellipsis">订单号：{{item.order_code}}</view>
				<view class="f-caption text-bold"
					:style="{color:item.status==1 || item.status == 4 ?subColor: item.status == 2 ? '#11C95E' : '#333'}">
					{{statusType[item.status]}}
				</view>
			</view>
			<view class="flex-warp mb-lg" v-for="(aitem,aindex) in item.order_goods" :key="aindex">
				<image mode="aspectFill" class="avatar lg radius-16" :src="aitem.goods_cover"></image>
				<view class="flex-1 ml-md">
					<view class="f-mini-title c-title text-bold max-450 ellipsis"> {{aitem.goods_name}} </view>
					<view class="f-caption c-caption mt-md max-450 ellipsis">
						服务{{$t('action.attendantName')}}：{{item.coach_info ? item.coach_info.coach_name : '-'}}</view>
					<view class="flex-between">
						<view class="flex-y-baseline f-caption c-warning">¥<view class="f-title text-bold">
								{{aitem.goods_price}}
							</view>
						</view>
						<view class="c-paragraph">x{{aitem.num}}</view>
					</view>
				</view>
			</view>
			<view class="flex-between pt-lg b-1px-t">
				<view class="flex-y-center f-desc c-title">合计：
					<view class="c-warning text-bold">¥{{item.apply_price}}</view>
				</view>
				<view class="flex-warp">
					<!-- 待退款 -->
					<block v-if="item.status == 1">
						<button @tap.stop="toCancel(index)" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,border:`1rpx solid ${primaryColor}`}">取消退款</button>
					</block>
					<!-- 退款成功 -->
					<view v-if="item.status == 2">退款金额¥{{item.refund_price}}</view>
					<!-- 退款失败 -->
					<block v-if="[3,5].includes(item.status)">
						<button @tap.stop="toTel" class="clear-btn order">联系平台</button>
					</block>
				</view>
			</view>
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		<view class="space-footer"></view>

		<common-popup @confirm="confirmCancel" ref="cancel_item" type="CANCEL_REFUND_ORDER" :info="popupInfo">
		</common-popup>

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
				activeIndex: 0,
				tabList: [{
					title: '全部',
					id: 0
				}, {
					title: '待退款',
					id: 1,
				}, {
					title: '同意退款',
					id: 2
				}, {
					title: '拒绝退款',
					id: 3
				}, {
					title: '退款中',
					id: 4
				}, {
					title: '退款失败',
					id: 5
				}],
				statusType: {
					'-1': '已取消',
					1: '待退款',
					2: '同意退款',
					3: '拒绝退款',
					4: '退款中',
					5: '退款失败'
				},
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				loading: true,
				popupInfo: {},
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
			let {
				tab = 0
			} = options
			this.activeIndex = tab
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
					param,
					tabList,
					activeIndex
				} = this
				param.status = tabList[activeIndex].id
				let newList = await this.$api.order.refundOrderList(param);

				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			handerTabChange(index) {
				this.activeIndex = index;
				this.$util.showLoading()
				this.param.page = 1;
				this.getList()
			},
			// 取消退款
			async toCancel(index) {
				let {
					id,
					order_code,
					order_goods,
				} = this.list.data[index]
				let {
					goods_cover: image,
				} = order_goods[0]
				this.popupInfo = {
					id,
					name: `退款单号：${order_code}`,
					image,
					index,
				}
				this.$refs.cancel_item.open()
			},
			// 确认：取消退款
			async confirmCancel() {
				let {
					id,
					index,
				} = this.popupInfo
				await this.$api.order.cancelRefundOrder({
					id
				})
				this.list.data.splice(index, 1)
				this.$util.showToast({
					title: `取消成功`
				})
				this.$refs.cancel_item.close()
			},
			// 订单详情
			goDetail(index) {
				let {
					id
				} = this.list.data[index]
				let url = `/user/pages/refund/detail?id=${id}`
				this.$util.goUrl({
					url
				})
			},
			// 平台
			toTel() {
				let {
					mobile: url
				} = this.configInfo
				this.$util.goUrl({
					url,
					openType: `call`
				})
			}
		}
	}
</script>


<style lang="scss">
</style>