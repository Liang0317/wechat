<template>
	<view style="width:100%">
		<block v-if="needAuth">
			<view @tap.stop="toShowAuth">
				<slot></slot>
			</view>
		</block>
		<block v-else>
			<view @tap.stop="go(1)">
				<slot></slot>
			</view>
		</block>

		<uni-popup ref="show_auth_item" :maskClick="false">
			<view @tap.stop.prevent class="auth-box fill-base flex-column flex-center text-center radius-26">
				<view class="space-md"></view>
				<block v-if="pType == 'phone'">
					<image mode="aspectFill" class="auth-img" :src="`https://lbqny.migugu.com/admin/public/auth.png`">
					</image>
				</block>
				<view class="space-sm"></view>
				<view class="f-caption" :style="{color:primaryColor}">{{contentList[pType][0]}}</view>
				<view class="space-lg"></view>
				<view class="space-lg"></view>
				<block v-if="pType === 'phone'">
					<button open-type="getPhoneNumber|agreePrivacyAuthorization" hover-class="btn-hover"
						@getphonenumber="authPhone" class="clear-btn flex-center auth-btn"
						:style="{backgroundColor:primaryColor,color:'white'}">
						{{btn_text||contentList[pType][1]}}
					</button>
				</block>
				<block v-if="pType === 'setting'">
					<button open-type="openSetting" hover-class="btn-hover" @opensetting="openSetting"
						class="clear-btn flex-center auth-btn" :style="{backgroundColor:primaryColor,color:'white'}">
						{{btn_text||contentList[pType][1]}}
					</button>
				</block>
				<view @tap.stop="go(pType == 'phone' &&  !userInfo.phone ? 2 :  1)" class="f-caption c-caption mt-md"
					v-if="!pMust">{{pType=='userInfo'?'暂不授权':'暂不登录'}}</view>
				<view class="space-md"></view>
			</view>
		</uni-popup>


		<uni-popup ref="show_info_item" :maskClick="false">
			<view @tap.stop.prevent class="common-popup-content popup-phone pd-lg flex-center flex-column fill-base">
				<view class="f-md-title c-black">请填写用户信息</view>
				<view class="space-lg pb-lg"></view>
				<view class="space-lg pb-lg"></view>
				<view class="flex-between" style="width:100%">
					<view class="flex-y-center c-title">
						<view class="c-warning">*</view>昵称
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<input v-model="infoForm.nickName" type="nickname" maxlength="15"
						class="f-mini-title c-title text-right" style="width:80%" placeholder-class="c-placeholder"
						:placeholder="infoRule[0].errorMsg" />
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<input v-model="infoForm.nickName" type="text" maxlength="15"
						class="f-mini-title c-title text-right" style="width:80%" placeholder-class="c-placeholder"
						:placeholder="infoRule[0].errorMsg" />
					<!-- #endif -->
				</view>
				<view class="flex-between mt-md pt-md b-1px-t" style="width:100%">
					<view class="flex-y-center c-title">
						<view class="c-warning">*</view>头像
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image mode="aspectFill" class="avatar radius" :src="infoForm.avatarUrl"></image>
					</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<image @tap.stop="toChooseImg" mode="aspectFill" class="avatar radius" :src="infoForm.avatarUrl">
					</image>
					<!-- #endif -->
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_info_item.close()" class="item-child">
						取消
					</view>
					<view @tap.stop="submit('info')" class="item-child"
						:style="{background: primaryColor,color:'#fff'}">
						确定
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="show_phone_item" :maskClick="false" :zIndex="999">
			<view class="common-popup-content popup-phone pd-lg flex-center flex-column fill-base">
				<view class="f-md-title c-black">绑定手机号</view>
				<view class="f-caption c-caption">您暂未绑定手机号，快来绑定吧</view>
				<view class="space-lg pb-lg"></view>
				<view class="space-lg pb-lg"></view>
				<view class="flex-center mb-lg">
					<view class="input-info sm mr-md radius-16">
						<input v-model="subForm.phone" type="number"
							class="item-input flex-y-center pl-lg pr-lg f-sm-title c-title"
							placeholder-class="c-placeholder" :placeholder="subRule[0].errorMsg" />
					</view>
					<view @tap="toSend" class="send-btn flex-center c-base radius-16"
						:style="{background:primaryColor}">
						{{authTime>0?`(${authTime}s)`:'发送'}}
					</view>
				</view>
				<view class="input-info radius-16">
					<input v-model="subForm.short_code" type="number"
						class="item-input flex-y-center pl-lg pr-lg f-sm-title c-title" maxlength="6"
						placeholder-class="c-placeholder" :placeholder="subRule[1].errorMsg" />
				</view>
				<view class="button">
					<view @tap.stop="go(3)" class="item-child" v-show="configInfo.force_login != 1">
						取消
					</view>
					<view @tap.stop="submit('sub')" class="item-child" :style="{background: primaryColor,color:'#fff'}">
						确定
					</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations,
	} from "vuex"
	export default {
		components: {},
		name: 'auth',
		props: {
			needAuth: {
				type: Boolean,
				default () {
					return false
				}
			},
			must: {
				type: Boolean,
				default () {
					return false
				}
			},
			userMust: {
				type: Boolean,
				default () {
					return true
				}
			},
			showAuth: {
				type: Boolean,
				default () {
					return false
				}
			},
			type: {
				type: String,
				default () {
					return 'phone'
				}
			},
			btn_text: {
				type: String,
				default () {
					return ''
				}
			},
			haveGo: {
				type: Boolean,
				default () {
					return true
				}
			},
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			userPrivacySetting: state => state.user.userPrivacySetting,
		}),
		created() {
			this.init();
		},
		data() {
			return {
				contentList: {
					userInfo: ['尊贵的用户，获取授权是为了能更好的为你服务', '立即授权'],
					phone: ['尊贵的用户，登录后我们才能更好的为你服务', '立即登录'],
					setting: ['为了功能正常使用，你需要打开设置并开启获取相应权限', '打开设置'],
				},
				pType: '',
				pMust: '',
				authTime: 0,
				timer: null,
				subForm: {
					phone: '',
					short_code: ''
				},
				subRule: [{
					name: "phone",
					checkType: "isMobile",
					errorMsg: "请输入手机号",
					regText: "手机号"
				}, {
					name: "short_code",
					checkType: "isNotNull",
					errorMsg: "请输入短信验证码"
				}],
				infoForm: {
					nickName: '',
					avatarUrl: ''
				},
				infoRule: [{
					name: "nickName",
					checkType: "isNotNull",
					errorMsg: "请输入用户昵称",
					regType: 2
				}, {
					name: "avatarUrl",
					checkType: "isNotNull",
					errorMsg: "请上传用户头像"
				}],
				lockTap: false
			}
		},
		methods: {
			...mapActions(['getUserInfo', 'getMineInfo', 'getAuthUserProfile', 'getAuthPhone', ]),
			...mapMutations(['updateConfigItem', 'updateUserItem']),
			init() {
				let {
					type,
					must,
					showAuth
				} = this
				this.$set(this, 'pType', type)
				this.$set(this, 'pMust', must)
				if (!showAuth) return
				let refs_key = type === 'userInfo' ? 'show_info_item' : 'show_auth_item'
				// #ifndef MP-WEIXIN
				refs_key = 'show_phone_item'
				// #endif
				this.$refs[refs_key].open()
			},
			toShowAuth() {
				let {
					id: uid = 0,
					phone = '',
				} = this.userInfo
				let {
					short_code_status = 0,
						bind_phone_type = 0
				} = this.configInfo
				if (!uid || (short_code_status && bind_phone_type && !phone)) {
					let pages = getCurrentPages()
					let {
						route,
						options = {}
					} = pages[pages.length - 1]
					let loginPage = this.$util.getUrlToStr(`/${route}`, options)
					this.updateUserItem({
						key: 'loginPage',
						val: loginPage
					})
					this.$util.goUrl({
						url: !uid ? `/pages/login` : `/user/pages/phone`
					})
					return
				}
				let user_info = this.$util.pick(this.userInfo, ['nickName',
					'avatarUrl'
				])
				if (!user_info.avatarUrl) {
					user_info.avatarUrl =
						'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
				}
				this.infoForm = user_info
				let type = !phone ? 'phone' : 'userInfo'
				let {
					needAuthorization
				} = this.userPrivacySetting
				if (type === 'userInfo' && needAuthorization) {
					this.$emit('userPrivacy')
					return
				}
				this.$set(this, 'pType', type)

				let refs_key = 'show_info_item'
				if (!phone) {
					// #ifdef MP-WEIXIN
					refs_key = 'show_auth_item'
					// #endif
					// #ifndef MP-WEIXIN 
					if (this.haveGo) {
						refs_key = 'show_phone_item'
						if (!short_code_status) {
							this.go(1)
							return
						}
					}
					// #endif
				}
				this.$refs[refs_key].open()
			},
			// 授权手机号
			async authPhone(e) {
				let {
					pMust
				} = this
				let phone = await this.getAuthPhone({
					e,
				})
				if (!phone) {
					this.go(pMust ? 2 : 1)
					return false
				} else {
					this.$refs.show_auth_item.close()
					let {
						nickName = '',
					} = this.userInfo
					if (nickName) {
						this.go(1)
						return
					}
					this.$set(this, 'pType', 'userInfo')
					this.$set(this, 'pMust', this.userMust)
					if (!this.pMust) return
					this.$refs.show_info_item.open()
				}
			},
			go(type = 1) {
				this.lockTap = false
				this.$emit(type == 1 ? 'go' : 'hide')
				let refs_key = type == 3 ? 'show_phone_item' : type == 4 ? 'show_info_item' : 'show_auth_item'
				let {
					id: uid = 0
				} = this.userInfo
				if (uid && this.needAuth) {
					this.$refs[refs_key].close()
				}
				if (type != 3) return
				this.toResetItem('sub')
			},
			// 重置数据
			toResetItem(type) {
				if (type == 'sub') {
					this.timer && clearInterval(this.timer)
					this.authTime = 0
					this.subForm = {
						phone: '',
						short_code: ''
					}
					return
				}
				this.infoForm = this.$util.pick(this.userInfo, ['nickName',
					'avatarUrl'
				])
			},
			//表单验证
			validate(param, ruleType, is_send = false) {
				let validate = new this.$util.Validate();
				this[`${ruleType}Rule`].map(item => {
					let {
						name,
					} = item
					if (ruleType == 'sub' && name == 'short_code' && is_send) return
					validate.add(param[name], item);
				})
				let message = validate.start();
				return message;
			},
			// 发送验证码
			async toSend() {
				let {
					authTime
				} = this
				if (authTime) return
				let {
					phone = ''
				} = this.subForm
				let msg = this.validate({
					phone
				}, 'sub', true);
				if (msg) {
					this.$util.showToast({
						title: msg
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
					this.subForm.short_code = ''
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
			// 获取头像
			onChooseAvatar(e) {
				let {
					avatarUrl
				} = e.detail
				this.infoForm.avatarUrl = avatarUrl
			},
			async toChooseImg() {
				let param = {
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
				}
				let [res_upload, res_info] = await uni.chooseImage(param)
				if (res_upload) return
				let {
					size = 0,
						tempFiles,
						tempFilePath = ''
				} = res_info
				// 格式化图片参数
				this.$util.showLoading({
					title: "上传中"
				})
				let {
					attachment_path: path
				} = await this.$api.base.uploadFile({
					filePath: tempFiles[0].path,
					formData: {
						type: 'picture'
					}
				})
				this.infoForm.avatarUrl = path
				this.$util.hideAll()
			},
			// sub 授权手机号，info 用户信息
			async submit(formType) {
				let param = this.$util.deepCopy(this[`${formType}Form`])
				let msg = this.validate(param, formType);
				if (msg) {
					this.$util.showToast({
						title: msg
					});
					return;
				}

				if (formType == 'sub' && param.short_code.length != 6) {
					this.$util.showToast({
						title: `请输入6位数短信验证码`
					})
					return
				}

				if (formType == 'info' && (param.avatarUrl.includes('wxfile://') || param.avatarUrl.includes(
						'//tmp/'))) {
					let {
						attachment_path: path
					} = await this.$api.base.uploadFile({
						filePath: param.avatarUrl,
						formData: {
							type: 'picture'
						}
					})
					param.avatarUrl = path
				}

				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				let methodModel = formType == 'sub' ? 'bindUserPhone' : 'userUpdate'
				let refs_key = formType == 'sub' ? 'show_phone_item' : 'show_info_item'
				try {
					await this.$api.user[methodModel](param)
					this.$util.hideAll()
					this.$refs[refs_key].close()
					this.lockTap = false
					await this.getUserInfo()
					this.toResetItem(formType)
					setTimeout(() => {
						this.$emit('go')
					}, 500)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			}
		},
	}
</script>



<style lang="scss">
	.auth-box {
		width: 630rpx;
		height: auto;
		padding: 30rpx;

		.auth-img {
			width: 322rpx;
			height: 341rpx;
			/* background: #f4f6f8; */
		}

		.auth-btn {
			width: 367rpx;
			height: 90rpx;
			border-radius: 90rpx;
		}

		.auth-info {
			width: 80rpx;
			height: 80rpx;
			background: #f4f6f8;
			border-radius: 50%;
		}

	}


	.popup-phone {
		width: 630rpx;

		.input-info {
			width: 570rpx;
			height: 90rpx;
			background: #F7F7F7;

			.item-input {
				height: 90rpx;
				font-size: 32rpx;
				text-align: left;
			}
		}

		.input-info.sm {
			width: 400rpx;
		}

		.send-btn {
			width: 150rpx;
			height: 90rpx;
		}
	}
</style>