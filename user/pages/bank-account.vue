<template>
	<view class="user-bank-account" v-if="isLoad">
		<view class="pl-lg pr-lg pb-lg">
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>结算账户类型</view>
			<view class="flex-y-center">
				<view @tap.stop="form.bid?'':toSetItem('is_company',item.id)" class="flex-y-center"
					:class="[{'mr-lg':index==0}]"
					:style="{color:form.is_company == item.id ? primaryColor:form.bid?'#999':''}"
					v-for="(item,index) in typeList" :key="index"><i class="iconfont icon-xuanze mr-sm"
						:class="[{'icon-xuanze-fill':form.is_company == item.id}]"></i>{{item.title}}
				</view>
			</view>
		</view>
		<view class="fill-body pt-md pb-md pl-lg pr-lg f-title c-title text-bold" v-if="form.is_company===1">商户信息</view>
		<view class="pl-lg pr-lg" v-if="form.is_company===1">
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>商户名称<view
					class="item-tips">
					营业执照上的名称</view>
			</view>

			<input v-model="form.name" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入商户名称" />
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>统一社会信用代码
			</view>
			<input v-model="form.social_credit_code" type="text"
				class="item-input fill-body radius-16 f-paragraph c-title" placeholder="请输入统一社会信用代码" />
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>统一社会信用证有效期<view
					class="item-tips">永久执照请选择2099年12月31日
				</view>
			</view>
			<view class="item-input fill-body radius-16 f-paragraph c-title mt-md" style="width:100%">
				<picker @change="pickerChange($event,'social_credit_code_expires')" mode="date"
					:value="form.social_credit_code_expires">
					<view class="flex-between">
						<view :class="[{'c-caption':!form.social_credit_code_expires}]">
							{{form.social_credit_code_expires ||'请选择日期'}}
						</view>
						<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
					</view>
				</picker>
			</view>
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>所在区域
			</view>
			<view @tap.stop="$util.goUrl({url:`/user/pages/choose-adapay-city?key=area`})"
				class="item-input fill-body radius-16 f-paragraph c-title" style="width:100%">
				<view class="flex-between">
					<view :class="[{'c-caption':!form.area_text}]">{{form.area_text ||'请选择所在区域'}}</view>
					<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
				</view>
			</view>
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>经营范围
				<view class="item-tips">营业执照上的经营范围</view>
			</view>
			<input v-model="form.business_scope" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入经营范围" />
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>法人姓名
			</view>
			<input v-model="form.legal_person" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入法人姓名" />
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>法人手机号
			</view>
			<input v-model="form.legal_mp" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入法人手机号" />
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>法人身份证号
			</view>
			<input v-model="form.legal_cert_id" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入法人身份证号" />
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>法人身份证有效期至
			</view>
			<view class="item-input fill-body radius-16 f-paragraph c-title" style="width:100%">
				<picker @change="pickerChange($event,'legal_cert_id_expires')" mode="date"
					:value="form.legal_cert_id_expires">
					<view class="flex-between">
						<view :class="[{'c-caption':!form.legal_cert_id_expires}]">
							{{form.legal_cert_id_expires ||'请选择日期'}}
						</view>
						<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
					</view>
				</picker>
			</view>
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>企业地址
			</view>
			<input v-model="form.address" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入企业地址" />
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>附件</view>
			<view class="f-desc c-warning">内容须包含三证合一证件照、法人身份证正面照、法人身份证反面照、开户银行许可证照压缩zip包后上传。请按照上述内容上传，若不按照规定上传将会影响数据审核
			</view>

			<view @tap.stop="toChooseFile" class="item-input fill-body radius-16 f-paragraph c-title mt-md"
				style="width:100%">
				<view class="flex-between">
					<block v-if="form.attach_file">
						<view class="max-500">
							<text decode="emsp"
								style="word-break:break-all;">{{form.attach_file | handleFileText}}</text>
						</view>
						<view :style="{color:primaryColor}">重选</view>
					</block>
					<block v-else>
						<view class="c-caption">请上传附件</view>
						<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
					</block>
				</view>
			</view>
			<view class="space-footer"></view>
			<view class="space-footer"></view>
		</view>
		<view class="fill-body pt-md pb-md pl-lg pr-lg f-title c-title text-bold">结算信息</view>
		<view class="pl-lg pr-lg">
			<block v-if="form.is_company==1">
				<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>银行账户类型</view>
				<view class="flex-y-center">
					<view @tap.stop="form.bid?'':toSetItem('bank_acct_type',item.id)" class="flex-y-center"
						:class="[{'mr-lg':index==0}]"
						:style="{color:form.bank_acct_type == item.id ? primaryColor:form.bid?'#999':''}"
						v-for="(item,index) in accTypeList" :key="index"><i class="iconfont icon-xuanze mr-sm"
							:class="[{'icon-xuanze-fill':form.bank_acct_type == item.id}]"></i>{{item.title}}
					</view>
				</view>
			</block>
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>结算账户银行卡号
				<view class="item-tips">分成佣金到账银行卡卡号</view>
			</view>
			<input v-model="form.card_id" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入结算账户银行卡号" />
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-base"></i>开户银行名称
				<view class="item-tips">例如：中国农业银行总府支行</view>
			</view>
			<input v-model="form.bank_name" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入开户银行名称" />
			<block v-if="form.bank_acct_type === 1">
				<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>开户银行所在地
				</view>
				<view @tap.stop="$util.goUrl({url:`/user/pages/choose-adapay-city?key=bank_area`})"
					class="item-input fill-body radius-16 f-paragraph c-title" style="width:100%">
					<view class="flex-between">
						{{form.bank_area_text || '请选择开户银行所在地'}}
						<i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
					</view>
				</view>
				<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>银行编码
					<view
						@tap.stop="$util.goUrl({url:`https://docs.adapay.tech/api/appendix.html#bank-code`,openType:`web`})"
						class="item-tips">具体编码请点击查看</view>
				</view>
				<input v-model="form.bank_code" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
					placeholder="请输入银行编码" />
			</block>
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>银行卡户名
				<view class="item-tips">例如：银行卡绑定的用户姓名</view>
			</view>
			<input :disabled="form.bid ? true : false" v-model="form.card_name" type="text"
				class="item-input fill-body radius-16 f-paragraph"
				:class="[{'c-caption':form.bid},{'c-title':!form.bid}]" placeholder="请输入银行卡户名" />
			<block v-if="form.bank_acct_type === 2">
				<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>身份证号
					<view class="item-tips">例如：银行卡开户的身份证号</view>
				</view>
				<input :disabled="form.bid ? true : false" v-model="form.cert_id" type="text"
					class="item-input fill-body radius-16 f-paragraph"
					:class="[{'c-caption':form.bid},{'c-title':!form.bid}]" placeholder="请输入身份证号" />
			</block>
			<view class="item-text flex-y-center"><i class="iconfont icon-required c-warning"></i>手机号
				<view class="item-tips">例如：银行卡开户预留的手机号</view>
			</view>
			<input v-model="form.tel_no" type="text" class="item-input fill-body radius-16 f-paragraph c-title"
				placeholder="请输入手机号" />
		</view>

		<view class="space-max-footer"></view>

		<uni-popup ref="show_choose_city" type="bottom">
			<view class="choose-city-popup pd-lg fill-base">
				<view class="flex-center">
					<view @tap.stop="toReset" class="search-btn flex-center f-mini-title c-title radius">重置</view>
					<view @tap.stop="toConfirm" class="search-btn flex-center ml-lg f-mini-title c-base radius"
						:style="{background:primaryColor,borderColor:primaryColor}">确定</view>
				</view>
			</view>
		</uni-popup>

		<fix-bottom-button @confirm="submit" :text="[{text:'提交',type:'confirm'}]" bgColor="#fff">
		</fix-bottom-button>

		<!-- #ifdef APP-PLUS -->
		<l-file ref="lFile" @up-success="onSuccess"></l-file>
		<!-- #endif -->
	</view>

