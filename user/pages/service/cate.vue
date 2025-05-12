<template>
	<view class="user-service-cate" v-if="isLoad">
		
		<view class="flex-warp ml-md mr-md">
			<view @tap.stop="goDetail(index)" class="list-item flex-center flex-column"
				v-for="(item,index) in service_all_cate" :key="index">
				<image mode="aspectFill" class="cover radius" :src="item.cover"></image>
				<view class="text mt-sm f-caption ellipsis">{{item.title}}</view>
			</view>
		</view>
		
		<view class="space-footer"></view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				options: {},
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			service_all_cate: state => state.service.service_all_cate,
		}),
		onLoad(options) {
			this.options = options
			this.initIndex()
		},
		methods: {
			...mapMutations(['updateUserItem', 'updateOrderItem']),
			async initIndex() {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif 
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.isLoad = true
			},
			goDetail(index) {
				let {
					id,
					title
				} = this.service_all_cate[index]
				let url = `/user/pages/service/list?id=${id}&title=${title}`
				this.$util.goUrl({
					url
				})
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: #fff;
	}

	.user-service-cate {

		.flex-warp {

			.list-item {
				width: 142rpx;
				margin-top: 40rpx;


				.cover {
					width: 94rpx;
					height: 94rpx;
				}

				.text {
					color: #484848;
				}

			}
		}
	}
</style>