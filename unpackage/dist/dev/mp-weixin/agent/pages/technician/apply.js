(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["agent/pages/technician/apply"],{

/***/ 857:
/*!**************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/main.js?{"page":"agent%2Fpages%2Ftechnician%2Fapply"} ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _apply = _interopRequireDefault(__webpack_require__(/*! ./agent/pages/technician/apply.vue */ 858));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_apply.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 858:
/*!*****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/technician/apply.vue ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apply.vue?vue&type=template&id=6f9ac274& */ 859);
/* harmony import */ var _apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apply.vue?vue&type=script&lang=js& */ 861);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _apply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./apply.vue?vue&type=style&index=0&lang=scss& */ 863);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 69);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__["render"],
  _apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "agent/pages/technician/apply.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 859:
/*!************************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/technician/apply.vue?vue&type=template&id=6f9ac274& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./apply.vue?vue&type=template&id=6f9ac274& */ 860);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_template_id_6f9ac274___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 860:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/technician/apply.vue?vue&type=template&id=6f9ac274& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    wPicker: function () {
      return __webpack_require__.e(/*! import() | components/w-picker/w-picker */ "components/w-picker/w-picker").then(__webpack_require__.bind(null, /*! @/components/w-picker/w-picker.vue */ 1327))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.isLoad
    ? _vm.configInfo.plugAuth.store && _vm.storeList.length > 0
    : null
  var m0 = _vm.isLoad ? _vm.$t("action.attendantName") : null
  var g1 = _vm.isLoad ? _vm.form.text.length : null
  var g2 = _vm.isLoad && !(g1 > 300) ? _vm.form.text.length : null
  var f0 =
    _vm.isLoad && _vm.form.is_work === 1
      ? _vm._f("handleStartEndTime")(_vm.form, _vm.toDay)
      : null
  var g3 = _vm.isLoad
    ? _vm.fdd_agreement &&
      _vm.fdd_agreement.hasOwnProperty("viewpdf_url") &&
      _vm.edit_base_info
    : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        m0: m0,
        g1: g1,
        g2: g2,
        f0: f0,
        g3: g3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 861:
/*!******************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/technician/apply.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./apply.vue?vue&type=script&lang=js& */ 862);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 862:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/technician/apply.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _index = _interopRequireDefault(__webpack_require__(/*! @/utils/index.js */ 38));
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
      edit_base_info: 1,
      cityList: [],
      cityIndex: -1,
      storeList: [],
      storeIndex: -1,
      toDay: '',
      toDayTime: '',
      showKey: '',
      showTime: false,
      sexList: [{
        id: 0,
        title: '男'
      }, {
        id: 1,
        title: '女'
      }],
      workList: [{
        id: 1,
        title: '接单'
      }, {
        id: 0,
        title: '休息'
      }],
      fdd_agreement: {},
      form: (_form = {
        id: 0,
        user_id: '',
        nickName: '',
        coach_name: '',
        //姓名 
        mobile: '',
        //手机号 
        sex: 0,
        //性别 
        birthday: '',
        work_time: '',
        //从业年份 
        city_id: '',
        // 城市id
        store_id: '',
        // 门店id
        store_name: '',
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
      }, (0, _defineProperty2.default)(_form, "city_id", ''), (0, _defineProperty2.default)(_form, "video", []), (0, _defineProperty2.default)(_form, "order_num", 0), (0, _defineProperty2.default)(_form, "is_work", 1), (0, _defineProperty2.default)(_form, "start_time", '00:00'), (0, _defineProperty2.default)(_form, "end_time", '23:59'), _form),
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
      }, {
        name: "order_num",
        checkType: "isNumber",
        errorMsg: "请输入虚拟订单量"
      }],
      have_user_id: false,
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
      var _options$id, id, _options$view, view, coach_status, admin_id, name;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _options$id = options.id, id = _options$id === void 0 ? 0 : _options$id, _options$view = options.view, view = _options$view === void 0 ? 0 : _options$view;
              _this.edit_base_info = view * 1 === 1 ? 0 : 1;
              _this.options = options;
              _this.$util.showLoading();
              _context.next = 6;
              return _this.initIndex();
            case 6:
              coach_status = _this.coach_status;
              admin_id = _this.form.admin_id;
              name = _this.$t('action.attendantName');
              uni.setNavigationBarTitle({
                title: "".concat(!_this.edit_base_info ? '查看' : id ? '编辑' : '新增').concat(name)
              });
            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onShow: function onShow() {
    if (this.useChooseLocation) {
      this.updateUserItem({
        key: 'useChooseLocation',
        val: false
      });
    }
    if (!this.location.lat && this.locaRefuse) {
      this.toResetUtilLoca();
    }
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
      var _this2 = this;
      setTimeout(function () {
        var _this2$changeOnAddr = _this2.changeOnAddr,
          lat = _this2$changeOnAddr.lat,
          lng = _this2$changeOnAddr.lng,
          _this2$changeOnAddr$u = _this2$changeOnAddr.unix,
          unix = _this2$changeOnAddr$u === void 0 ? 0 : _this2$changeOnAddr$u;
        var noloca = _this2.noChangeLoca.noloca;
        var cur_unix = _this2.$util.DateToUnix(_this2.$util.formatTime(new Date(), 'YY-M-D h:m:s'));
        if (noloca && (!lat && !lng || !unix || unix && cur_unix - unix >= 1)) {
          _this2.getUtilLocation();
        }
      }, 800);
    }
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0, _vuex.mapActions)(['getConfigInfo', 'getUserInfo'])), (0, _vuex.mapMutations)(['updateUserItem', 'updateMapItem'])), {}, {
    initIndex: function initIndex() {
      var _arguments = arguments,
        _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var refresh, cur_time, privacyCheck, _this3$options$id, id, data, imgArr, imgArrs, key;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                refresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (!(!_this3.configInfo.id || !_this3.configInfo.hasOwnProperty('free_fare_bear') || refresh)) {
                  _context2.next = 4;
                  break;
                }
                _context2.next = 4;
                return _this3.getConfigInfo();
              case 4:
                _this3.$util.setNavigationBarColor({
                  bg: _this3.primaryColor
                });
                cur_time = new Date(Math.ceil(new Date().getTime()));
                _this3.toDay = _this3.$util.formatTime(cur_time, 'YY-M-D');
                _this3.toDayTime = _this3.$util.formatTime(cur_time, 'h:m');
                privacyCheck = _this3.$refs.user_privacy.check();
                if (!(privacyCheck && !_this3.location.lat)) {
                  _context2.next = 13;
                  break;
                }
                _this3.$refs.user_privacy.open();
                _this3.$util.hideAll();
                return _context2.abrupt("return");
              case 13:
                _context2.next = 15;
                return Promise.all([_this3.getCityList(), _this3.getStoreList()]);
              case 15:
                _this3$options$id = _this3.options.id, id = _this3$options$id === void 0 ? 0 : _this3$options$id;
                if (id) {
                  _context2.next = 20;
                  break;
                }
                _this3.isLoad = true;
                _this3.$util.hideAll();
                return _context2.abrupt("return");
              case 20:
                _context2.next = 22;
                return _this3.$api.agent.coachInfo({
                  id: id
                });
              case 22:
                data = _context2.sent;
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
                _this3.cityIndex = _this3.cityList.findIndex(function (item) {
                  return item.id == data.city_id;
                });
                _this3.storeIndex = _this3.storeList.findIndex(function (item) {
                  return item.id == data.store_id;
                });
                data.birthday = data.birthday ? _this3.$util.formatTime(data.birthday * 1000, 'YY-M-D') : '';
                for (key in _this3.form) {
                  _this3.form[key] = data[key];
                }
                _this3.have_user_id = data.id && data.user_id;
                _this3.fdd_agreement = data.fdd_agreement;
                _this3.isLoad = true;
                _this3.$util.hideAll();
              case 37:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    initRefresh: function initRefresh() {
      this.initIndex(true);
    },
    toResetUtilLoca: function toResetUtilLoca() {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    toOpenLocation: function toOpenLocation() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var privacyCheck;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                privacyCheck = _this4.$refs.user_privacy.check();
                if (!privacyCheck) {
                  _context4.next = 4;
                  break;
                }
                _this4.$refs.user_privacy.open();
                return _context4.abrupt("return");
              case 4:
                _context4.next = 6;
                return _this4.$util.checkAuth({
                  type: 'userLocation',
                  checkApp: true
                });
              case 6:
                _this4.initRefresh();
              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    getStoreList: function getStoreList() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var _this5$configInfo$plu, store, data;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5$configInfo$plu = _this5.configInfo.plugAuth.store, store = _this5$configInfo$plu === void 0 ? false : _this5$configInfo$plu;
                if (!store) {
                  _context5.next = 7;
                  break;
                }
                _context5.next = 4;
                return _this5.$api.agent.storeSelect();
              case 4:
                data = _context5.sent;
                data.unshift({
                  id: 0,
                  title: '不挂靠门店'
                });
                _this5.storeList = data;
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
                  _context6.next = 17;
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
                _this6.updateMapItem({
                  key: 'pageActive',
                  val: false
                });
                return _context6.abrupt("return");
              case 17:
                _this6.initUtilLocaData();
              case 18:
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
        var _this8$location, _this8$location$lng, lng, _this8$location$lat, lat, city;
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
                return _this8.$api.base.getCity({
                  lng: lng,
                  lat: lat
                });
              case 4:
                city = _context8.sent;
                _this8.$util.hideAll();
                _this8.cityList = city;
                _this8.cityIndex = city.length > 0 ? 0 : -1;
                _this8.form.city_id = city.length > 0 ? city[0].id : '';
                if (lat && lng) {
                  _this8.$util.getMapInfo();
                }
              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    toFddSign: function toFddSign() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var _this9$fdd_agreement$, viewpdf_url;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this9.updateUserItem({
                  key: 'fddExtsign',
                  val: ''
                });
                _this9$fdd_agreement$ = _this9.fdd_agreement.viewpdf_url, viewpdf_url = _this9$fdd_agreement$ === void 0 ? '' : _this9$fdd_agreement$;
                _this9.updateUserItem({
                  key: 'fddExtsign',
                  val: viewpdf_url
                });
                _this9.$util.goUrl({
                  url: "/user/pages/common/web?url=fddExtsign"
                });
              case 4:
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
    imgUpload: function imgUpload(e) {
      var imagelist = e.imagelist,
        imgtype = e.imgtype;
      this.form[imgtype] = imagelist;
    },
    toSetItem: function toSetItem(index, key, key1) {
      var edit = this.toCheckEdit();
      if (!edit) return;
      var id = this[key1][index].id;
      this.form[key] = id;
    },
    toShowTime: function toShowTime(key) {
      var edit = this.toCheckEdit();
      if (!edit) return;
      this.showKey = key;
      this.showTime = true;
    },
    toCheckEdit: function toCheckEdit() {
      var edit = true;
      var edit_base_info = this.edit_base_info;
      if (!edit_base_info) {
        edit = false;
      }
      return edit;
    },
    onConfirm: function onConfirm(val) {
      this.form[this.showKey] = val.result;
    },
    // 选择地区
    toChooseLocation: function toChooseLocation() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var edit;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                edit = _this10.toCheckEdit();
                if (edit) {
                  _context10.next = 3;
                  break;
                }
                return _context10.abrupt("return");
              case 3:
                _this10.updateUserItem({
                  key: 'useChooseLocation',
                  val: true
                });
                if (_this10.location.lat) {
                  _context10.next = 9;
                  break;
                }
                _this10.updateUserItem({
                  key: 'useChooseLocation',
                  val: false
                });
                _this10.toOpenLocation();
                _context10.next = 12;
                break;
              case 9:
                _context10.next = 11;
                return _this10.$util.checkAuth({
                  type: 'userLocation'
                });
              case 11:
                _this10.initChooseLoca();
              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    initChooseLoca: function initChooseLoca() {
      var _arguments2 = arguments,
        _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var param, _yield$uni$chooseLoca, _yield$uni$chooseLoca2, err, loca_data, _ref, _ref$name, name, _ref$address, address, _ref$latitude, lat, _ref$longitude, lng;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                param = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};
                _context11.next = 3;
                return uni.chooseLocation(param);
              case 3:
                _yield$uni$chooseLoca = _context11.sent;
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
                _this11.updateUserItem({
                  key: 'useChooseLocation',
                  val: false
                });
                if (address) {
                  _context11.next = 12;
                  break;
                }
                return _context11.abrupt("return");
              case 12:
                _this11.form.lat = lat;
                _this11.form.lng = lng;
                _this11.form.address = address;
              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    toChooseUser: function toChooseUser() {
      var edit = this.toCheckEdit();
      if (!edit) return;
      var have_user_id = this.have_user_id;
      if (have_user_id) return;
      this.$util.goUrl({
        url: "/agent/pages/technician/user"
      });
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
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var param, arr, msg, _param$is_work, work, start, end, _this12$options$is_ed, is_edit, methodModel;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                param = _this12.$util.deepCopy(_this12.form);
                arr = ['id_card', 'id_card_fan', 'id_card_people', 'work_img', 'video'];
                arr.map(function (item) {
                  param[item] = param[item].length > 0 ? param[item][0].path : '';
                });
                param.license = param.license.map(function (item) {
                  return item.path;
                });
                param.self_img = param.self_img.map(function (item) {
                  return item.path;
                });
                msg = _this12.validate(param);
                if (!msg) {
                  _context12.next = 9;
                  break;
                }
                _this12.$util.showToast({
                  title: msg
                });
                return _context12.abrupt("return");
              case 9:
                _param$is_work = param.is_work, work = _param$is_work === void 0 ? 0 : _param$is_work, start = param.start_time, end = param.end_time;
                if (!(work && (!start || !end))) {
                  _context12.next = 13;
                  break;
                }
                _this12.$util.showToast({
                  title: !start ? '请选择开始时间' : '请选择结束时间'
                });
                return _context12.abrupt("return");
              case 13:
                param.free_fare_distance = param.free_fare_distance || 0;
                param.birthday = _this12.$util.DateToUnix(param.birthday);
                param.id_card = [param.id_card, param.id_card_fan, param.id_card_people];
                delete param.id_card_fan;
                delete param.id_card_people;
                delete param.nickName;
                delete param.store_name;
                if (param.id) {
                  delete param.admin_id;
                }
                if (!_this12.lockTap) {
                  _context12.next = 23;
                  break;
                }
                return _context12.abrupt("return");
              case 23:
                _this12.lockTap = true;
                _this12.$util.showLoading();
                _context12.prev = 25;
                _this12$options$is_ed = _this12.options.is_edit, is_edit = _this12$options$is_ed === void 0 ? 0 : _this12$options$is_ed;
                methodModel = param.id ? 'coachUpdateAdmin' : 'coachApply';
                _context12.next = 30;
                return _this12.$api.agent[methodModel](param);
              case 30:
                _this12.$util.hideAll();
                _this12.$util.showToast({
                  title: "\u63D0\u4EA4\u6210\u529F"
                });
                setTimeout(function () {
                  _this12.$util.back();
                  _this12.$util.goUrl({
                    url: 1,
                    openType: "navigateBack"
                  });
                }, 2000);
                _context12.next = 38;
                break;
              case 35:
                _context12.prev = 35;
                _context12.t0 = _context12["catch"](25);
                setTimeout(function () {
                  _this12.lockTap = false;
                  _this12.$util.hideAll();
                }, 2000);
              case 38:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[25, 35]]);
      }))();
    }
  }),
  filters: {
    handleStartEndTime: function handleStartEndTime(val, toDay) {
      var text = '';
      var start_time = val.start_time,
        end_time = val.end_time;
      var start = "".concat(toDay, " ").concat(start_time);
      var end = "".concat(toDay, " ").concat(end_time);
      if (start_time && end_time && _index.default.DateToUnix(start) >= _index.default.DateToUnix(end)) {
        text = '次日';
      }
      return text;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 863:
/*!***************************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/technician/apply.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./apply.vue?vue&type=style&index=0&lang=scss& */ 864);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_apply_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 864:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/technician/apply.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[857,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/agent/pages/technician/apply.js.map