(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["user/pages/choose-technician"],{

/***/ 210:
/*!************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/main.js?{"page":"user%2Fpages%2Fchoose-technician"} ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _chooseTechnician = _interopRequireDefault(__webpack_require__(/*! ./user/pages/choose-technician.vue */ 211));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_chooseTechnician.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 211:
/*!*****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/choose-technician.vue ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./choose-technician.vue?vue&type=template&id=427c0419& */ 212);
/* harmony import */ var _choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./choose-technician.vue?vue&type=script&lang=js& */ 214);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 69);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__["render"],
  _choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "user/pages/choose-technician.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 212:
/*!************************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/choose-technician.vue?vue&type=template&id=427c0419& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./choose-technician.vue?vue&type=template&id=427c0419& */ 213);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_template_id_427c0419___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 213:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/choose-technician.vue?vue&type=template&id=427c0419& ***!
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
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.cityList && _vm.cityList.length > 0
  var g1 =
    g0 && !(_vm.cityIndex === -1)
      ? _vm.cityList[_vm.cityIndex].title.length
      : null
  var g2 =
    g0 && !(_vm.cityIndex === -1) && g1 > 3
      ? _vm.cityList[_vm.cityIndex].title.substring(0, 3)
      : null
  var m0 = _vm.$t("action.attendantName")
  var g3 = _vm.list.data && _vm.list.data.length > 0
  var g4 = g3 ? [2, 3].includes(_vm.configInfo.coach_list_format) : null
  var l0 = g3
    ? _vm.__map(_vm.list.data, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var g5 =
          _vm.configInfo.coach_list_format === 1 ||
          [2, 3].includes(_vm.configInfo.coach_list_format)
        var g6 =
          [2, 3].includes(_vm.configInfo.coach_list_format) && index % 2 == 0
        return {
          $orig: $orig,
          g5: g5,
          g6: g6,
        }
      })
    : null
  var g7 = _vm.loading
    ? _vm.list.current_page >= _vm.list.last_page &&
      _vm.list.data.length > 0 &&
      _vm.location.lng
    : null
  var g8 =
    !_vm.loading && _vm.list.data.length <= 0 && _vm.list.current_page == 1
  var m1 =
    g8 && !_vm.location.lat && !_vm.location.lng
      ? _vm.$t("action.attendantName")
      : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      $event.stopPropagation()
      return _vm.$refs.choose_city_item.close()
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        m0: m0,
        g3: g3,
        g4: g4,
        l0: l0,
        g7: g7,
        g8: g8,
        m1: m1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 214:
