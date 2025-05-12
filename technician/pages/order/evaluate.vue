<template>
	<view class="pages-technician-evaluate">

		<fixed>
			<view class="flex-between fill-base pd-lg">
				<view class="flex-warp">
					<view @tap.stop="handerTabChange(index)"
						class="type-btn sm flex-center mr-md f-paragraph c-title radius-10"
						:style="{background:activeIndex==index?primaryColor:'#f4f6f8',color:activeIndex==index?'#fff':''}"
						v-for="(item,index) in tabList" :key="index">
						{{item.title}}
					</view>
				</view>
				<view @tap.stop="toEdit" class="f-paragraph c-title text-bold" :style="{color:edit?primaryColor:''}">
					评价管理</view>
			</view>
		</fixed>
		<view class="space-sm"></view>
		<view @tap.stop="toCheck(index)" class="list-item flex-center fill-base pl-lg pr-lg"
			v-for="(item,index) in list.data" :key="index">
			<i class="iconfont mr-md" :class="[{'icon-xuanze': !item.is_check},{'icon-radio-fill': item.is_check}]"
				:style="{color:item.is_check?primaryColor:''}" v-if="edit"></i>
			<view class="flex-1 flex-warp pt-lg pb-lg" :class="[{'b-1px-t':index!=0}]">
				<image mode="aspectFill" class="item-avatar radius" :src="item.avatarUrl"></image>
				<view class="flex-1 ml-md">
					<view class="flex-between">
						<view class="flex-y-center">
							<view class="f-paragraph c-title mr-md ellipsis"
								:class="[{'max-200':!edit},{'max-150':edit}]">{{item.nickName}}
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
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<view :class="[{'space-footer':!edit},{'space-max-footer':edit}]"></view>
		<view class="footer-info fill-base pd-lg fix" v-if="edit">
			<view class="flex-between">
				<view>已选中{{total}}条</view>
				<view class="flex-y-center">
					<view @tap.stop="submit(0)" class="type-btn flex-center f-desc c-title radius fill-body"
						v-if="!total || is_cancel">取消优质评价
					</view>
					<view @tap.stop="submit(1)" class="type-btn flex-center f-desc c-base radius ml-md"
						:style="{background:primaryColor}" v-if="!total || is_confirm">
						设为优质评价
					</view>
				</view>
			</view>
			<view class="space-safe"></view>
		</view>
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
				tabList: [{
					id: 0,
					title: '全部'
				}, {
					id: 1,
					title: '好评'
				}, {
					id: 2,
					title: '差评'
				}],
				activeIndex: 0,
				edit: false,
				total: 0,
				is_confirm: 0,
				is_cancel: 0,
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
				this.getList(1)
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex()
			},
			handerTabChange(index) {
				this.activeIndex = index;
				this.$util.showLoading()
				this.param.page = 1
				this.list.data = []
				this.getList()
			},
			async getList() {
				let {
					list: oldList,
					param,
					tabList,
					activeIndex
				} = this
				let {
					id
				} = tabList[activeIndex]
				param.is_good = id
				let newList = await this.$api.technician.commentList(param)
				newList.data.map(item => {
					item.is_check = false
				})
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			toEdit() {
				this.edit = !this.edit
			},
			toCheck(index) {
				if (!this.edit) return
				let {
					is_check
				} = this.list.data[index]
				this.list.data[index].is_check = !is_check
				let arr = this.list.data.filter(item => {
					return item.is_check
				})
				this.total = arr.length
				this.is_confirm = arr.filter(item => {
					return !item.is_good
				}).length
				this.is_cancel = arr.filter(item => {
					return item.is_good
				}).length
			},
			async submit(is_good) {
				let arr = this.list.data.filter(item => {
					return item.is_check
				})
				if (arr.length === 0) {
					this.$util.showToast({
						title: `请选择要设置的评价数据`
					})
					return
				}

				let check_good = is_good ? 0 : 1
				let id = arr.filter(item => {
					return item.is_good == check_good
				}).map(aitem => {
					return aitem.id
				})

				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.technician.updateCommentGood({
						id,
						is_good
					})
					this.lockTap = false
					this.$util.hideAll()
					this.initRefresh()
					this.total = 0
					this.is_confirm = 0
					this.is_cancel = 0
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			}
		}
	}
</script>

<style lang="scss">
	.pages-technician-evaluate {
		.type-btn {
			width: auto;
			height: 58rpx;
			padding: 0 30rpx;
		}

		.icon-xuanze,
		.icon-radio-fill {
			font-size: 38rpx;
			color: #BEC3CE
		}

		.list-item {
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

		.footer-info {
			left: 0;
			bottom: 0;
			width: 100%;
		}
	}
</style>