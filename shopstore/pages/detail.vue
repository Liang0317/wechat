<template>
	<view class="shopstore-detail order-pages rel" v-if="detail.info && detail.info.id">
		<image @tap.stop="$util.previewImage({current:detail.info.cover,urls:[detail.info.cover]})" mode="aspectFill"
			class="cover-img" :src="detail.info.cover">
		</image>
		<view class="pd-lg fill-base">
			<view class="f-md-title c-black text-bold">{{detail.info.title || '-'}}</view>
			<view @tap.stop="$util.goUrl({url:`/shopstore/pages/store-info?id=${options.id}`})"
				class="flex-between pt-lg pb-lg b-1px-b">
				<view class="flex-y-center" style="color: #303030;">
					<i class="iconfont iconyingyezhizhao mr-sm"></i>
					营业执照：<view class="max-450 ellipsis">{{detail.info.attestation}}</view>
				</view>
				<i class="iconfont icon-right" style="font-size: 20rpx;"></i>
			</view>
			<view class="pt-lg pb-lg">
				<view class="flex-y-center" style="color: #303030;">
					<i class="iconfont iconyingyeshijian mr-sm"></i>
					营业时间：<view class="max-450 ellipsis">
						{{detail.info.start_time && detail.info.end_time ?`${detail.info.start_time} - ${detail.info.end_time}`:'暂未设置'}}
					</view>
				</view>
			</view>
			<view class="store-info flex-between pb-sm">
				<view class="flex-y-center" style="color: #303030;">
					<i class="iconfont icondizhi1 mr-sm"></i>
					<view class="c-title flex-1 mr-md">
						<span>{{detail.info.address || `暂未设置门店地址`}}</span>
						<span @tap.stop="toCopy(detail.info.address)"
							class="copy-btn span radius-5 f-icontext ml-sm"
							:style="{color:primaryColor,borderColor:primaryColor}" v-if="detail.info.address">复制</span>
					</view>
				</view>
				<view class="flex-center">
					<view @tap.stop="$util.goUrl({url:detail.info.phone,openType:'call'})"
						class="item-icon rel flex-center radius-16">
						<view class="item-icon radius-16 abs" :style="{background:primaryColor}"></view>
						<i class="iconfont icondadianhua_1" :style="{color:primaryColor}"></i>
					</view>
					<view @tap.stop="toMap" class="item-icon rel flex-center radius-16 ml-md"
						v-if="detail.info.address">
						<view class="item-icon radius-16 abs" :style="{background:primaryColor}"></view>
						<i class="iconfont icondizhi_1" :style="{color:primaryColor}"></i>
					</view>
				</view>
			</view>
		</view>

		<view class="fill-base mt-md pt-lg pb-lg">
			<view @tap.stop="$util.goUrl({url: `/shopstore/pages/service?id=${options.id}`})"
				class="flex-between pl-lg pr-md " :class="[{'pb-lg': detail.service_list.length>0}]">
				<view class="f-paragraph c-black text-bold">推荐项目</view>
				<view class="flex-y-center f-caption c-caption">查看更多<i class="iconfont icongengduo"
						style="font-size: 24rpx;"></i></view>
			</view>


			<view class="pl-lg pr-lg" :class="[{'mt-md':index!=0},{'pb-md':index!=detail.service_list.length-1}]"
				v-for="(item,index) in detail.service_list" :key="index">
				<service-list-item :info="item" :sid="options.id" maxWidth="490rpx"></service-list-item>
			</view>

		</view>

		<view class="fill-base mt-md pt-lg pl-lg pr-md pb-lg">
			<view @tap.stop="$util.goUrl({url: `/shopstore/pages/technician?id=${options.id}`})" class="flex-between"
				:class="[{'pb-lg':detail.coach_list.length > 0}]">
				<view class="f-paragraph c-black text-bold">{{$t('action.attendantName')}}展示</view>
				<view class="flex-y-center f-caption c-caption">查看更多<i class="iconfont icongengduo"
						style="font-size: 24rpx;"></i></view>
			</view>
			<scroll-view scroll-x class="recommend-technician">
				<view @tap.stop="toTechnician(index)" class="recommend-item" v-for="(item,index) in detail.coach_list"
					:key="index">
					<!-- #ifdef H5 -->
					<view class="cover radius">
						<view class="h5-image cover radius" :style="{ backgroundImage : `url('${item.work_img}')`}">
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" lazy-load class="cover radius" :src="item.work_img"></image>
					<!-- #endif -->
					<view class="flex-center f-desc c-title mt-md">
						<view class="ellipsis">{{item.coach_name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="fill-base pl-lg pr-lg">
			<view class="comment-item flex-warp pt-lg" :class="[{'mt-md':index==0},{'b-1px-t':index!=0}]"
				v-for="(item,index) in list.data" :key="index">
				<image mode="aspectFill" class="avatar radius" :src="item.avatarUrl"></image>
				<view class="flex-1 mt-sm ml-md pb-lg">
					<view class="flex-between">
						<view class="flex-y-center">
							<view class="f-paragraph c-title mr-md max-200 ellipsis">{{item.nickName}}</view>
							<view class="flex-warp">
								<i class="iconfont iconpingfen1 icon-font-color"
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
			<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading"
				v-if="loading">
			</load-more>
		</view>

		<view class="space-footer"></view>

		<!-- #ifdef APP-PLUS -->
		<view @tap.stop="toAppShare"
			class="common-share-btn detail fix flex-center flex-column c-base box-shadow radius"
			:style="{background:primaryColor}" v-if="userInfo.id">
			<i class="iconfont iconweixin"></i>
			<view class="f-icontext">分享</view>
		</view>
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
	import siteInfo from '@/siteinfo.js';
	import serviceListItem from "@/components/service-list-item.vue"
	export default {
		components: {
			serviceListItem
		},
		data() {
			return {
				options: {},
				detail: {},
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
		onReachBottom() {
			if (this.list.current_page >= this.list.last_page || this.loading) return;
			this.param.page = this.param.page + 1;
			this.loading = true;
			this.getList();
		},
		onShareAppMessage(e) {
			let {
				id: pid = 0
			} = this.userInfo
			let {
				id,
				title,
				cover: imageUrl
			} = this.detail.info
			let path = `/shopstore/pages/detail?pid=${pid}&id=${id}`
			this.$util.log(path)
			return {
				title,
				imageUrl,
				path,
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo']),
			...mapMutations(['updateTechnicianItem']),
			async initIndex(refresh = false) {
				let {
					pid = 0
				} = this.options
				let {
					isGzhLogin
				} = this
				let {
					id: uid = 0
				} = this.userInfo
				if (pid && !uid) {
					// #ifdef H5
					if (isGzhLogin) {
						setTimeout(() => {
							this.getUserInfo()
						}, 1000)
					} else {
						this.getUserInfo()
					}
					// #endif
					// #ifndef H5
					await this.getUserInfo()
					// #endif 
				}
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				await Promise.all(this.getDetail(), this.getList())
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					setTimeout(() => {
						this.toAppShare()
					}, 1200)
				}
				// #endif
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			toAppShare() {
				let {
					id: pid = 0
				} = this.userInfo
				let {
					id,
					title,
					cover: imageUrl
				} = this.detail.info
				let summary = ''

				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/shopstore/pages/detail?id=${id}&pid=${pid}`

				// #ifdef H5
				this.$jweixin.wxReady(() => {
					this.$jweixin.showOptionMenu()
					this.$jweixin.shareAppMessage(title, summary, href, imageUrl)
					this.$jweixin.shareTimelineMessage(title, href, imageUrl)
				})
				// #endif
				// #ifdef APP-PLUS
				uni.share({
					provider: "weixin",
					scene: 'WXSceneSession',
					type: 0,
					href,
					title,
					summary,
					imageUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
				// #endif
			},
			async getDetail() {
				let {
					id
				} = this.options
				let data = await this.$api.shopstore.storeInfo({
					id
				})
				this.detail = data
				this.$util.hideAll()
			},
			async getList() {
				let {
					list: oldList,
					param,
				} = this
				let {
					id
				} = this.options
				param.id = id
				let newList = await this.$api.shopstore.commentList(param);

				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			// 查看定位
			async toMap() {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				let {
					address,
					lat,
					lng
				} = this.detail.info
				await this.$util.checkAuth({
					type: 'userLocation'
				})
				await uni.getLocation({
					type: 'gcj02',
				})
				await uni.openLocation({
					latitude: lat * 1,
					longitude: lng * 1,
					name: address,
					scale: 28
				})
			},
			toTechnician(index) {
				let {
					id,
					city_id,
					coach_name
				} = this.detail.coach_list[index]
				this.updateTechnicianItem({
					key: 'pageActive',
					val: false
				})
				this.$util.goUrl({
					url: `/pages/technician?coach_id=${id}&coach_name=${coach_name}&city_id=${city_id}`,
					openType: `reLaunch`
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
	.shopstore-detail {
		.cover-img {
			width: 750rpx;
			height: 417rpx;
		}

		.iconyingyezhizhao,
		.iconyingyeshijian,
		.icondizhi1 {
			color: #A2A2A2;
		}

		.recommend-technician {
			white-space: nowrap;
			width: 690rpx;

			.recommend-item {
				width: 133rpx;
				margin-left: 30rpx;
				display: inline-block;

				.cover {
					width: 133rpx;
					height: 133rpx;
				}

				.ellipsis {
					max-width: 133rpx;
				}
			}

			.recommend-item:nth-child(1) {
				margin-left: 0;
			}
		}

		.comment-item {
			.avatar {
				width: 52rpx;
				height: 52rpx;
				background: #f4f6f8;
			}

			.iconpingfen1 {
				font-size: 28rpx;
				margin-right: 5rpx;
				font-size: 28rpx;
			}
		}

	}
</style>