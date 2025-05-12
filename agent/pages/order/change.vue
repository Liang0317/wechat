<template>
	<view class="order-pages" v-if="isLoad">
		<fixed @height="initFixHeight" :initHeight="transferForm.coach_type">
			<view class="fill-base pd-lg">
				<view class="flex-between">
					<view @tap.stop="$refs.tips_item.open()" class="flex-y-center c-title">
						<view class="f-title text-bold">转派订单</view>
						<i class="iconfont iconwentifankui3 ml-sm"></i>
					</view>
					<view class="flex-center">
						<view @tap.stop="toChangeItem('coach_type',item.id)"
							class="flex-center service-type-item c-caption" :class="[{'ml-lg':index!=0}]"
							:style="{background:transferForm.coach_type == item.id ? primaryColor:'',color:transferForm.coach_type == item.id ? '#fff':''}"
							v-for="(item,index) in tabList" :key="index">
							{{item.title}}
						</view>
					</view>
				</view>
				<view class="fill-base flex-center mt-lg pt-lg b-1px-t" v-if="transferForm.coach_type == 1">
					<view class="flex-1">
						<search @input="toSearch" type="input" :padding="0" :radius="30" height="70rpx"
							:placeholder="placeholder">
						</search>
					</view>
					<view @tap.stop="$refs.show_transfer_item.open()" class="flex-y-center pl-lg">筛选<i
							class="iconfont iconshaixuanxia-1 c-caption"></i></view>
				</view>
			</view>
		</fixed>


		<block v-if="transferForm.coach_type == 1">

			<view @tap.stop="toChangeItem('coach_id',index)"
				class="list-item fill-base pt-lg pb-lg pl-md pr-lg flex-warp mt-md ml-md mr-md radius-16"
				v-for="(item,index) in list.data" :key="index">
				<view class="flex-center mr-md" style="height:124rpx">
					<i class="iconfont"
						:class="[{'icon-xuanze':transferForm.coach_id!=item.id},{'icon-radio-fill':transferForm.coach_id==item.id}]"
						:style="{color:transferForm.coach_id==item.id?primaryColor:''}"></i>
				</view>
				<view class="flex-1 flex-warp">
					<image mode="aspectFill" class="avatar radius" :src="item.work_img"></image>
					<view class="flex-1 ml-md">
						<view class="flex-between">
							<view class="f-title c-title text-bold max-200 ellipsis">{{item.coach_name}}</view>
							<view class="can-service-btn flex-center f-icontext rel" :style="{color:primaryColor}">
								<view class="bg abs" :style="{background:primaryColor}"></view>
								最早可约：{{item.near_time}}
							</view>
						</view>
						<view class="f-desc" style="color:#4D4D4D">
							所属代理商：{{item.admin_id ? item.admin_info.username : '平台'}}
							<block v-if="item.admin_id">（{{cityType[item.admin_info.city_type]}}代理）</block>
						</view>
						<view class="f-caption c-caption mt-sm">电话：{{item.mobile}}</view>
						<view class="flex-between mt-md">
							<view class="f-paragraph" style="color: #F1381F;">¥{{item.price || 0}}</view>
							<view class="flex-y-center f-caption c-caption "><i
									class="iconfont iconjuli1"></i>{{item.distance}}</view>
						</view>
					</view>
				</view>
			</view>

			<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading"
				v-if="loading">
			</load-more>
			<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		</block>
		<block v-if="transferForm.coach_type == 2">

			<view class="pd-lg f-mini-title c-title fill-base b-1px-t">
				<view class="text-bold flex-y-center pb-lg"><i
						class="iconfont icon-required c-warning"></i>{{$t('action.attendantName')}}姓名</view>
				<input v-model="transferForm.coach_name" type="text" class="item-input pl-lg pr-lg radius-16"
					maxlength="15" :placeholder="rule[0].errorMsg" placeholder-class="color:#C7C7C7" />
				<view class="text-bold flex-y-center pt-lg pb-lg"><i class="iconfont icon-required c-warning"></i>联系电话
				</view>
				<input v-model="transferForm.mobile" type="text" class="item-input pl-lg pr-lg radius-16" maxlength="11"
					:placeholder="rule[1].errorMsg" placeholder-class="color:#C7C7C7" />
				<view class="text-bold pt-lg pb-lg">转派备注 </view>
				<textarea v-model="transferForm.text" class="item-textarea pd-lg radius-16"
					placeholder-class="color:#C7C7C7" maxlength="400" placeholder="若订单有其他特殊情况可单独备注在此处" />
				<view @tap.stop="toChooseAgent" class="flex-between pt-lg pb-lg">
					<view class="text-bold">关联代理商</view>
					<view class="flex-y-center" :class="[{'c-caption':!transferForm.admin_id}]">
						<view class="max-400 ellipsis">{{transferForm.admin_id | handleAdminName(base_agent)}}</view>
						<i class="iconfont icongengduo"></i>
					</view>
				</view>
			</view>
			<view class="flex-center f-caption c-caption pt-lg">
				不关联代理商则默认是平台的{{$t('action.attendantName')}}</view>
		</block>


		<view class="space-max-footer"></view>

		<fix-bottom-button @confirm="toConfirm" :text="[{text:'确定',type:'confirm'}]" bgColor="#fff">
		</fix-bottom-button>


		<uni-popup ref="tips_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">温馨提示</view>
				<view class="f-desc c-title mt-lg">
					<view class="mt-sm flex-1">
						1、本单用户实际支付服务项目费用<span
							class="c-warning">¥{{init_service_price}}</span>，因平台/代理商可在服务管理里面为每位{{$t('action.attendantName')}}设置不同的服务价格，因此存在服务项目费用有偏差，转派订单前需联系{{$t('action.attendantName')}}说明此单实际服务项目费用情况
					</view>
					<view class="mt-sm flex-1">
						2、转派给线下{{$t('action.attendantName')}}的服务提成按照系统内最低比例核算，加钟订单遵循加钟比例设置提现</view>
				</view>
				<view class="button">
					<view @tap.stop="$refs.tips_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup type="top" ref="show_transfer_item" :top="`${popupHeight}px`" :custom="true">
			<view class="popup-transfer-type pd-lg fill-base">
				<view @tap.stop="toChangeItem('type',item.id)" class="f-paragraph mb-lg" :class="[{'mt-lg':index==0}]"
					:style="{color:param.type==item.id?primaryColor:''}" v-for="(item,index) in transfreTypeList"
					:key="index">
					{{item.title}}
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="choose_item" type="bottom" :custom="true">
			<view @touchmove.stop.prevent class="common-popup-content fill-base"
				style="width: 100%;border-radius: 34rpx 34rpx 0 0;">
				<view class="flex-center f-title c-title text-bold pb-lg">选择代理商</view>
				<scroll-view scroll-y style="width: 100%;max-height:50vh">
					<view @tap.stop="toChangeItem('chooseInd',index)" class="flex-center pt-sm pb-sm"
						:style="{color:chooseInd == index ? primaryColor: ''}" v-for="(item,index) in base_agent"
						:key="index">
						<view class="f-title flex-1 pr-lg">
							{{item.agent_name}}
						</view>
						<i class="iconfont c-caption"
							:class="[{'icon-xuanze':chooseInd != index},{'icon-radio-fill':chooseInd == index}]"
							style="font-size: 40rpx;" :style="{color:chooseInd == index ? primaryColor: ''}"></i>
					</view>
				</scroll-view>

				<view class="button">
					<view @tap.stop="$refs.choose_item.close()" class="item-child">
						取消
					</view>
					<view @tap.stop="toConfirmCheck" class="item-child"
						:style="{background: primaryColor,color:'#fff'}">
						确定
					</view>
				</view>
				<view class="space-safe"></view>
				</block>
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
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				options: {},
				placeholder: '请输入线下' + this.$t('action.attendantName') + '姓名',
				tabList: [{
					id: 1,
					title: '更换' + this.$t('action.attendantName')
				}, {
					id: 2,
					title: '委派' + this.$t('action.attendantName')
				}],
				transfreTypeList: [{
					id: 1,
					title: '距离最近'
				}, {
					id: 2,
					title: '最早可预约'
				}],
				cityType: ['', '城市', '区县', '省'],
				param: {
					page: 1,
					coach_name: '',
					type: 1
				},
				list: {
					data: []
				},
				loading: true,
				index: -1,
				lockTap: false,
				popupHeight: '',
				popupInfo: {},
				base_agent: [],
				chooseInd: -1,
				init_service_price: '',
				transferForm: {
					order_id: '',
					coach_type: 1,
					coach_id: '',
					coach_name: '',
					near_time: '',
					mobile: '',
					text: '',
					admin_id: ''
				},
				rule: [{
						name: "coach_name",
						checkType: "isNotNull",
						errorMsg: "请输入线下" + this.$t('action.attendantName') + "姓名",
						regType: 2
					},
					{
						name: "mobile",
						checkType: "isMobile",
						errorMsg: "请输入联系电话"
					}
				]
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad(options) {
			let {
				id,
				agent = 0
			} = options
			options.agent = agent * 1
			this.options = options
			this.transferForm.order_id = id
			this.initIndex()
		},
		onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif
			this.initRefresh()
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.list.current_page >= this.list.last_page || this.loading) return;
			this.param.page = this.param.page + 1;
			this.loading = true;
			this.getList();
		},
		methods: {
			...mapActions(['getConfigInfo']),
			...mapMutations(['updateTechnicianItem']),
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
				await Promise.all([this.getBaseInfo(), this.getDetail(), this.getList()])
				this.isLoad = true
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			async getBaseInfo() {
				let {
					agent = 0
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				this.base_agent = await this.$api[methodKey].adminSelect()
			},
			async getDetail() {
				let {
					id,
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				let {
					true_service_price,
					pay_type,
					admin_id = 0,
					order_auth = 0
				} = await this.$api[methodKey].orderInfo({
					id
				})
				this.init_service_price = true_service_price
				if (![2, 3, 4, 5, 6, 8].includes(pay_type) || !order_auth) {
					this.$util.showToast({
						title: `当前订单不支持转单哦`
					})
					this.updateTechnicianItem({
						key: 'haveOperItem',
						val: true
					})
					setTimeout(() => {
						this.$util.back()
						if (this.$util.getPage(-1).detail) {
							this.$util.getPage(-2).initRefresh()
						}
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 2000)
				}
			},
			toSearch(val) {
				this.param.page = 1
				this.param.coach_name = val
				this.transferForm.coach_id = ''
				this.getList()
			},
			async getList() {
				let {
					list: oldList,
					param,
				} = this
				let {
					id,
					agent = 0
				} = this.options
				param.order_id = id
				let methodKey = agent ? 'agent' : 'admin'
				let newList = await this.$api[methodKey].orderChangeCoachList(param)

				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			initFixHeight(val) {
				this.popupHeight = val
			},
			toChangeItem(key, val) {
				switch (key) {
					case 'type':
						this.transferForm.coach_id = ''
						this.param[key] = val
						this.param.page = 1
						this.getList()
						this.$refs.show_transfer_item.close()
						break
					case 'coach_type':
						let data = Object.assign({}, this.transferForm, {
							coach_type: val,
							coach_id: '',
							coach_name: '',
							near_time: '',
							mobile: '',
							text: '',
							admin_id: ''
						})
						this.transferForm = data
						break
					case 'coach_id':
						let {
							id, near_time
						} = this.list.data[val]
						this.transferForm[key] = id
						this.transferForm.near_time = near_time
						break
					case 'chooseInd':
						this[key] = val
						break
				}
			},
			toChooseAgent() {
				let {
					admin_id = 0
				} = this.transferForm
				let ind = this.base_agent.findIndex(item => {
					return item.id == admin_id
				})
				this.chooseInd = ind
				this.$refs.choose_item.open()
			},
			toConfirmCheck() {
				let {
					id
				} = this.base_agent[this.chooseInd]
				this.transferForm.admin_id = id
				this.$refs.choose_item.close()
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
			async toConfirm() {
				let param = this.$util.deepCopy(this.transferForm)
				let {
					coach_type: ctype = 1,
					coach_id = 0
				} = param
				if (ctype === 1) {
					if (!coach_id) {
						this.$util.showToast({
							title: `请选择` + this.$t('action.attendantName')
						})
						return
					}
					delete param.coach_name
					delete param.mobile
					delete param.text
					delete param.admin_id
				} else {
					param.coach_id = 0
					let msg = this.validate(param);
					if (msg) {
						this.$util.showToast({
							title: msg
						});
						return;
					}
					delete param.near_time
				}
				delete param.coach_type
				param.text = param.text ? param.text.substring(0, 400) : ''
				if (this.lockTap) return
				this.lockTap = true
				let {
					agent
				} = this.options
				let methodKey = agent ? 'agent' : 'admin'
				try {
					await this.$api[methodKey].orderChangeCoach(param)
					this.$util.showToast({
						title: '操作成功'
					})
					this.$util.hideAll()
					this.updateTechnicianItem({
						key: 'haveOperItem',
						val: true
					})
					this.lockTap = false
					this.$util.back()
					this.$util.goUrl({
						url: 1,
						openType: `navigateBack`
					})
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
					return
				}
			},
			// 订单详情
			goDetail(index) {
				let {
					id
				} = this.list.data[index]
				let {
					agent
				} = this.options
				let url = `/agent/pages/order/detail?id=${id}&agent=${agent}`
				this.$util.goUrl({
					url
				})
			}
		},
		filters: {
			handleAdminName(val, data) {
				let text = '请选择代理商'
				if (val) {
					let arr = data.filter(item => {
						return item.id == val
					})
					text = arr[0].agent_name
				}
				return text
			}
		}
	}
</script>


<style lang="scss">
	.order-pages {
		.iconshaixuanxia-1 {
			font-size: 20rpx;
			transform: scale(0.6);
		}

		.popup-transfer-type {
			width: 100%;
			height: 234rpx;
		}

		.list-item {

			.icon-xuanze,
			.icon-radio-fill {
				font-size: 38rpx;
				color: #BEC3CE
			}

			.avatar {
				width: 124rpx;
				height: 124rpx;
			}

			.can-service-btn {
				height: 32rpx;
				padding: 0 6rpx 0 6rpx;

				.bg {
					opacity: 0.1;
					border-radius: 5rpx;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 1;
				}
			}
		}


		.item-input {
			height: 110rpx;
			background: #F9FAF9;
		}

		.item-textarea {
			width: 630rpx;
			height: 300rpx;
			background: #F9FAF9;
		}

		.icongengduo {
			color: #5A677E;
			font-size: 20rpx;
		}

	}
</style>