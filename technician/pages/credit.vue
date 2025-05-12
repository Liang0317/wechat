<template>
	<view class="technician-credit-score" v-if="isLoad">
		<view class="credit-score-count f-desc c-base abs" :style="{background:primaryColor}">
			<image class="credit-bg abs" src="https://lbqny.migugu.com/admin/anmo/mine/credit-bg.png"></image>
			<view @tap.stop="$refs.show_rule_item.open()" class="rule-btn flex-center f-desc c-base abs">规则说明</view>
			<view class="flex-center abs" style="width:100%;height:580rpx">
				<view class="score-bg rel flex-center flex-column">
					<image class="score-bg abs" src="https://lbqny.migugu.com/admin/anmo/mine/credit-score-bg.png">
					</image>
					<view class="score-text text-bold mb-sm">{{list.credit_value}}</view>
					<view class="mb-md">信用分</view>
				</view>
			</view>
			<view class="credit-bg">
				<view class="flex-center flex-column">
					<view class="space-md"></view>
					<i class="iconfont iconweiguijilu mb-sm"></i>
					<view>收入积累</view>
				</view>
				<view class="flex-between mt-md" style="height:296rpx">
					<view class="flex-center flex-column" style="width:44%">
						<i class="iconfont iconshourujilei mb-sm"></i>
						<view>亲和力</view>
					</view>
					<view class="flex-center flex-column" style="width:44%">
						<i class="iconfont iconqinheli mb-sm"></i>
						<view>勤奋值</view>
					</view>
				</view>
				<view class="flex-center flex-column mt-md" style="height:120rpx">
					<i class="iconfont iconqinfenzhi mb-sm"></i>
					<view>违规记录</view>
				</view>
			</view>
		</view>
		<view class="rel">
			<view style="height: 566rpx;"></view>
			<view class="count-list fill-base mt-md ml-md mr-md radius-20 rel">
				<view class="count-bg abs"
					:style="{background:`linear-gradient(180deg, ${primaryColor} 0%, rgba(255,255,255,0) 100%)`}">
				</view>
				<view class="flex-y-center pd-lg f-mini-title c-title text-bold">
					<view class="line radius mr-md" :style="{background:primaryColor}"></view>四维数据解读
				</view>
				<view class="pd-lg">
					<view class="flex-warp f-paragraph">
						<view class="title flex-y-center">
							<i class="iconfont iconxulie mr-sm"></i>
							<view class="c-title text-bold">收入积累</view>
						</view>
						<view class="text c-paragraph">
							包含主订单、加钟订单、复购订单的金额值
						</view>
					</view>
					<view class="flex-warp f-paragraph mt-lg">
						<view class="title flex-y-center">
							<i class="iconfont iconxulie mr-sm"></i>
							<view class="c-title text-bold">勤奋值</view>
						</view>
						<view class="text c-paragraph">
							服务时长分钟数积累
						</view>
					</view>
					<view class="flex-warp f-paragraph mt-lg">
						<view class="title flex-y-center">
							<i class="iconfont iconxulie mr-sm"></i>
							<view class="c-title text-bold">亲和力</view>
						</view>
						<view class="text c-paragraph">
							用户的好评数量累计
						</view>
					</view>
					<view class="flex-warp f-paragraph mt-lg">
						<view class="title flex-y-center">
							<i class="iconfont iconxulie mr-sm"></i>
							<view class="c-title text-bold">违规记录</view>
						</view>
						<view class="text c-paragraph">
							包含退单、拒单行为和差评记录
						</view>
					</view>
				</view>
			</view>
			<view class="count-list fill-base mt-md ml-md mr-md radius-20 rel">
				<view class="count-bg abs"
					:style="{background:`linear-gradient(180deg, ${primaryColor} 0%, rgba(255,255,255,0) 100%)`}">
				</view>
				<view class="flex-y-center pd-lg f-mini-title c-title text-bold">
					<view class="line radius mr-md" :style="{background:primaryColor}"></view>信用分记录
				</view>
				<view class="flex-warp pd-lg" v-for="(item,index) in list.data" :key="index">
					<view class="icon-info flex-center radius"
						:style="{background:orderType[item.type][1] ==='违规记录'? orderType[item.type][3]:primaryColor}">
						<i class="iconfont c-base" :class="orderType[item.type][0]"></i>
					</view>
					<view class="flex-1 ml-md">
						<view class="flex-between">
							<view>
								<view class="f-mini-title c-title text-bold" style="line-height: 34rpx;">
									{{orderType[item.type][1]}}
								</view>
								<view class="f-desc c-caption mt-sm">
									{{item.type === 3 ? `完成一笔服务订单，增加时长${item.order_price}分钟` : orderType[item.type][2]}}
								</view>
							</view>
							<view class="f-title text-bold ml-lg" :style="{color:orderType[item.type][3]}">
								{{orderType[item.type][1] ==='违规记录'?'':'+'}}{{item.value}}
							</view>
						</view>
						<view class="f-desc c-caption" style="margin-top: 5rpx;">{{item.create_time}}</view>
					</view>
				</view>
				<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading"
					v-if="loading">
				</load-more>
				<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

			</view>
		</view>
		<view class="space-footer"></view>

		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34" style="width:700rpx">
				<view class="title">规则说明</view>
				<view class="f-desc c-title mt-lg" style="width:100%;max-height: 55vh;overflow: auto;">
					<text decode="emsp" style="word-break:break-all;">{{list.config.text}}</text>
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
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				orderType: {
					1: ['iconweiguijilu', '收入积累', '完成一笔主服务订单', '#000'],
					2: ['iconweiguijilu', '收入积累', '完成一笔加钟订单', '#000'],
					3: ['iconqinheli', '勤奋值', '', '#000'],
					4: ['iconweiguijilu', '收入积累', '促成一笔复购单', '#000'],
					5: ['iconshourujilei', '亲和力', '收到一个好评', '#000'],
					6: ['iconqinfenzhi', '违规记录', '用户退单一笔', '#E93B2E'],
					7: ['iconqinfenzhi', '违规记录', `${this.$t('action.attendantName')}拒单一笔`, '#E93B2E'],
					8: ['iconqinfenzhi', '违规记录', '用户差评一个', '#E93B2E']
				},
				param: {
					page: 1,
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
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad() {
			this.initIndex()
		},
		// #ifdef H5
		destroyed() {
			this.$util.back()
		},
		// #endif
		// #ifndef H5
		onUnload() {
			this.$util.back()
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
				this.$util.showLoading()
				await this.getList()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.isLoad = true
				this.$util.hideAll()
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
					activeIndex
				} = this
				let param = this.$util.deepCopy(this.param)
				let newList = await this.$api.technician.getCreditValueData(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
		}
	}
