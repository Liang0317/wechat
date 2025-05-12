<template>
	<view class="shopstore-service">


		<view class="fill-base mt-md ml-md mr-md pd-lg radius-16" v-for="(item,index) in list.data" :key="index">
			<service-list-item :info="item" :sid="options.id"></service-list-item>
		</view>


		<load-more :noMore="list.current_page >= list.last_page && list.data.length > 0" :loading="loading"
			v-if="loading">
		</load-more>
		<abnor v-if="!loading && list.data.length <= 0 && list.current_page == 1"></abnor>

		<view class="space-footer"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
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
				loading: true,
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				count: {}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
		}),
		onLoad(options) {
			this.options = options
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			this.$util.showLoading()
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
				this.getList()
			},
			async initRefresh() {
				this.param.page = 1
				await this.initIndex(true)
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
				let newList = await this.$api.shopstore.storeServiceList(param)
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
</style>