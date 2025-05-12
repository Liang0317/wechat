<template>
	<view class="agent-index" v-if="isLoad">
		<block v-if="options.agent">
			<view class="mine-count-list c-base pd-lg radius-16" :style="{background:primaryColor}">
				<view class="flex-between">
					<view>
						<view class="text f-caption">可提现金额</view>
						<view class="f-sm-title">¥{{detail.cash}} </view>
					</view>
					<view @tap.stop="$util.goUrl({url:`/user/pages/cash-out?type=agent`})"
						class="cash-out-btn fill-base flex-center f-desc text-bold radius"
						:style="{color: primaryColor}">
						我要提现
					</view>
				</view>
				<view class="count-data-list flex-x-center mt-lg pt-lg b-1px-t">
					<view class="list-item flex-center flex-column">
						<view class="f-sm-title">¥{{detail.total_cash}}</view>
						<view class="text f-caption c-caption">总金额 (不含手续费)</view>
					</view>
					<view class="list-item flex-center flex-column">
						<view class="f-sm-title">¥{{detail.unrecorded_cash}}</view>
						<view @tap.stop="$refs.show_rule_item.open()" class="text flex-center f-caption c-caption">未入账<i
								class="iconfont iconwentifankui3 ml-sm" style="font-size: 28rpx;"></i></view>
					</view>
				</view>
			</view>

			<view @tap.stop="$util.goUrl({url:`/agent/pages/poster/technician`})"
				class="mine-menu-list share flex-center fill-base radius-16">
				<view class="icon-info flex-center">
					<i class="iconfont iconjishi1" :style="{color:primaryColor}"></i>
				</view>
				<view class="flex-1">
					<view class="f-mini-title c-title text-bold">绑定{{$t('action.attendantName')}}</view>
					<view class="f-desc c-caption mt-sm ellipsis">整合自己的{{$t('action.attendantName')}}资源,获取分润</view>
				</view>
				<view class="share-btn flex-center f-desc c-base text-bold" :style="{background:primaryColor}">邀请Ta
				</view>
			</view>
			<view @tap.stop="$util.goUrl({url:`/agent/pages/poster/salesman`})"
				class="mine-menu-list share flex-center fill-base radius-16" v-if="detail.salesman_auth">
				<view class="icon-info flex-center">
					<i class="iconfont iconbangdingyewuyuan" :style="{color:primaryColor}"></i>
				</view>
				<view class="flex-1">
					<view class="f-mini-title c-title text-bold">绑定业务员</view>
					<view class="f-desc c-caption mt-sm ellipsis">招揽人才,为自己拓宽渠道</view>
				</view>
				<view class="share-btn flex-center f-desc c-base text-bold" :style="{background:primaryColor}">邀请Ta
				</view>
			</view>
			<view @tap.stop="$util.goUrl({url:`/agent/pages/poster/channel`})"
				class="mine-menu-list share flex-center fill-base radius-16" v-if="detail.channel_auth">
				<view class="icon-info flex-center">
					<i class="iconfont iconbangdingqudaoshang" :style="{color:primaryColor}"></i>
				</view>
				<view class="flex-1">
					<view class="f-mini-title c-title text-bold">绑定{{$t('action.channelName')}}</view>
					<view class="f-desc c-caption mt-sm ellipsis">直招渠道,获利更多</view>
				</view>
				<view class="share-btn flex-center f-desc c-base text-bold" :style="{background:primaryColor}">邀请Ta
				</view>
			</view>
			<view @tap.stop="$util.goUrl({url:`/agent/pages/poster/distribution`})"
				class="mine-menu-list share flex-center fill-base radius-16" v-if="detail.reseller_auth">
				<view class="icon-info flex-center">
					<i class="iconfont iconbangdingfenxiaoyuan" :style="{color:primaryColor}"></i>
				</view>
				<view class="flex-1">
					<view class="f-mini-title c-title text-bold">绑定分销员</view>
					<view class="f-desc c-caption mt-sm ellipsis">让专业的人帮你拉新用户</view>
				</view>
				<view class="share-btn flex-center f-desc c-base text-bold" :style="{background:primaryColor}">邀请Ta
				</view>
			</view>
		</block>

		<view class="mine-menu-list fill-base radius-16">
			<view class="menu-title flex-between pl-lg pr-sm">
				<view class="f-paragraph c-title text-bold">智能助手</view>
			</view>
			<view @tap.stop="goOrder(index)" class="notice-info flex-center pl-lg pr-md pb-lg"
				v-for="(item,index) in detail.notice" :key="index">
				<view class="title flex-center f-icontext c-base mr-md"
					:style="{background:item.type==1?primaryColor: item.type==2?'#FFA229':'#E82F21'}">
					{{noticeType[item.type].title}}
				</view>
				<view class="flex-1 flex-between f-desc">
					<view class="c-title">{{item.id ? noticeType[item.type].text : '暂无数据'}}</view>
					<view class="flex-y-center c-caption" v-if="item.id">点击查看<i class="iconfont icon-right"></i></view>
				</view>
			</view>
		</view>

		<view class="mine-menu-list box-shadow fill-base radius-16" v-if="detail.node.includes('shopOrder')">
			<view class="menu-title flex-between pl-lg pr-sm">
				<view class="f-paragraph c-title text-bold">订单管理</view>
			</view>
			<view class="flex-warp pb-lg">
				<view @tap.stop="toJump('shopOrder', index)"
					class="item-child flex-center flex-column f-caption c-title" v-for="(item, index) in shopOrder"
					:key="index">
					<view class="item-img rel flex-center radius">
						<view class="abs dot-unread-number flex-center"
							:style="{width: item.number>99 ? '44rpx': item.number > 9 ? '34rpx' :'',right: item.number>99 ? '-32rpx': item.number > 9 ? '-22rpx' :'-12rpx'}"
							v-if="item.number > 0">
							{{item.number < 100 ? item.number : '99+'}}
						</view>
						<view class="item-img radius abs" :style="{background:primaryColor}"></view>
						<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
					</view>
					<view class="mt-sm">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<view class="mine-menu-list box-shadow fill-base radius-16" v-if="detail.node.includes('shopBellOrder')">
			<view class="menu-title flex-between pl-lg pr-sm">
				<view class="f-paragraph c-title text-bold">加钟管理</view>
			</view>
			<view class="flex-warp pb-lg">
				<view @tap.stop="toJump('shopBellOrder', index)"
					class="item-child flex-center flex-column f-caption c-title" v-for="(item, index) in shopBellOrder"
					:key="index">
					<view class="item-img rel flex-center radius">
						<view class="abs dot-unread-number flex-center"
							:style="{width: item.number>99 ? '44rpx': item.number > 9 ? '34rpx' :'',right: item.number>99 ? '-32rpx': item.number > 9 ? '-22rpx' :'-12rpx'}"
							v-if="item.number > 0">
							{{item.number < 100 ? item.number : '99+'}}
						</view>
						<view class="item-img radius abs" :style="{background:primaryColor}"></view>
						<image mode="heightFix" class="icon-img" :src="item.icon"></image>
					</view>
					<view class="mt-sm">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<view class="mine-menu-list box-shadow fill-base radius-16" v-if="detail.node.includes('shopRefuseOrder')">
			<view class="menu-title flex-between pl-lg pr-sm">
				<view class="f-paragraph c-title text-bold">拒单管理</view>
			</view>
			<view class="flex-warp pb-lg">
				<view @tap.stop="toJump('shopRefuseOrder', index)"
					class="item-child flex-center flex-column f-caption c-title"
					v-for="(item, index) in shopRefuseOrder" :key="index">
					<view class="item-img rel flex-center radius">
						<view class="abs dot-unread-number flex-center"
							:style="{width: item.number>99 ? '44rpx': item.number > 9 ? '34rpx' :'',right: item.number>99 ? '-32rpx': item.number > 9 ? '-22rpx' :'-12rpx'}"
							v-if="item.number > 0">
							{{item.number < 100 ? item.number : '99+'}}
						</view>
						<view class="item-img radius abs" :style="{background:primaryColor}"></view>
						<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
					</view>
					<view class="mt-sm">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<view class="mine-menu-list box-shadow fill-base radius-16" v-if="detail.node.includes('shopRefund')">
			<view class="menu-title flex-between pl-lg pr-sm">
				<view class="f-paragraph c-title text-bold">服务退款</view>
			</view>
			<view class="flex-warp pb-lg">
				<view @tap.stop="toJump('shopRefund', index)"
					class="item-child flex-center flex-column f-caption c-title" v-for="(item, index) in shopRefund"
					:key="index">
					<view class="item-img rel flex-center radius">
						<view class="abs dot-unread-number flex-center"
							:style="{width: item.number>99 ? '44rpx': item.number > 9 ? '34rpx' :'',right: item.number>99 ? '-32rpx': item.number > 9 ? '-22rpx' :'-12rpx'}"
							v-if="item.number > 0">
							{{item.number < 100 ? item.number : '99+'}}
						</view>
						<view class="item-img radius abs" :style="{background:primaryColor}"></view>
						<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
					</view>
					<view class="mt-sm">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<view class="mine-menu-list box-shadow fill-base radius-16" v-if="detail.node.includes('shopBellRefund')">
			<view class="menu-title flex-between pl-lg pr-sm">
				<view class="f-paragraph c-title text-bold">加钟退款</view>
			</view>
			<view class="flex-warp pb-lg">
				<view @tap.stop="toJump('shopBellRefund', index)"
					class="item-child flex-center flex-column f-caption c-title" v-for="(item, index) in shopBellRefund"
					:key="index">
					<view class="item-img rel flex-center radius">
						<view class="abs dot-unread-number flex-center"
							:style="{width: item.number>99 ? '44rpx': item.number > 9 ? '34rpx' :'',right: item.number>99 ? '-32rpx': item.number > 9 ? '-22rpx' :'-12rpx'}"
							v-if="item.number > 0">
							{{item.number < 100 ? item.number : '99+'}}
						</view>
						<view class="item-img radius abs" :style="{background:primaryColor}"></view>
						<image mode="heightFix" class="icon-img" :src="item.icon"></image>
					</view>
					<view class="mt-sm">{{ item.text }}</view>
				</view>
			</view>
		</view>


		<view class="mine-menu-list fill-base radius-16" v-if="options.agent">
			<view class="menu-title flex-between pl-lg pr-sm">
				<view class="f-paragraph c-title text-bold">其他功能</view>
			</view>
			<view class="flex-warp pb-sm">
				<view @tap.stop="toJump('toolList', index)" class="item-child flex-center flex-column f-caption c-title"
					style="width: 25%;margin:10rpx 0 20rpx 0" v-for="(item, index) in toolList" :key="index">
					<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
					<view class="mt-sm">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<view class="space-footer"></view>


		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">未入账</view>
				<view class="f-desc c-title mt-lg">
					平台未到账的服务订单金额，不含手续费
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_rule_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
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
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				isLoad: false,
				options: {},
				detail: {},
				noticeType: {
					1: {
						title: '订单通知',
						text: '您有新的订单来啦!'
					},
					2: {
						title: '退款通知',
						text: '您有新的客户退款通知!'
					},
					3: {
						title: '拒单通知',
						text: '有' + this.$t('action.attendantName') + '拒单, 请尽快处理!'
					},
				},
				shopOrder: [{
					icon: 'icondaifuwu4',
					text: '待接单',
					url: '/agent/pages/order/list?tab=2',
					key: 2,
					number: 0
				}, {
					icon: 'iconjishijiedan1',
					text: '已接单',
					url: '/agent/pages/order/list?tab=3',
					key: 3,
					number: 0
				}, {
					icon: 'iconjishichufa1',
					text: '已出发',
					url: '/agent/pages/order/list?tab=4',
					key: 4,
					number: 0
				}, {
					icon: 'iconjishidaoda1',
					text: '已到达',
					url: '/agent/pages/order/list?tab=5',
					key: 5,
					number: 0
				}, {
					icon: 'iconanmo2',
					text: '服务中',
					url: '/agent/pages/order/list?tab=6',
					key: 6,
					number: 0
				}, {
					icon: 'iconyiwancheng',
					text: '已完成',
					url: '/agent/pages/order/list?tab=7'
				}],
				shopBellOrder: [{
					icon: 'https://lbqny.migugu.com/admin/anmo/menu/daifuwu.png',
					text: '待接单',
					url: '/agent/pages/order/list?bell=1&tab=2',
					key: 2,
					number: 0
				}, {
					icon: 'https://lbqny.migugu.com/admin/anmo/menu/jiedan.png',
					text: '已接单',
					url: '/agent/pages/order/list?bell=1&tab=3',
					key: 3,
					number: 0
				}, {
					icon: 'https://lbqny.migugu.com/admin/anmo/menu/fuwuzhong.png',
					text: '服务中',
					url: '/agent/pages/order/list?bell=1&tab=4',
					key: 6,
					number: 0
				}, {
					icon: 'https://lbqny.migugu.com/admin/anmo/menu/wancheng.png',
					text: '已完成',
					url: '/agent/pages/order/list?bell=1&tab=5',
				}],
				shopRefuseOrder: [{
					icon: 'icondaizhuandan',
					text: '待转单',
					url: '/agent/pages/order/list?tab=8',
					key: 8,
					number: 0
				}],
				shopRefund: [{
					icon: 'iconshenqingzhong',
					text: '待退款',
					url: '/agent/pages/refund/list?tab=1',
					key: 1,
					number: 0
				}, {
					icon: 'icontongyituikuan',
					text: '同意退款',
					url: '/agent/pages/refund/list?tab=2',
					key: 2,
					number: 0
				}, {
					icon: 'iconjujuetuikuan',
					text: '拒绝退款',
					url: '/agent/pages/refund/list?tab=3',
					key: 3,
					number: 0
				}],
				shopBellRefund: [{
					icon: 'https://lbqny.migugu.com/admin/anmo/menu/shenqingzhong.png',
					text: '待退款',
					url: '/agent/pages/refund/list?bell=1&tab=1',
					key: 1,
					number: 0
				}, {
					icon: 'https://lbqny.migugu.com/admin/anmo/menu/tongyi.png',
					text: '同意退款',
					url: '/agent/pages/refund/list?bell=1&tab=2',
					key: 2,
					number: 0
				}, {
					icon: 'https://lbqny.migugu.com/admin/anmo/menu/jujue.png',
					text: '拒绝退款',
					url: '/agent/pages/refund/list?bell=1&tab=3',
					key: 3,
					number: 0
				}],
				toolList: [{
						icon: 'iconzhanghaoshezhi',
						text: '账号设置',
						url: '/agent/pages/account'
					}, {
						icon: 'iconshenqingjishi3',
						text: this.$t('action.attendantName') + '管理',
						url: '/agent/pages/technician/list'
					},
					{
						icon: 'iconyongjinxinxi1',
						text: '佣金信息',
						url: '/agent/pages/income/commission'
					},
					{
						icon: 'icontixianshenqing1',
						text: '提现申请',
						url: '/user/pages/distribution/record?type=5'
					}
				],
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			haveOperItem: state => state.technician.haveOperItem,
		}),
		onLoad(options) {
			let {
				agent = 0
			} = options
			options.agent = agent * 1
			this.options = options
			uni.setNavigationBarTitle({
				title: agent == 1 ? '代理商端' : '管理员端'
			})
			this.initIndex()
		},
		onShow() {
			if (!this.haveOperItem) return
			this.initRefresh()
		},
		onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif
			this.initRefresh();
			uni.stopPullDownRefresh()
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
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.$util.showLoading()
				this.updateTechnicianItem({
					key: 'haveOperItem',
					val: false
				})
				let {
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				let data = await this.$api[methodKey].index()
				if (agent) {
					data.node = ['shopOrder', 'shopBellOrder', 'shopRefuseOrder', 'shopRefund', 'shopBellRefund']
				}
				let {
					notice
				} = data
				let {
					order_id,
					refund_id,
					refuse_id
				} = notice
				if (order_id && order_id.length == 0) {
					order_id = {
						type: 1
					}
				}
				if (refund_id && refund_id.length == 0) {
					refund_id = {
						type: 2
					}
				}
				if (refuse_id && refuse_id.length == 0) {
					refuse_id = {
						type: 3
					}
				}
				let arr = []
				if (data.node.includes('shopOrder') || data.node.includes('shopBellOrder')) {
					arr.push(order_id)
				}
				if (data.node.includes('shopRefund') || data.node.includes('shopBellRefund')) {
					arr.push(refund_id)
				}
				if (data.node.includes('shopRefuseOrder')) {
					arr.push(refuse_id)
				}
				data.notice = arr
				this.shopOrder.map(item => {
					if (item.key) {
						item.number = data.order_count[item.key]
					}
				})
				this.shopBellOrder.map(item => {
					if (item.key) {
						item.number = data.add_count[item.key]
					}
				})
				this.shopRefuseOrder.map(item => {
					if (item.key) {
						item.number = data.refuse_order[item.key]
					}
				})
				this.shopRefund.map(item => {
					if (item.key) {
						item.number = data.refund_count[item.key]
					}
				})
				this.shopBellRefund.map(item => {
					if (item.key) {
						item.number = data.add_refund_count[item.key]
					}
				})
				this.detail = data
				this.isLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			toJump(key, index) {
				let {
					url
				} = this[key][index]
				let {
					agent
				} = this.options
				let joinKey = url.includes('?') ? '&' : '?'
				url += `${joinKey}agent=${agent}`
				this.$util.goUrl({
					url
				})
			},
			async goOrder(index) {
				let {
					id = 0,
						order_id = 0,
						type
				} = this.detail.notice[index]
				if (!order_id) return
				let {
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				await this.$api[methodKey].noticeUpdate({
					id,
					have_look: 1,
					is_pop: 1
				})
				this.initRefresh()
				let page = type == 2 ? 'refund' : 'order'
				let url = type === 3 ? `/agent/pages/order/change?id=${order_id}&agent=${agent}` :
					`/agent/pages/${page}/detail?id=${order_id}&agent=${agent}`
				this.$util.goUrl({
					url
				})
			}
		}
	}
