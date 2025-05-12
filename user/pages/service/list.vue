<template>
	<view class="pages-service">
		<fixed>
			<search @input="toSearch" type="input" :padding="30" :radius="0" placeholder="请输入服务名称">
			</search>
		</fixed>

		<view class="fill-base mt-md ml-md mr-md pd-lg radius-16" v-for="(item,index) in list.data" :key="index">
			<service-list-item :info="item"></service-list-item>
		</view>

		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1">
		</abnor>
		<view class="space-footer"></view>
 
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import serviceListItem from "@/components/service-list-item.vue"
	export default {
		components: {
			serviceListItem
		},
		data() {
			return {
				options: {},
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			location: state => state.user.location
		}),
		onLoad(options) {
			let {
				title = 0
			} = options
			this.options = options
			uni.setNavigationBarTitle({
				title
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
			...mapMutations(['updateUserItem', 'updateOrderItem', 'updateTechnicianItem',
				'updateMapItem', 'updateShopstoreItem', 'updateDynamicItem'
			]),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				await this.getList()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			toSearch(val) {
				this.param.page = 1
				this.param.title = val
				this.getList()
			},
			async getList() {
				let {
					list: oldList,
					param
				} = this
				let {
					id
				} = this.options
				param.cate_id = id
				let newList = await this.$api.service.serviceList(param);

				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
		}
	}
</script>


<style lang="scss">
</style>