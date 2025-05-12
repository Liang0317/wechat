<template>
	<view class="agent-income-commission" v-if="isLoad">


		<fixed @height="initFixHeight" zIndex="997">
			<view class="record-search-info fill-body pt-md pl-md c-base">
				<view class="record-info radius-32" :style="{background:primaryColor}">
					<view class="search-item flex-between ml-lg mr-lg f-desc b-1px-b">
						<view>查询时间</view>
						<view @tap.stop="toShowTimePopup($event)" class="flex-y-center">
							{{ prev_time | handleTimeText(1) }}<i class="iconfont icon-right"></i>
						</view>
					</view>
					<view class="search-item flex-between ml-lg mr-lg f-desc">
						<view>入账状态</view>
						<view @tap.stop="$refs.show_status_item.open()" class="flex-y-center">
							{{typeList[typeIndex].title}}<i class="iconfont icon-right"></i>
						</view>
					</view>
				</view>
			</view>
		</fixed>

		<block v-for="(item,index) in list.data" :key="index">
			<view @tap.stop="toShowTimePopup($event,item.month)" class="count-item fill-body pl-md pr-md"
				v-if="prev_time.activeIndex==0 && (index==0 || (index>0&&item.month!=list.data[index-1].month))">
				<veiw class="title flex-y-center">
					<view class="f-title c-title text-bold">{{item.month}}</view>
					<i class="iconfont iconxia"></i>
				</veiw>
				<view class="f-caption c-caption">获得总提成¥{{item.total_cash}}（{{cityType[item.my_city_type]}}代理）
				</view>
			</view>
			<view @tap.stop="toShowTimePopup($event,item.month)" class="count-item fill-body pl-md pr-md"
				v-if="prev_time.activeIndex==1 && index==0">
				<veiw class="title flex-y-center">
					<view class="f-title c-title text-bold">{{prev_time | handleTimeText(2)}}</view>
					<i class="iconfont iconxia"></i>
				</veiw>
				<view class="f-caption c-caption">获得总提成¥{{item.total_cash}}（{{cityType[item.my_city_type]}}代理）
				</view>
			</view>

			<view class="list-item fill-base" :class="[{'mt-md':index!==0}]">
				<view class="flex-between pt-lg pb-lg ml-lg mr-lg b-1px-b">
					<view class="flex-y-center f-caption c-caption">{{$t('action.attendantName')}}
						<view class="f-paragraph c-title text-bold ml-md max-380 ellipsis">
							{{item.coach_info ? item.coach_info.coach_name : '-'}}
						</view>
					</view>
					<view class="f-paragraph text-bold" :style="{color:item.have_tx?primaryColor:subColor}">
						{{statusType[item.have_tx]}}
					</view>
				</view>
				<view class="pd-lg f-caption">
					<view class="flex-warp">
						<view class="item-text c-paragraph">创建时间: </view>
						<view class="c-title">{{item.create_time}}</view>
					</view>
					<view class="flex-warp mt-md">
						<view class="item-text c-paragraph">服务时间: </view>
						<view class="c-title">{{item.start_time}}</view>
					</view>
					<view class="flex-warp mt-md">
						<view class="item-text c-paragraph">项目: </view>
						<view class="c-title" style="max-width:450rpx">
							<view :class="[{'mt-md':aindex!=0}]" v-for="(aitem,aindex) in item.order_goods"
								:key="aindex">
								{{aitem.goods_name}}
							</view>
						</view>
					</view>
					<view class="flex-warp mt-md">
						<view class="item-text c-paragraph">订单实际支付价格: </view>
						<view class="flex-y-center c-title">
							<view class="mr-sm">¥{{item.pay_price}}</view>
							<block v-if="item.true_car_price*1>0">(含车费¥{{item.true_car_price}})</block>
						</view>
					</view>
					<view class="flex-warp mt-lg pt-md">
						<view class="item-text c-paragraph">{{$t('action.attendantName')}}分成: </view>
						<view class="c-title" :style="{color:primaryColor}">¥{{item.coach_cash}}</view>
					</view>
					<view class="flex-warp mt-md" v-for="(aitem,aindex) in item.admin_cash_list" :key="aindex">
						<view class="item-text c-paragraph">{{cityType[aitem.city_type]}}代理分成: </view>
						<view class="c-title" :style="{color:primaryColor}">¥{{aitem.cash}}</view>
					</view>
				</view>
			</view>

		</block>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		<view class="space-footer"></view>



		<uni-popup ref="show_choose_time" type="bottom" :maskClick="false">
			<view class="popup-choose-time fill-base">
				<view class="pl-lg pr-lg">
					<view class="flex-between b-1px-b">
						<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1"
							:activeColor="primaryColor" height="100rpx"></tab>
						<i @tap.stop="toClose" class="iconfont icon-close"></i>
					</view>
					<view class="flex-center" style="height:80rpx">
						<view class="flex-1 flex-y-baseline">
							<view class="f-paragraph c-title text-bold">{{activeIndex==0?'选择月份':'自定义时间'}}</view>
							<view class="f-caption c-warning ml-sm" v-if="activeIndex==1">最长可查找时间跨度一年的交易</view>
						</view>
						<view class="f-paragraph" @tap.stop="toReset" style="color: #5A677E;"
							v-if="(activeIndex==0&&check_time.month) || (activeIndex==1&&(check_time.start_time || check_time.end_time))">
							清除</view>
					</view>
					<view class="flex-center pb-lg" v-if="activeIndex==0">
						<view @tap.stop="toShowTime('month')" class="item-child flex-center flex-column">
							<view>开始月份</view>
							<view class="mt-sm" :style="{color:check_time.month ? primaryColor : '#999'}">
								{{check_time.month || '选择月份'}}
							</view>
						</view>
					</view>
					<view class="flex-center pb-lg" v-if="activeIndex==1">
						<view @tap.stop="toShowTime('start_time')" class="item-child flex-center flex-column">
							<view>开始时间</view>
							<view class="mt-sm" :style="{color:check_time.start_time ? primaryColor : '#999'}">
								{{check_time.start_time || '选择时间'}}
							</view>
						</view>
						<view @tap.stop="toShowTime('end_time')" class="item-child flex-center flex-column  b-1px-l">
							<view>结束时间</view>
							<view class="mt-sm" :style="{color:check_time.end_time ? primaryColor : '#999'}">
								{{check_time.end_time || '选择时间'}}
							</view>
						</view>
					</view>
				</view>
				<view class="flex-center flex-column fill-body">
					<view class="space-lg"></view>
					<view @tap.stop="toConfirm" class="confirm-btn flex-center f-title c-base radius-16"
						:style="{background: primaryColor}">确定</view>
					<view class="space-lg"></view>
					<view class="space-safe"></view>
				</view>
			</view>
		</uni-popup>

		<w-picker mode="date" :startYear="startYear*1-10" :endYear="startYear"
			:value="activeIndex == 0 ?curMonth:curDay" :current="false" :fields="activeIndex == 0 ?'month':'day'"
			@confirm="onConfirm($event)" :disabled-after="false" ref="day" :themeColor="primaryColor"
			:visible.sync="showDate">
		</w-picker>

		<uni-popup type="bottom" ref="show_status_item" :custom="true">
			<view class="popup-status pd-lg fill-base">
				<view @tap.stop="handerTypeChange(index)" class="flex-center f-paragraph mb-lg"
					:class="[{'mt-lg':index==0}]" :style="{color:typeIndex==index?primaryColor:''}"
					v-for="(item,index) in typeList" :key="index">
					{{item.title}}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import $util from "@/utils/index.js"
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				isLoad: false,
				popupHeight: '',
				curDay: '',
				curMonth: '',
				startYear: '',
				showKey: '',
				showDate: false,
				time_text: '',
				prev_time: {
					activeIndex: 0,
					month: '',
					start_time: '',
					end_time: ''
				},
				check_time: {
					activeIndex: 0,
					month: '',
					start_time: '',
					end_time: ''
				},
				activeIndex: 0,
				tabList: [{
					id: 1,
					title: '月份选择'
				}, {
					id: 2,
					title: '自定义时间'
				}],
				typeIndex: 0,
				typeList: [{
					title: '全部',
					id: -1
				}, {
					title: '未到账',
					id: 0,
				}, {
					title: '已到账',
					id: 1
				}],
				statusType: {
					0: '未到账',
					1: '已到账'
				},
				cityType: ['', '城市', '区县', '省'],
				param: {
					page: 1
				},
				list: {
					data: []
				},
				loading: true,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		async onLoad() {
			this.$util.showLoading()
			let cur_time = new Date(Math.ceil(new Date().getTime()))
			this.curDay = this.$util.formatTime(cur_time, 'YY-M-D')
			this.curMonth = this.$util.formatTime(cur_time, 'YY-M')
			this.startYear = this.$util.formatTime(cur_time, 'YY')
			await this.initIndex()
			this.isLoad = true
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
			...mapMutations([]),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				await this.getList()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			async getList(page) {
				if (page) {
					this.param.page = 1
					this.list.data = []
					uni.pageScrollTo({
						scrollTop: 0
					})
				}
				let {
					list: oldList,
					activeIndex,
					typeIndex,
					typeList
				} = this
				let param = this.$util.deepCopy(this.param)
				let {
					id
				} = typeList[typeIndex]
				if (id != -1) {
					param.have_tx = id
				}
				let {
					month,
					start_time,
					end_time
				} = this.$util.deepCopy(this.check_time)
				if (activeIndex == 0) {
					param.month = month ? this.$util.DateToUnix(`${month}-01`) : ''
				}
				if (activeIndex == 1) {
					param.start_time = start_time && end_time ? this.$util.DateToUnix(start_time) : ''
					param.end_time = start_time && end_time ? this.$util.DateToUnix(end_time) + 24 * 3600 - 1 : ''
				}
				let newList = await this.$api.agent.commList(param);
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			initFixHeight(val) {
				this.popupHeight = val
			},
			handerTabChange(index) {
				this.activeIndex = index
				this.check_time.activeIndex = index
			},
			handerTypeChange(index) {
				this.typeIndex = index
				this.getList(1)
				this.$refs.show_status_item.close()
			},
			toChangeType(index) {
				this.active = index
			},
			toShowTimePopup(e, month = 0) {
				this.check_time = this.$util.deepCopy(this.prev_time)
				if (month && month != 0) {
					this.activeIndex = 0
					this.curMonth = month
					this.check_time.month = month
				}
				this.activeIndex = this.check_time.activeIndex
				this.$refs.show_choose_time.open()
			},
			toReset() {
				let {
					activeIndex
				} = this
				if (activeIndex == 0) {
					this.check_time.month = ''
					return
				}
				this.check_time.start_time = ''
				this.check_time.end_time = ''
			},
			async toClose() {
				let {
					activeIndex
				} = this
				let {
					month,
					start_time,
					end_time
				} = this.check_time

				if ((activeIndex == 0 && !month) || (activeIndex == 1 && (!start_time || !end_time))) {
					if (activeIndex == 1 && (!start_time || !end_time)) {
						this.activeIndex = 0
						this.check_time.activeIndex = 0
						this.check_time.month = ''
					}
					this.prev_time = this.$util.deepCopy(this.check_time)
				}
				if ((activeIndex == 0 && month) || (activeIndex == 1 && (start_time && end_time))) {
					this.check_time = this.$util.deepCopy(this.prev_time)
				}
				this.$refs.show_choose_time.close()
				this.getList(1)
			},
			toShowTime(key) {
				let {
					activeIndex
				} = this
				if (activeIndex == 1 && key == 'end_time' && !this.check_time.start_time) {
					this.$util.showToast({
						title: `请选择开始时间`
					})
					return
				}
				let showTime = this.check_time[key]
				if (showTime) {
					if (key == 'month') {
						this.curMonth = showTime
					} else {
						this.curDay = showTime
					}
				}
				this.showKey = key
				this.showDate = true
			},
			async onConfirm(val) {
				let {
					start_time,
					end_time
				} = this.check_time
				let {
					showKey,
					activeIndex = 0
				} = this
				let show_unit = this.$util.DateToUnix(showKey == 'month' ? `${val.result}-01` : val.result)
				let start_unit = start_time ? this.$util.DateToUnix(start_time) : 0
				let end_unit = end_time ? this.$util.DateToUnix(end_time) : 0
				let cur_month = this.$util.formatTime(new Date(Math.ceil(new Date().getTime())), 'YY-M-D')
				let cur_unit = this.$util.DateToUnix(cur_month) + 1

				let msgType = {
					month: '开始月份',
					start_time: '开始时间',
					end_time: '结束时间',
				}

				if (show_unit > cur_unit) {
					this.$util.showToast({
						title: `${msgType[showKey]}不能选择未来时间哦`
					})
					return
				}

				if (activeIndex == 1 && ((showKey == 'start_time' && end_unit && end_unit < this.$util.DateToUnix(val
							.result)) ||
						(showKey == 'end_time' && start_unit && start_unit > this.$util.DateToUnix(val.result)))) {
					this.$util.showToast({
						title: `结束时间不能小于开始时间`
					})
					return
				}
				this.check_time[showKey] = val.result
			},
			async toConfirm() {
				let {
					month = '',
						start_time = '',
						end_time = ''
				} = this.check_time
				let {
					activeIndex = 0
				} = this
				let start_unit = this.$util.DateToUnix(start_time) * 1000
				let end_unit = this.$util.DateToUnix(end_time) * 1000

				if (activeIndex == 0 && !month) {
					this.$util.showToast({
						title: `请选择开始月份`
					})
					return
				}
				if (activeIndex == 1 && (!start_time || !end_time || (end_unit -
						start_unit > 365 * 24 * 3600 * 1000))) {
					this.$util.showToast({
						title: !start_time ? `请选择开始时间` : !end_time ? `请选择结束时间` : `查询时间跨度最长为一年哦`
					})
					return
				}
				this.check_time.activeIndex = activeIndex
				this.prev_time = this.$util.deepCopy(this.check_time)
				this.$refs.show_choose_time.close()
				this.getList(1)
			}
		},
		filters: {
			handleTimeText(val, type) {
				let text = '请选择'
				let {
					activeIndex,
					month,
					start_time,
					end_time
				} = val
				if (activeIndex == 0 && month) {
					text = $util.formatTime($util.DateToUnix(`${month}-01`) * 1000, 'YY年M月')
				}
				let formatType = type == 1 ? 'YY.M.D' : 'YY年M月D日'
				if (activeIndex == 1 && start_time && end_time) {
					text = $util.formatTime($util.DateToUnix(start_time) * 1000, formatType) + ' - ' +
						$util.formatTime($util.DateToUnix(end_time) * 1000, formatType)
				}
				return text
			}
		}
	}
</script>


<style lang="scss">
	.agent-income-commission {

		.record-search-info {
			width: 750rpx;
			// height: 200rpx;

			.record-info {
				width: 710rpx;

				.search-item {
					height: 100rpx;

					.text {
						color: #3D2C1B;
					}

					.iconfont {
						font-size: 26rpx;
					}
				}

			}
		}


		.count-item {
			height: 120rpx;

			.title {
				padding-top: 18rpx;

				.iconfont {
					font-size: 16rpx;
				}
			}

		}


		.list-item {
			.item-text {
				width: 240rpx;
			}
		}

		.popup-choose-time {
			width: 750rpx;
			border-radius: 30rpx 30rpx 0 0;

			.icon-close {
				color: #A8AEB8;
				font-size: 40rpx;
			}

			.item-child {
				width: 50%;
			}

			.confirm-btn {
				width: 670rpx;
				height: 100rpx;
			}

		}

		.popup-status {
			width: 750rpx;
			height: 360rpx;
			border-radius: 30rpx 30rpx 0 0;
		}
	}
</style>