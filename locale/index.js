import zhCnLocale from './lang/zh-CN';
import enUsLocale from './lang/en-US';
import VueI18n from 'vue-i18n';
import Vue from 'vue';
Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: 'zh',
	messages: {
		'en': enUsLocale,
		'zh': zhCnLocale
	}
})
export default i18n