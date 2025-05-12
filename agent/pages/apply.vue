<template>
	<view class="apply-pages" v-if="isLoad">

		<view class="page-height" v-if="mineInfo.is_admin">
			<abnor percent="150%" @confirm="$util.goUrl({url:`/agent/pages/index?agent=1`,openType: `reLaunch`})"
				title="您已经是代理商了" :tip="[{ text: '快去管理订单吧', color: 0 }]" :button="[{ text: '去管理', type: 'confirm' }]"
				image="https://lbqny.migugu.com/admin/public/apply_suc.jpg"></abnor>
		</view>

		<block v-else>

			<view class="apply-info-box rel" :style="{background:primaryColor}">
				<image class="bg-1 abs" src="https://lbqny.migugu.com/admin/anmo/apply/bg-4.png">
				</image>
				<image class="bg-2 abs" src="https://lbqny.migugu.com/admin/anmo/apply/bg-3.png">
				</image>
				<image class="join-us abs" src="https://lbqny.migugu.com/admin/anmo/apply/join-us-1.png">
				</image>
				<view class="join-us pd-lg abs" style="z-index: 3;">
					<view style="height:90rpx"></view>
					<view class="f-mini-title c-title text-bold">您的姓名</view>
					<input v-model="form.user_name" type="text"
						class="item-input fill-base f-mini-title c-title mt-sm pl-lg pr-lg radius-10" maxlength="20"
						placeholder-class="c-caption" :placeholder="rule[0].errorMsg"
						:style="{borderColor:primaryColor}" />
					<view class="mt-md f-mini-title c-title text-bold">代理类型</view>
					<view class="flex-y-center mt-sm">
						<view @tap.stop="form.city_type = item.id" class="flex-y-center f-mini-title c-title"
							:class="[{'mr-lg pr-lg':index!=2}]"
							:style="{color:form.city_type == item.id ? primaryColor:''}"
							v-for="(item,index) in cityList" :key="index"><i class="iconfont mr-sm"
								:class="[{'icon-xuanze':form.city_type != item.id},{'icon-radio-fill':form.city_type == item.id}]"></i>{{item.title}}代理
						</view>
					</view>
					<view class="mt-md f-mini-title c-title text-bold">手机号</view>
					<view class="item-input fill-base f-mini-title c-title mt-sm pl-lg pr-lg radius-10"
						style="height:auto;min-height:82rpx" :style="{borderColor:primaryColor}">
						<view class="flex-between">
							<input :disabled="!is_send" v-model="form.phone" type="text" maxlength="11"
								placeholder-class="c-caption" :placeholder="rule[1].errorMsg" />
							<view>
								<view @tap.stop="toResetPhone" class="f-caption" :style="{color:primaryColor}"
									v-if="!is_send">更换手机号</view>
							</view>
						</view>
						<view class="flex-between" v-if="configInfo.short_code_status && is_send">
							<input v-model="form.short_code" type="text" maxlength="6" placeholder-class="c-caption"
								placeholder="请输入验证码" :style="{borderColor:primaryColor}" />
							<view @tap.stop="toSend" class="f-caption" :style="{color:primaryColor}">
								{{authTime>0?`重新获取(${authTime}s)`:'获取验证码'}}
							</view>
						</view>
					</view>
					<view class="mt-md f-mini-title c-title text-bold">申请加入的区域</view>
					<input v-model="form.city" type="text"
						class="item-input fill-base f-mini-title c-title mt-sm pl-lg pr-lg radius-10" maxlength="50"
						placeholder-class="c-caption" :placeholder="rule[2].errorMsg"
						:style="{borderColor:primaryColor}" />
				</view>
				<image @tap.stop="submit" class="submit abs"
					src="https://lbqny.migugu.com/admin/anmo/apply/submit-1.png">
				</image>
			</view>
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
				authTime: 0,
				timer: null,
				is_send: true,
				cityList: [{
					id: 3,
					title: '省'
				}, {
					id: 1,
					title: '城市'
				}, {
					id: 2,
					title: '区县'
				}],
				form: {
					user_name: '', //姓名 
					city_type: 3,
					phone: '', //手机号 
					short_code: '',
					city: ''
				},
				rule: [{
						name: "user_name",
						checkType: "isNotNull",
						errorMsg: "请输入您的姓名",
						regType: 2
					},
					{
						name: "phone",
						checkType: "isMobile",
						errorMsg: "请输入手机号"
					},
					{
						name: "city",
						checkType: "isNotNull",
						errorMsg: "请输入您想代理的区域"
					}
				],
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			mineInfo: state => state.user.mineInfo,
		}),
		async onLoad(options) {
			this.options = options
			this.$util.showLoading()
			await this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'getMineInfo']),
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
				if (!this.configInfo.id || !this.configInfo.hasOwnProperty(
						'free_fare_bear') || refresh) {
					await this.getConfigInfo()
				}
				await Promise.all([this.getUserInfo(), this.getMineInfo()])
				let {
					is_admin = 0,
						phone = ''
				} = this.mineInfo
				this.form.phone = phone
				this.is_send = phone ? false : true
				uni.setNavigationBarTitle({
					title: is_admin ? '' : '招商加盟'
				})
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.$util.hideAll()
				this.isLoad = true
			},
			initRefresh() {
				this.initIndex(true)
			},
			toResetPhone() {
				this.form.phone = ''
				this.is_send = true
			},
			// 发送验证码
			async toSend() {
				let {
					authTime
				} = this
				if (authTime) return
				let {
					phone = ''
				} = this.form
				if (phone == null || !/^(1[0-9]{10})$/.test(phone)) {
					this.$util.showToast({
						title: phone == null ? `请输入手机号` : `${phone} 手机号无效`
					});
					return;
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.user.sendShortMsg({
						phone
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
				let {
					short_code_status
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
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.agent.agentApply(param)
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
		height: 1632rpx;

		.bg-1 {
			width: 750rpx;
			height: 1632rpx;
			top: 0;
			left: 0;
			z-index: 1;
		}

		.bg-2 {
			width: 750rpx;
			height: 575rpx;
			top: 0;
			left: 0;
			z-index: 3;
		}

		.join-us {
			width: 671rpx;
			height: 890rpx;
			top: 482rpx;
			left: 44rpx;
			z-index: 2;

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
		}

		.submit {
			width: 662rpx;
			height: 93rpx;
			top: 1400rpx;
			left: 47rpx;
			z-index: 2;
		}
	}
</style>