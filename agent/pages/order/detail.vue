<template>
	<view class="order-pages" v-if="detail.id">
		<view class="item-child pd-lg fill-base f-paragraph c-base" :style="{background:primaryColor}">
			<view class="flex-between">
				<view class="flex-y-baseline">
					<view class="text-bold">{{statusType[detail.pay_type]}}</view>
					<view @tap.stop="$refs.refuse_item.open()" class="ml-md"
						v-if="(detail.pay_type == -1 || detail.pay_type == 8) && detail.coach_refund_time">
						{{$t('action.attendantName')}}拒单，查看原因
					</view>
				</view>
				<view
					@tap.stop="$util.goUrl({url:`/agent/pages/order/abnormal?id=${detail.abn_order_id}&agent=${options.agent}`})"
					class="flex-y-center f-paragraph c-base" v-if="detail.abn_order_id">此单被平台标记为异常
					<view class="view-btn flex-center fill-base f-desc c-warning ml-md">查看</view>
				</view>
			</view>
			<view class="space-lg"></view>
		</view>

		<!-- // pay_type 1待支付，2待服务，3技-师接单，4技-师出发，5技-师到达，6服务中，7已完成，8待评价 -->
		<view
			class="menu-list flex-warp rel ml-lg mr-lg pt-lg pb-lg pl-md pr-md fill-base f-paragraph c-caption radius-16"
			:class="[{'add-bell':detail.is_add || detail.store_id}]">
			<view class="menu-line abs b-1px-b"></view>
			<block v-for="(item,index) in lineList" :key="index">
				<view class="item-child flex-center flex-column f-icontext c-paragraph"
					:style="{color:(detail.pay_type > item.pay_type -1) && detail.pay_type != 8 ?primaryColor:''}"
					v-if="item.icon">
					<view class="item-img fill-base flex-center mb-sm radius"
						:style="{borderColor:(detail.pay_type > item.pay_type -1) && detail.pay_type != 8?primaryColor:''}">
						<i class="iconfont" :class="item.icon"></i>
					</view>
					<view class="ellipsis" style="max-width:100%">{{item.title}}</view>
				</view>
			</block>
		</view>


		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16" v-if="detail.pay_type == 6">
			<view class="flex-y-center">
				服务还有<min-countdown :type="2" color="#ea3626" bgColor="#ea3626"
					:targetTime="detail.start_service_time_unix*1000" @callback="countEnd"></min-countdown>
				<view class="ml-sm">结束</view>
			</view>
		</view>


		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16">
			<view class="flex-between pb-lg">
				<view class="f-paragraph c-title max-380 ellipsis">服务内容</view>
			</view>
			<view class="flex-warp" :class="[{'mb-lg':aindex != detail.order_goods.length -1}]"
				v-for="(aitem,aindex) in detail.order_goods" :key="aindex">
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
					<view class="f-caption mt-sm" style="color:#777" v-if="aitem.init_material_price*1>0">
						物料费：¥{{aitem.init_material_price}}
					</view>
					<view class="flex-between mt-sm">
						<view class="f-caption" style="color:#777">服务时长：{{aitem.time_long}}分钟</view>
						<view class="f-caption c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
					</view>
					<view class="f-paragraph c-warning text-bold mt-sm">¥{{aitem.price}}
					</view>
				</view>
			</view>
		</view>

		<view class="store-info mt-md ml-lg mr-lg pd-lg  fill-base radius-16" v-if="detail.store_id">
			<view class="f-mini-title c-title text-bold pb-md">
				{{detail.store_info.title}}
			</view>
			<view class="flex-between">
				<view class="flex-y-center" style="color: #303030;">
					<i class="iconfont icondizhi1 mr-sm"></i>
					<view class="c-title flex-1 mr-md">
						<span>{{detail.store_info.address || `暂未设置门店地址`}}</span>
						<span @tap.stop="toCopy(detail.store_info.address)"
							class="copy-btn span f-icontext radius-5 ml-sm"
							:style="{color:primaryColor,borderColor:primaryColor}"
							v-if="detail.store_info.address">复制</span>
					</view>
				</view>
				<view class="flex-center">
					<view @tap.stop="$util.goUrl({url:detail.store_info.phone,openType:'call'})"
						class="item-icon rel flex-center radius-16">
						<view class="item-icon radius-16 abs" :style="{background:primaryColor}"></view>
						<i class="iconfont icondadianhua_1" :style="{color:primaryColor}"></i>
					</view>
					<view @tap.stop="toMap('store_info')" class="item-icon rel flex-center radius-16 ml-md"
						v-if="detail.store_info.address">
						<view class="item-icon radius-16 abs" :style="{background:primaryColor}"></view>
						<i class="iconfont icondizhi_1" :style="{color:primaryColor}"></i>
					</view>
				</view>
			</view>
		</view>

		<view class="order-agent-info store-info mt-md ml-lg mr-lg pd-lg fill-base f-paragraph radius-16">
			<view class="flex-center">
				<image mode="aspectFill" class="coach-img radius"
					:src="detail.coach_info ? detail.coach_info.work_img : `https://lbqny.migugu.com/admin/farm/default-user.png`">
				</image>
				<view class="flex-1 ml-lg f-title text-bold"
					:class="[{'flex-between':detail.coach_info&&detail.coach_info.mobile}]" style="max-width: 506rpx;">
					<view class="max-400 ellipsis">{{detail.coach_info ? detail.coach_info.coach_name : '-'}}</view>
					<view @tap.stop="$util.goUrl({url:detail.coach_info.mobile,openType:`call`})"
						class="item-icon rel flex-center radius-16"
						v-if="detail.coach_info && detail.coach_info.mobile">
						<view class="item-icon radius-16 abs" :style="{background:primaryColor}"></view>
						<i class="iconfont icondadianhua_1" :style="{color:primaryColor}"></i>
					</view>
				</view>
			</view>
			<view class="flex-center mt-lg" v-if="detail.admin_name">
				<view class="title">代理商</view>
				<view class="text flex-1 ellipsis">{{detail.admin_name}}</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="title">下单人</view>
				<view class="text flex-1 flex-warp">
					<view class="ellipsis"
						:class="[{'max-400':!detail.pay_order_times},{'max-250':detail.pay_order_times}]">
						{{detail.address_info.user_name}}
					</view>
					<view class="c-warning" v-if="detail.pay_order_times">{{detail.pay_order_times | handlePayOrder}}
					</view>
				</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="title">联系方式</view>
				<view class="text flex-1 flex-between">
					<view>
						<block v-if="!detail.phone_encryption">
							{{detail.address_info.mobile.substring(0,3)}}****{{detail.address_info.mobile.substring(7,11)}}
						</block>
						<block v-else>{{detail.address_info.mobile}}</block>
					</view>
					<view @tap.stop="toTel" class="item-icon rel flex-center radius-16">
						<view class="item-icon radius-16 abs" :style="{background:primaryColor}"></view>
						<i class="iconfont icondadianhua_1" :style="{color:primaryColor}"></i>
					</view>
				</view>
			</view>
			<view class="flex-warp mt-lg" v-if="!detail.store_id">
				<view class="title">服务地址</view>
				<view class="text flex-1 flex-between">
					<view style="max-width: 350rpx;">
						<span>{{`${detail.address_info.address}${detail.address_info.address_info}`}}</span>
						<span @tap="toCopy(`${detail.address_info.address}${detail.address_info.address_info}`)"
							class="copy-btn fill radius-5 f-icontext ml-sm">复制</span>
					</view>
					<view @tap.stop="toMap('address_info')" class="item-icon rel flex-center radius-16">
						<view class="item-icon radius-16 abs" :style="{background:primaryColor}"></view>
						<i class="iconfont icondizhi_1" :style="{color:primaryColor}"></i>
					</view>
				</view>
			</view>
			<view class="mt-lg" v-if="detail.text">
				<view class="title">订单备注</view>
				<view class="text mt-sm">
					<text decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
				</view>
			</view>
			<view class="flex-center mt-lg pt-lg b-1px-t">
				<view class="title">下单时间</view>
				<view class="text flex-1">{{detail.create_time}}</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="title">服务时间</view>
				<view class="text flex-1">{{detail.start_time}}</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="title">服务时长</view>
				<view class="text flex-1">{{detail.time_long}}分钟</view>
			</view>
			<block v-if="!detail.is_add && !detail.store_id">
				<view class="flex-center mt-lg">
					<view class="title">车费详情</view>
					<view class="text flex-1 flex-y-center">{{carType[detail.car_type]}}
						<view class="ml-md" v-if="detail.car_type == 1">全程{{detail.distance}}</view>
					</view>
				</view>
				<view class="flex-center mt-lg" v-if="detail.car_type == 1">
					<view class="title">出行费用</view>
					<view class="text flex-1 flex-warp">
						¥{{detail.car_price}}
						<view class="ml-md c-warning" v-if="detail.free_fare">
							{{detail.free_fare==1?'平台补贴':$t('action.attendantName')+'补贴'}}
						</view>
					</view>
				</view>
			</block>
			<view class="flex-center mt-lg">
				<view class="title">服务项目费用</view>
				<view class="text flex-1">¥{{detail.init_service_price}}</view>
			</view>
			<view class="flex-center mt-md" v-if="detail.init_material_price*1>0">
				<view class="title">物料费</view>
				<view class="text flex-1">¥{{detail.init_material_price}}</view>
			</view>
			<view class="flex-center mt-lg" v-if="detail.discount*1 > 0">
				<view class="title">卡券优惠</view>
				<view class="text c-warning flex-1">-¥{{detail.discount}}</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="title">支付方式</view>
				<view class="text flex-1">{{payType[detail.pay_model]}}</view>
			</view>
			<view class="flex-between mt-lg pt-lg b-1px-t">
				<view class="title"></view>
				<view class="flex-y-baseline f-paragraph c-black text-bold">总计：<view class="c-warning">
						¥{{detail.pay_price}}</view>
				</view>
			</view>
		</view>

		<view class="mt-md ml-lg mr-lg pd-lg fill-base radius-16">
			<view class="flex-y-center pb-lg f-mini-title c-title flex-warp b-1px-b">
				<view class="flex-between text-bold">订单编号：</view>
				<view class="flex-between flex-1 ">
					<view class="text-bold max-350 ellipsis">{{detail.order_code}}</view>
					<view class="copy-btn flex-center radius-5 f-icontext" @tap.stop="toCopy(detail.order_code)"
						:style="{borderColor:primaryColor ,color:primaryColor}">复制</view>
				</view>
			</view>
			<view class="space-lg"></view>
			<timeline :list="lineList" :info="detail"></timeline>
		</view>

		<view class="space-max-footer"></view>
		<view class="footer-info fix fill-base"
			v-if="([2, 3, 4, 5, 6, 8].includes(detail.pay_type) && !detail.is_add) || ((([2, 3, 6].includes(detail.pay_type) && detail.add_flow_path === 1) || (detail.pay_type==2&&detail.add_flow_path==2)) && detail.is_add)">
			<!-- v-if="detail.admin_apply_refund || ([2, 3, 4, 5, 6, 8].includes(detail.pay_type) && !detail.is_add) || ((([2, 3, 6].includes(detail.pay_type) && detail.add_flow_path === 1) || (detail.pay_type==2&&detail.add_flow_path==2)) && detail.is_add)"> -->

			<view class="flex-between pd-lg">
				<view></view>
				<view class="flex-center f-desc c-title">
					<!-- 	<view
						@tap.stop="$util.goUrl({url:`/agent/pages/order/refund?id=${options.id}&agent=${options.agent}`})"
						class="item-btn flex-center ml-md radius" v-if="detail.admin_apply_refund">
						退款
					</view> -->
					<block
						v-if="([2, 3, 4, 5, 6, 8].includes(detail.pay_type) && !detail.is_add) || ((([2, 3, 6].includes(detail.pay_type) && detail.add_flow_path === 1) || (detail.pay_type==2&&detail.add_flow_path==2)) && detail.is_add)">
						<view
							@tap.stop="$util.goUrl({url:`/agent/pages/order/change?id=${options.id}&agent=${options.agent}`})"
							class="item-btn flex-center ml-md radius" v-if="!detail.is_add">
							{{$t('action.transferOrder')}}
						</view>
						<view @tap.stop="toConfirm" class="item-btn flex-center ml-md c-base radius"
							:style="{background:primaryColor}">
							{{$t( `action.${ technicianStatusOperType[ (detail.pay_type === 3 &&(detail.store_id || detail.is_add)) ? 5  : detail.pay_type == 8 ? -1 : detail.pay_type ]}`) }}
						</view>
					</block>
				</view>
			</view>
			<view class="space-safe"></view>
		</view>

		<uni-popup ref="refuse_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">拒单原因</view>
				<scroll-view scroll-y @touchmove.stop.prevent class="refund-text mt-lg">
					<view>
						<text decode="emsp"
							style="word-break:break-all;">{{detail.coach_refund_text || '没有填写原因哦'}}</text>
					</view>
					<view class="mt-md f-caption c-caption">拒单时间：{{detail.coach_refund_time}}</view>
				</scroll-view>
				<view class="button">
					<view @tap.stop="$refs.refuse_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
				</view>
			</view>
		</uni-popup>


		<uni-popup ref="change_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">温馨提示</view>
				<view class="desc">
					你确认要操作{{$t(`action.${technicianStatusOperType[popupInfo.text_type]}`)}}吗?
				</view>
				<view class="f-caption c-warning" v-if="popupInfo.type == -1">
					退款金额：¥{{popupInfo.can_refund_price}}
				</view>
				<view class="button">
					<view @tap.stop="$refs.change_item.close()" class="item-child">取消</view>
					<view @tap.stop="confirmChangeOrder" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">确定</view>
				</view>
			</view>
		</uni-popup>

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
	import timeline from '@/components/timeline.vue'
	export default {
		components: {
			timeline
		},
		data() {
			return {
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
				technicianStatusOperType: {
					'-1': 'agreeRefund',
					2: 'orderTaking',
					3: 'setOut',
					4: 'arrive',
					5: 'startService',
					6: 'serviceCompletion'
				},
				carType: {
					0: '公交/地铁',
					1: '出租车'
				},
				payType: {
					1: '微信支付',
					2: '余额支付',
					3: '支付宝支付'
				},
				lineList: [],
				base_service: [{
					pay_type: 3,
					title: this.$t('action.attendantName') + '接单',
					time: 'receiving_time',
					icon: 'iconjishijiedan'
				}, {
					pay_type: 4,
					title: this.$t('action.attendantName') + '出发',
					time: 'serout_time',
					addr: 'serout_address',
					icon: 'iconjishichufa'
				}, {
					pay_type: 5,
					title: this.$t('action.attendantName') + '到达',
					time: 'arrive_time',
					img: 'arrive_img',
					addr: 'arr_address',
					icon: 'iconjishidaoda'
				}, {
					pay_type: 6,
					title: '开始服务',
					time: 'start_service_time',
					icon: 'iconjishifuwu'
				}, {
					pay_type: 7,
					title: '服务完成',
					time: 'order_end_time',
					img: 'end_img',
					addr: 'end_address',
					icon: 'iconjishiwancheng'
				}, {
					pay_type: 7,
					title: '签字确认',
					time: 'sign_time',
					img: 'sign_img',
					icon: ''
				}],
				base_bell: [{
					pay_type: 3,
					title: this.$t('action.attendantName') + '接单',
					time: 'receiving_time',
					icon: 'iconjishijiedan'
				}, {
					pay_type: 6,
					title: '开始服务',
					time: 'start_service_time',
					icon: 'iconjishifuwu'
				}, {
					pay_type: 7,
					title: '服务完成',
					time: 'order_end_time',
					img: 'end_img',
					addr: 'end_address',
					icon: 'iconjishiwancheng'
				}],
				detail: {
					pay_type: 0
				},
				check_label: [],
				coach_refund_text: '',
				lockTap: false,
				popupInfo: {
					title: '',
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
			haveOperItem: state => state.technician.haveOperItem,
			over_time_text() {
				return new Date().getTime() + this.detail.end_time * 1000
			}
		}),
		onLoad(options) {
			let {
				agent = 0
			} = options
			options.agent = agent * 1
			this.options = options
			this.initIndex()
		},
		onShow() {
			if (!this.haveOperItem) return
			this.$util.back()
			this.updateTechnicianItem({
				key: 'haveOperItem',
				val: false
			})
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
				let {
					id,
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				let data = await this.$api[methodKey].orderInfo({
					id
				})
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				data.is_balance = data.balance * 1 > 0 ? 1 : 0
				let {
					pay_type,
					true_time_long: time_long,
					receiving_time = '',
					start_service_time = '',
					is_add = 0,
					store_id = 0
				} = data
				if (is_add) {
					if (!receiving_time && pay_type > 3) {
						data.receiving_time = start_service_time
					}
					if (!start_service_time && pay_type > 5) {
						data.start_service_time = receiving_time
					}
				}
				if (pay_type == 6) {
					let start_service_time_unix = this.$util.DateToUnix(start_service_time) + time_long * 60
					data.start_service_time_unix = start_service_time_unix
				}
				let lineList = this.$util.deepCopy(is_add || store_id ? this.base_bell : this.base_service)
				let ind = lineList.findIndex(item => {
					return item.title == '签字确认'
				})
				if (store_id && ind == -1) {
					lineList.push({
						pay_type: 7,
						title: '签字确认',
						time: 'sign_time',
						icon: ''
					})
				}
				this.lineList = lineList
				this.detail = data
			},
			initRefresh() {
				this.initIndex(true)
			},
			countEnd() {
				this.$util.log("倒计时完了")
				setTimeout(() => {
					this.initRefresh()
					this.$util.back()
				}, 1000)
			},
			// type: -1拒绝接单，3确定接单，4已出发，5已到达，6开始服务，7已完成
			async toConfirm() {
				if (this.lockTap) return
				let {
					id: order_id,
					pay_type,
					is_add = 0,
					store_id = 0,
					can_refund_price,
					add_flow_path = 1
				} = this.detail
				let type = (is_add && pay_type === 2 && add_flow_path == 2) || (pay_type === 3 && (is_add ||
					store_id)) ? 5 : pay_type == 8 ? -1 : pay_type
				this.popupInfo = {
					order_id,
					type,
					text_type: is_add && pay_type == 2 ? 2 : type,
					can_refund_price
				}
				this.$refs.change_item.open()
			},
			async confirmChangeOrder() {
				let param = this.$util.deepCopy(this.popupInfo)
				let {
					type,
					text_type
				} = param
				param.type = type == -1 ? type : type + 1
				let {
					is_add,
					add_service = []
				} = this.detail
				if (param.type == 7 && !is_add && add_service.length > 0) {
					let text = ``
					add_service.map(item => {
						text += `【${item}】`
					})
					let [res_del, {
						confirm
					}] = await uni.showModal({
						content: `该订单还有${text}${add_service.length}项加钟服务，完成主订单会将加钟订单一并结束，确认是否结束？`,
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
					technicianStatusOperType
				} = this
				// let msg = text_type == -1 ? '退款成功' : this.$t(`action.${technicianStatusOperType[text_type]}`)
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
					this.updateTechnicianItem({
						key: 'haveOperItem',
						val: true
					})
					this.initRefresh()
					this.$util.back()
					setTimeout(() => {
						this.lockTap = false
					}, 1000)
					if (type == -1) {
						setTimeout(() => {
							this.$util.goUrl({
								url: 1,
								openType: 'navigateBack'
							})
						}, 1000)
					}
				} catch (e) {
					this.updateTechnicianItem({
						key: 'haveOperItem',
						val: true
					})
					setTimeout(() => {
						this.initRefresh()
						this.$util.back()
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			// 咨询
			async toTel() {
				let {
					id: order_id,
					pay_type
				} = this.detail
				let {
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				if ([2, 3, 4, 5, 6, 8].includes(pay_type)) {
					let url = await this.$api[methodKey].getVirtualPhone({
						order_id
					})
					if (!url) {
						this.$util.showToast({
							title: `稍后会有电话打入，请注意接听哦`
						})
						return
					}
					this.$util.goUrl({
						url,
						openType: `call`
					})
				} else {
					let msg = pay_type == 7 ? '服务结束' : '服务取消'
					this.$util.showToast({
						title: `${msg}不能联系客户哦`
					})
				}
			},
			// 查看定位
			async toMap(key) {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				let {
					address,
					address_info = '',
					lat,
					lng
				} = this.detail[key]
				await this.$util.checkAuth({
					type: 'userLocation'
				})
				await uni.getLocation({
					type: 'gcj02',
				})
				await uni.openLocation({
					latitude: lat * 1,
					longitude: lng * 1,
					name: address_info ? `${address} ${address_info}` : address,
					scale: 28
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
		},
		filters: {
			handlePayOrder(num) {
				return num === 1 ? '（首次下单）' : `（第${num}次下单）`
			}
		}
	}
</script>


<style lang="scss">
	.view-btn {
		width: 102rpx;
		height: 52rpx;
		border-radius: 8rpx
	}
</style>