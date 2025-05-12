<template>
	<view class="technician-list-item">

		<view class="list-item flex-center pd-lg fill-base radius-16 rel" v-if="coach_list_format===1">
			<image mode="aspectFill" class="king-img abs" src="https://lbqny.migugu.com/admin/anmo/mine/king.gif"
				v-if="info.coach_type_status==1">
			</image>
			<view class="flex-center flex-column">
				<view class="item-img rel">
					<!-- #ifdef H5 -->
					<view class="item-img radius">
						<view @tap.stop="toPreviewImage('work_img')" class="h5-image item-img radius"
							:style="{ backgroundImage : `url('${info.work_img}')`}">
						</view>
					</view>
					<view @tap.stop="toPreviewImage('work_img')" class="h5-image abs"
						:class="[{'top-img':info.coach_type_status == 1 || (info.coach_type_status == 4 && info.coach_icon)},{'hot-img': info.coach_type_status == 2},{'new-img': info.coach_type_status == 3},{'recommend-img': info.coach_type_status == 4 && !info.coach_icon}]"
						:style="{ backgroundImage : info.coach_type_status == 4 && info.coach_icon ? `url('${info.coach_icon}')`: info.coach_type_status === 3 || (info.coach_type_status == 4 && !info.coach_icon)? `url('https://lbqny.migugu.com/admin/anmo/mine/${imgType[info.coach_type_status]}.png')` : `url('https://lbqny.migugu.com/admin/anmo/mine/${imgType[info.coach_type_status]}.gif')`}"
						v-if="info.coach_type_status">
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image @tap.stop="toPreviewImage('work_img')" mode="aspectFill" class="item-img radius"
						:src="info.work_img">
					</image>
					<image @tap.stop="toPreviewImage('work_img')" mode="aspectFill" class="abs"
						:class="[{'top-img':info.coach_type_status == 1 || (info.coach_type_status == 4 && info.coach_icon)},{'hot-img': info.coach_type_status == 2},{'new-img': info.coach_type_status == 3},{'recommend-img': info.coach_type_status == 4 && !info.coach_icon}]"
						:src="info.coach_type_status == 4 && info.coach_icon ? `${info.coach_icon}`: info.coach_type_status === 3 || (info.coach_type_status == 4 && !info.coach_icon) ? `https://lbqny.migugu.com/admin/anmo/mine/${imgType[info.coach_type_status]}.png` : `https://lbqny.migugu.com/admin/anmo/mine/${imgType[info.coach_type_status]}.gif`"
						v-if="info.coach_type_status">
					</image>
					<!-- #endif -->
				</view>
				<view class="item-tag flex-center f-icontext c-base radius-20"
					:style="{background: info.text_type === 1 ? service_btn_color : info.text_type == 3?primaryColor: info.text_type==4?'#e1493b':'',color:info.text_type === 1 ? service_font_color :[3,4].includes(info.text_type) ? '#fff' : ''}">
					{{textType[info.text_type]}}
				</view>
			</view>
			<view class="flex-1 ml-md" :style="{maxWidth:'510rpx'}">
				<view class="flex-between">
					<view class="flex-y-center f-title c-title">
						<view class="text-bold max-200 ellipsis">{{info.coach_name}}</view>
						<view @tap.stop="toPreviewImage('self_img')"
							class="more-img flex-center ml-sm f-icontext c-base" :style="{background:primaryColor}">更多照片
						</view>
					</view>
					<view>
						<view class="can-service-btn flex-center f-icontext rel" :style="{color:primaryColor}"
							v-if="info.near_time">
							<view class="bg abs" :style="{background:primaryColor}"></view>
							最早可约：{{info.near_time}}
						</view>
					</view>
				</view>
				<view class="flex-between mt-sm">
					<view class="flex-y-center f-icontext">
						<view class="flex-y-center"><i class="iconfont iconyduixingxingshixin icon-font-color"></i>
							<view class="star-text">{{info.star}}</view>
						</view>
						<view class="order-num flex-y-center" v-if="info.show_salenum">
							已服务<view class="f-desc text-bold">{{info.order_num > 9999 ? '9999+' : info.order_num}}
							</view>单</view>
					</view>
					<view class="free-fare-btn flex-center f-icontext" v-if="info.free_fare">
						免出行费
					</view>
					<view class="flex-center" v-else>
						<i class="iconfont iconjuli" :style="{color:primaryColor}"></i>
						<view class="f-desc c-title">{{info.distance}}</view>
					</view>
				</view>
				<view class="flex-between mt-md pt-md b-1px-t">
					<view class="flex-y-center f-desc c-caption">
						<view @tap.stop="toEmit('comment')" class="flex-y-center"><i
								class="iconfont iconpinglun mr-sm"></i>{{info.comment_num > 99 ? '99+':info.comment_num}}
						</view>
						<view @tap.stop="toEmit('collect')" class="flex-y-center ml-md"><i class="iconfont mr-sm"
								:class="[{'iconshoucang1':!info.is_collect},{'iconshoucang2':info.is_collect}]"
								:style="{color:info.is_collect ? primaryColor :''}"></i>{{info.collect_num > 99 ? '99+':info.collect_num}}
						</view>
						<view @tap.stop="goInfo" class="flex-y-center ml-md">
							<block
								v-if="from!='collect' && merchant_switch_show && info.admin_id && info.merchant_name">
								<i class="iconfont iconshangjia_1 c-caption mr-sm"></i>
								<view class="max-100 ellipsis">{{info.merchant_name}}</view>
							</block>
							<block v-else-if="from!='collect' && plugAuth.store && info.store && info.store.id">
								<i class="iconfont icondianpu c-caption mr-sm"></i>
								<view class="max-100 ellipsis">{{info.store.title}}</view>
							</block>
							<block v-else>
								<i class="iconfont iconshangjia_1 c-caption mr-sm"></i>
								商家
							</block>
						</view>
					</view>
					<auth @tap.stop.prevent :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toEmit('order')" style="width:130rpx;">
						<view class="item-btn flex-center f-desc c-base"
							:style="{background:info.is_work ? primaryColor:'#888'}">
							立即预约
						</view>
					</auth>
				</view>
			</view>
		</view>

		<view @tap.stop="goTechInfo" class="list-2-item fill-base radius-16" v-if="coach_list_format===2">
			<view class="item-img rel">
				<!-- #ifdef H5 -->
				<view class="item-img radius">
					<view class="h5-image item-img radius" :style="{ backgroundImage : `url('${info.work_img}')`}">
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<image mode="aspectFill" class="item-img radius" :src="info.work_img">
				</image>
				<!-- #endif -->
				<view class="abs item-status flex-center f-caption c-base"
					:style="{background:info.text_type == 1 ? primaryColor : colorType[info.text_type]}">
					<view class="text text-center">{{textType[info.text_type]}}</view>
				</view>
				<view class="abs item-time-order flex-between f-icontext c-base">
					<view class="text">
						<block v-if="info.near_time">最早可约 {{info.near_time}}</block>
					</view>
					<view>
						<view class="text" v-if="info.show_salenum">已服务
							{{info.order_num > 9999 ? '9999+' : info.order_num}}单
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 18rpx 16rpx;">
				<view class="flex-y-center">
					<view class="f-desc c-title text-bold ellipsis">{{info.coach_name}}</view>
					<view class="flex-1 flex-y-center ml-sm"><i class="iconfont iconyduixingxingshixin"></i>
						<view class="star-text f-icontext">{{info.star}}</view>
					</view>
				</view>
				<view class="flex-between mt-sm">
					<view @tap.stop="toPreviewImage('self_img')" class="item-btn flex-center f-desc"
						:style="{color:primaryColor,borderColor:primaryColor}">生活照
					</view>
					<auth @tap.stop.prevent :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toEmit('order')" style="width:150rpx;">
						<view class="item-btn flex-center f-desc c-base"
							:style="{background:info.is_work ? primaryColor:'#888',borderColor:info.is_work ? primaryColor:'#888'}">
							去预约
						</view>
					</auth>
				</view>
				<view class="flex-x-between f-icontext c-caption" style="margin-top: 15rpx;">
					<view @tap.stop="toEmit('comment')" class="flex-y-center"><i
							class="iconfont iconpinglun"></i>{{info.comment_num > 99 ? '99+':info.comment_num}}
					</view>
					<view @tap.stop="toEmit('collect')" class="flex-y-center"><i class="iconfont"
							:class="[{'iconshoucang1':!info.is_collect},{'iconshoucang2':info.is_collect}]"
							:style="{color:info.is_collect ? primaryColor :''}"></i>{{info.collect_num > 99 ? '99+':info.collect_num}}
					</view>
					<view class="flex-y-center">
						<i class="iconfont iconjuli1"></i>
						<view>{{info.distance}}</view>
					</view>
				</view>
			</view>
		</view>

		<view @tap.stop="goTechInfo" class="list-3-item fill-base radius-16" v-if="coach_list_format===3">
			<view class="item-img rel">
				<!-- #ifdef H5 -->
				<view class="item-img radius">
					<view class="h5-image item-img radius" :style="{ backgroundImage : `url('${info.work_img}')`}">
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<image mode="aspectFill" class="item-img radius" :src="info.work_img">
				</image>
				<!-- #endif -->
				<view class="abs item-status flex-center c-base"
					:style="{background:info.text_type == 1 ? primaryColor : colorType[info.text_type]}">
					{{textType[info.text_type]}}
				</view>
				<view class="abs item-count-icon flex-between pl-md pr-md f-icontext c-base">
					<view class="flex-y-center">
						<view @tap.stop="toEmit('comment')" class="flex-y-center" style="margin-right: 15rpx;"><i
								class="iconfont iconpinglun_1 mr-sm"></i>{{info.comment_num > 99 ? '99+':info.comment_num}}
						</view>
						<view class="flex-y-center">
							<i class="iconfont iconjuli4" style="font-size:24rpx;margin-right:5rpx"></i>
							<view>{{info.distance}}</view>
						</view>
					</view>
					<view @tap.stop="toEmit('collect')" class="flex-y-center"><i class="iconfont mr-sm"
							:class="[{'iconshoucang3':!info.is_collect},{'iconyishoucang':info.is_collect}]"
							:style="{color:info.is_collect ? '#FF971E' :''}"></i>{{info.collect_num > 99 ? '99+':info.collect_num}}
					</view>
				</view>
			</view>
			<view style="padding: 18rpx 16rpx;">
				<view class="flex-between">
					<view class="f-desc c-title text-bold ellipsis">{{info.coach_name}}</view>
					<view class="flex-y-center">
						<view class="rel">
							<view class="flex-y-center">
								<i class="iconfont iconyduixingxingshixin" v-for="(item,index) in 5" :key="index"></i>
							</view>
							<view class="flex-y-center abs" style="top:0;left:0;overflow: hidden"
								:style="{width: info.star*1 * 20 + '%'}">
								<i class="iconfont iconyduixingxingshixin icon-font-color cur" v-for="(item,index) in 5"
									:key="index"></i>
							</view>
						</view>
						<view class="star-text f-icontext">{{info.star}}</view>
					</view>
				</view>

				<view class="flex-y-center mt-sm">
					<view class="near-time flex-center mr-sm" style="background: #EFDDC3;" v-if="info.near_time">
						最早可约<view class="text-bold" style="margin-left: 5rpx;">{{info.near_time}}</view>
					</view>
					<view class="near-time flex-center rel" :style="{color:primaryColor}">
						<view class="bg abs" :style="{background:primaryColor}"></view>
						已服务{{info.order_num > 9999 ? '9999+' : info.order_num}}单
					</view>
				</view>


				<view class="flex-between mt-md">
					<view @tap.stop="toPreviewImage('self_img')" class="item-btn flex-center f-desc text-bold"
						:style="{color:primaryColor,borderColor:primaryColor}">生活照
					</view>
					<auth @tap.stop.prevent :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toEmit('order')" style="width:150rpx;">
						<view class="item-btn flex-center f-desc c-base text-bold"
							:style="{background:info.is_work ? primaryColor:'#888',borderColor:info.is_work ? primaryColor:'#888'}">
							立即预约
						</view>
					</auth>
				</view>
			</view>
		</view>

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
			info: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				imgType: {
					1: 'top',
					2: 'hot',
					3: 'new',
					4: 'tuijian'
					// 4: 'recommend'
				},
				colorType: {
					2: '#2A2D35',
					3: '#FF971E',
					4: '#E82F21'
				},
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约',
					4: '不可预约'
				}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			plugAuth: state => state.config.configInfo.plugAuth,
			coach_list_format: state => state.config.configInfo.coach_list_format,
			merchant_switch_show: state => state.config.configInfo.merchant_switch_show,
			service_btn_color: state => state.config.configInfo.service_btn_color,
			service_font_color: state => state.config.configInfo.service_font_color,
			force_login: state => state.config.configInfo.force_login,
			attendant_name: state => state.config.configInfo.attendant_name,
			short_code_status: state => state.config.configInfo.short_code_status,
			userInfo: state => state.user.userInfo,
		}),
		methods: {
			...mapActions(['getUserInfo']),
			...mapMutations(['updateUserItem']),
			async toPreviewImage(key) {
				let check = await this.toCheck()
				if (!check) return
				let urls = this.info[key]
				if (key == 'work_img') {
					urls = [urls]
				}
				this.$util.previewImage({
					current: urls[0],
					urls
				})
			},
			// 技-师详情
			async goInfo() {
				let {
					id,
					store = {},
					admin_id = 0,
					merchant_name
				} = this.info
				let {
					from,
					merchant_switch_show,
					plugAuth = {},
				} = this


				let isCheck = false
				let url = `/user/pages/technician-info?id=${id}`
				if (from != 'collect' && merchant_switch_show && admin_id && merchant_name) {
					url = `/user/pages/merchant-info?id=${admin_id}`
				} else if (from != 'collect' && plugAuth.store && store && store.id) {
					url = `/shopstore/pages/detail?id=${store.id}`
				} else {
					isCheck = true
				}
				if (isCheck) {
					let check = await this.toCheck()
					if (!check) return
				}
				this.$util.goUrl({
					url
				})
			},
			async goTechInfo() {
				let {
					id
				} = this.info
				let check = await this.toCheck()
				if (!check) return
				this.$util.goUrl({
					url: `/user/pages/technician-info?id=${id}`
				})
			},
			async toCheck() {
				let check = true
				let {
					id: uid,
					phone
				} = this.userInfo
				let {
					force_login,
					attendant_name,
					short_code_status
				} = this
				if (force_login == 1 && !uid) {
					let [res_del, {
						confirm
					}] = await uni.showModal({
						content: `马上注册查看更多${attendant_name}信息`,
						showCancel: false,
						confirmText: `去注册`
					})
					check = false
					if (!confirm) return
					let pages = getCurrentPages()
					let {
						route,
						options = {}
					} = pages[pages.length - 1]
					let loginPage = this.$util.getUrlToStr(`/${route}`, options)
					this.updateUserItem({
						key: 'loginPage',
						val: loginPage
					})
					this.$util.goUrl({
						url: `/pages/login`
					})
				}
				return check
			},
			toEmit(key) {
				this.$emit(key)
			}
		}
	}
