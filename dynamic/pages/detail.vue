<template>
	<view class="dynamic-detail rel" v-if="detail.id">
		<block v-if="detail.status == 2 && detail.coach_info.status === 2">
			<!-- #ifdef H5 -->
			<view @tap="$util.goUrl({url:`/pages/service`})" class="abs"
				:class="[{'back-user-ios': configInfo.isIos},{'back-user-android': !configInfo.isIos}]"
				style="margin-top:25rpx;z-index: 999;" v-if="options.pid">
				<view class="iconshouye iconfont"></view>
				<view class="back-user_text">回到首页</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<uni-nav-bar :fixed="true" :shadow="false" :statusBar="true"
				:leftIcon="options.pid ? 'iconshouye11' : 'icon-left'" :title="detail.type == 1?'动态详情':' '"
				color="#ffffff" :backgroundColor="detail.type == 1?primaryColor:'none'">
			</uni-nav-bar>
			<view :style="{height:`${configInfo.navBarHeight}px`}" v-if="detail.type == 1"></view>
			<!-- #endif -->

			<block v-if="detail.type == 1">
				<view class="banner-info rel">
					<!-- #ifdef H5 -->
					<view @tap.stop="$refs.show_item.open()" class="menu-info flex-center c-base abs radius"
						v-if="!detail.is_shield">
						<i class="iconfont icon-caidan"></i>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<view @tap.stop="$refs.show_item.open()" class="menu-info flex-center c-base abs radius">
						<i class="iconfont icon-caidan"></i>
					</view>
					<!-- #endif -->
					<banner @change="goBanner" :list="detail.imgs" :margin="0" :autoplay="true"
						:indicatorActiveColor="primaryColor" :dotWidth="20" :dotBottom="30" :height="654"
						v-if="detail.imgs.length > 0">
					</banner>
				</view>
				<view class="pd-lg fill-base">
					<view class="dynamic-info flex-center">
						<image mode="aspectFill" class="avatar radius" :src="detail.coach_info.work_img"></image>
						<view class="flex-1 ml-md">
							<view class="flex-between">
								<view>
									<view class="f-mini-title c-black text-bold max-270 ellipsis">
										{{detail.coach_info.coach_name}}
									</view>
									<view class="flex-y-center f-icontext c-caption mt-sm"
										:style="{color:detail.coach_info.work_status == 4 ? '' :primaryColor}"><i
											class="iconfont" :class="[iconType[detail.coach_info.work_status]]"
											style="font-size: 24rpx;margin-right:5rpx"></i>{{textType[detail.coach_info.work_status]}}
									</view>
								</view>
								<view class="flex-y-center f-caption">
									<view @tap.stop="toShowPopup('technician')"
										class="app-follow-btn flex-center radius"
										:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">预约</view>
									<view @tap.stop="toChangeItem(1)" class="app-follow-btn flex-center radius ml-md"
										:style="{background:detail.follow_status ? primaryColor:'#fff',color:detail.follow_status ? '#fff' :primaryColor,border:`1rpx solid ${primaryColor}`}">
										<i class="iconfont icon-jia-bold"
											v-if="!detail.follow_status"></i>{{detail.follow_status?'已关注':'关注'}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="f-mini-title c-black text-bold mt-lg">{{detail.title}}</view>
					<view class="dynamic-content f-paragraph mt-lg mb-lg">
						<span v-if="!showText">
							<span>{{detail.text.substring(0,42) + '...'}}</span>
							<span @tap.stop="toShowHide('showText')" class="pl-md" :style="{color:primaryColor}"
								v-if="detail.have_show_text">
								展开
								<text class="iconfont iconxia ml-sm" style="font-size: 24rpx;"></text>
							</span>
						</span>
						<block v-if="showText">
							<view>
								<text decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
							</view>
							<span @tap.stop="toShowHide('showText')" class="mt-sm" :style="{color:primaryColor}"
								v-if="detail.have_show_text">
								收起
								<text class="iconfont iconshang ml-sm" style="font-size: 24rpx;"></text>
							</span>
						</block>
					</view>
					<view class="flex-between">
						<view class="f-caption c-caption">{{detail.friend_time}}</view>
						<view class="flex-y-center f-desc c-desc"> <i class="iconfont iconjuli"
								:style="{color:primaryColor}"></i>
							{{detail.distance}}
						</view>
					</view>
				</view>
				<view class="space-md"></view>
				<view class="comment-list-info pl-lg pr-lg fill-base">
					<view class="flex-y-center f-mini-title c-title text-bold b-1px-b" style="height: 95rpx;">全部评论
					</view>
					<view class="no-data-item flex-center mt-lg" v-if="list.data.length == 0">
						<image mode="aspectFill" class="avatar radius"
							src="https://lbqny.migugu.com/admin/anmo/mine/dynamic-user.png">
						</image>
						<view class="text flex-1 flex-y-center ml-md pl-lg f-icontext radius">评论千万条, 礼貌第一条</view>
					</view>
					<view @longpress="toDel(index)" class="list-item flex-warp pt-lg" v-for="(item,index) in list.data"
						:key="index">
						<image mode="aspectFill" class="avatar-img radius" :src="item.avatarUrl"></image>
						<view class="flex-1 ml-md pb-lg" :class="[{'b-1px-b':index != list.total-1}]">
							<view class="flex-between" style="height: 72rpx;">
								<view class="text flex-y-center f-caption">
									<view class="max-380 ellipsis">{{item.nickName}}</view>
									<view class="examine-btn flex-center f-icontext ml-md radius" v-if="item.status==1">
										审核中
									</view>
								</view>
								<view class="f-icontext c-caption">{{item.friend_time}}</view>
							</view>
							<view class="comment f-paragraph mt-sm"> {{item.text}} </view>
						</view>
					</view>
				</view>
				<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading"
					v-if="loading">
				</load-more>
				<view class="space-max-footer"></view>
			</block>
			<block v-if="detail.type == 2">
				<view class="video-box rel">
					<!-- #ifdef H5 -->
					<view @tap.stop="$refs.show_item.open()" class="menu-info type-video flex-center c-title abs radius"
						:style="{top:videoNavHeight}" v-if="!detail.is_shield">
						<!-- #endif -->
						<!-- #ifndef H5 -->
						<view @tap.stop="$refs.show_item.open()"
							class="menu-info type-video flex-center c-title abs radius" :style="{top:videoNavHeight}">
							<!-- #endif -->
							<i class="iconfont icon-caidan"></i>
						</view>
						<view class="video-poster rel" v-show="!isPlay && videoContexts == null">
							<image mode="aspectFill" class="video-poster" :src="detail.cover"></image>
							<view @tap.stop="playAndPauseVideo" class="video-poster flex-center abs">
								<view class="play-video flex-center c-base radius">
									<i class="iconfont icon-play-video"></i>
								</view>
							</view>
						</view>
						<!-- #ifdef APP-PLUS -->
						<video :id="`video_${detail.id}`" class="video_item" :controls="true" :src="detail.imgs[0]"
							@play="onPlay" @pause="onPause" @ended="onEnded" @timeupdate="onTimeUpdate"
							@waiting="onWaiting" @progress="onProgress" @loadedmetadata="onLoadedMetaData"
							@fullscreenchange="screenChange" v-show="isPlay">
						</video>
						<!-- #endif -->
						<!-- #ifndef APP-PLUS -->
						<video @tap.stop="playAndPauseVideo" :id="`video_${detail.id}`" class="video_item" :loop="false"
							enable-play-gesture enable-progress-gesture :show-center-play-btn="true" :controls="false"
							:src="detail.imgs[0]" object-fit="contain" @play="onPlay" @pause="onPause" @ended="onEnded"
							@timeupdate="onTimeUpdate" @waiting="onWaiting" @progress="onProgress"
							@loadedmetadata="onLoadedMetaData" v-show="isPlay">
						</video>
						<!-- #endif -->
					</view>
			</block>

			<fixed position="bottom" zIndex="994">
				<view class="bottom-info" :class="[{'b-1px-t': detail.type == 1},{'type-video': detail.type == 2}]">
					<block v-if="detail.type == 2">
						<view class="dynamic-info flex-center pd-lg">
							<image mode="aspectFill" class="avatar radius" :src="detail.coach_info.work_img"></image>
							<view class="flex-1 flex-y-center ml-sm c-base">
								<view class="f-paragraph text-bold ellipsis"
									:style="{maxWidth: detail.coach_info.is_work ? '270rpx' :'370rpx'}">
									{{detail.coach_info.coach_name}}
								</view>
								<view class="flex-y-center f-icontext ml-sm"><i class="iconfont"
										:class="[iconType[detail.coach_info.work_status]]"
										style="font-size: 24rpx;margin-right:5rpx"></i>{{textType[detail.coach_info.work_status]}}
								</view>
								<view class="flex-y-center f-caption">
									<view @tap.stop="toShowPopup('technician')"
										class="app-follow-btn flex-center radius ml-sm">预约
									</view>
									<view @tap.stop="toChangeItem(1)" class="app-follow-btn flex-center radius ml-sm"
										:style="{background:detail.follow_status ? primaryColor:'',border: detail.follow_status ? `1rpx solid ${primaryColor}`:``}">
										<i class="iconfont icon-jia-bold"
											v-if="!detail.follow_status"></i>{{detail.follow_status?'已关注':'关注'}}
									</view>
								</view>
							</view>
						</view>
						<view class="pl-lg pr-lg c-base">
							<view class="f-mini-title text-bold pb-lg">{{detail.title}}</view>
							<view class="dynamic-content f-paragraph pb-lg">
								<span v-if="!showText">
									<span class="c-base">{{detail.text.substring(0,42) + '...'}}</span>
									<span @tap.stop="toShowHide('showText')" class="pl-md" :style="{color:primaryColor}"
										v-if="detail.have_show_text">
										展开
										<text class="iconfont iconxia ml-sm" style="font-size: 24rpx;"></text>
									</span>
								</span>
								<block v-if="showText">
									<view>
										<text decode="emsp" class="c-base"
											style="word-break:break-all;">{{detail.text}}</text>
									</view>
									<span @tap.stop="toShowHide('showText')" class="mt-sm" :style="{color:primaryColor}"
										v-if="detail.have_show_text">
										收起
										<text class="iconfont iconshang ml-sm" style="font-size: 24rpx;"></text>
									</span>
								</block>
							</view>
							<view class="flex-between pb-lg">
								<view class="f-caption">{{detail.friend_time}}</view>
								<view class="flex-y-center f-desc"> <i class="iconfont iconjuli"></i>
									{{detail.distance}}
								</view>
							</view>
						</view>
					</block>
					<view class="comment-thumbs-info flex-between f-caption pl-lg pr-lg"
						:class="[{'fill-black':detail.type == 2}]">
						<view @tap.stop="toChangeItem(3)" class="input-text flex-y-center radius">
							<i class="iconfont icon-edit ml-md mr-sm"></i>
							<input class="input" type="text" placeholder="说点什么..." :disabled="true" />
						</view>
						<view class="flex-y-center">
							<view @tap.stop="toChangeItem(2)" class="thumbs-comment-btn flex-y-center">
								<i class="iconfont"
									:class="[{'icon-shoucang':!detail.thumbs_status},{'icon-shoucang-fill':detail.thumbs_status}]"
									:style="{color:detail.thumbs_status?primaryColor:''}"></i>
								{{!detail.thumbs_num ? '点赞' : detail.thumbs_num}}
							</view>
							<view @tap.stop="toChangeItem(3)" class="thumbs-comment-btn flex-y-center pl-lg">
								<i class="iconfont icon-pinglun"></i>
								{{!detail.comment_num ? '评论' : detail.comment_num}}
							</view>
						</view>
					</view>
					<view class="space-safe" :class="[{'fill-black':detail.type == 2}]"></view>
				</view>
			</fixed>
		</block>
		<block v-else>
			<!-- #ifndef H5 -->
			<uni-nav-bar :fixed="true" :shadow="false" :statusBar="true"
				:leftIcon="options.pid ? 'iconshouye11' : 'icon-left'" title="动态详情" color="#ffffff"
				:backgroundColor="primaryColor">
			</uni-nav-bar>
			<view :style="{height:`${configInfo.navBarHeight}px`}"></view>
			<!-- #endif -->
			<view>
				<abnor :tip="[{ text: detail.status === 1 ? '该动态正在审核中' :'该动态不存在', color: 0 }]">
				</abnor>
			</view>
		</block>

		<common-popup @confirm="confirmDel" ref="del_item" type="DELETE_ORDER" title="删除评论" desc="请确认是否删除评论，删除后将无法恢复"
			:info="popupInfo"></common-popup>

		<!-- 操作项 -->
		<uni-popup ref="show_item" type="bottom">
			<view class="show-popup pd-lg">
				<view class="flex-center mb-lg">
					<image mode="aspectFill" class="avatar radius" :src="detail.coach_info.work_img"></image>
					<view class="flex-1 ml-md f-title c-black">{{detail.coach_info.coach_name}}</view>
				</view>
				<view @tap.stop="toChangeItem(4)" class="show-item flex-center f-paragraph text-bold mt-md radius-16"
					v-if="!detail.is_shield">
					不想看Ta的作品
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="clear-btn show-item flex-center f-paragraph text-bold"
					style="margin-top: 20rpx;border-radius: 16rpx;">分享该动态</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view @tap.stop="toAppShare" class="show-item flex-center f-paragraph text-bold mt-md radius-16">分享该动态
				</view>
				<!-- #endif -->
				<view @tap.stop="$refs.show_item.close()"
					class="show-item flex-center f-paragraph text-bold mt-md radius-16" :style="{color:primaryColor}">取消
				</view>
				<view class="space-safe"></view>
			</view>
		</uni-popup>

		<!-- 查看全部评论 -->
		<uni-popup ref="comment_item" type="bottom" :zIndex="995">
			<view class="comment-popup fill-base rel">
				<block v-if="detail.type == 2">
					<i @tap.stop="$refs.comment_item.close()" class="iconfont icon-add rotate-45 abs"
						style="z-index: 997;"></i>
					<view class="flex-center f-mini-title c-title text-bold ml-lg mr-lg pt-lg pb-lg b-1px-b">全部评论
					</view>
					<scroll-view scroll-y @scrolltolower="scrolltolower" :scroll-with-animation="true"
						lower-threshold="100" class="scroll-list">
						<view class="no-data-item flex-center pd-lg" v-if="list.data.length == 0">
							<image mode="aspectFill" class="avatar radius"
								src="https://lbqny.migugu.com/admin/anmo/mine/dynamic-user.png">
							</image>
							<view class="text flex-1 flex-y-center ml-md pl-lg f-icontext radius">评论千万条, 礼貌第一条</view>
						</view>
						<view @longpress="toDel(index)" class="list-item flex-warp pt-lg pl-lg pr-lg"
							v-for="(item,index) in list.data" :key="index">
							<image mode="aspectFill" class="avatar-img radius" :src="item.avatarUrl"></image>
							<view class="flex-1 ml-md pb-lg" :class="[{'b-1px-b':index != list.total-1}]">
								<view class="flex-between" style="height: 72rpx;">
									<view class="text flex-y-center f-caption">
										<view class="max-380 ellipsis">{{item.nickName}}</view>
										<view class="examine-btn flex-center f-icontext ml-md radius"
											v-if="item.status==1">
											审核中
										</view>
									</view>
									<view class="f-icontext c-caption">{{item.friend_time}}</view>
								</view>
								<view class="comment f-paragraph mt-sm"> {{item.text}} </view>
							</view>
						</view>
						<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading"
							v-if="loading">
						</load-more>
					</scroll-view>
				</block>
				<view class="comment-thumbs-info flex-center pd-lg f-caption" :class="[{'b-1px-t':detail.type == 2}]">
					<view class="input-text flex-y-center radius">
						<i class="iconfont icon-edit ml-md mr-sm"></i>
						<input ref="elInput" :adjust-position="true" :focus="inputFocus" @blur="inputBlur"
							@confirm="toComment" v-model="subForm.text" maxlength="200" class="input" type="text"
							placeholder="说点什么..." />
					</view>
				</view>
				<view class="space-safe"></view>
			</view>
		</uni-popup>

		<!-- 预约技-师 -->
		<technician-list-popup ref="technician_list_popup"></technician-list-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import technicianListPopup from "@/components/technician-list-popup.vue"
	import siteInfo from '@/siteinfo.js';
	export default {
		components: {
			technicianListPopup
		},
		data() {
			return {
				iconType: {
					1: 'icon-kefuwu',
					2: 'iconjishifuwu',
					3: 'iconkeyuyue',
					4: 'iconkeyuyue'
				},
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约',
					4: '不可预约'
				},
				options: {},
				detail: {},
				videoNavHeight: '15px',
				showText: false,
				loading: true,
				param: {
					page: 1
				},
				list: {
					data: []
				},
				videoContexts: null,
				isPlay: false,
				scrollTop: 0,
				pageScrollTop: 0,
				showComment: false,
				inputFocus: false,
				subForm: {
					text: ''
				},
				rule: [{
					name: "text",
					checkType: "isNotNull",
					errorMsg: "请输入评论内容",
					regType: 2
				}],
				popupInfo: {},
				lockTap: false,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			isGzhLogin: state => state.user.isGzhLogin,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		async onLoad(options) {
			this.$util.showLoading()
			this.options = options
			this.param.dynamic_id = options.id
			this.$util.showLoading()
			await this.initIndex()
		},
		// #ifdef H5
		destroyed() {
			if (this.isPlay) {
				this.videoContexts.pause()
			}
		},
		// #endif
		// #ifndef H5
		onUnload() {
			if (this.isPlay) {
				this.videoContexts.pause()
			}
		},
		// #endif
		onPageScroll(e) {
			let {
				scrollTop
			} = e
			this.pageScrollTop = scrollTop
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
			} = this.detail
			let path = `/dynamic/pages/detail?pid=${pid}&id=${id}`
			this.$util.log(path)
			return {
				title,
				imageUrl,
				path,
			}
		},
		watch: {
			changeOnAddr(newval, oldval) {
				let {
					noloca,
				} = this.noChangeLoca
				if (newval && noloca) {
					this.initUtilLocaData() 
				}
			},
			noChangeLoca(newval, oldval) {
				setTimeout(() => {
					let {
						lat,
						lng,
						unix = 0
					} = this.changeOnAddr
					let {
						noloca
					} = this.noChangeLoca
					let cur_unix = this.$util.DateToUnix(this.$util.formatTime(new Date(), 'YY-M-D h:m:s'))
					if (noloca && ((!lat && !lng) || !unix || (unix && (cur_unix - unix >= 1)))) {
						this.getUtilLocation()
					}
				}, 800)
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo']),
			...mapMutations(['updateUserItem', 'updateMapItem']),
			async initIndex(refresh = false) {
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				let {
					id: uid = 0
				} = this.userInfo
				let {
					isGzhLogin
				} = this
				// #ifdef H5
				if (isGzhLogin && !uid) {
					setTimeout(() => {
						this.getDetail(refresh)
					}, 1000)
				} else {
					this.getDetail(refresh)
				}
				// #endif
				// #ifndef H5
				await this.getDetail(refresh)
				// #endif

				let {
					navBarHeight
				} = this.configInfo
				let {
					type: dynamic_type
				} = this.detail
				// #ifdef MP-WEIXIN
				this.videoNavHeight = navBarHeight * 1 + 15 + 'px'
				// #endif
				// #ifdef APP-PLUS
				this.videoNavHeight = navBarHeight * 1 / 2 + 'px'
				// #endif
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
				} = this.detail
				let summary = ''

				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/dynamic/pages/detail?id=${id}&pid=${pid}`

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
				this.$refs.show_item.close()
				// #endif
			},
			async getDetail() {
				let {
					location = {
						lat: 0,
						lng: 0
					}
				} = this

				let {
					status: coach_status,
					coach_position
				} = this.userCoachStatus

				if (!location.lat || (location.lat && location.address == '暂未获取到位置信息')) {
					if (coach_status == 2 && coach_position) {
						let {
							lat: change_lat = 0,
							lng: change_lng = 0,
							unix = 0
						} = this.changeOnAddr
						let cur_unix = this.$util.DateToUnix(this.$util.formatTime(new Date(), 'YY-M-D h:m:s'))
						let noloca = change_lat && change_lng && (unix && (cur_unix - unix < 3)) ? false : true
						if (!noloca) {
							let loca = Object.assign({}, this.location, {
								lat: change_lat,
								lng: change_lng,
								is_util_loca: 1
							})
							this.updateUserItem({
								key: 'location',
								val: loca
							})
						}
						this.updateUserItem({
							key: 'noChangeLoca',
							val: {
								noloca
							}
						})
						if (this.noChangeLoca.noloca) return
						this.initUtilLocaData()
					} else {
						this.getUtilLocation()
					}
					this.updateMapItem({
						key: 'pageActive',
						val: false
					})
					return
				}
				this.initUtilLocaData()
			},
			async getUtilLocation() {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					let wxReady = await this.$jweixin.wxReady2();
					let {
						latitude: lat = 0,
						longitude: lng = 0
					} = wxReady ? await this.$jweixin.getWxLocation() : {
						latitude: 0,
						longitude: 0
					}
					let val = Object.assign({}, this.location, {
						lat,
						lng,
						is_util_loca: 1
					})
					this.updateUserItem({
						key: 'location',
						val
					})
					this.initUtilLocaData()
				}
				// #endif
				// #ifndef H5
				let {
					lat = 0,
						lng = 0
				} = await this.$util.getLocation()
				let val = Object.assign({}, this.location, {
					lat,
					lng,
					is_util_loca: 1
				})
				this.updateUserItem({
					key: 'location',
					val
				})
				this.initUtilLocaData()
				// #endif
			}, 
			async initUtilLocaData() {
				this.updateUserItem({
					key: 'noChangeLoca',
					val: {
						noloca: false
					}
				})
				let {
					id
				} = this.options
				let {
					lat = 0, lng = 0, is_util_loca = 0
				} = this.location
				let data = await this.$api.dynamic.dynamicInfo({
					id,
					lat,
					lng
				})
				let have_show_text = data.text.length > 42
				data.have_show_text = have_show_text
				this.showText = !have_show_text
				this.detail = data
				this.$util.hideAll()
				await this.getList()
				if (lat && lng && is_util_loca) {
					this.$util.getMapInfo()
				}
			},
			async getList() {
				let {
					list: oldList,
					param
				} = this
				let newList = await this.$api.dynamic.commentList(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			goBanner(current) {
				this.$util.previewImage({
					current,
					urls: this.detail.imgs
				})
			},
			scrolltolower(e) {
				if (this.list.current_page >= this.list.last_page || this.loading) return;
				this.param.page = this.param.page + 1;
				this.loading = true;
				this.getList();
			},
			toShowHide(key) {
				this[key] = !this[key]
			},
			inputBlur() {
				if (this.showComment) {
					this.$refs.comment_item.close()
				}
				this.$nextTick(() => {
					this.showComment = false
					this.inputFocus = false
				})
			},
			// type 1关注，2点赞，3查看全部评论，4不喜欢TA的作品
			async toChangeItem(type) {
				let {
					id,
					coach_id,
					type: dynamic_type,
					follow_status,
					thumbs_status,
					thumbs_num,
				} = this.detail
				if (type == 3) {
					this.showText = false
					let {
						scrollTop,
						pageScrollTop
					} = this
					if (dynamic_type == 1 && (!scrollTop || (scrollTop && pageScrollTop < scrollTop))) {
						if (!scrollTop) {
							let {
								navBarHeight = 88
							} = this.configInfo
							const query = uni.createSelectorQuery().in(this);
							query.select('.comment-list-info').boundingClientRect(data => {
								this.scrollTop = data.top - navBarHeight
								uni.pageScrollTo({
									scrollTop: data.top - navBarHeight,
									duration: 0
								})
							}).exec();
						} else {
							uni.pageScrollTo({
								scrollTop: scrollTop,
								duration: 0
							})
						}
					}
					this.showComment = dynamic_type == 1
					this.$refs.comment_item.open()
					setTimeout(() => {
						this.$nextTick(() => {
							this.inputFocus = true
							// this.$refs.elInput.focus()
						}, 10)
					}, 200)
					return
				}
				let methodArr = {
					1: {
						methodKey: 'dynamic',
						methodModel: 'followAddOrCancek',
						param: {
							dynamic_id: id,
							coach_id
						}
					},
					2: {
						methodKey: 'dynamic',
						methodModel: 'thumbsAddOrCancek',
						param: {
							dynamic_id: id
						}
					},
					4: {
						methodKey: 'mine',
						methodModel: 'shieldCoachAdd',
						param: {
							type: 1,
							coach_id
						}
					},
				}
				let {
					methodKey,
					methodModel,
					param
				} = methodArr[type]
				await this.$api[methodKey][methodModel](param)

				switch (type) {
					case 1:
						this.detail.follow_status = follow_status ? 0 : 1
						break;
					case 2:
						let num = thumbs_status ? -1 : 1
						this.detail.thumbs_num = thumbs_num + num
						this.detail.thumbs_status = num > 0 ? 1 : 0
						break;
					case 4:
						this.$util.showToast({
							title: `操作成功`
						})
						setTimeout(() => {
							this.$util.back()
							this.$util.goUrl({
								url: 1,
								openType: `navigateBack`
							})
						}, 2000)
						break
				}
			},
			//表单验证
			validate(param) {
				let validate = new this.$util.Validate();
				this.rule.map(item => {
					let {
						name,
					} = item
					validate.add(param[name], item);
				})
				let message = validate.start();
				return message;
			},
			async toComment() {
				let subForm = this.$util.deepCopy(this.subForm)
				let {
					id
				} = this.options
				subForm.dynamic_id = id
				let msg = this.validate(subForm)
				if (msg) return
				subForm.text = subForm.text.substring(0, 200)
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					let {
						status = 1
					} = await this.$api.dynamic.commentAdd(subForm)
					this.$util.hideAll()
					this.$util.showToast({
						title: status == 1 ? '正在审核中' : `评论成功`
					})
					this.subForm.text = ''
					if (this.showComment) {
						this.$refs.comment_item.close()
					}
					this.$nextTick(() => {
						this.showComment = false
						this.inputFocus = false
					})
					setTimeout(() => {
						this.lockTap = false
						this.initRefresh()
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			toDel(index) {
				let {
					id,
					cover: image,
					del_auth,
					status
				} = this.list.data[index]
				if (del_auth) {
					this.popupInfo = {
						id,
						name: ``,
						image: ``,
						index,
						status
					}
					this.$refs.del_item.open()
				}
			},
			// 确认：删除评论
			async confirmDel() {
				let {
					id,
					index,
					status
				} = this.popupInfo
				let {
					comment_num
				} = this.detail
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.dynamic.commentDel({
						id
					})
					this.$util.hideAll()
					this.list.data.splice(index, 1)
					this.lockTap = false
					if (status != 1) {
						this.detail.comment_num = comment_num - 1
					}
					this.$util.showToast({
						title: `删除成功`
					})
					this.$refs.del_item.close()
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			async toShowPopup(key) {
				let {
					coach_info,
					coach_id: id
				} = this.$util.deepCopy(this.detail)
				let {
					is_work
				} = coach_info
				if (!is_work) {
					this.$util.showToast({
						title: `该${this.$t('action.attendantName')}未上班`
					})
					return
				}
				let params = Object.assign({}, coach_info, {
					id
				})
				this.$refs.technician_list_popup.toShowPopup(params, key)
			},
			screenChange(e) {
				let {
					fullScreen = false
				} = e.detail
				if (!fullScreen) {
					this.$nextTick(() => {
						this.videoContexts.pause()
						this.videoContexts = null
						this.isPlay = false
					})
				}
			},
			playAndPauseVideo() {
				let {
					videoContexts = null
				} = this
				let isPlay = this.$util.deepCopy(this.isPlay)
				if (videoContexts == null) {
					let {
						id
					} = this.detail
					this.videoContexts = uni.createVideoContext(`video_${id}`, this)
					this.isPlay = true
				}
				let methodModel = !isPlay ? 'play' : 'pause'
				this.$nextTick(() => {
					// #ifdef APP-PLUS
					if (!isPlay) {
						this.videoContexts.requestFullScreen({
							direction: 0
						})
					}
					// #endif
					this.videoContexts[methodModel]()
				})
			},
			onPlay(e) {
				this.isPlay = true
			},
			onPause(e) {
				this.isPlay = false
			},
			onEnded(e) {
				// #ifdef APP-PLUS
				this.videoContexts.exitFullScreen()
				// #endif
				// #ifndef APP-PLUS
				this.isPlay = false
				// #endif
			},
			onError(e) {},
			onTimeUpdate(e) {},
			onWaiting(e) {},
			onProgress(e) {},
			onLoadedMetaData(e) {},
		}
	}
</script>

<style lang="scss">
	.dynamic-detail {
		.banner-info {
			width: 750rpx;
			height: 654rpx;
		}

		.menu-info {
			top: 30rpx;
			right: 30rpx;
			width: 60rpx;
			height: 60rpx;
			background: rgba(2, 2, 2, 0.5);
			z-index: 99991
		}

		.menu-info.type-video {
			background: rgba(255, 255, 255, 0.5);
		}

		.dynamic-info {
			.avatar {
				width: 84rpx;
				height: 84rpx;
			}

			.app-follow-btn {
				width: 116rpx;
				height: 56rpx;
				transform: rotateZ(360deg);

				.iconfont {
					font-size: 24rpx;
					margin-right: 6rpx;
				}
			}
		}

		.dynamic-content {
			color: #222;
			line-height: 40rpx;
		}

		.hide-text {
			height: 180rpx;
			overflow: hidden;
		}

		.video-box {
			width: 100%;
			height: calc(100vh - 100rpx);
			padding-bottom: calc(env(safe-area-inset-bottom) / 2);

			.video-poster {
				width: 100%;
				height: 100%;

				.play-video {
					width: 88rpx;
					height: 88rpx;
					background: rgba(2, 2, 2, 0.5);

					.iconfont {
						font-size: 38rpx;
					}
				}
			}

			.video-poster.abs {
				top: 0;
				left: 0;
				z-index: 1;
			}

			.video_item {
				width: 100%;
				height: 100%;
			}
		}

		.no-data-item {
			padding-bottom: 280rpx;

			.avatar {
				width: 54rpx;
				height: 54rpx;
			}

			.text {
				width: 616rpx;
				height: 56rpx;
				color: #C7C7C7;
				background: #F7F7F7;
			}
		}

		.list-item {
			.avatar-img {
				width: 72rpx;
				height: 72rpx;
			}

			.text {
				color: #ADADAD;
			}

			.comment {
				color: #3A3A3A;
				line-height: 1.4;
			}

			.examine-btn {
				width: 82rpx;
				height: 34rpx;
				color: #F96246;
				background: rgba(249, 98, 70, 0.1);
			}
		}

		.bottom-info {
			width: 750rpx;
			background: #fff;


			.dynamic-info {
				.avatar {
					width: 66rpx;
					height: 66rpx;
				}

				.ml-sm {
					margin-left: 15rpx;
				}

				.app-follow-btn {
					width: 100rpx;
					height: 45rpx;
					transform: rotateZ(360deg);
					border: 1rpx solid #fff;

					.iconfont {
						font-size: 24rpx;
						margin-right: 6rpx;
					}
				}
			}

			.dynamic-content {
				max-height: 20vh;
				overflow-y: auto;
			}

			.comment-thumbs-info {
				height: 100rpx;

				.input-text {
					width: 372rpx;
					height: 68rpx;
					background: #F6F6F6;

					.iconfont {
						color: #C7C7C7;
						font-size: 24rpx;
					}

					.input {
						width: calc(100% - 78rpx);
					}
				}

				.thumbs-comment-btn {
					min-width: 102rpx;
					color: #343434;

					.iconfont {
						font-size: 44rpx;
						margin-right: 6rpx;
					}
				}
			}
		}

		.bottom-info.type-video {
			padding-top: 150rpx;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);

			.input-text {
				background: #191919;

				.input {
					color: #fff;
				}
			}

			.thumbs-comment-btn {
				color: #fff;
			}
		}

		.show-popup {
			width: 750rpx;
			background: #F3F3F5;
			border-radius: 30rpx 30rpx 0 0;

			.avatar {
				width: 84rpx;
				height: 84rpx;
			}

			.show-item {
				color: #222;
				height: 100rpx;
				background: #fff;
			}
		}

		.comment-popup {
			width: 750rpx;
			border-radius: 30rpx 30rpx 0 0;

			.icon-add {
				font-size: 36rpx;
				top: 32rpx;
				right: 32rpx;
			}

			.scroll-list {
				max-height: 70vh;
			}

			.comment-thumbs-info {
				height: 100rpx;

				.input-text {
					width: 690rpx;
					height: 68rpx;
					background: #F6F6F6;

					.iconfont {
						color: #C7C7C7;
						font-size: 24rpx;
					}

					.input {
						width: calc(100% - 78rpx);
					}
				}
			}
		}

		.technician-popup {
			border-radius: 20rpx 20rpx 0 0;

			.item-avatar {
				width: 90rpx;
				height: 90rpx;
				background: #f4f6f8;
			}

			.icon-close {
				font-size: 50rpx;
			}

			.technician-text {
				max-height: 150rpx;
			}

			.list-content {
				max-height: 50vh;
			}

			.order-btn {
				width: 200rpx;
				height: 72rpx;
			}
		}
	}
</style>