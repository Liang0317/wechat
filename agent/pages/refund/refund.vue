<template>
	<view class="user-order-refund" v-if="isLoad">

		<view class="fill-base pd-lg mt-md ml-md mr-md radius-16">
			<block v-for="(aitem,aindex) in refundForm.order_goods" :key="aindex">
				<view class="item-child"
					:class="[{'mt-lg':aindex!=0},{'pb-lg b-1px-b':aindex!=refundForm.order_goods.length-1}]">
					<view @tap="handleCheckOrderItem(1, aindex)" class="flex-warp">
						<!-- #ifdef H5 -->
						<view class="goods-img">
							<view class="h5-image goods-img"
								:style="{ backgroundImage : `url('${aitem.goods_cover}')`}">
							</view>
						</view>
						<!-- #endif -->
						<!-- #ifndef H5 -->
						<image mode="aspectFill" class="goods-img" :src="aitem.goods_cover"></image>
						<!-- #endif -->

						<view class="flex-1 ml-md">
							<view class="flex-between">
								<view class="f-title c-title text-bold max-300 ellipsis">{{aitem.goods_name}}
								</view>
								<view class="f-desc"
									:style="{color:refundForm.pay_type==2?primaryColor: [3,4,5].includes(refundForm.pay_type)?subColor: refundForm.pay_type == 6 ? '#11C95E' : '#333'}">
									{{ statusType[refundForm.pay_type] }}
								</view>
							</view>
							<view class="f-caption c-caption mt-sm" style="height:30rpx">
								<block v-if="aitem.material_price * 1 > 0">物料费：¥{{aitem.material_price}}</block>
							</view>
							<view class="flex-between mt-md">
								<view class="f-desc c-warning text-bold">¥{{aitem.goods_price}} </view>
								<view class="f-desc" style="color:#4D4D4D">x{{aitem.num}}</view>
							</view>
						</view>
					</view>
					<view class="mt-sm">
						<view class="flex-between f-paragraph mt-md" v-if="aitem.goods_price * 1 > 0">
							<view class="c-paragraph">项目金额</view>
							<view class="flex-y-center c-title">
								<input @input="checkInput($event,aindex,'refund_price')"
									@blur="handleCheckOrderItem(0, aindex)"
									v-model="refundForm.order_goods[aindex].refund_price" type="number"
									class="text-right" placeholder="请输入物料费" />
								<view class="ml-sm">元</view>
							</view>
						</view>
						<view class="flex-between f-paragraph mt-md" v-if="aitem.material_price * 1 > 0">
							<view class="c-paragraph">物料费</view>
							<view class="flex-y-center c-title">
								<input @input="checkInput($event,aindex,'refund_material_price')"
									@blur="handleCheckOrderItem(0, aindex)"
									v-model="refundForm.order_goods[aindex].refund_material_price" type="number"
									class="text-right" placeholder="请输入物料费" />
								<view class="ml-sm">元</view>
							</view>
						</view>
						<view class="flex-between f-paragraph mt-md">
							<view class="c-paragraph">累计退款金额</view>
							<view class="c-title text-bold">¥{{aitem.total_refund_price}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>


		<view class="fill-base pd-lg mt-md ml-md mr-md radius-16">
			<view class="flex-between f-paragraph mb-md" v-if="refundForm.car_price*1>0">
				<view class="c-paragraph">车费</view>
				<view class="flex-y-center c-title">
					<input @input="checkInput($event,-1,'refund_car_price')" @blur="handleCheckOrderItem(3)"
						v-model="refundForm.refund_car_price" type="number" class="text-right" placeholder="请输入车费" />
					<view class="ml-sm">元</view>
				</view>
			</view>
			<view class="flex-between f-paragraph mb-md" v-if="refundForm.discount*1>0">
				<view class="c-paragraph">卡券抵扣</view>
				<view class="c-title">¥{{ refundForm.discount }}</view>
			</view>
			<view class="flex-between f-paragraph">
				<view class="c-paragraph">总计</view>
				<view class="c-warning text-bold">¥{{refundForm.total_refund_price}}</view>
			</view>
		</view>

		<view class="space-max-footer"></view>

		<view class="refund-bottom-info fill-base fix pl-lg pr-lg">
			<view class="flex-between">
				<view></view>
				<view class="flex-center">
					<button @tap.stop="$util.goUrl({url:1,openType:`navigateBack`})" class="clear-btn order">取消</button>
					<button @tap.stop="toConfirmRefund" class="clear-btn order"
						:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">确认</button>
				</view>
			</view>
			<view class="space-safe"></view>
		</view>
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
				refundForm: {},
				lockTap: false,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo
		}),
		onLoad(options) {
			let {
				agent = 0,
					detail = 0
			} = options
			options.agent = agent * 1
			options.detail = detail * 1
			this.options = options
			this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getCoachInfo']),
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
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				let {
					id,
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				let item = await this.$api[methodKey].refundOrderInfo({
					id
				})
				let data = this.$util.pick(item, ['id', 'car_price', 'material_price', 'order_goods', 'pay_type'])
				data.refund_car_price = data.car_price
				let total = 0
				data.order_goods.map(aitem => {
					let {
						num,
						goods_price: price,
						material_price: mprice
					} = aitem
					aitem.refund_price = price
					aitem.refund_material_price = mprice
					aitem.total_refund_price = (price * num + mprice * num).toFixed(2)
					total += aitem.total_refund_price * 1
				})
				data.total_refund_price = total + data.car_price * 1
				this.refundForm = data
				this.isLoad = true
			},
			initRefresh() {
				this.initIndex(true)
			},
			checkInput(e, index, key) {
				let val = this.$util.formatMoney(e.detail.value)
				this.$nextTick(() => {
					if (index == -1) {
						this.refundForm[key] = val
					} else {
						this.refundForm.order_goods[index][key] = val
					}
				})
			},
			//type：3车费
			handleCheckOrderItem(type = 0, aindex = 0) {
				let {
					is_check: all,
					car_price,
					refund_car_price: cprice,
				} = this.refundForm

				if (type == 3) {
					let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
					if (!reg.test(cprice)) {
						cprice = 0
					}
					if (cprice * 1 > car_price) {
						cprice = car_price
					}
					this.$nextTick(() => {
						this.refundForm.refund_car_price = cprice
					})
				}

				if (type == 0) {
					let {
						num,
						refund_price: rtprice,
						refund_material_price: rmprice,
						goods_price: tprice,
						material_price: mprice,
					} = this.refundForm.order_goods[aindex]
					let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
					if (!reg.test(rtprice) || rtprice * 1 == 0) {
						rtprice = 0.01
					}
					if (rtprice * 1 > tprice) {
						rtprice = tprice
					}
					if (!reg.test(rmprice)) {
						rmprice = 0
					}
					if (rmprice * 1 > mprice) {
						rmprice = mprice
					}
					let trprice = (rtprice * num + rmprice * num).toFixed(2)
					this.$nextTick(() => {
						this.refundForm.order_goods[aindex].refund_price = rtprice
						this.refundForm.order_goods[aindex].refund_material_price = rmprice
						this.refundForm.order_goods[aindex].total_refund_price = trprice
					})
				}
				setTimeout(() => {
					let total = 0
					this.refundForm.order_goods.map(item => {
						total += item.total_refund_price * 1
					})
					total += cprice * 1
					this.refundForm.total_refund_price = total.toFixed(2)
				}, 100)
			},
			/**
			 * @name: 确认退款
			 */
			async toConfirmRefund() {
				let subForm = JSON.parse(JSON.stringify(this.refundForm))
				let {
					id: oid,
					refund_car_price: cprice,
					total_refund_price: trprice,
					order_goods: list
				} = subForm
				let param = {
					order_id: oid,
					car_price: cprice,
					price: trprice,
					list: [],
					text: ''
				}
				list.map(item => {
					let {
						id,
						refund_price: rprice,
						refund_material_price: mprice
					} = item
					param.list.push({
						id,
						goods_price: rprice,
						material_price: mprice
					})
				})
				let {
					agent,
					detail
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				if (this.lockTap) return
				this.lockTap = true
				try {
					await this.$api[methodKey].passRefundV2(param)
					this.$util.showToast({
						title: `操作成功`
					})
					setTimeout(() => {
						this.$util.back()
						this.updateTechnicianItem({
							key: 'haveOperItem',
							val: true
						})
						if (detail) {
							this.$util.getPage(-2).initRefresh()
						}
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 1000)
				} catch (e) {
					this.lockTap = false
				}
			},
		}
	}
</script>


<style lang="scss">
	.user-order-refund {


		.item-child {

			.icon-xuanze,
			.icon-xuanze-fill {
				font-size: 38rpx;
			}

			.goods-img {
				width: 147rpx;
				height: 147rpx;
				border-radius: 26rpx;
			}

			.goods-num {
				width: 200rpx;
			}


			.textarea-info {
				background: #F7F7F7;

				.input-textarea {
					width: 570rpx;
					height: 300rpx;
				}
			}


		}

		.refund-bottom-info {
			bottom: 0;

			.iconfont {
				font-size: 38rpx;
			}


			.flex-between {
				height: 122rpx;

				.order {
					width: 189rpx;
					height: 76rpx;
					color: #333;
					font-size: 30rpx;
					border-radius: 50rpx;
					border: 1rpx solid #C7C7C7;
				}
			}

		}
	}
</style>