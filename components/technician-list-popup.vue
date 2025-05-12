<template>
	<view class="technician-list-popup">
		<uni-popup ref="technician_item" type="bottom" :zIndex="999">
			<view class="technician-popup fill-base">
				<view class="pd-lg rel"
					:class="[{'flex-center': from=='technician-info'&&showType == 'message' ||  showType == 'technician'},{'flex-warp': showType == 'message'}]">
					<image mode="aspectFill" class="item-avatar radius" :src="info.work_img"></image>
					<!-- <i @tap.stop="$refs.technician_item.close()" class="iconfont icon-close abs"></i> -->
					<view class="flex-1 flex-between ml-md">
						<view>
							<view class="flex-between">
								<view class="flex-y-baseline f-caption c-caption">
									<view class="f-title c-title text-bold mr-sm max-350 ellipsis">
										{{info.coach_name}}
									</view>从业{{info.work_time}}年
								</view>
							</view>
							<view class="flex-y-center f-icontext c-paragraph mt-sm">
								<i class="iconfont iconshimingrenzheng mr-sm" :style="{color:primaryColor}"></i>实名认证
								<i class="iconfont iconzizhirenzheng ml-md mr-sm" :style="{color:primaryColor}"></i>资质认证
							</view>
						</view>
						<view @tap.stop="goInfo" class="flex-y-center f-icontext c-caption"
							v-if="from!=='technician-info'">更多详情<i class="iconfont icon-right"></i></view>
						<!-- <scroll-view scroll-y @touchmove.stop.prevent class="technician-text f-caption c-caption mt-sm"
							v-if="from != 'technician-info' && showType == 'message'">
							{{info.text}}
						</scroll-view> -->
					</view>
				</view>
				<view class="space-sm fill-body"></view>
				<scroll-view scroll-y @touchmove.stop.prevent class="list-content">
					<block v-if="showType == 'technician'">
						<view class="list-item flex-center pd-lg fill-base radius-16" :class="[{'b-1px-t':index != 0}]"
							v-for="(item,index) in serviceList" :key="index">
							<image @tap.stop="goDetail(index)" mode="aspectFill" class="avatar lg radius-16"
								:src="item.cover"></image>
							<view class="flex-1 ml-md">
								<view @tap.stop="goDetail(index)" class="f-title c-title max-510 ellipsis">
									{{item.title}}
								</view>
								<view class="flex-between">
									<view>
										<view class="f-caption c-caption ellipsis" v-if="item.show_salenum">{{item.total_sale}}人已预约</view>
										<view class="flex-y-center f-caption c-caption"><i class="iconfont iconshijian"
												style="font-size:24rpx;margin-right: 5rpx;"
												:style="{color:primaryColor}"></i>{{item.time_long}}分钟
										</view>
									</view>
									<view class="flex-warp">
										<block v-if="item.car_num">
											<button @tap.stop="changeNum(-1,index)" class="reduce"
												:style="{borderColor:primaryColor,color:primaryColor}"><i
													class="iconfont icon-jian-bold"></i></button>
											<button class="addreduce clear-btn">{{item.car_num || 0}}</button>
										</block>
										<button @tap.stop="changeNum(1,index)" class="add"
											:style="{background:primaryColor,borderColor:primaryColor}"><i
												class="iconfont icon-jia-bold"></i></button>
									</view>
								</view>
								<view class="flex-y-center f-desc c-caption ellipsis">
									<view class="flex-y-baseline f-icontext c-warning mr-sm">¥<view class="f-sm-title">
											{{ item.price }}
										</view>
									</view>
									<view class="member-canbuy-level" v-if="item.member_info && item.member_info.title">
										<view class="text flex-center">{{item.member_info.title}}专享</view>
									</view>
								</view>
							</view>
						</view>
					</block>
					<block v-if="showType == 'message'">
						<view class="list-message flex-warp pd-lg" :class="[{'b-1px-t':index!=0}]"
							v-for="(item,index) in commentList.data" :key="index">
							<image mode="aspectFill" class="item-avatar radius" :src="item.avatarUrl"></image>
							<view class="flex-1 ml-md">
								<view class="flex-between">
									<view class="flex-y-center">
										<view class="f-paragraph c-title mr-md max-200 ellipsis">{{item.nickName}}
										</view>
										<view class="flex-warp">
											<i class="iconfont iconyduixingxingshixin icon-font-color"
												:style="{backgroundImage: aindex< item.star?`-webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%)`:`-webkit-linear-gradient(270deg, #f4f6f8 0%, #ccc 100%)`}"
												v-for="(aitem,aindex) in 5" :key="aindex"></i>
										</view>
									</view>
									<view class="f-icontext c-caption">{{item.create_time}}</view>
								</view>
								<view class="flex-warp mt-sm">
									<view class="pt-sm pb-sm pl-md pr-md mt-sm mr-sm radius fill-body f-caption c-desc"
										v-for="(item,index) in item.lable_text" :key="index">{{item}}</view>
								</view>
								<view class="f-caption c-caption mt-md">
									<text decode="emsp" style="word-break:break-all;">{{item.text}}</text>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
				<view style="margin: 0 100rpx;"
					v-if="!loading&&((showType == 'technician' && serviceList&&serviceList.length<=0) || (showType == 'message' && commentList && commentList.data &&commentList.data.length<=0))">
					<abnor></abnor>
				</view>
				<block v-if="showType == 'message' && commentList.last_page > 1">
					<view class="space-lg b-1px-t"></view>
					<view
						@tap.stop="$refs.technician_item.close(),$util.goUrl({url:`/user/pages/comment?id=${info.id}`})"
						class="more-btn flex-center f-paragraph c-base radius"
						style="width:300rpx;height: 80rpx;margin:0 auto" :style="{background:primaryColor}">查看更多
					</view>
					<view class="space-lg"></view>
				</block>
				<view class="flex-between pd-lg b-1px-t" v-if="showType == 'technician' && car_info.car_count > 0">
					<view class="flex-center">合计：<view class="f-title c-warning text-bold ml-sm">¥{{car_info.car_price}}
						</view>
					</view>
					<view @tap.stop="toOrder" class="order-btn flex-center f-desc c-base radius"
						:style="{background: primaryColor}">提交订单
					</view>
				</view>
				<view class="space-safe"></view>
			</view>
		</uni-popup>
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
		props: {
			from: {
				type: String,
				default () {
					return 'list'
				}
			},
			sid: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {
				info: {},
				showType: '',
				car_info: {},
				serviceList: [],
				commentList: [],
				loading: true,
				lockTap: false,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			plugAuth: state => state.config.configInfo.plugAuth,
			userInfo: state => state.user.userInfo,
		}),
		methods: {
			...mapActions([]),
			async toShowPopup(info, key) {
				this.info = info
				this.showType = key
				if (key == 'technician') {
					let {
						is_work = 0,
					} = this.info
					if (!is_work) return
					this.serviceList = []
					await this.getCoachServiceList()
				} else {
					await this.getCommentList()
				}
				this.$refs.technician_item.open()
			},
			async getCommentList() {
				let {
					id: coach_id
				} = this.info
				let param = {
					coach_id,
					page: 1,
				}
				this.commentList = await this.$api.service.commentList(param)
				this.loading = false
			},
			async getCoachServiceList(flag = false) {
				let {
					id: coach_id
				} = this.info
				let {
					data,
					car_count,
					car_price
				} = await this.$api.service.coachServiceList({
					coach_id
				})
				if (!flag) {
					this.serviceList = data
				}
				this.car_info = {
					car_count,
					car_price
				}
				this.loading = false
			},
			// 技-师详情
			goInfo() {
				let {
					id
				} = this.info
				this.$refs.technician_item.close()
				let url = `/user/pages/technician-info?id=${id}`
				this.$util.goUrl({
					url
				})
			},
			// 服务详情
			goDetail(index) {
				let {
					id
				} = this.serviceList[index]
				let {
					sid: store_id = 0
				} = this
				let url = `/user/pages/detail?id=${id}&store_id=${store_id}`
				this.$util.goUrl({
					url
				})
			},
			// 加/减数量
			async changeNum(mol, serInd) {
				let {
					id: coach_id
				} = this.info
				let {
					id: service_id,
					car_num = 0,
					car_id = 0,
					member_info
				} = this.serviceList[serInd]
				let {
					can_buy,
					title
				} = member_info
				if (!can_buy && mol > 0) {
					let msg = title ? title.includes('会员') ? title : `${title}会员` : '会员'
					this.$util.showToast({
						title: `您还不是${msg}`
					})
					return
				}
				if (this.lockTap) return;
				this.lockTap = true;
				let methodModel = mol > 0 ? 'addCar' : 'delCar'
				let param = mol > 0 ? {
					service_id,
					coach_id,
					num: 1
				} : {
					id: car_id,
					num: 1
				}
				if (methodModel == 'delCar' && !param.id) {
					this.lockTap = false
					return
				}
				try {
					let add_car_id = await this.$api.order[methodModel](param)
					this.serviceList[serInd].car_num = car_num + mol
					if (add_car_id && mol > 0 && !car_id) {
						this.serviceList[serInd].car_id = add_car_id
					}
					if (this.serviceList[serInd].car_num < 1) {
						this.serviceList[serInd].car_id = 0
					}
					await this.getCoachServiceList(true)
					this.lockTap = false
				} catch (e) {
					this.lockTap = false
				}
			},
			// 下单
			toOrder() {
				if (this.car_info.car_count < 1) {
					this.$util.showToast({
						title: `请选择服务`
					})
					return
				}
				let {
					id
				} = this.info
				this.$refs.technician_item.close()
				this.$util.goUrl({
					url: `/user/pages/order?id=${id}`
				})
			},
			toEmit(key) {
				this.$emit(key)
			}
		}
	}
</script>

<style scoped lang="scss">
	.technician-list-popup {

		.technician-popup {
			border-radius: 20rpx 20rpx 0 0;

			.item-avatar {
				width: 88rpx;
				height: 88rpx;
				background: #f4f6f8;
			}

			.icon-close {
				font-size: 50rpx;
				top: 30rpx;
				right: 30rpx;
			}

			.iconshimingrenzheng,
			.iconzizhirenzheng,
			.icon-right {
				font-size: 22rpx;
			}

			.technician-text {
				max-height: 150rpx;
			}

			.list-content {
				max-height: 50vh;

				.list-message {
					.item-avatar {
						width: 52rpx;
						height: 52rpx;
						background: #f4f6f8;
					}

					.iconyduixingxingshixin {
						font-size: 28rpx;
						margin-right: 5rpx;
						font-size: 28rpx;
					}
				}
			}

			.order-btn {
				width: 200rpx;
				height: 72rpx;
			}

		}

	}
</style>