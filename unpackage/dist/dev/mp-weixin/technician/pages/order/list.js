(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["technician/pages/order/list"],{

/***/ 985:
/*!*************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/main.js?{"page":"technician%2Fpages%2Forder%2Flist"} ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _list = _interopRequireDefault(__webpack_require__(/*! ./technician/pages/order/list.vue */ 986));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 986:
/*!****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/order/list.vue ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.vue?vue&type=template&id=3e1dec97& */ 987);
/* harmony import */ var _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.vue?vue&type=script&lang=js& */ 989);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 69);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__["render"],
  _list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "technician/pages/order/list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 987:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/order/list.vue?vue&type=template&id=3e1dec97& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=template&id=3e1dec97& */ 988);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_3e1dec97___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 988:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/order/list.vue?vue&type=template&id=3e1dec97& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.tabList.length
  var l0 = _vm.__map(_vm.list.data, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var g1 = !(item.pay_type == 2) ? [3, 4, 5].includes(item.pay_type) : null
    var g2 = [3, 4, 5].includes(item.pay_type)
    return {
      $orig: $orig,
      g1: g1,
      g2: g2,
    }
  })
  var g3 = _vm.loading
    ? _vm.list.current_page >= _vm.list.last_page && _vm.list.data.length > 0
    : null
  var g4 =
    !_vm.loading && _vm.list.data.length <= 0 && _vm.list.current_page == 1
  var g5 = _vm.coach_refund_text.length
  var g6 = !(g5 > 200) ? _vm.coach_refund_text.length : null
  var m0 = _vm.$t("action.attendantName")
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, item) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item = _temp2.item
      var _temp, _temp2
      $event.stopPropagation()
      return _vm.$util.goUrl({
        url:
          "/technician/pages/order/label?id=" +
          item.id +
          "&uid=" +
          item.user_id,
      })
    }
    _vm.e1 = function ($event) {
      $event.stopPropagation()
      return _vm.$refs.refuse_item.close()
    }
    _vm.e2 = function ($event) {
      $event.stopPropagation()
      return _vm.$refs.oper_item.close()
    }
    _vm.e3 = function ($event) {
      $event.stopPropagation()
      return _vm.$refs.shield_item.close()
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l0: l0,
        g3: g3,
        g4: g4,
        g5: g5,
        g6: g6,
        m0: m0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 989:
/*!*****************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/order/list.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=script&lang=js& */ 990);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 990:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/technician/pages/order/list.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var recorderManager = null;
var _default = {
  components: {},
  data: function data() {
    return {
      options: {},
      activeIndex: 0,
      tabList: [{
        // 	title: '全部',
        // 	id: 0
        // }, {
        title: '待接单',
        id: 2,
        number: 0
      }, {
        title: '待服务',
        id: 5,
        number: 0
      }, {
        title: '服务中',
        id: 6,
        number: 0
      }, {
        title: '已完成',
        id: 7,
        number: 0
      }],
      statusType: {
        2: '待接单',
        3: '已接单',
        4: '已出发',
        5: '已到达',
        6: '服务中',
        7: '已完成',
        8: '待转单'
      },
      param: {
        page: 1,
        pay_type: 0
      },
      list: {
        data: []
      },
      loading: true,
      index: -1,
      coach_refund_text: '',
      lockTap: false,
      popupInfo: {
        title: '',
        index: '',
        type: '',
        param: {},
        imgs: [],
        location: {
          lat: 0,
          lng: 0,
          address: ''
        }
      },
      isReset: false,
      duration_time: 600
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
    isUserMedia: function isUserMedia(state) {
      return state.order.isUserMedia;
    },
    recorder: function recorder(state) {
      return state.order.recorder;
    },
    recorder_status: function recorder_status(state) {
      return state.order.recorder_status;
    },
    recorder_order_id: function recorder_order_id(state) {
      return state.order.recorder_order_id;
    },
    order_unix_list: function order_unix_list(state) {
      return state.order.order_unix_list;
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
      var _options$tab, tab;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.options = options;
              _options$tab = options.tab, tab = _options$tab === void 0 ? 0 : _options$tab;
              _this.activeIndex = tab;
              _this.initIndex();
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onUnload: function onUnload() {
    this.toUnload();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    uni.showNavigationBarLoading();
    this.initRefresh();
    uni.stopPullDownRefresh();
  },
  onReachBottom: function onReachBottom() {
    if (this.list.current_page >= this.list.last_page || this.loading) return;
    this.param.page = this.param.page + 1;
    this.loading = true;
    this.getList();
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0, _vuex.mapActions)(['getConfigInfo', 'getCoachInfo', 'toPlayAudio'])), (0, _vuex.mapMutations)(['updateUserItem', 'updateOrderItem'])), {}, {
    initIndex: function initIndex() {
      var _arguments = arguments,
        _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var refresh;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                refresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (!(!_this2.configInfo.id || !_this2.configInfo.hasOwnProperty('free_fare_bear'))) {
                  _context2.next = 4;
                  break;
                }
                _context2.next = 4;
                return _this2.getConfigInfo();
              case 4:
                _context2.next = 6;
                return _this2.getList();
              case 6:
                _this2.$util.setNavigationBarColor({
                  bg: _this2.primaryColor
                });
                if (!refresh) {
                  _context2.next = 9;
                  break;
                }
                return _context2.abrupt("return");
              case 9:
                recorderManager = uni.getRecorderManager();
                //开始录音
                recorderManager.onStart(function () {
                  _this2.$util.log('开始录音');
                });
                //结束录音
                recorderManager.onStop(function (res) {
                  _this2.$util.log('结束录音', res);
                  _this2.handlerOnSave(res);
                  var duration = res.duration;
                  var currentTime = parseInt(duration / 1000);
                  var isReset = _this2.duration_time * 1 - currentTime > 1 ? false : true;
                  _this2.isReset = isReset;
                  if (isReset) {
                    _this2.handlerOnChanger();
                  }
                });
                // 录音异常
                recorderManager.onError(function (e) {
                  _this2.$util.log('录音异常', e);
                });
              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    initRefresh: function initRefresh() {
      uni.pageScrollTo({
        duration: 0,
        scrollTop: 0
      });
      this.param.page = 1;
      this.initIndex(true);
    },
    getList: function getList() {
      var _arguments2 = arguments,
        _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var flag, oldList, param, tabList, activeIndex, newList, arr, ids, order_unix_list, unix_list;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                flag = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : false;
                oldList = _this3.list, param = _this3.param, tabList = _this3.tabList, activeIndex = _this3.activeIndex;
                param.pay_type = tabList[activeIndex].id;
                _context3.next = 5;
                return _this3.$api.technician.orderList(param);
              case 5:
                newList = _context3.sent;
                arr = newList.data.filter(function (aitem) {
                  return aitem.pay_type > 6;
                });
                if (arr.length > 0) {
                  ids = arr.map(function (aitem) {
                    return aitem.id;
                  });
                  order_unix_list = _this3.order_unix_list;
                  unix_list = order_unix_list.filter(function (aitem) {
                    return !ids.includes(aitem.id);
                  });
                  if (unix_list.length !== order_unix_list.length) {
                    _this3.updateOrderItem({
                      key: 'order_unix_list',
                      val: unix_list
                    });
                  }
                }
                if (!flag) {
                  if (_this3.param.page == 1) {
                    _this3.list = newList;
                  } else {
                    newList.data = oldList.data.concat(newList.data);
                    _this3.list = newList;
                  }
                }
                _this3.tabList[0].number = newList.agent_order_count;
                _this3.tabList[1].number = newList.wait_order_count;
                _this3.tabList[2].number = newList.service_order_count;
                _this3.loading = false;
                _this3.$util.hideAll();
              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    handerTabChange: function handerTabChange(index) {
      this.activeIndex = index;
      this.$util.showLoading();
      this.param.page = 1;
      this.getList();
    },
    toUnload: function toUnload() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.updateUserItem({
                  key: 'useChooseLocation',
                  val: false
                });
                _this4.updateOrderItem({
                  key: 'recorder_status',
                  val: false
                });
                _this4.updateOrderItem({
                  key: 'recorder_order_id',
                  val: 0
                });
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 开始录音
    handlerOnChanger: function handlerOnChanger() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var privacyCheck, recorder_status, duration_time;
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
                  type: "record"
                });
              case 6:
                recorder_status = _this5.recorder_status, duration_time = _this5.duration_time;
                if (recorder_status) {
                  recorderManager.stop();
                } else {
                  recorderManager.start({
                    format: 'mp3',
                    duration: duration_time * 1000
                  });
                }
                _this5.updateOrderItem({
                  key: 'recorder_status',
                  val: !recorder_status
                });
              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    handlerOnEnd: function handlerOnEnd() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                recorderManager.stop();
                _this6.updateOrderItem({
                  key: 'recorder_status',
                  val: false
                });
              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    handlerOnSave: function handlerOnSave() {
      var _arguments3 = arguments,
        _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var res, filePath, tempFilePath, _yield$_this7$$api$ba, link, order_id;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                res = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : {};
                _this7.$util.showLoading({
                  title: "\u5F55\u97F3\u4E0A\u4F20\u4E2D"
                });
                filePath = '';
                tempFilePath = res.tempFilePath;
                filePath = tempFilePath;
                _context7.next = 7;
                return _this7.$api.base.uploadFile({
                  filePath: filePath,
                  formData: {
                    type: 'audio'
                  }
                });
              case 7:
                _yield$_this7$$api$ba = _context7.sent;
                link = _yield$_this7$$api$ba.attachment_path;
                order_id = _this7.recorder_order_id;
                _context7.next = 12;
                return _this7.$api.technician.recordingAdd({
                  order_id: order_id,
                  link: link
                });
              case 12:
                _this7.$util.hideAll();
              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    // 服务倒计时结束
    toCountDownEnd: function toCountDownEnd(id) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var recorder_status, recorder_order_id, data, time_long, _data$start_service_t, start_service_time, unix;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                recorder_status = _this8.recorder_status, recorder_order_id = _this8.recorder_order_id;
                if (!(recorder_order_id == id && recorder_status)) {
                  _context8.next = 10;
                  break;
                }
                _context8.next = 4;
                return _this8.$api.technician.orderInfo({
                  id: id
                });
              case 4:
                data = _context8.sent;
                time_long = data.total_time_long, _data$start_service_t = data.start_service_time, start_service_time = _data$start_service_t === void 0 ? '' : _data$start_service_t;
                unix = Math.ceil(((_this8.$util.DateToUnix(start_service_time) + time_long * 60) * 1000 - new Date().getTime()) / 1000);
                if (!(unix < 1)) {
                  _context8.next = 10;
                  break;
                }
                _context8.next = 10;
                return _this8.handlerOnEnd();
              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    // 拒绝接单
    toRefuse: function toRefuse(index) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this9.index = index;
                _this9.coach_refund_text = '';
                _this9.$refs.refuse_item.open();
              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    // 确认：拒绝接单
    confirmRefuse: function confirmRefuse() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var coach_refund_text, index;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                coach_refund_text = _this10.coach_refund_text;
                coach_refund_text = coach_refund_text.length > 0 ? coach_refund_text.replace(/(^\s*)|(\s*$)/g, "") : '';
                if (!(coach_refund_text.length == 0)) {
                  _context10.next = 5;
                  break;
                }
                _this10.$util.showToast({
                  title: "\u8BF7\u8F93\u5165\u62D2\u5355\u539F\u56E0"
                });
                return _context10.abrupt("return");
              case 5:
                _this10.coach_refund_text = _this10.coach_refund_text.substring(0, 200);
                index = _this10.index;
                _this10.toConfirm(index, -1);
              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    // 获取定位
    toGetLocation: function toGetLocation() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var _this11$popupInfo$loc, _this11$popupInfo$loc2, lat, _this11$popupInfo$loc3, lng, _this11$popupInfo$loc4, address;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this11$popupInfo$loc = _this11.popupInfo.location, _this11$popupInfo$loc2 = _this11$popupInfo$loc.lat, lat = _this11$popupInfo$loc2 === void 0 ? '' : _this11$popupInfo$loc2, _this11$popupInfo$loc3 = _this11$popupInfo$loc.lng, lng = _this11$popupInfo$loc3 === void 0 ? '' : _this11$popupInfo$loc3, _this11$popupInfo$loc4 = _this11$popupInfo$loc.address, address = _this11$popupInfo$loc4 === void 0 ? '' : _this11$popupInfo$loc4;
                if (!(lat && lng && address)) {
                  _context11.next = 3;
                  break;
                }
                return _context11.abrupt("return");
              case 3:
                _this11.getUtilLocation();
              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    getUtilLocation: function getUtilLocation() {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var _yield$_this12$$util$, _yield$_this12$$util$2, lat, _yield$_this12$$util$3, lng;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _this12.updateUserItem({
                  key: 'useChooseLocation',
                  val: true
                });
                _context12.next = 3;
                return _this12.$util.getLocation();
              case 3:
                _yield$_this12$$util$ = _context12.sent;
                _yield$_this12$$util$2 = _yield$_this12$$util$.lat;
                lat = _yield$_this12$$util$2 === void 0 ? 0 : _yield$_this12$$util$2;
                _yield$_this12$$util$3 = _yield$_this12$$util$.lng;
                lng = _yield$_this12$$util$3 === void 0 ? 0 : _yield$_this12$$util$3;
                _this12.initUtilLocaData(lat, lng);
              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    initUtilLocaData: function initUtilLocaData(lat, lng) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var _yield$_this13$$util$, address, location, data;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _this13.updateUserItem({
                  key: 'useChooseLocation',
                  val: false
                });
                if (!(!lat && !lng)) {
                  _context13.next = 5;
                  break;
                }
                _this13.$util.showToast({
                  title: "\u83B7\u53D6\u4F4D\u7F6E\u4FE1\u606F\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
                });
                _this13.$util.hideAll();
                return _context13.abrupt("return");
              case 5:
                _this13.$util.showLoading();
                // 优化0112
                _context13.next = 8;
                return _this13.$util.getMapAddr({
                  lat: lat,
                  lng: lng
                });
              case 8:
                _yield$_this13$$util$ = _context13.sent;
                address = _yield$_this13$$util$.address;
                location = {
                  lat: lat,
                  lng: lng,
                  address: address
                };
                _this13.$util.updateCoachAddr(location);
                data = Object.assign({}, _this13.popupInfo, {
                  location: location
                });
                _this13.$nextTick(function () {
                  _this13.popupInfo = data;
                });
                _this13.$util.hideAll();
              case 15:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    },
    imgUpload: function imgUpload(e) {
      var imagelist = e.imagelist,
        imgtype = e.imgtype;
      this.popupInfo[imgtype] = imagelist;
    },
    // 确认： 4已出发/5已到达/7已完成
    confirmOper: function confirmOper() {
      var popupInfo = this.$util.deepCopy(this.popupInfo);
      var index = popupInfo.index,
        type = popupInfo.type,
        param = popupInfo.param,
        imgs = popupInfo.imgs,
        location = popupInfo.location;
      var _location$lat = location.lat,
        lat = _location$lat === void 0 ? 0 : _location$lat,
        _location$lng = location.lng,
        lng = _location$lng === void 0 ? 0 : _location$lng,
        _location$address = location.address,
        address = _location$address === void 0 ? '' : _location$address;
      if ([5, 7].includes(type) && imgs.length === 0) {
        this.$util.showToast({
          title: "\u8BF7\u5148\u62CD\u7167"
        });
        return;
      }
      if (!lat && !lng) {
        this.$util.showToast({
          title: "\u8BF7\u5148\u83B7\u53D6\u5F53\u524D\u4F4D\u7F6E\u4FE1\u606F"
        });
        return;
      }
      if ([5, 7].includes(type)) {
        var path = imgs[0].path;
        location.path = path;
      }
      this.toConfirmUpdate(index, type, param, location);
    },
    // type: -1拒绝接单，3确定接单，4已出发，5已到达，6开始服务，7已完成
    toConfirm: function toConfirm(index, type) {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
        var order_id, param, arr, title;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!_this14.lockTap) {
                  _context14.next = 2;
                  break;
                }
                return _context14.abrupt("return");
              case 2:
                order_id = _this14.list.data[index].id;
                order_id = order_id * 1;
                param = {
                  order_id: order_id,
                  type: type
                };
                if (type == -1) {
                  param.coach_refund_text = _this14.coach_refund_text;
                }
                if ([4, 5, 7].includes(type)) {
                  arr = {
                    4: '确认出发',
                    5: '确认到达',
                    7: '确认完成'
                  };
                  title = arr[type];
                  _this14.popupInfo = Object.assign({}, _this14.popupInfo, {
                    title: title,
                    index: index,
                    type: type,
                    param: param,
                    imgs: [],
                    location: {
                      lat: 0,
                      lng: 0,
                      address: ''
                    }
                  });
                  _this14.$refs.oper_item.open();
                } else {
                  _this14.toConfirmUpdate(index, type, param);
                }
              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }))();
    },
    toConfirmUpdate: function toConfirmUpdate(index, type, param) {
      var _arguments4 = arguments,
        _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
        var location, lat, lng, address, path, msg, _this15$configInfo, plugAuth, service_recording_show, recording, isUserMedia, recorder_order_id, recorder_status, flag, order_id, order_info, _order_info, pay_type, _yield$uni$showModal, _yield$uni$showModal2, res_del, confirm, _yield$_this15$$api$t, time_long, start_service_time, start_service_time_unix, unix_items, order_unix_list, unixInd;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                location = _arguments4.length > 3 && _arguments4[3] !== undefined ? _arguments4[3] : {};
                if ([4, 5, 7].includes(type)) {
                  lat = location.lat, lng = location.lng, address = location.address, path = location.path;
                  if (type === 4) {
                    param.serout_lat = lat;
                    param.serout_lng = lng;
                    param.serout_address = address;
                  }
                  if (type == 5) {
                    param.arrive_img = path;
                    param.arr_lat = lat;
                    param.arr_lng = lng;
                    param.arr_address = address;
                  }
                  if (type == 7) {
                    param.end_img = path;
                    param.end_lat = lat;
                    param.end_lng = lng;
                    param.end_address = address;
                  }
                }
                msg = {
                  '-1': '已拒绝接单',
                  3: '接单成功',
                  4: '已成功出发',
                  5: '已成功到达',
                  6: '已开始服务',
                  7: '服务已完成'
                };
                if (!_this15.lockTap) {
                  _context15.next = 5;
                  break;
                }
                return _context15.abrupt("return");
              case 5:
                _this15.lockTap = true;
                _this15$configInfo = _this15.configInfo, plugAuth = _this15$configInfo.plugAuth, service_recording_show = _this15$configInfo.service_recording_show;
                recording = plugAuth.recording;
                isUserMedia = _this15.isUserMedia, recorder_order_id = _this15.recorder_order_id, recorder_status = _this15.recorder_status;
                flag = true;
                order_id = param.order_id;
                order_info = {};
                _context15.prev = 12;
                _context15.next = 15;
                return _this15.$api.technician.orderInfo({
                  id: order_id
                });
              case 15:
                order_info = _context15.sent;
                _context15.next = 27;
                break;
              case 18:
                _context15.prev = 18;
                _context15.t0 = _context15["catch"](12);
                if (type == -1) {
                  _this15.$refs.refuse_item.close();
                }
                if ([4, 5, 7].includes(type)) {
                  _this15.$refs.oper_item.close();
                }
                _this15.param.page = 1;
                _this15.getList();
                _this15.lockTap = false;
                _this15.$util.hideAll();
                return _context15.abrupt("return");
              case 27:
                _order_info = order_info, pay_type = _order_info.pay_type;
                if (!(pay_type == 7 && recorder_order_id == order_id && recorder_status)) {
                  _context15.next = 31;
                  break;
                }
                _context15.next = 31;
                return _this15.handlerOnEnd();
              case 31:
                if (!(pay_type < type && type === 6 && recorder_order_id != order_id && recorder_status)) {
                  _context15.next = 44;
                  break;
                }
                _context15.next = 34;
                return uni.showModal({
                  title: '提示',
                  content: "已有开始的服务还未结束录音，请确认是否完成录音并开始新的服务？"
                });
              case 34:
                _yield$uni$showModal = _context15.sent;
                _yield$uni$showModal2 = (0, _slicedToArray2.default)(_yield$uni$showModal, 2);
                res_del = _yield$uni$showModal2[0];
                confirm = _yield$uni$showModal2[1].confirm;
                if (!confirm) {
                  _context15.next = 43;
                  break;
                }
                _context15.next = 41;
                return _this15.handlerOnEnd();
              case 41:
                _context15.next = 44;
                break;
              case 43:
                flag = false;
              case 44:
                _this15.$util.showLoading();
                if (flag) {
                  _context15.next = 49;
                  break;
                }
                _this15.lockTap = false;
                _this15.$util.hideAll();
                return _context15.abrupt("return");
              case 49:
                _context15.prev = 49;
                if (type == -1) {
                  _this15.$refs.refuse_item.close();
                }
                if ([4, 5, 7].includes(type)) {
                  _this15.$refs.oper_item.close();
                }
                _context15.next = 54;
                return _this15.$api.technician.updateOrder(param);
              case 54:
                if (type == 4 || type == 5) {
                  _this15.list.data[index].pay_type = type;
                  _this15.updateOrderItem({
                    key: type == 4 ? 'coach_travel_order_id' : 'coach_travel_arrive_id',
                    val: order_id
                  });
                } else {
                  _this15.list.data.splice(index, 1);
                }
                if (!(type == 6)) {
                  _context15.next = 74;
                  break;
                }
                _this15.toPlayAudio({
                  key: 'service_start_recording'
                });
                if (!(isUserMedia && recording && service_recording_show)) {
                  _context15.next = 63;
                  break;
                }
                _this15.$util.hideAll();
                _context15.next = 61;
                return uni.showModal({
                  title: '提示',
                  content: "服务过程将自动录音，直至服务结束！若录音中退出页面将不会记录录音的音频！",
                  showCancel: false,
                  confirmText: '知道了'
                });
              case 61:
                _this15.updateOrderItem({
                  key: 'recorder_order_id',
                  val: order_id
                });
                _this15.handlerOnChanger();
              case 63:
                _context15.next = 65;
                return _this15.$api.technician.orderInfo({
                  id: order_id
                });
              case 65:
                _yield$_this15$$api$t = _context15.sent;
                time_long = _yield$_this15$$api$t.total_time_long;
                start_service_time = _yield$_this15$$api$t.start_service_time;
                start_service_time_unix = _this15.$util.DateToUnix(start_service_time) + time_long * 60;
                unix_items = {
                  id: order_id,
                  time_long: time_long,
                  start_service_time: start_service_time,
                  start_service_time_unix: start_service_time_unix
                };
                order_unix_list = _this15.order_unix_list;
                unixInd = order_unix_list.findIndex(function (item) {
                  return item.id === order_id;
                });
                if (unixInd != -1) {
                  order_unix_list[unixInd] = unix_items;
                } else {
                  order_unix_list.push(unix_items);
                }
                _this15.updateOrderItem({
                  key: 'order_unix_list',
                  val: order_unix_list
                });
              case 74:
                if (!(type == 7)) {
                  _context15.next = 78;
                  break;
                }
                if (!(recorder_order_id == order_id && recorder_status)) {
                  _context15.next = 78;
                  break;
                }
                _context15.next = 78;
                return _this15.handlerOnEnd();
              case 78:
                _this15.$util.hideAll();
                _this15.$util.showToast({
                  title: msg[type]
                });
                _context15.next = 82;
                return _this15.getList(true);
              case 82:
                setTimeout(function () {
                  _this15.lockTap = false;
                  if (type == 7) {
                    _this15.getCoachInfo();
                  }
                }, 500);
                _context15.next = 88;
                break;
              case 85:
                _context15.prev = 85;
                _context15.t1 = _context15["catch"](49);
                setTimeout(function () {
                  _this15.param.page = 1;
                  _this15.getList();
                  _this15.lockTap = false;
                  _this15.$util.hideAll();
                  if (type == 7) {
                    _this15.getCoachInfo();
                  }
                }, 2000);
              case 88:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[12, 18], [49, 85]]);
      }))();
    },
    // 屏蔽用户
    toShield: function toShield(index) {
      this.index = index;
      var _this$configInfo$bloc = this.configInfo.block_user_type,
        block_user_type = _this$configInfo$bloc === void 0 ? 1 : _this$configInfo$bloc;
      if (block_user_type == 1) {
        this.$refs.shield_item.open();
        return;
      }
      this.$util.goUrl({
        url: "/user/pages/feedback/box?blockuser=1&index=".concat(index)
      });
    },
    // 确认：屏蔽用户
    confirmShield: function confirmShield() {
      var _this16 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var index, user_id;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                index = _this16.index;
                if (!_this16.lockTap) {
                  _context16.next = 3;
                  break;
                }
                return _context16.abrupt("return");
              case 3:
                _this16.lockTap = true;
                _this16.$util.showLoading();
                user_id = _this16.list.data[index].user_id;
                _context16.prev = 6;
                _context16.next = 9;
                return _this16.$api.technician.shieldUserAdd({
                  user_id: user_id
                });
              case 9:
                _this16.$util.hideAll();
                _this16.$refs.shield_item.close();
                _this16.$util.showToast({
                  title: "\u5C4F\u853D\u6210\u529F"
                });
                _this16.initRefresh();
                setTimeout(function () {
                  _this16.lockTap = false;
                }, 1000);
                _context16.next = 19;
                break;
              case 16:
                _context16.prev = 16;
                _context16.t0 = _context16["catch"](6);
                setTimeout(function () {
                  _this16.lockTap = false;
                  _this16.$util.hideAll();
                }, 2000);
              case 19:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[6, 16]]);
      }))();
    },
    // 联系客户
    toTel: function toTel(index) {
      var _this17 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17() {
        var id, url;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                id = _this17.list.data[index].id;
                _context17.next = 3;
                return _this17.$api.technician.getVirtualPhone({
                  order_id: id
                });
              case 3:
                url = _context17.sent;
                if (url) {
                  _context17.next = 7;
                  break;
                }
                _this17.$util.showToast({
                  title: "\u7A0D\u540E\u4F1A\u6709\u7535\u8BDD\u6253\u5165\uFF0C\u8BF7\u6CE8\u610F\u63A5\u542C\u54E6"
                });
                return _context17.abrupt("return");
              case 7:
                _this17.$util.goUrl({
                  url: url,
                  openType: "call"
                });
              case 8:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }))();
    },
    // 订单详情
    goDetail: function goDetail(index) {
      var id = this.list.data[index].id;
      var url = "/technician/pages/order/detail?id=".concat(id);
      this.$util.goUrl({
        url: url
      });
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[985,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/technician/pages/order/list.js.map