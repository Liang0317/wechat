<template>
	<view class="recorder">
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	var timer = null
	export default {
		data() {
			return {
				stream: null,
				recorder: null,
				chunks: [],
				startTime: 0,
				duration_time: 300,
				duration: 0,
				is_save: false
			}
		},
		mounted() {
			/**
			 * 	error 事件的返回状态
			 * 	100: 请在HTTPS环境中使用
			 * 	101: 浏览器不支持
			 *  201: 用户拒绝授权
			 *  500: 未知错误
			 * */
			if (origin.indexOf('https') === -1) {
				this.$emit('error', '100')
				throw '请在 https 环境中使用本插件。'
			}
			if (!navigator.mediaDevices || !window.MediaRecorder) {
				this.$emit('error', '101')
				throw '当前浏览器不支持'
			}
			this.getRecorderManager()
		},
		computed: mapState({
			isUserMedia: state => state.order.isUserMedia,
			recorder_status: state => state.order.recorder_status
		}),
		watch: {
			duration(newVal, oldVal) {
				let {
					recorder_status,
					duration_time
				} = this
				let isReset = duration_time - newVal > 1 ? false : true
				console.log(newVal, recorder_status, isReset, "========newVal, recorder_status, isReset")
				if (recorder_status && isReset) {
					this.save()
				}
			}
		},
		methods: {
			...mapMutations(['updateOrderItem']),
			getRecorderManager() {
				navigator.mediaDevices.getUserMedia({
					audio: true
				}).then(stream => {
					this.updateOrderItem({
						key: 'isUserMedia',
						val: true
					})
					stream.getTracks().forEach((track) => {
						track.stop()
					})
				}).catch(err => {
					this.onErrorHandler(err)
				})
			},
			async start() {
				if (!this.isUserMedia) return console.log('设备不支持')
				navigator.mediaDevices.getUserMedia({
					audio: true
				}).then(stream => {
					this.stream = stream
					this.recorder = new MediaRecorder(stream)
					this.recorder.ondataavailable = this.getRecordingData
					this.recorder.onstop = this.saveRecordingData
					this.recorder.start()
					this.recordingTimer()
				}).catch(err => {
					this.onErrorHandler(err)
				})
			},
			async stop() {
				this.recorder.stop()
				this.stream.getTracks().forEach((track) => {
					track.stop()
				})
			},
			async save() {
				this.is_save = true
				await Promise.all([this.stop(), this.recordingTimer(false)])
				setTimeout(() => {
					this.chunks = []
					this.start()
				}, 500)
			},
			clear() {
				this.chunks = []
				if (timer) clearInterval(timer)
			},
			async recordingTimer(flag = true) {
				if (flag) {
					timer = setInterval(() => {
						let {
							duration
						} = this
						duration++
						this.duration = duration
					}, 1000)
				} else {
					this.duration = 0
					clearInterval(timer)
					timer = null
					console.log("暂停计时 recordingTimer", timer)
				}
			},
			getRecordingData(e) {
				this.chunks.push(e.data)
			},
			saveRecordingData() {
				let data = new Blob(this.chunks, {
					'type': 'audio/mpeg'
				})
				this.$emit('success', {
					data
				})
				if (this.is_save) {
					this.$emit('save')
					this.is_save = false
				}
			},
			onErrorHandler(err) {
				console.log(err, '========onErrorHandler')
				if (err.name === 'NotAllowedError') {
					this.$emit('error', '201')
					throw '用户拒绝了当前的浏览器实例的访问请求'
				}

				if (err.name === 'NotReadableError') {
					this.$emit('error', '101')
					throw '当前浏览器不支持'
				}

				this.$emit('error', '500')
				throw '调用失败，原因不详'

			}
		},
		destroyed() {
			this.stop()
			if (timer) clearInterval(timer)
		}
	}
</script>
<style>
</style>