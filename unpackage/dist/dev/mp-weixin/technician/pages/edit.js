(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["technician/pages/edit"],{

/***/ 913:
/*!*****************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/main.js?{"page":"technician%2Fpages%2Fedit"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _edit = _interopRequireDefault(__webpack_require__(/*! ./technician/pages/edit.vue */ 914));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_edit.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 914:
/*!**********************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/edit.vue ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit.vue?vue&type=template&id=2ed21b3c& */ 915);
/* harmony import */ var _edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit.vue?vue&type=script&lang=js& */ 917);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit.vue?vue&type=style&index=0&lang=scss& */ 919);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 69);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "technician/pages/edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 915:
/*!*****************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/edit.vue?vue&type=template&id=2ed21b3c& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./edit.vue?vue&type=template&id=2ed21b3c& */ 916);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_template_id_2ed21b3c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 916:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/edit.vue?vue&type=template&id=2ed21b3c& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.isLoad
    ? _vm.configInfo.short_code_status &&
      _vm.form.mobile.length == 11 &&
      _vm.form.mobile !== _vm.old_phone
    : null
  var m0 = _vm.isLoad ? _vm.$t("action.attendantName") : null
  var g1 = _vm.isLoad ? _vm.form.text.length : null
  var g2 = _vm.isLoad && !(g1 > 300) ? _vm.form.text.length : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, index) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        index = _temp2.index
      var _temp, _temp2
      $event.stopPropagation()
      _vm.form.sex = index
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        m0: m0,
        g1: g1,
        g2: g2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 917:
