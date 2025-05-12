<template>
	<view class="apply-pages" v-if="isLoad">
		<view class="page-height" v-if="broker_status != -1">
			<abnor percent="150%" @confirm="confirm" @cancel="$util.goUrl({url:`/pages/mine`,openType:`reLaunch`})"
				:title="title[broker_status]" :tip="tipArr[broker_status]" :button="buttonArr[broker_status]"
				:image="image[broker_status]" :tipMax="broker_status == 4? '690rpx':''"></abnor>
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
				</view>
				<view class="fill-base mt-md radius-16">
					<view class="flex-between pl-lg pr-lg">
						<view class="item-text">备注信息</view>
						<input :disabled="true" type="text" class="item-input flex-1" />
					</view>
					<textarea v-model="form.text" class="item-textarea pd-lg" maxlength="300" placeholder="输入备注信息" />
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
						text: '您已具备经纪人资格，快去分享体验吧~',
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
					'-1': '申请经纪人',
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
				broker_status: -1,
				form: {
					id: 0,
					user_name: '', //姓名 
					mobile: '', //手机号  
					text: '', //备注 
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
		}),
		async onLoad(options) {
			this.$util.showLoading()
			this.options = options
			await this.initIndex()
			this.isLoad = true
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo']),
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
				let data = await this.$api.coachbroker.brokerInfo()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				if (!data || (data && !data.id)) {
					this.$util.hideAll()
					return
				}
				for (let key in this.form) {
					this.form[key] = data[key]
				}
				let {
					status,
					sh_text
				} = data
				let broker_status = status == 4 ? -1 : status
				this.broker_status = broker_status
				if (broker_status == 4 && sh_text) {
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
					broker_status
				} = this
				if (broker_status == 4) {
					this.broker_status = -1
					uni.setNavigationBarTitle({
						title: '申请经纪人'
					})
					return
				}
				this.$util.goUrl({
					url: `/user/pages/coachbroker/income`,
					openType: `reLaunch`
				})
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
					});
					return;
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				param.text = param.text.length > 300 ? param.text.substring(0, 300) : param.text
				try {
					await this.$api.coachbroker.applyBroker(param)
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功`
					});

					setTimeout(() => {
						if (getCurrentPages().length > 1) {
							this.$util.back()
						}
						this.$util.goUrl({
							url: '/user/pages/apply-result?type=5',
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