<template>
	<view class="pages-mine">
		<block v-if="isLoad">
			<!-- #ifndef H5 -->
			<uni-nav-bar :fixed="true" :shadow="false" :statusBar="true" :title="navTitle" color="#ffffff"
				:backgroundColor="primaryColor">
			</uni-nav-bar>
			<view :style="{height:`${configInfo.navBarHeight}px`}"></view>
			<!-- #endif -->
			<image mode="aspectFill" lazy-load class="mine-bg abs" :src="configInfo[image_type[userPageType]]"></image>
			<!-- 用户 -->
			<!-- coach_status 1申请中，2已通过，3已取消授权，4已拒绝 -->
			<block v-if="userPageType == 1">
				<view class="pd-lg" style="height: 292rpx">
					<view class="pt-lg rel"
						:class="[{ 'flex-warp':userInfo && userInfo.nickName }, { 'flex-center': !userInfo || (userInfo && !userInfo.nickName) } ]">
						<auth :needAuth="true" :must="true" :haveGo="false" @userPrivacy="$refs.user_privacy.open()"
							class="avatar_view" style="width:124rpx">
							<view class="avatar_view">
								<image mode="aspectFill" class="avatar radius"
									:src="userInfo.avatarUrl||`https://lbqny.migugu.com/admin/farm/default-user.png`">
								</image>
								<view class="text" :style="{color:primaryColor}"
									v-if="userInfo.id && mineInfo.is_admin == 1">
									代理商
								</view>
							</view>
						</auth>
						<auth :needAuth="true" :must="true" :haveGo="false" @userPrivacy="$refs.user_privacy.open()"
							class="flex-1" v-if="!userInfo || (userInfo && !userInfo.nickName)">
							<view class="f-md-title text-bold ml-md"
								:style="{color:configInfo[font_type[userPageType]]}">登录
							</view>
						</auth>
						<view class="flex-1 ml-md mt-sm rel" :style="{color:configInfo[font_type[userPageType]]}"
							v-else>
							<view class="flex-between">
								<auth :needAuth="true" :must="true" :haveGo="false"
									@userPrivacy="$refs.user_privacy.open()">
									<view class="flex-y-center f-title text-bold">
										<view class="mr-sm max-300 ellipsis">
											{{ userInfo.nickName || '默认用户' }}
										</view>
										<!-- #ifdef MP-WEIXIN -->
										<i class="flex-1 iconfont iconbianjiziliao"></i>
										<!-- #endif -->
									</view>
								</auth>
								<view @tap.stop="$util.goUrl({url:`/user/pages/setting`})" class="notice-item ml-md">
									<i class="iconfont icon-xitong text-bold"></i>
								</view>
							</view>
							<view class="flex-warp">
								<view @tap.stop="$util.goUrl({url:`/member/pages/index`})"
									class="member-tag md flex-center mt-sm mr-md f-caption radius"
									v-if="configInfo.plugAuth.member">
									<i class="iconfont iconhuiyuandengji mr-sm"></i>
									<view class="ellipsis">
										{{mineInfo.member_info && mineInfo.member_info.hasOwnProperty('title') ? mineInfo.member_info.title : '普通用户'}}
									</view>
								</view>
								<view class="member-tag flex-center mt-sm mr-md f-caption radius"
									v-if="mineInfo.coach_status === 2 || (!configInfo.plugAuth.member && mineInfo.coach_status != 2)">
									<i class="iconfont mr-sm"
										:class="[{'iconhuiyuanka':mineInfo.coach_status === 2},{'iconhuiyuandengji':mineInfo.coach_status === 2}]"></i>
									{{ mineInfo.coach_status === 2 && mineInfo.coach_level && mineInfo.coach_level.hasOwnProperty('title') ? mineInfo.coach_level.title || $t('action.attendantName') :'普通用户'}}
								</view>
								<view @tap.stop="$util.goUrl({url:`/agent/pages/index?agent=0`})"
									class="member-tag md flex-center mt-sm f-caption radius"
									v-if="mineInfo.mobilenode_auth && (mineInfo.coach_status !== 2 || (mineInfo.coach_status === 2&&!configInfo.plugAuth.member))">
									<i class="iconfont iconqiehuanyonghuduan mr-sm"></i>
									切换管理员
								</view>
								<view class="flex-1"></view>
							</view>
							<view class="flex-center" style="margin-top: 15rpx;"
								v-if="mineInfo.mobilenode_auth && mineInfo.coach_status === 2&&configInfo.plugAuth.member">
								<view @tap.stop="$util.goUrl({url:`/agent/pages/index?agent=0`})"
									class="member-tag flex-center f-caption radius ">
									<i class="iconfont iconqiehuanyonghuduan mr-sm"></i>
									切换管理员
								</view>
								<view class="flex-1"></view>
							</view>
						</view>
					</view>
				</view>


				<!-- 卡券/关注/收藏 -->
				<view
					class="share-collect-list flex-x-center pd-lg mt-sm ml-md mr-md fill-base box-shadow radius-20 rel">
					<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'"
						@go="$util.goUrl({ url: `/user/pages/coupon/list` })" class="share-child">
						<view class="flex-center flex-column">
							<view class="f-sm-title text-bold">{{ mineInfo.coupon_count || 0 }}</view>
							<view class="f-caption c-caption">卡券</view>
						</view>
					</auth>
					<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'"
						@go="$util.goUrl({ url: `/dynamic/pages/follow` })" class="share-child"
						v-if="configInfo.plugAuth.dynamic">
						<view class="flex-center flex-column">
							<view class="f-sm-title text-bold">
								{{ mineInfo.follow_count || 0 }}
							</view>
							<view class="f-caption c-caption">关注</view>
						</view>
					</auth>
					<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="$util.goUrl({ url: `/user/pages/collect` })"
						class="share-child">
						<view class="flex-center flex-column">
							<view class="f-sm-title text-bold">{{ mineInfo.collect_count || 0 }}</view>
							<view class="f-caption c-caption">收藏</view>
						</view>
					</auth>
				</view>


				<!-- 我的余额 -->
				<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
					:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="$util.goUrl({url:`/user/pages/stored/list`})"
					v-if="configInfo.recharge_status">
					<view class="flex-center pd-lg mt-md ml-md mr-md fill-base box-shadow radius-20 rel">
						<view class="flex-1 mr-lg c-title">
							<view class="f-paragraph">我的余额</view>
							<view class="f-big-title text-bold">{{ mineInfo.balance || 0 }}</view>
						</view>
						<view class="store-btn flex-center f-paragraph c-base radius"
							:style="{background:primaryColor}">
							立即充值
						</view>
					</view>
				</auth>

				<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
					:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toAtv" style="width: 100%"
					v-if="mineInfo.is_atv_status === 1">
					<view style="height: 14rpx;"></view>
					<image mode="aspectFill" class="share-atv-img"
						src="https://lbqny.migugu.com/admin/anmo/mine/share_atv.png"></image>
				</auth>

				<view class="mine-menu-list box-shadow fill-base radius-16"
					:style="{margin:mineInfo.is_atv_status === 1 ? '10rpx 25rpx 0 25rpx' : ''}">

					<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="$util.goUrl({url:`/pages/order`})">
						<view class="menu-title flex-between pl-lg pr-md b-1px-b">
							<view class="f-paragraph c-title text-bold">我的订单</view>
							<view class="flex-y-center f-caption c-paragraph">全部订单<i class="iconfont icon-right"></i>
							</view>
						</view>
					</auth>
					<view class="flex-warp pt-lg pb-lg">
						<block v-for="(item, index) in orderList" :key="index">
							<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
								:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toJump('orderList', index)"
								class="menu-child" style="width:20%">
								<view class="flex-center flex-column f-caption c-paragraph">
									<i class="iconfont" :class="item.icon" :style="{color:primaryColor}"></i>
									<view class="mt-sm">{{ item.text }}</view>
								</view>
							</auth>
						</block>
					</view>
				</view>

				<view class="mine-tool-list fill-base radius-16" v-if="toolLoad">
					<block v-for="(item, index) in toolList" :key="index">
						<block v-if="item.text == '联系客服'">
							<!-- #ifdef MP-WEIXIN -->
							<button open-type="contact" class="clear-btn" v-if="configInfo.im_type === 2">
								<view class="tool-child pt-lg pb-lg ml-lg mr-lg  flex-center"
									:class="[{ 'b-1px-t': index != 0 }]">
									<i class="left-icon flex-center iconfont" :class="item.icon"
										:style="{color:primaryColor}"></i>
									<view class="flex-1 flex-between ml-md">
										<view class="f-paragraph c-title">{{ item.text }}</view>
										<i class="iconfont"
											:class="[{'iconbodadianhua text-bold':item.text == '联系客服' && configInfo.im_type == 1},{'icon-right':item.text != '联系客服' || (item.text == '联系客服' && configInfo.im_type != 1)}]"
											:style="{fontSize:item.text == '联系客服' && configInfo.im_type == 1?'50rpx':'',color:item.text == '联系客服' && configInfo.im_type == 1?primaryColor:''}"></i>
									</view>
								</view>
							</button>
							<button @tap="toContact" class="clear-btn" v-else>
								<view class="tool-child pt-lg pb-lg ml-lg mr-lg  flex-center"
									:class="[{ 'b-1px-t': index != 0 }]">
									<i class="left-icon flex-center iconfont" :class="item.icon"
										:style="{color:primaryColor}"></i>
									<view class="flex-1 flex-between ml-md">
										<view class="f-paragraph c-title">{{ item.text }}</view>
										<i class="iconfont"
											:class="[{'iconbodadianhua text-bold':item.text == '联系客服' && configInfo.im_type == 1},{'icon-right':item.text != '联系客服' || (item.text == '联系客服' && configInfo.im_type != 1)}]"
											:style="{fontSize:item.text == '联系客服' && configInfo.im_type == 1?'50rpx':'',color:item.text == '联系客服' && configInfo.im_type == 1?primaryColor:''}"></i>
									</view>
								</view>
							</button>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<button @tap="toContact" class="clear-btn">
								<view class="tool-child pt-lg pb-lg ml-lg mr-lg  flex-center"
									:class="[{ 'b-1px-t': index != 0 }]">
									<i class="left-icon flex-center iconfont" :class="item.icon"
										:style="{color:primaryColor}"></i>
									<view class="flex-1 flex-between ml-md">
										<view class="f-paragraph c-title">{{ item.text }}</view>
										<i class="iconfont"
											:class="[{'iconbodadianhua text-bold':item.text == '联系客服' && configInfo.im_type == 1},{'icon-right':item.text != '联系客服' || (item.text == '联系客服' && configInfo.im_type != 1)}]"
											:style="{fontSize:item.text == '联系客服' && configInfo.im_type == 1?'50rpx':'',color:item.text == '联系客服' && configInfo.im_type == 1?primaryColor:''}"></i>
									</view>
								</view>
							</button>
							<!-- #endif -->
						</block>
						<block v-else>
							<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
								:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toJump('toolList', index)">
								<view class="tool-child pt-lg pb-lg ml-lg mr-lg flex-center"
									:class="[{ 'b-1px-t': index != 0 }]">
									<i class="left-icon flex-center iconfont" :class="item.icon"
										:style="{color:primaryColor}"></i>
									<view class="flex-1 flex-between ml-md">
										<view class="f-paragraph c-title max-400 ellipsis">{{ item.text }}</view>
										<i class="iconfont icon-right"></i>
									</view>
								</view>
							</auth>
						</block>
					</block>
					<view @tap.stop="toChange" class="tool-child pd-lg flex-center b-1px-t"
						v-if="[2,3].includes(mineInfo.coach_status) && configInfo.web_coach_port">
						<i class="left-icon flex-center iconfont iconqiehuanjishiduan"
							:style="{color:primaryColor}"></i>
						<view class="flex-1 flex-between ml-md">
							<view class="f-paragraph c-title">切换{{$t('action.attendantName')}}端</view>
							<i class="iconfont icon-switch c-caption"></i>
						</view>
					</view>
				</view>
			</block>
			<!-- 技-师 -->
			<block v-if="userPageType == 2">

				<view class="addr-time-help-list flex-x-center f-desc rel"
					:style="{color:configInfo[font_type[userPageType]]}">
					<view @tap.stop="toChooseLocation" class="flex-center flex-column">
						<i class="iconfont iconweizhigengxin1"></i>
						<view>位置更新</view>
					</view>
					<view @tap.stop="$util.goUrl({url:`/technician/pages/time-manage`})"
						class="flex-center flex-column">
						<i class="iconfont iconshijianguanli2"></i>
						<view>时间管理</view>
					</view>
					<view @tap.stop="initLocation(2)" class="flex-center flex-column">
						<i class="iconfont iconyijianbaojing"></i>
						<view>一键报警</view>
					</view>
				</view>


				<view class="coach-info fill-base pt-lg pl-lg pr-lg pb-sm radius-16 rel" v-if="coachInfo.id">
					<view class="flex-center pb-lg">
						<!-- #ifdef H5 -->
						<view class="avatar radius">
							<view class="h5-image avatar radius"
								:style="{ backgroundImage : `url('${coachInfo.work_img}')`}">
							</view>
						</view>
						<!-- #endif -->
						<!-- #ifndef H5 -->
						<image mode="aspectFill" class="avatar radius" :src="coachInfo.work_img">
						</image>
						<!-- #endif -->
						<view class="flex-1 ml-md">
							<view class="flex-between">
								<view class="coach-name text-bold max-300 ellipsis">{{coachInfo.coach_name}}</view>
								<view @tap.stop="toEditInfo" class="coach-text f-paragraph flex-y-center">个人信息<i
										class="iconfont icon-right"></i>
								</view>
							</view>
							<view class="flex-warp mt-sm">
								<view class="tag-item flex-center mr-sm"
									:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}"
									v-if="coachInfo.auth_status==2">
									已认证</view>
								<view class="tag-item flex-center mr-sm"
									:style="{color:coachInfo.is_work?primaryColor:'#5A677E',border:`1rpx solid ${coachInfo.is_work?primaryColor:`#5A677E`}`}"
									v-if="mineInfo.coach_status === 2">
									{{coachInfo.is_work ? textType[coachInfo.text_type] : '请假中'}}
								</view>
								<view class="tag-item flex-center"
									:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">
									{{mineInfo.coach_level.title || $t('action.attendantName')}}
								</view>
							</view>
							<view class="flex-between mt-sm" v-if="coachInfo.auth_status!=2">
								<view class="f-desc c-warning">
									{{coachInfo.auth_status==0?'补充剩余资料才可以上线接单哟':coachInfo.auth_status==1?'认证审核中':'认证已驳回'}}
								</view>
								<view>
									<view @tap.stop="toEditInfo" class="tag-item flex-center"
										:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}"
										v-if="coachInfo.auth_status!=1">
										去认证</view>
								</view>
							</view>
						</view>
					</view>
					<view class="map-addr-info pt-lg b-1px-t">
						<view class="flex-warp">
							<view class="map-addr flex-center rel">
								<view class="map-addr radius abs" :style="{background:primaryColor}"></view>
								<view class="flex-y-center f-desc" :style="{color:primaryColor}">
									<i class="iconfont icondangqianweizhi"></i>
									当前
								</view>
							</view>
							<view class="flex-1 text ml-md" style="padding-top: 2rpx;">
								{{coachInfo.address}}
							</view>
						</view>
						<view class="location-change flex-between pt-sm">
							<view @tap.stop="$refs.show_rule_item.open()" class="flex-y-center text f-paragraph">实时定位<i
									class="iconfont iconwentifankui3 ml-sm" style="font-size:28rpx;color:#5a677e"></i>
							</view>
							<i @tap.stop="toChangeLocation" class="iconfont"
								:class="[{'icon-switch':!userCoachStatus.coach_position},{'icon-switch-on':userCoachStatus.coach_position}]"
								:style="{color:userCoachStatus.coach_position?primaryColor:'#ddd'}"></i>
						</view>
					</view>
				</view>

				<view class="mine-count-list flex-between rel">
					<view class="cancel-auth iconfont icon-biaoqian c-caption flex-center abs"
						v-if="mineInfo.coach_status == 3">
						<view class="text-bold f-icontext abs">取消授权</view>
					</view>

					<view @tap.stop="$util.goUrl({ url: `/technician/pages/income/index`})"
						class="count-child mr-sm fill-base f-caption box-shadow radius-16">
						<view class="flex-y-baseline" :style="{color:primaryColor}">¥<view class="f-sm-title">
								{{coachInfo.service_price || 0}}
							</view>
						</view>
						<view class="flex-between mt-sm">
							<view class="text f-paragraph">服务收入</view>
							<view class="cash-btn flex-center f-desc c-base radius"
								:style="{ background: primaryColor}">去提现
							</view>
						</view>
					</view>
					<view @tap.stop="$util.goUrl({ url: `/user/pages/cash-out?type=carfee` })"
						class="count-child ml-sm pt-lg pb-lg pl-md pr-sm fill-base f-caption c-desc box-shadow radius-16 ">
						<view class="flex-y-baseline" :style="{color:primaryColor}">¥<view class="f-sm-title">
								{{coachInfo.car_price || 0}}
							</view>
						</view>
						<view class="flex-between mt-sm">
							<view class="text f-paragraph">车费</view>
							<view class="cash-btn flex-center f-desc c-base radius"
								:style="{ background: primaryColor }">
								去提现</view>
						</view>
					</view>
				</view>


				<view class="mine-menu-list box-shadow fill-base radius-16">
					<view class="menu-title flex-between pl-lg pr-sm">
						<view class="f-paragraph c-title text-bold">我的订单</view>
					</view>
					<view class="flex-warp pb-lg">
						<view @tap.stop="toJump('orderList2', index)"
							class="menu-child flex-center flex-column f-caption c-title"
							v-for="(item, index) in orderList2" :key="index">
							<view class="item-img rel flex-center radius">
								<view class="abs dot-unread-number flex-center"
									:style="{width: item.number>99 ? '44rpx': item.number > 9 ? '34rpx' :'',right: item.number>99 ? '-32rpx': item.number > 9 ? '-22rpx' :'-12rpx'}"
									v-if="item.number > 0">
									{{item.number < 100 ? item.number : '99+'}}
								</view>
								<view class="item-img radius abs" :style="{background:primaryColor}"></view>
								<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
							</view>
							<view class="mt-sm">{{ item.text }}</view>
						</view>
					</view>
				</view>


				<view class="mine-menu-list box-shadow fill-base radius-16">
					<view class="menu-title flex-between pl-lg pr-sm">
						<view class="f-paragraph c-title text-bold">业绩管理</view>
					</view>
					<view class="flex-warp pb-lg">
						<view @tap.stop="toJump('commissionList', index)"
							class="menu-child flex-center flex-column f-caption c-title"
							v-for="(item, index) in commissionList" :key="index">
							<view class="item-img rel flex-center radius">
								<view class="item-img radius abs" :style="{background:primaryColor}"></view>
								<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
							</view>
							<view class="mt-sm">{{ item.text }}</view>
						</view>
					</view>
				</view>


				<view class="mine-menu-list box-shadow fill-base radius-16">
					<view class="menu-title flex-between pl-lg pr-sm">
						<view class="f-paragraph c-title text-bold">其他功能</view>
					</view>
					<view class="flex-warp pb-sm">
						<view @tap.stop="toJump('toolList2', index)"
							class="menu-child flex-center flex-column f-caption c-title rel"
							style="margin:10rpx 0 20rpx 0" v-for="(item, index) in toolList2" :key="index">
							<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
							<view class="mt-sm">{{ item.text }}</view>
							<view class="fdd-sign flex-center c-base abs radius"
								v-if="item.text =='电签合同' && coachInfo.fdd_status == 1">
								待签约</view>
						</view>
					</view>
				</view>
			</block>
		</block>
		<view class="space-footer"></view>
		<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
		<tabbar :cur="5"></tabbar>



		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34" style="width:700rpx">
				<view class="title">实时定位</view>
				<view class="f-desc c-title mt-lg">
					授权允许定位且开启实时定位后停留在系统任一页面，当您的位置发生移动时，系统检测到直线距离每超过100米时，就会自动更新定位。因频繁解析位置信息会导致过度使用第三方地图接口，若您一直停留在本页面，则需要手动刷新页面才能显示最新的实时地址。
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_rule_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
				</view>
			</view>
		</uni-popup>


		<!-- #ifdef APP-PLUS -->
		<login-info></login-info>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<user-privacy ref="user_privacy" :show="false"></user-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				isLoad: false,
				toolLoad: false,
				options: {},
				navTitle: '',
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约',
					4: '不可预约'
				},
				is_share: true,
				// 我的订单
				orderList: [{
					icon: 'icondaizhifu',
					text: '待支付',
					url: '/pages/order?tab=1'
				}, {
					icon: 'icondaifuwu',
					text: '待服务',
					url: '/pages/order?tab=2'
				}, {
					icon: 'iconanmo2',
					text: '服务中',
					url: '/pages/order?tab=3'
				}, {
					icon: 'icondaipingjia',
					text: '待评价',
					url: '/pages/order?tab=4'
				}, {
					icon: 'icontuikuan',
					text: '退款/售后',
					url: '/user/pages/refund/list'
				}],
				orderList2: [{
					icon: 'icondaijiedan',
					text: '待接单',
					url: '/technician/pages/order/list',
					number: 0
				}, {
					icon: 'iconyijiedan',
					text: '待服务',
					url: '/technician/pages/order/list?tab=1',
					number: 0
				}, {
					icon: 'iconfuwuzhong',
					text: '服务中',
					url: '/technician/pages/order/list?tab=2',
					number: 0
					// }, {
					// 	icon: 'icondaipingjia',
					// 	text: '订单评价',
					// 	url: '/technician/pages/order/evaluate'
				}],
				commissionList: [{
					icon: 'iconjifenmingxi',
					text: '储值返佣明细',
					url: '/technician/pages/income/cash-integral',
					number: 0
				}, {
					icon: 'iconfenchengmingxi',
					text: '分成明细',
					url: '/technician/pages/income/commission-list',
					number: 0
				}],
				// 其他
				toolList: [{
					icon: 'icondizhiguanli',
					text: '地址管理',
					url: '/user/pages/address/list'
				}, {
					icon: 'iconwentifankui',
					text: '问题反馈',
					url: '/user/pages/feedback/box'
				}, {
					icon: 'iconlianxikefu',
					text: '联系客服',
					url: ''
				}],
				toolList2: [{
						icon: 'icondengjiguanli',
						text: '等级管理',
						url: '/technician/pages/level'
					},
					{
						icon: 'iconchefeimingxi',
						text: '车费明细',
						url: '/technician/pages/car-fare'
					},
					{
						icon: 'iconchefeitixianjilu',
						text: '车费提现记录',
						url: '/user/pages/distribution/record?type=3'
					},
					{
						icon: 'iconwuliaoshangcheng',
						text: '物料商城',
						url: '/technician/pages/shop/list'
					},
					{
						icon: 'iconchapingshensu',
						text: '差评申诉',
						url: '/technician/pages/bad-comments/box'
					},
					{
						icon: 'iconpingbiyonghu',
						text: '拉黑用户',
						url: '/technician/pages/shield'
					},
					{
						icon: 'iconqiehuanjishiduan',
						text: '切换用户端',
						url: 'change'
					}
				],
				image_type: {
					1: 'user_image',
					2: 'coach_image'
				},
				font_type: {
					1: 'user_font_color',
					2: 'coach_font_color'
				}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			commonOptions: state => state.user.commonOptions,
			userInfo: state => state.user.userInfo,
			userPageType: state => state.user.userPageType,
			locationChange: state => state.user.locationChange,
			location: state => state.user.location,
			mineInfo: state => state.user.mineInfo,
			coachInfo: state => state.user.coachInfo,
			useChooseLocation: state => state.user.useChooseLocation,
			userCoachStatus: state => state.user.userCoachStatus,
			changeOnAddr: state => state.user.changeOnAddr,
			wecom_staff: state => state.user.wecom_staff,
		}),
		async onLoad(options) {
			this.options = options
			let {
				type = 1
			} = options
			let {
				web_coach_port = 0
			} = this.configInfo
			if (!type) {
				type = this.userPageType
			}
			this.updateUserItem({
				key: 'userPageType',
				val: !web_coach_port ? 1 : type
			})
			let {
				id: mine_id = -1
			} = this.mineInfo
			if (mine_id == -1) {
				this.$util.showLoading()
			}
			await this.initIndex()
			this.toSetNavTitle()
		},
		async onShow() {
			if (this.useChooseLocation) {
				this.updateUserItem({
					key: 'useChooseLocation',
					val: false
				})
			}
			let {
				id = 0,
					status = 0
			} = this.coachInfo
			let {
				web_coach_port = 0
			} = this.configInfo
			if (id && [2, 3].includes(status) && this.userPageType == 2 && web_coach_port) {
				setTimeout(() => {
					this.changeToTechnician()
				}, 1000)
			}
		},
		onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif
			this.initRefresh();
			uni.stopPullDownRefresh()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'getMineInfo', 'getCoachInfo', 'getUserCoachStatus',
				'getWecomStaff', 'updateCommonOptions',
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
				if (!this.configInfo.id || refresh || (this.configInfo.id && !this.configInfo.hasOwnProperty(
						'free_fare_bear'))) {
					await this.getConfigInfo()
				}

				await Promise.all([this.getMineInfo(), this.getUserCoachStatus(), this.getWecomStaff()])
				// let {
				// 	status = 0, coach_position = 0
				// } = this.userCoachStatus
				// if (coach_position && status == 2) {
				// 	this.initLocation(1)
				// }

				let {
					coach_status,
					channel_status,
					salesman_status,
					broker_status,
					is_admin = 0,
					is_fx = 0
				} = this.mineInfo

				let {
					userPageType
				} = this

				let {
					web_coach_port = 0
				} = this.configInfo

				this.updateUserItem({
					key: 'userPageType',
					val: [2, 3].includes(coach_status) && web_coach_port ? userPageType : 1
				})

				if (this.userPageType == 2) {
					await this.changeToTechnician()
				}

				let {
					channel_check_status,
					broker_apply_port = 0,
					tabBar,
					plugAuth,
				} = this.configInfo

				let applyText = '申请' + this.$t('action.attendantName')
				let applyChannelText = '申请' + this.$t('action.channelName')
				let isChannelText = '我是' + this.$t('action.channelName')

				let textArr = [{
					icon: 'iconshoucangjishi',
					arr: ['我是代理商', '招商加盟'],
					text: is_admin ? '我是代理商' : '招商加盟',
					url: is_admin ? `/agent/pages/index?agent=1` : `/agent/pages/apply`
				}, {
					icon: 'iconwoshiqudaoshang',
					arr: [isChannelText, applyChannelText],
					text: channel_status == 2 ? isChannelText : applyChannelText,
					url: channel_status == 2 ? '/user/pages/channel/income' : '/user/pages/channel/apply'
				}, {
					icon: 'icon-account-line',
					arr: ['我是业务员', '申请业务员'],
					text: salesman_status == 2 ? '我是业务员' : '申请业务员',
					url: salesman_status == 2 ? '/user/pages/salesman/income' : '/user/pages/salesman/apply'
				}, {
					icon: 'iconshenqingjishi',
					arr: [applyText],
					text: applyText,
					url: '/user/pages/apply'
				}, {
					icon: 'iconjingjieren',
					arr: ['我是经纪人', '申请经纪人'],
					text: broker_status == 2 ? '我是经纪人' : '申请经纪人',
					url: broker_status == 2 ? '/user/pages/coachbroker/income' :
						'/user/pages/coachbroker/apply'
				}, {
					icon: 'iconhehuoren1',
					arr: ['我是分销员', '申请分销员'],
					text: is_fx ? '我是分销员' : '申请分销员',
					url: is_fx ? '/user/pages/distribution/income' : '/user/pages/distribution/apply'
				}, {
					id: 7,
					key: 'map',
					arr: ['地图找人'],
					icon: 'iconbiaoqianye-dituzhaoren2',
					text: '地图找人',
					url: `/pages/map`
				}, {
					id: 6,
					key: 'store',
					arr: ['门店'],
					icon: 'iconmendian',
					text: '门店',
					url: `/pages/shopstore`
				}, {
					id: 3,
					key: 'dynamic',
					arr: ['动态'],
					icon: 'icon-dongtai1',
					text: '动态',
					url: `/pages/dynamic`
				}]

				let {
					coachbroker = false
				} = plugAuth

				let menuArr = ['动态', '门店', '地图找人']
				let pageArr = [applyText, applyChannelText, '申请经纪人']
				if (!coachbroker) {
					pageArr.push('我是经纪人')
				}

				textArr.map(item => {
					let {
						id = 0,
							text,
							arr = []
					} = item
					let ind = this.toolList.findIndex(aitem => {
						return arr.includes(aitem.text)
					})
					if (ind != -1) {
						this.toolList.splice(ind, 1)
					}
					if (item.arr) {
						delete item.arr
					}
					if (!menuArr.includes(text) &&
						((text == applyText && coach_status != 2) ||
							(text == applyChannelText && channel_check_status && channel_status != 2) ||
							(coachbroker && text == '申请经纪人' && broker_apply_port && broker_status != 2) ||
							!pageArr.includes(text)) ||
						(menuArr.includes(text) && plugAuth[item.key] && tabBar.findIndex(aitem => {
							return aitem.id == id
						}) === -1)) {
						this.toolList.unshift(item)
					}
				})

				this.isLoad = true
				this.toolLoad = true
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			toSetNavTitle() {
				let {
					tabBar
				} = this.configInfo
				let ind = tabBar.findIndex(item => {
					return item.id == 5
				})
				let {
					userPageType
				} = this
				let navTitle = userPageType == 2 ? `我是${this.$t('action.attendantName')}` : ind == -1 ? '我的' : tabBar[ind]
					.name
				this.navTitle = navTitle
				// #ifdef H5
				uni.setNavigationBarTitle({
					title: navTitle
				})
				// #endif
			},
			async changeToTechnician() {
				let {
					coach_status
				} = this.mineInfo

				await Promise.all([this.getCoachInfo(), this.getOrderNumCall()])

				let {
					fdd_auth_status
				} = this.coachInfo

				let {
					plugAuth,
					web_coach_port = 0
				} = this.configInfo

				let {
					dynamic = false,
						coachcredit = false
				} = plugAuth

				let textArr = [{
					icon: 'icon-dongtai1',
					text: '动态发布',
					url: '/dynamic/pages/technician/list',
					join: '差评申诉'
				}, {
					icon: 'icondianqianhetong',
					text: '电签合同',
					url: '',
					join: '等级管理'
				}, {
					icon: 'iconwodexinyufen',
					text: '我的信用分',
					url: '/technician/pages/credit',
					join: '车费明细'
				}]

				textArr.map(item => {
					let {
						text,
						join
					} = item
					let ind = this.toolList2.findIndex(aitem => {
						return text == aitem.text
					})
					if (ind != -1) {
						this.toolList2.splice(ind, 1)
					}
					if (item.join) {
						delete item.join
					}
					let joinInd = this.toolList2.findIndex(aitem => {
						return join == aitem.text
					})
					if ((text == '动态发布' && dynamic) || (text == '电签合同' && fdd_auth_status) || (text ==
							'我的信用分' && coachcredit)) {
						this.toolList2.splice(joinInd, 0, item)
					}
				})

				if (!web_coach_port) {
					let ind = this.toolList2.findIndex(item => {
						return item.text == '切换用户端'
					})
					if (ind !== -1) {
						this.toolList2.splice(ind, 1)
					}
				}
			},
			async getOrderNumCall() {
				let data = await this.$api.technician.getOrderNum()
				this.orderList2[0].number = data.wait //待接单
				this.orderList2[1].number = data.start //待服务
				this.orderList2[2].number = data.progress //服务中
			},
			// 选择地区
			async toChooseLocation() {
				let {
					coach_status
				} = this.mineInfo
				if (coach_status != 2) return
				let {
					coach_position = 0
				} = this.userCoachStatus
				let {
					coach_force_show = 0
				} = this.configInfo

				if (coach_position || coach_force_show) {
					let msg = coach_position ? '已开启' : '仅支持'
					this.$util.showToast({
						title: `${msg}实时定位，暂不支持手动定位`
					})
					this.initLocation(1)
					return
				}

				// #ifdef MP-WEIXIN
				let privacyCheck = this.$refs.user_privacy.check()
				if (privacyCheck) {
					this.$refs.user_privacy.open()
					return
				}
				// #endif

				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					let wxReady = await this.$jweixin.wxReady2();
					let {
						latitude,
						longitude
					} = wxReady ? await this.$jweixin.getWxLocation() : {
						latitude: 0,
						longitude: 0
					}
					this.initChooseLoca({
						latitude,
						longitude
					})
				}
				// #endif
				// #ifdef APP-PLUS 
				if (!this.location.lat) {
					await this.$util.checkAuth({
						type: 'userLocation',
						checkApp: true
					})
					return
				}
				let {
					lat: latitude,
					lng: longitude
				} = await this.$util.getLocation()
				this.initChooseLoca({
					latitude,
					longitude
				})
				// #endif 
				// #ifdef MP-WEIXIN
				await this.$util.checkAuth({
					type: 'userLocation'
				})
				this.initChooseLoca()
				// #endif
			},
			async initChooseLoca(param = {}) {
				let [err, loca_data] = await uni.chooseLocation(param)
				let {
					name = '',
						address = '',
						latitude: lat = '',
						longitude: lng = ''
				} = err ? {
					name: '',
					address: '',
					latitude: '',
					longitude: ''
				} : loca_data
				address = address ? `${address} ${name}` : name
				this.$util.hideAll()
				if (!lat) return
				this.toUpdateCoachAddr({
					lat,
					lng,
					address
				}, 1)
				this.$util.showToast({
					title: `更新成功`
				})
			},
			// 实时定位
			async toChangeLocation() {
				let {
					coach_status
				} = this.mineInfo
				if (coach_status != 2) return
				let {
					coach_position = 0
				} = this.userCoachStatus
				let {
					coach_force_show = 0
				} = this.configInfo
				if (coach_force_show && coach_position) {
					this.$util.showToast({
						title: `不可关闭实时定位功能哦`
					})
					return
				}
				if (this.lockTap) return
				this.lockTap = true
				try {
					let cur = coach_position == 0 ? 1 : 0
					await this.$api.technician.coachUpdate({
						coach_position: cur
					})
					let userCoachStatus = Object.assign({}, this.$util.deepCopy(this.userCoachStatus), {
						coach_position: cur,
						auto_coach_position: cur
					})
					this.updateUserItem({
						key: 'userCoachStatus',
						val: userCoachStatus
					})
					setTimeout(() => {
						this.lockTap = false
						this.$util.showToast({
							title: `操作成功`
						})
						if (!cur) return
						this.initLocation(1)
					}, 1000)
				} catch (e) {
					this.lockTap = false
				}
			},
			async initLocation(type) {
				let methodModel = type == 1 ? 'toUpdateCoachAddr' : 'toPolice'
				let {
					lat,
					lng,
				} = await this.$util.getUtilLocation(false)
				if (lat && lng) {
					let {
						address = ''
					} = type == 1 ? {
						address: ''
					} : await this.$util.getMapAddr({
						lat,
						lng
					})
					this[methodModel]({
						lat,
						lng,
						address
					})
					if (type == 1) {
						this.getCoachInfo()
					}
				}
			},
			// 更新技-师地址
			async toUpdateCoachAddr(param, changeParam = 0) {
				await this.$api.technician.coachUpdate(param)
				if (!changeParam) return
				let userCoachStatus = Object.assign({}, this.$util.deepCopy(this.userCoachStatus), param)
				let coachInfo = Object.assign({}, this.$util.deepCopy(this.coachInfo), param)
				this.updateUserItem({
					key: 'userCoachStatus',
					val: userCoachStatus
				})
				this.updateUserItem({
					key: 'coachInfo',
					val: coachInfo
				})
			},
			// 求助
			async toPolice(param) {
				await this.$api.technician.police(param)
				this.$util.hideAll()
				this.$util.showToast({
					title: `求救成功`
				})
			},
			async toContact() {
				let {
					mobile: url,
					im_type,
					wecom_appid
				} = this.configInfo

				let {
					wecom_staff
				} = this

				if (im_type == 3) {
					// #ifdef H5
					window.location.href = wecom_staff
					// #endif
					// #ifndef H5 
					// #ifdef MP-WEIXIN 
					try {
						wx.openCustomerServiceChat({
							extInfo: {
								url: wecom_staff
							},
							corpId: wecom_appid,
							fail(res) {
								uni.showToast({
									title: res.errorMsg,
									icon: 'none'
								})
							}
						})
					} catch (e) {
						this.$util.showToast({
							title: `请更新微信版本`
						})
					}
					// #endif
					// #ifdef APP-PLUS
					let wechat = null
					plus.share.getServices(res => {
						console.log(res, "==============res")
						wechat = res.find(i => i.id === 'weixin')
						if (wechat) {
							wechat.openCustomerServiceChat({
								corpid: wecom_appid,
								url: wecom_staff
							}, err => {
								uni.showToast({
									title: err.errorMsg
								})
							})
						} else {
							uni.showToast({
								title: '当前环境不支持微信操作',
								icon: 'none'
							})
						}
					}, function() {
						uni.showToast({
							title: '获取服务失败，不支持该操作',
							icon: 'none'
						})
					})
					// #endif
					// #endif
					return
				}
				this.$util.goUrl({
					url,
					openType: 'call'
				})
			},
			toJump(key, index) {
				let {
					id = 0,
						url,
						text
				} = this[key][index]
				let applyText = '申请' + this.$t('action.attendantName')
				let applyChannelText = '申请' + this.$t('action.channelName')
				let applyArr = [applyText, '申请分销员', applyChannelText, '申请业务员', '申请经纪人']
				if (applyArr.includes(text)) {
					let applyInd = applyArr.findIndex(item => {
						return text == item
					})
					this.toApply(applyInd * 1 + 1)
					return
				}
				if (text == '切换用户端') {
					this.toChange()
					return
				}
				if (text == '联系客服') {
					return
				}
				if (text == '电签合同') {
					this.toFddSign()
					return
				}
				let openType = ((key == 'orderList' && index !== 4) || id) ? `reLaunch` : 'navigateTo'
				if (key == 'orderList') {
					this.$util.goUrl({
						url,
						openType
					})
					return
				}
				this.$util.toCheckLogin({
					url
				})
			},
			toEditInfo() {
				let {
					status,
					fdd_auth_status,
					fdd_status
				} = this.coachInfo
				if (status == 2 && fdd_auth_status && fdd_status === 1) {
					this.$util.showToast({
						title: `请先签订合同哦`
					})
					return
				}
				this.$util.goUrl({
					url: `/technician/pages/edit`
				})
			},
			async toFddSign() {
				await this.getCoachInfo()
				this.updateUserItem({
					key: 'fddExtsign',
					val: ''
				})
				let {
					status: coach_status,
					admin_id = 0,
					fdd_agreement = {},
					fdd_status
				} = this.coachInfo
				this.$util.showLoading()

				let {
					viewpdf_url = ''
				} = fdd_agreement && fdd_agreement.hasOwnProperty('viewpdf_url') ? fdd_agreement : {
					viewpdf_url: ''
				}
				if (!viewpdf_url || fdd_status == 1) {
					if (coach_status == 3) {
						this.$util.showToast({
							title: `平台管理员已取消授权，不能签约哦`
						})
						return
					}
					let fddRecord = await this.$api.technician.getFddRecord()
					if (!fddRecord) {
						this.updateUserItem({
							key: 'personVerifyUrl',
							val: ''
						})
						let {
							status
						} = await this.$api.technician.getAttestationInfo()
						if (status < 2) {
							let personVerifyUrl = await this.$api.technician.getPersonVerifyUrl()
							this.$util.hideAll()
							this.updateUserItem({
								key: 'personVerifyUrl',
								val: personVerifyUrl
							})
							// #ifdef H5
							window.location.href = personVerifyUrl
							// #endif
							// #ifndef H5
							this.$util.goUrl({
								url: `/user/pages/common/web?url=personVerifyUrl`
							})
							// #endif
							return
						} else {
							let Extsign = await this.$api.technician.Extsign({
								admin_id
							})
							viewpdf_url = Extsign
						}
					}
				}

				this.$util.hideAll()
				this.updateUserItem({
					key: 'fddExtsign',
					val: viewpdf_url
				})
				// #ifdef H5
				window.location.href = viewpdf_url
				// #endif
				// #ifndef H5
				this.$util.goUrl({
					url: `/user/pages/common/web?url=fddExtsign`
				})
				// #endif 
			},
			async toAtv() {
				if (!this.mineInfo.is_atv) {
					this.$util.showToast({
						title: `暂无活动`
					})
					return
				}
				this.$util.goUrl({
					url: `/user/pages/coupon/share`
				})
			},
			// 申请技-师/分销员/渠道-商/业务员
			async toApply(type) {
				let {
					coach_status = -1,
						fx_status = -1,
						channel_status = -1,
						salesman_status = -1,
						broker_status = -1
				} = this.mineInfo

				let statusArr = {
					1: coach_status,
					2: fx_status,
					3: channel_status,
					4: salesman_status,
					5: broker_status
				}
				let status = statusArr[type]
				let page = {
					1: `/technician/pages/apply`,
					2: `/user/pages/distribution/apply`,
					3: `/user/pages/channel/apply`,
					4: `/user/pages/salesman/apply`,
					5: `/user/pages/coachbroker/apply`
				}
				// -1未申请，1审核中，2审核通过，3取消授权，4审核失败
				let url = status == -1 ? page[type] : `/user/pages/apply-result?type=${type}`
				// this.$util.log(url)
				this.$util.toCheckLogin({
					url
				})
			},
			// 切换用户/技-师端
			async toChange() {
				uni.pageScrollTo({
					duration: 500,
					scrollTop: 0
				})
				let {
					userPageType = 1
				} = this
				if (userPageType == 1) {
					await this.changeToTechnician()
				}
				this.updateUserItem({
					key: 'userPageType',
					val: userPageType == 2 ? 1 : 2
				})
				this.toSetNavTitle()
			}
		}
	}
