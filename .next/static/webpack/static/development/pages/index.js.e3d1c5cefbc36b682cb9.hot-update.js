webpackHotUpdate("static/development/pages/index.js",{

/***/ "./store/blog-model.ts":
/*!*****************************!*\
  !*** ./store/blog-model.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/_@babel_runtime-corejs2@7.7.2@@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/_@babel_runtime-corejs2@7.7.2@@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/_@babel_runtime-corejs2@7.7.2@@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/_@babel_runtime-corejs2@7.7.2@@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/_@babel_runtime-corejs2@7.7.2@@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/_@babel_runtime-corejs2@7.7.2@@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/_@babel_runtime-corejs2@7.7.2@@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/_next@9.1.7@next/dist/build/polyfills/object-assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/_@babel_runtime-corejs2@7.7.2@@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "./node_modules/_axios@0.19.1@axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! qs */ "./node_modules/_qs@6.5.2@qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_10__);










function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }



/* harmony default export */ __webpack_exports__["default"] = ({
  state: {
    blogList: {
      list: [],
      count: 0,
      page: 1,
      perPage: 30
    },
    currentBlog: {},
    comments: {
      list: [],
      total: 0
    }
  },
  reducers: {
    setBlogList: function setBlogList(state, blogList) {
      return _objectSpread({}, state, {
        blogList: blogList
      });
    },
    setBlog: function setBlog(state, currentBlog) {
      return _objectSpread({}, state, {
        currentBlog: currentBlog
      });
    },
    setComments: function setComments(state, comments) {
      return _objectSpread({}, state, {
        comments: comments
      });
    }
  },
  effects: function effects(dispatch) {
    return {
      getBlogList: function getBlogList(options) {
        var params, blogs;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.async(function getBlogList$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = options || {
                  perPage: 200,
                  page: 1,
                  tags: []
                };

                _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_7___default()(params, {
                  type: 1
                });

                _context.next = 4;
                return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/articles', {
                  params: params,
                  paramsSerializer: function paramsSerializer(params) {
                    return qs__WEBPACK_IMPORTED_MODULE_10___default.a.stringify(params, {
                      arrayFormat: 'repeat'
                    });
                  }
                }));

              case 4:
                blogs = _context.sent;
                dispatch.blogModel.setBlogList(blogs);
                return _context.abrupt("return", blogs);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        });
      },
      getBlog: function getBlog(id) {
        var blog;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.async(function getBlog$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                axios__WEBPACK_IMPORTED_MODULE_9___default.a.patch('/articles/' + id + '/view-count');
                _context2.next = 4;
                return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_9___default.a.get("/articles/".concat(id)));

              case 4:
                blog = _context2.sent;
                dispatch.blogModel.setBlog(blog);
                return _context2.abrupt("return", blog);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.log('博客不存在');
                return _context2.abrupt("return", null);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, null, null, [[0, 9]]);
      },
      commentBlog: function commentBlog(info) {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.async(function commentBlog$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_9___default.a.post('/comments', info));

              case 2:
                dispatch.blogModel.getComments({
                  blogId: info.blogId
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        });
      },
      leaveMessage: function leaveMessage(info) {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.async(function leaveMessage$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_9___default.a.post('/comments', info));

              case 2:
                dispatch.blogModel.getComments({
                  type: 2
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        });
      },
      getComments: function getComments(query) {
        var comments;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.async(function getComments$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_6___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/comments', {
                  params: query
                }));

              case 2:
                comments = _context5.sent;
                dispatch.blogModel.setComments(comments);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        });
      }
    };
  }
});

/***/ })

})
//# sourceMappingURL=index.js.e3d1c5cefbc36b682cb9.hot-update.js.map