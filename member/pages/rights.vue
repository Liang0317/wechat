<template>
	<view class="member-rights" v-if="isLoad">
		<fixed>
			<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor">
			</tab>
		</fixed>
		<view class="space-lg"></view>
		<view class="ml-md mr-md fill-base pd-lg" style="border-radius: 24rpx">
			<block v-if="detail.rights_info.key === 'send_coupon' && detail.rights_info.coupon.length>0">
				<view class="flex-y-center mb-lg">
					<view class="f-title c-title text-bold mr-sm">{{detail.rights_info.show_title}}</view>
					<view class="coupon-price flex-y-center f-paragraph">
						<view class="text flex-center">价值</view>
						<view class="num flex-center c-base">{{detail.rights_info.total_discount}}元</view>
					</view>
				</view>
				<scroll-view scroll-x @touchmove.stop.prevent class="coupon-list">
					<view class="item-child rel" :class="[{'ml-md':index!==0}]"
						v-for="(item,index) in detail.rights_info.coupon" :key="index">
						<image class="coupon-bg"
							:src="`https://lbqny.migugu.com/admin/anmo/member/${options.user_member == options.id ?'coupon_bg':'coupon_bg_rgb'}.png`">
						</image>
						<view class="coupon-bg abs" :class="[{'rgba':options.user_member != options.id}]">
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
								{{options.user_member == options.id ? '已解锁':'待解锁'}}
							</view>
						</view>
					</view>
				</scroll-view>
			</block>

			<block v-if="detail.rights_info.key !== 'send_coupon'">
				<view class="f-title c-title text-bold">{{detail.rights_info.show_title}}</view>
				<view class="rights-info flex-between" :class="keyType[detail.rights_info.key]">
					<view>
						<image class="font-img"
							:src="`https://lbqny.migugu.com/admin/anmo/member/${keyType[detail.rights_info.key]}1.png`">
						</image>
						<view class="text">
							当前等级
							<block v-if="['customer_service','first_refund'].includes(detail.rights_info.key)">
								{{options.user_member && detail.level_id.includes(options.user_member)?'已':'未'}}
							</block>
							<block v-else>
								{{options.user_member == options.id?'已':'未'}}
							</block>
							解锁
						</view>
					</view>
					<image class="fuwu-img"
						:src="`https://lbqny.migugu.com/admin/anmo/member/${keyType[detail.rights_info.key]}2.png`">
					</image>
				</view>
			</block>

			<view class="f-title c-title text-bold">权益介绍</view>
			<view class="f-desc c-paragraph mt-lg" style="margin-bottom: 70rpx;">
				<text decode="emsp"
					style="word-break:break-all;">{{detail.rights_info.rights_text || '没有填写权益介绍哦'}}</text>
			</view>
			<view class="f-title c-title text-bold mb-lg">权益适用等级</view>
			<view class="level-list mt-lg">
				<view class="item-child flex-center f-desc">
					<view class="text flex-center b-1px-r">等级</view>
					<view class="num flex-center">对应权益</view>
				</view>
				<view class="item-child flex-center f-desc b-1px-t" v-for="(item,index) in detail.level_list"
					:key="index">
					<view class="text flex-center b-1px-r">{{item.title}}</view>
					<view class="num flex-center">
						{{['customer_service','first_refund'].includes(detail.rights_info.key) ? detail.rights_info.show_title : detail.rights_info.key == 'send_coupon' ? `${item.total_discount}元` : `${item.service_count}项专属服务项目`}}
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
				keyType: {
					customer_service: 'kefu',
					appoint_service: 'fuwu',
					first_refund: 'tuikuan'
				},
				tabList: [],
				activeIndex: 0,
				detail: {},
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor
		}),
		onLoad(options) {
			let {
				ind
			} = options
			let {
				currentIndex,
				detail
			} = this.$util.getPage(-1)
			let {
				user_member
			} = detail
			let {
				id,
				rights
			} = detail.data[currentIndex]
			let arr = rights.map(item => {
				return {
					id: item.rights_id,
					title: item.show_title
				}
			})
			this.tabList = arr
			this.activeIndex = ind
			let {
				rights_id
			} = rights[ind]
			let params = Object.assign({}, options, {
				id,
				rights_id,
				user_member
			})
			this.options = params
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
				let param = this.$util.pick(this.options, ['id', 'rights_id'])
				let data = await this.$api.member.rightsInfo(param)
				let arr = data.level_list.map(item => {
					return item.id
				})
				data.level_id = arr
				this.detail = data
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.isLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			handerTabChange(index) {
				this.activeIndex = index;
				let {
					id
				} = this.tabList[index]
				this.options.rights_id = id
				this.$util.showLoading()
				this.initIndex(true)
			},
		}
	}
</script>


<style lang="scss">
	.member-rights {
		.coupon-price {
			.text {
				width: 79rpx;
				height: 40rpx;
				border: 1rpx solid #FF7700;
				border-radius: 8rpx 0 0 8rpx;
				transform: rotateZ(360deg);
			}

			.num {
				min-width: 99rpx;
				height: 40rpx;
				padding: 0 8rpx;
				background: #FF7700;
				border: 1rpx soldi #FF7700;
				border-radius: 0 8rpx 8rpx 0;
				transform: rotateZ(360deg);
			}
		}

		.wait-btn {
			width: 152rpx;
			height: 50rpx;
		}


		.coupon-list {
			white-space: nowrap;
			margin-bottom: 70rpx;

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

		.rights-info {
			width: 650rpx;
			height: 220rpx;
			padding: 40rpx;
			margin: 37rpx 0 70rpx 0;
			background: linear-gradient(177deg, #FFE295 0%, #FAF2DC 100%);
			border-radius: 16rpx;


			.font-img {
				width: 190rpx;
				height: 62rpx;
			}

			.fuwu-img {
				width: 184rpx;
				height: 184rpx;
			}

			.text {
				font-size: 25rpx;
				color: #B9741E;
				margin-top: 5rpx;
			}
		}

		.rights-info.tuikuan {
			background: linear-gradient(177deg, #F4D9D3 0%, #FAECDC 100%);

			.text {
				color: #EB7474;
			}
		}

		.rights-info.kefu {
			background: linear-gradient(148deg, #D3F4DF 0%, #D4F2CB 100%);

			.text {
				color: #00B804;
			}
		}


		.level-list {
			width: 650rpx;
			background: linear-gradient(180deg, #FFF7E8 0%, #FFFCF7 100%);
			border-radius: 16rpx;

			.item-child {
				height: 77rpx;

				.text {
					width: 45%;
					height: 77rpx;
					color: #000;
				}

				.num {
					width: 55%;
					height: 77rpx;
					color: #714D45;
				}
			}

			.item-child:nth-child(1) {

				.text,
				.num {
					color: #723820;
				}
			}

			.b-1px-t::before {
				border-top: 1px solid #F2ECDF;
				color: #F2ECDF;
			}

			.b-1px-r::after {
				border-right: 1px solid #F2ECDF;
				color: #F2ECDF;
			}
		}
	}
</style>