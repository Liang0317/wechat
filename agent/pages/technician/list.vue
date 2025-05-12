<template>
	<view class="agent-technician-list" v-if="isLoad">
		<fixed>
			<view class="search-info fill-base pt-lg pb-md">
				<view class="flex-center pl-lg pr-lg pb-md">
					<view @tap.stop="$util.goUrl({url:`/agent/pages/technician/apply`})"
						class="dynamic-btn flex-center f-caption mr-lg radius"
						:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">
						<i class="iconfont icon-jia-bold"></i>
						添加
					</view>
					<view class="flex-1">
						<search @input="toSearch" type="input" :padding="0" :radius="30" backgroundColor="#F0F0F0"
							:placeholder="placeholder">
						</search>
					</view>
				</view>
				<view style="padding-right:30rpx">
					<tab @change="handerTabChange" :isLine="true" :list="tabList" :activeIndex="activeIndex*1"
						color="#9D9D9D" :activeColor="primaryColor" :width="100/tabList.length + '%'" height="100rpx"
						:numberType="2"></tab>
				</view>
			</view>

		</fixed>
		<view @tap.stop="goDetail(index)" class="list-item fill-base flex-warp mt-md ml-md mr-md pd-lg radius-16"
			v-for="(item,index) in list.data" :key="index">
			<view>
				<view class="avatar rel">
					<!-- #ifdef H5 -->
					<view class="avatar radius">
						<view class="h5-image avatar radius" :style="{ backgroundImage : `url('${item.work_img}')`}">
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" class="avatar radius" :src="item.work_img">
					</image>
					<!-- #endif -->
				</view>
				<view class="flex-center">
					<view class="item-tag flex-center f-icontext c-base radius-20"
						:class="[{'have-user':item.auth_status}]">
						{{authStatusType[item.auth_status]}}
					</view>
				</view>
			</view>

			<view class="flex-1 ml-md">
				<view class="flex-between">
					<view class="f-icontext c-paragraph">ID：{{item.id}}</view>
					<view class="f-paragraph"
						:style="{color:item.status==1||item.is_update==1?primaryColor:item.status==4?subColor:item.status==3?'#E82F21':'#999999'}">
						{{statusType[item.status]}}
					</view>
				</view>
				<view class="flex-y-center pb-lg b-1px-b">
					<view class="f-paragraph c-black text-bold ellipsis" style="max-width: 377rpx;">{{item.coach_name}}
					</view>
					<view class="status-btn flex-center f-icontext ml-md"
						:style="{color:item.admin_add==1?primaryColor:subColor,border:`1rpx solid ${item.admin_add==1?primaryColor:subColor}`}">
						{{item.admin_add==1?'平台添加':'用户申请'}}
					</view>
				</view>
				<view class="f-icontext c-paragraph mt-md">{{item.mobile}}</view>
				<view class="f-icontext c-paragraph mt-sm">
					所属代理商：{{item.admin_name || '-'}}{{item.admin_id?` (${cityType[item.city_type]})`:''}}</view>
				<view class="f-icontext c-paragraph mt-sm">申请时间：{{item.create_time}}</view>
				<view class="flex-between mt-md">
					<view></view>
					<view class="flex-center">
						<view class="edit-btn flex-center f-desc radius"
							:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}"
							v-if="!item.is_update && item.admin_id == list.admin_id">编辑
						</view>
						<view class="edit-btn flex-center f-desc radius"
							:style="{color:subColor,border:`1rpx solid ${subColor}`}"
							v-if="item.is_update || (item.admin_id != list.admin_id)">查看
						</view>
						<view @tap.stop="toReject(index)" class="edit-btn flex-center f-desc radius ml-md"
							:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}" v-if="item.status ==4">
							驳回原因</view>
					</view>
				</view>
			</view>
		</view>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<view class="space-footer"></view>

		<uni-popup ref="reject_item" type="center" :custom="true" :zIndex="999">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">驳回原因</view>
				<scroll-view scroll-y @touchmove.stop.prevent class="refund-text mt-lg">
					<view>
						<text decode="emsp" style="word-break:break-all;">{{sh_info.sh_text || '没有填写原因哦'}}</text>
					</view>
					<view class="mt-md f-caption c-caption">驳回时间：{{sh_info.sh_time}}</view>
				</scroll-view>
				<view class="button">
					<view @tap.stop="$refs.reject_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
				</view>
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
		data() {
			return {
				options: {},
				placeholder: '请输入' + this.$t('action.attendantName') + '姓名/手机号',
				tabList: [{
					id: 0,
					title: '全部',
					number: 0
				}, {
					id: 1,
					title: '申请中',
					number: 0
				}, {
					id: 2,
					title: '已授权',
					number: 0
				}, {
					id: 4,
					title: '已驳回',
					number: 0
				}, {
					id: -1,
					title: '重新审核',
					number: 0
				}],
				activeIndex: 0,
				authStatusType: {
					0: '未认证',
					1: '认证中',
					2: '已认证',
					3: '认证失败'
				},
				statusType: {
					1: '申请中',
					2: '已授权',
					3: '取消授权',
					4: '已驳回'
				},
				cityType: {
					1: '城市',
					2: '区县',
					3: '省'
				},
				loading: true,
				isLoad: false,
				param: {
					page: 1,
					limit: 10,
					status: 0
				},
				list: {
					data: []
				},
				sh_info: {
					sh_time: '',
					sh_text: ''
				}
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
			uni.setNavigationBarTitle({
				title: this.$t('action.attendantName') + '管理'
			})
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
		methods: {
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
				this.getList()
			},
			handerTabChange(index) {
				this.activeIndex = index
				this.$util.showLoading()
				this.param.page = 1;
				this.getList();
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			toSearch(val) {
				this.param.page = 1
				this.param.name = val
				this.getList()
			},
			async getList() {
				this.$util.showLoading()
				let {
					list: oldList
				} = this
				let {
					id: status
				} = this.tabList[this.activeIndex]
				let param = Object.assign({}, this.param, {
					status
				})
				if (status == -1) {
					param.is_update = 1
					delete param.status
				}
				let newList = await this.$api.agent.coachList(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.tabList[1].number = newList.ing
				this.isLoad = true
				this.loading = false
				this.$util.hideAll()
			},
			toReject(index) {
				let {
					sh_text,
					sh_time
				} = this.list.data[index]
				this.sh_info = {
					sh_text,
					sh_time
				}
				this.$refs.reject_item.open()
			},
			goDetail(index) {
				let {
					id,
					is_update,
					admin_id
				} = this.list.data[index]
				let {
					admin_id: aid
				} = this.list
				let view = is_update || (admin_id != aid) ? 1 : 0
				this.$util.goUrl({
					url: `/agent/pages/technician/apply?id=${id}&view=${view}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.agent-technician-list {
		.search-info {
			width: 100%;

			.dynamic-btn {
				width: 134rpx;
				height: 56rpx;
				transform: rotateZ(360deg);

				.iconfont {
					font-size: 24rpx;
					margin-right: 6rpx;
				}
			}
		}

		.list-item {
			.avatar {
				width: 124rpx;
				height: 124rpx;
			}

			.item-tag {
				width: 100rpx;
				height: 32rpx;
				color: #4A4A4A;
				background: #D8D8D8;
				margin-top: 19rpx;
				margin-bottom: 6rpx;
			}

			.have-user {
				color: #EBDDB1;
				background: linear-gradient(270deg, #4C545A 0%, #282B34 100%);
			}

			.status-btn {
				width: 110rpx;
				height: 32rpx;
				border-radius: 5rpx;
				transform: rotateZ(360deg);
			}

			.edit-btn {
				min-width: 120rpx;
				height: 50rpx;
				padding: 0 15rpx;
				transform: rotateZ(360deg);
			}

		}
	}
</style>