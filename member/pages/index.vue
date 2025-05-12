<template>
	<view class="member-index" v-if="isLoad">

		<view class="member-level-list rel">
			<view class="member-level-bg abs"> </view>
			<view class="rel">
				<view class="pd-lg flex-between f-desc" style="color: #5A5753;">
					<view @tap.stop="$util.goUrl({url:`/member/pages/rule`})" class="flex-y-center">查看会员规则<i
							class="iconfont icongengduo"></i></view>
					<view @tap.stop="$util.goUrl({url:`/member/pages/growth`})" class="flex-y-center">
						{{detail.growth_name}}明细<i class="iconfont icongengduo"></i>
					</view>
				</view>

				<view class="member-swiper mt-lg">
					<swiper class="swiper-list" previous-margin="55rpx" next-margin="55rpx" :indicator-dots="false"
						:current="currentIndex" @change="swiperChange">
						<swiper-item class="swiper-item radius-26 rel" v-for="(item, index) in detail.data"
							:key="index">
							<view class="swiper-item has-shadow c-base radius-26"
								:class="[{'has-scale':index!==currentIndex}]" :style="{background: item.color}">
							</view>

							<view class="swiper-item abs" :class="[{'has-scale':index!==currentIndex}]"
								style="top:0;left:0">
								<view class="current-level flex-center f-icontext abs" :style="{color:item.color}"
									v-if="item.id == detail.user_member">
									当前等级</view>

								<view class="flex-between item-child">
									<view style="width: 340rpx;">
										<view class="flex-y-baseline mt-lg" :style="{color:item.color}">
											<view class="vip-icon flex-center rel">
												<i class="iconfont iconvIP1"></i>
												<view class="f-desc flex-center c-base abs">
													v{{index*1+1}}</view>
											</view>
											<view class="f-md-title text-bold ml-sm">{{item.title}}</view>
										</view>
										<view class="f-icontext" style="height:30rpx" :style="{color:item.color}">
											{{detail.user_member == item.id ?'等级有效期: 长期有效':''}}
										</view>
										<view style="height: 45rpx;"></view>
										<view class="f-icontext ellipsis" style="color:#525252 ;height:32rpx">
											<block v-if="detail.user_member && index < detail.data.length-1">
												<block v-if="index < aindex">已是{{detail.data[aindex].title}}</block>
												<block v-else>
													还差{{item.next_growth}}{{detail.growth_name}}升级至{{detail.data[index*1+1].title}}
												</block>
											</block>
											<block v-else>
												<block v-if="item.next_growth">
													还差{{item.next_growth}}{{detail.growth_name}}</block>
												<block v-else>
													已是最高会员等级
												</block>
											</block>
										</view>
										<view class="mb-sm line-bg rel radius" style="margin-top: 15rpx;">
											<view class="line-bg abs radius"
												:style="{width:`${item.percent}%`,background:item.color}"></view>
										</view>
										<view class="f-desc text-bold" style="color: #525252;">
											{{detail.growth}}{{detail.user_member && index < detail.data.length-1 ?  `/${detail.data[index*1+1].growth}` : `/${item.growth}`}}
										</view>
									</view>
									<image class="member-img"
										src="https://lbqny.migugu.com/admin/anmo/member/member.png">
									</image>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<scroll-view scroll-x class="dots-list b-1px-t" :scroll-into-view="scrollNav"
						:scroll-with-animation="true">
						<view class="item-child rel" :id="`scrollNav${index}`"
							:style="{width:detail.data.length < 6 ? (100 / detail.data.length)+'%' : '128rpx'}"
							:class="[{'cur':index===currentIndex}]" v-for="(item,index) in detail.data" :key="index">
							<view class="flex-center flex-column">
								<view class="dot-line abs" :style="{background:primaryColor}"
									v-if="index===currentIndex">
								</view>
								<view class="dot-item flex-center rel">
									<view class="dot-md abs flex-center" style="opacity: 1;z-index:2">
										<view class="dot-sm radius"
											:style="{background:index===currentIndex?primaryColor:''}">
										</view>
									</view>
									<view class="dot-md flex-center radius abs"
										:style="{background:index===currentIndex?primaryColor:''}">
									</view>
								</view>
								<view class="f-caption" :class="[{'f-paragraph text-bold':index===currentIndex}]"
									:style="{color:index===currentIndex?primaryColor:'#D2D2D2'}">
									VIP{{index*1+1}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>


		<view class="mt-lg pl-md pr-md">
			<view class="f-title text-bold mt-lg mb-lg">会员权益</view>
			<view class="common-list" style="padding: 40rpx 28rpx">
				<scroll-view scroll-x @touchmove.stop.prevent class="coupon-list"
					v-if="detail.data[currentIndex].coupon.length>0">
					<view class="item-child rel" :class="[{'ml-md':index!==0}]"
						v-for="(item,index) in detail.data[currentIndex].coupon" :key="index">
						<image class="coupon-bg"
							:src="`https://lbqny.migugu.com/admin/anmo/member/${detail.data[currentIndex].id === detail.user_member ?'coupon_bg':'coupon_bg_rgb'}.png`">
						</image>
						<view class="coupon-bg abs"
							:class="[{'rgba':detail.data[currentIndex].id !== detail.user_member}]">
							<view class="full-text flex-center f-icontext c-warning">
								{{item.full*1>0?`满${item.full}可用`:`立减`}}
							</view>
							<view class="reduce-text flex-center c-warning">
								<view class="flex-y-baseline">
									¥<view class="num">{{item.discount}}</view>
								</view>
							</view>
							<view class="desc-text flex-center f-icontext">通用券×{{item.num}}</view>
							<view class="use-text flex-center f-caption abs">
								{{detail.data[currentIndex].id === detail.user_member ? '已解锁':'待解锁'}}
							</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-x @touchmove.stop.prevent class="rights-list">
					<view @tap.stop="$util.goUrl({url:`/member/pages/rights?ind=${index}`})"
						class="item-child" v-for="(item,index) in detail.data[currentIndex].rights" :key="index">
						<view class="flex-center flex-column">
							<image mode="aspectFill" class="rights-img radius" :src="item.rights_icon">
							</image>
							<view class="text-center f-desc text-bold mt-sm">
								<view class="ellipsis">{{item.show_title}}</view>
							</view>
							<view class="text-center f-caption" style="color: #767676;">
								<view class="ellipsis">
									{{item.key == 'send_coupon' ?  `价值${item.total_discount}元` : item.title}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="f-title text-bold mt-lg mb-lg">下单任务</view>
			<view class="common-list menu-list">
				<view @tap.stop="goDetail(index)" class="item-child flex-center" v-for="(item,index) in menuList"
					:key="index">
					<view class="icon-item flex-center radius">
						<i class="iconfont icon-font-color" :class="item.icon"></i>
					</view>
					<view class="flex-1 flex-between ml-md f-paragraph">
						<view>
							<view class="c-title text-bold">{{item.text}}</view>
							<span class="f-desc">每消费1元，{{detail.growth_name}}
								<span class="num">+{{detail.growth_value}}</span>
							</span>
						</view>
						<view class="order-btn flex-center c-base radius" :style="{background:primaryColor}">
							{{index==2?'去加钟':index==3?'去充值':'去下单'}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="space-footer"></view>
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
				options: {},
				currentIndex: 0,
				scrollNav: 'scrollNav0',
				detail: {},
				aindex: 0,
				menuList: [{
						icon: 'icon-kefuwu',
						text: '服务项目'
					}, {
						icon: 'iconchefei',
						text: '车费'
					},
					{
						icon: 'iconjiazhong',
						text: '加钟'
					},
					{
						icon: 'iconyuechongzhi',
						text: '余额充值'
					}
				],
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		onLoad(options) {
			this.options = options
			this.initIndex()
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
				let data = await this.$api.member.index()
				let {
					user_member = 0,
						growth = 0
				} = data
				growth = growth * 1
				let len = data.data.length
				data.data.map((item, index) => {
					let {
						growth: next_growth
					} = user_member && index < len - 1 ? data.data[index * 1 + 1] : item
					next_growth = next_growth * 1
					item.percent = growth > next_growth ? '100' : (growth / next_growth * 100).toFixed(2)
					item.next_growth = growth > next_growth ? 0 : (next_growth - growth).toFixed(0)
				})
				let ind = data.data.findIndex(item => {
					return item.id === user_member
				})
				let aindex = ind == -1 ? 0 : ind
				this.currentIndex = aindex
				this.aindex = aindex
				this.scrollNav = `scrollNav${this.currentIndex}`
				this.detail = data
				this.isLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.isLoad = false
				this.initIndex(true)
			},
			swiperChange(e) {
				let {
					current
				} = e.detail
				this.currentIndex = current
				this.scrollNav = `scrollNav${current}`
			},
			goDetail(index) {
				let url = index == 2 ? `/pages/order?tab=3` : index == 3 ? `/user/pages/stored/list` : `/pages/technician`
				let openType = index == 3 ? `navigateTo` : `reLaunch`
				this.$util.goUrl({
					url,
					openType
				})
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: #F9FFFF;
	}

	.member-index {
		.member-level-list {
			.member-level-bg {
				top: 0;
				left: 0;
				width: 750rpx;
				height: 349rpx;
				background: linear-gradient(298deg, #DFFBF6 0%, #F7FEED 100%);

			}

			.icongengduo {
				font-size: 24rpx;
			}

			.member-swiper {
				.swiper-list {
					width: 750rpx;
					height: 360rpx;

					.swiper-item {
						width: 640rpx;
						height: 360rpx;
						margin: 0 auto;

						.current-level {
							top: 0;
							left: 0;
							width: 138rpx;
							height: 41rpx;
							background: rgba(255, 255, 255, 0.5);
							box-shadow: 0 17rpx 23rpx 0 rgba(211, 213, 212, 0.29);
							border-radius: 26rpx 0 26rpx 0;
						}

						.item-child {
							height: 360rpx;
							padding: 0 25rpx 0 30rpx;

							.vip-icon {

								.iconvIP1 {
									font-size: 50rpx
								}

								.abs {
									bottom: 0;
									left: 0;
									z-index: 1;
									width: 54rpx;
									height: 30rpx;
								}
							}


							.member-img {
								width: 230rpx;
								height: 230rpx;
							}


							.line-bg {
								width: 340rpx;
								height: 20rpx;
								background: rgba(255, 255, 255, 0.5);
							}

							.line-bg.abs {
								top: 0;
								left: 0;
								// background: linear-gradient(90deg, #3CA866 0%, #BDE7A2 100%);
							}
						}

					}

					.has-shadow {
						opacity: 0.3;
						box-shadow: 0px 17px 23px 0px rgba(211, 213, 212, 0.29);
					}

					.has-scale {
						transform: scale(0.9);
					}
				}

				.dots-list {
					white-space: nowrap;
					width: 640rpx;
					margin: 34rpx auto 36rpx auto;

					.item-child {
						position: relative;
						display: inline-block;

						.dot-line {
							top: 22rpx;
							left: 0;
							width: 100%;
							height: 2rpx;
						}


						.dot-item {
							width: 44rpx;
							height: 44rpx;

							.dot-sm {
								width: 20rpx;
								height: 20rpx;
								background: #F2F2F2;
								border: 1rpx solid #DDDDDD;
								transform: rotateZ(360deg);
							}

							.dot-md {
								top: 0;
								left: 0;
								z-index: 1;
								width: 44rpx;
								height: 44rpx;
							}
						}

					}

					.item-child.cur {

						.dot-sm {
							width: 24rpx;
							height: 24rpx;
							border: none;
						}

						.dot-md {
							opacity: 0.2;
						}
					}



				}

				.dots-list.b-1px-t::before {
					top: 22rpx;
					height: 4rpx;
					border-top: 4rpx solid #eee;
				}

			}


		}





		.common-list {
			width: 710rpx;
			padding: 40rpx 35rpx;
			background: #FFFFFF;
			box-shadow: 0 11rpx 40rpx 0 rgba(202, 218, 205, 0.37);
			border-radius: 24rpx;
		}

		.coupon-list {
			white-space: nowrap;
			margin-bottom: 40rpx;

			.item-child {
				width: 192rpx;
				height: 206rpx;
				display: inline-block;

				.coupon-bg {
					width: 192rpx;
					height: 206rpx;

					.full-text {
						height: 52rpx;
					}

					.reduce-text {
						font-size: 25rpx;
						height: 60rpx;

						.flex-y-baseline {
							height: 60rpx;

							.num {
								font-size: 40rpx;
							}
						}

					}

					.desc-text {
						color: #755C37;
					}

					.use-text {
						width: 100%;
						height: 34rpx;
						color: #7F5427;
						bottom: 12rpx;
					}
				}

				.coupon-bg.abs {
					top: 0;
					left: 0;
					z-index: 1;
				}

				.rgba {
					.c-warning {
						color: rgba(243, 60, 74, 0.5);
					}

					.desc-text {
						color: rgba(117, 92, 55, 0.5);
					}

					.use-text {
						color: rgba(127, 84, 39, 0.5);
					}
				}
			}
		}

		.rights-list {
			white-space: nowrap;

			.item-child {
				width: 163rpx;
				display: inline-block;

				.rights-img {
					width: 98rpx;
					height: 98rpx;
				}

				.ellipsis {
					width: 150rpx;
				}

			}
		}

		.menu-list {

			.item-child {
				margin-top: 40rpx;

				.icon-item {
					width: 89rpx;
					height: 89rpx;
					background: #E9F9F1;

					.iconfont {
						font-size: 50rpx;
						background-image: -webkit-linear-gradient(270deg, #A8F397 0%, #4CC466 100%);
					}
				}

				.flex-between {
					.f-desc {
						color: #636467;

						.num {
							color: #EB5937;
						}
					}
				}

				.order-btn {
					width: 144rpx;
					height: 60rpx;
				}
			}

			.item-child:nth-child(1) {
				margin-top: 0
			}

			.item-child:nth-child(2) {
				.icon-item {
					background: #FDF7E0;

					.iconfont {
						background-image: -webkit-linear-gradient(270deg, #FFCB66 0%, #FFA22A 100%);
					}
				}
			}

			.item-child:nth-child(3) {
				.icon-item {
					background: #FFF6F1;

					.iconfont {
						background-image: -webkit-linear-gradient(270deg, #FF9168 0%, #FF6150 100%);
					}
				}
			}

			.item-child:nth-child(4) {
				.icon-item {
					background: #F1FBF1;

					.iconfont {
						background-image: -webkit-linear-gradient(270deg, #A8F397 0%, #4CC466 100%);
					}
				}
			}
		}
	}
</style>