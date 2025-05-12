<template>
	<view class="pages-technician-label">

		<view class="flex-y-center pd-lg">
			<view class="f-title c-title text-bold">推荐标签</view>
			<view class="f-caption c-caption ml-md">点击添加标签</view>
		</view>

		<view class="list-item ml-lg mr-lg f-caption">
			<view v-if="base_label.length==0">暂无标签</view>
			<block v-for="(item,index) in base_label" :key="index">
				<view @tap="toAddDel(1,index)" class="list-child radius"
					:style="{color:item.is_select === 1 ? '#CBCBCB' : '#666'}"
					v-if="is_show ? index < base_label.length : index < 9">
					<view class="tag-item flex-center">
						<i class="iconfont icon-add"></i>
						<view>{{item.title}}</view>
					</view>
				</view>
			</block>
			<view @tap.stop="toShowLabel" class="flex-center f-paragraph c-title" v-if="base_label.length > 9">
				{{is_show?'收起更多':'展开更多'}} <i class="iconfont" :class="[{'iconshang':is_show},{'iconxia':!is_show}]"></i>
			</view>
		</view>

		<view class="flex-y-center pd-lg mt-lg">
			<view class="f-title c-title text-bold">已选标签</view>
		</view>
		<view class="list-item ml-lg mr-lg f-caption">
			<view v-if="check_label.length==0">暂无选中标签</view>
			<view @tap="toAddDel(2,index)" class="list-child cur radius rel" style="border: none;"
				v-for="(item,index) in check_label" :key="index">
				<view class="bg-item radius abs" :style="{background:primaryColor,borderColor:primaryColor}"></view>
				<i class="iconfont icon-guanbi-fill abs"></i>
				<view class="tag-item flex-center" :style="{color:primaryColor}">{{item.title}}</view>
			</view>
		</view>

		<view class="flex-y-center pd-lg mt-lg">
			<view class="f-title c-title text-bold">输入评价</view>
		</view>
		<view class="eva-textarea ml-lg mr-lg pd-lg radius-16">
			<textarea v-model="text" maxlength="400" class="textarea f-paragraph paragraph" placeholder-class="ph-class"
				placeholder="请输入评价"></textarea>
			<view class="flex-between mt-sm">
				<view></view>
				<view class="f-paragraph" style="color:#5A677E">{{text.length>400?400:text.length}}/400</view>
			</view>
		</view>

		<view class="space-max-footer"></view>

		<fix-bottom-button @confirm="submitForm" :text="[{text:'确定',type:'confirm'}]" bgColor="#fff">
		</fix-bottom-button>


	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
	} from 'vuex';
	export default {
		data() {
			return {
				options: {},
				base_label: [],
				check_label: [],
				is_show: false,
				text: ''
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor
		}),
		async onLoad(options) {
			this.options = options
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			this.initIndex()
		},
		methods: {
			...mapActions([]),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				let data = await this.$api.technician.labelList()
				data.map(item => {
					item.selected = 0
				})
				this.base_label = data
			},
			toShowLabel() {
				this.is_show = !this.is_show
			},
			toAddDel(type, index) {
				let base_label = this.$util.deepCopy(this.base_label)
				if (type == 1) {
					let {
						is_select
					} = base_label[index]
					if (is_select == 1) return
					base_label[index].is_select = 1
					this.base_label = base_label
					let check_label = base_label.filter(item => {
						return item.is_select == 1
					})
					this.check_label = check_label
					return
				}
				let check_label = this.$util.deepCopy(this.check_label)
				let {
					id
				} = check_label[index]
				let ind = base_label.findIndex(item => {
					return item.id == id
				})
				base_label[ind].is_select = 0
				this.base_label = base_label
				check_label.splice(index, 1)
				this.check_label = check_label
			},
			async submitForm() {
				let label = this.check_label.map(item => {
					return item.id
				})
				if (label.length == 0) {
					this.$util.showToast({
						title: '请选中标签'
					})
					return
				}
				let {
					id,
					uid,
				} = this.options
				let {
					text
				} = this
				let param = {
					order_id: id,
					user_id: uid,
					label,
					text
				}
				this.$util.showLoading();
				await this.$api.technician.userLabelAdd(param);
				this.$util.hideAll();
				this.$util.showToast({
					title: '评价成功'
				})
				if (this.$util.getPage(-1).detail) {
					this.$util.getPage(-2).initRefresh()
				}
				this.$util.back()
				setTimeout(() => {
					this.$util.goUrl({
						url: 1,
						openType: `navigateBack`
					})
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.pages-technician-label {
		.list-item {

			.iconshang,
			.iconxia {
				font-size: 22rpx;
			}

			.list-child {
				width: auto;
				min-width: 120rpx;
				height: 70rpx;
				display: inline-block;
				padding: 0 20rpx;
				margin: 0 18rpx 23rpx 0;
				border: 1rpx solid #E5E5E5;

				.tag-item {
					height: 70rpx;

					.icon-add {
						font-size: 24rpx;
						margin-right: 5rpx;
					}
				}

				.bg-item {
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0.15;
				}

				.icon-guanbi-fill {
					top: -10rpx;
					right: 2rpx;
					color: #B5BCC8;
					font-size: 28rpx;
				}

			}

			.cur {
				margin: 0 20rpx 28rpx 0;
			}
		}

		.eva-textarea {
			background: #F7F8FA;

			.textarea {
				width: 100%;
				height: 360rpx
			}

			.ph-class {
				font-size: 28rpx;
				color: #A6AEBB;
			}
		}
	}
</style>