/*!******************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/choose-technician.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./choose-technician.vue?vue&type=script&lang=js& */ 215);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_choose_technician_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 215:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Desktop/新建文件夹/前端未编译/uniapp/wechat/user/pages/choose-technician.vue?vue&type=script&lang=js& ***!
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var technicianListItem = function technicianListItem() {
  __webpack_require__.e(/*! require.ensure | components/technician-list-item */ "components/technician-list-item").then((function () {
    return resolve(__webpack_require__(/*! @/components/technician-list-item.vue */ 1341));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var technicianListPopup = function technicianListPopup() {
  __webpack_require__.e(/*! require.ensure | components/technician-list-popup */ "components/technician-list-popup").then((function () {
    return resolve(__webpack_require__(/*! @/components/technician-list-popup.vue */ 1348));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    technicianListItem: technicianListItem,
    technicianListPopup: technicianListPopup
  },
  data: function data() {
    return {
      isLoad: false,
      options: {},
      navTitle: '',
      param: {
        page: 1,
        ser_id: 0,
        coach_name: ''
      },
      list: {
        data: []
      },
      loading: true,
      lockTap: false,
      pageLen: 1
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
    cityId: function cityId(state) {
      return state.technician.cityId;
    },
    cityIndex: function cityIndex(state) {
      return state.technician.cityIndex;
    },
    cityList: function cityList(state) {
      return state.technician.cityList;
    },
    loginType: function loginType(state) {
      return state.user.loginType;
    },
    userInfo: function userInfo(state) {
      return state.user.userInfo;
    },
    location: function location(state) {
      return state.user.location;
    },
    changeAddr: function changeAddr(state) {
      return state.user.changeAddr;
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
      var title;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("====onLoad choose-technician");
              _this.options = options;
              _this.$util.showLoading();
              _context.next = 5;
              return _this.initIndex();
            case 5:
              title = "\u9009\u62E9".concat(_this.$t('action.attendantName'));
              _this.navTitle = title;
              uni.setNavigationBarTitle({
                title: title
              });
              _this.isLoad = true;
            case 9:
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
  onPullDownRefresh: function onPullDownRefresh() {
    uni.showNavigationBarLoading();
    this.updateUserItem({
      key: 'changeAddr',
      val: false
    });
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
    locaRefuse: function locaRefuse(newval, oldval) {
      if (!newval) {
        this.toResetUtilLoca();
      }
    },
    changeOnAddr: function changeOnAddr(newval, oldval) {
      var _this$noChangeLoca = this.noChangeLoca,
        noloca = _this$noChangeLoca.noloca,
        refresh = _this$noChangeLoca.refresh;
      if (newval && noloca) {
        this.initUtilLocaData(refresh);
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
        var _this3$noChangeLoca = _this3.noChangeLoca,
          noloca = _this3$noChangeLoca.noloca,
          refresh = _this3$noChangeLoca.refresh;
        var cur_unix = _this3.$util.DateToUnix(_this3.$util.formatTime(new Date(), 'YY-M-D h:m:s'));
        if (noloca && (!lat && !lng || !unix || unix && cur_unix - unix >= 1)) {
          _this3.getUtilLocation(refresh);
        }
      }, 800);
    }
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0, _vuex.mapActions)(['getConfigInfo', 'getCityList'])), (0, _vuex.mapMutations)(['updateUserItem', 'updateServiceItem', 'updateTechnicianItem', 'updateMapItem'])), {}, {
    initIndex: function initIndex() {
      var _arguments = arguments,
        _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var refresh;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                refresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (!(!_this4.configInfo.id || refresh)) {
                  _context3.next = 4;
                  break;
                }
                _context3.next = 4;
                return _this4.getConfigInfo();
              case 4:
                _this4.pageLen = getCurrentPages().length;
                _this4.getList(refresh === false ? _this4.cityList.length == 0 : true);
              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    initRefresh: function initRefresh() {
      this.param.page = 1;
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
    pickerChange: function pickerChange(e, val) {
      var ind = e.target.value;
      this.updateTechnicianItem({
        key: 'cityIndex',
        val: ind
      });
      this.updateTechnicianItem({
        key: 'cityId',
        val: this.cityList[ind].id
      });
      this.param.page = 1;
      this.getList();
    },
    toSearch: function toSearch(val) {
      this.param.page = 1;
      this.param.coach_name = val;
      this.getList();
    },
    // 选择地区
    toChooseLocation: function toChooseLocation() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var privacyCheck;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                privacyCheck = _this6.$refs.user_privacy.check();
                if (!privacyCheck) {
                  _context6.next = 4;
                  break;
                }
                _this6.$refs.user_privacy.open();
                return _context6.abrupt("return");
              case 4:
                _this6.updateUserItem({
                  key: 'useChooseLocation',
                  val: true
                });
                _context6.next = 7;
                return _this6.$util.checkAuth({
                  type: 'userLocation'
                });
              case 7:
                _this6.initChooseLoca();
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    initChooseLoca: function initChooseLoca() {
      var _arguments2 = arguments,
        _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var param, _yield$uni$chooseLoca, _yield$uni$chooseLoca2, err, loca_data, _ref, _ref$name, name, _ref$address, address, _ref$latitude, lat, _ref$longitude, lng, location;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                param = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};
                _context7.next = 3;
                return uni.chooseLocation(param);
              case 3:
                _yield$uni$chooseLoca = _context7.sent;
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
                location = {
                  lat: lat,
                  lng: lng,
                  address: address,
                  province: '',
                  city: '',
                  district: ''
                };
                _this7.updateUserItem({
                  key: 'useChooseLocation',
                  val: false
                });
                if (lat) {
                  _context7.next = 13;
                  break;
                }
                return _context7.abrupt("return");
              case 13:
                if (_this7.realtimeTimer) clearInterval(_this7.realtimeTimer);
                _this7.updateUserItem({
                  key: 'location',
                  val: location
                });
                _this7.updateUserItem({
                  key: 'changeAddr',
                  val: true
                });
                _this7.param.page = 1;
                _context7.next = 19;
                return _this7.getCityList({
                  lng: lng,
                  lat: lat,
                  change: 1
                });
              case 19:
                _context7.next = 21;
                return _this7.getList();
              case 21:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    getList: function getList() {
      var _arguments3 = arguments,
        _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var refresh, location, changeAddr, _this8$configInfo$rea, realtime_location, _this8$userCoachStatu, coach_status, coach_position, _this8$changeOnAddr, _this8$changeOnAddr$l, change_lat, _this8$changeOnAddr$l2, change_lng, _this8$changeOnAddr$u, unix, cur_unix, noloca, loca;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                refresh = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : false;
                location = _this8.location, changeAddr = _this8.changeAddr;
                _this8$configInfo$rea = _this8.configInfo.realtime_location, realtime_location = _this8$configInfo$rea === void 0 ? 0 : _this8$configInfo$rea;
                _this8$userCoachStatu = _this8.userCoachStatus, coach_status = _this8$userCoachStatu.status, coach_position = _this8$userCoachStatu.coach_position;
                if (!(_this8.param.page == 1 && (!location.lat || location.lat && location.address == '暂未获取到位置信息' || refresh && realtime_location && !changeAddr))) {
                  _context8.next = 20;
                  break;
                }
                if (!(coach_status == 2 && coach_position)) {
                  _context8.next = 16;
                  break;
                }
                _this8$changeOnAddr = _this8.changeOnAddr, _this8$changeOnAddr$l = _this8$changeOnAddr.lat, change_lat = _this8$changeOnAddr$l === void 0 ? 0 : _this8$changeOnAddr$l, _this8$changeOnAddr$l2 = _this8$changeOnAddr.lng, change_lng = _this8$changeOnAddr$l2 === void 0 ? 0 : _this8$changeOnAddr$l2, _this8$changeOnAddr$u = _this8$changeOnAddr.unix, unix = _this8$changeOnAddr$u === void 0 ? 0 : _this8$changeOnAddr$u;
                cur_unix = _this8.$util.DateToUnix(_this8.$util.formatTime(new Date(), 'YY-M-D h:m:s'));
                noloca = change_lat && change_lng && unix && cur_unix - unix < 3 ? false : true;
                if (!noloca) {
                  loca = Object.assign({}, _this8.location, {
                    lat: change_lat,
                    lng: change_lng,
                    is_util_loca: 1
                  });
                  _this8.updateUserItem({
                    key: 'location',
                    val: loca
                  });
                }
                _this8.updateUserItem({
                  key: 'noChangeLoca',
                  val: {
                    noloca: noloca,
                    refresh: refresh
                  }
                });
                if (!_this8.noChangeLoca.noloca) {
                  _context8.next = 13;
                  break;
                }
                return _context8.abrupt("return");
              case 13:
                _this8.initUtilLocaData(refresh);
                _context8.next = 17;
                break;
              case 16:
                _this8.getUtilLocation(refresh);
              case 17:
                _this8.updateServiceItem({
                  key: 'pageActive',
                  val: false
                });
                _this8.updateMapItem({
                  key: 'pageActive',
                  val: false
                });
                return _context8.abrupt("return");
              case 20:
                _this8.initUtilLocaData(refresh);
              case 21:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    getUtilLocation: function getUtilLocation(refresh) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var _yield$_this9$$util$g, _yield$_this9$$util$g2, lat, _yield$_this9$$util$g3, lng, val;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _this9.$util.getLocation();
              case 2:
                _yield$_this9$$util$g = _context9.sent;
                _yield$_this9$$util$g2 = _yield$_this9$$util$g.lat;
                lat = _yield$_this9$$util$g2 === void 0 ? 0 : _yield$_this9$$util$g2;
                _yield$_this9$$util$g3 = _yield$_this9$$util$g.lng;
                lng = _yield$_this9$$util$g3 === void 0 ? 0 : _yield$_this9$$util$g3;
                val = Object.assign({}, _this9.location, {
                  lat: lat,
                  lng: lng,
                  is_util_loca: 1
                });
                _this9.updateUserItem({
                  key: 'location',
                  val: val
                });
                _this9.initUtilLocaData(refresh);
              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    initUtilLocaData: function initUtilLocaData(refresh) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var changeAddr, _this10$configInfo$re, realtime_location, _this10$location, _this10$location$lng, lng, _this10$location$lat, lat, _this10$location$is_u, is_util_loca, _this10$options, ser_id, _this10$options$store, store_id, oldList, param, cityList, cityIndex, city_id, ind, _this10$configInfo$co, coach_format, methodModel, newList;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _this10.updateUserItem({
                  key: 'noChangeLoca',
                  val: {
                    noloca: false
                  }
                });
                changeAddr = _this10.changeAddr;
                _this10$configInfo$re = _this10.configInfo.realtime_location, realtime_location = _this10$configInfo$re === void 0 ? 0 : _this10$configInfo$re;
                _this10$location = _this10.location, _this10$location$lng = _this10$location.lng, lng = _this10$location$lng === void 0 ? 0 : _this10$location$lng, _this10$location$lat = _this10$location.lat, lat = _this10$location$lat === void 0 ? 0 : _this10$location$lat, _this10$location$is_u = _this10$location.is_util_loca, is_util_loca = _this10$location$is_u === void 0 ? 0 : _this10$location$is_u;
                if (!refresh) {
                  _context10.next = 7;
                  break;
                }
                _context10.next = 7;
                return _this10.getCityList({
                  lng: lng,
                  lat: lat,
                  change: 1
                });
              case 7:
                _this10$options = _this10.options, ser_id = _this10$options.id, _this10$options$store = _this10$options.store_id, store_id = _this10$options$store === void 0 ? 0 : _this10$options$store;
                oldList = _this10.list, param = _this10.param, cityList = _this10.cityList, cityIndex = _this10.cityIndex, city_id = _this10.cityId;
                ind = cityList.findIndex(function (item) {
                  return item.id == city_id;
                });
                if (!(ind == -1)) {
                  _context10.next = 16;
                  break;
                }
                _this10.$refs.choose_city_item.open();
                _this10.loading = false;
                _this10.$util.hideAll();
                _this10.list = {
                  data: [],
                  last_page: 1,
                  current_page: 1
                };
                return _context10.abrupt("return");
              case 16:
                city_id = ind == -1 ? 0 : city_id;
                cityIndex = ind == -1 ? 0 : ind;
                _this10.updateTechnicianItem({
                  key: 'cityIndex',
                  val: cityIndex
                });
                _this10.updateTechnicianItem({
                  key: 'cityId',
                  val: city_id
                });
                param = Object.assign({}, param, {
                  ser_id: ser_id,
                  city_id: city_id,
                  lat: lat,
                  lng: lng,
                  store_id: store_id
                });
                _this10$configInfo$co = _this10.configInfo.coach_format, coach_format = _this10$configInfo$co === void 0 ? 1 : _this10$configInfo$co;
                methodModel = coach_format == 1 ? 'serviceCoachList' : 'typeServiceCoachList';
                _context10.next = 25;
                return _this10.$api.service[methodModel](param);
              case 25:
                newList = _context10.sent;
                if (_this10.param.page == 1) {
                  _this10.list = newList;
                } else {
                  newList.data = oldList.data.concat(newList.data);
                  _this10.list = newList;
                }
                _this10.loading = false;
                _this10.$util.hideAll();
                if (param.page == 1 && (is_util_loca || realtime_location && !changeAddr)) {
                  _this10.$util.getMapInfo(true, {}, changeAddr);
                }
              case 30:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    toShowPopup: function toShowPopup(index, key) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this11.$refs.technician_list_popup.toShowPopup(_this11.list.data[index], key);
              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    toCollect: function toCollect(index) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var _this12$list$data$ind, id, is_collect, collect_num, methodModel;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _this12$list$data$ind = _this12.list.data[index], id = _this12$list$data$ind.id, is_collect = _this12$list$data$ind.is_collect, collect_num = _this12$list$data$ind.collect_num;
                methodModel = is_collect ? 'delCollect' : 'addCollect';
                _context12.next = 4;
                return _this12.$api.mine[methodModel]({
                  coach_id: id
                });
              case 4:
                _this12.$util.showToast({
                  title: is_collect ? '取消成功' : '收藏成功'
                });
                _this12.list.data[index].is_collect = is_collect == 1 ? 0 : 1;
                _this12.list.data[index].collect_num = is_collect == 1 ? collect_num - 1 : collect_num + 1;
              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    // 预约
    toOrder: function toOrder(index) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var _this13$list$data$ind, coach_id, _this13$list$data$ind2, is_work, service_id, url;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _this13$list$data$ind = _this13.list.data[index], coach_id = _this13$list$data$ind.id, _this13$list$data$ind2 = _this13$list$data$ind.is_work, is_work = _this13$list$data$ind2 === void 0 ? 0 : _this13$list$data$ind2;
                if (is_work) {
                  _context13.next = 3;
                  break;
                }
                return _context13.abrupt("return");
              case 3:
                service_id = _this13.options.id;
                if (!_this13.lockTap) {
                  _context13.next = 6;
                  break;
                }
                return _context13.abrupt("return");
              case 6:
                _this13.lockTap = true;
                _context13.prev = 7;
                _context13.next = 10;
                return _this13.$api.order.addCar({
                  service_id: service_id,
                  coach_id: coach_id,
                  num: 1,
                  is_top: 1,
                  coach_service: 1
                });
              case 10:
                _this13.lockTap = false;
                url = "/user/pages/order?id=".concat(coach_id, "&ser_id=").concat(service_id);
                _this13.$util.goUrl({
                  url: url
                });
                _context13.next = 18;
                break;
              case 15:
                _context13.prev = 15;
                _context13.t0 = _context13["catch"](7);
                _this13.lockTap = false;
              case 18:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[7, 15]]);
      }))();
    },
    toBack: function toBack() {
      var pageLen = this.pageLen;
      var url = pageLen > 1 ? 1 : "/pages/service";
      var openType = pageLen > 1 ? "navigateBack" : "reLaunch";
      this.$util.goUrl({
        url: url,
        openType: openType
      });
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[210,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/user/pages/choose-technician.js.map