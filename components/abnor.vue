<template>
	<view class="abnor" :style="{paddingBottom: percent}">
		<view class="abnor-box">
			<image mode="aspectFit" class="abnor-image" v-if="pimage" :src="pimage"></image>
			<view class="abnor-text" v-if="ptitle">{{ptitle}}</view>
			<view @tap.stop="emitAbnorTipTap" class="abnor-tip" :class="[{'tip-flex':!tipMax}]"
				:style="{maxWidth:tipMax,textAlign:tipMax?'left':''}" v-if="ptip">
				<text v-for="(item,index) in ptip" :key="index"
					:style="{color:item.color == 1 ? primaryColor:''}">{{item.text}}</text>
			</view>
			<block v-if="pbutton">
				<block v-for="(item,index) in pbutton" :key="index">
					<view class="abnor-btn" :class="btnSize"
						:style="{background:item.type == 'confirm' ? primaryColor : '',color:item.type == 'confirm'?'white':''}"
						@tap.stop="emitAbnorTap(index)">{{item.text}}</view>
				</block>
			</block>
		</view>
	</view>
</template>


<script>
	const Types = {
		'REQUEST_ERROR': {
			image: 'https://lbqny.migugu.com/admin/public/request-error.png',
			title: '',
			button: [{
				text: '点击刷新',
				type: 'confirm'
			}],
			tip: [{
				text: '网络加载失败~',
				color: 0
			}]
		},
		'NOT_FOUND': {
			image: 'https://lbqny.migugu.com/admin/public/not-found.png',
			title: '',
			button: [{
				text: '返回',
				type: 'confirm'
			}],
			tip: [{
				text: '很抱歉，找不到您要访问的页面~',
				color: 0
			}]
		},
		'DATA': {
			image: 'https://lbqny.migugu.com/admin/anmo/technician/no_data.png',
			// image: 'https://lbqny.migugu.com/admin/public/no-data-2.png',
			title: '',
			button: [],
			tip: [{
				text: '没有相关数据哦~',
				color: 0
			}]
		},
		'NOT_AUTH': {
			image: 'https://lbqny.migugu.com/admin/anmo/technician/no_data.png',
			title: '',
			button: [],
			tip: [{
				text: '当前页面没有权限~',
				color: 0
			}]
		},
		'NOT_LOCATION': {
			image: 'https://lbqny.migugu.com/admin/anmo/technician/no_data.png',
			title: '',
			button: [],
			tip: [{
				text: '定位失败，请开启地理位置授权后刷新页面重试~',
				color: 0
			}]
		},
		'FOLLOW': {
			image: 'https://lbqny.migugu.com/admin/public/no-follow.png',
			title: '关注有趣的人',
			button: [],
			tip: [{
				text: '不再错过他们每一条动态~',
				color: 0
			}]
		},
		'FEED': {
			image: 'https://lbqny.migugu.com/admin/public/no-feed.png',
			title: '',
			button: [],
			tip: [{
				text: '还没有任何反馈哦~',
				color: 0
			}]
		},
		'SHOP': {
			image: 'https://lbqny.migugu.com/admin/public/no-shop.png',
			title: '',
			button: [],
			tip: [{
				text: '稍后再来试试吧~',
				color: 0
			}]
		},
		'WEIBO': {
			image: 'https://lbqny.migugu.com/admin/public/no-weibo.png',
			title: '',
			button: [],
			tip: []
		},
		'SEARCH': {
			image: 'https://lbqny.migugu.com/admin/public/no-search.png',
			title: '',
			button: [],
			tip: [{
				text: '抱歉！没找到相关商品~',
				color: 0
			}]
		},
		'TAG': {
			image: 'https://lbqny.migugu.com/admin/public/no-tag.png',
			title: '',
			button: [],
			tip: []
		},
		'MESSAGE': {
			image: 'https://lbqny.migugu.com/admin/public/no-message.png',
			title: '',
			button: [],
			tip: [{
				text: '消息通知空空如也~',
				color: 0
			}]
		},
		'LIVE': {
			image: 'https://lbqny.migugu.com/admin/public/no-live.png',
			title: '',
			button: [],
			tip: []
		},
		'ORDER': {
			image: 'https://lbqny.migugu.com/admin/public/no-order.png',
			title: "",
			button: [],
			tip: [{
				text: '还没有相关订单哦~',
				color: 0
			}]
		},
		'CART': {
			image: 'https://lbqny.migugu.com/admin/public/no-car.png',
			title: '',
			button: [{
				text: '去逛逛',
				type: 'confirm'
			}],
			button: [],
			tip: [{
				text: '购物车还是空的哦~',
				color: 0
			}]
		},
		'FOOTPRINT': {
			image: 'https://lbqny.migugu.com/admin/public/no-footprint.png',
			title: '',
			button: [],
			tip: [{
				text: '您还没有足迹~',
				color: 0
			}]
		},
		'COUPON': {
			image: 'https://lbqny.migugu.com/admin/public/no-coupon.png',
			title: '',
			button: [],
			tip: [{
				text: '您还没有可用的卡券哦~',
				color: 0
			}]
		},
		'REDUCTION': {
			image: 'https://lbqny.migugu.com/admin/reduction/nodata.png',
			title: '',
			button: [],
			tip: [{
				text: '您当前没有满减券，请向工作人员索取~',
				color: 0
			}]
		},
		'MYTEAM': {
			image: 'https://lbqny.migugu.com/admin/public/no-coupon.png',
			title: '',
			button: [],
			tip: [{
				text: '没有更多了~',
				color: 0
			}]
		}
	}
	import {
		mapState,
		mapActions,
	} from 'vuex';
	export default {
		name: 'abnor',
		props: {
			type: {
				type: String,
				default () {
					return 'DATA'
				}
			},
			image: {
				type: String,
				default () {
					return ''
				}
			},
			title: {
				type: String,
				default () {
					return ''
				}
			},
			tip: {
				type: Array,
				default () {
					return []
				}
			},
			button: {
				type: Array,
				default () {
					return []
				}
			},
			tipTap: {
				type: String,
				default () {
					return ''
				}
			},
			tipMax: {
				type: String,
				default () {
					return '100%'
				}
			},
			btnSize: {
				type: String,
				default () {
					return 'big'
				}
			},
			percent: {
				type: String,
				default () {
					return '100%'
				}
			},
		},
		created() {
			this.init();
		},
		data() {
			return {
				pimage: '',
				ptitle: '',
				ptip: '',
				pbutton: ''
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		methods: {
			emitAbnorTipTap() {
				let {
					tipTap = ''
				} = this
				if (!tipTap) return
				this.$emit(tipTap);
			},
			emitAbnorTap(index) {
				let {
					type
				} = this.pbutton[index]
				this.$emit(type);
			},
			init() {
				let type = this.type;
				if (Types[type]) {
					this.pimage = this.image || Types[type].image;
					this.ptitle = this.title || Types[type].title;
					this.pbutton = this.button && this.button.length > 0 ? this.button : Types[type].button;
					this.ptip = this.tip && this.tip.length > 0 ? this.tip : Types[type].tip;
				}
			}
		},
	}
</script>

<style lang="scss">
	.abnor {
		position: relative;
		display: block;
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		overflow: hidden;

		.abnor-box {
			position: absolute;
			display: flex;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.abnor-image {
				width: 514rpx;
				height: 260rpx;
				background: transparent;
			}

			.abnor-text {
				margin-top: 30rpx;
				color: #333;
				font-size: 28rpx;
				font-weight: bold;
			}

			.abnor-tip {
				margin: 10rpx 0;
				color: #999;
				font-size: 26rpx;
				text-align: center;
				max-height: 30vh;
				overflow: auto;
			}

			.tip-flex {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}

			.abnor-btn {
				min-width: 228rpx;
				height: 66rpx;
				margin-top: 30rpx;
				padding: 0 30rpx;
				background-color: #eee;
				border: 0 none;
				border-radius: 10rpx;
				color: #333;
				font-size: 28rpx;
				text-align: center;
				// overflow: hidden;
				line-height: 66rpx;
			}

			.abnor-btn.big {
				width: 690rpx;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 32rpx;
				margin-top: 40rpx;
				border-radius: 50rpx;
			}
		}
	}
</style>