</script>


<style lang="scss">
	.agent-index {

		.mine-count-list {
			width: 710rpx;
			height: 295rpx;
			margin: 20rpx 20rpx 0 20rpx;

			.text {
				color: rgba(255, 255, 255, 0.6)
			}

			.cash-out-btn {
				width: 180rpx;
				height: 70rpx;
			}

			.count-data-list {
				.list-item {
					width: 50%;
				}
			}
		}

		.dot-unread-number {
			top: 0;
			right: 0;
			width: 24rpx;
			height: 24rpx;
			line-height: 24rpx;
			text-align: center;
			color: #fff;
			font-size: 18rpx;
			border-radius: 24rpx;
			background-color: #F1381F;
		}

		// 我的订单/其他
		.mine-menu-list {
			margin: 20rpx 20rpx 0 20rpx;

			.menu-title {
				height: 90rpx;
				color: #434343;

				.iconfont {
					font-size: 24rpx;
				}
			}

			.icon-info {
				width: 80rpx;
				height: 80rpx;
				background: #FFFFFF;
				box-shadow: 0 3rpx 31rpx -2rpx rgba(217, 224, 219, 0.5);
				border-radius: 29rpx;
				margin-right: 16rpx;

				.iconfont {
					font-size: 48rpx;
				}
			}

			.share-btn {
				width: 130rpx;
				height: 52rpx;
				border-radius: 8rpx;
			}

			.notice-info {
				.title {
					width: 100rpx;
					height: 34rpx;
					border-radius: 4rpx;
				}

				.iconfont {
					font-size: 20rpx;
				}
			}

			.item-child {
				width: 25%;
				margin: 10rpx 0;

				.iconfont {
					font-size: 52rpx;
				}

				.item-img {
					width: 60rpx;
					height: 60rpx;

					.iconfont {
						font-size: 36rpx;
					}

					.item-img {
						top: 0;
						left: 0;
						opacity: 0.1;
					}
				}

				.icon-img {
					height: 32rpx;
				}
			}
		}

		.mine-menu-list.share {
			padding: 30rpx 30rpx 30rpx 20rpx;
		}

	}
</style>