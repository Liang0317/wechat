<template>
	<view class="order-pages" v-if="detail.id">

		<view class="item-child pd-lg fill-base f-paragraph c-base" :style="{background:primaryColor}">
			<view class="flex-y-baseline">
				<view class="text-bold">{{statusType[detail.pay_type]}}</view>
				<view @tap.stop="$refs.refuse_item.open()" class="ml-md"
					v-if="(detail.pay_type == -1 || detail.pay_type == 8) && detail.coach_refund_time">
					{{$t('action.attendantName')}}拒单，查看原因
				</view>
			</view>

			<view class="f-caption mt-sm" v-if="detail.pay_type == 1 && detail.end_time > 0">
				<view class="flex-warp">请在<min-countdown :targetTime="over_time_text"
						@callback="countEnd"></min-countdown>内完成支付，逾期未支付将自动取消</view>
			</view>
			<view class="space-lg"></view>
		</view>

		<!-- // pay_type 1待支付，2待服务，3技-师接单，4技-师出发，5技-师到达，6服务中，7已完成 -->
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

		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16"
			v-if="detail.pay_type == 6 && !detail.is_add">
			<view class="flex-y-center">
				服务还有<min-countdown :type="2" color="#F1381F" bgColor="#F1381F"
					:targetTime="detail.start_service_time_unix*1000" @callback="countEnd"></min-countdown>
				<view class="ml-sm">结束</view>
			</view>
		</view>


		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16">
			<view class="pb-lg f-paragraph c-title text-bold">服务内容</view>
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
						<view style="color: #4D4D4D;">x{{aitem.num}}</view>
					</view>
					<!-- <view class="f-caption" style="color: #777;">
						服务{{$t('action.attendantName')}}：{{detail.coach_info ? detail.coach_info.coach_name : '-'}}
					</view> -->
					<view class="flex-warp f-desc" style="margin:16rpx 0 20rpx 0">
						<view class="flex-1" style="color: #777">服务时长：{{aitem.time_long}}分钟</view>
						<view class="c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
					</view>
					<view class="f-paragraph c-warning text-bold">¥{{aitem.price}} </view>
				</view>
			</view>
		</view>

		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16"
			v-if="detail.add_order_id && detail.add_order_id.length > 0">
			<view class="pb-lg f-paragraph c-title text-bold">加钟项目</view>
			<block v-for="(item,index) in detail.add_order_id" :key="index">
				<view class="flex-y-center pb-lg f-desc" :class="[{'mt-lg pt-lg b-1px-t':index!==0}]"
					style="color: #555;">
					<view>订单编号：</view>
					<view class="flex-between flex-1 ">
						<view class="max-350 ellipsis">{{item.order_code}}</view>
						<view class="copy-btn flex-center radius-5 f-icontext" @tap.stop="toCopy(item.order_code)"
							:style="{borderColor:primaryColor ,color:primaryColor}">复制</view>
					</view>
				</view>
				<view @tap.stop="$util.goUrl({url:`/user/pages/order/detail?id=${item.id}`})" class="flex-warp"
					:class="[{'mb-lg':aindex != item.order_goods.length -1}]" v-for="(aitem,aindex) in item.order_goods"
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
							<view style="color: #4D4D4D;">x{{aitem.num}}</view>
						</view>
						<view class="flex-warp f-desc" style="margin:16rpx 0 20rpx 0">
							<view class="flex-1" style="color: #777">服务时长：{{aitem.time_long}}分钟</view>
							<view class="c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
						</view>
						<view class="f-paragraph c-warning text-bold">¥{{aitem.price}} </view>
					</view>
				</view>
				<view class="flex-between pt-lg">
					<view :style="{color: item.pay_type < 3 ? '#F99346' : item.pay_type < 7 ? primaryColor: '#999'}">
						{{statusType[item.pay_type]}}
					</view>
					<view>
						<button @tap.stop="goDetail('refund',item.id)" class="clear-btn order"
							v-if="item.can_refund > 0">申请退款</button>
						<button
							@tap.stop="$util.goUrl({url:`/user/pages/bell/list?id=${item.id}&coach_id=${item.coach_id}`})"
							class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}"
							v-if="item.pay_type==6">升级项目</button>
						<button @tap.stop="goDetail('detail', item.id)" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">查看详情</button>
					</view>
				</view>
			</block>
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
							class="copy-btn span radius-5 f-icontext ml-sm"
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


		<view class="mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16">
			<view class="flex-between">
				<view>下单人</view>
				<view class="c-title">{{detail.address_info.user_name}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>联系方式</view>
				<view class="c-title">{{detail.address_info.mobile}}</view>
			</view>
			<view class="mt-md" v-if="!detail.store_id">
				<view>服务地址</view>
				<view class="c-title mt-sm">{{`${detail.address_info.address}${detail.address_info.address_info}`}}
				</view>
			</view>
			<view class="mt-md" v-if="detail.text">
				<view>订单备注</view>
				<view class="c-title mt-sm">
					<text decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
				</view>
			</view>
		</view>

		<view class="mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16">
			<view class="flex-center">
				<image mode="aspectFill" class="avatar sm radius"
					:src="detail.coach_info ? detail.coach_info.work_img : `https://lbqny.migugu.com/admin/farm/default-user.png`">
				</image>
				<view class="flex-1 ml-lg" :class="[{'flex-between':configInfo.order_contact_coach}]">
					<view class="c-title text-bold max-350 ellipsis">
						{{detail.coach_info ? detail.coach_info.coach_name : '-'}}
					</view>
					<button @tap.stop="toTel" class="clear-btn order"
						:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}"
						v-if="configInfo.order_contact_coach">联系TA</button>
				</view>
			</view>
			<view class="flex-between mt-md">
				<view>下单时间</view>
				<view class="c-title">{{detail.create_time}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>服务时间</view>
				<view class="c-title">{{detail.start_time}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>服务时长</view>
				<view class="c-title">{{detail.time_long}}分钟</view>
			</view>
			<block v-if="!detail.is_add && !detail.store_id">
				<view class="flex-between mt-md">
					<view>车费详情</view>
					<view class="flex-y-center c-title">{{carType[detail.car_type]}}
						<view class="ml-md" v-if="detail.car_type == 1">全程{{detail.distance}}</view>
					</view>
				</view>
				<view class="flex-between mt-md" v-if="detail.car_type == 1">
					<view>出行费用</view>
					<view class="c-warning flex-warp">
						<view class="mr-md" v-if="detail.free_fare">¥0</view>
						<view :class="[{'c-caption text-delete':detail.free_fare}]">¥{{detail.car_price}}</view>
					</view>
				</view>
			</block>
			<view class="flex-between mt-md">
				<view>项目服务费用</view>
				<view class="c-warning">¥{{detail.init_service_price}}</view>
			</view>
			<view class="flex-between mt-md" v-if="detail.add_order_id && detail.add_order_id.length > 0">
				<view>加钟合计费用</view>
				<view class="c-warning">¥{{detail.total_add_price}}</view>
			</view>
			<view class="flex-between mt-md" v-if="detail.discount*1 > 0">
				<view>卡券优惠</view>
				<view class="c-warning">-¥{{detail.discount}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>支付方式</view>
				<view class="flex-y-baseline c-title">{{payType[detail.pay_model]}}</view>
			</view>
			<view class="flex-between mt-md pt-md b-1px-t">
				<view></view>
				<view class="flex-y-baseline c-title">总计：<view class="c-warning text-bold">¥{{detail.total_price}}
					</view>
				</view>
			</view>
		</view>

		<view class="mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16">
			<view class=" flex-y-center pb-lg flex-warp">
				<view class="flex-between c-title">订单编号：</view>
				<view class="flex-between flex-1 ">
					<view class="c-title max-350 ellipsis">{{detail.order_code}}</view>
					<view class="copy-btn flex-center radius-5 f-icontext" @tap.stop="toCopy(detail.order_code)"
						:style="{borderColor:primaryColor ,color:primaryColor}">复制</view>
				</view>
			</view>
			<timeline :list="lineList" :info="detail" :type="1"></timeline>
		</view>

		<view class="space-max-footer"></view>
		<view class="footer-info fix fill-base" v-if="detail.pay_type != -1">
			<view class="flex-between pd-lg">
				<view></view>
				<view class="flex-center f-desc c-title">
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="contact" class="clear-btn item-btn flex-center f-desc"
						style="border-radius: 100rpx;" v-if="configInfo.im_type == 2">联系客服</button>
					<button @tap.stop="toContact" class="clear-btn item-btn flex-center f-desc"
						style="border-radius: 100rpx;" v-else>联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<button @tap.stop="toContact" class="clear-btn item-btn flex-center f-desc"
						style="border-radius: 100rpx;">联系客服</button>
					<!-- #endif -->
					<!-- 待支付 -->
					<block v-if="detail.pay_type == 1">
						<view @tap.stop="toChangeItem('cancel_item')" class="item-btn flex-center ml-md radius">取消订单
						</view>
						<view @tap.stop="toPay" class="item-btn flex-center ml-md c-base radius"
							:style="{background:primaryColor}">
							去支付
						</view>
					</block>
					<!-- 待服务 -->
					<view @tap.stop="goDetail('refund')" class="item-btn flex-center ml-md radius"
						v-if="detail.can_refund*1>0">
						申请退款</view>
					<!-- 服务中 -->
					<view
						@tap.stop="$util.goUrl({url:`/user/pages/bell/list?id=${detail.id}&coach_id=${detail.coach_id}`})"
						class="item-btn flex-center ml-md c-base radius" :style="{background:primaryColor}"
						v-if="detail.pay_type == 6 && (detail.is_add || (!detail.is_add && detail.can_add_order))">
						{{detail.is_add?'升级项目':'升级/加钟'}}
					</view>
					<view @tap.stop="toChangeItem('end_item')" class="item-btn flex-center ml-md c-base radius"
						:style="{background:primaryColor}" v-if="detail.pay_type == 6">
						完成服务
					</view>
				</view>
			</view>
			<view class="space-safe"></view>
		</view>

		<common-popup @confirm="confirmOperItem" ref="cancel_item" type="CANCEL_ORDER" :info="popupInfo"></common-popup>
		<common-popup @confirm="confirmOperItem" ref="end_item" type="END_ORDER" :info="popupInfo"></common-popup>

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

		<uni-popup ref="show_phone_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">拨打电话</view>
				<view class="space-lg"></view>
				<view @tap.stop="toCallPhone(configInfo.mobile)" class="flex-between mt-md f-mini-title c-caption"
					style="width: 100%;">
					<view class="flex-y-center">推荐1：<view class="c-title">{{configInfo.mobile}}
						</view>
					</view>
					<view :style="{color:primaryColor}">拨打</view>
				</view>
				<view @tap.stop="toCallPhone(detail.admin_phone)" class="flex-between mt-md f-mini-title c-caption"
					style="width: 100%;">
					<view class="flex-y-center">推荐2：<view class="c-title">
							{{detail.admin_phone}}
						</view>
					</view>
					<view :style="{color:primaryColor}">拨打</view>
				</view>
			</view>
			<view class="flex-center mt-lg"><i @tap.stop="$refs.show_phone_item.close()"
					class="iconfont icon-close c-base" style="font-size: 60rpx;"></i>
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
				statusPayType: [1],
				// statusPayType: [-1, 1, 7],
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
				popupInfo: {},
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			wecom_staff: state => state.user.wecom_staff,
			over_time_text() {
				return new Date().getTime() + this.detail.over_time * 1000
			}
		}),
		onLoad(options) {
			this.options = options
			this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getWecomStaff']),
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
				if (!refresh) {
					await Promise.all([this.getConfigInfo(), this.getWecomStaff()])
				}
				let {
					id
				} = this.options
				let data = await this.$api.order.orderInfo({
					id
				})
				data.is_balance = data.balance * 1 > 0 ? 1 : 0
				let {
					pay_type,
					total_time_long: time_long,
					receiving_time = '',
					start_service_time = '',
					is_add = 0,
					store_id = 0,
					add_flow_path = 1
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
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
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
			// 取消订单/完成服务
			async toChangeItem(refs_key) {
				if (this.lockTap) return
				let {
					order_code,
					order_goods,
					pay_type
				} = this.detail
				let {
					goods_cover: image,
				} = order_goods[0]
				this.popupInfo = {
					name: `系统单号：${order_code}`,
					image,
					refs_key
				}
				this.$refs[refs_key].open()
			},
			// 确认：取消订单/完成服务
			async confirmOperItem() {
				let {
					id,
				} = this.detail
				let {
					refs_key
				} = this.popupInfo
				let methodArr = {
					'cancel_item': ['cancelOrder', '取消成功'],
					'end_item': ['endOrder', '完成成功']
				}
				let methodModel = methodArr[refs_key][0]
				let title = methodArr[refs_key][1]
				if (this.lockTap) return
				this.lockTap = true
				try {
					this.$refs[refs_key].close()
					await this.$api.order[methodModel]({
						id
					})
					this.$util.showToast({
						title
					})
					setTimeout(() => {
						this.initRefresh()
						this.$util.back()
						this.lockTap = false
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.initRefresh()
						this.$util.back()
						this.lockTap = false
					}, 2000)
				}
			},
			// 去支付
			async toPay(index) {
				if (this.lockTap) return;
				this.lockTap = true;
				this.$util.showLoading()
				let {
					id,
					pay_model
				} = this.detail

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
								page_url: `/user/pages/order/detail?id=${id}`
							})
							this.updateOrderItem({
								key: 'alipayOrderParams',
								val: pay_list
							})
							this.$util.goUrl({
								url: '/user/pages/alipay-result'
							})
							this.lockTap = false;
							setTimeout(() => {
								this.initRefresh()
								this.$util.back()
							}, 3000)
							return
						}
						// #endif

						try {
							await this.$util.pay(pay_list)
							this.$util.showToast({
								title: `支付成功`
							})
							this.initRefresh()
							this.lockTap = false;
							this.$util.back()
						} catch (e) {
							this.$util.showToast({
								title: `支付失败`
							})
							this.lockTap = false;
							return;
						}
					}
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			// 订单详情/申请退款/去评价/签字确认
			goDetail(page, id = 0) {
				if (!id) {
					id = this.options.id
				}
				let url = `/user/pages/order/${page}?id=${id}`
				this.$util.goUrl({
					url
				})
			},
			// 再来一单
			async toAgain() {
				let {
					id: order_id,
					coach_id
				} = this.detail

				await this.$api.order.onceMoreOrder({
					order_id
				})
				this.$util.goUrl({
					url: `/user/pages/order?id=${coach_id}`
				})
			},
			// 联系技-师
			async toTel() {
				let {
					id: order_id,
					pay_type
				} = this.detail
				if ([2, 3, 4, 5, 6].includes(pay_type)) {
					let url = await this.$api.order.getVirtualPhone({
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
						title: `${msg}不能联系${this.$t('action.attendantName')}哦`
					})
				}
			},
			toContact() {
				let {
					hide_admin_mobile,
					mobile,
					im_type,
					wecom_appid
				} = this.configInfo
				let {
					wecom_staff
				} = this
				let {
					admin_phone
				} = this.detail

				if (!hide_admin_mobile && admin_phone && im_type != 3) {
					this.$refs.show_phone_item.open()
					return
				}

				if (im_type == 3) {
					// #ifdef H5
					window.location.href = wecom_staff
					// #endif
					// #ifndef H5 
					// #ifdef MP-WEIXIN 
					try {
						wx.openCustomerServiceChat({
							extInfo: {
								url: wecom_staff
							},
							corpId: wecom_appid,
							fail(res) {
								uni.showToast({
									title: res.errorMsg,
									icon: 'none'
								})
							}
						})
					} catch (e) {
						this.$util.showToast({
							title: `请更新微信版本`
						})
					}
					// #endif
					// #ifdef APP-PLUS
					let wechat = null
					plus.share.getServices(res => {
						console.log(res, "==============res")
						wechat = res.find(i => i.id === 'weixin')
						if (wechat) {
							wechat.openCustomerServiceChat({
								corpid: wecom_appid,
								url: wecom_staff
							}, err => {
								uni.showToast({
									title: err.errorMsg
								})
							})
						} else {
							uni.showToast({
								title: '当前环境不支持微信操作',
								icon: 'none'
							})
						}
					}, function() {
						uni.showToast({
							title: '获取服务失败，不支持该操作',
							icon: 'none'
						})
					})
					// #endif
					// #endif
					return
				}

				let url = hide_admin_mobile && admin_phone ? admin_phone : mobile
				this.$util.goUrl({
					url,
					openType: 'call'
				})
			},
			// 拨打联系电话
			toCallPhone(url) {
				this.$refs.show_phone_item.close()
				this.$util.goUrl({
					url,
					openType: 'call'
				})
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
		}
	}
</script>


<style lang="scss">
	.order-pages {
		.call-btn {
			width: 128rpx;
			height: 49rpx;
			border-radius: 8rpx
		}
	}
</style>