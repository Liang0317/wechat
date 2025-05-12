<template>
	<view class="pages-home rel" v-if="detail.id">
		<!-- #ifdef H5 -->
		<view @tap="$util.goUrl({url:`/pages/service`,openType:`reLaunch`})" class="abs"
			:class="[{'back-user-ios': configInfo.isIos},{'back-user-android': !configInfo.isIos}]"
			style="margin-top:25rpx;z-index: 1;" v-if="options.pid">
			<view class="iconshouye iconfont"></view>
			<view class="back-user_text">回到首页</view>
		</view>
		<!-- #endif -->
		<banner :list="detail.imgs" :margin="0" :autoplay="true" :height="562" :indicatorActiveColor="primaryColor">
		</banner>
		<view class="fill-base pd-lg">
			<view :class="[{'flex-between':detail.show_salenum}]">
				<view class="f-title c-title" :class="[{'max-500':detail.show_salenum}]">{{detail.title}}</view>
				<view class="f-desc c-caption" v-if="detail.show_salenum">{{detail.total_sale}}人已预约</view>
			</view>
			<view class="flex-y-baseline f-desc c-caption mt-sm">
				<view class="flex-y-center flex-1">
					<view class="f-md-title c-warning mr-sm">¥{{detail.price}}</view>
					<view class="member-canbuy-level" v-if="detail.member_info && detail.member_info.title">
						<view class="text flex-center">{{detail.member_info.title}}专享</view>
					</view>
				</view>
				<view class="flex-y-center f-icontext"><i class="iconfont iconshijian"
						style="font-size:24rpx;margin-right: 5rpx;"
						:style="{color:primaryColor}"></i>{{detail.time_long}}分钟
				</view>
			</view>
		</view>

		<view class="space-md"></view>
		<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
			width="33.3%" height="100rpx"></tab>
		<view class="space-md"></view>
		<view class="fill-base pd-lg f-paragraph c-desc">
			<view class="c-title text-bold mb-md">{{tabList[activeIndex].title}}</view>
			<parser :html="detail[rule[activeIndex]]" @linkpress="linkpress" show-with-animation lazy-load>加载中...
			</parser>
		</view>

		<view class="space-max-footer"></view>

		<fix-bottom-button
			@confirm="$util.toCheckMemberBuy({url:`/user/pages/choose-technician?id=${options.id}&store_id=${options.store_id}`},detail.member_info)"
			:text="[{type:'confirm',text:`选择${$t('action.attendantName')}`,isAuth:true}]" bgColor="#fff">
		</fix-bottom-button>

		<!-- #ifdef APP-PLUS -->
		<view @tap.stop="toAppShare"
			class="common-share-btn detail fix flex-center flex-column c-base box-shadow radius"
			:style="{background:primaryColor}" v-if="userInfo.id">
			<i class="iconfont iconweixin"></i>
			<view class="f-icontext">分享</view>
		</view>
		<view class="space-max-footer"></view>
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
	import parser from "@/components/jyf-Parser/index"
	export default {
		components: {
			parser
		},
		data() {
			return {
				options: {},
				activeIndex: 0,
				tabList: [{
					title: '项目介绍',
					id: 0
				}, {
					title: '禁忌说明',
					id: 1,
				}, {
					title: '下单须知',
					id: 2
				}],
				rule: {
					0: 'introduce',
					1: 'explain',
					2: 'notice'
				},
				detail: {},
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			isGzhLogin: state => state.user.isGzhLogin,
		}),
		onLoad(options) {
			this.$util.showLoading()
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
		onShareAppMessage(e) {
			let {
				id: pid = 0
			} = this.userInfo
			let {
				id,
				title,
				cover: imageUrl
			} = this.detail
			let path = `/user/pages/detail?pid=${pid}&id=${id}`
			this.$util.log(path)
			return {
				title,
				imageUrl,
				path,
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo']),
			...mapMutations([]),
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
				await this.getDetail()
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					setTimeout(() => {
						this.toAppShare()
					}, 1200)
				}
				// #endif
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
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
				} = this.detail
				let summary = ''

				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/user/pages/detail?id=${id}&pid=${pid}`

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
				this.detail = await this.$api.service.serviceInfo({
					id
				});
				this.$util.hideAll()
			},
			handerTabChange(index) {
				this.activeIndex = index;
			},
			linkpress(res) {
				// #ifdef APP-PLUS
				this.$util.goUrl({
					url: res.href,
					openType: 'web'
				})
				// #endif
			},
		}
	}
</script>


<style lang="scss">
	.pages-home {
		.list-item {
			.item-btn {
				width: 129rpx;
				height: 54rpx;
			}
		}
	}
</style>