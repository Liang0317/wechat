(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["shopstore/pages/store-list"],{

/***/ 1079:
/*!**********************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/main.js?{"page":"shopstore%2Fpages%2Fstore-list"} ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _storeList = _interopRequireDefault(__webpack_require__(/*! ./shopstore/pages/store-list.vue */ 1080));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_storeList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 1080:
/*!***************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/shopstore/pages/store-list.vue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store-list.vue?vue&type=template&id=7a948ab2& */ 1081);
/* harmony import */ var _store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store-list.vue?vue&type=script&lang=js& */ 1083);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 69);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "shopstore/pages/store-list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1081:
/*!**********************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/shopstore/pages/store-list.vue?vue&type=template&id=7a948ab2& ***!
  \**********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./store-list.vue?vue&type=template&id=7a948ab2& */ 1082);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_template_id_7a948ab2___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1082:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/shopstore/pages/store-list.vue?vue&type=template&id=7a948ab2& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.loading
    ? _vm.list.current_page >= _vm.list.last_page && _vm.list.data.length > 0
    : null
  var g1 =
    !_vm.loading && _vm.list.data.length <= 0 && _vm.list.current_page == 1
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1083:
/*!****************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/shopstore/pages/store-list.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./store-list.vue?vue&type=script&lang=js& */ 1084);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_store_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1084:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/shopstore/pages/store-list.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var shopstoreListItem = function shopstoreListItem() {
  __webpack_require__.e(/*! require.ensure | components/shopstore-list-item */ "components/shopstore-list-item").then((function () {
    return resolve(__webpack_require__(/*! @/components/shopstore-list-item.vue */ 1362));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    shopstoreListItem: shopstoreListItem
  },
  data: function data() {
    return {
      options: {},
      loading: true,
      param: {
        page: 1
      },
      list: {
        data: []
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
    userInfo: function userInfo(state) {
      return state.user.userInfo;
    },
    location: function location(state) {
      return state.user.location;
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
    var title = options.title;
    this.options = options;
    this.$util.setNavigationBarColor({
      bg: this.primaryColor
    });
    uni.setNavigationBarTitle({
      title: title
    });
    this.$util.showLoading();
    this.initIndex();
  },
  onShow: function onShow() {
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
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
  watch: {
    changeOnAddr: function changeOnAddr(newval, oldval) {
      var noloca = this.noChangeLoca.noloca;
      if (newval && noloca) {
        this.initUtilLocaData();
      }
    },
    noChangeLoca: function noChangeLoca(newval, oldval) {
      var _this = this;
      setTimeout(function () {
        var _this$changeOnAddr = _this.changeOnAddr,
          lat = _this$changeOnAddr.lat,
          lng = _this$changeOnAddr.lng,
          _this$changeOnAddr$un = _this$changeOnAddr.unix,
          unix = _this$changeOnAddr$un === void 0 ? 0 : _this$changeOnAddr$un;
        var noloca = _this.noChangeLoca.noloca;
        var cur_unix = _this.$util.DateToUnix(_this.$util.formatTime(new Date(), 'YY-M-D h:m:s'));
        if (noloca && (!lat && !lng || !unix || unix && cur_unix - unix >= 1)) {
          _this.getUtilLocation();
        }
      }, 800);
    }
  },
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem', 'updateDynamicItem', 'updateShopstoreItem'])), {}, {
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
                _this2.getList();
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    initRefresh: function initRefresh() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.param.page = 1;
                _context3.next = 3;
                return _this3.initIndex(true);
              case 3:
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
    getList: function getList() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var location, _this5$userCoachStatu, coach_status, coach_position, privacyCheck, _this5$changeOnAddr, _this5$changeOnAddr$l, change_lat, _this5$changeOnAddr$l2, change_lng, _this5$changeOnAddr$u, unix, cur_unix, noloca, loca;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                location = _this5.location;
                _this5$userCoachStatu = _this5.userCoachStatus, coach_status = _this5$userCoachStatu.status, coach_position = _this5$userCoachStatu.coach_position;
                if (!(_this5.param.page == 1 && (!location.lat || location.lat && location.address == '暂未获取到位置信息'))) {
                  _context5.next = 23;
                  break;
                }
                privacyCheck = _this5.$refs.user_privacy.check();
                if (!privacyCheck) {
                  _context5.next = 9;
                  break;
                }
                _this5.$refs.user_privacy.open();
                _this5.loading = false;
                _this5.$util.hideAll();
                return _context5.abrupt("return");
              case 9:
                if (!(coach_status == 2 && coach_position)) {
                  _context5.next = 20;
                  break;
                }
                _this5$changeOnAddr = _this5.changeOnAddr, _this5$changeOnAddr$l = _this5$changeOnAddr.lat, change_lat = _this5$changeOnAddr$l === void 0 ? 0 : _this5$changeOnAddr$l, _this5$changeOnAddr$l2 = _this5$changeOnAddr.lng, change_lng = _this5$changeOnAddr$l2 === void 0 ? 0 : _this5$changeOnAddr$l2, _this5$changeOnAddr$u = _this5$changeOnAddr.unix, unix = _this5$changeOnAddr$u === void 0 ? 0 : _this5$changeOnAddr$u;
                cur_unix = _this5.$util.DateToUnix(_this5.$util.formatTime(new Date(), 'YY-M-D h:m:s'));
                noloca = change_lat && change_lng && unix && cur_unix - unix < 3 ? false : true;
                if (!noloca) {
                  loca = Object.assign({}, _this5.location, {
                    lat: change_lat,
                    lng: change_lng,
                    is_util_loca: 1
                  });
                  _this5.updateUserItem({
                    key: 'location',
                    val: loca
                  });
                }
                _this5.updateUserItem({
                  key: 'noChangeLoca',
                  val: {
                    noloca: noloca
                  }
                });
                if (!_this5.noChangeLoca.noloca) {
                  _context5.next = 17;
                  break;
                }
                return _context5.abrupt("return");
              case 17:
                _this5.initUtilLocaData();
                _context5.next = 21;
                break;
              case 20:
                _this5.getUtilLocation();
              case 21:
                _this5.updateMapItem({
                  key: 'pageActive',
                  val: false
                });
                return _context5.abrupt("return");
              case 23:
                _this5.initUtilLocaData();
              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    getUtilLocation: function getUtilLocation() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var _yield$_this6$$util$g, _yield$_this6$$util$g2, lat, _yield$_this6$$util$g3, lng, val;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this6.$util.getLocation();
              case 2:
                _yield$_this6$$util$g = _context6.sent;
                _yield$_this6$$util$g2 = _yield$_this6$$util$g.lat;
                lat = _yield$_this6$$util$g2 === void 0 ? 0 : _yield$_this6$$util$g2;
                _yield$_this6$$util$g3 = _yield$_this6$$util$g.lng;
                lng = _yield$_this6$$util$g3 === void 0 ? 0 : _yield$_this6$$util$g3;
                val = Object.assign({}, _this6.location, {
                  lat: lat,
                  lng: lng,
                  is_util_loca: 1
                });
                _this6.updateUserItem({
                  key: 'location',
                  val: val
                });
                _this6.initUtilLocaData();
              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    initUtilLocaData: function initUtilLocaData() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var oldList, _this7$options$id, cate_id, _this7$location, _this7$location$lat, lat, _this7$location$lng, lng, _this7$location$is_ut, is_util_loca, param, newList;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this7.updateUserItem({
                  key: 'noChangeLoca',
                  val: {
                    noloca: false
                  }
                });
                oldList = _this7.list;
                _this7$options$id = _this7.options.id, cate_id = _this7$options$id === void 0 ? 0 : _this7$options$id;
                _this7$location = _this7.location, _this7$location$lat = _this7$location.lat, lat = _this7$location$lat === void 0 ? 0 : _this7$location$lat, _this7$location$lng = _this7$location.lng, lng = _this7$location$lng === void 0 ? 0 : _this7$location$lng, _this7$location$is_ut = _this7$location.is_util_loca, is_util_loca = _this7$location$is_ut === void 0 ? 0 : _this7$location$is_ut;
                param = Object.assign({}, _this7.param, {
                  cate_id: cate_id,
                  lat: lat,
                  lng: lng
                });
                _context7.next = 7;
                return _this7.$api.shopstore.storeList(param);
              case 7:
                newList = _context7.sent;
                if (_this7.param.page == 1) {
                  _this7.list = newList;
                } else {
                  newList.data = oldList.data.concat(newList.data);
                  _this7.list = newList;
                }
                _this7.loading = false;
                _this7.$util.hideAll();
                if (param.page == 1 && lat && lng && is_util_loca) {
                  _this7.$util.getMapInfo();
                }
              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[1079,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/shopstore/pages/store-list.js.map