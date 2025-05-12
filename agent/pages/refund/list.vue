<template>
	<view class="order-pages">
		<fixed>
			<view class="fill-base pt-lg pl-md pr-md pb-md">
				<search @input="toSearch" type="input" :padding="0" :radius="30" height="70rpx"
					placeholder="请输入系统订单号查询">
				</search>
			</view>
			<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
				height="100rpx"></tab>
			<view class="b-1px-b"></view>
		</fixed>

		<view @tap.stop="goDetail(index, 'detail')" class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16"
			v-for="(item,index) in list.data" :key="index">
			<view class="flex-between pb-lg b-1px-b">
				<view class="f-paragraph c-title max-450 ellipsis">订单号：{{item.order_code}}</view>
				<view class="f-caption text-bold"
					:style="{color:item.status==1 || item.status == 4 ? subColor: item.status == 2 ? '#11C95E' : '#333'}">
					{{statusType[item.status]}}
				</view>
			</view>
			<view class="flex-center mb-lg" :class="[{'mt-lg':aindex==0}]" v-for="(aitem,aindex) in item.order_goods"
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
						<view class="c-paragraph">x{{aitem.num}}</view>
					</view>
					<view class="mt-md f-caption c-caption max-450 ellipsis">
						服务{{$t('action.attendantName')}}：{{item.coach_info?item.coach_info.coach_name:'-'}}</view>
					<view class="f-caption c-caption" style="margin-top: 5rpx;">服务时间：{{item.start_time}}</view>
				</view>
			</view>
			<view class="flex-between pt-lg b-1px-t">
				<view class="flex-y-center f-desc c-title">总计：
					<view class="f-paragraph text-bold">¥{{item.apply_price}}</view>
				</view>
				<view class="flex-warp">
					<!-- 退款申请中 -->
					<block v-if="[1,5].includes(item.status)">
						<button @tap.stop="toConfirm(index,3)" class="clear-btn order"
							style="margin-left: 0;">拒绝退款</button>
						<button @tap.stop="goDetail(index, 'refund')" class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,border:`1rpx solid ${primaryColor}`}">同意退款</button>
					</block>
					<!-- 同意/拒绝退款 -->
					<view v-else>
						<button class="clear-btn order"
							:style="{color:'#fff',background:primaryColor,border:`1rpx solid ${primaryColor}`}">查看详情</button>
					</view>
				</view>
			</view>
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		<view class="space-footer"></view>

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
				options: {},
				activeIndex: 0,
				tabList: [{
					title: '全部',
					id: 0
				}, {
					title: '待退款',
					id: 1,
				}, {
					title: '同意退款',
					id: 2
				}, {
					title: '拒绝退款',
					id: 3
				}, {
					title: '退款中',
					id: 4
				}, {
					title: '退款失败',
					id: 5
				}],
				statusType: {
					'-1': '已取消',
					1: '待退款',
					2: '同意退款',
					3: '拒绝退款',
					4: '退款中',
					5: '退款失败'
				},
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				loading: true,
				popupInfo: {},
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad(options) {
			let {
				agent = 0,
					bell = 0,
					tab = 0
			} = options
			options.agent = agent * 1
			this.options = options
			this.activeIndex = tab
			uni.setNavigationBarTitle({
				title: bell == 1 ? '加钟退款' : '服务退款'
			})
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
				await this.getList()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			toSearch(val) {
				this.param.page = 1
				this.param.order_code = val
				this.getList()
			},
			async getList() {
				let {
					list: oldList,
					param,
					tabList,
					activeIndex
				} = this
				param.status = tabList[activeIndex].id
				let {
					bell = 0,
						agent
				} = this.options
				param.is_add = bell
				let methodKey = agent ? 'agent' : 'admin'
				let newList = await this.$api[methodKey].refundOrderList(param);

				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			handerTabChange(index) {
				this.activeIndex = index;
				this.$util.showLoading()
				this.param.page = 1;
				this.getList()
			},
			// type: 2同意退款；3拒绝退款
			async toConfirm(index, type) {
				let {
					id,
					apply_price
				} = this.list.data[index] 
				this.popupInfo = {
					index,
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
					index,
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
				let {
					activeIndex
				} = this
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
					if (activeIndex == 0) {
						this.list.data[index].status = type
					} else {
						this.list.data.splice(index, 1)
					}
					this.$util.hideAll()
					this.updateTechnicianItem({
						key: 'haveOperItem',
						val: true
					})
					this.lockTap = false
					if (activeIndex == 0) return
					await this.getList(true)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
					return
				}
			},
			// 订单详情
			goDetail(index, page) {
				let {
					id
				} = this.list.data[index]
				let {
					agent
				} = this.options
				let url = `/agent/pages/refund/${page}?id=${id}&agent=${agent}`
				this.$util.goUrl({
					url
				})
			},
			// 平台
			toTel() {
				let {
					mobile: url
				} = this.configInfo
				this.$util.goUrl({
					url,
					openType: `call`
				})
			}
		}
	}
</script>


<style lang="scss">
</style>