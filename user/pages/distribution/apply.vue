<template>
	<view class="apply-pages" v-if="isLoad">
		<view class="page-height"
			v-if="((options.level_reseller_id || options.admin_id) && fx_status != -1)  || (!options.level_reseller_id && !options.admin_id && [1,2,3].includes(fx_status))">
			<abnor percent="150%" @confirm="confirm" @cancel="$util.goUrl({url:`/pages/mine`,openType:`reLaunch`})"
				:title="title[fx_status]" :tip="tipArr[fx_status]" :button="buttonArr[fx_status]"
				:image="image[fx_status]" :tipMax="fx_status == 4? '690rpx':''"></abnor>
		</view>
		<view class="fill-base" v-else>
			<view class="ml-lg mr-lg">
				<view class="pt-lg f-mini-title c-title text-bold">填写分销资格申请表单</view>
				<view class="f-mini-title c-title text-bold mt-lg pt-sm">您的姓名</view>
				<input v-model="form.user_name" type="text" class="item-input radius-16 mt-lg pl-md pr-md"
					maxlength="20" placeholder-style="color:#B5B9C0" :placeholder="rule[0].errorMsg" />
				<view class="f-mini-title c-title text-bold mt-lg pt-sm">手机号码</view>
				<input v-model="form.mobile" type="text" class="item-input radius-16 mt-lg pl-md pr-md" maxlength="11"
					placeholder-style="color:#B5B9C0" :placeholder="rule[1].errorMsg" />
				<view class="f-mini-title c-title text-bold mt-lg pt-sm">备注信息</view>
				<view class="item-textarea pd-lg radius-16 mt-lg">
					<textarea v-model="form.text" class="textarea" maxlength="300" placeholder="输入备注信息"
						placeholder-style="color:#B5B9C0" />
					<view class="text-right f-paragraph" style="color:#5A677E">
						{{form.text.length>300?300:form.text.length}}/300
					</view>
				</view>

				<block v-if="configInfo.plugAuth.payreseller">
					<view class="f-mini-title c-title text-bold mt-lg pt-sm">选择级别</view>
					<view @tap.stop="toChangeItem('chooseInd',index, 'pay_reseller_type',item.id)"
						class="flex-between mt-lg" v-for="(item,index) in chooseList" :key="index">
						<view class="flex-y-center">{{item.title}}
							<view class="text-bold ml-sm" style="color: #F1381F;">¥{{detail[item.key]}}</view>
						</view>
						<i class="pay-icon iconfont c-caption"
							:class="[{'icon-xuanze':chooseInd != index},{'icon-radio-fill':chooseInd == index}]"
							:style="{color:chooseInd==index?primaryColor:'#BEC3CE'}"></i>
					</view>

					<view class="tips-info flex-center pd-lg mt-lg f-desc radius-16" style="color:#F96246">
						<i class="iconfont icontixingshixin mr-sm"></i>
						成为一级分销员可以邀请用户下单，也可以邀请用户成为分销员，成为二级分销员只能邀请用户下单
					</view>

					<view @tap.stop="toChangeItem('payInd',index, 'pay_model', item.id)" class="flex-between mt-lg"
						v-for="(item,index) in payList" :key="index">
						<view class="pay-item flex-y-center">
							<view class="item-icon flex-center mr-md"
								:class="[{'wechat':item.id==1},{'alipay':item.id==3}]">
								<i class="iconfont icon-font-color" :class="[item.icon]"></i>
							</view>
							<view class="flex-y-baseline item-title">{{item.title}}
							</view>
						</view>
						<i class="pay-icon iconfont c-caption"
							:class="[{'icon-xuanze':payInd != index},{'icon-radio-fill':payInd == index}]"
							:style="{color:payInd==index?primaryColor:'#BEC3CE'}"></i>
					</view>
				</block>
			</view>
			<view class="space-max-footer"></view>

			<fix-bottom-button @confirm="submit" :text="[{text:'确定申请',type:'confirm',isAuth:true}]" bgColor="#fff">
			</fix-bottom-button>
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
		components: {},
		data() {
			return {
				isLoad: false,
				options: {},
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
						text: '您已具备分销员资格，快去分享体验吧~',
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
					'-1': '申请分销员',
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
				fx_status: -1,
				chooseList: [{
					id: 1,
					key: 'reseller_threshold',
					title: '一级分销员'
				}, {
					id: 2,
					key: 'level_reseller_threshold',
					title: '二级分销员'
				}],
				chooseInd: 0,
				payList: [{
					id: 1,
					icon: 'icon-weixin',
					title: '微信支付'
				}],
				payInd: 0,
				detail: {},
				form: {
					id: 0,
					level_reseller_id: 0,
					user_name: '', //姓名 
					mobile: '', //手机号  
					text: '', //备注 
					pay_reseller_type: 1,
					pay_model: 1
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
			scanRecordId: state => state.user.scanRecordId,
		}),
		async onLoad(options) {
			this.$util.showLoading()
			let {
				level_reseller_id = 0,
					admin_id = 0
			} = options
			if (level_reseller_id) {
				this.addScanRecord({
					type: 9,
					qr_id: level_reseller_id
				})
			}
			if (admin_id && !level_reseller_id) {
				this.addScanRecord({
					type: 10,
					qr_id: admin_id
				})
			}
			options = level_reseller_id || admin_id ? await this.updateCommonOptions(options) : options
			this.options = options
			this.form.level_reseller_id = level_reseller_id
			this.form.admin_id = admin_id
			await this.initIndex()
			let {
				title,
				fx_status
			} = this
			uni.setNavigationBarTitle({
				title: title[fx_status]
			})
			if (this.scanRecordId) {
				this.updateScanRecord()
			}
			this.isLoad = true
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'getMineInfo', 'updateCommonOptions', 'addScanRecord',
				'updateScanRecord'
			]),
			...mapMutations(['updateUserItem', 'updateOrderItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				await this.getConfigInfo()
				let {
					alipay_status = 0
				} = this.configInfo
				if (alipay_status && this.payList.length == 1) {
					// #ifndef MP-WEIXIN
					this.payList.push({
						id: 3,
						icon: 'icon-alipay-fill',
						title: '支付宝支付'
					})
					// #endif
				}
				let [info, data] = await Promise.all([this.$api.mine.getPayResellerData(), this.$api.mine
					.resellerInfo()
				])
				this.detail = info
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})

				if (!data || (data && !data.id)) {
					this.$util.hideAll()
					return
				}
				data.level_reseller_id = data.pid

				let {
					level_reseller_id = 0,
						admin_id = 0
				} = this.options
				if (level_reseller_id) {
					data.level_reseller_id = level_reseller_id
				}
				if (admin_id) {
					data.admin_id = admin_id
				}
				for (let key in this.form) {
					this.form[key] = data[key]
				}
				let {
					status,
					sh_text
				} = data
				let fx_status = !level_reseller_id && !admin_id && status == 4 ? -1 : status
				this.fx_status = fx_status
				if (fx_status == 4 && sh_text) {
					this.tipArr[4][0].text = sh_text
				}
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			// 个人中心/去分享
			async confirm() {
				let {
					fx_status
				} = this
				if (fx_status == 4) {
					this.fx_status = -1
					uni.setNavigationBarTitle({
						title: '申请分销员'
					})
					return
				}
				this.$util.goUrl({
					url: `/user/pages/distribution/income`,
					openType: `reLaunch`
				})
			},
			toChangeItem(key, ind, val, id) {
				this[key] = ind
				this.form[val] = id
				this.lockTap = false
			},
			//表单验证
			validate(param) {
				let validate = new this.$util.Validate();
				this.rule.map(item => {
					let {
						name,
					} = item
					validate.add(param[name], item);
				})
				let message = validate.start();
				return message;
			},
			async submit() {
				let param = this.$util.deepCopy(this.form)
				let msg = this.validate(param);
				if (msg) {
					this.$util.showToast({
						title: msg
					})
					return
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				param.text = param.text.length > 300 ? param.text.substring(0, 300) : param.text
				let {
					payreseller
				} = this.configInfo.plugAuth
				if (!payreseller) {
					delete param.pay_reseller_type
					delete param.pay_model
				}

				if (payreseller) {

					let {
						pay_model
					} = param

					try {
						let {
							order_id,
							pay_list
						} = await this.$api.mine.applyReseller(param)
						this.$util.hideAll()

						if (pay_list) {
							if (pay_model == 3) {
								pay_list = {
									orderInfo: pay_list,
									provider: 'alipay'
								}
							}

							// #ifdef H5
							if (pay_model == 3) {
								pay_list = Object.assign({}, pay_list, {
									order_id,
									reseller: 1,
									page_url: `/user/pages/distribution/pay-suc`
								})
								this.updateOrderItem({
									key: 'alipayOrderParams',
									val: pay_list
								})
								this.$util.goUrl({
									url: '/user/pages/alipay-result',
									openType: `redirectTo`
								})
								return
							}
							// #endif

							try {
								await this.$util.pay(pay_list)
								this.$util.showToast({
									title: `支付成功`
								})
								setTimeout(() => {
									this.getMineInfo()
									this.lockTap = false
									this.$util.goUrl({
										url: '/user/pages/distribution/pay-suc',
										openType: `redirectTo`
									})
								}, 1000)
							} catch (e) {
								this.lockTap = false
								return
							}
						}
						this.$util.showToast({
							title: `支付成功`
						})
						setTimeout(() => {
							this.getMineInfo()
							this.lockTap = false
							this.$util.goUrl({
								url: '/user/pages/distribution/pay-suc',
								openType: `redirectTo`
							})
						}, 1000)
					} catch (e) {
						this.$util.showToast({
							title: `支付失败`
						})
						setTimeout(() => {
							this.lockTap = false
							this.$util.hideAll()
						}, 1000)
					}
				} else {
					try {
						await this.$api.mine.applyReseller(param)
						this.$util.hideAll()
						this.$util.showToast({
							title: `提交成功`
						})
						setTimeout(() => {
							if (getCurrentPages().length > 1) {
								this.$util.back()
							}
							this.$util.goUrl({
								url: '/user/pages/apply-result?type=2',
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
	}
</script>


<style lang="scss">
	.item-input {
		width: 650rpx;
		height: 110rpx;
		background: #F7F8FA;
	}

	.item-textarea {
		width: 690rpx;
		height: 360rpx;
		background: #F7F8FA;

		.textarea {
			width: 100%;
			height: 270rpx;
		}
	}

	.tips-info {
		width: 690rpx;
		background: #FEF5F3;
	}

	.pay-item {
		.item-icon {

			width: 70rpx;
			height: 70rpx;
			border-radius: 35rpx;

			.iconfont {
				font-size: 44rpx;
			}
		}

		.item-icon.wechat {
			background: #E7F9EE;

			.iconfont {
				background-image: linear-gradient(180deg, #90EE90 0%, #32CD32 100%, #19c865 100%);
			}
		}

		.item-icon.alipay {
			background: #E9F5FE;

			.iconfont {
				background-image: linear-gradient(180deg, #46BCFF 0%, #2587FF 100%, #1976FF 100%);
			}
		}

		.item-title {
			color: #2E3541;
		}

	}
</style>