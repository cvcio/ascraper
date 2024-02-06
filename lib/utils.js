"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var axios = require('axios');
var sanitize = require('sanitize-html');
var UserAgent = require('user-agents');
var _require = require('url'),
  URL = _require.URL;
var _require2 = require('got-scraping'),
  gotScraping = _require2.gotScraping;
var https = require('https');
var http = require('http');
var _require3 = require('./regexp'),
  REGEXP = _require3.REGEXP;
var ResponseError = /*#__PURE__*/function (_Error) {
  _inherits(ResponseError, _Error);
  function ResponseError(message, code, error) {
    var _this;
    _classCallCheck(this, ResponseError);
    _this = _callSuper(this, ResponseError, [message]);
    _this.code = code || error.code || 500;
    _this.name = 'ResponseError';
    return _this;
  }
  return _createClass(ResponseError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var isUrl = function isUrl(str) {
  return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-|.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(str);
};
var request = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(options) {
    var source, id;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          source = axios.CancelToken.source();
          id = options.timeout && setTimeout(function () {
            id = 0;
            source.cancel("Timeout of ".concat(options.timeout, "ms."));
          }, options.timeout);
          options.cancelToken = source.token;
          return _context.abrupt("return", axios(options)["finally"](function () {
            id && clearTimeout(id);
          }));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function request(_x) {
    return _ref.apply(this, arguments);
  };
}();
var fetchHTML = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(link, proxy) {
    var url, userAgent, req, html;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          url = new URL(link);
          if (url.href) {
            _context2.next = 3;
            break;
          }
          throw new Error('Please specify a URL');
        case 3:
          if (isUrl(url.href)) {
            _context2.next = 5;
            break;
          }
          throw new Error("Requested URL is not a valid: ".concat(url.href));
        case 5:
          userAgent = new UserAgent();
          axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8;text/html;text/plain';
          axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
          axios.defaults.headers.get['User-Agent'] = userAgent.toString();
          axios.defaults.headers.get.Referer = 'https://news.google.com/';
          req = {
            method: 'get',
            url: url.href,
            insecureHTTPParser: true,
            timeout: 10000,
            httpAgent: new http.Agent({
              keepAlive: true,
              rejectUnauthorized: false
            }),
            httpsAgent: new https.Agent({
              keepAlive: true,
              rejectUnauthorized: false
            })
          };
          if (proxy && proxy !== '') {
            req.proxy = proxy;
          }
          _context2.next = 14;
          return request(req);
        case 14:
          html = _context2.sent;
          if (!(html.status >= 400)) {
            _context2.next = 17;
            break;
          }
          throw new Error("Error Not Found or Not Authorized: ".concat(html.status, " ").concat(html.statusText));
        case 17:
          return _context2.abrupt("return", html.data);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function fetchHTML(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var fetchAPI = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(link, proxy) {
    var url, userAgent, options, client, res;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          url = new URL(link);
          if (url.href) {
            _context3.next = 3;
            break;
          }
          throw new Error('Please specify a URL');
        case 3:
          if (isUrl(url.href)) {
            _context3.next = 5;
            break;
          }
          throw new Error("Requested URL is not a valid: ".concat(url.href));
        case 5:
          userAgent = new UserAgent();
          options = {
            throwHttpErrors: false,
            url: url.href,
            responseType: 'text',
            followRedirect: true,
            http2: false,
            maxRedirects: 3,
            headers: {
              'Content-Type': 'application/json;charset=utf-8;text/html;text/plain',
              'Access-Control-Allow-Origin': '*',
              'User-Agent': userAgent.toString()
            }
          };
          if (proxy && proxy !== '') {
            options.proxyUrl = proxy;
          }
          client = gotScraping.extend(options);
          _context3.prev = 9;
          _context3.next = 12;
          return client(options);
        case 12:
          res = _context3.sent;
          if (!(!res.ok || res.statusCode >= 400)) {
            _context3.next = 15;
            break;
          }
          throw new ResponseError(res.statusMessage, res.statusCode, res.ResponseError);
        case 15:
          return _context3.abrupt("return", res.body || null);
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](9);
          throw new ResponseError(_context3.t0.message, _context3.t0.code || 500, _context3.t0);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[9, 18]]);
  }));
  return function fetchAPI(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var sanitizeHTML = function sanitizeHTML(html) {
  /**
   * Sanitize the possibly nasty HTML from some web pages
   */
  return sanitize(html, {
    nonTextTags: ['iframe', 'link', 'noscript', 'script', 'style'],
    allowedAttributes: {
      '*': ['id', 'class', 'data-type', 'href', 'itemprop', 'itemtype', 'datetime', 'rel', 'src', 'title'],
      article: ['*'],
      main: ['*'],
      meta: ['*']
    },
    allowedTags: ['a', 'article', 'aside', 'b', 'blockquote', 'body', 'br', 'cite', 'code', 'div', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html', 'i', 'img', 'li', 'main', 'meta', 'ol', 'p', 'pre', 'section', 'small', 'strike', 'strong', 'span', 'time', 'title', 'ul', 'link']
  });
};
var omitUnnecessaryTags = function omitUnnecessaryTags($) {
  $('script').remove();
  $('style').remove();
  $('#header').remove();
  $('#page-header').remove();
  $('#footer').remove();
  $('#navigation').remove();
  $('#comments').remove();
  $('#sidebar').remove();
  return $;
};
var cleanBody = function cleanBody($) {
  var copy = $;
  var blackBodyElems = new RegExp(REGEXP.blackBodyElems);
  var unlikelyCandidates = new RegExp(REGEXP.unlikelyCandidates);
  var negative = new RegExp(REGEXP.negative);
  copy('*').filter(function () {
    if (blackBodyElems.test($(this).get(0).name)) {
      $(this).remove();
    }
  });
  copy('*').filter(function () {
    if (unlikelyCandidates.test($(this).get(0).name)) {
      $(this).remove();
    }
  });
  copy('*').filter(function () {
    if (negative.test($(this).get(0).name)) {
      $(this).remove();
    }
  });
  copy('*').filter(function () {
    if ($(this).text().trim() === '') {
      $(this).remove();
    }
  });
  return $;
};
var bodyHTML = function bodyHTML($) {
  return $.html().replace(/<\s*br[^>]?>/, '\n\n')
  // .replace(/(<([^>]+)>)/g, ' ')
  .replace(/[\s\t]+/g, ' ').trim();
};
var bodyText = function bodyText($) {
  return $.html().replace(/<\s*br[^>]?>/, '\n\n').replace(/(<([^>]+)>)/g, ' ').replace(/[\s\t]+/g, ' ').trim();
};
module.exports = {
  isUrl: isUrl,
  fetchHTML: fetchHTML,
  fetchAPI: fetchAPI,
  bodyHTML: bodyHTML,
  bodyText: bodyText,
  cleanBody: cleanBody,
  sanitizeHTML: sanitizeHTML,
  omitUnnecessaryTags: omitUnnecessaryTags
};