<template>
	<view class="mine-pages-setting">
		<view class="flex-center flex-column pd-lg fill-base">
			<view class="space-lg"></view>
			<view class="space-lg"></view>
			<!-- #ifdef H5 -->
			<view class="avatar radius">
				<view class="h5-image avatar radius" :style="{ backgroundImage : `url('${user_info.avatarUrl}')`}">
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<image mode="aspectFill" class="avatar radius" :src="user_info.avatarUrl"></image>
			<!-- #endif -->

			<view @tap.stop="toResetPhone" class="flex-y-center f-title c-caption mt-md" v-if="user_info.phone">
				{{user_info.split_phone}}
				<view class="ml-md f-caption" :style="{color:primaryColor}" v-if="configInfo.short_code_status">
					更换手机号</view>
			</view>
		</view>
		<view class="flex-between pd-lg fill-base f-paragraph">
			<view>昵称</view>
			<view class="c-caption max-500">{{user_info.nickName}}</view>
		</view>
		<view class="flex-between pd-lg fill-base f-paragraph">
			<view>注册时间</view>
			<view class="c-caption">{{user_info.create_date || '-'}}</view>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<view @tap.stop="$util.goUrl({url:`/user/pages/alipay-account`})"
			class="flex-between pd-lg fill-base f-paragraph" v-if="mineInfo.wallet_status == 1">
			<view>支付宝账号</view>
			<view class="flex-y-center c-caption">{{user_info.split_alipay_number || '暂无'}}
				<view class="ml-md" :style="{color:primaryColor}">{{user_info.alipay_number?'修改':'去设置'}}</view>
			</view>
		</view>
		<!-- #endif -->

		<view
			@tap.stop="user_info.bank_card_id && user_info.bank_status === 0 ? '' : $util.goUrl({url:`/user/pages/bank-account`})"
			class="flex-between pd-lg fill-base f-paragraph"
			v-if="configInfo.plugAuth.adapay && mineInfo.wallet_status == 1">
			<view>
				<view @tap.stop="$refs.show_rule_item.open()" class="flex-y-center">银行卡账号（提现后T+1工作日到账）<i
						class="iconfont iconwentifankui3"></i></view>
				<view class="mt-sm flex-y-center" v-if="user_info.split_card_id">
					{{user_info.split_card_id}}
					<view class="ml-md" :class="[colorType[user_info.bank_status]]">
						{{adapayStatusType[user_info.bank_status]}}
					</view>
				</view>
			</view>
			<view class="c-caption ml-md">
				<view :style="{color:primaryColor}"
					v-if="!user_info.bank_card_id || (user_info.bank_card_id && user_info.bank_status !== 0)">
					{{user_info.bank_card_id?'修改':'去设置'}}
				</view>
				<view class="mt-md" @tap.stop="toDelBanck" :style="{color:subColor}"
					v-if="user_info.bank_card_id && user_info.bank_status !== 0">删除
				</view>
			</view>
		</view>

		<view class="space-md"></view>
		<view @tap.stop="goDetail(index,'infoList')" class="flex-between pd-lg fill-base f-paragraph"
			v-for="(item,index) in infoList" :key="index">
			<view>{{item.text}}</view>
			<i class="iconfont icon-right"></i>
		</view>
		<view class="space-max-footer"></view>


		<!-- #ifdef H5 -->
		<fix-bottom-button @confirm="toLoginOut" :text="[{ text: '退出登录', type: 'confirm' }]" bgColor="#fff">
		</fix-bottom-button>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->
		<fix-bottom-button @cancel="$util.goUrl({url:`/user/pages/logout`})" @confirm="toLoginOut"
			:text="[{ text: '注销账户', type: 'cancel' },{ text: '退出登录', type: 'confirm' }]" bgColor="#fff">
		</fix-bottom-button>
		<!-- #endif -->

		<uni-popup ref="show_phone_item" :maskClick="false">
			<view @touchmove.stop.prevent
				class="common-popup-content popup-phone pd-lg flex-center flex-column fill-base">
				<view class="f-md-title c-black">请输入手机号</view>
				<view class="space-lg pb-lg"></view>
				<view class="space-lg pb-lg"></view>
				<view class="flex-center mb-lg">
					<view class="input-info sm mr-md radius-16">
						<input v-model="subForm.phone" type="number"
							class="item-input flex-y-center pl-lg pr-lg f-sm-title c-title"
							placeholder-class="c-placeholder" :placeholder="rule[0].errorMsg" />
					</view>
					<view @tap="toSend" class="send-btn flex-center c-base radius-16"
						:style="{background:primaryColor}">
						{{authTime>0?`(${authTime}s)`:'发送'}}
					</view>
				</view>
				<view class="input-info radius-16">
					<input v-model="subForm.short_code" type="number"
						class="item-input flex-y-center pl-lg pr-lg f-sm-title c-title" maxlength="6"
						placeholder-class="c-placeholder" :placeholder="rule[1].errorMsg" />
				</view>
				<view class="button">
					<view @tap.stop="toResetItem" class="item-child">
						取消
					</view>
					<view @tap.stop="submit" class="item-child" :style="{background: primaryColor,color:'#fff'}">
						确定
					</view>
				</view>
			</view>
		</uni-popup>


		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">规则说明</view>
				<view class="f-desc c-title mt-lg">
					T+1工作日到账，T是指工作日，用户在工作日发起提现次日可到，本周末或者本周五发起提现会在下周一到账
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_rule_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import siteInfo from '@/siteinfo.js';
	export default {
		data() {
			return {
				isLoad: false,
				options: {},
				infoList: [{
					text: '隐私政策',
					url: `/user/pages/protocol`
				}, {
					text: '服务协议',
					url: `/user/pages/information`
				}, {
					text: '屏蔽列表',
					url: `/user/pages/shield`
				}],
				user_info: {},
				authTime: 0,
				timer: null,
				adapayStatusType: {
					0: '审核中',
					1: '审核通过',
					2: '审核失败'
				},
				colorType: {
					0: 'c-alipay',
					1: 'c-success',
					2: 'c-warning'
				},
				subForm: {
					phone: '',
					short_code: ''
				},
				rule: [{
					name: "phone",
					checkType: "isMobile",
					errorMsg: "请输入手机号",
					regText: "手机号"
				}, {
					name: "short_code",
					checkType: "isNotNull",
					errorMsg: "请输入短信验证码",
					regText: "短信验证码"
				}],
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			mineInfo: state => state.user.mineInfo,
		}),
		async onLoad() {
			this.initIndex()
		},
		methods: {
			...mapActions(['getUserInfo', 'getMineInfo']),
			...mapMutations(['updateConfigItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem',
				'updateDynamicItem', 'updateOrderItem', 'updateUserItem'
			]),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				await this.getUserInfo()
				let {
					id = 0
				} = this.mineInfo
				if (!id || refresh) {
					await this.getMineInfo()
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.user_info = this.$util.deepCopy(this.userInfo)
			},
			initRefresh() {
				this.initIndex(true)
			},
			toResetPhone() {
				let {
					short_code_status = 0
				} = this.configInfo
				if (!short_code_status) return
				this.$refs.show_phone_item.open()
			},
			toResetItem() {
				this.$refs.show_phone_item.close()
				this.timer && clearTimeout(this.timer)
				this.authTime = 0
				this.subForm = {
					phone: '',
					short_code: ''
				}
			},
			//表单验证
			validate(param, is_send = false) {
				let validate = new this.$util.Validate();
				this.rule.map(item => {
					let {
						name,
					} = item
					if (name == 'short_code' && is_send) return
					validate.add(param[name], item);
				})
				let message = validate.start();
				return message;
			},
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
				}, true);
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
			async submit() {
				let param = this.$util.deepCopy(this.subForm)
				let msg = this.validate(param);
				if (msg) {
					this.$util.showToast({
						title: msg
					});
					return;
				}

				if (param.short_code.length != 6) {
					this.$util.showToast({
						title: `请输入6位数短信验证码`
					})
					return
				}

				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.user.bindUserPhone(param)
					this.$util.hideAll()
					this.lockTap = false
					this.toResetItem()
					await this.getUserInfo()
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			async toDelBanck() {
				let [res_del, {
					confirm
				}] = await uni.showModal({
					content: `请确认是否要删除银行卡？`,
				})
				if (!confirm) return;
				await this.$api.mine.memberStatusUpdate({
					status: -1
				})
				this.$util.showToast({
					title: `删除成功`
				})
				await this.getUserInfo()
				this.user_info = this.$util.deepCopy(this.userInfo)
			},
			goDetail(index, key) {
				let {
					url
				} = this[key][index]
				this.$util.goUrl({
					url
				})
			},
			toLoginOut() {
				let methodArr = ['updateServiceItem', 'updateTechnicianItem', 'updateMapItem', 'updateDynamicItem',
					'updateOrderItem'
				]
				methodArr.map(item => {
					this[item]({
						key: 'pageActive',
						val: false
					})
				})

				let arr = ['autograph', 'userInfo', 'location', 'appLogin', 'loginType',
					'isGzhLogin', 'isShowLogin', 'mineInfo', 'coachInfo', 'userPageType', 'commonOptions'
				]
				arr.map(key => {
					this.updateUserItem({
						key,
						val: key === 'isShowLogin' ? true : key === 'isGzhLogin' ? false : key ===
							'userPageType' ? 2 : ''
					})
				})

				this.updateOrderItem({
					key: 'order_unix_list',
					val: []
				})
				this.updateUserItem({
					key: 'noChangeLoca',
					val: {
						noloca: false
					}
				}) 

				this.$util.showToast({
					title: `退出登录`
				})
				setTimeout(() => {
					// #ifdef H5
					let {
						siteroot
					} = siteInfo
					let url = siteroot.split('/index.php')[0]
					let href = `${url}/h5/#/pages/service`
					window.location.href = href
					// #endif
					// #ifdef APP-PLUS
					this.$util.goUrl({
						url: `/pages/service`,
						openType: `reLaunch`
					})
					// #endif
				}, 1000)
			}
		}
	}
</script>


<style lang="scss">
	.mine-pages-setting {
		.iconfont {
			color: #999
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
	}
</style>