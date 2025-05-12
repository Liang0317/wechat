<template>
	<view>
		<scroll-view class="scroll-left fill-base" scroll-y :scroll-into-view="scrollNav" :scroll-with-animation="true">
			<block v-for="(item,index) in areaOptions" :key="index">
				<view @tap="onChangeNav(index,1)" :id="`scrollNav${index}`"
					class="item-child flex-center f-paragraph c-title" :class="[{'active':index==scrollInd}]"
					:style="{color: index == scrollInd ? primaryColor: ''}">
					<view class="flex-center child ellipsis"
						:style="{borderLeft: index == scrollInd ? `5rpx solid ${primaryColor}`:''}">
						{{item.title}}
					</view>
				</view>
			</block>
			<view class="space-safe"></view>
		</scroll-view>
		<view class="scroll-right abs fill-base pl-lg">
			<view @tap="onChangeNav(index,2)" class="item-child flex-center f-paragraph c-paragraph"
				style="padding-right: 25rpx;" :style="{color: index == checkInd ? primaryColor: ''}"
				v-for="(item,index) in areaOptions[scrollInd].cities" :key="index">
				<view class="flex-1">{{item.title}}</view>
				<i class="iconfont icon-xuanze-fill" v-if="index == checkInd"></i>
			</view>
			<view class="space-safe"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import provinceAndCityData from '@/utils/adapay.json'
	export default {
		data() {
			return {
				options: {},
				areaOptions: provinceAndCityData,
				loading: false,
				scrollNav: 'scrollNav0',
				scrollInd: 0,
				checkInd: -1
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		async onLoad(options) {
			// #ifdef H5
			if (this.$jweixin.isWechat()) {
				await this.$jweixin.initJssdk();
				this.$jweixin.wxReady(() => {
					this.$jweixin.hideOptionMenu()
				})
			}
			// #endif
			let {
				key
			} = options
			this.options = options
			let area = this.$util.getPage(-1).form[key]
			if (area && area.length > 0) {
				let ind = this.areaOptions.findIndex(item => {
					return item.value === area[0]
				})
				this.scrollInd = ind
				this.scrollNav = `scrollNav${ind}`
				let ind1 = this.areaOptions[ind].cities.findIndex(item => {
					return item.value === area[1]
				})
				this.checkInd = ind1
			}
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
		},
		methods: {
			async onChangeNav(index, type = 1) {
				if (type === 1) {
					this.scrollInd = index
					this.checkInd = -1
				} else {
					this.checkInd = index
					let {
						title,
						value,
						cities
					} = this.areaOptions[this.scrollInd]
					let {
						title: ctitle,
						value: cval
					} = cities[this.checkInd]
					let area = [value, cval]
					let area_text = `${title} ${ctitle}`
					let {
						key
					} = this.options
					this.$util.getPage(-1).form[key] = area
					this.$util.getPage(-1).form[`${key}_text`] = area_text
					this.$util.goUrl({
						url: 1,
						openType: 'navigateBack'
					})
				}
			}
		}
	}
</script>

<style>
	.scroll-left {
		width: 260rpx;
		height: 100vh;
		position: fixed;
		top: 0;
		bottom: 0;
	}

	.item-child {
		height: 98rpx;
	}

	.item-child.active {
		background: #F9F9F9;
	}

	.item-child .child {
		width: 100%;
		height: 32rpx;
		padding: 0 5%;
	}

	.scroll-right {
		min-height: 100vh;
		top: 0;
		width: 460rpx;
		margin-left: 292rpx;
	}
</style>