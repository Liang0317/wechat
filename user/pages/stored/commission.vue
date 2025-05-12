<template>
	<view class="user-salesman-record" v-if="isLoad">

		<fixed v-if="configInfo.plugAuth.payreseller">
			<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
				width="50%" height="100rpx" color="#999999"></tab>
		</fixed>

		<view class="list-item fill-base mt-md ml-md mr-md pd-lg radius-16" v-for="(item,index) in list.data"
			:key="index">
			<block v-if="activeIndex === 0">
				<view class="flex-between f-paragraph">
					<view class="flex-y-center c-paragraph">下单人：<view
							class="f-mini-title c-title text-bold max-400 ellipsis">
							{{item.address_info.user_name}}
						</view>
					</view>
					<view :style="{color:item.pay_type==7?primaryColor:'#FF8F5B'}">
						{{item.pay_type===7?'已入账':'未入账'}}
					</view>
				</view>
				<view @tap.stop="$util.goUrl({url:item.order_code,openType:`copy`})"
					class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">订单号:</view>
					<view class="c-title text-bold">{{item.order_code}}</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">项目付款:</view>
					<view class="c-title text-bold">¥{{item.true_service_price}}</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">物料费:</view>
					<view class="c-title text-bold">¥{{item.material_price}}</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md pb-lg b-1px-b">
					<view class="item-text">下单时间:</view>
					<view class="c-title text-bold">{{item.create_time}}</view>
				</view>

				<view class="pd-lg fill-body mt-md mb-lg f-paragraph c-title radius-16">
					<view :class="[{'mt-lg pt-lg b-1px-t':aindex!=0}]" v-for="(aitem,aindex) in item.order_goods"
						:key="aindex">
						<view class="flex-between">
							<span class="max-500 c-caption">{{aitem.goods_name}}<span
									class="ml-md">x{{aitem.num}}</span></span>
							<view>¥{{aitem.true_price}}</view>
						</view>
						<view class="flex-between mt-sm" v-if="aitem.material_type===1">
							<view class="c-caption">物料费</view>
							<view>¥{{aitem.material_price}} </view>
						</view>
						<view class="flex-between mt-sm">
							<view class="c-caption">返佣比例</view>
							<view :style="{color:subColor}">{{aitem.balance}}% </view>
						</view>
						<view class="flex-between mt-sm">
							<view>应得收益</view>
							<span class="max-470">
								{{`${aitem.cash_text} =`}}
								<span class="f-caption ml-sm" :style="{color:primaryColor}">¥ <span
										class="f-mini-title">{{aitem.cash}}</span>
								</span>
							</span>
						</view>
					</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">预计佣金:</view>
					<view class="flex-y-center c-warning text-bold">
						¥{{item.reseller_cash}}
						<view v-if="item.point_cash*1>0">(手续费¥{{item.point_cash}})</view>
					</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">佣金来源:</view>
					<view class="flex-y-center c-title text-bold">
						<view class="ellipsis" :class="[{'max-280':item.type==14},{'max-380':item.type!=14}]">
							{{item.nickName}}
						</view>
						<view>（{{item.type==14?'下级分销员':'用户'}}）</view>
					</view>
				</view>
			</block>
			<block v-if="activeIndex === 1">
				<view class="flex-y-center c-paragraph">下单人：<view
						class="f-mini-title c-title text-bold max-400 ellipsis">
						{{item.user_name}}
					</view>
				</view>
				<view @tap.stop="$util.goUrl({url:item.order_code,openType:`copy`})"
					class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">订单号:</view>
					<view class="c-title text-bold">{{item.order_code}}</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">门槛费:</view>
					<view class="c-title text-bold">¥{{item.order_price}}</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md pb-lg b-1px-b">
					<view class="item-text">支付时间:</view>
					<view class="c-title text-bold">{{item.create_time}}</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">推荐比例:</view>
					<view class="flex-y-center text-bold" :style="{color:primaryColor}">
						{{item.balance}}%
					</view>
				</view>
				<view class="flex-y-center f-paragraph c-paragraph mt-md">
					<view class="item-text">推荐费:</view>
					<view class="flex-y-center c-warning text-bold">
						¥{{item.cash}}
						<view v-if="item.point_cash*1>0">(手续费¥{{item.point_cash}})</view>
					</view>
				</view>
			</block>
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
				isLoad: false,
				tabList: [{
					id: 1,
					title: '订单收益',
					methodModel: 'resellerCashList'
				}, {
					id: 2,
					title: '推荐费收益',
					methodModel: 'invCashList'
				}],
				activeIndex: 0,
				options: {},
				param: {
					page: 1
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
			configInfo: state => state.config.configInfo,
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
			handerTabChange(index) {
				this.activeIndex = index
				this.list.data = []
				this.$util.showLoading()
				this.param.page = 1;
				this.getList();
			},
			async getList(page) {
				if (page) this.param.page = 1
				let {
					list: oldList,
					param,
					tabList,
					activeIndex
				} = this
				let {
					methodModel
				} = tabList[activeIndex]
				let newList = await this.$api.mine[methodModel](param);
				if (activeIndex == 0) {
					newList.data.map(item => {
						let {
							material_type = 0
						} = item
						item.order_goods.map(aitem => {
							aitem.cash_text = material_type === 0 ?
								`${aitem.true_price}*${aitem.num}*${aitem.balance}%` :
								`(${aitem.true_price}+${aitem.material_price})*${aitem.num}*${aitem.balance}%`
						})
					})
				}
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
	.user-salesman-record {
		.list-item {
			.item-text {
				width: 157rpx
			}

			.c-warning {
				color: #F1381F
			}

			.copy-btn {
				width: 60rpx;
				height: 32rpx;
				border: 1rpx solid #fff;
				transform: rotateZ(360deg);
			}
		}
	}
</style>