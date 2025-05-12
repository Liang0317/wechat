<template>
	<view class="order-pages" v-if="isLoad">
		<fixed>
			<view class="fill-base pt-lg pl-md pr-md pb-md">
				<search @input="toSearch" type="input" :padding="0" :radius="30" height="70rpx"
					placeholder="请输入系统订单号查询">
				</search>
			</view>
			<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
				height="100rpx" v-if="options.tab != 8"></tab>
			<view class="b-1px-b"></view>
		</fixed>

		<view @tap.stop="goDetail(index)" class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16 rel"
			v-for="(item,index) in list.data" :key="index">
			<view v-if="item.is_add">
				<view class="bell-tag flex-center f-icontext c-base abs" :style="{background:primaryColor}">加钟服务
				</view>
				<view class="space-md"></view>
			</view>
			<view class="flex-between pb-lg b-1px-b">
				<view class="f-paragraph c-title max-450 ellipsis">订单号：{{item.order_code}}</view>
				<view class="f-caption text-bold"
					:style="{color:item.pay_type==2?primaryColor: [3,4,5].includes(item.pay_type)?subColor: item.pay_type == 6 ? '#11C95E' : '#333'}">
					{{statusType[item.pay_type]}}
				</view>
			</view>
			<view class="flex-center mb-lg" :class="[{'mt-lg':aindex==0}]" v-for="(aitem,aindex) in item.order_goods"
				:key="aindex">
				<!-- #ifdef H5 -->
				<view class="avatar lg radius-16">
					<view class="h5-image avatar lg radius-16"
						:style="{ backgroundImage : `url('${aitem.goods_cover}')`}">
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<image mode="aspectFill" class="avatar lg radius-16" :src="aitem.goods_cover"></image>
				<!-- #endif -->

				<view class="flex-1 ml-md">
					<view class="flex-between">
						<view class="f-mini-title c-title text-bold max-380 ellipsis">
							{{aitem.goods_name}}
						</view>
						<view class="c-paragraph">x{{aitem.num}}</view>
					</view>
					<view class="flex-between mt-md">
						<view class="f-caption c-caption ellipsis"
							:class="[{'max-300':aitem.refund_num>0},{'max-450':aitem.refund_num==0}]">
							服务{{$t('action.attendantName')}}：{{item.coach_info?item.coach_info.coach_name:'-'}}</view>
						<view class="f-caption c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
					</view>
					<view class="f-caption c-caption" style="margin-top: 5rpx;">服务时间：{{item.start_time}}</view>
				</view>
			</view>
			<view class="flex-between pt-lg b-1px-t">
				<view class="flex-y-center f-desc c-title">总计：
					<view class="f-paragraph text-bold">¥{{item.pay_price}}</view>
				</view>
				<view class="flex-warp">
					<!-- // pay_type 2待接单，3接单，4出发，5到达，6服务中，7已完成 -->
					<block
						v-if="([2, 3, 4, 5, 6, 8].includes(item.pay_type) && !item.is_add)|| ((([2, 3, 6].includes(item.pay_type) && item.add_flow_path === 1) || (item.pay_type==2&&item.add_flow_path==2)) && item.is_add)">
						<button
							@tap.stop="$util.goUrl({url:`/agent/pages/order/change?id=${item.id}&agent=${options.agent}`})"
							class="clear-btn order" style="margin-left: 0;" v-if="!item.is_add">转单</button>
						<button @tap.stop="toConfirm(index)" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">{{ $t( `action.${ technicianStatusOperType[ (item.pay_type === 3 && ( item.store_id || item.is_add)) ? 5 : item.pay_type == 8 ? -1 : item.pay_type ] }` ) }}</button>
					</block>
				</view>
			</view>
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		<view class="space-footer"></view>

		<uni-popup ref="change_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">温馨提示</view>
				<view class="desc">
					你确认要操作{{$t(`action.${technicianStatusOperType[popupInfo.text_type]}`)}}吗?
				</view>
				<view class="f-caption c-warning" v-if="popupInfo.type == -1">退款金额：¥{{popupInfo.can_refund_price}}
				</view>
				<view class="button">
					<view @tap.stop="$refs.change_item.close()" class="item-child">取消</view>
					<view @tap.stop="confirmChangeOrder" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">确定</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				options: {},
				activeIndex: 0,
				tabList: [],
				tabOrderList: [{
					title: '全部',
					id: 0
				}, {
					title: '已取消',
					id: -1,
				}, {
					title: '待接单',
					id: 2,
					number: 0
				}, {
					title: '已接单',
					id: 3,
					number: 0
				}, {
					title: '已出发',
					id: 4,
					number: 0
				}, {
					title: '已到达',
					id: 5,
					number: 0
				}, {
					title: '服务中',
					id: 6,
					number: 0
				}, {
					title: '已完成',
					id: 7,
					number: 0
				}],
				tabBellList: [{
					title: '全部',
					id: 0
				}, {
					title: '已取消',
					id: -1,
				}, {
					title: '待接单',
					id: 2,
					number: 0
				}, {
					title: '已接单',
					id: 3,
					number: 0
				}, {
					title: '服务中',
					id: 6,
					number: 0
				}, {
					title: '已完成',
					id: 7,
					number: 0
				}],
				statusType: {
					'-1': '已取消',
					1: '待支付',
					2: '待接单',
					3: '已接单',
					4: '已出发',
					5: '已到达',
					6: '服务中',
					7: '已完成',
					8: '待转单'
				},
				technicianStatusOperType: {
					'-1': 'agreeRefund',
					2: 'orderTaking',
					3: 'setOut',
					4: 'arrive',
					5: 'startService',
					6: 'serviceCompletion',
					8: 'transferOrder'
				},
				param: {
					page: 1,
					pay_type: 0,
					order_code: ''
				},
				list: {
					data: []
				},
				loading: true,
				index: -1,
				lockTap: false,
				popupInfo: {
					title: '',
					index: '',
					type: '',
					param: {},
					imgs: [],
					location: {
						lat: 0,
						lng: 0,
						address: ''
					}
				},
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad(options) {
			let {
				agent = 0,
					bell = 0,
					tab = 0,
			} = options
			options.agent = agent * 1
			options.bell = bell * 1
			this.options = options
			uni.setNavigationBarTitle({
				title: tab == 8 ? '拒单管理' : bell == 1 ? '加钟管理' : '订单管理'
			})
			this.tabList = tab == 8 ? [] : bell == 1 ? this.tabBellList : this.tabOrderList
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
			...mapActions(['getConfigInfo']),
			...mapMutations(['updateTechnicianItem']),
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
				await this.getList()
				this.isLoad = true
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			toSearch(val) {
				this.param.page = 1
				this.param.order_code = val
				this.getList()
			},
			async getList(flag = false) {
				let {
					list: oldList,
					param,
					tabList,
					activeIndex,
				} = this
				let {
					tab = 0,
						bell = 0,
						agent = 0
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				param.pay_type = tab == 8 ? 8 : tabList[activeIndex].id
				if (tab != 8) {
					param.is_add = bell
				}
				let newList = await this.$api[methodKey].orderList(param)

				if (!flag) {
					if (this.param.page == 1) {
						this.list = newList
					} else {
						newList.data = oldList.data.concat(newList.data)
						this.list = newList
					}
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
			// type: -1拒绝接单，3确定接单，4已出发，5已到达，6开始服务，7已完成
			async toConfirm(index) {
				if (this.lockTap) return
				let {
					id: order_id,
					pay_type,
					can_refund_price,
					is_add = 0,
					store_id = 0,
					add_flow_path = 1,
				} = this.list.data[index]
				let type = (is_add && pay_type == 2 && add_flow_path == 2) || (pay_type === 3 && (is_add ||
						store_id)) ?
					5 : pay_type == 8 ? -1 : pay_type
				this.popupInfo = {
					index,
					order_id,
					type,
					text_type: is_add && pay_type == 2 ? 2 : type,
					can_refund_price
				}
				this.$refs.change_item.open()
			},
			// pay_type 2待接单，3接单，4出发，5到达，6服务中，7已完成  
			async confirmChangeOrder() {
				let param = this.$util.deepCopy(this.popupInfo)
				let {
					index,
					type,
					text_type
				} = param
				param.type = type == -1 ? type : type + 1
				let {
					is_add,
				} = this.list.data[index]
				let text = ``
				let len = 0
				if (param.type == 7 && !is_add) {
					let {
						agent
					} = this.options
					let methodKey = agent ? 'agent' : 'admin'
					let {
						pay_type,
						add_service = []
					} = await this.$api[methodKey].orderInfo({
						id: param.order_id
					})
					len = add_service.length
					if (add_service && add_service.length > 0) {
						add_service.map(item => {
							text += `【${item}】`
						})
					}
				}
				if (text && text.length > 0) {
					let [res_del, {
						confirm
					}] = await uni.showModal({
						content: `该订单还有${text}${len}项加钟服务，完成主订单会将加钟订单一并结束，确认是否结束？`,
						confirmText: `确认`
					})
					if (!confirm) {
						this.$refs.change_item.close()
						return
					}
				}
				delete param.index
				delete param.can_refund_price
				delete param.text_type
				let {
					activeIndex,
					technicianStatusOperType
				} = this
				let msg = text_type == -1 ? '退款成功' : `操作成功`
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				let {
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				try {
					this.$refs.change_item.close()
					await this.$api[methodKey].adminUpdateOrder(param)
					this.$util.showToast({
						title: msg
					})
					if (activeIndex == 0) {
						this.list.data[index].pay_type = param.type
					} else {
						this.list.data.splice(index, 1)
					}
					this.$util.hideAll()
					this.updateTechnicianItem({
						key: 'haveOperItem',
						val: true
					})
					if (activeIndex) {
						await this.getList(true)
					}
					setTimeout(() => {
						this.lockTap = false
					}, 500)
				} catch (e) {
					this.updateTechnicianItem({
						key: 'haveOperItem',
						val: true
					})
					setTimeout(() => {
						this.param.page = 1
						this.getList()
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			// 订单详情
			goDetail(index) {
				let {
					id
				} = this.list.data[index]
				let {
					agent
				} = this.options
				let url = `/agent/pages/order/detail?id=${id}&agent=${agent}`
				this.$util.goUrl({
					url
				})
			}
		}
	}
</script>


<style lang="scss">
</style>