</script>

<style lang="scss">
	.pages-mine {
		.mine-bg {
			width: 100%;
			height: 368rpx;
			/* #ifdef H5 */
			z-index: 0;
			/* #endif */
			/* #ifndef H5 */
			z-index: -1;
			/* #endif */
		}

		.mine-master-bg {
			width: 100%;
			height: 514rpx;
			z-index: -1;
		}

		.avatar_view {
			width: 124rpx;
			height: 124rpx;

			.avatar {
				width: 120rpx;
				height: 120rpx;
				overflow: hidden;
				border-radius: 50%;
				border: 2rpx solid #fff;
			}

			.text {
				width: 110rpx;
				position: absolute;
				top: 130rpx;
				left: 7rpx;
				height: 36rpx;
				line-height: 36rpx;
				background: #FFFFFF;
				border-radius: 18rpx;
				font-size: 24rpx;
				text-align: center;
			}
		}


		.member-tag {
			min-width: 100rpx;
			height: 42rpx;
			padding: 0 15rpx;
			background: rgba(255, 255, 255, 0.5);

			.iconfont {
				font-size: 28rpx;
			}
		}

		.iconbianjiziliao {
			font-size: 36rpx;
		}

		.icon-xitong {
			font-size: 40rpx;
		}

		// 定位/时间/求救
		.addr-time-help-list {
			width: 100%;
			padding: 40rpx 0;

			.flex-center {
				width: 33.33%;

				.iconfont {
					font-size: 60rpx;
					margin-bottom: 10rpx;
				}
			}

		}

		// 技-师信息
		.coach-info {
			margin: 0 25rpx;

			.avatar {
				width: 140rpx;
				height: 140rpx;
			}

			.coach-name {
				font-size: 34rpx;
				color: #142C57
			}

			.coach-text {
				color: #5A677E
			}

			.icon-right {
				font-size: 22rpx
			}

			.tag-item {
				min-width: 92rpx;
				height: 36rpx;
				padding: 0 10rpx;
				font-size: 24rpx;
				border-radius: 6rpx;
				transform: rotateZ(360deg);
			}

			.map-addr-info {
				.map-addr {
					width: 102rpx;
					height: 46rpx;
					padding-right: 6rpx;

					.iconfont {
						margin-right: 2rpx;
						font-size: 26rpx;
					}
				}

				.map-addr.abs {
					top: 0;
					left: 0;
					opacity: 0.1;
				}

				.text {
					color: #5A677E;
				}

				.location-change {
					.iconfont {
						font-size: 70rpx;
					}
				}

			}
		}

		// 收入
		.mine-count-list {
			margin: 20rpx 25rpx 0 25rpx;

			.cancel-auth {
				width: 110rpx;
				height: 100rpx;
				font-size: 100rpx;
				top: -20rpx;
				right: 55rpx;

				.text-bold {
					height: 26rpx;
					transform: rotate(-32deg);
				}
			}

			.count-child {
				width: 50%;
				padding: 28rpx;

				.text {
					color: #5A677E;
				}

				.cash-btn {
					width: 108rpx;
					height: 46rpx;
					transform: rotateZ(360deg);
				}
			}

		}


		.dot-unread-number {
			top: 0;
			right: 0;
			width: 24rpx;
			height: 24rpx;
			line-height: 24rpx;
			text-align: center;
			color: #fff;
			font-size: 18rpx;
			border-radius: 24rpx;
			background-color: #F1381F;
		}

		// 卡券/关注/收藏
		.share-collect-list {
			.share-child {
				width: 50%;
				height: 105rpx;
			}
		}

		.store-btn {
			width: 182rpx;
			height: 62rpx
		}

		// 分享-卡券
		.share-atv-img {
			width: 716rpx;
			height: 190rpx;
			margin: 0 auto;
		}

		// 我的订单/其他
		.mine-menu-list {
			margin: 20rpx 25rpx 0 25rpx;

			.menu-title {
				height: 90rpx;

				.iconfont {
					font-size: 24rpx;
				}
			}

			.menu-child {
				width: 25%;
				margin: 10rpx 0;

				.iconfont {
					font-size: 52rpx;
				}

				.item-img {
					width: 88rpx;
					height: 88rpx;

					.iconfont {
						font-size: 44rpx;
					}

					.item-img {
						top: 0;
						left: 0;
						opacity: 0.1;
					}
				}

				.fdd-sign {
					width: 76rpx;
					height: 30rpx;
					background: #E82F21;
					font-size: 20rpx;
					transform: scale(0.9);
					top: -10rpx;
					right: 0;
					border-radius: 20rpx 20rpx 20rpx 0;
				}
			}
		}

		// 工具
		.mine-tool-list {
			margin: 20rpx 25rpx 0 25rpx;
			box-shadow: 0px 3px 6px 0px rgba(227, 227, 227, 0.47);

			.tool-child {
				.left-icon {
					width: 42rpx;
					font-size: 42rpx;
				}

				.icon-right {
					font-size: 28rpx;
				}

				.icon-switch {
					font-size: 70rpx;
					line-height: 48rpx;
					color: #ddd;
				}
			}

			.tool-child.b-1px-t:before {
				left: 60rpx;
			}
		}

	}
</style>