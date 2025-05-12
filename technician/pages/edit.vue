<template>
	<view class="apply-pages">
		<block v-if="isLoad">
			<view class="apply-form">
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>姓名</view>
						<input v-model="form.coach_name" type="text" class="item-input flex-1" maxlength="15"
							:placeholder="rule[0].errorMsg" />
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>性别</view>
						<view class="item-input flex-1 flex-y-center">
							<view @tap.stop="form.sex = index" class="flex-y-center" :class="[{'mr-lg':index==0}]"
								:style="{color:form.sex == index ? primaryColor:''}" v-for="(item,index) in ['男','女']"
								:key="index"><i class="iconfont icon-xuanze mr-sm"
									:class="[{'icon-xuanze-fill':form.sex == index}]"></i>{{item}}
							</view>
						</view>
					</view>
					<view class="flex-between ml-lg mr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>生日</view>
						<view class="item-input text flex-1">
							<picker @change="pickerChange($event,'birthday')" mode="date" :value="form.birthday">
								<view class="flex-between">
									{{form.birthday||'请选择'}}
									<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
								</view>
							</picker>
						</view>
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>手机号</view>
						<input v-model="form.mobile" type="text" class="item-input flex-1" maxlength="11"
							:placeholder="rule[2].errorMsg" />
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b"
						v-if="configInfo.short_code_status && form.mobile.length==11 &&form.mobile !== old_phone">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>验证码</view>
						<view class="flex-between">
							<input v-model="form.short_code" type="text" class="item-input flex-1" maxlength="6"
								placeholder="请输入验证码" />
							<view @tap.stop="toSend" :style="{color:primaryColor}">
								{{authTime>0?`重新获取(${authTime}s)`:'获取验证码'}}
							</view>
						</view>
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>从业年份
						</view>
						<input v-model="form.work_time" type="number" class="item-input flex-1"
							:placeholder="rule[3].errorMsg" />
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>意向工作城市
						</view>
						<view class="item-input text flex-1">
							<picker @change="pickerChange($event,'city')" :value="cityIndex" :range="cityList"
								range-key="title">
								<view class="flex-between">
									{{cityIndex!=-1?cityList[cityIndex].title:'请选择'}}
									<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
								</view>
							</picker>
						</view>
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b" v-if="configInfo.plugAuth.store && form.admin_id">
						<view class="item-text">挂靠门店</view>
						<view class="item-input text flex-1">
							<picker @change="pickerChange($event,'store')" :value="storeIndex" :range="storeList"
								range-key="title">
								<view class="flex-between">
									<view class="max-400 ellipsis">{{storeIndex!=-1?storeList[storeIndex].title:'请选择'}}
									</view>
									<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
								</view>
							</picker>
						</view>
					</view>
					<block v-if="configInfo.free_fare_bear">
						<view class="flex-between pl-lg pr-lg b-1px-b">
							<view class="item-text" style="height:auto">免出行费半径距离</view>
							<view class="flex-1 flex-center">
								<input v-model="form.free_fare_distance" type="digit" class="item-input flex-1"
									:placeholder="rule[5].errorMsg" />
								<view class="c-title">km</view>
							</view>
						</view>
					</block>
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>所在地址
						</view>
						<view class="item-input text flex-1">
							<view @tap.stop="toChooseLocation" class="flex-between">
								<view>{{form.address || `点击右边图标设置`}}</view>
								<i class="iconfont iconjuli ml-sm" :style="{color: primaryColor}"></i>
							</view>
						</view>
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text flex-y-center" style="width:auto"><i
								class="iconfont icon-required c-warning"></i>{{$t('action.attendantName')}}简介</view>
						<input :disabled="true" type="text" class="item-input flex-1" />
					</view>
					<textarea v-model="form.text" class="item-textarea pd-lg" maxlength="300"
						:placeholder="rule[7].errorMsg" />
					<view class="text-right pb-lg pr-lg">
						{{form.text.length>300?300:form.text.length}}/300
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>身份证号
						</view>
						<input v-model="form.id_code" type="text" class="item-input flex-1"
							:placeholder="rule[8].errorMsg" />
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text tips flex-y-center"><i class="iconfont icon-required c-warning"></i>身份证照片
						</view>
						<view class="item-input flex-1">图片大小不超过10M</view>
					</view>
					<view class="flex-between pl-lg pr-lg pb-md">
						<upload @upload="imgUpload" :imagelist="form.id_card" imgtype="id_card" imgclass="md"
							text="身份证人像面" :imgsize="1"></upload>
						<upload @upload="imgUpload" :imagelist="form.id_card_fan" imgtype="id_card_fan" imgclass="md"
							text="身份证国徽面" :imgsize="1"></upload>
					</view>
					<view class="flex-between pl-lg pr-lg pb-md">
						<upload @upload="imgUpload" :imagelist="form.id_card_people" imgtype="id_card_people"
							imgclass="md" text="手持身份证照片" :imgsize="1"></upload>
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text tips flex-y-center"><i class="iconfont icon-required c-warning"></i>资格证书
						</view>
						<view class="item-input flex-1">图片大小不超过10M</view>
					</view>
					<view class="flex-between pl-lg pr-lg pb-md">
						<upload @upload="imgUpload" @del="imgUpload" :imagelist="form.license" imgtype="license"
							text="上传图片" :imgsize="15">
						</upload>
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text tips flex-y-center"><i class="iconfont icon-required c-warning"></i>工作形象照
						</view>
						<view class="item-input flex-1">图片建议尺寸: 750 * 750，大小不超过10M</view>
					</view>
					<view class="flex-between pl-lg pr-lg pb-md">
						<upload @upload="imgUpload" :imagelist="form.work_img" imgtype="work_img" text="上传图片"
							:imgsize="1">
						</upload>
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text tips flex-y-center"><i class="iconfont icon-required c-warning"></i>个人生活照
						</view>
						<view class="item-input flex-1">图片建议尺寸: 750 * n，大小不超过10M</view>
					</view>
					<view class="flex-between pl-lg pr-lg pb-md">
						<upload @upload="imgUpload" @del="imgUpload" :imagelist="form.self_img" filetype="picture"
							imgtype="self_img" text="上传图片" :imgsize="9">
						</upload>
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text tips">个人视频介绍</view>
						<view class="item-input flex-1">视频大小不超过50M</view>
					</view>
					<view class="flex-between pl-lg pr-lg pb-md">
						<upload @upload="imgUpload" @del="imgUpload" :imagelist="form.video" filetype="video"
							imgtype="video" text="上传视频" :imgsize="1">
						</upload>
					</view>
				</view>
				<view class="flex-center f-caption c-caption pd-lg">
					编辑资料将进入重新审核，审核通过之前将显示原资料
				</view>
			</view>

			<view class="space-max-footer"></view>

			<fix-bottom-button @confirm="submit" :text="[{text:'确定申请',type:'confirm'}]" bgColor="#fff">
			</fix-bottom-button>

		</block>
		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				isLoad: false,
				options: {},
				cityList: [],
				cityIndex: -1,
				storeList: [],
				storeIndex: 0,
				old_phone: '',
				authTime: 0,
				timer: null,
				coach_status: 0,
				form: {
					id: 0,
					admin_id: 0,
					coach_name: '', //姓名 
					mobile: '', //手机号 
					short_code: '',
					sex: 0, //性别 
					birthday: '',
					work_time: '', //从业年份 
					city_id: '', //城市 
					store_id: '', //门店
					free_fare_distance: '',
					lng: '',
					lat: '',
					address: '', //详细地址 
					text: '', //备注 
					id_code: '', //身份证号
					id_card: [], //身份证
					id_card_fan: [], // 身份证反面
					id_card_people: [], //手持身份证
					license: [], //资格证书
					work_img: [], // 工作照
					self_img: [], // 生活照
					city_id: '', // 城市 id
					video: [],
				},
				rule: [{
						name: "coach_name",
						checkType: "isNotNull",
						errorMsg: "输入您的姓名",
						regType: 2
					}, {
						name: "birthday",
						checkType: "isNotNull",
						errorMsg: "请选择您的生日",
						regType: 2
					}, {
						name: "mobile",
						checkType: "isMobile",
						errorMsg: "输入手机号"
					}, {
						name: "work_time",
						checkType: "isNumber",
						errorMsg: "请输入从业年份，例如：5",
						regType: 2
					}, {
						name: "city_id",
						checkType: "isNotNull",
						errorMsg: "请选择意向工作城市"
					}, {
						name: "free_fare_distance",
						checkType: "isFloatNum",
						errorMsg: "请输入公里数",
						regType: 2,
						maxNum: '',
						unit: '公里'
					},
					{
						name: "address",
						checkType: "isNotNull",
						errorMsg: "请选择所在地址"
					},
					{
						name: "text",
						checkType: "isNotNull",
						errorMsg: "请输入" + this.$t('action.attendantName') + "简介",
						regType: 2
					},
					{
						name: "id_code",
						checkType: "isIdCard",
						errorMsg: "输入您的身份证号码"
					},
					{
						name: "id_card",
						checkType: "isNotNull",
						errorMsg: "请上传身份证人像面"
					},
					{
						name: "id_card_fan",
						checkType: "isNotNull",
						errorMsg: "请上传身份证国徽面"
					},
					{
						name: "id_card_people",
						checkType: "isNotNull",
						errorMsg: "请上传手持身份证照片"
					},
					{
						name: "license",
						checkType: "isNotNull",
						errorMsg: "请上传资格证书"
					},
					{
						name: "work_img",
						checkType: "isNotNull",
						errorMsg: "请上传工作形象照"
					},
					{
						name: "self_img",
						checkType: "isNotNull",
						errorMsg: "请上传个人生活照"
					},
				],
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			locaRefuse: state => state.user.locaRefuse,
			useChooseLocation: state => state.user.useChooseLocation,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			noChangeLoca: state => state.user.noChangeLoca,
		}),
		async onLoad(options) {
			let {
				admin_id = 0,
					is_edit = 0
			} = options
			options.is_edit = is_edit
			options = admin_id ? await this.updateCommonOptions(options) : options
			this.options = options
			this.form.admin_id = admin_id
			this.$util.showLoading()
			await this.initIndex()
		},
		async onShow() {
			if (this.useChooseLocation) {
				this.updateUserItem({
					key: 'useChooseLocation',
					val: false
				})
			}
			if (!this.location.lat && this.locaRefuse) {
				this.toResetUtilLoca()
			}
		},
		// #ifdef H5
		destroyed() {
			if (this.timer) clearInterval(this.timer)
		},
		// #endif
		// #ifndef H5
		onUnload() {
			if (this.timer) clearInterval(this.timer)
		},
		// #endif  
		watch: {
			locaRefuse(newval, oldval) {
				if (!newval) {
					this.toResetUtilLoca()
				}
			},
			changeOnAddr(newval, oldval) {
				let {
					noloca,
				} = this.noChangeLoca
				if (newval && noloca) {
					this.initUtilLocaData()
				}
			},
			noChangeLoca(newval, oldval) {
				setTimeout(() => {
					let {
						lat,
						lng,
						unix = 0
					} = this.changeOnAddr
					let {
						noloca
					} = this.noChangeLoca
					let cur_unix = this.$util.DateToUnix(this.$util.formatTime(new Date(), 'YY-M-D h:m:s'))
					if (noloca && ((!lat && !lng) || !unix || (unix && (cur_unix - unix >= 1)))) {
						this.getUtilLocation()
					}
				}, 800)
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'updateCommonOptions']),
			...mapMutations(['updateUserItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				if (!this.configInfo.id || !this.configInfo.hasOwnProperty('free_fare_bear') || refresh) {
					await this.getConfigInfo()
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})

				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck && !this.location.lat) {
					this.$refs.user_privacy.open()
					this.$util.hideAll()
					return
				}
				// #endif
				await this.getCityList()
			},
			initRefresh() {
				this.initIndex(true)
			},
			async toResetUtilLoca() {
				// #ifdef APP-PLUS
				let {
					lat: locaLat = 0
				} = this.location
				if (!locaLat) {
					let {
						lng = 0,
							lat = 0
					} = await this.$util.getUtilLocation()
					if (!lat && !lng) return
					await this.getCityList()
				}
				// #endif
			},
			async toOpenLocation() {
				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif
				await this.$util.checkAuth({
					type: 'userLocation',
					checkApp: true
				})
				// #ifdef MP-WEIXIN
				this.initRefresh()
				// #endif
			},
			async getCityList() {
				let {
					location
				} = this

				let {
					status: coach_status,
					coach_position
				} = this.userCoachStatus

				if (!location.lat || (location.lat && location.address == '暂未获取到位置信息')) {
					if (coach_status == 2 && coach_position) {
						let {
							lat: change_lat = 0,
							lng: change_lng = 0,
							unix = 0
						} = this.changeOnAddr
						let cur_unix = this.$util.DateToUnix(this.$util.formatTime(new Date(), 'YY-M-D h:m:s'))
						let noloca = change_lat && change_lng && (unix && (cur_unix - unix < 3)) ? false : true
						if (!noloca) {
							let loca = Object.assign({}, this.location, {
								lat: change_lat,
								lng: change_lng,
								is_util_loca: 1
							})
							this.updateUserItem({
								key: 'location',
								val: loca
							})
						}
						this.updateUserItem({
							key: 'noChangeLoca',
							val: {
								noloca
							}
						})
						if (this.noChangeLoca.noloca) return
						this.initUtilLocaData()
					} else {
						this.getUtilLocation()
					}
					return
				}
				this.initUtilLocaData()
			},
			async getUtilLocation() {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					let wxReady = await this.$jweixin.wxReady2();
					let {
						latitude: lat = 0,
						longitude: lng = 0
					} = wxReady ? await this.$jweixin.getWxLocation() : {
						latitude: 0,
						longitude: 0
					}
					let val = Object.assign({}, this.location, {
						lat,
						lng,
						is_util_loca: 1
					})
					this.updateUserItem({
						key: 'location',
						val
					})
					this.initUtilLocaData()
				}
				// #endif
				// #ifndef H5
				let {
					lat = 0,
						lng = 0
				} = await this.$util.getLocation()
				let val = Object.assign({}, this.location, {
					lat,
					lng,
					is_util_loca: 1
				})
				this.updateUserItem({
					key: 'location',
					val
				})
				this.initUtilLocaData()
				// #endif
			},
			async initUtilLocaData() {
				this.updateUserItem({
					key: 'noChangeLoca',
					val: {
						noloca: false
					}
				})
				let {
					lng = 0,
						lat = 0
				} = this.location
				let [data, city] = await Promise.all([this.$api.technician.coachInfo(), this.$api.base.getCity({
					lng,
					lat
				})])
				this.$util.hideAll()
				this.cityList = city
				this.form.admin_id = data.id ? data.admin_id : 0
				await this.getStoreList()

				if (!data || (data && !data.id)) {
					if (city.length > 0) {
						this.form.city_id = city[0].id
						this.cityIndex = 0
					}
					this.isLoad = true
					return
				}
				data.free_fare_distance = data.free_fare_distance == null ? '' : data.free_fare_distance
				let imgArr = ['id_card', 'license', 'self_img']
				imgArr.map(item => {
					data[item] = data[item] && data[item].length > 0 ? data[item].map(aitem => {
						return {
							path: aitem
						}
					}) : []
				})
				if (data.id_card && data.id_card.length > 1) {
					data.id_card_fan = [data.id_card[1]]
					data.id_card_people = [data.id_card[2]]
					data.id_card.splice(1, 3)
				}
				let imgArrs = ['work_img', 'video']
				imgArrs.map(item => {
					data[item] = data[item] && data[item].length > 0 ? [{
						path: data[item]
					}] : []
				})

				data.birthday = data.birthday ? this.$util.formatTime(data.birthday * 1000, 'YY-M-D') : ''
				for (let key in this.form) {
					this.form[key] = data[key]
				}
				let textArr = ['mobile', 'status']
				textArr.map(item => {
					this[item == 'mobile' ? `old_phone` : 'coach_status'] = data[
						item]
				})
				this.cityIndex = this.cityList.findIndex(item => {
					return item.id == data.city_id
				})
				this.storeIndex = this.storeList.findIndex(item => {
					return item.id == data.store_id
				})
				this.isLoad = true
				if (lat && lng) {
					this.$util.getMapInfo()
				}
			},
			async getStoreList() {
				let {
					admin_id = 0
				} = this.form
				if (!admin_id) return
				let data = await this.$api.mine.getStoreSelect({
					admin_id
				})
				data.unshift({
					id: 0,
					title: '不挂靠门店'
				})
				this.storeList = data
			},
			pickerChange(e, key) {
				let ind = e.target.value
				if (key === 'birthday') {
					let unix = this.$util.DateToUnix(ind)
					if (unix > new Date(Math.ceil(new Date().getTime())) / 1000) {
						this.$util.showToast({
							title: `不能选择未来时间哦`
						})
						return
					}
					this.form[key] = ind
					return
				}
				this[`${key}Index`] = ind
				this.form[`${key}_id`] = this[`${key}List`][ind].id
			},
			// 发送验证码
			async toSend() {
				let {
					authTime
				} = this
				if (authTime) return
				let {
					mobile = ''
				} = this.form
				if (mobile == null || !/^(1[0-9]{10})$/.test(mobile)) {
					this.$util.showToast({
						title: mobile == null ? `请输入手机号` : `${mobile} 手机号无效`
					});
					return;
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.user.sendShortMsg({
						phone: mobile
					})
					this.$util.hideAll()
					this.lockTap = false
					let time = 60
					this.timer = setInterval(() => {
						if (time === 0) {
							clearInterval(this.timer)
							return
						}
						time--
						this.authTime = time
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			imgUpload(e) {
				let {
					imagelist,
					imgtype
				} = e;
				this.form[imgtype] = imagelist;
			},
			// 选择地区
			async toChooseLocation() {
				this.updateUserItem({
					key: 'useChooseLocation',
					val: true
				})
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					let wxReady = await this.$jweixin.wxReady2();
					let {
						latitude,
						longitude
					} = wxReady ? await this.$jweixin.getWxLocation() : {
						latitude: 0,
						longitude: 0
					}
					this.initChooseLoca({
						latitude,
						longitude
					})
				}
				// #endif
				// #ifndef H5
				if (!this.location.lat) {
					this.updateUserItem({
						key: 'useChooseLocation',
						val: false
					})
					this.toOpenLocation()
				} else {
					// #ifdef APP-PLUS
					let {
						lat: latitude,
						lng: longitude
					} = await this.$util.getLocation()
					this.initChooseLoca({
						latitude,
						longitude
					})
					// #endif 
					// #ifdef MP-WEIXIN
					await this.$util.checkAuth({
						type: 'userLocation'
					})
					this.initChooseLoca()
					// #endif
				}
				// #endif
			},
			async initChooseLoca(param = {}) {
				let [err, loca_data] = await uni.chooseLocation(param)
				let {
					name = '',
						address = '',
						latitude: lat = '',
						longitude: lng = ''
				} = err ? {
					name: '',
					address: '',
					latitude: '',
					longitude: ''
				} : loca_data
				address = address || name
				this.updateUserItem({
					key: 'useChooseLocation',
					val: false
				})
				if (!address) return
				this.form.lat = lat
				this.form.lng = lng
				this.form.address = address
			},
			//表单验证
			validate(param) {
				let {
					free_fare_bear,
					free_fare_distance
				} = this.configInfo
				let validate = new this.$util.Validate();
				this.rule.map(item => {
					let {
						name,
					} = item
					if (name == 'free_fare_distance') {
						if (param[name]) {
							if (free_fare_bear == 1) {
								item.maxNum = free_fare_distance
							}
							validate.add(param[name], item)
						}
					} else {
						validate.add(param[name], item)
					}
				})
				let message = validate.start();
				return message;
			},
			async submit() {
				let param = this.$util.deepCopy(this.form)
				let arr = ['id_card', 'id_card_fan', 'id_card_people', 'work_img', 'video']
				arr.map(item => {
					param[item] = param[item] && param[item].length > 0 ? param[item][0].path : ''
				})
				param.license = param.license.map(item => {
					return item.path
				})
				param.self_img = param.self_img.map(item => {
					return item.path
				})
				let msg = this.validate(param);
				if (msg) {
					this.$util.showToast({
						title: msg
					});
					return;
				}
				param.free_fare_distance = param.free_fare_distance || 0
				param.birthday = this.$util.DateToUnix(param.birthday)
				param.id_card = [param.id_card, param.id_card_fan, param.id_card_people]
				delete param.id_card_fan
				delete param.id_card_people
				delete param.admin_id
				let {
					old_phone
				} = this
				let {
					short_code_status,
				} = this.configInfo
				if (short_code_status && old_phone != param.mobile && (param.short_code == null || param.short_code
						.length != 6)) {
					this.$util.showToast({
						title: `请输入6位数短信验证码`
					})
					return
				}
				if (!short_code_status || old_phone == param.mobile) {
					delete param.short_code
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.technician.coachUpdateV2(param)
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功`
					})
					if (this.timer) {
						clearInterval(this.timer)
					}
					setTimeout(() => {
						if (getCurrentPages().length > 1) {
							this.$util.back()
						}
						this.$util.goUrl({
							url: '/pages/mine',
							openType: `reLaunch`
						})
					}, 2000)
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
	.apply-pages {
		.apply-form {
			.item-text {
				width: 250rpx
			}

			.item-text.tips {
				width: 200rpx
			}
		}
	}
</style>