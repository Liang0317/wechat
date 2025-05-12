<template>
	<view class="order-pages" v-if="detail.id">

		<view class="item-child  pd-lg fill-base f-paragraph c-base" :style="{background:primaryColor}">
			<view class="flex-between">
				<view class="text-bold">{{statusType[detail.pay_type]}}</view>
				<view @tap.stop="$util.goUrl({url:`/technician/pages/order/abnormal?id=${detail.abn_order_id}`})"
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
					:style="{color:detail.pay_type > item.pay_type -1?primaryColor:''}" v-if="item.icon">
					<view class="item-img fill-base flex-center mb-sm radius"
						:style="{borderColor:detail.pay_type > item.pay_type -1?primaryColor:''}">
						<i class="iconfont" :class="item.icon"></i>
					</view>
					<view class="ellipsis" style="max-width:100%">{{item.title}}</view>
				</view>
			</block>
		</view>

		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16"
			v-if="detail.pay_type == 6 && !detail.is_add && detail.start_service_time_unix">
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
					<view class="flex-warp f-desc"
						:style="{margin:aitem.init_material_price*1>0?'5rpx 0':'16rpx 0 20rpx 0'}">
						<view class="flex-1" style="color: #777">服务时长：{{aitem.time_long}}分钟</view>
						<view class="c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
					</view>
					<view class="f-desc" style="color: #777" v-if="aitem.init_material_price*1>0">
						物料费：¥{{aitem.init_material_price}}
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
				<view @tap.stop="$util.goUrl({url:`/technician/pages/order/detail?id=${item.id}`})" class="flex-warp"
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
						<view class="flex-warp f-desc"
							:style="{margin:aitem.init_material_price*1>0?'5rpx 0':'16rpx 0 20rpx 0'}">
							<view class="flex-1" style="color: #777">服务时长：{{aitem.time_long}}分钟</view>
							<view class="c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
						</view>
						<view class="f-desc" style="color: #777" v-if="aitem.init_material_price*1>0">
							物料费：¥{{aitem.init_material_price}}
						</view>
						<view class="f-paragraph c-warning text-bold">¥{{aitem.price}} </view>
					</view>
				</view>
				<view class="flex-between pt-lg">
					<view :style="{color: item.pay_type < 3 ? '#F99346' : item.pay_type < 7 ? primaryColor: '#999'}">
						{{statusType[item.pay_type]}}
					</view>
					<view>
						<button @tap.stop="toRefuse(item.id)" class="clear-btn order"
							v-if="item.pay_type == 2">拒绝接单</button>
						<button @tap.stop="toChangeAddOrderItem(index)" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">
							<block v-if="detail.add_flow_path === 1">
								{{item.pay_type == 2?'确认接单':item.pay_type == 3? '开始服务': item.pay_type == 6 ? '拍照完成服务' : '查看详情'}}
							</block>
							<block v-else>{{item.pay_type == 2?'确认接单':'查看详情'}}</block>
						</button>
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
							class="copy-btn span f-icontext ml-sm radius-5"
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
				<view class="flex-y-center">
					<view class="c-title ellipsis"
						:class="[{'max-350':!detail.pay_order_times},{'max-150':detail.pay_order_times}]">
						{{detail.address_info.user_name}}
					</view>
					<view class="c-warning" v-if="detail.pay_order_times">{{detail.pay_order_times | handlePayOrder}}
					</view>
					<view @tap.stop="toLabel" :class="[{'ml-sm':!detail.pay_order_times}]" :style="{color:primaryColor}"
						v-if="configInfo.coach_show_lable">查看标签
					</view>
				</view>
			</view>
			<view @tap="toTel" class="flex-between mt-md">
				<view>联系方式</view>
				<view class="flex-y-center" :style="{color:primaryColor}">
					<i class="iconfont iconbodadianhua mr-sm"></i>
					<view>拨打电话</view>
				</view>
			</view>
			<view class="mt-md" v-if="!detail.store_id">
				<view>服务地址</view>
				<view class="flex-center">
					<view class="c-title mt-sm flex-1 mr-md">
						<span>{{`${detail.address_info.address}${detail.address_info.address_info}`}}</span>
						<span @tap="toCopy(`${detail.address_info.address}${detail.address_info.address_info}`)"
							class="copy-btn fill radius-5 f-icontext ml-sm">复制</span>
					</view>
					<view @tap="toMap('address_info')" class="flex-center flex-column f-icontext"
						:style="{color:primaryColor}">
						<i class="iconfont icon-dingwei" style="font-size: 42rpx;"></i>
						<view>立刻导航去</view>
					</view>
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
						¥{{detail.car_price}}
						<view class="ml-md" v-if="detail.free_fare">
							{{detail.free_fare==1?'平台补贴':'自己补贴'}}
						</view>
					</view>
				</view>
			</block>
			<view class="flex-between mt-md">
				<view>服务项目费用</view>
				<view class="c-warning">¥{{detail.init_service_price}}</view>
			</view>
			<view class="flex-between mt-md" v-if="detail.init_material_price*1>0">
				<view>物料费</view>
				<view class="c-warning">¥{{detail.init_material_price}}</view>
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
				<view class="c-title">{{payType[detail.pay_model]}}</view>
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
					<view class="copy-btn flex-center text-center f-icontext radius-5"
						@tap.stop="toCopy(detail.order_code)" :style="{borderColor:primaryColor ,color:primaryColor}">复制
					</view>
				</view>
			</view>
			<timeline :list="lineList" :info="detail"></timeline>
		</view>

		<view class="space-max-footer"></view>
		<view class="footer-info fix fill-base"
			v-if="statusPayType.includes(detail.pay_type) || (detail.pay_type == 7 && !detail.is_add && !detail.label_time)">
			<view class="flex-between pd-lg">
				<view></view>
				<view class="flex-center f-desc c-title">
					<!-- // pay_type 2待接单，5待服务，6服务中，7已完成 -->
					<!-- 待接单 -->
					<block v-if="detail.pay_type == 2">
						<button @tap.stop="toTel" class="clear-btn order">联系客户</button>
						<button @tap.stop="toRefuse(0)" class="clear-btn order">拒绝接单</button>
						<button @tap.stop="toConfirm(detail.is_add && detail.add_flow_path == 2?6:3)"
							class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">确认接单</button>
					</block>
					<!-- 待服务 -->
					<block v-if="[3,4,5].includes(detail.pay_type)">
						<button @tap.stop="toTel" class="clear-btn order">联系客户</button>
						<button @tap.stop="toConfirm(detail.is_add || detail.store_id  ? 6 : detail.pay_type*1+1 )"
							class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}"
							v-if="(detail.is_add && detail.add_flow_path == 1) || !detail.is_add">{{detail.is_add || detail.store_id ? '开始服务' : detail.pay_type == 3 ? '确认出发': detail.pay_type == 4 ?'拍照确认到达' : '开始服务'}}</button>
					</block>
					<!-- 服务中 -->
					<block v-if="detail.pay_type == 6">
						<button @tap.stop="toTel" class="clear-btn order">联系客户</button>
						<button @tap.stop="toConfirm(7)" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}"
							v-if="(detail.is_add && detail.add_flow_path == 1) || !detail.is_add">拍照完成服务</button>
					</block>
					<!-- 已完成 -->
					<block v-if="detail.pay_type == 7">
						<button
							@tap.stop="$util.goUrl({url:`/technician/pages/order/label?id=${detail.id}&uid=${detail.user_id}`})"
							class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">评价客户</button>

					</block>
				</view>
			</view>
			<view class="space-safe"></view>
		</view>


		<uni-popup ref="refuse_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">拒绝接单</view>
				<view class="desc">请确认是否拒接接单</view>
				<textarea v-model="coach_refund_text" class="pd-lg textarea f-desc c-title mt-lg radius-20"
					maxlength="200" placeholder="请输入拒单原因" placeholder-class="f-desc c-caption"></textarea>
				<view class="flex-center mt-md" style="width: 540rpx">
					<view class="flex-1"></view>
					<view>{{coach_refund_text.length>200?200:coach_refund_text.length}}/200</view>
				</view>
				<view class="button">
					<view @tap.stop="$refs.refuse_item.close()" class="item-child">取消</view>
					<view @tap.stop="confirmRefuse" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">确定</view>
				</view>
			</view>
		</uni-popup>



		<uni-popup ref="oper_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">{{popupInfo.title}}</view>
				<view class="space-md"></view>
				<view class="flex-warp mt-md" style="width: 100%;" v-if="popupInfo.type !== 4">
					<view>拍照打卡：</view>
					<view class="flex-1">
						<upload @upload="imgUpload" @del="imgUpload" :imagelist="popupInfo.imgs" filetype="picture"
							imgtype="imgs" text="拍摄图片" :imgsize="1" :sourceType="2">
						</upload>
					</view>
				</view>
				<view class="flex-warp mt-md" style="width: 100%;">
					<view>当前地点：</view>
					<view @tap.stop="toGetLocation" class="flex-1"
						:class="[{'c-title':popupInfo.location.address},{'c-caption':!popupInfo.location.address}]">
						{{popupInfo.location.address || '点击获取位置信息'}}
					</view>
				</view>
				<view class="button">
					<view @tap.stop="$refs.oper_item.close()" class="item-child">取消</view>
					<view @tap.stop="confirmOper" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">确定</view>
				</view>
			</view>
		</uni-popup>


		<!-- #ifdef H5 -->
		<block v-if="configInfo.plugAuth.recording && configInfo.service_recording_show && pageLen == 1">
			<media-recorder ref="recorder" @success='handlerSuccess' @save="handlerOnSave"
				@error='handlerError'></media-recorder>
		</block>
		<!-- #endif -->


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
	// #ifdef H5
	import MediaRecorder from '@/components/media-recorder.vue'
	// #endif
	// #ifndef H5
	var recorderManager = null;
	// #endif
	export default {
		components: {
			timeline
			// #ifdef H5
			,
			MediaRecorder
			// #endif
		},
		data() {
			return {
				options: {},
				statusPayType: [2, 3, 4, 5, 6],
				statusType: {
					'-1': '已取消',
					2: '待接单',
					3: '已接单',
					4: '已出发',
					5: '已到达',
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
				oper_add_id: 0,
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
				pageLen: 1,
				// #ifndef H5
				isReset: false,
				duration_time: 600,
				// #endif
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			isUserMedia: state => state.order.isUserMedia,
			recorder: state => state.order.recorder,
			recorder_status: state => state.order.recorder_status,
			recorder_order_id: state => state.order.recorder_order_id,
			order_unix_list: state => state.order.order_unix_list,
			useChooseLocation: state => state.user.useChooseLocation,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
			over_time_text() {
				return new Date().getTime() + this.detail.over_time * 1000
			}
		}),
		onLoad(options) {
			let {
				id = 0
			} = options
			options.id = id * 1
			this.options = options
			if (this.useChooseLocation) {
				this.updateUserItem({
					key: 'useChooseLocation',
					val: false
				})
			}
			this.initIndex()
		},
		// #ifdef H5 
		destroyed() {
			this.updateUserItem({
				key: 'useChooseLocation',
				val: false
			})
		},
		// #endif
		// #ifndef H5
		onUnload() {
			this.updateUserItem({
				key: 'useChooseLocation',
				val: false
			})
		},
		// #endif  
		methods: {
			...mapActions(['getConfigInfo', 'getCoachInfo', 'toPlayAudio']),
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
				if (!this.configInfo.id) {
					await this.getConfigInfo()
				}
				let {
					id
				} = this.options
				let data = await this.$api.technician.orderInfo({
					id
				})
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				data.is_balance = data.balance * 1 > 0 ? 1 : 0
				data.start_service_time_unix = ''
				let {
					pay_type,
					total_time_long: time_long,
					receiving_time = '',
					start_service_time = '',
					is_add = 0,
					store_id = 0,
					add_flow_path = 1,
				} = data
				if (is_add) {
					if (!receiving_time && pay_type > 3) {
						data.receiving_time = start_service_time
					}
					if (!start_service_time && pay_type > 5) {
						data.start_service_time = receiving_time
					}
				}
				if (pay_type > 5 && !is_add) {
					let {
						order_unix_list
					} = this
					if (pay_type == 6) {
						let start_service_time_unix = this.$util.DateToUnix(start_service_time) + time_long * 60
						data.start_service_time_unix = start_service_time_unix
						let unix_items = {
							id,
							time_long,
							start_service_time,
							start_service_time_unix
						}
						let unixInd = order_unix_list.findIndex(item => {
							return item.id === id
						})
						if (unixInd != -1) {
							order_unix_list[unixInd] = unix_items
						} else {
							order_unix_list.push(unix_items)
						}
						this.updateOrderItem({
							key: 'order_unix_list',
							val: order_unix_list
						})
					} else {
						let unix_list = order_unix_list.filter(aitem => {
							return aitem.id != id
						})
						if (unix_list.length !== order_unix_list.length) {
							this.updateOrderItem({
								key: 'order_unix_list',
								val: unix_list
							})
						}
					}
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

				let pageLen = getCurrentPages().length
				this.pageLen = pageLen
				if (refresh || pageLen == 1) return
				// #ifndef H5
				recorderManager = uni.getRecorderManager()
				//开始录音
				recorderManager.onStart(() => {
					this.$util.log('开始录音')
				})
				//结束录音
				recorderManager.onStop((res) => {
					this.$util.log('结束录音', res)
					this.handlerOnSave(res)
					let {
						duration
					} = res
					let currentTime = parseInt(duration / 1000)
					let isReset = this.duration_time * 1 - currentTime > 1 ? false : true
					this.isReset = isReset
					if (isReset) {
						this.handlerOnChanger()
					}
				})
				// 录音异常
				recorderManager.onError((e) => {
					this.$util.log('录音异常', e)
				})
				// #endif
			},
			async initRefresh() {
				await this.initIndex(true)
			},
			countEnd() {
				this.$util.log("倒计时完了")
				setTimeout(() => {
					this.toCountDownEnd()
				}, 1000)
			},
			// 开始录音
			async handlerOnChanger() {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				// #ifndef H5
				await this.$util.checkAuth({
					type: "record"
				});
				// #endif
				let {
					recorder_status,
					duration_time
				} = this
				if (recorder_status) {
					// #ifdef H5
					this.$refs.recorder.stop()
					// #endif
					// #ifndef H5
					recorderManager.stop()
					// #endif
				} else {
					// #ifdef H5
					this.$refs.recorder.start()
					// #endif
					// #ifndef H5
					recorderManager.start({
						format: 'mp3',
						duration: duration_time * 1000,
					})
					// #endif
				}
				this.updateOrderItem({
					key: 'recorder_status',
					val: !recorder_status
				})
			},
			async handlerOnEnd() {
				// #ifdef H5
				this.$refs.recorder.stop()
				setTimeout(() => {
					this.handlerOnSave()
				}, 1000)
				// #endif
				// #ifndef H5
				recorderManager.stop()
				// #endif
				this.updateOrderItem({
					key: 'recorder_status',
					val: false
				})
			},
			async handlerOnSave(res = {}) {
				this.$util.showLoading({
					title: `录音上传中`
				})
				let filePath = ''
				// #ifdef H5
				let unix = parseInt(new Date().getTime() / 1000)
				let name = `服务过程录音-${unix}.mp3`
				let {
					data
				} = this.recorder
				let file = new File([data], name, {
					type: 'audio/mp3'
				})
				filePath = URL.createObjectURL(file)
				// #endif
				// #ifndef H5
				let {
					tempFilePath,
				} = res
				filePath = tempFilePath
				// #endif

				let {
					attachment_path: link
				} = await this.$api.base.uploadFile({
					filePath,
					formData: {
						type: 'audio'
							// #ifdef H5
							,
						name
						// #endif
					}
				})
				let {
					recorder_order_id: order_id
				} = this
				await this.$api.technician.recordingAdd({
					order_id,
					link
				})
				this.$util.hideAll()
			},
			// #ifdef H5
			handlerSuccess(res) {
				this.updateOrderItem({
					key: 'recorder',
					val: res
				})
			},
			handlerError(code) {
				switch (code) {
					case '101':
						uni.showModal({
							content: '当前浏览器版本较低，请更换浏览器使用，推荐在微信中打开。'
						})
						break;
					case '201':
						uni.showModal({
							content: '麦克风权限被拒绝，请刷新页面后授权麦克风权限。'
						})
						break
					default:
						uni.showModal({
							content: '未知错误，请刷新页面重试'
						})
						break
				}
			},
			// #endif 
			// 服务倒计时结束
			async toCountDownEnd() {
				await this.initRefresh()
				this.$util.back()
				let {
					recorder_status,
					recorder_order_id,
					pageLen
				} = this
				let {
					id,
					total_time_long: time_long,
					start_service_time = ''
				} = this.detail
				let unix = Math.ceil(((this.$util.DateToUnix(start_service_time) + time_long * 60) * 1000 -
					new Date().getTime()) / 1000)
				if (recorder_order_id == id && recorder_status && unix < 1) {
					if (pageLen == 1) {
						await this.handlerOnEnd()
						// #ifdef H5
						this.$refs.recorder.clear()
						// #endif
					} else {
						await this.$util.getPage(-1).handlerOnEnd()
						await this.$util.getPage(-1).$refs.recorder.clear()
					}
				}
			},
			async toLabel() {
				let {
					user_id
				} = this.detail
				this.$util.goUrl({
					url: `/technician/pages/order/user-label?id=${user_id}`
				})
			},
			// 操作加钟订单
			async toChangeAddOrderItem(index) {
				let {
					add_order_id,
					add_flow_path = 1
				} = this.detail
				let {
					id,
					pay_type,
				} = add_order_id[index]

				if ((add_flow_path == 2 && pay_type > 2) || (add_flow_path == 1 && pay_type > 6)) {
					this.$util.goUrl({
						url: `/technician/pages/order/detail?id=${id}`
					})
					return
				}
				if (pay_type == 2 || (add_flow_path == 1 && [3, 6].includes(pay_type))) {
					this.toConfirm(pay_type == 2 ? add_flow_path == 1 ? 3 : 6 : pay_type == 3 ? 6 : 7, id)
				}
			},
			// 拒绝接单
			async toRefuse(id = 0) {
				this.oper_add_id = id
				this.coach_refund_text = ''
				this.$refs.refuse_item.open()
			},
			// 确认：拒绝接单
			async confirmRefuse() {
				let {
					oper_add_id,
					coach_refund_text = ''
				} = this
				coach_refund_text = coach_refund_text.length > 0 ? coach_refund_text.replace(
					/(^\s*)|(\s*$)/g, "") : ''
				if (coach_refund_text.length == 0) {
					this.$util.showToast({
						title: `请输入拒单原因`
					})
					return
				}
				this.coach_refund_text = this.coach_refund_text.substring(0, 200)
				this.toConfirm(-1, oper_add_id)
			},
			// 获取定位
			async toGetLocation() {
				let {
					lat = '',
						lng = '',
						address = ''
				} = this.popupInfo.location
				if (lat && lng && address) return
				this.getUtilLocation()
			},
			async getUtilLocation() {
				this.updateUserItem({
					key: 'useChooseLocation',
					val: true
				})
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					await this.$jweixin.wxReady3();
					let {
						latitude: lat = 0,
						longitude: lng = 0
					} = await this.$jweixin.getWxLocation2()
					this.initUtilLocaData(lat, lng)
				}
				// #endif
				// #ifndef H5
				let {
					lat = 0,
						lng = 0
				} = await this.$util.getLocation()
				this.initUtilLocaData(lat, lng)
				// #endif
			},
			async initUtilLocaData(lat, lng) {
				this.updateUserItem({
					key: 'useChooseLocation',
					val: false
				})
				if (!lat && !lng) {
					this.$util.showToast({
						title: `获取位置信息失败，请稍后重试`
					})
					this.$util.hideAll()
					return
				}
				this.$util.showLoading()
				// 优化0112
				let {
					address
				} = await this.$util.getMapAddr({
					lat,
					lng
				})
				let location = {
					lat,
					lng,
					address
				}
				this.$util.updateCoachAddr(location)
				let data = Object.assign({}, this.popupInfo, {
					location
				})
				this.$nextTick(() => {
					this.popupInfo = data
				})
				this.$util.hideAll()
			},
			imgUpload(e) {
				let {
					imagelist,
					imgtype
				} = e;
				this.popupInfo[imgtype] = imagelist;
			},
			// 确认： 4已出发/5已到达/7已完成
			confirmOper() {
				let popupInfo = this.$util.deepCopy(this.popupInfo)
				let {
					type,
					param,
					imgs,
					location
				} = popupInfo
				let {
					lat = 0, lng = 0, address = ''
				} = location
				if ([5, 7].includes(type) && imgs.length === 0) {
					this.$util.showToast({
						title: `请先拍照`
					})
					return
				}
				if (!lat && !lng) {
					this.$util.showToast({
						title: `请先获取当前位置信息`
					})
					return
				}
				if ([5, 7].includes(type)) {
					let {
						path
					} = imgs[0]
					location.path = path
				}
				this.toConfirmUpdate(type, param, location)
			},
			// type: -1拒绝接单，3确定接单，4已出发，5已到达，6开始服务，7完成服务
			async toConfirm(type, oper_add = 0) {
				if (this.lockTap) return

				let {
					id: order_id,
				} = this.detail
				if (oper_add) {
					order_id = oper_add
				}
				let param = {
					order_id,
					oper_add,
					type
				}
				if (type == -1) {
					param.coach_refund_text = this.coach_refund_text
				}

				if ([4, 5, 7].includes(type)) {
					let arr = {
						4: '确认出发',
						5: '确认到达',
						7: '确认完成',
					}
					let title = arr[type]
					this.popupInfo = Object.assign({}, this.popupInfo, {
						title,
						type,
						param,
						imgs: [],
						location: {
							lat: 0,
							lng: 0,
							address: ''
						}
					})
					this.$refs.oper_item.open()
					// #ifndef MP-WEIXIN
					this.toGetLocation()
					// #endif
				} else {
					this.toConfirmUpdate(type, param)
				}
			},
			async toConfirmUpdate(type, param, location = {}) {
				if ([4, 5, 7].includes(type)) {
					let {
						lat,
						lng,
						address,
						path
					} = location
					if (type === 4) {
						param.serout_lat = lat
						param.serout_lng = lng
						param.serout_address = address
					}
					if (type == 5) {
						param.arrive_img = path
						param.arr_lat = lat
						param.arr_lng = lng
						param.arr_address = address
					}
					if (type == 7) {
						param.end_img = path
						param.end_lat = lat
						param.end_lng = lng
						param.end_address = address
					}
				}
				let msg = {
					'-1': '已拒绝接单',
					3: '接单成功',
					4: '已成功出发',
					5: '已成功到达',
					6: '已开始服务',
					7: '服务已完成'
				}

				if (this.lockTap) return
				this.lockTap = true


				let {
					plugAuth,
					service_recording_show
				} = this.configInfo
				let {
					recording
				} = plugAuth

				let {
					isUserMedia,
					recorder_order_id,
					recorder_status,
					pageLen
				} = this

				let flag = true

				let {
					order_id,
					oper_add = 0
				} = param
				delete param.oper_add

				let {
					is_add,
				} = this.detail

				let order_info = {}
				try {
					order_info = await this.$api.technician.orderInfo({
						id: order_id
					})
				} catch (e) {
					if (type == -1) {
						this.$refs.refuse_item.close()
					}
					if ([4, 5, 7].includes(type)) {
						this.$refs.oper_item.close()
					}
					this.$util.back()
					this.lockTap = false
					this.$util.hideAll()
					setTimeout(() => {
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 2000)
					return
				}

				let {
					pay_type
				} = order_info

				if (pay_type == 7 && recorder_order_id == this.detail.order_id && recorder_status) {
					if (pageLen == 1) {
						await this.handlerOnEnd()
						// #ifdef H5
						this.$refs.recorder.clear()
						// #endif
					} else {
						await this.$util.getPage(-1).handlerOnEnd()
						await this.$util.getPage(-1).$refs.recorder.clear()
					}
					this.getCoachInfo()
				}

				is_add = !is_add ? oper_add : is_add

				if (!is_add && pay_type < type && type === 6 && recorder_order_id != order_id &&
					recorder_status) {
					let [res_del, {
						confirm
					}] = await uni.showModal({
						title: '提示',
						content: "已有开始的服务还未结束录音，请确认是否完成录音并开始新的服务？"
					})
					if (confirm) {
						if (pageLen == 1) {
							await this.handlerOnEnd()
							// #ifdef H5
							this.$refs.recorder.clear()
							// #endif
						} else {
							await this.$util.getPage(-1).handlerOnEnd()
							await this.$util.getPage(-1).$refs.recorder.clear()
						}
					} else {
						flag = false
					}
				}

				this.$util.showLoading()

				if (!flag) {
					this.lockTap = false
					this.$util.hideAll()
					return
				}

				try {
					if (type == -1) {
						this.$refs.refuse_item.close()
					}
					if ([4, 5, 7].includes(type)) {
						this.$refs.oper_item.close()
					}
					if (type == 4 || type == 5) {
						this.updateOrderItem({
							key: type == 4 ? 'coach_travel_order_id' : 'coach_travel_arrive_id',
							val: order_id
						})
					}
					await this.$api.technician.updateOrder(param)
					if (type == 6) {
						if (!is_add) {
							this.toPlayAudio({
								key: 'service_start_recording'
							})
							if (isUserMedia && recording && service_recording_show) {
								let recordMsg = pageLen == 1 ? '若录音中退出页面将不会记录录音的音频！' : ''
								this.$util.hideAll()
								await uni.showModal({
									title: '提示',
									content: `服务过程将自动录音，直至服务结束！${recordMsg}`,
									showCancel: false,
									confirmText: '知道了'
								})
								this.updateOrderItem({
									key: 'recorder_order_id',
									val: order_id
								})
								if (pageLen == 1) {
									await this.handlerOnChanger()
								} else {
									await this.$util.getPage(-1).handlerOnChanger()
								}
							}
						}
						if (this.detail.is_add && pageLen > 1 && this.$util.getPage(-1).detail) {
							this.$util.getPage(-1).detail = {}
						}
						if (!this.detail.is_add) {
							this.detail = {}
						}
					}
					if (type == 7) {
						if (!is_add && recorder_order_id == order_id && recorder_status) {
							if (pageLen == 1) {
								await this.handlerOnEnd()
								// #ifdef H5
								this.$refs.recorder.clear()
								// #endif
							} else {
								await this.$util.getPage(-1).handlerOnEnd()
								await this.$util.getPage(-1).$refs.recorder.clear()
							}
						}
						this.getCoachInfo()
					}
					this.$util.hideAll()
					this.$util.showToast({
						title: msg[type]
					})
					await this.initRefresh()
					setTimeout(() => {
						this.$util.back()
						this.lockTap = false
					}, 500)
				} catch (e) {
					setTimeout(() => {
						this.initRefresh()
						this.$util.back()
						this.lockTap = false
						this.$util.hideAll()
						if (type == 7) {
							this.getCoachInfo()
						}
					}, 2000)
				}
			},
			// 咨询
			async toTel() {
				let {
					id: order_id,
					pay_type
				} = this.detail
				if ([2, 3, 4, 5, 6].includes(pay_type)) {
					let url = await this.$api.technician.getVirtualPhone({
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