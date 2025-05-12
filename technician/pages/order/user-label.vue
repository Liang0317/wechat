<template>
	<view class="pages-technician-label">

		<view class="flex-y-center pd-lg mt-lg">
			<view class="f-title c-title text-bold">标签</view>
		</view>
		<view class="list-item ml-lg mr-lg f-caption">
			<view v-if="check_label.length==0">暂无数据</view>
			<block v-for="(item,index) in check_label" :key="index">
				<view class="list-child cur radius rel" v-if="is_show ? index < check_label.length : index < 9">
					<view class="bg-item radius abs" :style="{background:primaryColor}"></view>
					<view class="tag-item flex-center" :style="{color:primaryColor}">{{item.title}}</view>
				</view>
			</block>
			<view @tap.stop="toShowLabel" class="flex-center f-paragraph c-title" v-if="check_label.length > 9">
				{{is_show?'收起更多':'展开更多'}} <i class="iconfont" :class="[{'iconshang':is_show},{'iconxia':!is_show}]"></i>
			</view>
		</view>

		<view class="flex-y-center pt-lg pl-lg pr-lg mt-lg">
			<view class="f-title c-title text-bold">评价内容</view>
		</view>
		<view class="pt-lg ml-lg mr-lg">
			<view class="f-caption" v-if="list.data.length==0">暂无数据</view>
			<view class="eva-list-item flex-warp pb-lg" :class="[{'pt-lg b-1px-t':index!=0}]"
				v-for="(item,index) in list.data" :key="index">
				<image class="avatar sm radius" :src="item.work_img"></image>
				<view class="flex-1">
					<view class="flex-between name">
						<view class="f-paragraph c-title text-bold">{{item.coach_name}}</view>
						<view class="f-caption c-caption">{{item.create_time}}</view>
					</view>
					<view class="f-paragraph c-paragraph">
						<text decode="emsp" style="word-break:break-all;">{{item.text || '暂无内容'}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<view class="space-footer"></view>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
	} from 'vuex';
	export default {
		data() {
			return {
				options: {},
				is_show: false,
				check_label: [],
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				loading: true
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor
		}),
		async onLoad(options) {
			this.options = options
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
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
			...mapActions([]),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				let {
					id: user_id
				} = this.options
				this.check_label = await this.$api.technician.userLabelList({
					user_id
				})
				this.getList(1)
			},
			initRefresh() {
				this.is_show = false
				this.param.page = 1
				this.initIndex()
			},
			async getList() {
				let {
					list: oldList,
					param,
				} = this
				let {
					id
				} = this.options
				param.user_id = id
				let newList = await this.$api.technician.coachCommentUserData(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			toShowLabel() {
				this.is_show = !this.is_show
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.pages-technician-label {
		.list-item {

			.list-child {
				width: auto;
				min-width: 120rpx;
				height: 70rpx;
				display: inline-block;
				padding: 0 20rpx;
				margin: 0 18rpx 23rpx 0;

				.tag-item {
					height: 70rpx;

					.icon-add {
						font-size: 24rpx;
						margin-right: 5rpx;
					}
				}

				.bg-item {
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0.15;
				}

			}

			.cur {
				margin: 0 20rpx 28rpx 0;
			}
		}

		.iconshang,
		.iconxia {
			font-size: 22rpx;
		}

		.eva-list-item {
			.flex-1 {
				margin-left: 14rpx;
			}

			.name {
				height: 80rpx
			}
		}
	}
</style>