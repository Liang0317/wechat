<template>
	<view class="apply-pages" v-if="isLoad">
		<view class="page-height"
			v-if="((options.channel_qr_id || options.admin_id || options.salesman_id) && channel_status != -1)  || (!options.channel_qr_id && !options.admin_id&& !options.salesman_id && [1,2,3].includes(channel_status))">
			<abnor percent="150%" @confirm="confirm" @cancel="$util.goUrl({url:`/pages/mine`,openType:`reLaunch`})"
				:title="title[channel_status]" :tip="tipArr[channel_status]" :button="buttonArr[channel_status]"
				:image="image[channel_status]" :tipMax="channel_status == 4? '690rpx':''"></abnor>
		</view>
		<block v-else>
			<view class="apply-form">
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text">您的姓名</view>
						<input v-model="form.user_name" type="text" class="item-input flex-1" maxlength="20"
							:placeholder="rule[0].errorMsg" />
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b">
						<view class="item-text">手机号码</view>
						<input v-model="form.mobile" type="text" class="item-input flex-1" maxlength="11"
							:placeholder="rule[1].errorMsg" />
					</view>
					<view class="flex-between pl-lg pr-lg b-1px-b" v-if="configInfo.plugAuth.channelcate">
						<view class="item-text">申请渠道</view>
						<view class="item-input flex-1 text">
							<picker @change="pickerChange($event)" :value="channelInd" :range="channelList"
								range-key="title">
								<view class="flex-between" style="color: #A9A9A9;">
									{{channelInd!=-1 && channelList.length > 0?channelList[channelInd].title:'请选择您能接入的渠道'}}
									<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
								</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text">备注信息</view>
						<input :disabled="true" type="text" class="item-input flex-1" />
					</view>
					<textarea v-model="form.text" class="item-textarea pd-lg" maxlength="300" placeholder="请输入备注信息" />
					<view class="text-right pb-lg pr-lg">
						{{form.text.length>300?300:form.text.length}}/300
					</view>
				</view>
			</view>

			<view class="space-max-footer"></view>

			<fix-bottom-button @confirm="submit" :text="[{text:'确定申请',type:'confirm',isAuth:true}]" bgColor="#fff">
			</fix-bottom-button>
		</block>
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
				// -1未申请，1审核中，2审核通过，3取消授权，4审核失败(可再次申请)
				tipArr: {
					'1': [{
						text: '您已经成功提交申请',
						color: 0
					}, {
						text: '审核将在3个工作日内出结果，请耐心等待',
						color: 0
					}],
					'2': [{
						text: '恭喜您，审核通过！',
						color: 0
					}, {
						text: `您已具备${this.$t('action.channelName')}资格，快去分享体验吧~`,
						color: 0
					}],
					'3': [{
						text: '请联系平台管理人员询问原因',
						color: 0
					}],
					'4': [{
						text: '请联系平台管理人员询问失败原因',
						color: 0
					}]
				},
				buttonArr: {
					'1': [{
						text: '个人中心',
						type: 'cancel'
					}],
					'2': [{
						text: '去分享',
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
					'-1': `申请${this.$t('action.channelName')}`,
					'1': '等待审核',
					'2': '',
					'3': '取消授权',
					'4': '申请失败',
				},
				image: {
					'1': 'https://lbqny.migugu.com/admin/public/apply_wait.jpg',
					'2': 'https://lbqny.migugu.com/admin/public/apply_suc.jpg',
					'3': 'https://lbqny.migugu.com/admin/public/apply_fail.jpg',
					'4': 'https://lbqny.migugu.com/admin/public/apply_fail.jpg',
				},
				channel_status: -1,
				channelInd: -1,
				channelList: [],
				isLoad: false,
				options: {},
				form: {
					id: 0,
					user_name: '', //姓名 
					mobile: '', //手机号  
					cate_id: '', // 渠道
					text: '',
					channel_qr_id: 0,
					admin_id: 0,
					salesman_id: 0
				},
				rule: [{
						name: "user_name",
						checkType: "isNotNull",
						errorMsg: "请输入您的真实姓名",
						regType: 2
					},
					{
						name: "mobile",
						checkType: "isMobile",
						errorMsg: "请输入常用手机号码"
					}
				],
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			location: state => state.user.location,
			scanRecordId: state => state.user.scanRecordId,
		}),
		async onLoad(options) {
			let {
				channel_qr_id = 0,
					admin_id = 0,
					salesman_id = 0
			} = options
			if (admin_id) {
				this.addScanRecord({
					type: 6,
					qr_id: admin_id
				})
			}
			if (salesman_id) {
				this.addScanRecord({
					type: 8,
					qr_id: salesman_id
				})
			}
			options = admin_id || salesman_id ? await this.updateCommonOptions(options) : options
			this.options = options
			this.form.channel_qr_id = channel_qr_id
			this.form.admin_id = admin_id
			this.form.salesman_id = salesman_id
			this.$util.showLoading()
			await this.initIndex()
			let {
				title,
				channel_status
			} = this
			uni.setNavigationBarTitle({
				title: title[channel_status]
			})
			if (this.scanRecordId) {
				this.updateScanRecord()
			}
			this.isLoad = true
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'updateCommonOptions', 'addScanRecord',
				'updateScanRecord'
			]),
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
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}

				let {
					channelcate
				} = this.configInfo.plugAuth
				let [data, list = []] = await Promise.all(channelcate ? [this.$api.channel.channelInfo(), this.$api
					.channel.channelCateSelect()
				] : [this.$api.channel.channelInfo()])
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				list.unshift({
					id: 0,
					title: '暂无接入渠道'
				})
				this.channelList = list
				if (!data || (data && !data.id)) {
					this.$util.hideAll()
					return
				}

				let {
					channel_qr_id = 0,
						admin_id = 0,
						salesman_id = 0
				} = this.options
				if (channel_qr_id) {
					data.channel_qr_id = channel_qr_id
				}
				if (admin_id) {
					data.admin_id = admin_id
				}
				if (salesman_id) {
					data.salesman_id = salesman_id
				}
				for (let key in this.form) {
					this.form[key] = data[key]
				}

				this.channelInd = list.findIndex(item => {
					return item.id === data.cate_id
				})

				let {
					status,
					sh_text
				} = data
				let channel_status = !channel_qr_id && !admin_id && !salesman_id && status == 4 ? -1 : status
				this.channel_status = channel_status
				if (channel_status == 4 && sh_text) {
					this.tipArr[4][0].text = sh_text
				}
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			pickerChange(e, val) {
				this.channelInd = e.target.value
				this.form.cate_id = this.channelList[this.channelInd].id
			},
			// 个人中心/去分享
			async confirm() {
				let {
					channel_status
				} = this
				if (channel_status == 4) {
					this.channel_status = -1
					uni.setNavigationBarTitle({
						title: `申请${this.$t('action.channelName')}`
					})
					return
				}
				this.$util.goUrl({
					url: `/user/pages/channel/income`,
					openType: `reLaunch`
				})
			},
			//表单验证
			validate(param) {
				let {
					channelcate = false
				} = this.configInfo.plugAuth
				let validate = new this.$util.Validate();
				this.rule.map(item => {
					let {
						name,
					} = item
					validate.add(param[name], item)
				})
				let message = validate.start()
				return message;
			},
			async submit() {
				let param = this.$util.deepCopy(this.form)
				let msg = this.validate(param);
				if (msg) {
					this.$util.showToast({
						title: msg
					});
					return;
				}
				let {
					admin_id = 0,
						salesman_id = 0
				} = this.options
				param.admin_id = admin_id
				param.salesman_id = salesman_id
				if (this.lockTap) return
				this.lockTap = true
				param.text = param.text.length > 300 ? param.text.substring(0, 300) : param.text
				this.$util.showLoading()
				try {
					await this.$api.channel.applyChannel(param)
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功`
					});
					setTimeout(() => {
						this.$util.back()
						this.$util.goUrl({
							url: '/user/pages/apply-result?type=3',
							openType: `redirectTo`
						})
					}, 1000)
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
</style>