<template>
	<view>
		<view :prop="info" :change:prop="amap.updateEcharts" id="amap" class="amap">
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		props: {
			info: {
				type: Object,
				default () {
					return {
						amapKey: '',
						location: {
							lat: 0,
							lng: 0
						},
						mapList: []
					}
				}
			}
		},
		data() {
			return {
				dataIndex: '',
			}
		},
		methods: {
			//地图点击回调事件
			onViewClick(params) {
				let {
					dataIndex
				} = params
				this.dataIndex = dataIndex
				this.$emit('detail', {
					detail: {
						markerId: dataIndex
					}
				})
			}
		}
	}
</script>
<script module="amap" lang="renderjs">
	export default {
		data() {
			return {
				initMap: false,
				markers: [],
				map: null,
				ownerInstanceObj: null //service层对象
			}
		},
		mounted() {
			if (typeof window.AMap === 'function') {
				this.initAmap()
			} else {
				let {
					amapKey
				} = this.info
				amapKey = amapKey || '932d4222e3ba09d24dec0309bdc780c3'
				const script = document.createElement('script')
				script.src = 'https://webapi.amap.com/maps?v=2.0&key=' + amapKey
				script.onload = this.initAmap.bind(this)
				document.head.appendChild(script)
				const style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML =
					'.amap-icon img {width: 30px;height: 30px;object-fit: cover;border: 2px solid #fff !important;box-sizing: border-box;box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.01);border-radius: 50% !important;}';
				document.head.appendChild(style);
				// 动态引入较大类库避免影响页面展示
			}
		},
		methods: {
			initAmap() {
				this.map = new AMap.Map('amap', {
					resizeEnable: true,
					zooms: [8, 16], //设置地图级别范围
					zoom: 12, //设置地图缩放比例
				});
				this.initMap = true
			},
			//初始化标记点
			initMarkers(flag = false) {
				let {
					mapList,
					location = null
				} = this.info
				let {
					markers
				} = this
				if (location && !flag) {
					let {
						lat,
						lng
					} = location
					this.map.setCenter([lng, lat])
				}
				if (markers.length > 0) {
					this.map.remove(markers)
				}
				let markerList = []
				mapList.map((item, index) => {
					let marker = new AMap.Marker({
						clickable: true, //是否可点击
						position: new AMap.LngLat(item.lng, item.lat),
						icon: new AMap.Icon({ //自定义图标
							size: new AMap.Size(40, 40), //图标显示大小
							image: item.work_img,
							imageSize: new AMap.Size(40, 40), //图标缩放大小
						})
					})

					marker.on('click', (e) => {
						this.dataIndex = index
						this.onClick(this.ownerInstanceObj)
					})

					markerList.push(marker)
					//添加多个点标记
				})
				this.map.add(markerList)
				this.markers = markerList
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				let isSameLoca = this.map && JSON.stringify(newValue.location) == JSON.stringify(oldValue.location)
				// 监听 service 层数据变更
				this.ownerInstanceObj = ownerInstance
				this.toInitMarker(isSameLoca)
			},
			toInitMarker(flag = false) {
				if (this.initMap) {
					this.initMarkers(flag)
				} else {
					setTimeout(() => {
						this.toInitMarker(flag)
					}, 500)
				}
			},
			onClick(ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					dataIndex: this.dataIndex
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.amap {
		width: 100%;
		height: 100vh;
	}
</style>