(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["agent/pages/order/list"],{

/***/ 781:
/*!********************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/main.js?{"page":"agent%2Fpages%2Forder%2Flist"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _list = _interopRequireDefault(__webpack_require__(/*! ./agent/pages/order/list.vue */ 782));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 782:
/*!***********************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/order/list.vue ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.vue?vue&type=template&id=c4163e7c& */ 783);
/* harmony import */ var _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.vue?vue&type=script&lang=js& */ 785);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 69);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "agent/pages/order/list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 783:
/*!******************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/order/list.vue?vue&type=template&id=c4163e7c& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=template&id=c4163e7c& */ 784);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_c4163e7c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 784:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/order/list.vue?vue&type=template&id=c4163e7c& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var l0 = _vm.isLoad
    ? _vm.__map(_vm.list.data, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var g0 = !(item.pay_type == 2)
          ? [3, 4, 5].includes(item.pay_type)
          : null
        var m0 = _vm.$t("action.attendantName")
        var g1 =
          ([2, 3, 4, 5, 6, 8].includes(item.pay_type) && !item.is_add) ||
          ((([2, 3, 6].includes(item.pay_type) && item.add_flow_path === 1) ||
            (item.pay_type == 2 && item.add_flow_path == 2)) &&
            item.is_add)
        var m1 = g1
          ? _vm.$t(
              "action." +
                _vm.technicianStatusOperType[
                  item.pay_type === 3 && (item.store_id || item.is_add)
                    ? 5
                    : item.pay_type == 8
                    ? -1
                    : item.pay_type
                ]
            )
          : null
        return {
          $orig: $orig,
          g0: g0,
          m0: m0,
          g1: g1,
          m1: m1,
        }
      })
    : null
  var g2 =
    _vm.isLoad && _vm.loading
      ? _vm.list.current_page >= _vm.list.last_page && _vm.list.data.length > 0
      : null
  var g3 = _vm.isLoad
    ? !_vm.loading && _vm.list.data.length <= 0 && _vm.list.current_page == 1
    : null
  var m2 = _vm.isLoad
    ? _vm.$t("action." + _vm.technicianStatusOperType[_vm.popupInfo.text_type])
    : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, item) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item = _temp2.item
      var _temp, _temp2
      $event.stopPropagation()
      return _vm.$util.goUrl({
        url:
          "/agent/pages/order/change?id=" +
          item.id +
          "&agent=" +
          _vm.options.agent,
      })
    }
    _vm.e1 = function ($event) {
      $event.stopPropagation()
      return _vm.$refs.change_item.close()
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        g2: g2,
        g3: g3,
        m2: m2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 785:
/*!************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/order/list.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=script&lang=js& */ 786);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 786:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/agent/pages/order/list.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _default = {
  components: {},
  data: function data() {
    return {
      isLoad: false,
      options: {},
      activeIndex: 0,
      tabList: [],
      tabOrderList: [{
        title: '全部',
        id: 0
      }, {
        title: '已取消',
        id: -1
      }, {
        title: '待接单',
        id: 2,
        number: 0
      }, {
        title: '已接单',
        id: 3,
        number: 0
      }, {
        title: '已出发',
        id: 4,
        number: 0
      }, {
        title: '已到达',
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
      tabBellList: [{
        title: '全部',
        id: 0
      }, {
        title: '已取消',
        id: -1
      }, {
        title: '待接单',
        id: 2,
        number: 0
      }, {
        title: '已接单',
        id: 3,
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
        '-1': '已取消',
        1: '待支付',
        2: '待接单',
        3: '已接单',
        4: '已出发',
        5: '已到达',
        6: '服务中',
        7: '已完成',
        8: '待转单'
      },
      technicianStatusOperType: {
        '-1': 'agreeRefund',
        2: 'orderTaking',
        3: 'setOut',
        4: 'arrive',
        5: 'startService',
        6: 'serviceCompletion',
        8: 'transferOrder'
      },
      param: {
        page: 1,
        pay_type: 0,
        order_code: ''
      },
      list: {
        data: []
      },
      loading: true,
      index: -1,
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
      }
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
    }
  }),
  onLoad: function onLoad(options) {
    var _options$agent = options.agent,
      agent = _options$agent === void 0 ? 0 : _options$agent,
      _options$bell = options.bell,
      bell = _options$bell === void 0 ? 0 : _options$bell,
      _options$tab = options.tab,
      tab = _options$tab === void 0 ? 0 : _options$tab;
    options.agent = agent * 1;
    options.bell = bell * 1;
    this.options = options;
    uni.setNavigationBarTitle({
      title: tab == 8 ? '拒单管理' : bell == 1 ? '加钟管理' : '订单管理'
    });
    this.tabList = tab == 8 ? [] : bell == 1 ? this.tabBellList : this.tabOrderList;
    this.activeIndex = tab;
    this.initIndex();
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
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0, _vuex.mapActions)(['getConfigInfo'])), (0, _vuex.mapMutations)(['updateTechnicianItem'])), {}, {
    initIndex: function initIndex() {
      var _arguments = arguments,
        _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var refresh;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                refresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (!(!_this.configInfo.id || refresh)) {
                  _context.next = 4;
                  break;
                }
                _context.next = 4;
                return _this.getConfigInfo();
              case 4:
                _context.next = 6;
                return _this.getList();
              case 6:
                _this.isLoad = true;
                _this.$util.setNavigationBarColor({
                  bg: _this.primaryColor
                });
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    initRefresh: function initRefresh() {
      this.param.page = 1;
      this.initIndex(true);
    },
    toSearch: function toSearch(val) {
      this.param.page = 1;
      this.param.order_code = val;
      this.getList();
    },
    getList: function getList() {
      var _arguments2 = arguments,
        _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var flag, oldList, param, tabList, activeIndex, _this2$options, _this2$options$tab, tab, _this2$options$bell, bell, _this2$options$agent, agent, methodKey, newList;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                flag = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : false;
                oldList = _this2.list, param = _this2.param, tabList = _this2.tabList, activeIndex = _this2.activeIndex;
                _this2$options = _this2.options, _this2$options$tab = _this2$options.tab, tab = _this2$options$tab === void 0 ? 0 : _this2$options$tab, _this2$options$bell = _this2$options.bell, bell = _this2$options$bell === void 0 ? 0 : _this2$options$bell, _this2$options$agent = _this2$options.agent, agent = _this2$options$agent === void 0 ? 0 : _this2$options$agent;
                methodKey = agent ? 'agent' : 'admin';
                param.pay_type = tab == 8 ? 8 : tabList[activeIndex].id;
                if (tab != 8) {
                  param.is_add = bell;
                }
                _context2.next = 8;
                return _this2.$api[methodKey].orderList(param);
              case 8:
                newList = _context2.sent;
                if (!flag) {
                  if (_this2.param.page == 1) {
                    _this2.list = newList;
                  } else {
                    newList.data = oldList.data.concat(newList.data);
                    _this2.list = newList;
                  }
                }
                _this2.loading = false;
                _this2.$util.hideAll();
              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    handerTabChange: function handerTabChange(index) {
      this.activeIndex = index;
      this.$util.showLoading();
      this.param.page = 1;
      this.getList();
    },
    // type: -1拒绝接单，3确定接单，4已出发，5已到达，6开始服务，7已完成
    toConfirm: function toConfirm(index) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this3$list$data$inde, order_id, pay_type, can_refund_price, _this3$list$data$inde2, is_add, _this3$list$data$inde3, store_id, _this3$list$data$inde4, add_flow_path, type;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this3.lockTap) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _this3$list$data$inde = _this3.list.data[index], order_id = _this3$list$data$inde.id, pay_type = _this3$list$data$inde.pay_type, can_refund_price = _this3$list$data$inde.can_refund_price, _this3$list$data$inde2 = _this3$list$data$inde.is_add, is_add = _this3$list$data$inde2 === void 0 ? 0 : _this3$list$data$inde2, _this3$list$data$inde3 = _this3$list$data$inde.store_id, store_id = _this3$list$data$inde3 === void 0 ? 0 : _this3$list$data$inde3, _this3$list$data$inde4 = _this3$list$data$inde.add_flow_path, add_flow_path = _this3$list$data$inde4 === void 0 ? 1 : _this3$list$data$inde4;
                type = is_add && pay_type == 2 && add_flow_path == 2 || pay_type === 3 && (is_add || store_id) ? 5 : pay_type == 8 ? -1 : pay_type;
                _this3.popupInfo = {
                  index: index,
                  order_id: order_id,
                  type: type,
                  text_type: is_add && pay_type == 2 ? 2 : type,
                  can_refund_price: can_refund_price
                };
                _this3.$refs.change_item.open();
              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // pay_type 2待接单，3接单，4出发，5到达，6服务中，7已完成  
    confirmChangeOrder: function confirmChangeOrder() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var param, index, type, text_type, is_add, text, len, _agent, _methodKey, _yield$_this4$$api$_m, pay_type, _yield$_this4$$api$_m2, add_service, _yield$uni$showModal, _yield$uni$showModal2, res_del, confirm, activeIndex, technicianStatusOperType, msg, agent, methodKey;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                param = _this4.$util.deepCopy(_this4.popupInfo);
                index = param.index, type = param.type, text_type = param.text_type;
                param.type = type == -1 ? type : type + 1;
                is_add = _this4.list.data[index].is_add;
                text = "";
                len = 0;
                if (!(param.type == 7 && !is_add)) {
                  _context4.next = 17;
                  break;
                }
                _agent = _this4.options.agent;
                _methodKey = _agent ? 'agent' : 'admin';
                _context4.next = 11;
                return _this4.$api[_methodKey].orderInfo({
                  id: param.order_id
                });
              case 11:
                _yield$_this4$$api$_m = _context4.sent;
                pay_type = _yield$_this4$$api$_m.pay_type;
                _yield$_this4$$api$_m2 = _yield$_this4$$api$_m.add_service;
                add_service = _yield$_this4$$api$_m2 === void 0 ? [] : _yield$_this4$$api$_m2;
                len = add_service.length;
                if (add_service && add_service.length > 0) {
                  add_service.map(function (item) {
                    text += "\u3010".concat(item, "\u3011");
                  });
                }
              case 17:
                if (!(text && text.length > 0)) {
                  _context4.next = 27;
                  break;
                }
                _context4.next = 20;
                return uni.showModal({
                  content: "\u8BE5\u8BA2\u5355\u8FD8\u6709".concat(text).concat(len, "\u9879\u52A0\u949F\u670D\u52A1\uFF0C\u5B8C\u6210\u4E3B\u8BA2\u5355\u4F1A\u5C06\u52A0\u949F\u8BA2\u5355\u4E00\u5E76\u7ED3\u675F\uFF0C\u786E\u8BA4\u662F\u5426\u7ED3\u675F\uFF1F"),
                  confirmText: "\u786E\u8BA4"
                });
              case 20:
                _yield$uni$showModal = _context4.sent;
                _yield$uni$showModal2 = (0, _slicedToArray2.default)(_yield$uni$showModal, 2);
                res_del = _yield$uni$showModal2[0];
                confirm = _yield$uni$showModal2[1].confirm;
                if (confirm) {
                  _context4.next = 27;
                  break;
                }
                _this4.$refs.change_item.close();
                return _context4.abrupt("return");
              case 27:
                delete param.index;
                delete param.can_refund_price;
                delete param.text_type;
                activeIndex = _this4.activeIndex, technicianStatusOperType = _this4.technicianStatusOperType;
                msg = text_type == -1 ? '退款成功' : "\u64CD\u4F5C\u6210\u529F";
                if (!_this4.lockTap) {
                  _context4.next = 34;
                  break;
                }
                return _context4.abrupt("return");
              case 34:
                _this4.lockTap = true;
                _this4.$util.showLoading();
                agent = _this4.options.agent;
                methodKey = agent ? 'agent' : 'admin';
                _context4.prev = 38;
                _this4.$refs.change_item.close();
                _context4.next = 42;
                return _this4.$api[methodKey].adminUpdateOrder(param);
              case 42:
                _this4.$util.showToast({
                  title: msg
                });
                if (activeIndex == 0) {
                  _this4.list.data[index].pay_type = param.type;
                } else {
                  _this4.list.data.splice(index, 1);
                }
                _this4.$util.hideAll();
                _this4.updateTechnicianItem({
                  key: 'haveOperItem',
                  val: true
                });
                if (!activeIndex) {
                  _context4.next = 49;
                  break;
                }
                _context4.next = 49;
                return _this4.getList(true);
              case 49:
                setTimeout(function () {
                  _this4.lockTap = false;
                }, 500);
                _context4.next = 56;
                break;
              case 52:
                _context4.prev = 52;
                _context4.t0 = _context4["catch"](38);
                _this4.updateTechnicianItem({
                  key: 'haveOperItem',
                  val: true
                });
                setTimeout(function () {
                  _this4.param.page = 1;
                  _this4.getList();
                  _this4.lockTap = false;
                  _this4.$util.hideAll();
                }, 2000);
              case 56:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[38, 52]]);
      }))();
    },
    // 订单详情
    goDetail: function goDetail(index) {
      var id = this.list.data[index].id;
      var agent = this.options.agent;
      var url = "/agent/pages/order/detail?id=".concat(id, "&agent=").concat(agent);
      this.$util.goUrl({
        url: url
      });
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[781,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/agent/pages/order/list.js.map