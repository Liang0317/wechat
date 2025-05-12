<template>
	<view class="min-countdown" :class="countdownClass">
		<rich-text :nodes="time" v-if="type == 1"></rich-text>
		<view class="flex-y-center" :style="{color:color}" v-if="type == 2">
			<view class="count-tag flex-center" :class="[{'c-base':!countdownClass}]" :style="{background:bgColor}">
				{{time.d || '00'}}
			</view>天
			<view class="count-tag flex-center" :class="[{'c-base':!countdownClass}]" :style="{background:bgColor}">
				{{time.h || '00'}}
			</view>时
			<view class="count-tag flex-center" :class="[{'c-base':!countdownClass}]" :style="{background:bgColor}">
				{{time.m || '00'}}
			</view>分
			<view class="count-tag flex-center" :class="[{'c-base':!countdownClass}]" :style="{background:bgColor}">
				{{time.s || '00'}}
			</view>秒
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	export default {
		name: 'min-countdown',
		props: {
			type: {
				type: Number,
				default: 1
			},
			targetTime: {
				type: Number,
				default: 0
			},
			format: {
				type: String,
				default: '{%d}天{%h}小时{%m}分{%s}秒'
			},
			countdownClass: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				time: '00:00:00',
				audioBg: {},
				playBg: false,
			}
		},
		async mounted() {
			this.getTime()
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			isHaveAudio: state => state.user.isHaveAudio,
		}),
		methods: {
			...mapActions([]),
			...mapMutations(['updateUserItem']),
			initIndex() {
				setTimeout(() => {
					this.getTime()
				}, 1000)
			},
			getTime() {
				let time = {}
				let format = this.format

				function formatNumber(num) {
					return num > 9 ? `${num}` : `0${num}`
				}
				const gapTime = Math.ceil((this.targetTime - new Date().getTime()) / 1000)
				if (gapTime >= 0) {
					time.d = formatNumber(parseInt(gapTime / 86400))
					let lastTime = gapTime % 86400;
					time.h = formatNumber(parseInt(lastTime / 3600))
					lastTime = lastTime % 3600;
					time.m = formatNumber(parseInt(lastTime / 60))
					time.s = formatNumber(lastTime % 60);
					['d', 'h', 'm', 's'].forEach(item => {
						const day = time[item].split('');
						format = format.replace('{%' + item + '}', time[item])
						format = format.replace('{%' + item + '0}', day[0])
						format = format.replace('{%' + item + '1}', day[1])
						format = format.replace('{%' + item + '2}', day[2] ? day[2] : '0')
					})
					this.time = this.type == 1 ? format : gapTime == 0 ? {
						d: '00',
						h: '00',
						m: '00',
						s: '00'
					} : time
					this.initIndex() 
				} else {
					this.time = this.type == 1 ? '00:00:00' : {
						d: '00',
						h: '00',
						m: '00',
						s: '00'
					}
					this.$emit('callback')
				}
			}
		}
	}
</script>

<style lang="scss">
	.min-countdown {
		display: inline-flex;
		justify-content: center;
		align-items: center;

		.count-tag {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			border-radius: 8rpx;
		}
	}

	.coupon-share {
		.count-tag {
			background: linear-gradient(0deg, #F7D9AD 0%, #FBEACB 100%);
		}
	}
</style>