/*!***********************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/edit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./edit.vue?vue&type=script&lang=js& */ 918);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 918:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/edit.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var wPicker = function wPicker() {
  __webpack_require__.e(/*! require.ensure | components/w-picker/w-picker */ "components/w-picker/w-picker").then((function () {
    return resolve(__webpack_require__(/*! @/components/w-picker/w-picker.vue */ 1327));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    wPicker: wPicker
  },
  data: function data() {
    var _form;
    return {
      isLoad: false,
      options: {},
      cityList: [],
      cityIndex: -1,
      storeList: [],
      storeIndex: 0,
      old_phone: '',
      authTime: 0,
      timer: null,
      coach_status: 0,
      form: (_form = {
        id: 0,
        admin_id: 0,
        coach_name: '',
        //姓名 
        mobile: '',
        //手机号 
        short_code: '',
        sex: 0,
        //性别 
        birthday: '',
        work_time: '',
        //从业年份 
        city_id: '',
        //城市 
        store_id: '',
        //门店
        free_fare_distance: '',
        lng: '',
        lat: '',
        address: '',
        //详细地址 
        text: '',
        //备注 
        id_code: '',
        //身份证号
        id_card: [],
        //身份证
        id_card_fan: [],
        // 身份证反面
        id_card_people: [],
        //手持身份证
        license: [],
        //资格证书
        work_img: [],
        // 工作照
        self_img: []
      }, (0, _defineProperty2.default)(_form, "city_id", ''), (0, _defineProperty2.default)(_form, "video", []), _form),
      rule: [{
        name: "coach_name",
        checkType: "isNotNull",
        errorMsg: "输入您的姓名",
        regType: 2
      }, {
        name: "birthday",
        checkType: "isNotNull",
        errorMsg: "请选择您的生日",
        regType: 2
      }, {
        name: "mobile",
        checkType: "isMobile",
        errorMsg: "输入手机号"
      }, {
        name: "work_time",
        checkType: "isNumber",
        errorMsg: "请输入从业年份，例如：5",
        regType: 2
      }, {
        name: "city_id",
        checkType: "isNotNull",
        errorMsg: "请选择意向工作城市"
      }, {
        name: "free_fare_distance",
        checkType: "isFloatNum",
        errorMsg: "请输入公里数",
        regType: 2,
        maxNum: '',
        unit: '公里'
      }, {
        name: "address",
        checkType: "isNotNull",
        errorMsg: "请选择所在地址"
      }, {
        name: "text",
        checkType: "isNotNull",
        errorMsg: "请输入" + this.$t('action.attendantName') + "简介",
        regType: 2
      }, {
        name: "id_code",
        checkType: "isIdCard",
        errorMsg: "输入您的身份证号码"
      }, {
        name: "id_card",
        checkType: "isNotNull",
        errorMsg: "请上传身份证人像面"
      }, {
        name: "id_card_fan",
        checkType: "isNotNull",
        errorMsg: "请上传身份证国徽面"
      }, {
        name: "id_card_people",
        checkType: "isNotNull",
        errorMsg: "请上传手持身份证照片"
      }, {
        name: "license",
        checkType: "isNotNull",
        errorMsg: "请上传资格证书"
      }, {
        name: "work_img",
        checkType: "isNotNull",
        errorMsg: "请上传工作形象照"
      }, {
        name: "self_img",
        checkType: "isNotNull",
        errorMsg: "请上传个人生活照"
      }],
      lockTap: false
    };
  },
  computed: (0, _vuex.mapState)({
    primaryColor: function primaryColor(state) {
      return state.config.configInfo.primaryColor;
    },
    subColor: function subColor(state) {
      return state.config.configInfo.subColor;
    },
    configInfo: function configInfo(state) {
      return state.config.configInfo;
    },
    userInfo: function userInfo(state) {
      return state.user.userInfo;
    },
    location: function location(state) {
      return state.user.location;
    },
    locaRefuse: function locaRefuse(state) {
      return state.user.locaRefuse;
    },
    useChooseLocation: function useChooseLocation(state) {
      return state.user.useChooseLocation;
    },
    userCoachStatus: function userCoachStatus(state) {
      return state.user.userCoachStatus;
    },
    changeOnAddr: function changeOnAddr(state) {
      return state.user.changeOnAddr;
    },
    noChangeLoca: function noChangeLoca(state) {
      return state.user.noChangeLoca;
    }
  }),
  onLoad: function onLoad(options) {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _options, _options$admin_id, admin_id, _options$is_edit, is_edit;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _options = options, _options$admin_id = _options.admin_id, admin_id = _options$admin_id === void 0 ? 0 : _options$admin_id, _options$is_edit = _options.is_edit, is_edit = _options$is_edit === void 0 ? 0 : _options$is_edit;
              options.is_edit = is_edit;
              if (!admin_id) {
                _context.next = 8;
                break;
              }
              _context.next = 5;
              return _this.updateCommonOptions(options);
            case 5:
              _context.t0 = _context.sent;
              _context.next = 9;
              break;
            case 8:
              _context.t0 = options;
            case 9:
              options = _context.t0;
              _this.options = options;
              _this.form.admin_id = admin_id;
              _this.$util.showLoading();
              _context.next = 15;
              return _this.initIndex();
            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onShow: function onShow() {
    var _this2 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this2.useChooseLocation) {
                _this2.updateUserItem({
                  key: 'useChooseLocation',
                  val: false
                });
              }
              if (!_this2.location.lat && _this2.locaRefuse) {
                _this2.toResetUtilLoca();
              }
            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  onUnload: function onUnload() {
    if (this.timer) clearInterval(this.timer);
  },
  watch: {
    locaRefuse: function locaRefuse(newval, oldval) {
      if (!newval) {
        this.toResetUtilLoca();
      }
    },
    changeOnAddr: function changeOnAddr(newval, oldval) {
      var noloca = this.noChangeLoca.noloca;
      if (newval && noloca) {
        this.initUtilLocaData();
      }
    },
    noChangeLoca: function noChangeLoca(newval, oldval) {
      var _this3 = this;
      setTimeout(function () {
        var _this3$changeOnAddr = _this3.changeOnAddr,
          lat = _this3$changeOnAddr.lat,
          lng = _this3$changeOnAddr.lng,
          _this3$changeOnAddr$u = _this3$changeOnAddr.unix,
          unix = _this3$changeOnAddr$u === void 0 ? 0 : _this3$changeOnAddr$u;
        var noloca = _this3.noChangeLoca.noloca;
        var cur_unix = _this3.$util.DateToUnix(_this3.$util.formatTime(new Date(), 'YY-M-D h:m:s'));
        if (noloca && (!lat && !lng || !unix || unix && cur_unix - unix >= 1)) {
          _this3.getUtilLocation();
        }
      }, 800);
    }
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0, _vuex.mapActions)(['getConfigInfo', 'getUserInfo', 'updateCommonOptions'])), (0, _vuex.mapMutations)(['updateUserItem'])), {}, {
    initIndex: function initIndex() {
      var _arguments = arguments,
        _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var refresh, privacyCheck;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                refresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (!(!_this4.configInfo.id || !_this4.configInfo.hasOwnProperty('free_fare_bear') || refresh)) {
                  _context3.next = 4;
                  break;
                }
                _context3.next = 4;
                return _this4.getConfigInfo();
              case 4:
                _this4.$util.setNavigationBarColor({
                  bg: _this4.primaryColor
                });
                privacyCheck = _this4.$refs.user_privacy.check();
                if (!(privacyCheck && !_this4.location.lat)) {
                  _context3.next = 10;
                  break;
                }
                _this4.$refs.user_privacy.open();
                _this4.$util.hideAll();
                return _context3.abrupt("return");
              case 10:
                _context3.next = 12;
                return _this4.getCityList();
              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    initRefresh: function initRefresh() {
      this.initIndex(true);
    },
    toResetUtilLoca: function toResetUtilLoca() {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    toOpenLocation: function toOpenLocation() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var privacyCheck;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                privacyCheck = _this5.$refs.user_privacy.check();
                if (!privacyCheck) {
                  _context5.next = 4;
                  break;
                }
                _this5.$refs.user_privacy.open();
                return _context5.abrupt("return");
              case 4:
                _context5.next = 6;
                return _this5.$util.checkAuth({
                  type: 'userLocation',
                  checkApp: true
                });
              case 6:
                _this5.initRefresh();
              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    getCityList: function getCityList() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var location, _this6$userCoachStatu, coach_status, coach_position, _this6$changeOnAddr, _this6$changeOnAddr$l, change_lat, _this6$changeOnAddr$l2, change_lng, _this6$changeOnAddr$u, unix, cur_unix, noloca, loca;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                location = _this6.location;
                _this6$userCoachStatu = _this6.userCoachStatus, coach_status = _this6$userCoachStatu.status, coach_position = _this6$userCoachStatu.coach_position;
                if (!(!location.lat || location.lat && location.address == '暂未获取到位置信息')) {
                  _context6.next = 16;
                  break;
                }
                if (!(coach_status == 2 && coach_position)) {
                  _context6.next = 14;
                  break;
                }
                _this6$changeOnAddr = _this6.changeOnAddr, _this6$changeOnAddr$l = _this6$changeOnAddr.lat, change_lat = _this6$changeOnAddr$l === void 0 ? 0 : _this6$changeOnAddr$l, _this6$changeOnAddr$l2 = _this6$changeOnAddr.lng, change_lng = _this6$changeOnAddr$l2 === void 0 ? 0 : _this6$changeOnAddr$l2, _this6$changeOnAddr$u = _this6$changeOnAddr.unix, unix = _this6$changeOnAddr$u === void 0 ? 0 : _this6$changeOnAddr$u;
                cur_unix = _this6.$util.DateToUnix(_this6.$util.formatTime(new Date(), 'YY-M-D h:m:s'));
                noloca = change_lat && change_lng && unix && cur_unix - unix < 3 ? false : true;
                if (!noloca) {
                  loca = Object.assign({}, _this6.location, {
                    lat: change_lat,
                    lng: change_lng,
                    is_util_loca: 1
                  });
                  _this6.updateUserItem({
                    key: 'location',
                    val: loca
                  });
                }
                _this6.updateUserItem({
                  key: 'noChangeLoca',
                  val: {
                    noloca: noloca
                  }
                });
                if (!_this6.noChangeLoca.noloca) {
                  _context6.next = 11;
                  break;
                }
                return _context6.abrupt("return");
              case 11:
                _this6.initUtilLocaData();
                _context6.next = 15;
                break;
              case 14:
                _this6.getUtilLocation();
              case 15:
                return _context6.abrupt("return");
              case 16:
                _this6.initUtilLocaData();
              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    getUtilLocation: function getUtilLocation() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var _yield$_this7$$util$g, _yield$_this7$$util$g2, lat, _yield$_this7$$util$g3, lng, val;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this7.$util.getLocation();
              case 2:
                _yield$_this7$$util$g = _context7.sent;
                _yield$_this7$$util$g2 = _yield$_this7$$util$g.lat;
                lat = _yield$_this7$$util$g2 === void 0 ? 0 : _yield$_this7$$util$g2;
                _yield$_this7$$util$g3 = _yield$_this7$$util$g.lng;
                lng = _yield$_this7$$util$g3 === void 0 ? 0 : _yield$_this7$$util$g3;
                val = Object.assign({}, _this7.location, {
                  lat: lat,
                  lng: lng,
                  is_util_loca: 1
                });
                _this7.updateUserItem({
                  key: 'location',
                  val: val
                });
                _this7.initUtilLocaData();
              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    initUtilLocaData: function initUtilLocaData() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var _this8$location, _this8$location$lng, lng, _this8$location$lat, lat, _yield$Promise$all, _yield$Promise$all2, data, city, imgArr, imgArrs, key, textArr;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this8.updateUserItem({
                  key: 'noChangeLoca',
                  val: {
                    noloca: false
                  }
                });
                _this8$location = _this8.location, _this8$location$lng = _this8$location.lng, lng = _this8$location$lng === void 0 ? 0 : _this8$location$lng, _this8$location$lat = _this8$location.lat, lat = _this8$location$lat === void 0 ? 0 : _this8$location$lat;
                _context8.next = 4;
                return Promise.all([_this8.$api.technician.coachInfo(), _this8.$api.base.getCity({
                  lng: lng,
                  lat: lat
                })]);
              case 4:
                _yield$Promise$all = _context8.sent;
                _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 2);
                data = _yield$Promise$all2[0];
                city = _yield$Promise$all2[1];
                _this8.$util.hideAll();
                _this8.cityList = city;
                _this8.form.admin_id = data.id ? data.admin_id : 0;
                _context8.next = 13;
                return _this8.getStoreList();
              case 13:
                if (!(!data || data && !data.id)) {
                  _context8.next = 17;
                  break;
                }
                if (city.length > 0) {
                  _this8.form.city_id = city[0].id;
                  _this8.cityIndex = 0;
                }
                _this8.isLoad = true;
                return _context8.abrupt("return");
              case 17:
                data.free_fare_distance = data.free_fare_distance == null ? '' : data.free_fare_distance;
                imgArr = ['id_card', 'license', 'self_img'];
                imgArr.map(function (item) {
                  data[item] = data[item] && data[item].length > 0 ? data[item].map(function (aitem) {
                    return {
                      path: aitem
                    };
                  }) : [];
                });
                if (data.id_card && data.id_card.length > 1) {
                  data.id_card_fan = [data.id_card[1]];
                  data.id_card_people = [data.id_card[2]];
                  data.id_card.splice(1, 3);
                }
                imgArrs = ['work_img', 'video'];
                imgArrs.map(function (item) {
                  data[item] = data[item] && data[item].length > 0 ? [{
                    path: data[item]
                  }] : [];
                });
                data.birthday = data.birthday ? _this8.$util.formatTime(data.birthday * 1000, 'YY-M-D') : '';
                for (key in _this8.form) {
                  _this8.form[key] = data[key];
                }
                textArr = ['mobile', 'status'];
                textArr.map(function (item) {
                  _this8[item == 'mobile' ? "old_phone" : 'coach_status'] = data[item];
                });
                _this8.cityIndex = _this8.cityList.findIndex(function (item) {
                  return item.id == data.city_id;
                });
                _this8.storeIndex = _this8.storeList.findIndex(function (item) {
                  return item.id == data.store_id;
                });
                _this8.isLoad = true;
                if (lat && lng) {
                  _this8.$util.getMapInfo();
                }
              case 31:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    getStoreList: function getStoreList() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var _this9$form$admin_id, admin_id, data;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this9$form$admin_id = _this9.form.admin_id, admin_id = _this9$form$admin_id === void 0 ? 0 : _this9$form$admin_id;
                if (admin_id) {
                  _context9.next = 3;
                  break;
                }
                return _context9.abrupt("return");
              case 3:
                _context9.next = 5;
                return _this9.$api.mine.getStoreSelect({
                  admin_id: admin_id
                });
              case 5:
                data = _context9.sent;
                data.unshift({
                  id: 0,
                  title: '不挂靠门店'
                });
                _this9.storeList = data;
              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    pickerChange: function pickerChange(e, key) {
      var ind = e.target.value;
      if (key === 'birthday') {
        var unix = this.$util.DateToUnix(ind);
        if (unix > new Date(Math.ceil(new Date().getTime())) / 1000) {
          this.$util.showToast({
            title: "\u4E0D\u80FD\u9009\u62E9\u672A\u6765\u65F6\u95F4\u54E6"
          });
          return;
        }
        this.form[key] = ind;
        return;
      }
      this["".concat(key, "Index")] = ind;
      this.form["".concat(key, "_id")] = this["".concat(key, "List")][ind].id;
    },
    // 发送验证码
    toSend: function toSend() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var authTime, _this10$form$mobile, mobile, time;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                authTime = _this10.authTime;
                if (!authTime) {
                  _context10.next = 3;
                  break;
                }
                return _context10.abrupt("return");
              case 3:
                _this10$form$mobile = _this10.form.mobile, mobile = _this10$form$mobile === void 0 ? '' : _this10$form$mobile;
                if (!(mobile == null || !/^(1[0-9]{10})$/.test(mobile))) {
                  _context10.next = 7;
                  break;
                }
                _this10.$util.showToast({
                  title: mobile == null ? "\u8BF7\u8F93\u5165\u624B\u673A\u53F7" : "".concat(mobile, " \u624B\u673A\u53F7\u65E0\u6548")
                });
                return _context10.abrupt("return");
              case 7:
                if (!_this10.lockTap) {
                  _context10.next = 9;
                  break;
                }
                return _context10.abrupt("return");
              case 9:
                _this10.lockTap = true;
                _this10.$util.showLoading();
                _context10.prev = 11;
                _context10.next = 14;
                return _this10.$api.user.sendShortMsg({
                  phone: mobile
                });
              case 14:
                _this10.$util.hideAll();
                _this10.lockTap = false;
                time = 60;
                _this10.timer = setInterval(function () {
                  if (time === 0) {
                    clearInterval(_this10.timer);
                    return;
                  }
                  time--;
                  _this10.authTime = time;
                }, 1000);
                _context10.next = 23;
                break;
              case 20:
                _context10.prev = 20;
                _context10.t0 = _context10["catch"](11);
                setTimeout(function () {
                  _this10.lockTap = false;
                  _this10.$util.hideAll();
                }, 2000);
              case 23:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[11, 20]]);
      }))();
    },
    imgUpload: function imgUpload(e) {
      var imagelist = e.imagelist,
        imgtype = e.imgtype;
      this.form[imgtype] = imagelist;
    },
    // 选择地区
    toChooseLocation: function toChooseLocation() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this11.updateUserItem({
                  key: 'useChooseLocation',
                  val: true
                });
                if (_this11.location.lat) {
                  _context11.next = 6;
                  break;
                }
                _this11.updateUserItem({
                  key: 'useChooseLocation',
                  val: false
                });
                _this11.toOpenLocation();
                _context11.next = 9;
                break;
              case 6:
                _context11.next = 8;
                return _this11.$util.checkAuth({
                  type: 'userLocation'
                });
              case 8:
                _this11.initChooseLoca();
              case 9:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    initChooseLoca: function initChooseLoca() {
      var _arguments2 = arguments,
        _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var param, _yield$uni$chooseLoca, _yield$uni$chooseLoca2, err, loca_data, _ref, _ref$name, name, _ref$address, address, _ref$latitude, lat, _ref$longitude, lng;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                param = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};
                _context12.next = 3;
                return uni.chooseLocation(param);
              case 3:
                _yield$uni$chooseLoca = _context12.sent;
                _yield$uni$chooseLoca2 = (0, _slicedToArray2.default)(_yield$uni$chooseLoca, 2);
                err = _yield$uni$chooseLoca2[0];
                loca_data = _yield$uni$chooseLoca2[1];
                _ref = err ? {
                  name: '',
                  address: '',
                  latitude: '',
                  longitude: ''
                } : loca_data, _ref$name = _ref.name, name = _ref$name === void 0 ? '' : _ref$name, _ref$address = _ref.address, address = _ref$address === void 0 ? '' : _ref$address, _ref$latitude = _ref.latitude, lat = _ref$latitude === void 0 ? '' : _ref$latitude, _ref$longitude = _ref.longitude, lng = _ref$longitude === void 0 ? '' : _ref$longitude;
                address = address || name;
                _this12.updateUserItem({
                  key: 'useChooseLocation',
                  val: false
                });
                if (address) {
                  _context12.next = 12;
                  break;
                }
                return _context12.abrupt("return");
              case 12:
                _this12.form.lat = lat;
                _this12.form.lng = lng;
                _this12.form.address = address;
              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    //表单验证
    validate: function validate(param) {
      var _this$configInfo = this.configInfo,
        free_fare_bear = _this$configInfo.free_fare_bear,
        free_fare_distance = _this$configInfo.free_fare_distance;
      var validate = new this.$util.Validate();
      this.rule.map(function (item) {
        var name = item.name;
        if (name == 'free_fare_distance') {
          if (param[name]) {
            if (free_fare_bear == 1) {
              item.maxNum = free_fare_distance;
            }
            validate.add(param[name], item);
          }
        } else {
          validate.add(param[name], item);
        }
      });
      var message = validate.start();
      return message;
    },
    submit: function submit() {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var param, arr, msg, old_phone, short_code_status;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                param = _this13.$util.deepCopy(_this13.form);
                arr = ['id_card', 'id_card_fan', 'id_card_people', 'work_img', 'video'];
                arr.map(function (item) {
                  param[item] = param[item] && param[item].length > 0 ? param[item][0].path : '';
                });
                param.license = param.license.map(function (item) {
                  return item.path;
                });
                param.self_img = param.self_img.map(function (item) {
                  return item.path;
                });
                msg = _this13.validate(param);
                if (!msg) {
                  _context13.next = 9;
                  break;
                }
                _this13.$util.showToast({
                  title: msg
                });
                return _context13.abrupt("return");
              case 9:
                param.free_fare_distance = param.free_fare_distance || 0;
                param.birthday = _this13.$util.DateToUnix(param.birthday);
                param.id_card = [param.id_card, param.id_card_fan, param.id_card_people];
                delete param.id_card_fan;
                delete param.id_card_people;
                delete param.admin_id;
                old_phone = _this13.old_phone;
                short_code_status = _this13.configInfo.short_code_status;
                if (!(short_code_status && old_phone != param.mobile && (param.short_code == null || param.short_code.length != 6))) {
                  _context13.next = 20;
                  break;
                }
                _this13.$util.showToast({
                  title: "\u8BF7\u8F93\u51656\u4F4D\u6570\u77ED\u4FE1\u9A8C\u8BC1\u7801"
                });
                return _context13.abrupt("return");
              case 20:
                if (!short_code_status || old_phone == param.mobile) {
                  delete param.short_code;
                }
                if (!_this13.lockTap) {
                  _context13.next = 23;
                  break;
                }
                return _context13.abrupt("return");
              case 23:
                _this13.lockTap = true;
                _this13.$util.showLoading();
                _context13.prev = 25;
                _context13.next = 28;
                return _this13.$api.technician.coachUpdateV2(param);
              case 28:
                _this13.$util.hideAll();
                _this13.$util.showToast({
                  title: "\u63D0\u4EA4\u6210\u529F"
                });
                if (_this13.timer) {
                  clearInterval(_this13.timer);
                }
                setTimeout(function () {
                  if (getCurrentPages().length > 1) {
                    _this13.$util.back();
                  }
                  _this13.$util.goUrl({
                    url: '/pages/mine',
                    openType: "reLaunch"
                  });
                }, 2000);
                _context13.next = 37;
                break;
              case 34:
                _context13.prev = 34;
                _context13.t0 = _context13["catch"](25);
                setTimeout(function () {
                  _this13.lockTap = false;
                  _this13.$util.hideAll();
                }, 2000);
              case 37:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[25, 34]]);
      }))();
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 919:
/*!********************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/edit.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./edit.vue?vue&type=style&index=0&lang=scss& */ 920);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_edit_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 920:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/edit.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[913,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/technician/pages/edit.js.map