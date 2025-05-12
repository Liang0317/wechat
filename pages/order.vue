<template>
	<view class="order-pages">
		<!-- #ifndef H5 -->
		<uni-nav-bar :fixed="true" :shadow="false" :statusBar="true" :title="navTitle" color="#ffffff"
			:backgroundColor="primaryColor">
		</uni-nav-bar>
		<view :style="{height:`${configInfo.navBarHeight}px`}"></view>
		<fixed :top="configInfo.navBarHeight">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<fixed>
				<!-- #endif -->
				<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
					:width="100/tabList.length + '%'" height="100rpx"></tab>
				<view class="b-1px-b"></view>
			</fixed>

			<view @tap.stop="goDetail(index,'detail')"
				class="item-child mt-md ml-md mr-md pd-lg fill-base radius-16 rel" v-for="(item,index) in list.data"
				:key="index">
				<view v-if="item.is_add">
					<view class="bell-tag flex-center f-icontext c-base abs" :style="{background:primaryColor}">加钟服务
					</view>
					<view class="space-md"></view>
				</view>
				<view class="flex-between pb-lg b-1px-b">
					<view class="f-paragraph c-title max-450 ellipsis" @tap.stop="toCopy(item.order_code)">
						订单号：{{item.order_code}}
					</view>
					<!-- // pay_type 1待支付，2待服务，3技-师接单，4技-师出发，5技-师到达，6服务中，7已完成 -->
					<view class="f-caption text-bold"
						:style="{color:item.pay_type==1?primaryColor: [2,3,4,5,6].includes(item.pay_type)?subColor: item.pay_type == 7 ? '#11C95E' : '#333'}">
						{{statusType[item.pay_type]}}
					</view>
				</view>
				<view class="flex-center mt-lg" v-for="(aitem,aindex) in item.order_goods" :key="aindex">
					<!-- #ifdef H5 -->
					<view class="cover radius-16">
						<view class="h5-image cover radius-16"
							:style="{ backgroundImage : `url('${aitem.goods_cover}')`}">
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" class="cover radius-16" :src="aitem.goods_cover"></image>
					<!-- #endif -->
					<view class="flex-1 ml-md">
						<view class="flex-between">
							<view class="f-mini-title c-title text-bold max-400 ellipsis">
								{{aitem.goods_name}}
							</view>
							<view class="f-desc c-desc">x{{aitem.num}}</view>
						</view>
						<view class="flex-center" :style="{marginTop:aindex==item.order_goods.length-1?'6rpx':'20rpx'}">
							<view class="flex-1 flex-y-center f-caption c-caption">服务{{$t('action.attendantName')}}
								<view class="ml-md max-280 ellipsis">
									{{item.coach_info ? item.coach_info.coach_name : '-'}}
								</view>
							</view>
							<view class="f-caption c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}
							</view>
						</view>
						<view class="flex-y-center f-caption c-caption">预约时间<view class="ml-md">{{item.start_time}}
							</view>
						</view>
						<view class="flex-y-center f-caption c-caption" v-if="aindex==item.order_goods.length-1">总计：
							<view class="flex-y-baseline c-warning text-bold">¥
								<view class="f-title">{{item.pay_price}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-between pt-lg">
					<view></view>
					<view class="flex-warp">
						<!-- 待支付 -->
						<block v-if="item.pay_type == 1">
							<button @tap.stop="toChangeItem(index,'cancel_item')" class="clear-btn order">取消订单</button>
							<button @tap.stop="toPay(index)" class="clear-btn order"
								:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">去支付</button>
						</block>
						<!-- 支付超时 -->
						<block v-if="item.pay_type == -1 || item.pay_type == 7">
							<button @tap.stop="toChangeItem(index,'del_item')" class="clear-btn order">删除</button>
						</block>
						<!-- 待服务 -->
						<button @tap.stop="goDetail(index,'refund')" class="clear-btn order"
							v-if="item.can_refund > 0">申请退款</button>
						<!-- 服务中 -->
						<!-- is_add 加钟订单 -->
						<button
							@tap.stop="$util.goUrl({url:`/user/pages/bell/list?id=${item.id}&coach_id=${item.coach_id}`})"
							class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}"
							v-if="item.pay_type == 6 && (item.is_add || (!item.is_add && item.can_add_order))">{{item.is_add?'升级项目':'升级/加钟'}}</button>
						<button @tap.stop="toChangeItem(index,'end_item')" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}"
							v-if="item.pay_type == 6">完成服务</button>
						<!-- 已完成 -->
						<block v-if="item.coach_id && item.pay_type == 7 && !item.is_add">
							<button @tap.stop="goDetail(index,'evaluate')" class="clear-btn order"
								v-if="!item.is_comment">去评价</button>
							<button @tap.stop="toAgain(index)" class="clear-btn order"
								:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}"
								v-if="item.can_again">再来一单</button>
						</block>
					</view>
				</view>
			</view>

			<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading"
				v-if="loading">
			</load-more>
			<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
			<view class="space-footer"></view>

			<common-popup @confirm="confirmOperItem" ref="cancel_item" type="CANCEL_ORDER" :info="popupInfo">
			</common-popup>
			<common-popup @confirm="confirmOperItem" ref="del_item" type="DELETE_ORDER"
				:info="popupInfo"></common-popup>
			<common-popup @confirm="confirmOperItem" ref="end_item" type="END_ORDER" :info="popupInfo"></common-popup>

			<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
			<tabbar :cur="4"></tabbar>
			<change-user-type></change-user-type>

			<!-- #ifdef MP-WEIXIN -->
			<user-privacy ref="user_privacy" :show="false"></user-privacy>
			<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				options: {},
				navTitle: '',
				statusType: {
					'-1': '已取消',
					1: '待支付',
					2: '待接单',
					3: '待服务',
					4: this.$t('action.attendantName') + '出发',
					5: this.$t('action.attendantName') + '到达',
					6: '服务中',
					7: '已完成',
					8: '待转单'
				},
				loading: true,
				popupInfo: {},
				lockTap: false
			}
		},
		computed: mapState({
			activeIndex: state => state.order.activeIndex,
			tabList: state => state.order.tabList,
			param: state => state.order.param,
			list: state => state.order.list,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		async onLoad(options) {
			let {
				tab = 0
			} = options
			this.updateOrderItem({
				key: 'activeIndex',
				val: tab
			})
			// 支付后需刷新页面
			await this.initIndex()
			let {
				tabBar
			} = this.configInfo
			let ind = tabBar.findIndex(item => {
				return item.id == 4
			})
			let navTitle = ind == -1 ? '订单' : tabBar[ind].name
			this.navTitle = navTitle
			// #ifdef H5
			uni.setNavigationBarTitle({
				title: navTitle
			})
			// #endif
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
			this.loading = true;
			this.getList(this.param.page + 1);
		},
		methods: {
			...mapActions(['getConfigInfo', 'getOrderList']),
			...mapMutations(['updateOrderItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				await this.getList(1)
			},
			async initRefresh() {
				await this.initIndex(true)
				let {
					tabBar
				} = this.configInfo
				let ind = tabBar.findIndex(item => {
					return item.id == 4
				})
				let navTitle = ind == -1 ? '订单' : tabBar[ind].name
				this.navTitle = navTitle
				// #ifdef H5
				uni.setNavigationBarTitle({
					title: navTitle
				})
				// #endif
			},
			async getList(page = 0) {
				if (page) {
					let param = this.$util.deepCopy(this.param)
					param.page = page
					this.updateOrderItem({
						key: 'param',
						val: param
					})
				}
				let {
					list: oldList,
					param,
					tabList,
					activeIndex
				} = this
				param.pay_type = tabList[activeIndex].id
				try {
					await this.getOrderList(param)
					this.loading = false
					this.$util.hideAll()
				} catch (e) {
					this.loading = false
					this.$util.hideAll()
				}
			},
			handerTabChange(index) {
				this.updateOrderItem({
					key: 'activeIndex',
					val: index
				})
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.$util.showLoading()
				this.getList(1)
			},
			// 取消订单/删除订单/完成服务
			async toChangeItem(index, refs_key) {
				if (this.lockTap) return
				let {
					id,
					order_code,
					order_goods,
					pay_type,
				} = this.list.data[index]
				let {
					goods_cover: image,
				} = order_goods[0]
				this.popupInfo = {
					id,
					name: `系统单号：${order_code}`,
					image,
					index,
					refs_key
				}
				this.$refs[refs_key].open()
			},
			// 确认：取消订单/删除订单/完成服务
			async confirmOperItem() {
				let {
					id,
					index,
					refs_key,
				} = this.popupInfo
				let methodArr = {
					'cancel_item': ['cancelOrder', '取消成功', -1],
					'del_item': ['delOrder', '删除成功', -1],
					'end_item': ['endOrder', '完成成功', 7]
				}
				let methodModel = methodArr[refs_key][0]
				let title = methodArr[refs_key][1]
				let pay_type = methodArr[refs_key][2]
				if (this.lockTap) return
				this.lockTap = true
				try {
					this.$refs[refs_key].close()
					await this.$api.order[methodModel]({
						id
					})
					if (this.activeIndex == 0 && refs_key !== 'del_item') {
						this.list.data[index].pay_type = pay_type
					} else {
						this.list.data.splice(index, 1)
					}
					this.$util.showToast({
						title
					})
					setTimeout(() => {
						this.lockTap = false
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.getList(1)
						this.lockTap = false
					}, 2000)
				}
			},
			// 去支付
			async toPay(index) {
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				let {
					id,
					pay_model
				} = this.list.data[index]

				try {
					let {
						pay_list
					} = await this.$api.order.rePayOrder({
						id
					})
					this.$util.hideAll()
					if (pay_list) {
						if (pay_model == 3) {
							pay_list = {
								orderInfo: pay_list,
								provider: 'alipay'
							}
						}

						// #ifdef H5

						if (pay_model == 3) {
							pay_list = Object.assign({}, pay_list, {
								order_id: id,
								page_url: `/pages/order?tab=2`
							})
							this.updateOrderItem({
								key: 'alipayOrderParams',
								val: pay_list
							})
							this.$util.goUrl({
								url: '/user/pages/alipay-result'
							})
							this.lockTap = false
							setTimeout(() => {
								this.initRefresh()
							}, 3000)
							return
						}
						// #endif

						try {
							await this.$util.pay(pay_list)
							this.$util.showToast({
								title: `支付成功`
							})
							if (this.activeIndex == 0) {
								this.list.data[index].pay_type = 2
							} else {
								this.list.data.splice(index, 1)
							}
							this.lockTap = false;
						} catch (e) {
							this.$util.showToast({
								title: `支付失败`
							})
							this.lockTap = false;
							return
						}
					}
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			// 去核销
			async toHx(index) {
				let {
					id,
					qr: image
				} = this.list.data[index]
				this.popupInfo = {
					id,
					image
				}
				this.$refs.hx_item.open()
			},
			// 订单详情/申请退款/去评价
			goDetail(index, page) {
				let {
					id
				} = this.list.data[index]
				let url = `/user/pages/order/${page}?id=${id}`
				this.$util.goUrl({
					url
				})
			},
			// 再来一单
			async toAgain(index) {
				let {
					id: order_id,
					coach_id
				} = this.list.data[index]
				await this.$api.order.onceMoreOrder({
					order_id
				})
				this.$util.goUrl({
					url: `/user/pages/order?id=${coach_id}`
				})
			},
			toCopy(url) {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				this.$util.goUrl({
					url,
					openType: 'copy'
				})
			}
		}
	}
</script>


<style lang="scss">
</style>