</script>

<style scoped lang="scss">
	.technician-list-item {

		.list-item {
			.top-tag {
				width: 40rpx;
				height: 30rpx;
				color: #B75E1D;
				background: linear-gradient(90deg, #DFB885 0%, #FCE0AD 100%);
				border-radius: 8rpx 0 8rpx 0;
				top: 0;
				left: 0;
			}

			.item-img {
				width: 124rpx;
				height: 124rpx;
				/* #ifdef H5 */
				object-fit: cover;
				/* #endif */
			}

			.king-img {
				width: 90rpx;
				height: 90rpx;
				top: 110rpx;
				left: -15rpx;
				z-index: 1;
			}


			.top-img {
				width: 180rpx;
				height: 180rpx;
				top: -32rpx;
				left: -27rpx;
			}

			.hot-img {
				width: 100rpx;
				height: 100rpx;
				top: 60rpx;
				left: 12rpx;
			}

			.new-img {
				width: 38rpx;
				height: 52rpx;
				top: 83rpx;
				left: 78rpx;
			}

			.recommend-img {
				// width: 180rpx;
				// height: 180rpx;
				// top: 30rpx;
				// left: -26rpx;
				width: 54rpx;
				height: 54rpx;
				top: -25rpx;
				left: 4rpx;
			}

			.item-tag {
				width: 100rpx;
				height: 32rpx;
				color: #000;
				background: rgba(216, 216, 216, 0.3);
				margin-top: 19rpx;
				margin-bottom: 6rpx;
			}

			.more-img {
				width: 104rpx;
				height: 33rpx;
				border-radius: 3px;
				transform: rotateZ(360deg);
			}

			.can-service-btn {
				height: 32rpx;
				padding: 0 6rpx 0 6rpx;

				.bg {
					opacity: 0.1;
					border-radius: 5rpx;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}
			}

			.iconyduixingxingshixin {
				font-size: 28rpx;
				background-image: -webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%);
			}

			.star-text {
				color: #FF9519;
				margin-left: 6rpx;
				margin-top: 3rpx;
			}

			.free-fare-btn {
				width: 106rpx;
				height: 32rpx;
				color: #FF3300;
				background: #FFEEEB;
				border-radius: 4rpx;
			}

			.order-num {
				color: #4D4D4D;
				margin-left: 16rpx;
			}

			.item-btn {
				width: 130rpx;
				height: 52rpx;
				border-radius: 8rpx;
			}
		}

		.list-2-item {
			width: 345rpx;
			height: 519rpx;
			overflow: hidden;

			.item-img {
				width: 100%;
				height: 337rpx;
				/* #ifdef H5 */
				object-fit: cover;
				/* #endif */
				border-radius: 16rpx 16rpx 0 0;
			}

			.item-status {
				top: 21rpx;
				right: -34rpx;
				width: 150rpx;
				height: 38rpx;
				transform: rotate(45deg);

				.text {
					width: 140rpx;
					height: 38rpx;
					transform: scale(0.9);
				}
			}

			.item-time-order {
				left: 0;
				bottom: 0;
				width: 100%;
				height: 34rpx;
				background: rgba(0, 0, 0, 0.64);

				.text {
					transform: scale(0.8);
				}
			}

			.iconyduixingxingshixin {
				font-size: 28rpx;
				color: #FF9300;
			}

			.star-text {
				color: #FF9300;
				margin-left: 6rpx;
				margin-top: 3rpx;
			}

			.item-btn {
				width: 148rpx;
				height: 55rpx;
				border-radius: 10rpx;
				border: 1rpx solid #fff;
			}

			.flex-x-between {
				.iconfont {
					font-size: 26rpx;
					margin-right: 5rpx;
				}
			}

		}

		.list-3-item {
			width: 345rpx;
			height: 535rpx;
			overflow: hidden;

			.item-img {
				width: 100%;
				height: 345rpx;
				/* #ifdef H5 */
				object-fit: cover;
				/* #endif */
				border-radius: 16rpx 16rpx 0 0;
			}

			.item-status {
				top: 14rpx;
				left: 16rpx;
				min-width: 67rpx;
				height: 32rpx;
				padding: 0 8rpx;
				font-size: 20rpx;
				border-radius: 9rpx;
			}

			.item-count-icon {
				left: 0;
				bottom: 0;
				width: 100%;
				height: 51rpx;
				background: linear-gradient(360deg, rgba(0, 0, 0, 0.64) 0%, rgba(0, 0, 0, 0) 100%);

				.iconfont {
					font-size: 26rpx;
				}

			}

			.near-time {
				font-size: 20rpx;
				color: #482A17;
				min-width: 128rpx;
				padding: 0 5rpx;
				height: 32rpx;
				border-radius: 4rpx;

				.bg {
					opacity: 0.1;
					border-radius: 4rpx;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}
			}

			.iconyduixingxingshixin {
				font-size: 24rpx;
				color: #E7E5E6;
			}

			.iconyduixingxingshixin.cur {
				background-image: -webkit-linear-gradient(270deg, #F7A31C 0%, #FF6617 100%);
			}


			.star-text {
				color: #F89831;
				margin-left: 6rpx;
				margin-top: 3rpx;
			}

			.item-btn {
				width: 148rpx;
				height: 52rpx;
				border-radius: 25rpx 0 25rpx 0;
				border: 1rpx solid #fff;
			}

		}
	}
</style>