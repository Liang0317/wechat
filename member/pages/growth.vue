<template>
	<view class="technician-cash-integral">
		<fixed zIndex="997">
			<view class="record-search-info fill-body pt-md pl-md c-base">
				<view class="record-info flex-center flex-column radius-32" :style="{background:primaryColor}">
					<view class="f-md-title text-bold">{{list.growth || 0}}</view>
					<view @tap.stop="$refs.show_rule_item.open()" class="flex-y-center f-caption">当前{{growth_name}}<i
							class="iconfont iconwentifankui3 ml-sm"></i></view>
				</view>
			</view>
		</fixed>
		<view class="fill-base" v-if="isLoad && list.data.length>0">
			<block v-for="(item,index) in list.data" :key="index">
				<view @tap.stop="toShowTimePopup($event,item.month)"
					class="count-item flex-between fill-body pl-md pr-md"
					v-if="index==0 || (index>0&&item.month!=list.data[index-1].month)">
					<veiw class="title flex-y-center">
						<view class="f-title c-title text-bold">{{item.month_text}}</view>
					</veiw>
					<view class="flex-y-center f-desc c-caption">共获取{{growth_name}}
						<view class="f-title ml-sm" :style="{color:item.total_growth*1>0?'#0A0A0A':'#FF2404'}">
							{{item.total_growth*1>0?`+${item.total_growth}`:item.total_growth}}
						</view>
					</view>
				</view>
				<view @tap.stop="goDetail(index)" class="list-item pt-lg pb-lg ml-lg mr-lg"
					:class="[{'b-1px-t':index!=0}]">
					<view class="flex-between">
						<view class="f-mini-title c-title text-bold max-500" style="word-break: break-all">
							{{item.type_text}}
						</view>
						<view class="flex-y-center f-caption" :style="{color:item.is_add?primaryColor:'#FF2404'}">
							{{item.is_add?'+':'-'}}
							<view class="f-mini-title">
								{{item.growth}}
							</view>
						</view>
					</view>
					<view class="f-caption c-caption mt-sm">{{item.create_time}} </view>
				</view>
			</block>
		</view>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		<view class="space-footer"></view>

		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">当前{{growth_name}}</view>
				<view class="f-desc c-title mt-lg">
					每年1月1日更新核算，并实行降一级制度
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
	import $util from "@/utils/index.js"
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				growth_name: '',
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
		}),
		async onLoad() {
			let {
				growth_name
			} = this.$util.getPage(-1).detail
			this.growth_name = growth_name
			uni.setNavigationBarTitle({
				title: growth_name
			})
			await this.initIndex()
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
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				await this.getList()
				this.isLoad = true
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
				let newList = await this.$api.member.growthList(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			}
		}
	}
</script>


<style lang="scss">
	.technician-cash-integral {

		.record-search-info {
			width: 750rpx;

			.record-info {
				width: 710rpx;
				height: 203rpx;

				.iconfont {
					font-size: 28rpx;
				}
			}
		}

		.count-item {
			height: 120rpx;

			.title {
				padding-top: 18rpx;

				.iconfont {
					font-size: 16rpx;
				}
			}

		}

		.list-item {
			.avatar {
				width: 155rpx;
				height: 155rpx;
			}

			.item-bell {
				width: 66rpx;
				height: 30rpx;
				border-radius: 4rpx;
			}
		}

	}
</style>