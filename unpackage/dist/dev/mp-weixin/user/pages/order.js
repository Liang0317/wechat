(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["user/pages/order"],{

/***/ 194:
/*!************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/main.js?{"page":"user%2Fpages%2Forder"} ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _order = _interopRequireDefault(__webpack_require__(/*! ./user/pages/order.vue */ 195));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_order.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 195:
/*!*****************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/order.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order.vue?vue&type=template&id=4210590d& */ 196);
/* harmony import */ var _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order.vue?vue&type=script&lang=js& */ 198);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order.vue?vue&type=style&index=0&lang=scss& */ 200);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 69);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "user/pages/order.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 196:
/*!************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/order.vue?vue&type=template&id=4210590d& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=template&id=4210590d& */ 197);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_template_id_4210590d___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 197:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/order.vue?vue&type=template&id=4210590d& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    ? _vm.serviceTypeList && _vm.serviceTypeList.length > 0
    : null
  var g1 = _vm.isLoad
    ? _vm.orderInfo.order_goods && _vm.orderInfo.order_goods.length > 0
    : null
  var l0 =
    _vm.isLoad && g1
      ? _vm.__map(_vm.orderInfo.order_goods, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m0 = _vm.$t("action.attendantName")
          return {
            $orig: $orig,
            m0: m0,
          }
        })
      : null
  var m1 =
    _vm.isLoad &&
    g1 &&
    _vm.serviceTypeList[_vm.serviceTypeInd].id === 0 &&
    _vm.carTypeList[_vm.carTypeInd].id === 1 &&
    _vm.orderInfo.free_fare
      ? _vm.$t("action.attendantName")
      : null
  var g2 = _vm.isLoad && g1 ? _vm.form.text.length : null
  var g3 = _vm.isLoad && g1 && !(g2 > 100) ? _vm.form.text.length : null
  var g4 =
    _vm.isLoad && g1
      ? _vm.orderInfo.trading_rules && _vm.orderInfo.trading_rules.length > 0
      : null
  var m2 = _vm.isLoad && !g1 ? _vm.$t("action.attendantName") : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      $event.stopPropagation()
      return _vm.$util.goUrl({
        url: _vm.orderInfo.store_info.phone,
        openType: "call",
      })
    }
    _vm.e1 = function ($event) {
      $event.stopPropagation()
      return _vm.$util.goUrl({
        url: "/user/pages/address/list?check=1",
      })
    }
    _vm.e2 = function ($event) {
      $event.stopPropagation()
      return _vm.$util.goUrl({
        url: "/user/pages/coupon/use",
      })
    }
    _vm.e3 = function ($event) {
      $event.stopPropagation()
      _vm.isAgree = !_vm.isAgree
    }
    _vm.e4 = function ($event) {
      $event.stopPropagation()
      return _vm.$refs.show_rule_item.open()
    }
    _vm.e5 = function ($event) {
      return _vm.$util.goUrl({
        url: "/pages/service",
        openType: "reLaunch",
      })
    }
    _vm.e6 = function ($event) {
      return _vm.$refs.show_rule_item.close()
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l0: l0,
        m1: m1,
        g2: g2,
        g3: g3,
        g4: g4,
        m2: m2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 198:
/*!******************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/order.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=script&lang=js& */ 199);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 199:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/order.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var parser = function parser() {
  Promise.all(/*! require.ensure | components/jyf-Parser/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/jyf-Parser/index")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/jyf-Parser/index */ 1376));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    parser: parser
  },
  data: function data() {
    return {
      options: {},
      isLoad: false,
      serviceTypeList: [],
      serviceTypeInd: 0,
      carTypeList: [{
        id: 1,
        title: '出租车'
      }, {
        id: 0,
        title: '公交/地铁'
      }],
      carTypeInd: 0,
      // 1微信支付；2余额支付；3支付宝支付
      payList: [{
        id: 1,
        icon: 'iconweixinzhifu1',
        title: '微信支付'
      }, {
        id: 2,
        icon: 'iconqianbao c-balance',
        title: '账户余额',
        is_disabled: false
      }],
      payInd: 0,
      balanceInd: 1,
      balance: 0,
      tabList: [],
      activeIndex: 0,
      timeList: [],
      send_info: {},
      orderInfo: {
        coupon_id: 0,
        address_info: {
          id: 0
        }
      },
      form: {
        user_name: '',
        user_phone: '',
        text: ''
      },
      rule: [{
        name: "user_name",
        checkType: "isNotNull",
        errorMsg: "请输入您的姓名",
        regType: 2
      }, {
        name: "user_phone",
        checkType: "isMobile",
        errorMsg: "请输入手机号"
      }],
      lockTap: false,
      isBus: 0,
      isAgree: false
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
    mineInfo: function mineInfo(state) {
      return state.user.mineInfo;
    }
  }),
  watch: {
    'send_info.time': function send_infoTime(value) {
      var start_time = this.send_info.time_str;
      this.getIsBusCall(start_time);
    }
  },
  onLoad: function onLoad(options) {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _this$send_info$time, time;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.options = options;
              _this.$util.showLoading();
              _context.next = 4;
              return _this.initIndex();
            case 4:
              _this$send_info$time = _this.send_info.time, time = _this$send_info$time === void 0 ? 0 : _this$send_info$time;
              if (!time) {
                _this.getIsBusCall('');
              }
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0, _vuex.mapActions)(['getConfigInfo', 'getMineInfo'])), (0, _vuex.mapMutations)(['updateUserItem', 'updateOrderItem'])), {}, {
    initIndex: function initIndex() {
      var _arguments = arguments,
        _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var refresh, _this2$options, coach_id, _this2$options$ser_id, service_id, _this2$orderInfo, coupon_id, address_info, address_id, _yield$_this2$$api$or, is_door, is_store, serviceTypeList, car_type, _this2$serviceTypeLis, is_door_store, data, _data$alipay_status, alipay_status, _data$near_time, near_time, balance, _near_time$text, time, _near_time$str, time_str, _this2$send_info$time, send_info_time, dat_text, balanceInd;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                refresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                _this2$options = _this2.options, coach_id = _this2$options.id, _this2$options$ser_id = _this2$options.ser_id, service_id = _this2$options$ser_id === void 0 ? 0 : _this2$options$ser_id;
                _this2$orderInfo = _this2.orderInfo, coupon_id = _this2$orderInfo.coupon_id, address_info = _this2$orderInfo.address_info;
                address_id = address_info.id;
                _context2.next = 6;
                return _this2.$api.order.getServiceType({
                  coach_id: coach_id
                });
              case 6:
                _yield$_this2$$api$or = _context2.sent;
                is_door = _yield$_this2$$api$or.is_door;
                is_store = _yield$_this2$$api$or.is_store;
                serviceTypeList = [];
                if (is_door) {
                  serviceTypeList.push({
                    id: 0,
                    title: '上门服务'
                  });
                }
                if (is_store) {
                  serviceTypeList.push({
                    id: 1,
                    title: '到店服务'
                  });
                }
                _this2.serviceTypeList = serviceTypeList;
                _this2.$util.setNavigationBarColor({
                  bg: _this2.primaryColor
                });
                if (!(serviceTypeList.length == 0)) {
                  _context2.next = 19;
                  break;
                }
                _this2.$util.hideAll();
                _this2.isLoad = true;
                _this2.orderInfo.order_goods = [];
                return _context2.abrupt("return");
              case 19:
                car_type = _this2.carTypeList[_this2.carTypeInd].id;
                _this2$serviceTypeLis = _this2.serviceTypeList[_this2.serviceTypeInd].id, is_door_store = _this2$serviceTypeLis === void 0 ? 0 : _this2$serviceTypeLis;
                _context2.next = 23;
                return _this2.$api.order.payOrderInfo({
                  is_store: is_door_store,
                  service_id: service_id,
                  coach_id: coach_id,
                  car_type: car_type,
                  coupon_id: coupon_id,
                  address_id: address_id
                });
              case 23:
                data = _context2.sent;
                _this2.$util.hideAll();
                data.address_info = data.address_info.id ? data.address_info : {};
                _this2.orderInfo = data;
                _data$alipay_status = data.alipay_status, alipay_status = _data$alipay_status === void 0 ? 0 : _data$alipay_status, _data$near_time = data.near_time, near_time = _data$near_time === void 0 ? {
                  str: '',
                  text: ''
                } : _data$near_time, balance = data.user_cash;
                if (alipay_status) {}
                _near_time$text = near_time.text, time = _near_time$text === void 0 ? '' : _near_time$text, _near_time$str = near_time.str, time_str = _near_time$str === void 0 ? '' : _near_time$str;
                _this2$send_info$time = _this2.send_info.time, send_info_time = _this2$send_info$time === void 0 ? 0 : _this2$send_info$time;
                if (!send_info_time && time && time_str) {
                  dat_text = _this2.$util.formatTime(time_str * 1000, 'M-D');
                  _this2.send_info = {
                    time: time,
                    time_str: time_str,
                    dat_text: dat_text
                  };
                }
                balanceInd = _this2.balanceInd;
                _this2.payList[balanceInd].is_disabled = balance * 1 < data.pay_price * 1;
                _this2.balance = balance;
                _this2.isLoad = true;
              case 36:
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
    linkpress: function linkpress(res) {},
    getIsBusCall: function getIsBusCall(start_time) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var serviceTypeList, serviceTypeInd, _serviceTypeList$serv, is_store, isBus;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                serviceTypeList = _this3.serviceTypeList, serviceTypeInd = _this3.serviceTypeInd;
                if (!(serviceTypeList.length == 0)) {
                  _context3.next = 3;
                  break;
                }
                return _context3.abrupt("return");
              case 3:
                _serviceTypeList$serv = serviceTypeList[serviceTypeInd].id, is_store = _serviceTypeList$serv === void 0 ? 0 : _serviceTypeList$serv;
                if (!is_store) {
                  _context3.next = 8;
                  break;
                }
                _context3.t0 = 1;
                _context3.next = 11;
                break;
              case 8:
                _context3.next = 10;
                return _this3.$api.order.getIsBus({
                  start_time: start_time
                });
              case 10:
                _context3.t0 = _context3.sent;
              case 11:
                isBus = _context3.t0;
                _this3.isBus = isBus;
                if (!(isBus == 0)) {
                  _context3.next = 17;
                  break;
                }
                _this3.carTypeInd = 0;
                _context3.next = 17;
                return _this3.initRefresh();
              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 选择出行方式/支付方式/服务方式
    toChangeItem: function toChangeItem(index) {
      var _arguments2 = arguments,
        _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var key, address_info, balanceInd;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                key = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : 1;
                address_info = _this4.orderInfo.address_info;
                _context4.t0 = key;
                _context4.next = _context4.t0 === 1 ? 5 : _context4.t0 === 2 ? 12 : _context4.t0 === 3 ? 17 : 22;
                break;
              case 5:
                if (!(index == 1 && (!address_info.id || !_this4.send_info.time))) {
                  _context4.next = 8;
                  break;
                }
                _this4.$util.showToast({
                  title: !address_info.id ? "\u8BF7\u9009\u62E9\u5730\u5740" : "\u8BF7\u9009\u62E9\u9884\u7EA6\u65F6\u95F4"
                });
                return _context4.abrupt("return");
              case 8:
                _this4.carTypeInd = index;
                _context4.next = 11;
                return _this4.initRefresh();
              case 11:
                return _context4.abrupt("break", 22);
              case 12:
                balanceInd = _this4.balanceInd;
                if (!(index == balanceInd && _this4.payList[balanceInd].is_disabled)) {
                  _context4.next = 15;
                  break;
                }
                return _context4.abrupt("return");
              case 15:
                _this4.payInd = index;
                return _context4.abrupt("break", 22);
              case 17:
                _this4.serviceTypeInd = index;
                _this4.carTypeInd = index == 1 ? 1 : 0;
                _context4.next = 21;
                return _this4.initRefresh();
              case 21:
                return _context4.abrupt("break", 22);
              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 加/减数量
    changeNum: function changeNum(mol, index) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var _this5$orderInfo$orde, id, service_id, member_info, can_buy, title, msg, num, coach_id, methodModel, param, changeNum;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5$orderInfo$orde = _this5.orderInfo.order_goods[index], id = _this5$orderInfo$orde.id, service_id = _this5$orderInfo$orde.service_id, member_info = _this5$orderInfo$orde.member_info;
                can_buy = member_info.can_buy, title = member_info.title;
                if (!(!can_buy && mol > 0)) {
                  _context5.next = 6;
                  break;
                }
                msg = title ? title.includes('会员') ? title : "".concat(title, "\u4F1A\u5458") : '会员';
                _this5.$util.showToast({
                  title: "\u60A8\u8FD8\u4E0D\u662F".concat(msg)
                });
                return _context5.abrupt("return");
              case 6:
                num = 0;
                _this5.orderInfo.order_goods.map(function (item) {
                  num += item.num;
                });
                if (!(num === 1 && mol < 0)) {
                  _context5.next = 11;
                  break;
                }
                _this5.$util.showToast({
                  title: "\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u670D\u52A1\u54E6"
                });
                return _context5.abrupt("return");
              case 11:
                coach_id = _this5.options.id;
                if (!_this5.lockTap) {
                  _context5.next = 14;
                  break;
                }
                return _context5.abrupt("return");
              case 14:
                _this5.lockTap = true;
                methodModel = mol > 0 ? 'addCar' : 'delCar';
                param = mol > 0 ? {
                  service_id: service_id,
                  coach_id: coach_id,
                  num: 1
                } : {
                  id: id,
                  num: 1
                };
                _context5.prev = 17;
                _context5.next = 20;
                return _this5.$api.order[methodModel](param);
              case 20:
                changeNum = _context5.sent;
                _context5.next = 23;
                return _this5.initRefresh();
              case 23:
                _this5.lockTap = false;
                _context5.next = 29;
                break;
              case 26:
                _context5.prev = 26;
                _context5.t0 = _context5["catch"](17);
                _this5.lockTap = false;
              case 29:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[17, 26]]);
      }))();
    },
    toShowTime: function toShowTime() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this6.getStoreDay();
              case 2:
                _this6.$refs.show_time_item.open();
              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    getStoreDay: function getStoreDay() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var data, _this7$send_info$dat_, dat_text;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this7.$api.order.dayText();
              case 2:
                data = _context7.sent;
                data.map(function (item) {
                  item.title = "".concat(item.dat_text, " ").concat(item.week);
                });
                _this7.tabList = data;
                _this7$send_info$dat_ = _this7.send_info.dat_text, dat_text = _this7$send_info$dat_ === void 0 ? '' : _this7$send_info$dat_;
                if (dat_text) {
                  _this7.activeIndex = _this7.tabList.findIndex(function (item) {
                    return item.dat_text == dat_text;
                  });
                }
                _context7.next = 9;
                return _this7.getStoreTime();
              case 9:
                _this7.loading = false;
                _this7.$util.hideAll();
              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    getStoreTime: function getStoreTime() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var coach_id, activeIndex, day, _this8$serviceTypeLis, is_store, time_long;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                coach_id = _this8.options.id;
                activeIndex = _this8.activeIndex;
                if (!(activeIndex < 0)) {
                  _context8.next = 4;
                  break;
                }
                return _context8.abrupt("return");
              case 4:
                day = _this8.tabList[activeIndex].dat_str;
                _this8$serviceTypeLis = _this8.serviceTypeList[_this8.serviceTypeInd].id, is_store = _this8$serviceTypeLis === void 0 ? 0 : _this8$serviceTypeLis;
                time_long = _this8.orderInfo.time_long;
                _context8.next = 9;
                return _this8.$api.order.timeText({
                  is_store: is_store,
                  coach_id: coach_id,
                  time_long: time_long,
                  day: day
                });
              case 9:
                _this8.timeList = _context8.sent;
                _this8.loading = false;
                _this8.$util.hideAll();
              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    handerTabChange: function handerTabChange(index) {
      this.activeIndex = index;
      this.getStoreTime();
    },
    toChooseTime: function toChooseTime(index) {
      var tabList = this.tabList,
        activeIndex = this.activeIndex;
      var item = this.timeList[index];
      if (item.status != 1) return;
      item.time = "".concat(tabList[activeIndex].dat_text, " ").concat(tabList[activeIndex].week, " ").concat(item.time_text);
      this.send_info = item;
      this.$refs.show_time_item.close();
    },
    checkInput: function checkInput(e, key) {
      var _this9 = this;
      var val = this.$util.formatMoney(e.detail.value);
      this.$nextTick(function () {
        _this9.form[key] = val;
      });
    },
    // 查看定位
    toMap: function toMap() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var _this10$orderInfo$sto, address, lat, lng, privacyCheck;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this10$orderInfo$sto = _this10.orderInfo.store_info, address = _this10$orderInfo$sto.address, lat = _this10$orderInfo$sto.lat, lng = _this10$orderInfo$sto.lng;
                if (address) {
                  _context9.next = 3;
                  break;
                }
                return _context9.abrupt("return");
              case 3:
                privacyCheck = _this10.$refs.user_privacy.check();
                if (!privacyCheck) {
                  _context9.next = 7;
                  break;
                }
                _this10.$refs.user_privacy.open();
                return _context9.abrupt("return");
              case 7:
                _context9.next = 9;
                return _this10.$util.checkAuth({
                  type: 'userLocation'
                });
              case 9:
                _context9.next = 11;
                return uni.getLocation({
                  type: 'gcj02'
                });
              case 11:
                _context9.next = 13;
                return uni.openLocation({
                  latitude: lat * 1,
                  longitude: lng * 1,
                  name: address,
                  scale: 28
                });
              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    //表单验证
    validate: function validate(param) {
      var validate = new this.$util.Validate();
      this.rule.map(function (item) {
        var name = item.name;
        validate.add(param[name], item);
      });
      var message = validate.start();
      return message;
    },
    toPay: function toPay() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var param, _this11$serviceTypeLi, is_store, msg, _this11$orderInfo, _this11$orderInfo$cou, coupon_id, _this11$orderInfo$add, address_info, address_id, carTypeList, carTypeInd, payList, payInd, send_info, trading_rules, car_type, pay_model, coach_id, start_time, _yield$_this11$$api$o, pay_list, _yield$_this11$$api$o2, order_id;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                param = _this11.$util.deepCopy(_this11.form);
                _this11$serviceTypeLi = _this11.serviceTypeList[_this11.serviceTypeInd].id, is_store = _this11$serviceTypeLi === void 0 ? 0 : _this11$serviceTypeLi;
                if (!is_store) {
                  _context10.next = 9;
                  break;
                }
                msg = _this11.validate(param);
                if (!msg) {
                  _context10.next = 7;
                  break;
                }
                _this11.$util.showToast({
                  title: msg
                });
                return _context10.abrupt("return");
              case 7:
                _context10.next = 11;
                break;
              case 9:
                delete param.user_name;
                delete param.user_phone;
              case 11:
                _this11$orderInfo = _this11.orderInfo, _this11$orderInfo$cou = _this11$orderInfo.coupon_id, coupon_id = _this11$orderInfo$cou === void 0 ? 0 : _this11$orderInfo$cou, _this11$orderInfo$add = _this11$orderInfo.address_info, address_info = _this11$orderInfo$add === void 0 ? {} : _this11$orderInfo$add;
                address_id = address_info.id;
                if (!(!is_store && !address_id)) {
                  _context10.next = 16;
                  break;
                }
                _this11.$util.showToast({
                  title: "\u8BF7\u9009\u62E9\u5730\u5740"
                });
                return _context10.abrupt("return");
              case 16:
                carTypeList = _this11.carTypeList, carTypeInd = _this11.carTypeInd, payList = _this11.payList, payInd = _this11.payInd, send_info = _this11.send_info;
                if (send_info.time) {
                  _context10.next = 20;
                  break;
                }
                _this11.$util.showToast({
                  title: "\u8BF7\u9009\u62E9\u9884\u7EA6\u65F6\u95F4"
                });
                return _context10.abrupt("return");
              case 20:
                trading_rules = _this11.orderInfo.trading_rules;
                if (!(trading_rules && trading_rules.length > 0 && !_this11.isAgree)) {
                  _context10.next = 24;
                  break;
                }
                _this11.$util.showToast({
                  title: "\u8BF7\u5148\u9605\u8BFB\u5E76\u540C\u610F\u300A\u5E73\u53F0\u4EA4\u6613\u89C4\u5219\u300B"
                });
                return _context10.abrupt("return");
              case 24:
                car_type = carTypeList[carTypeInd].id;
                pay_model = payList[payInd].id;
                coach_id = _this11.options.id;
                start_time = send_info.time_str;
                param = Object.assign({}, param, {
                  coach_id: coach_id,
                  coupon_id: coupon_id,
                  address_id: address_id,
                  is_store: is_store,
                  car_type: car_type,
                  pay_model: pay_model,
                  start_time: start_time
                });
                if (!_this11.lockTap) {
                  _context10.next = 31;
                  break;
                }
                return _context10.abrupt("return");
              case 31:
                _this11.lockTap = true;
                _this11.$util.showLoading();
                _context10.prev = 33;
                _context10.next = 36;
                return _this11.$api.order.payOrder(param);
              case 36:
                _yield$_this11$$api$o = _context10.sent;
                pay_list = _yield$_this11$$api$o.pay_list;
                _yield$_this11$$api$o2 = _yield$_this11$$api$o.order_id;
                order_id = _yield$_this11$$api$o2 === void 0 ? 0 : _yield$_this11$$api$o2;
                _this11.$util.hideAll();
                // 微信/支付宝支付
                if (!pay_list) {
                  _context10.next = 55;
                  break;
                }
                if (pay_model == 3) {
                  pay_list = {
                    orderInfo: pay_list,
                    provider: 'alipay'
                  };
                }
                _context10.prev = 43;
                _context10.next = 46;
                return _this11.$util.pay(pay_list);
              case 46:
                _this11.$util.showToast({
                  title: "\u652F\u4ED8\u6210\u529F"
                });
                setTimeout(function () {
                  _this11.lockTap = false;
                  _this11.$util.goUrl({
                    url: '/pages/order?tab=2',
                    openType: "reLaunch"
                  });
                }, 1000);
                _context10.next = 54;
                break;
              case 50:
                _context10.prev = 50;
                _context10.t0 = _context10["catch"](43);
                _this11.$util.showToast({
                  title: "\u652F\u4ED8\u5931\u8D25"
                });
                setTimeout(function () {
                  _this11.lockTap = false;
                  _this11.$util.goUrl({
                    url: '/pages/order?tab=1',
                    openType: "reLaunch"
                  });
                }, 1000);
              case 54:
                return _context10.abrupt("return");
              case 55:
                // 余额支付/零元支付
                _this11.$util.showToast({
                  title: "\u652F\u4ED8\u6210\u529F"
                });
                setTimeout(function () {
                  _this11.lockTap = false;
                  _this11.$util.goUrl({
                    url: '/pages/order?tab=2',
                    openType: "reLaunch"
                  });
                }, 1000);
                _context10.next = 62;
                break;
              case 59:
                _context10.prev = 59;
                _context10.t1 = _context10["catch"](33);
                setTimeout(function () {
                  _this11.lockTap = false;
                  _this11.$util.hideAll();
                }, 2000);
              case 62:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[33, 59], [43, 50]]);
      }))();
    },
    toCopy: function toCopy(url) {
      var privacyCheck = this.$refs.user_privacy.check();
      if (privacyCheck) {
        this.$refs.user_privacy.open();
        return;
      }
      this.$util.goUrl({
        url: url,
        openType: 'copy'
      });
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 200:
/*!***************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/order.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./order.vue?vue&type=style&index=0&lang=scss& */ 201);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_order_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 201:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/order.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[194,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/user/pages/order.js.map