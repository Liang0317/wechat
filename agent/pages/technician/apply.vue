<template>
	<view class="apply-pages">
		<block v-if="isLoad">
			<view class="apply-form">
				<view class="fill-base radius-16">
					<view @tap.stop="toChooseUser" class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text">关联用户</view>
						<view class="item-input flex-1 text">
							<view class="flex-between">
								{{form.user_id ? form.nickName :'请选择'}}
								<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
							</view>
						</view>
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>姓名</view>
						<input :disabled="!edit_base_info ? true :false" v-model="form.coach_name" type="text"
							class="item-input flex-1" maxlength="20" :placeholder="rule[0].errorMsg" />
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>性别</view>
						<view class="item-input flex-1 flex-y-center">
							<view @tap.stop="toSetItem(index,'sex','sexList')" class="flex-y-center"
								:class="[{'mr-lg':item.id==0}]" :style="{color:form.sex == item.id ? primaryColor:''}"
								v-for="(item,index) in sexList" :key="index"><i class="iconfont icon-xuanze mr-sm"
									:class="[{'icon-xuanze-fill':form.sex == item.id}]"></i>{{item.title}}
							</view>
						</view>
					</view>
					<view class="flex-between ml-lg mr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>生日</view>
						<view class="item-input flex-1 text">
							<picker :disabled="!edit_base_info ? true :false" @change="pickerChange($event,'birthday')"
								mode="date" :end="endYear" :value="form.birthday">
								<view class="flex-between">
									{{form.birthday||'请选择'}}
									<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
								</view>
							</picker>
						</view>
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>手机号</view>
						<input :disabled="!edit_base_info ? true :false" v-model="form.mobile" type="text"
							class="item-input flex-1" maxlength="11" :placeholder="rule[2].errorMsg" />
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>从业年份
						</view>
						<input :disabled="!edit_base_info ? true :false" v-model="form.work_time" type="number"
							class="item-input flex-1" :placeholder="rule[3].errorMsg" />
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>意向工作城市
						</view>
						<view class="item-input flex-1 text">
							<picker :disabled="!edit_base_info ? true :false" @change="pickerChange($event,'city')"
								:value="cityIndex" :range="cityList" range-key="title">
								<view class="flex-between">
									{{cityIndex!=-1?cityList[cityIndex].title:'请选择'}}
									<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
								</view>
							</picker>
						</view>
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b"
						v-if="configInfo.plugAuth.store && storeList.length>0">
						<view class="item-text">挂靠门店</view>
						<view class="item-input flex-1 text">
							<picker :disabled="!edit_base_info ? true :false" @change="pickerChange($event,'store')"
								:value="storeIndex" :range="storeList" range-key="title">
								<view class="flex-between">
									<view class="max-400 ellipsis">
										{{!edit_base_info?form.store_name:storeIndex!=-1?storeList[storeIndex].title:'请选择'}}
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
								<input :disabled="!edit_base_info ? true :false" v-model="form.free_fare_distance"
									type="digit" class="item-input flex-1" :placeholder="rule[5].errorMsg" />
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
					<textarea :disabled="!edit_base_info ? true :false" v-model="form.text" class="item-textarea pd-lg"
						maxlength="300" :placeholder="rule[7].errorMsg" />
					<view class="text-right pb-lg pr-lg">
						{{form.text.length>300?300:form.text.length}}/300
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>身份证号
						</view>
						<input :disabled="!edit_base_info ? true :false" v-model="form.id_code" type="text"
							class="item-input flex-1" :placeholder="rule[8].errorMsg" />
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
							text="身份证人像面" :imgsize="1" :isEdit="!edit_base_info?false:true">
						</upload>
						<upload @upload="imgUpload" :imagelist="form.id_card_fan" imgtype="id_card_fan" imgclass="md"
							text="身份证国徽面" :imgsize="1" :isEdit="!edit_base_info?false:true">
						</upload>
					</view>
					<view class="flex-between pl-lg pr-lg pb-md">
						<upload @upload="imgUpload" :imagelist="form.id_card_people" imgtype="id_card_people"
							imgclass="md" text="手持身份证照片" :imgsize="1" :isEdit="!edit_base_info?false:true"></upload>
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
							text="上传图片" :imgsize="15" :isEdit="!edit_base_info?false:true">
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
							:imgsize="1" :isEdit="!edit_base_info?false:true">
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
							imgtype="self_img" text="上传图片" :imgsize="9" :isEdit="!edit_base_info?false:true">
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
							imgtype="video" text="上传视频" :imgsize="1" :isEdit="!edit_base_info?false:true">
						</upload>
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>虚拟订单
						</view>
						<view class="flex-1 flex-center">
							<input :disabled="!edit_base_info ? true :false" v-model="form.order_num" type="number"
								class="item-input flex-1" :placeholder="rule[15].errorMsg" />
							<view class="c-title">单</view>
						</view>
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>是否接单
						</view>
						<view class="item-input flex-1 flex-y-center">
							<view @tap.stop="toSetItem(index,'is_work','workList')" class="flex-y-center"
								:class="[{'mr-lg':item.id==1}]"
								:style="{color:form.is_work == item.id ? primaryColor:''}"
								v-for="(item,index) in workList" :key="index"><i class="iconfont mr-sm"
									:class="[{'icon-xuanze':form.is_work != item.id},{'icon-radio-fill':form.is_work == item.id}]"></i>{{item.title}}
							</view>
						</view>
					</view>
					<view class="flex-between pd-lg" v-if="form.is_work===1">
						<view @tap.stop="toShowTime('start_time')" class="item-time flex-center flex-column">
							<view>开始时间</view>
							<view class="mt-sm" :style="{color:form.start_time ? primaryColor : '#999'}">
								{{form.start_time || '选择时间'}}
							</view>
						</view>
						<view @tap.stop="toShowTime('end_time')" class="item-time flex-center flex-column  b-1px-l">
							<view>结束时间</view>
							<view class="mt-sm" :style="{color:form.end_time ? primaryColor : '#999'}">
								{{form | handleStartEndTime(toDay)}}{{form.end_time || '选择时间'}}
							</view>
						</view>
					</view>
				</view>
				<view @tap.stop="toFddSign" class="fill-base mt-md radius-16"
					v-if="fdd_agreement && fdd_agreement.hasOwnProperty('viewpdf_url') && edit_base_info">
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text">电子签约</view>
						<view class="item-input flex-1" :style="{color:primaryColor}">
							查看签约合同
						</view>
					</view>
				</view>
			</view>

			<view class="space-max-footer"></view>

			<block v-if="!edit_base_info"></block>
			<fix-bottom-button @confirm="submit" :text="[{text:'确定提交',type:'confirm'}]" bgColor="#fff" v-else>
			</fix-bottom-button>


			<w-picker :visible.sync="showTime" mode="time" :value="toDayTime" :current="false" :second="false"
				:themeColor="primaryColor" @confirm="onConfirm" ref="time"></w-picker>
		</block>
		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	import $util from "@/utils/index.js"
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
				edit_base_info: 1,
				cityList: [],
				cityIndex: -1,
				storeList: [],
				storeIndex: -1,
				toDay: '',
				toDayTime: '',
				showKey: '',
				showTime: false,
				sexList: [{
					id: 0,
					title: '男'
				}, {
					id: 1,
					title: '女'
				}],
				workList: [{
					id: 1,
					title: '接单'
				}, {
					id: 0,
					title: '休息'
				}],
				fdd_agreement: {},
				form: {
					id: 0,
					user_id: '',
					nickName: '',
					coach_name: '', //姓名 
					mobile: '', //手机号 
					sex: 0, //性别 
					birthday: '',
					work_time: '', //从业年份 
					city_id: '', // 城市id
					store_id: '', // 门店id
					store_name: '',
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
					order_num: 0,
					is_work: 1,
					start_time: '00:00',
					end_time: '23:59'
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
					},
					{
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
					},
					{
						name: "order_num",
						checkType: "isNumber",
						errorMsg: "请输入虚拟订单量"
					},
				],
				have_user_id: false,
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
				id = 0,
					view = 0,
			} = options
			this.edit_base_info = view * 1 === 1 ? 0 : 1
			this.options = options
			this.$util.showLoading()
			await this.initIndex()
			let {
				coach_status
			} = this
			let {
				admin_id
			} = this.form
			let name = this.$t('action.attendantName')
			uni.setNavigationBarTitle({
				title: `${!this.edit_base_info ? '查看':id?'编辑':'新增'}${name}`
			})
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
			...mapActions(['getConfigInfo', 'getUserInfo']),
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
				if (!this.configInfo.id || !this.configInfo.hasOwnProperty(
						'free_fare_bear') || refresh) {
					await this.getConfigInfo()
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				let cur_time = new Date(Math.ceil(new Date().getTime()))
				this.toDay = this.$util.formatTime(cur_time, 'YY-M-D')
				this.toDayTime = this.$util.formatTime(cur_time, 'h:m')

				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck && !this.location.lat) {
					this.$refs.user_privacy.open()
					this.$util.hideAll()
					return
				}
				// #endif
				await Promise.all([this.getCityList(), this.getStoreList()])
				let {
					id = 0
				} = this.options
				if (!id) {
					this.isLoad = true
					this.$util.hideAll()
					return
				}

				let data = await this.$api.agent.coachInfo({
					id
				})
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
				this.cityIndex = this.cityList.findIndex(item => {
					return item.id == data.city_id
				})
				this.storeIndex = this.storeList.findIndex(item => {
					return item.id == data.store_id
				})
				data.birthday = data.birthday ? this.$util.formatTime(data.birthday * 1000, 'YY-M-D') : ''
				for (let key in this.form) {
					this.form[key] = data[key]
				}
				this.have_user_id = data.id && data.user_id
				this.fdd_agreement = data.fdd_agreement
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
			async getStoreList() {
				let {
					store = false
				} = this.configInfo.plugAuth
				if (store) {
					let data = await this.$api.agent.storeSelect()
					data.unshift({
						id: 0,
						title: '不挂靠门店'
					})
					this.storeList = data
				}
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
					this.updateMapItem({
						key: 'pageActive',
						val: false
					})
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
				let city = await this.$api.base.getCity({
					lng,
					lat
				})
				this.$util.hideAll()
				this.cityList = city
				this.cityIndex = city.length > 0 ? 0 : -1
				this.form.city_id = city.length > 0 ? city[0].id : ''
				if (lat && lng) {
					this.$util.getMapInfo()
				}
			},
			async toFddSign() {
				this.updateUserItem({
					key: 'fddExtsign',
					val: ''
				})
				let {
					viewpdf_url = ''
				} = this.fdd_agreement
				this.updateUserItem({
					key: 'fddExtsign',
					val: viewpdf_url
				})
				// #ifdef H5
				window.location.href = viewpdf_url
				// #endif
				// #ifndef H5
				this.$util.goUrl({
					url: `/user/pages/common/web?url=fddExtsign`
				})
				// #endif
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
			imgUpload(e) {
				let {
					imagelist,
					imgtype
				} = e;
				this.form[imgtype] = imagelist;
			},
			toSetItem(index, key, key1) {
				let edit = this.toCheckEdit()
				if (!edit) return
				let {
					id
				} = this[key1][index]
				this.form[key] = id
			},
			toShowTime(key) {
				let edit = this.toCheckEdit()
				if (!edit) return
				this.showKey = key
				this.showTime = true
			},
			toCheckEdit() {
				let edit = true
				let {
					edit_base_info
				} = this
				if (!edit_base_info) {
					edit = false
				}
				return edit
			},
			onConfirm(val) {
				this.form[this.showKey] = val.result;
			},
			// 选择地区
			async toChooseLocation() {
				let edit = this.toCheckEdit()
				if (!edit) return
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
			toChooseUser() {
				let edit = this.toCheckEdit()
				if (!edit) return
				let {
					have_user_id
				} = this
				if (have_user_id) return
				this.$util.goUrl({
					url: `/agent/pages/technician/user`
				})
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
					param[item] = param[item].length > 0 ? param[item][0].path : ''
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
					is_work: work = 0,
					start_time: start,
					end_time: end
				} = param
				if (work && (!start || !end)) {
					this.$util.showToast({
						title: !start ? '请选择开始时间' : '请选择结束时间'
					})
					return
				}

				param.free_fare_distance = param.free_fare_distance || 0
				param.birthday = this.$util.DateToUnix(param.birthday)
				param.id_card = [param.id_card, param.id_card_fan, param.id_card_people]
				delete param.id_card_fan
				delete param.id_card_people
				delete param.nickName
				delete param.store_name
				if (param.id) {
					delete param.admin_id
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					let {
						is_edit = 0
					} = this.options
					let methodModel = param.id ? 'coachUpdateAdmin' : 'coachApply'
					await this.$api.agent[methodModel](param)
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功`
					})
					setTimeout(() => {
						this.$util.back()
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 2000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}

			}
		},
		filters: {
			handleStartEndTime(val, toDay) {
				let text = ''
				let {
					start_time,
					end_time
				} = val
				let start = `${toDay} ${start_time}`
				let end = `${toDay} ${end_time}`
				if (start_time && end_time && $util.DateToUnix(start) >= $util.DateToUnix(end)) {
					text = '次日'
				}
				return text
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

	.item-time {
		width: 50%;
	}
</style>