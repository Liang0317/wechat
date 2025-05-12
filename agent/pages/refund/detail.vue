<template>
	<view class="order-pages" v-if="detail.id">

		<view class="item-child pd-lg fill-base f-paragraph c-base" style="height:200rpx"
			:style="{background:primaryColor}">
			<view @tap.stop="detail.status==5&&detail.failure_reason?$refs.show_rule_item.open():''"
				class="f-md-title flex-y-center">{{statusType[detail.status]}}<i
					class="iconfont iconwentifankui3 ml-sm text-normal" style="font-size: 28rpx;"
					v-if="detail.status==5&&detail.failure_reason"></i> </view>
			<view class="flex-warp f-desc mt-sm" v-if="detail.status == 2">退款金额¥{{detail.refund_price}}
				<view class="ml-md" v-if="(detail.refund_car_price * 1 === -1 && detail.car_price*1>0 && !detail.free_fare) || (detail.refund_car_price * 1 > 0 &&
                  detail.refund_car_price * 1 > 0)">
					含车费：¥{{ detail.refund_car_price * 1 === -1  ? detail.car_price  : detail.refund_car_price}}
				</view>
				<view class="ml-md" v-if="detail.refund_material_price * 1 > 0">
					含物料费：¥{{ detail.refund_material_price }}
				</view>
			</view>
		</view>

		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16">
			<view class="flex-between pb-lg">
				<view class="f-paragraph c-title max-380 ellipsis">服务内容</view>
			</view>
			<view class="flex-center" :class="[{'mb-lg':aindex != detail.order_goods.length -1}]"
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
					<view class="f-caption c-caption" v-if="aitem.material_price*1>0">
						物料费：¥{{aitem.material_price}}
					</view>
					<view class="f-caption mt-md" style="color:#777">服务时长：{{aitem.time_long}}分钟</view>
					<view class="f-paragraph c-warning text-bold mt-sm">¥{{aitem.goods_price}}
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


		<view class="order-agent-info store-info mt-md ml-lg mr-lg pd-lg fill-base f-paragraph radius-16">
			<view class="flex-between">
				<image mode="aspectFill" class="coach-img radius"
					:src="detail.coach_info ? detail.coach_info.work_img : `https://lbqny.migugu.com/admin/farm/default-user.png`">
				</image>
				<view class="f-title text-bold max-450 ellipsis">
					{{detail.coach_info ? detail.coach_info.coach_name : '-'}}
				</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="title">下单人</view>
				<view class="text flex-1 ellipsis">{{detail.address_info.user_name}}</view>
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
			<view class="flex-between mt-lg pt-lg b-1px-t">
				<view></view>
				<view class="flex-y-baseline f-paragraph c-black text-bold">总计：<view class="c-warning">
						¥{{detail.apply_price}}</view>
					<view class="flex-y-center ml-md" v-if="detail.car_price*1>0">含车费：
						<view class="f-icontext">¥</view>{{detail.car_price}}
					</view>
				</view>
			</view>
		</view>


		<view class="order-agent-info mt-md ml-lg mr-lg pd-lg fill-base radius-16">
			<view class="flex-center">
				<view class="title">退款单号</view>
				<view class="text flex-1">
					<view class="flex-between">
						<view class="max-350 ellipsis">{{detail.order_code}}</view>
						<view @tap="toCopy(detail.order_code)" class="copy-btn flex-center radius-5 f-icontext"
							:style="{color:primaryColor,borderColor:primaryColor}">
							复制</view>
					</view>
				</view>
			</view>
			<view class="flex-center mt-lg" v-if="detail.out_refund_no">
				<view class="title">微信退款单号</view>
				<view class="text flex-1">
					<view class="flex-between">
						<view class="max-350 ellipsis">{{detail.out_refund_no}}</view>
						<view @tap="toCopy(detail.out_refund_no)" class="copy-btn flex-center radius-5 f-icontext"
							:style="{color:primaryColor,borderColor:primaryColor}">复制</view>
					</view>
				</view>
			</view>
			<view class="flex-center mt-lg">
				<view class="title">提交日期</view>
				<view class="text flex-1 ellipsis">{{detail.create_time}}</view>
			</view>
			<view class="flex-center mt-lg" v-if="detail.refund_time">
				<view class="title">审核日期</view>
				<view class="text flex-1 ellipsis">{{detail.refund_time}}</view>
			</view>
			<view class="flex-center mt-lg" v-if="detail.check_user_name">
				<view class="title">审核人</view>
				<view class="text flex-1 ellipsis">{{detail.check_user_name}}</view>
			</view>
			<view class="mt-lg">
				<view class="title">退款原因</view>
				<view class="text mt-sm">
					<text decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
				</view>
			</view>
			<view class="flex-column" v-if="detail.imgs && detail.imgs.length > 0">
				<view class="title">上传图片</view>
				<view class="flex-warp">
					<block v-for="(item,index) in detail.imgs" :key="index">
						<image @tap.top="previewImage(item,detail.imgs)" class="refund-img mt-md mr-md radius-10"
							:src="item" />
					</block>
				</view>
			</view>
		</view>

		<view class="space-max-footer"></view>


		<fix-bottom-button @cancel="toConfirm(3)"
			@confirm="$util.goUrl({url:`/agent/pages/refund/refund?id=${options.id}&agent=${options.agent}&detail=1`})"
			:text="[{text:'拒绝退款',type:'cancel'},{text:'同意退款',type:'confirm'}]" bgColor="#fff" :classType="2"
			v-if="[1,5].includes(detail.status)">
		</fix-bottom-button>


		<uni-popup ref="change_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">温馨提示</view>
				<view class="desc">
					你确认要操作{{statusType[popupInfo.type]}}吗?
				</view>
				<view class="mt-lg" v-if="popupInfo.type == 2">
					<input v-model="popupInfo.price" type="digit"
						class="input flex-y-center pl-lg pr-lg f-sm-title c-title radius-16"
						placeholder-class="c-placeholder" placeholder="请输入退款金额" />
					<view class="f-desc c-caption mt-md">
						<view class="flex-y-center">实际可退款金额<view class="ml-sm c-warning">¥{{popupInfo.apply_price}}
							</view>
						</view>
						<view>退款金额不能大于可退款金额</view>
					</view>
				</view>
				<view class="button">
					<view @tap.stop="$refs.change_item.close()" class="item-child">取消</view>
					<view @tap.stop="confirmChangeOrder" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">确定</view>
				</view>
			</view>
		</uni-popup>


		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">失败原因</view>
				<view class="f-desc c-title mt-lg">
					{{detail.failure_reason}}
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_rule_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
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
	export default {
		components: {},
		data() {
			return {
				options: {},
				carType: {
					0: '公交/地铁',
					1: '出租车'
				},
				payType: {
					1: '微信支付',
					2: '余额支付',
					3: '支付宝支付'
				},
				statusType: {
					'-1': '已取消',
					1: '待退款',
					2: '同意退款',
					3: '拒绝退款',
					4: '退款中',
					5: '退款失败'
				},
				detail: {
					pay_type: 0
				},
				lockTap: false,
				popupInfo: {}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
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
				let data = await this.$api[methodKey].refundOrderInfo({
					id
				})
				let price = 0
				data.order_goods.map(item => {
					price += item.refund_material_price * item.num
				})
				data.refund_material_price = price.toFixed(2)
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				data.is_balance = data.balance * 1 > 0 ? 1 : 0
				this.detail = data
			},
			initRefresh() {
				this.initIndex(true)
			},
			// type: 2同意退款；3拒绝退款
			async toConfirm(type) {
				let {
					id,
					apply_price
				} = this.detail
				this.popupInfo = {
					id,
					type,
					apply_price,
					price: type == 2 ? apply_price : '',
					text: ''
				}
				this.$refs.change_item.open()
			},
			async confirmChangeOrder() {
				let {
					type,
					price,
					apply_price
				} = this.popupInfo
				let param = this.$util.pick(this.popupInfo, ['id', 'price', 'text'])
				let reg = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
				if (type == 2 && (!price || !reg.test(price) || price * 1 > apply_price * 1)) {
					this.$util.showToast({
						title: !price ? '请输入退款金额' : !reg.test(price) ? '请输入正确的退款金额，最多保留2位小数' : '退款金额不能大于可退款金额'
					})
					return
				}
				if (this.lockTap) return;
				this.lockTap = true;
				this.$util.showLoading()
				let {
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				let methodModel = type == 2 ? 'passRefund' : 'noPassRefund'
				try {
					await this.$api[methodKey][methodModel](param)
					this.$refs.change_item.close()
					this.$util.showToast({
						title: '操作成功'
					})
					this.lockTap = false;
					this.updateTechnicianItem({
						key: 'haveOperItem',
						val: true
					})
					this.initRefresh()
					this.$util.back()
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
					return
				}
			},
			// 咨询
			async toTel() {
				let {
					order_id,
					status
				} = this.detail
				let {
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				if ([1, 3].includes(status)) {
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
					this.$util.showToast({
						title: `退款成功，不能联系客户哦`
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
		}
	}
</script>


<style lang="scss">
	.avatar.coath {
		width: 94rpx;
		height: 94rpx;
	}
</style>