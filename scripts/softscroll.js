!(function (t, o) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = o(require("smooth-scrollbar")))
    : "function" == typeof define && define.amd
    ? define(["smooth-scrollbar"], o)
    : "object" == typeof exports
    ? (exports.SoftscrollPlugin = o(require("smooth-scrollbar")))
    : (t.SoftscrollPlugin = o(t.Scrollbar));
})(window, function (t) {
  return (function (t) {
    var o = {};
    function r(e) {
      if (o[e]) return o[e].exports;
      var l = (o[e] = { i: e, l: !1, exports: {} });
      return t[e].call(l.exports, l, l.exports, r), (l.l = !0), l.exports;
    }
    return (
      (r.m = t),
      (r.c = o),
      (r.d = function (t, o, e) {
        r.o(t, o) || Object.defineProperty(t, o, { enumerable: !0, get: e });
      }),
      (r.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.t = function (t, o) {
        if ((1 & o && (t = r(t)), 8 & o)) return t;
        if (4 & o && "object" == typeof t && t && t.__esModule) return t;
        var e = Object.create(null);
        if (
          (r.r(e),
          Object.defineProperty(e, "default", { enumerable: !0, value: t }),
          2 & o && "string" != typeof t)
        )
          for (var l in t)
            r.d(
              e,
              l,
              function (o) {
                return t[o];
              }.bind(null, l)
            );
        return e;
      }),
      (r.n = function (t) {
        var o =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return r.d(o, "a", o), o;
      }),
      (r.o = function (t, o) {
        return Object.prototype.hasOwnProperty.call(t, o);
      }),
      (r.p = ""),
      r((r.s = 1))
    );
  })([
    function (o, r) {
      o.exports = t;
    },
    function (t, o, r) {
      t.exports = r(2);
    },
    function (t, o, r) {
      "use strict";
      r.r(o);
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var e = function (t, o) {
          return (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, o) {
                t.__proto__ = o;
              }) ||
            function (t, o) {
              for (var r in o) o.hasOwnProperty(r) && (t[r] = o[r]);
            })(t, o);
        },
        l = (function (t) {
          function o() {
            var o = (null !== t && t.apply(this, arguments)) || this;
            return (o.lockX = 0), (o.lockY = 0), o;
          }
          return (
            (function (t, o) {
              function r() {
                this.constructor = t;
              }
              e(t, o),
                (t.prototype =
                  null === o
                    ? Object.create(o)
                    : ((r.prototype = o.prototype), new r()));
            })(o, t),
            (o.prototype.transformDelta = function (t) {
              var o = t.x > 0 ? 1 : -1,
                r = t.y > 0 ? 1 : -1;
              return o === this.lockX || r === this.lockY
                ? { x: 0, y: 0 }
                : ((this.lockX = 0), (this.lockY = 0), t);
            }),
            (o.prototype.onRender = function (t) {
              var o = t.x,
                r = t.y;
              r < 0 &&
                !this.lockY &&
                Math.abs(r) >= this.scrollbar.scrollTop &&
                (this.scrollbar.setMomentum(0, -this.scrollbar.scrollTop),
                (this.lockY = -1)),
                o < 0 &&
                  !this.lockX &&
                  Math.abs(o) >= this.scrollbar.scrollLeft &&
                  (this.scrollbar.setMomentum(-this.scrollbar.scrollLeft, 0),
                  (this.lockX = -1)),
                o > 0 &&
                  !this.lockX &&
                  Math.abs(o) >=
                    this.scrollbar.limit.x - this.scrollbar.scrollLeft &&
                  (this.scrollbar.setMomentum(
                    this.scrollbar.limit.x - this.scrollbar.scrollLeft,
                    0
                  ),
                  (this.lockX = 1)),
                r > 0 &&
                  !this.lockY &&
                  Math.abs(r) >=
                    this.scrollbar.limit.y - this.scrollbar.scrollTop &&
                  (this.scrollbar.setMomentum(
                    0,
                    this.scrollbar.limit.y - this.scrollbar.scrollTop
                  ),
                  (this.lockY = 1)),
                0 === r && (this.lockY = 0),
                0 === o && (this.lockX = 0);
            }),
            (o.pluginName = "softscroll"),
            o
          );
        })(r(0).ScrollbarPlugin);
      o.default = l;
    },
  ]).default;
});