</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import siteInfo from '@/siteinfo.js';
	import provinceAndCityData from '@/utils/adapay.json'
	export default {
		data() {
			return {
				isLoad: false,
				options: {},
				areaOptions: provinceAndCityData,
				typeList: [{
					id: 1,
					title: '个体户/企业'
				}, {
					id: 2,
					title: '个人'
				}],
				accTypeList: [{
					id: 1,
					title: '对公'
				}, {
					id: 2,
					title: '对私'
				}],
				codeTypeList: [{
					id: 1,
					title: '永久有效'
				}, {
					id: 2,
					title: '有效时间'
				}],
				member_info: ['is_company', 'member_id', 'order_no', 'name', 'social_credit_code',
					'social_credit_code_expires',
					'business_scope', 'legal_person', 'legal_cert_id', 'legal_cert_id_expires', 'legal_mp', 'address',
					'attach_file'
				],
				bank_info: ['member_id', 'settle_account_id', 'bank_acct_type', 'card_id', 'card_name', 'cert_id',
					'tel_no', 'bank_code', 'bank_name'
				],
				form: {
					id: '',
					mid: '',
					bid: '',
					is_company: 1,
					member_id: '',
					order_no: '',
					settle_account_id: '',
					// 商家信息
					name: '',
					social_credit_code: '',
					social_credit_code_expires: '',
					business_scope: '',
					legal_person: '',
					legal_cert_id: '',
					legal_cert_id_expires: '',
					legal_mp: '',
					address: '',
					attach_file: '',
					area: [],
					area_text: '',
					// 结算信息
					card_id: '',
					card_name: '',
					cert_id: '',
					tel_no: '',
					bank_code: '',
					bank_name: '',
					bank_acct_type: 1,
					bank_area: [],
					bank_area_text: '',
					// prov_code: '',
					// area_code: ''
				},
				rule: [{
					name: "name",
					checkType: "isNotNull",
					errorMsg: "请输入商户名称",
					regType: 2
				}, {
					name: "social_credit_code",
					checkType: "isNotNull",
					errorMsg: "请输入统一社会信用代码",
					regType: 2
				}, {
					name: "social_credit_code_expires",
					checkType: "isNotNull",
					errorMsg: "请选择统一社会信用证有效期"
				}, {
					name: "area",
					checkType: "isNotNull",
					errorMsg: "请选择所在区域"
				}, {
					name: "business_scope",
					checkType: "isNotNull",
					errorMsg: "请输入经营范围",
					regType: 2
				}, {
					name: "legal_person",
					checkType: "isNotNull",
					errorMsg: "请输入法人名称",
					regType: 2
				}, {
					name: "legal_mp",
					checkType: "isMobile",
					errorMsg: "请输入法人手机号"
				}, {
					name: "legal_cert_id",
					checkType: "isIdCard",
					errorMsg: "请输入法人身份证号"
				}, {
					name: "legal_cert_id_expires",
					checkType: "isNotNull",
					errorMsg: "请选择法人身份证有效期"
				}, {
					name: "address",
					checkType: "isNotNull",
					errorMsg: "请输入企业地址",
					regType: 2
				}, {
					name: "attach_file",
					checkType: "isNotNull",
					errorMsg: "请上传附件"
				}, {
					name: "card_id",
					checkType: "isNotNull",
					errorMsg: "请输入结算账户银行卡号"
				}, {
					name: "bank_area",
					checkType: "isNotNull",
					errorMsg: "请选择开户银行所在地"
				}, {
					name: "bank_code",
					checkType: "isNotNull",
					errorMsg: "请输入银行编码"
				}, {
					name: "card_name",
					checkType: "isNotNull",
					errorMsg: "请输入银行卡户名"
				}, {
					name: "tel_no",
					checkType: "isMobile",
					errorMsg: "请输入手机号"
				}, {
					name: "cert_id",
					checkType: "isIdCard",
					errorMsg: "请输入身份证号",
				}],
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			autograph: state => state.user.autograph,
			location: state => state.user.location,
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
				let data = await this.$api.mine.memberInfo()
				if (data && data.hasOwnProperty('member_info') && data.hasOwnProperty('bank_info')) {
					let {
						is_company: company
					} = data.member_info
					let {
						bank_acct_type: batype
					} = data.bank_info
					let area = []
					let area_text = ''
					let barea = []
					let bank_area_text = ''
					let {
						areaOptions
					} = this
					if (company === 1) {
						let {
							prov_code: pcode,
							area_code: acode
						} = data.member_info
						area = [pcode, acode]
						let ind = areaOptions.findIndex(item => {
							return item.value === area[0]
						})
						let ind1 = areaOptions[ind].cities.findIndex(item => {
							return item.value === area[1]
						})
						area_text = `${areaOptions[ind].title} ${areaOptions[ind].cities[ind1].title}`
					}
					if (batype == 1) {
						let {
							prov_code: bpcode,
							area_code: bacode
						} = data.bank_info
						barea = [bpcode, bacode]
						let ind2 = areaOptions.findIndex(item => {
							return item.value === barea[0]
						})
						let ind3 = areaOptions[ind2].cities.findIndex(item => {
							return item.value === barea[1]
						})
						bank_area_text = `${areaOptions[ind2].title} ${areaOptions[ind2].cities[ind3].title}`

					}
					let params = Object.assign({}, data.member_info, data.bank_info)
					if (company === 1) {
						let {
							social_credit_code_expires: sdate,
							legal_cert_id_expires: ldate
						} = params
						params.social_credit_code_expires = sdate.substring(0, 4) + '-' + sdate.substring(4, 6) + '-' +
							sdate.substring(6, 8)
						params.legal_cert_id_expires = ldate.substring(0, 4) + '-' + ldate.substring(4, 6) + '-' +
							ldate.substring(6, 8)
					}
					params.area = area
					params.bank_area = barea
					params.area_text = area_text
					params.bank_area_text = bank_area_text
					params.mid = data.member_info.id
					params.bid = data.bank_info.id
					for (let i in this.form) {
						params[i] = params[i] == null ? '' : params[i]
						this.form[i] = params[i]
					}
				}
				this.$util.hideAll()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.initIndex(true)
			},
			toSetItem(key, val) {
				this.form[key] = val
				if (key == 'is_company') {
					this.form.bank_acct_type = val
				}
			},
			pickerChange(e, key) {
				let ind = e.target.value
				this.form[key] = ind
			},
			// 上传附件
			toChooseFile() {
				let that = this
				// #ifdef H5
				uni.chooseFile({
					count: 1,
					extension: ['.zip'],
					success: function(res) {
						that.toUploadFile(res.tempFiles[0])
					}
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.chooseMessageFile({
					count: 1,
					type: 'file',
					extension: ['zip'],
					async success(res) {
						that.toUploadFile(res.tempFiles[0])
					}
				});
				// #endif
				// #ifdef APP-PLUS
				this.onUpload()
				// #endif 
			},
			async toUploadFile(uploadRes) {
				this.$util.showLoading()
				let {
					path: url = '',
					name = ''
				} = uploadRes
				// console.log('uploadRes===', url, name)
				let check_url = url
				// #ifdef H5
				check_url = name
				// #endif
				if (!/\.(zip)$/.test(check_url)) {
					this.$util.showToast({
						title: `附件仅支持zip格式哦`
					})
					return
				}

				let {
					attachment_path: path
				} = await this.$api.base.uploadFile({
					filePath: url,
					formData: {
						type: 'cert'
					}
				})
				this.form.attach_file = path
				this.$util.hideAll()
			},
			// #ifdef APP-PLUS
			// app上传附件
			onUpload() {
				let {
					autograph
				} = this
				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				this.$refs.lFile.upload({
					url: `${siteroot}?i=666&m=longbing_massages_city&s=admin/app/wx/uploadFile&urls=admin/app/wx/uploadFile`,
					name: 'file',
					header: {
						'autograph': autograph
					}
				});
			},
			onSuccess(res) {
				let {
					attachment_path: path
				} = res.data.data
				this.form.attach_file = path
				this.$util.hideAll()
			},
			// #endif
			//表单验证
			validate(param) {
				let {
					is_company,
					bank_acct_type
				} = param
				let minfo = ["name", "social_credit_code", "social_credit_code_expires", "business_scope",
					"legal_person", "legal_cert_id", "legal_cert_id_expires", "legal_mp", "address", "attach_file",
					"area"
				]
				let binfo = bank_acct_type == 1 ? ["card_id", "card_name", "tel_no", "bank_area", "bank_code"] : [
					"card_id", "card_name", "cert_id", "tel_no"
				]
				let validate = new this.$util.Validate();
				this.rule.map(item => {
					let {
						name,
					} = item
					if ((is_company === 1 && (minfo.includes(name) || binfo
							.includes(name))) || (is_company === 2 && binfo
							.includes(name))) {
						validate.add(param[name], item)
					}
				})
				let message = validate.start();
				return message;
			},
			async submit() {
				let subForm = this.$util.deepCopy(this.form)
				let msg = this.validate(subForm);
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
					let {
						id,
						mid,
						bid,
						is_company: company,
						bank_acct_type: batype,
						area,
						bank_area: barea
					} = subForm
					if ((company === 1 && area.length < 2) || (batype === 1 && barea.length < 2)) {
						let msg = area.length < 2 ? `所在区域` : `开户银行所在地`
						this.$util.showToast({
							title: `${msg} 请选择具体的省市区`
						})
						return
					}
					if (company === 1 && !/\.(zip)$/.test(subForm.attach_file)) {
						this.$util.showToast({
							title: `附件仅支持zip格式!`
						})
						return
					}
					let modelMethod = subForm.bid ? 'memberUpdate' : 'memberAdd'
					let member_info = this.$util.pick(subForm, company === 1 ? this.member_info : ['is_company',
						'member_id'
					])
					let bank_info = this.$util.pick(subForm, this.bank_info)
					if (company === 1) {
						member_info.prov_code = area[0]
						member_info.area_code = area[1]
					}
					member_info.id = mid
					bank_info.prov_code = batype === 1 ? barea[0] : ''
					bank_info.area_code = batype === 1 ? barea[1] : ''
					bank_info.id = bid
					if (company === 1) {
						let {
							social_credit_code_expires: sdate,
							legal_cert_id_expires: ldate
						} = member_info
						let arr = sdate.split('-')
						member_info.social_credit_code_expires = `${arr[0]}${arr[1]}${arr[2]}`
						let arr1 = ldate.split('-')
						member_info.legal_cert_id_expires = `${arr1[0]}${arr1[1]}${arr1[2]}`
					}
					await this.$api.mine[modelMethod]({
						member_info,
						bank_info
					})
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功`
					});
					setTimeout(() => {
						this.$util.back()
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			}
		},
		filters: {
			handleFileText(url) {
				let text = '请上传附件'
				if (url) {
					text = url.substring(url.lastIndexOf('/') + 1)
				}
				return text
			}
		}
	}
</script>


<style lang="scss">
	page {
		background: #fff;
	}


	.user-bank-account {
		.item-text {
			font-size: 30rpx;
			margin: 35rpx 0 20rpx 0;

			.icon-required {
				font-size: 28rpx;
			}

			.item-tips {
				font-size: 24rpx;
				color: #FF2404;
				margin-left: 10rpx;
			}
		}

		.item-input {
			width: calc(100% - 60rpx);
			min-height: 80rpx;
			padding: 0 30rpx;

			.flex-between {
				min-height: 40rpx;
				padding: 20rpx 0;
			}
		}

		.icon-xuanze,
		.icon-xuanze-fill {
			font-size: 30rpx;
		}
	}
</style>