</script>


<style lang="scss">
	.technician-credit-score {
		.credit-score-count {
			width: 750rpx;
			height: 664rpx;
			top: 0;
			border-radius: 0 0 18rpx 18rpx;

			.credit-bg {
				width: 100%;
				height: 100%;
				top: 0;
			}

			.score-bg {
				width: 298rpx;
				height: 296rpx;

				.score-text {
					font-size: 50rpx;
					height: 54rpx;
				}
			}

			.rule-btn {
				top: 38rpx;
				right: 0;
				width: 145rpx;
				height: 54rpx;
				border-radius: 54rpx 0 0 54rpx;
				background: rgba(255, 255, 255, 0.2);
				z-index: 2;
			}

			.iconfont {
				font-size: 46rpx;
			}
		}

		.count-list {
			.count-bg {
				width: 100%;
				height: 188rpx;
				top: 0;
				left: 0;
				opacity: 0.2;
				border-radius: 20rpx 20rpx 0 0;
			}

			.line {
				width: 6rpx;
				height: 28rpx;
			}

			.title {
				width: 190rpx;
				height: 40rpx;

				.iconfont {
					font-size: 24rpx;
					margin-top: 2rpx;
				}
			}

			.text {
				width: calc(100% - 190rpx);
			}

			.icon-info {
				width: 80rpx;
				height: 80rpx;

				.iconfont {
					font-size: 40rpx;
				}
			}
		}
	}
</style>