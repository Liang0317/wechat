<template>
	<view class="apply-pages">
		<block v-if="isLoad">
			<view class="page-height"
				v-if="(((options.admin_id || options.type) && coach_status != -1)  || ((!options.admin_id && !options.type) && [1,2,3].includes(coach_status)))">
				<abnor percent="150%" @confirm="confirm" @cancel="$util.goUrl({url:`/pages/mine`,openType: `reLaunch`})"
					:title="title[coach_status]" :tip="tipArr[coach_status]" :button="buttonArr[coach_status]"
					:image="image[coach_status]" :tipMax="coach_status == 4? '690rpx':''"></abnor>
			</view>

			<block v-else>

				<view class="apply-info-box rel" :style="{background:primaryColor}">
					<image class="bg-1 abs" src="https://lbqny.migugu.com/admin/anmo/apply/bg-1.png">
					</image>
					<image class="bg-2 abs" src="https://lbqny.migugu.com/admin/anmo/apply/bg-2.png">
					</image>
					<view class="technician-money flex-center f-md-title c-title text-bold abs">{{max_level || 0}}
					</view>
					<view class="join-us-text abs">
						<image class="join-us-img" src="https://lbqny.migugu.com/admin/anmo/apply/join-us-text.png">
						</image>
					</view>
					<view class="apply-pages-content">
						<view class="rel" style="z-index: 3">
							<view class="join-us pd-lg">
								<view class="f-mini-title flex-y-center c-title text-bold"><i
										class="iconfont icon-required c-warning"></i>您的姓名</view>
								<input v-model="form.coach_name" type="text"
									class="item-input fill-base f-mini-title c-title mt-sm pl-lg pr-lg radius-10"
									maxlength="15" placeholder-class="c-caption" :placeholder="rule[0].errorMsg"
									:style="{borderColor:primaryColor}" />
								<view class="mt-md f-mini-title flex-y-center c-title text-bold"><i
										class="iconfont icon-required c-warning"></i>您的性别</view>
								<view class="flex-y-center mt-sm">
									<view @tap.stop="form.sex = index" class="flex-y-center f-mini-title c-title"
										:style="{color:form.sex == index ? primaryColor:'',marginRight:index===0?'80rpx':''}"
										v-for="(item,index) in ['男','女']" :key="index"><i class="iconfont mr-sm"
											:class="[{'icon-xuanze':form.sex != index},{'icon-radio-fill':form.sex == index}]"></i>{{item}}
									</view>
								</view>
								<view class="mt-md f-mini-title flex-y-center c-title text-bold"><i
										class="iconfont icon-required c-warning"></i>您的生日</view>
								<view class="item-input fill-base text f-mini-title c-title mt-sm pl-lg pr-md radius-10"
									:style="{borderColor:primaryColor}">
									<picker @change="pickerChange($event,'birthday')" mode="date"
										:value="form.birthday">
										<view class="flex-between">
											<view class="max-450 ellipsis">{{form.birthday||'请选择'}}</view>
											<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
										</view>
									</picker>
								</view>
								<view class="mt-md f-mini-title flex-y-center c-title text-bold"><i
										class="iconfont icon-required c-warning"></i>手机号</view>
								<view class="item-input fill-base f-mini-title c-title mt-sm pl-lg pr-lg radius-10"
									style="height:auto;min-height:82rpx" :style="{borderColor:primaryColor}">
									<view class="flex-between">
										<input :disabled="!is_send" v-model="form.mobile" type="text" maxlength="11"
											placeholder-class="c-caption" :placeholder="rule[2].errorMsg" />
										<view>
											<view @tap.stop="toResetPhone" class="f-caption"
												:style="{color:primaryColor}" v-if="!is_send">更换手机号</view>
										</view>
									</view>
									<view class="flex-between" v-if="configInfo.short_code_status && is_send">
										<input v-model="form.short_code" type="text" maxlength="6"
											placeholder-class="c-caption" placeholder="请输入验证码"
											:style="{borderColor:primaryColor}" />
										<view @tap.stop="toSend" class="f-caption" :style="{color:primaryColor}">
											{{authTime>0?`重新获取(${authTime}s)`:'获取验证码'}}
										</view>
									</view>
								</view>
								<block v-if="configInfo.coach_apply_type == 2">
									<view class="mt-md f-mini-title flex-y-center c-title text-bold"><i
											class="iconfont icon-required c-warning"></i>从业年份</view>
									<input v-model="form.work_time" type="number"
										class="item-input fill-base f-mini-title c-title mt-sm pl-lg pr-lg radius-10"
										maxlength="20" placeholder-class="c-caption" :placeholder="rule[3].errorMsg"
										:style="{borderColor:primaryColor}" />
								</block>
								<view class="mt-md f-mini-title flex-y-center c-title text-bold"><i
										class="iconfont icon-required c-warning"></i>意向工作城市</view>
								<view class="item-input fill-base text f-mini-title c-title mt-sm pl-lg pr-md radius-10"
									:style="{borderColor:primaryColor}">
									<picker @change="pickerChange($event,'city')" :value="cityIndex" :range="cityList"
										range-key="title">
										<view class="flex-between">
											<view class="max-400 ellipsis">
												{{cityIndex!=-1?cityList[cityIndex].title:'请选择'}}
											</view>
											<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
										</view>
									</picker>
								</view>
								<block v-if="configInfo.plugAuth.store && form.admin_id*1>0">
									<view class="mt-md f-mini-title flex-y-center c-title text-bold">挂靠门店</view>
									<view
										class="item-input fill-base text f-mini-title c-title mt-sm pl-lg pr-md radius-10"
										:style="{borderColor:primaryColor}">
										<picker @change="pickerChange($event,'store')" :value="storeIndex"
											:range="storeList" range-key="title">
											<view class="flex-between">
												<view class="max-400 ellipsis">
													{{storeIndex!=-1?storeList[storeIndex].title:'请选择'}}
												</view>
												<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
											</view>
										</picker>
									</view>
								</block>
								<block v-if="configInfo.coach_apply_type == 2">
									<block v-if="configInfo.free_fare_bear">
										<view class="mt-md f-mini-title flex-y-center c-title text-bold">免出行费半径距离</view>
										<view
											class="flex-between item-input fill-base text f-mini-title c-title mt-sm pl-lg pr-md radius-10"
											:style="{borderColor:primaryColor}">
											<input v-model="form.free_fare_distance" type="digit"
												class="flex-1 f-mini-title c-title pr-lg" placeholder-class="c-caption"
												:placeholder="rule[5].errorMsg" :style="{borderColor:primaryColor}" />
											<view class="c-title">km</view>
										</view>
									</block>
									<view class="mt-md f-mini-title flex-y-center c-title text-bold"><i
											class="iconfont icon-required c-warning"></i>所在地址</view>
									<view @tap.stop="toChooseLocation"
										class="item-input fill-base text f-mini-title c-title mt-sm pl-lg pr-md radius-10"
										:style="{borderColor:primaryColor}">
										<view class="flex-between">
											<view class="max-450 ellipsis" :class="[{'c-caption':!form.address}]">
												{{form.address || '点击右边图标设置'}}
											</view>
											<i class="iconfont iconjuli ml-sm" style="font-size: 28rpx;"
												:style="{color:primaryColor}"></i>
										</view>
									</view>
									<view class="mt-md f-mini-title flex-y-center c-title text-bold"><i
											class="iconfont icon-required c-warning"></i>{{$t('action.attendantName')}}简介
									</view>
									<view
										class="item-input fill-base textarea f-mini-title c-title mt-sm pd-lg radius-10"
										:style="{borderColor:primaryColor}">
										<textarea v-model="form.text" class="item-textarea" maxlength="300"
											:placeholder="rule[7].errorMsg" />
										<view class="text-right f-caption mt-md" style="height:26rpx">
											{{form.text.length>300?300:form.text.length}}/300
										</view>
									</view>
									<view class="mt-md f-mini-title flex-y-center c-title text-bold"><i
											class="iconfont icon-required c-warning"></i>身份证号</view>
									<input v-model="form.id_code" type="text"
										class="item-input fill-base f-mini-title c-title mt-sm pl-lg pr-lg radius-10"
										maxlength="20" placeholder-class="c-caption" :placeholder="rule[8].errorMsg"
										:style="{borderColor:primaryColor}" />
									<view class="flex-y-baseline mt-md">
										<view class="f-mini-title flex-y-center c-title text-bold"><i
												class="iconfont icon-required c-warning"></i>身份证照片</view>
										<view class="f-caption c-caption ml-sm">图片大小不超过10M</view>
									</view>
									<view class="flex-between mt-sm">
										<upload @upload="imgUpload" :imagelist="form.id_card" imgtype="id_card"
											imgclass="apply-idcard" text="身份证人像面" :imgsize="1"></upload>
										<upload @upload="imgUpload" :imagelist="form.id_card_fan" imgtype="id_card_fan"
											imgclass="apply-idcard" text="身份证国徽面" :imgsize="1"></upload>
									</view>
									<view class="flex-between mt-sm">
										<upload @upload="imgUpload" :imagelist="form.id_card_people"
											imgtype="id_card_people" imgclass="apply-idcard" text="手持身份证照片"
											:imgsize="1">
										</upload>
									</view>
									<view class="flex-y-baseline mt-md">
										<view class="f-mini-title flex-y-center c-title text-bold"><i
												class="iconfont icon-required c-warning"></i>资格证书</view>
										<view class="f-caption c-caption ml-sm">图片大小不超过10M</view>
									</view>
									<view class="flex-warp mt-sm">
										<upload @upload="imgUpload" :imagelist="form.license" imgtype="license"
											text="上传图片" :imgsize="15" imgclass="apply">
										</upload>
									</view>
								</block>
								<view class="flex-y-baseline mt-md">
									<view class="f-mini-title flex-y-center c-title text-bold"><i
											class="iconfont icon-required c-warning"></i>工作形象照</view>
									<view class="f-caption c-caption ml-sm">图片建议尺寸: 750 * 750
									</view>
								</view>
								<view class="f-caption c-warning">请上传本人近期照片，图片大小不超过10M</view>
								<view class="flex-warp mt-sm">
									<upload @upload="imgUpload" :imagelist="form.work_img" imgtype="work_img"
										text="上传图片" :imgsize="1" imgclass="apply">
									</upload>
								</view>
								<block v-if="configInfo.coach_apply_type == 2">
									<view class="flex-y-baseline mt-md">
										<view class="f-mini-title flex-y-center c-title text-bold"><i
												class="iconfont icon-required c-warning"></i>个人生活照</view>
										<view class="f-caption c-caption ml-sm">图片建议尺寸: 750 * n</view>
									</view>
									<view class="f-caption c-warning">图片大小不超过10M</view>
									<view class="flex-warp mt-sm">
										<upload @upload="imgUpload" :imagelist="form.self_img" imgtype="self_img"
											text="上传图片" :imgsize="9" imgclass="apply">
										</upload>
									</view>
									<view class="flex-y-baseline mt-md">
										<view class="f-mini-title flex-y-center c-title text-bold">个人视频介绍</view>
										<view class="f-caption c-caption ml-sm">视频大小不超过50M</view>
									</view>
									<view class="flex-warp mt-sm">
										<upload @upload="imgUpload" :imagelist="form.video" filetype="video"
											imgtype="video" text="上传视频" :imgsize="1" imgclass="apply">
										</upload>
									</view>
								</block>
							</view>
							<view class="tips-text flex-center pt-lg pb-lg f-caption c-title">
								平台不会通过任何渠道泄露您的个人信息，请放心输入
							</view>
							<image @tap.stop="submit" class="submit"
								src="https://lbqny.migugu.com/admin/anmo/apply/submit.png">
							</image>
							<view class="space-footer"></view>
						</view>
					</view>
				</view>
			</block>

		</block>

		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				options: {},
				cityList: [],
				cityIndex: -1,
				storeList: [],
				storeIndex: 0,
				// -1未申请，1审核中，2审核通过，3取消授权，4审核失败(可再次申请)
				tipArr: {
					'1': [{
						text: '审核成功后将直接入驻平台',
						color: 0
					}],
					'2': [{
						text: '恭喜您，审核通过！',
						color: 0
					}, {
						text: '快去管理订单吧',
						color: 0
					}],
					'3': [{
						text: '平台管理员已取消授权',
						color: 0
					}],
					'4': [{
						text: '请联系平台管理人员询问原因',
						color: 0
					}]
				},
				buttonArr: {
					'1': [{
						text: '个人中心',
						type: 'cancel'
					}],
					'2': [{
						text: '去管理',
						type: 'confirm'
					}],
					'3': [{
						text: '个人中心',
						type: 'cancel'
					}],
					'4': [{
						text: '再次申请',
						type: 'confirm'
					}, {
						text: '个人中心',
						type: 'cancel'
					}]
				},
				title: {
					'1': '等待审核',
					'2': '您已经是' + this.$t('action.attendantName') + '了',
					'3': '取消授权',
					'4': '申请失败',
				},
				image: {
					'1': 'https://lbqny.migugu.com/admin/public/apply_wait.jpg',
					'2': 'https://lbqny.migugu.com/admin/public/apply_suc.jpg',
					'3': 'https://lbqny.migugu.com/admin/public/apply_fail.jpg',
					'4': 'https://lbqny.migugu.com/admin/public/apply_fail.jpg',
				},
				coach_status: -1,
				max_level: 0,
				authTime: 0,
				timer: null,
				is_send: true,
				form: {
					id: 0,
					admin_id: 0,
					partner_id: 0,
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
					is_work: 1
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
					}, {
						name: "address",
						checkType: "isNotNull",
						errorMsg: "请选择所在地址"
					}, {
						name: "text",
						checkType: "isNotNull",
						errorMsg: "请输入" + this.$t('action.attendantName') + "简介",
						regType: 2
					}, {
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
					}
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
			scanRecordId: state => state.user.scanRecordId,
		}),
		async onLoad(options) {
			let {
				admin_id = 0,
					partner_id = 0,
			} = options
			if (admin_id) {
				this.addScanRecord({
					type: 4,
					qr_id: admin_id
				})
			}
			if (partner_id) {
				this.addScanRecord({
					type: 3,
					qr_id: partner_id
				})
			}
			options = admin_id || partner_id ? await this.updateCommonOptions(options) : options
			this.options = options
			this.form.admin_id = admin_id
			this.form.partner_id = partner_id
			this.$util.showLoading()
			await this.initIndex()
			let {
				coach_status
			} = this
			uni.setNavigationBarTitle({
				title: coach_status == -1 ? `申请` + this.$t(
					'action.attendantName') : ''
			})
			if (this.scanRecordId) {
				this.updateScanRecord()
			}
		},
		onShow() {
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
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'updateCommonOptions', 'addScanRecord',
				'updateScanRecord'
			]),
			...mapMutations(['updateUserItem', 'updateMapItem']),
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
				await this.getUserInfo()
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

				let [data] = await Promise.all([this.$api.technician.coachInfo(), this.getCityList()])
				this.max_level = data.max_level
				if (!data || (data && !data.id)) {
					let {
						phone = 0
					} = this.userInfo
					this.form.mobile = phone
					this.is_send = phone ? false : true
					await this.getStoreList()
					this.isLoad = true
					this.$util.hideAll()
					return
				}

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
				let {
					type = 0,
						admin_id = 0,
						partner_id = 0,
				} = this.options
				if (admin_id) {
					data.admin_id = admin_id
				}
				if (partner_id) {
					data.partner_id = partner_id
				}
				if (!data.admin_id * 1) {
					data.store_id = 0
				}
				for (let key in this.form) {
					this.form[key] = data[key]
				}
				await this.getStoreList()
				let {
					city_id,
					store_id,
					status,
					sh_text
				} = data
				this.cityIndex = this.cityList.findIndex(item => {
					return item.id == city_id
				})
				this.storeIndex = this.storeList.findIndex(item => {
					return item.id == store_id
				})
				let coach_status = !admin_id * 1 && !type && status == 4 ? -1 : status
				this.coach_status = coach_status
				if (coach_status == 4 && sh_text) {
					this.tipArr[4][0].text = sh_text
				}
				this.isLoad = true
				this.$util.hideAll()
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
					let {
						city_id
					} = this.form
					this.cityIndex = this.cityList.findIndex(item => {
						return item.id == city_id
					})
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
				if (!location.lat) {
					await this.$util.getUtilLocation()
					this.updateMapItem({
						key: 'pageActive',
						val: false
					})
				}
				let {
					lng = 0,
						lat = 0
				} = this.location
				let city = await this.$api.base.getCity({
					lng,
					lat
				})
				this.$util.hideAll()
				this.cityList = city
				if (lat && lng) {
					this.$util.getMapInfo()
				}
			},
			async getStoreList() {
				let {
					admin_id = 0
				} = this.form
				admin_id = admin_id * 1
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
			toResetPhone() {
				this.form.mobile = ''
				this.is_send = true
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
					this.form.short_code = ''
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
			// 去管理/再次申请
			async confirm() {
				let {
					coach_status
				} = this
				if (coach_status == 4) {
					this.coach_status = -1
					uni.setNavigationBarTitle({
						title: `申请` + this.$t('action.attendantName')
					})
					return
				}
				this.$util.goUrl({
					url: `/pages/mine?type=2`,
					openType: `reLaunch`
				})
			},
			//表单验证
			validate(param) {
				let {
					coach_apply_type
				} = this.configInfo
				let arr = ['coach_name', 'birthday', 'mobile', 'city_id', 'work_img']
				let arr2 = ['coach_name', 'birthday', 'mobile', 'work_time', 'city_id', 'free_fare_distance', 'address',
					'text', 'id_code',
					'id_card', 'id_card_fan', 'id_card_people', 'license', 'work_img', 'self_img'
				]
				let {
					free_fare_bear,
					free_fare_distance
				} = this.configInfo
				let validate = new this.$util.Validate()
				this.rule.map(item => {
					let {
						name,
					} = item
					if ((coach_apply_type == 1 && arr.includes(name)) || (coach_apply_type == 2 && arr2.includes(
							name))) {
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
					}
				})
				let message = validate.start()
				return message
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
				let {
					short_code_status,
					coach_apply_type
				} = this.configInfo
				let {
					is_send
				} = this
				if (short_code_status && is_send && (param.short_code == null || param.short_code.length != 6)) {
					this.$util.showToast({
						title: `请输入6位数短信验证码`
					})
					return
				}
				if (!short_code_status || !is_send) {
					delete param.short_code
				}
				param.birthday = this.$util.DateToUnix(param.birthday)
				param.id_code = param.id_code
				param.id_card = param.id_code ? [param.id_card, param
					.id_card_fan, param.id_card_people
				] : []
				delete param.id_card_fan
				delete param.id_card_people
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.technician.coachApply(param)
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功，即将跳转个人中心`,
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
	.apply-info-box {
		width: 100%;
		height: auto;

		.bg-1 {
			width: 750rpx;
			height: 1999rpx;
			top: 0;
			left: 0;
			z-index: 1;
		}

		.bg-2 {
			width: 750rpx;
			height: 620rpx;
			top: 30rpx;
			z-index: 2;
		}

		.technician-money {
			width: 45rpx;
			top: 355rpx;
			left: 460rpx;
			z-index: 3;
		}

		.join-us-text {
			width: 100%;
			height: 119rpx;
			top: 469rpx;
			left: 0;
			z-index: 3;

			.join-us-img {
				width: 666rpx;
				height: 119rpx;
				margin: 0 auto;
			}
		}


		.apply-pages-content {
			width: 666rpx;
			height: auto;
			min-height: 1999rpx;
			margin: 0 auto;
			padding-top: 586rpx;

			.join-us {
				width: 666rpx;
				height: auto;
				background: #FEFAD9;
				border: 5rpx solid #000000;
				border-top: none;
				border-radius: 0 0 26rpx 26rpx;

				.item-input {
					height: 74rpx;
					border: 4rpx solid #069F5E;

					.flex-between {
						height: 74rpx;
					}
				}

				.item-input.text {
					height: 82rpx;
				}

				.item-input.textarea {
					height: auto;

					.item-textarea {
						width: 100%;
						height: 300rpx
					}
				}
			}

			.tips-text {
				width: 100%;
			}

			.submit {
				width: 662rpx;
				height: 93rpx;
			}
		}
	}
</style>