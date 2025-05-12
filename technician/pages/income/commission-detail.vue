<template>
	<view class="technician-commission-detail" v-if="detail.id">
		<view class="mt-md pd-lg fill-base">
			<view class="flex-y-center f-mini-title c-title">
				<view class="dot mr-sm radius" :style="{background:primaryColor}"></view>订单号<view class="ml-sm">
					{{detail.order_code}}
				</view>
			</view>
			<view class="f-mini-title c-title text-bold mt-lg">项目明细</view>
			<view class="flex-between f-paragraph" :class="[{'mt-lg':index==0},{'mt-md':index!=0}]"
				v-for="(item,index) in detail.order_goods" :key="index">
				<span class="c-paragraph max-500">{{item.goods_name}}<span class="ml-md">x{{item.num}}</span><span
						class="ml-md c-warning" v-if="item.refund_num*1>0">已退x{{item.refund_num}}</span></span>
				<view class="c-title">¥{{item.true_total_price}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">服务时间</view>
				<view class="c-caption">{{detail.time_text}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">项目总金额</view>
				<view class="c-title">¥{{detail.init_service_price}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">物料费</view>
				<view class="c-title flex-y-center">¥{{detail.material_price}}
					<view class="ml-sm c-caption text-delete"
						v-if="detail.init_material_price*1>detail.material_price*1">
						¥{{detail.init_material_price}}</view>
				</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">卡券优惠</view>
				<view class="c-title">-¥{{detail.discount}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">退款金额</view>
				<view class="c-title">-¥{{detail.refund_price}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg mb-lg">
				<view class="c-paragraph">分成比例</view>
				<view class="c-title">{{detail.coach_balance}}%</view>
			</view>
			<view class="flex-between pt-lg b-1px-t">
				<view @tap.stop="$refs.show_rule_item.open()" class="f-paragraph c-paragraph flex-y-center">应得收益<i
						class="iconfont iconwentifankui3 ml-sm"></i>
				</view>
				<span class="max-500">
					{{`${detail.coach_text} =`}}
					<span class="f-caption ml-sm" :style="{color:primaryColor}">¥<span
							class="f-mini-title">{{detail.coach_cash}}</span>
					</span>
				</span>
			</view>
		</view>

		<view class="mt-md pd-lg fill-base" v-if="detail.add_order && detail.add_order.length > 0">
			<view class="f-mini-title c-title text-bold">加钟明细</view>
			<block v-for="(item,index) in detail.add_order" :key="index">
				<view class="flex-between f-paragraph" :class="[{'mt-lg':aindex==0},{'mt-md':aindex!=0}]"
					v-for="(aitem,aindex) in item.order_goods" :key="aindex">
					<span class="c-paragraph max-500">{{aitem.goods_name}}{{aindex==0?` (第${index*1+1}次加钟)`:''}}<span
							class="ml-md">x{{aitem.num}}</span><span class="ml-md c-warning"
							v-if="aitem.refund_num*1>0">已退x{{aitem.refund_num}}</span></span>
					<view class="c-title">¥{{aitem.price}}</view>
				</view>
				<view class="flex-between f-paragraph mt-lg mb-lg">
					<view class="c-paragraph">项目总金额</view>
					<view class="c-title">¥{{item.init_service_price}}</view>
				</view>
				<view class="flex-between f-paragraph mt-lg mb-lg">
					<view class="c-paragraph">物料费</view>
					<view class="c-title flex-y-center">¥{{item.material_price}}
						<view class="ml-sm c-caption text-delete"
							v-if="item.init_material_price*1>item.material_price*1">
							¥{{item.init_material_price}}</view>
					</view>
				</view>
				<view class="flex-between f-paragraph mt-lg mb-lg">
					<view class="c-paragraph">退款金额</view>
					<view class="c-title">-¥{{item.refund_price}}</view>
				</view>
				<view class="flex-between f-paragraph mt-lg mb-lg">
					<view class="c-paragraph">分成比例</view>
					<view class="c-title">{{item.coach_balance}}%</view>
				</view>
				<view class="flex-between f-paragraph mt-lg mb-lg">
					<view class="c-paragraph">分摊扣费</view>
					<view class="c-title">-¥{{item.total_share_cash}}</view>
				</view>
				<view class="flex-between f-paragraph mt-lg mb-lg">
					<view @tap.stop="$refs.show_add_rule_item.open()" class="f-paragraph c-paragraph flex-y-center">
						应得收益<i class="iconfont iconwentifankui3 ml-sm"></i>
					</view>
					<span class="max-500">
						{{`${item.add_coach_text} =`}}
						<span class="f-caption ml-sm" :style="{color:primaryColor}">¥<span
								class="f-mini-title">{{item.coach_cash}}</span>
						</span>
					</span>
				</view>
			</block>
			<view class="flex-between pt-lg b-1px-t">
				<view class="f-paragraph c-paragraph flex-y-center">加钟收益</view>
				<span class="max-500">
					{{detail.add_order.length>1?`${detail.add_coach_text} =`:``}}
					<span class="f-caption" :class="[{'ml-sm':detail.add_order.length>1}]"
						:style="{color:primaryColor}">¥<span class="f-mini-title">{{detail.add_coach_cash}}</span>
					</span>
				</span>
			</view>
		</view>

		<view class="mt-md pd-lg fill-base">
			<view class="f-mini-title c-title text-bold">扣费明细</view>
			<view class="flex-between f-paragraph mt-lg"
				v-if="configInfo.plugAuth.coachbroker || detail.partner_share_cash*1>0">
				<view class="c-paragraph">经纪人扣款</view>
				<view class="c-title">-¥{{detail.partner_share_cash}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">渠道扣款</view>
				<view class="c-title">-¥{{detail.channel_share_cash}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">业务扣款</view>
				<view class="c-title">-¥{{detail.salesman_share_cash}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg" v-if="detail.pay_model === 2">
				<view class="c-paragraph">储值扣款</view>
				<view class="c-title">-¥{{detail.coach_balance_cash}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">广告费</view>
				<view class="c-title">-¥{{detail.poster_cash}}</view>
			</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">提现手续费</view>
				<view class="c-title">-¥{{detail.point_cash}}</view>
			</view>
			<view class="flex-between mt-lg pt-lg b-1px-t">
				<view class="f-paragraph c-paragraph">合计扣费</view>
				<view class="flex-y-center f-caption c-warning">¥<view class="f-mini-title">
						{{detail.total_share_cash}}
					</view>
				</view>
			</view>
		</view>


		<view class="mt-md pd-lg fill-base" v-if="!detail.car_admin">
			<view class="f-mini-title c-title text-bold">车费明细</view>
			<view class="flex-between f-paragraph mt-lg">
				<view class="c-paragraph">车费收益</view>
				<view class="c-title text-bold" :style="{color:primaryColor}">¥{{detail.true_car_price}}</view>
			</view>
		</view>

		<view class="space-max-footer"></view>

		<fixed position="bottom">
			<view class="pd-lg fill-base flex-between f-paragraph" style="width:100%">
				<view class="f-mini-title c-title text-bold">实际收益</view>
				<span class="max-500 c-warning">
					{{`${detail.total_order_text} =`}}
					<span class="f-caption text-bold ml-sm">¥<span
							class="f-mini-title">{{detail.total_order_cash}}</span>
					</span>
				</span>
			</view>
			<view class="space-safe fill-base"></view>
		</fixed>


		<uni-popup ref="show_rule_item" type="center" :maskClick="false" :zIndex="999">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">应得收益</view>
				<view class="f-desc c-title mt-lg">
					<block v-if="detail.material_type === 0">
						应得收益 = (项目总金额 + 原物料费 - 实付物料费 - 卡券优惠 - 退款金额) * 分成比例
					</block>
					<block v-else>
						应得收益 = (项目总金额 + 原物料费 - 卡券优惠 - 退款金额) * 分成比例 - 实付物料费
					</block>
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_rule_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="show_add_rule_item" type="center" :maskClick="false" :zIndex="999">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">加钟收益</view>
				<view class="f-desc c-title mt-lg">
					<block v-if="detail.material_type === 0">
						应得收益 = (项目总金额 + 原物料费 - 实付物料费 - 退款金额) * 分成比例 - 分摊扣费
					</block>
					<block v-else>
						应得收益 = (项目总金额 + 原物料费 - 退款金额) * 分成比例 - 实付物料费 - 分摊扣费
					</block>
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_add_rule_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
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
				detail: {}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo
		}),
		async onLoad(options) {
			this.options = options
			await this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo']),
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
				await this.getDetail()
				this.isLoad = true
			},
			initRefresh() {
				this.initIndex(true)
			},
			async getDetail() {
				let {
					id
				} = this.options
				let data = await this.$api.technician.coachCommissionInfo({
					id
				})
				let {
					coach_cash,
					true_car_price,
					total_share_cash,
					init_material_price,
					init_service_price,
					refund_price,
					coach_balance,
					material_price,
					material_type = 0,
					discount,
					car_admin = 0
				} = data
				data.order_goods.map(item => {
					item.true_total_price = item.price * item.num
				})
				data.coach_text = material_type === 0 ?
					`(${init_service_price}+${init_material_price}-${data.material_price}-${discount}-${refund_price})*${coach_balance}%` :
					`(${init_service_price}+${init_material_price}-${discount}-${refund_price})*${coach_balance}%-${data.material_price}`
				let add_coach_cash = 0
				let add_coach_text = ''
				data.add_order.map((item, index) => {
					add_coach_cash += item.coach_cash * 1
					item.add_coach_text = material_type === 0 ?
						`(${item.init_service_price}+${item.init_material_price}-${item.material_price}-${item.refund_price})*${item.coach_balance}%-${item.total_share_cash}` :
						`(${item.init_service_price}+${item.init_material_price}-${item.refund_price})*${item.coach_balance}%-${item.material_price}-${item.total_share_cash}`
					add_coach_text += `${index==0?'':' + '}${item.coach_cash}`
				})

				add_coach_cash = add_coach_cash.toFixed(2)
				data.add_coach_cash = add_coach_cash
				data.add_coach_text = add_coach_text


				data.total_order_text = data.add_order && data.add_order.length > 0 ?
					`${coach_cash} + ${add_coach_cash} - ${total_share_cash} ` :
					`${coach_cash} - ${total_share_cash}  `

				if (!car_admin) {
					data.total_order_text += `+ ${true_car_price}`
				}
				let total_order_cash = coach_cash * 1 + add_coach_cash * 1 + true_car_price * 1 - total_share_cash * 1
				data.total_order_cash = total_order_cash.toFixed(2)
				this.detail = data
			},
		}
	}
</script>


<style lang="scss">
	.technician-commission-detail {
		.dot {
			width: 14rpx;
			height: 14rpx;
		}
	}
</style>