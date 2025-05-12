<template>
	<view class='search-box'
		:style='{padding:`${padding}rpx`,margin:`${margin}rpx`,borderRadius:`${radius}rpx`,background:backgroundColor}'>
		<view class='search-item' :class="[{'flex-y-center': type == 'text'},{'flex-between': type == 'input'}]"
			:style='{borderRadius:searchStyleObj[searchStyle],background:frontColor,justifyContent:textAlign,height:height}'>
			<block v-if="type=='text'">
				<image src='https://lbqny.migugu.com/admin/public/search.png' class="search-icon"></image>
				<view class='ml-md placeholder'>{{placeholder}}</view>
			</block>
			<block v-if="type=='input'">
				<view class="flex-y-center flex-1">
					<image src='https://lbqny.migugu.com/admin/public/search.png' class="search-icon"></image>
					<input type='text' class="flex-1 ml-md mr-md f-paragraph c-title" :disabled="disabled"
						:placeholder='placeholder' placeholder-class='f-paragraph c-caption' confirm-type="search"
						@input="handerInput" :value="keyword" @confirm="confirm" :auto-focus="autofocus"></input>
				</view>
				<view class='search-item-btn flex-center radius' :style="{background:primaryColor}" @tap='confirm'
					v-if="confirmSearch">搜索</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		name: 'search',
		props: {
			type: {
				type: String,
				default () {
					return 'text'
				}
			},
			placeholder: {
				type: String,
				default () {
					return "输入关键字进行搜索"
				}
			},
			searchStyle: {
				type: String,
				default () {
					return 'circle'
				}
			},
			textAlign: {
				type: String,
				default () {
					return 'center'
				}
			},
			padding: {
				type: Number,
				default () {
					return 30
				}
			},
			margin: {
				type: Number,
				default () {
					return 0
				}
			},
			radius: {
				type: Number,
				default () {
					return 0
				}
			},
			height: {
				type: String,
				default () {
					return '64rpx'
				}
			},
			backgroundColor: {
				type: String,
				default () {
					return '#fff'
				}
			},
			frontColor: {
				type: String,
				default () {
					return '#f4f6f8'
				}
			},
			autofocus: {
				type: Boolean,
				default () {
					return false
				}
			},
			disabled: {
				type: Boolean,
				default () {
					return false
				}
			},
			focus: {
				type: Boolean,
				default () {
					return false
				}
			},
			keyword: {
				type: String,
				default () {
					return ''
				}
			},
			confirmSearch: {
				type: Boolean,
				default () {
					return false
				}
			}
		},
		created() {

		},
		data() {
			return {
				searchStyleObj: {
					square: '0rpx',
					radius: '10rpx',
					circle: '30rpx'
				},
				text: ''
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		methods: {
			confirm(e) {
				let val = this.text;
				this.$emit("confirm", val)
			},
			handerInput(e) {
				let val = e.detail.value;
				this.text = val;
				this.$emit("input", val)
			}
		},
	}
</script>


<style>
	.search-box {
		padding: 16rpx 16rpx;
		display: flex;
		align-items: center;
		background: #efeff5;
	}

	.search-item {
		width: 100%;
		background: #ffffff;
		border-radius: 30rpx;
		padding: 0 0 0 25rpx;
		line-height: 1;
		font-size: 28rpx;
		color: #888;
	}

	.placeholder {
		font-size: 28rpx;
		color: #999;
	}

	.search-item-btn {
		width: 110rpx;
		height: 62rpx;
		margin: 4rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #ffffff;
	}

	.search-btn {
		padding: 0 20rpx 0 40rpx;
	}

	.search-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.flex-1 {
		flex: 1;
	}

	.icon-md {
		width: 40rpx;
		height: 40rpx;
	}

	.ml-md {
		margin-left: 16rpx;
	}
</style>