<template>
	<view class="order-pages">
		<view class="fix" style="top:-100%;left:-100%">
			<block v-for="(item,index) in order_unix_list" :key="index">
				<block v-if="item.id === recorder_order_id">
					<min-countdown :targetTime="item.start_service_time_unix * 1000"
						@callback="toCountDownEnd(item.id)"> </min-countdown>
				</block>
			</block>
		</view>
		<fixed>
			<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
				:width="100/tabList.length + '%'" height="100rpx"></tab>
			<view class="b-1px-b"></view>
		</fixed>

		<view @tap.stop="goDetail(index)" class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16 rel"
			v-for="(item,index) in list.data" :key="index">
			<view v-if="item.is_add">
				<view class="bell-tag flex-center f-icontext c-base abs" :style="{background:primaryColor}">加钟服务
				</view>
				<view class="space-md"></view>
			</view>
			<view @tap.stop="goShop(index)" class="flex-between pb-lg">
				<view class="f-paragraph c-title max-500 ellipsis">订单号：{{item.order_code}}</view>
				<view class="f-caption text-bold"
					:style="{color:item.pay_type==2?primaryColor: [3,4,5].includes(item.pay_type)?subColor: item.pay_type == 6 ? '#11C95E' : '#333'}">
					{{statusType[item.pay_type]}}
				</view>
			</view>
			<view class="flex-center mb-lg" v-for="(aitem,aindex) in item.order_goods" :key="aindex">
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
						<view class="f-mini-title c-title text-bold ellipsis"
							:class="[{'max-300':aitem.refund_num>0},{'max-450':aitem.refund_num==0}]">
							{{aitem.goods_name}}
						</view>
						<view class="f-caption c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
					</view>
					<view class="f-caption c-caption mt-md">服务时间：{{item.start_time}}</view>
					<view class="flex-between">
						<view class="flex-y-baseline f-caption c-warning">¥<view class="f-title text-bold">
								{{aitem.price}}
							</view>
						</view>
						<view class="c-paragraph">x{{aitem.num}}</view>
					</view>
				</view>
			</view>
			<view class="flex-between pt-lg b-1px-t">
				<view class="flex-y-center f-desc c-title">总计：
					<view class="f-paragraph c-warning text-bold">¥{{item.pay_price}}</view>
				</view>
				<view class="flex-warp">
					<!-- // pay_type 2待接单，5待服务，6服务中，7已完成 -->
					<!-- 待接单 -->
					<block v-if="item.pay_type == 2">
						<button @tap.stop="toRefuse(index)" class="clear-btn order">拒绝接单</button>
						<button @tap.stop="toConfirm(index,3)" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">确认接单</button>
					</block>
					<!-- 待服务 -->
					<block v-if="[3,4,5].includes(item.pay_type)">
						<button @tap.stop="toTel(index)" class="clear-btn order">联系客户</button>
						<button @tap.stop="toConfirm(index, item.is_add || item.store_id ? 6 : item.pay_type*1+1 )"
							class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">{{item.is_add || item.store_id ? '开始服务' : item.pay_type == 3 ? '确认出发': item.pay_type == 4 ?'拍照确认到达' : '开始服务'}}</button>
					</block>
					<!-- 服务中 -->
					<block v-if="item.pay_type == 6">
						<button @tap.stop="toTel(index)" class="clear-btn order">联系客户</button>
						<button @tap.stop="toConfirm(index,7)" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}">拍照完成服务</button>
					</block>
					<!-- 已完成 -->
					<block v-if="item.pay_type == 7">
						<button @tap.stop="toShield(index)" class="clear-btn order" v-if="item.can_shield">拉黑用户</button>
						<button
							@tap.stop="$util.goUrl({url:`/technician/pages/order/label?id=${item.id}&uid=${item.user_id}`})"
							class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,borderColor:primaryColor}"
							v-if="!item.is_add && !item.label_time">评价客户</button>
					</block>
				</view>
			</view>
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		<view class="space-footer"></view>

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


		<uni-popup ref="shield_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">温馨提示</view>
				<view class="desc">拉黑客户之后，该客户将不能在列表看到您的信息，会影响你的接单，可以在{{$t('action.attendantName')}}端 -
					拉黑客户页面移除拉黑客户，确认拉黑吗？</view>
				<view class="button">
					<view @tap.stop="$refs.shield_item.close()" class="item-child">我再想想</view>
					<view @tap.stop="confirmShield" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">确定</view>
				</view>
			</view>
		</uni-popup>


		<!-- #ifdef H5 -->
		<block v-if="configInfo.plugAuth.recording && configInfo.service_recording_show">
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
	// #ifdef H5
	import MediaRecorder from '@/components/media-recorder.vue'
	// #endif
	// #ifndef H5
	var recorderManager = null
	// #endif
	export default {
		components: {
			// #ifdef H5
			MediaRecorder
			// #endif
		},
		data() {
			return {
				options: {},
				activeIndex: 0,
				tabList: [{
					// 	title: '全部',
					// 	id: 0
					// }, {
					title: '待接单',
					id: 2,
					number: 0
				}, {
					title: '待服务',
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
				statusType: {
					2: '待接单',
					3: '已接单',
					4: '已出发',
					5: '已到达',
					6: '服务中',
					7: '已完成',
					8: '待转单'
				},
				param: {
					page: 1,
					pay_type: 0,
				},
				list: {
					data: []
				},
				loading: true,
				index: -1,
				coach_refund_text: '',
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
				// #ifndef H5
				isReset: false,
				duration_time: 600
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
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		async onLoad(options) {
			this.options = options
			let {
				tab = 0
			} = options
			this.activeIndex = tab
			this.initIndex()
		},
		// #ifdef H5 
		destroyed() {
			this.toUnload()
		},
		// #endif
		// #ifndef H5
		onUnload() {
			this.toUnload()
		},
		// #endif  
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
				if (!this.configInfo.id || !this.configInfo.hasOwnProperty('free_fare_bear')) {
					await this.getConfigInfo()
				}
				await this.getList()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				if (refresh) return
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
			initRefresh() {
				uni.pageScrollTo({
					duration: 0,
					scrollTop: 0
				})
				this.param.page = 1
				this.initIndex(true)
			},
			async getList(flag = false) {
				let {
					list: oldList,
					param,
					tabList,
					activeIndex
				} = this
				param.pay_type = tabList[activeIndex].id
				let newList = await this.$api.technician.orderList(param)

				let arr = newList.data.filter(aitem => {
					return aitem.pay_type > 6
				})
				if (arr.length > 0) {
					let ids = arr.map(aitem => {
						return aitem.id
					})
					let {
						order_unix_list
					} = this
					let unix_list = order_unix_list.filter(aitem => {
						return !ids.includes(aitem.id)
					})
					if (unix_list.length !== order_unix_list.length) {
						this.updateOrderItem({
							key: 'order_unix_list',
							val: unix_list
						})
					}
				}

				if (!flag) {
					if (this.param.page == 1) {
						this.list = newList
					} else {
						newList.data = oldList.data.concat(newList.data)
						this.list = newList
					}
				}

				this.tabList[0].number = newList.agent_order_count
				this.tabList[1].number = newList.wait_order_count
				this.tabList[2].number = newList.service_order_count
				this.loading = false
				this.$util.hideAll()
			},
			handerTabChange(index) {
				this.activeIndex = index;
				this.$util.showLoading()
				this.param.page = 1;
				this.getList()
			},
			async toUnload() {
				this.updateUserItem({
					key: 'useChooseLocation',
					val: false
				})
				this.updateOrderItem({
					key: 'recorder_status',
					val: false
				})
				this.updateOrderItem({
					key: 'recorder_order_id',
					val: 0
				})
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
			async toCountDownEnd(id) {
				let {
					recorder_status,
					recorder_order_id
				} = this
				if (recorder_order_id == id && recorder_status) {
					let data = await this.$api.technician.orderInfo({
						id
					})
					let {
						total_time_long: time_long,
						start_service_time = ''
					} = data
					let unix = Math.ceil(((this.$util.DateToUnix(start_service_time) + time_long * 60) * 1000 -
						new Date().getTime()) / 1000)
					if (unix < 1) {
						await this.handlerOnEnd()
						// #ifdef H5
						this.$refs.recorder.clear()
						// #endif
					}
				}
			},
			// 拒绝接单
			async toRefuse(index) {
				this.index = index
				this.coach_refund_text = ''
				this.$refs.refuse_item.open()
			},
			// 确认：拒绝接单
			async confirmRefuse() {
				let {
					coach_refund_text
				} = this
				coach_refund_text = coach_refund_text.length > 0 ? coach_refund_text.replace(/(^\s*)|(\s*$)/g,
					"") : ''
				if (coach_refund_text.length == 0) {
					this.$util.showToast({
						title: `请输入拒单原因`
					})
					return
				}
				this.coach_refund_text = this.coach_refund_text.substring(0, 200)
				let {
					index,
				} = this
				this.toConfirm(index, -1)
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
					index,
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
				this.toConfirmUpdate(index, type, param, location)
			},
			// type: -1拒绝接单，3确定接单，4已出发，5已到达，6开始服务，7已完成
			async toConfirm(index, type) {
				if (this.lockTap) return
				let {
					id: order_id,
				} = this.list.data[index]
				order_id = order_id * 1
				let param = {
					order_id,
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
						index,
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
					this.toConfirmUpdate(index, type, param)
				}
			},
			async toConfirmUpdate(index, type, param, location = {}) {
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
					recorder_status
				} = this

				let flag = true

				let {
					order_id
				} = param

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
					this.param.page = 1
					this.getList()
					this.lockTap = false
					this.$util.hideAll()
					return
				}

				let {
					pay_type
				} = order_info

				if (pay_type == 7 && recorder_order_id == order_id && recorder_status) {
					await this.handlerOnEnd()
					// #ifdef H5
					this.$refs.recorder.clear()
					// #endif
				}

				if (pay_type < type && type === 6 && recorder_order_id != order_id && recorder_status) {
					let [res_del, {
						confirm
					}] = await uni.showModal({
						title: '提示',
						content: "已有开始的服务还未结束录音，请确认是否完成录音并开始新的服务？"
					})
					if (confirm) {
						await this.handlerOnEnd()
						// #ifdef H5
						this.$refs.recorder.clear()
						// #endif
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
					await this.$api.technician.updateOrder(param)
					if (type == 4 || type == 5) {
						this.list.data[index].pay_type = type
						this.updateOrderItem({
							key: type == 4 ? 'coach_travel_order_id' : 'coach_travel_arrive_id',
							val: order_id
						})
					} else {
						this.list.data.splice(index, 1)
					}
					if (type == 6) {
						this.toPlayAudio({
							key: 'service_start_recording'
						})
						if (isUserMedia && recording && service_recording_show) {
							this.$util.hideAll()
							await uni.showModal({
								title: '提示',
								content: "服务过程将自动录音，直至服务结束！若录音中退出页面将不会记录录音的音频！",
								showCancel: false,
								confirmText: '知道了'
							})
							this.updateOrderItem({
								key: 'recorder_order_id',
								val: order_id
							})
							this.handlerOnChanger()
						}
						let {
							total_time_long: time_long,
							start_service_time
						} = await this.$api.technician.orderInfo({
							id: order_id
						})
						let start_service_time_unix = this.$util.DateToUnix(start_service_time) +
							time_long * 60

						let unix_items = {
							id: order_id,
							time_long,
							start_service_time,
							start_service_time_unix
						}
						let {
							order_unix_list
						} = this
						let unixInd = order_unix_list.findIndex(item => {
							return item.id === order_id
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
					}
					if (type == 7) {
						if (recorder_order_id == order_id && recorder_status) {
							await this.handlerOnEnd()
							// #ifdef H5
							this.$refs.recorder.clear()
							// #endif
						}
					}
					this.$util.hideAll()
					this.$util.showToast({
						title: msg[type]
					})
					await this.getList(true)
					setTimeout(() => {
						this.lockTap = false
						if (type == 7) {
							this.getCoachInfo()
						}
					}, 500)
				} catch (e) {
					setTimeout(() => {
						this.param.page = 1
						this.getList()
						this.lockTap = false
						this.$util.hideAll()
						if (type == 7) {
							this.getCoachInfo()
						}
					}, 2000)
				}
			},
			// 屏蔽用户
			toShield(index) {
				this.index = index
				let {
					block_user_type = 1
				} = this.configInfo
				if (block_user_type == 1) {
					this.$refs.shield_item.open()
					return
				}
				this.$util.goUrl({
					url: `/user/pages/feedback/box?blockuser=1&index=${index}`
				})
			},
			// 确认：屏蔽用户
			async confirmShield() {
				let {
					index
				} = this
				if (this.lockTap) return;
				this.lockTap = true;
				this.$util.showLoading()
				let {
					user_id
				} = this.list.data[index]
				try {
					await this.$api.technician.shieldUserAdd({
						user_id
					})
					this.$util.hideAll()
					this.$refs.shield_item.close()
					this.$util.showToast({
						title: `屏蔽成功`
					})
					this.initRefresh()
					setTimeout(() => {
						this.lockTap = false
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			// 联系客户
			async toTel(index) {
				let {
					id
				} = this.list.data[index]
				let url = await this.$api.technician.getVirtualPhone({
					order_id: id
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
			},
			// 订单详情
			goDetail(index) {
				let {
					id
				} = this.list.data[index]
				let url = `/technician/pages/order/detail?id=${id}`
				this.$util.goUrl({
					url
				})
			}
		}
	}
</script>


<style lang="scss">
</style>