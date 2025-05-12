<template>
	<view>
		<web-view :src="url" v-if="isLoad"></web-view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				isLoad: false,
				options: {},
				url: ''
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			personVerifyUrl: state => state.user.personVerifyUrl,
			fddExtsign: state => state.user.fddExtsign,
		}),
		async onLoad(options) {
			let {
				url
			} = options
			this.options = options
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			this.url = ['personVerifyUrl', 'fddExtsign'].includes(url) ? this[url] : decodeURIComponent(url)
			this.isLoad = true
		}
	}
</script>

<style lang="scss">
</style>