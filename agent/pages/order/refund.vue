<template>
	<view class="user-order-refund" v-if="isLoad">

		<block v-for="(item, index) in refundForm.order" :key="index">
			<view class="fill-base pd-lg mt-md ml-md mr-md radius-16" v-if="item.order_goods.length > 0 && index == 0">
				<view class="f-title c-title text-bold pb-lg">首单项目</view>
				<block v-for="(aitem,aindex) in item.order_goods" :key="index">
					<view class="item-child flex-warp"
						:class="[{'mt-lg':aindex!=0},{'pb-lg b-1px-b':aitem.is_check && aindex != item.order_goods.length-1}]">
						<view @tap="handleCheckOrderItem(1,index, aindex)" class="flex-y-center" style="height:147rpx">
							<i class="iconfont mr-md"
								:class="[{'icon-xuanze':!aitem.is_check},{'icon-xuanze-fill':aitem.is_check}]"
								:style="{color:aitem.is_check ? primaryColor : '#CACACA'}"></i>
						</view>
						<view class="flex-1">
							<view @tap="handleCheckOrderItem(1,index, aindex)" class="flex-warp">
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
											:style="{color:item.pay_type==2?primaryColor: [3,4,5].includes(item.pay_type)?subColor: item.pay_type == 6 ? '#11C95E' : '#333'}">
											{{ statusType[item.pay_type] }}
										</view>
									</view>
									<view class="f-caption c-caption mt-sm" style="height:30rpx">
										<block v-if="aitem.material_price * 1 > 0">物料费：¥{{aitem.material_price}}</block>
									</view>
									<view class="flex-between mt-md">
										<view class="f-desc c-warning text-bold">¥{{aitem.true_price}} </view>
										<view class="f-desc" style="color:#4D4D4D">x{{aitem.can_refund_num}}</view>
									</view>

								</view>
							</view>
							<view class="mt-sm" v-if="aitem.is_check">
								<view class="flex-between f-paragraph mt-md" v-if="aitem.true_price * 1 > 0">
									<view class="c-paragraph">项目金额</view>
									<view class="flex-y-center c-title">
										<input @input="checkInput($event,index,aindex,'refund_price')"
											@blur="handleCheckOrderItem(0,index, aindex)"
											v-model="refundForm.order[index].order_goods[aindex].refund_price"
											type="number" class="text-right" placeholder="请输入物料费" />
										<view class="ml-sm">元</view>
									</view>
								</view>
								<view class="flex-between f-paragraph mt-md" v-if="aitem.material_price * 1 > 0">
									<view class="c-paragraph">物料费</view>
									<view class="flex-y-center c-title">
										<input @input="checkInput($event,index,aindex,'refund_material_price')"
											@blur="handleCheckOrderItem(0,index, aindex)"
											v-model="refundForm.order[index].order_goods[aindex].refund_material_price"
											type="number" class="text-right" placeholder="请输入物料费" />
										<view class="ml-sm">元</view>
									</view>
								</view>
								<view class="flex-between f-paragraph mt-md">
									<view class="c-paragraph">退款数量</view>
									<view class="flex-warp">
										<button @tap.stop="changeNum(index,aindex,-1)" class="reduce"
											:style="{borderColor:primaryColor,color:primaryColor}"><i
												class="iconfont icon-jian-bold"></i></button>
										<button class="addreduce clear-btn">{{aitem.refund_num}}</button>
										<button @tap.stop="changeNum(index,aindex,1)" class="add"
											:style="{background:primaryColor,borderColor:primaryColor}"><i
												class="iconfont icon-jia-bold"></i></button>
									</view>
								</view>
								<view class="flex-between f-paragraph mt-md">
									<view class="c-paragraph">累计退款金额</view>
									<view class="c-title text-bold">¥{{aitem.total_refund_price}}</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view class="flex-between f-paragraph pt-lg mt-lg b-1px-t">
					<view class="c-paragraph">服务时间</view>
					<view class="c-title">{{item.time_text}}</view>
				</view>
			</view>
		</block>


		<view class="fill-base pd-lg mt-md ml-md mr-md radius-16" v-if="refundForm.order.length > 1">
			<block v-for="(item, index) in refundForm.order" :key="index">
				<block v-if="item.order_goods.length > 0 && index != 0">
					<view class="f-title c-title text-bold" v-if="index==1">加钟项目</view>
					<block v-for="(aitem,aindex) in item.order_goods" :key="index">
						<view class="item-child flex-warp mt-lg"
							:class="[{'pb-lg b-1px-b':aitem.is_check && aindex!=item.order_goods.length-1}]">
							<view @tap="handleCheckOrderItem(1, index, aindex)" class="flex-y-center"
								style="height:147rpx">
								<i class="iconfont mr-md"
									:class="[{'icon-xuanze':!aitem.is_check},{'icon-xuanze-fill':aitem.is_check}]"
									:style="{color:aitem.is_check ? primaryColor : '#CACACA'}"></i>
							</view>
							<view class="flex-1">
								<view @tap="handleCheckOrderItem(1, index, aindex)" class="flex-warp">
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
											<view class="f-title c-title text-bold max-300 ellipsis">
												{{aitem.goods_name}}
											</view>
											<view class="f-desc"
												:style="{color:item.pay_type==2?primaryColor: [3,4,5].includes(item.pay_type)?subColor: item.pay_type == 6 ? '#11C95E' : '#333'}">
												{{ statusType[item.pay_type] }}
											</view>
										</view>
										<view class="f-caption c-caption mt-sm" style="height:30rpx">
											<block v-if="aitem.material_price * 1 > 0">物料费：¥{{aitem.material_price}}
											</block>
										</view>
										<view class="flex-between mt-md">
											<view class="f-desc c-warning text-bold">¥{{aitem.true_price}} </view>
											<view class="f-desc" style="color:#4D4D4D">x{{aitem.can_refund_num}}</view>
										</view>

									</view>
								</view>
								<view class="mt-sm" v-if="aitem.is_check">
									<view class="flex-between f-paragraph mt-md" v-if="aitem.true_price * 1 > 0">
										<view class="c-paragraph">项目金额</view>
										<view class="flex-y-center c-title">
											<input @input="checkInput($event,index,aindex,'refund_price')"
												@blur="handleCheckOrderItem(0,index, aindex)"
												v-model="refundForm.order[index].order_goods[aindex].refund_price"
												type="number" class="text-right" placeholder="请输入物料费" />
											<view class="ml-sm">元</view>
										</view>
									</view>
									<view class="flex-between f-paragraph mt-md" v-if="aitem.material_price * 1 > 0">
										<view class="c-paragraph">物料费</view>
										<view class="flex-y-center c-title">
											<input @input="checkInput($event,index,aindex,'refund_material_price')"
												@blur="handleCheckOrderItem(0,index, aindex)"
												v-model="refundForm.order[index].order_goods[aindex].refund_material_price"
												type="number" class="text-right" placeholder="请输入物料费" />
											<view class="ml-sm">元</view>
										</view>
									</view>
									<view class="flex-between f-paragraph mt-md">
										<view class="c-paragraph">退款数量</view>
										<view class="flex-warp">
											<button @tap.stop="changeNum(index,aindex,-1)" class="reduce"
												:style="{borderColor:primaryColor,color:primaryColor}"><i
													class="iconfont icon-jian-bold"></i></button>
											<button class="addreduce clear-btn">{{aitem.refund_num}}</button>
											<button @tap.stop="changeNum(index,aindex,1)" class="add"
												:style="{background:primaryColor,borderColor:primaryColor}"><i
													class="iconfont icon-jia-bold"></i></button>
										</view>
									</view>
									<view class="flex-between f-paragraph mt-md">
										<view class="c-paragraph">累计退款金额</view>
										<view class="c-title text-bold">¥{{aitem.total_refund_price}}</view>
									</view>
								</view>
							</view>
						</view>
					</block>
					<view class="flex-between f-paragraph pt-lg mt-lg b-1px-t">
						<view class="c-paragraph">服务时间</view>
						<view class="c-title">{{item.time_text}}</view>
					</view>
				</block>
			</block>
		</view>

		<view class="fill-base pd-lg mt-md ml-md mr-md radius-16">
			<view class="flex-between f-paragraph mb-md" v-if="refundForm.car_price*1>0">
				<view class="c-paragraph">车费</view>
				<view class="flex-y-center c-title" v-if="refundForm.can_refund_num === refundForm.all_refund_num">
					<input @input="checkInput($event,-1,-1,'refund_car_price')" @blur="handleCheckOrderItem(3)"
						v-model="refundForm.refund_car_price" type="number" class="text-right" placeholder="请输入车费" />
					<view class="ml-sm">元</view>
				</view>
				<view class="c-title" v-else>¥{{refundForm.refund_car_price}}</view>
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
				<view>
					<view @tap="handleCheckOrderItem(2)" class="flex-y-center" v-if="refundForm.can_refund_num > 0">
						<i class="iconfont mr-md"
							:class="[{'icon-xuanze':!refundForm.is_check},{'icon-xuanze-fill':refundForm.is_check}]"
							:style="{color:refundForm.is_check ? primaryColor : '#CACACA'}"></i>全选
					</view>
				</view>
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
					3: '待服务',
					4: this.$t('action.attendantName') + '出发',
					5: this.$t('action.attendantName') + '到达',
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
				agent = 0
			} = options
			options.agent = agent * 1
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
				try {

					let data = await this.$api[methodKey].canRefundOrderInfo({
						order_id: id
					})
					data.is_check = false
					data.refund_car_price = data.car_price
					data.total_refund_price = 0
					data.all_refund_num = 0
					let rnum = 0
					data.order.map(aitem => {
						aitem.order_goods.map(bitem => {
							let {
								residue_material_price: rmprice,
								residue_service_price: rtprice,
								can_refund_num: num,
								true_price: tprice,
								material_price: mprice
							} = bitem
							rnum += num
							bitem.is_check = false
							bitem.true_single_price = tprice
							bitem.true_single_material_price = mprice

							tprice = (rtprice / num).toFixed(2)
							mprice = (rmprice / num).toFixed(2)
							bitem.true_price = tprice
							bitem.material_price = mprice
							bitem.refund_price = tprice
							bitem.refund_material_price = mprice

							let trprice = (tprice * num + mprice * num).toFixed(2) * 1
							let ttrprice = (rtprice * 1 + rmprice * 1).toFixed(2) * 1
							bitem.total_refund_price = trprice > ttrprice ? ttrprice : trprice
							bitem.true_total_refund_price = ttrprice
							bitem.refund_num = num
						})
						aitem.time_text = this.$util.formatTime(aitem.start_time * 1000, 'YY-M-D h:m') +
							' - ' +
							this.$util.formatTime(aitem.end_time * 1000, 'YY-M-D h:m')
					})
					data.can_refund_num = rnum
					if (!rnum) {
						data.total_refund_price = data.car_price
					}
					this.refundForm = data
					this.isLoad = true
				} catch (e) {
					setTimeout(() => {
						this.$util.back()
						this.$util.getPage(-2).initRefresh()
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 2000)
				}
			},
			initRefresh() {
				this.initIndex(true)
			},
			// 加/减数量
			async changeNum(index, aindex, mol) {
				let {
					refund_num,
					can_refund_num
				} = this.refundForm.order[index].order_goods[aindex]
				let num = refund_num + mol
				if (num > can_refund_num || num < 1) {
					this.$util.showToast({
						title: !num ? `数量至少为1` : `数量不可大于${can_refund_num}`
					})
					return
				}
				this.refundForm.order[index].order_goods[aindex].refund_num = num
				this.handleCheckOrderItem(0, index, aindex)
			},
			checkInput(e, index, aindex, key) {
				let val = this.$util.formatMoney(e.detail.value)
				this.$nextTick(() => {
					if (index == -1) {
						this.refundForm[key] = val
					} else {
						this.refundForm.order[index].order_goods[aindex][key] = val
					}
				})
			},
			//type：1单选，2全选，3车费
			handleCheckOrderItem(type = 0, index = 0, aindex = 0) {
				let {
					is_check: all,
					car_price,
					refund_car_price: cprice,
					can_refund_num: cnum
				} = this.refundForm

				if (type == 1) {
					let {
						is_check
					} = this.refundForm.order[index].order_goods[aindex]
					this.refundForm.order[index].order_goods[aindex].is_check = !is_check
				}

				if (type == 2) {
					this.refundForm.order.map(item => {
						item.order_goods.map(aitem => {
							aitem.is_check = !all
						})
					})
				}
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
						residue_service_price: service,
						residue_material_price: material,
						true_single_price: tsprice,
						true_single_material_price: tsmprice,
						can_refund_num: crnum,
						refund_num: num,
						refund_price: rtprice,
						refund_material_price: rmprice,
						true_total_refund_price: ttrprice
					} = this.refundForm.order[index].order_goods[aindex]

					let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
					if (!reg.test(rtprice) || rtprice * 1 == 0) {
						rtprice = service * 1 === 0 ? 0 : 0.01
					}
					if (!reg.test(rmprice)) {
						rmprice = 0
					}

					tsprice = crnum === num ? (service * 1 / num).toFixed(2) : tsprice
					tsmprice = crnum === num ? (material * 1 / num).toFixed(2) : tsmprice
					rtprice = rtprice * 1 > tsprice * 1 ? tsprice : rtprice
					rmprice = rmprice * 1 > tsmprice * 1 ? tsmprice : rmprice

					let trprice = (rtprice * num + rmprice * num).toFixed(2)

					this.$nextTick(() => {
						this.refundForm.order[index].order_goods[aindex].true_price = tsprice
						this.refundForm.order[index].order_goods[aindex].refund_price = rtprice
						this.refundForm.order[index].order_goods[aindex].material_price = tsmprice
						this.refundForm.order[index].order_goods[aindex].refund_material_price = rmprice
						this.refundForm.order[index].order_goods[aindex].total_refund_price = trprice * 1 >
							ttrprice ? ttrprice : trprice
					}, 0)
				}
				setTimeout(() => {
					let total = 0
					let anum = 0
					let not = 0
					this.refundForm.order.map(item => {
						item.order_goods.map(aitem => {
							if (aitem.is_check) {
								total += aitem.total_refund_price * 1
								anum += aitem.refund_num
							} else {
								not++
							}
						})
					})
					cprice = cnum === anum ? cprice : 0
					total += cprice * 1
					this.refundForm.total_refund_price = total.toFixed(2)
					this.refundForm.all_refund_num = anum
					this.refundForm.is_check = not === 0
				}, 100)
			},
			/**
			 * @name: 确认退款
			 */
			async toConfirmRefund() {
				let subForm = JSON.parse(JSON.stringify(this.refundForm))
				let {
					can_refund_num: cnum,
					all_refund_num: anum,
					refund_car_price: cprice,
					order: list
				} = subForm
				cprice = cnum === anum ? cprice : 0
				let order = []
				let snum = 0
				let csnum = 0
				let sorder = list.filter(item => {
					return !item.is_add
				})
				if (sorder.length > 0) {
					sorder[0].order_goods.map(item => {
						snum += item.can_refund_num
						if (item.is_check) {
							csnum += item.refund_num
						}
					})
					if (snum === csnum && cnum !== anum) {
						this.$message.error(`请把加钟项目一并退款哦`)
						return
					}
				}
				list.map(item => {
					let arr = item.order_goods.filter(aitem => {
						return aitem.is_check
					})
					if (arr.length > 0) {
						let list = arr.map(bitem => {
							let {
								refund_num: rnum,
								refund_price: rprice,
								refund_material_price: mprice,
								residue_service_price: rsprice,
								residue_material_price: rmprice
							} = bitem
							let trprice = (rprice * rnum).toFixed(2) * 1
							let tmprice = (mprice * rnum).toFixed(2) * 1
							return {
								id: bitem.id,
								num: rnum,
								true_price: trprice > rsprice ? rsprice : trprice,
								material_price: tmprice > rmprice ? rmprice : tmprice
							}
						})
						order.push({
							order_id: item.order_id,
							list,
							car_price: item.is_add ? 0 : cprice
						})
					}
				})
				if (order.length === 0) {
					order.push({
						order_id: list[0].order_id,
						list: [],
						car_price: cprice
					})
				}
				let {
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api[methodKey].applyOrderRefund({
						order
					})
					this.$util.hideAll()
					this.$util.showToast({
						title: `操作成功`
					})
					setTimeout(() => {
						this.$util.back()
						this.$util.getPage(-2).initRefresh()
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 2000)
				} catch (e) {
					this.$util.hideAll()
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

		.item-child.b-1px-b:after {
			left: 58rpx;
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