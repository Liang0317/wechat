<template>
	<view class="technician-income-cash-out" v-if="isLoad">

		<view class="mt-md ml-lg mr-lg pd-lg f-paragraph fill-base radius-16">
			<view class="f-title c-title text-bold">提现账户</view>
			<view @tap.stop="toChangeItem(index)" class="flex-center mt-lg" v-for="(item,index) in payList"
				:key="index">
				<i class="pay-icon iconfont c-caption"
					:class="[{'icon-xuanze':payInd != index},{'icon-radio-fill':payInd == index}]"
					:style="{color:payInd==index?primaryColor:'#BEC3CE'}"></i>
				<view class="flex-1 ml-lg f-mini-title c-title">
					<view class="flex-y-center">
						<view>
							{{item.title}}
						</view>
						<view class="flex-1 flex-between ml-md" v-if="item.id == 2">
							<view class="f-desc c-paragraph">
								{{userInfo.alipay_number ? userInfo.split_alipay_number : '暂无'}}
							</view>
							<view @tap.stop="$util.goUrl({url:`/user/pages/alipay-account`})"
								:style="{color:primaryColor}">{{userInfo.alipay_number?'修改':'去设置'}}
							</view>
						</view>
						<view class="flex-1 flex-center ml-md" v-if="item.id == 4">
							<view class="flex-1 f-desc c-paragraph">
								{{userInfo.bank_card_id ? userInfo.split_card_id : '暂无'}}
							</view>
							<view @tap.stop="$util.goUrl({url:`/user/pages/bank-account`})"
								:style="{color:primaryColor}"
								v-if="(userInfo.bank_card_id && userInfo.bank_status != 0) || !userInfo.bank_card_id">
								{{userInfo.bank_card_id?'修改':'去设置'}}
							</view>
						</view>
					</view>
					<view @tap.stop="$refs.show_rule_item.open()" class="flex-y-center f-caption c-caption"
						v-if="item.id==4">
						T+1工作日到账
						<i class="iconfont iconwentifankui3 ml-sm"></i>
					</view>
				</view>
			</view>
		</view>
		<view class="mt-md ml-lg mr-lg f-paragraph fill-base radius-16" style="overflow: hidden;">
			<view class="fill-space pd-lg b-1px-b">
				<view class="flex-between pt-md pb-md">
					<view class="f-title c-title text-bold">备注</view>
					<input v-model="text" class="flex-1 f-paragraph ml-md" type="text" placeholder="请输入到账信息" />
				</view>
			</view>
			<view class="pd-lg">
				<view class="f-title c-title text-bold">提现金额</view>
				<view class="flex-y-center pt-lg pb-md b-1px-b">
					<view class="text-bold">¥</view>
					<input v-on:input="checkInput($event,'apply_price')" v-model="apply_price"
						class="flex-1 f-paragraph ml-sm" type="digit" placeholder="请输入提现金额" />
				</view>
				<view @tap.stop="withAll" class="flex-y-center f-caption c-caption pt-md">可提现余额￥{{cash}}
					<view class="ml-md c-warning">全部提现
					</view>
				</view>
				<view class="flex-y-center f-caption c-caption pt-sm">最低提现额度<view class="ml-md c-warning">
						￥{{configInfo.cash_mini || 0}}
					</view>
				</view>
				<view class="space-lg"></view>
				<view class="space-lg"></view>
				<view class="flex-center f-caption c-title" v-if="configInfo.tax_point">
					需扣除{{configInfo.tax_point}}%个人所得税
					<view class="ml-md" :style="{color:primaryColor}" v-if="tax_price">¥{{tax_price}}</view>
				</view>
				<view class="space-lg"></view>
				<view @tap.stop="submit" class="cash-out-btn flex-center f-title c-base radius-16"
					:style="{background:primaryColor}">提现</view>
			</view>
		</view>

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
		mapActions
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				options: {},
				isLoad: false,
				payList: [],
				payInd: 0,
				detail: {},
				balance: '',
				cash: '',
				apply_price: '',
				text: '',
				type: 1,
				tax_price: '',
				lockTap: false,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			coachInfo: state => state.user.coachInfo,
		}),
		async onLoad(options) {
			this.$util.showLoading()
			this.options = options
			await this.initIndex()
		},
		watch: {
			'apply_price'(value) {
				let {
					tax_point = 0
				} = this.configInfo
				this.tax_price = (tax_point / 100 * value).toFixed(2)
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'getCoachInfo']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				await Promise.all([this.getConfigInfo(), this.getUserInfo()])
				let {
					wechat_transfer,
					alipay_transfer,
					under_transfer,
					bank_transfer,
					plugAuth
				} = this.configInfo
				let arr = []
				if (wechat_transfer == 1) {
					arr.push({
						id: 1,
						title: '微信零钱包'
					})
				}
				// #ifndef MP-WEIXIN
				if (alipay_transfer == 1) {
					arr.push({
						id: 2,
						title: '支付宝账户'
					})
				}
				// #endif 
				if (bank_transfer == 1 && plugAuth.adapay) {
					arr.push({
						id: 4,
						title: '银行卡账户'
					})
				}
				if (under_transfer == 1) {
					arr.push({
						id: 0,
						title: '线下转账'
					})
				}
				this.payList = arr
				let {
					type
				} = this.options
				// type technician技-师；carfee车费；distribution分销商；channel渠道-商；agent代理商；salesman业务员;coachbroker经纪人
				switch (type) {
					case 'technician':
						let {
							cap_cash = 0,
								coach_level
						} = await this.$util.getPage(-1).detail
						this.balance = 100 - coach_level.balance * 1
						this.cash = cap_cash
						break
					case 'carfee':
						let {
							id: cid = 0
						} = this.coachInfo
						if (!cid) {
							await this.getCoachInfo()
						}
						this.cash = this.coachInfo.car_price
						break
					case 'distribution':
						let {
							new_cash = 0
						} = await this.$util.getPage(-1).detail
						this.cash = new_cash
						break
					case 'channel':
					case 'agent':
					case 'salesman':
					case 'coachbroker':
						let {
							cash = 0
						} = await this.$util.getPage(-1).detail
						this.cash = cash
						break
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.$util.hideAll()
				this.isLoad = true
			},
			initRefresh() {
				this.initIndex(true)
			},
			toChangeItem(val) {
				let {
					id
				} = this.payList[val]

				let {
					alipay_number = '',
						alipay_name = '',
						bank_card_id = '',
						bank_status
				} = this.userInfo
				if (id == 2 && (!alipay_number || !alipay_name)) {
					this.$util.showToast({
						title: !alipay_number ? `请先绑定支付宝账户` : `请先绑定支付宝账户姓名`
					})
					return
				}
				if (id == 4 && (!bank_card_id || (bank_card_id && bank_status != 1))) {
					let msg = bank_status === 0 ? `正在审核中` : `审核失败`
					this.$util.showToast({
						title: !bank_card_id ? `请先绑定银行卡账户` : `银行卡账户${msg}，不能选择哦`
					})
					return
				}

				this.payInd = val
				this.lockTap = false
			},
			withAll() {
				this.apply_price = this.cash
			},
			checkInput(e, key) {
				let val = this.$util.formatMoney(e.detail.value)
				this.$nextTick(() => {
					this[key] = val
				})
			},
			async submit() {
				if (this.apply_price == '0.0') {
					this.$nextTick(() => {
						this.apply_price = '0'
					})
				}
				let {
					cash,
					apply_price,
					text,
					payList,
					payInd
				} = this

				let {
					id: apply_transfer
				} = payList[payInd]
				let {
					cash_mini
				} = this.configInfo
				text = text ? text.replace(/(^\s*)|(\s*$)/g, "") : ''
				if ((apply_transfer == 0 && !text) || !apply_price) {
					this.$util.showToast({
						title: apply_transfer == 0 && !text ? `请输入到账信息` : `请输入提现金额`
					})
					return
				}
				if (parseFloat(apply_price) < parseFloat(cash_mini)) {
					this.$util.showToast({
						title: `提现金额不能低于最低提现金额${cash_mini}`
					})
					return
				}
				if (parseFloat(apply_price) > parseFloat(cash)) {
					this.$util.showToast({
						title: `提现金额不能大于可提现金额${cash}`
					})
					return
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					let {
						type
					} = this.options
					let methodArr = {
						technician: 'technician',
						carfee: 'technician',
						distribution: 'mine',
						channel: 'channel',
						agent: 'agent',
						salesman: 'salesman',
						coachbroker: 'coachbroker',
					}
					let methodModel = methodArr[type]
					let param = {
						apply_price,
						text,
						apply_transfer
					}
					if (type == 'technician' || type === 'carfee') {
						param.type = type == 'technician' ? 1 : 2
					}
					await this.$api[methodModel].applyWallet(param)
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功`,
					});
					setTimeout(() => {
						this.$util.back()
						this.$util.goUrl({
							url: 1,
							openType: 'navigateBack'
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
	.technician-income-cash-out {
		.cash-out-btn {
			width: 622rpx;
			height: 88rpx;
			margin: 0 auto;
		}
	}
</style>