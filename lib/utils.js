'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.omitUnnecessaryTags = exports.sanitizeHTML = exports.cleanBody = exports.bodyText = exports.bodyHTML = exports.fetchAPI = exports.fetchHTML = exports.isUrl = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _sanitizeHtml = require('sanitize-html');

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _userAgents = require('user-agents');

var _userAgents2 = _interopRequireDefault(_userAgents);

var _url = require('url');

var _gotScraping = require('got-scraping');

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _regexp = require('./regexp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponseError = function (_Error) {
	_inherits(ResponseError, _Error);

	function ResponseError(message, code, error) {
		_classCallCheck(this, ResponseError);

		var _this = _possibleConstructorReturn(this, (ResponseError.__proto__ || Object.getPrototypeOf(ResponseError)).call(this, message));

		_this.code = code || error.code || 500;
		_this.name = 'ResponseError';
		return _this;
	}

	return ResponseError;
}(Error);

var isUrl = function isUrl(str) {
	return (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-|.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(str)
	);
};

var request = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
		var source, id;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						source = _axios2.default.CancelToken.source();
						id = options.timeout && setTimeout(function () {
							id = 0;
							source.cancel('Timeout of ' + options.timeout + 'ms.');
						}, options.timeout);


						options.cancelToken = source.token;
						return _context.abrupt('return', (0, _axios2.default)(options).finally(function () {
							id && clearTimeout(id);
						}));

					case 4:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function request(_x) {
		return _ref.apply(this, arguments);
	};
}();

var fetchHTML = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link, proxy) {
		var url, userAgent, req, html;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						url = new _url.URL(link);

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

						throw new Error('Requested URL is not a valid: ' + url.href);

					case 5:
						userAgent = new _userAgents2.default();

						_axios2.default.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8;text/html;text/plain';
						_axios2.default.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
						_axios2.default.defaults.headers.get['User-Agent'] = userAgent.toString();
						_axios2.default.defaults.headers.get['Referer'] = 'https://news.google.com/';

						req = {
							method: 'get',
							url: url.href,
							insecureHTTPParser: true,
							timeout: 10000,
							httpAgent: new _http2.default.Agent({
								keepAlive: true,
								rejectUnauthorized: false
							}),
							httpsAgent: new _https2.default.Agent({
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

						throw new Error('Error Not Found or Not Authorized: ' + html.status + ' ' + html.statusText);

					case 17:
						return _context2.abrupt('return', html.data);

					case 18:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function fetchHTML(_x2, _x3) {
		return _ref2.apply(this, arguments);
	};
}();

var fetchAPI = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(link, proxy) {
		var url, userAgent, options, client, res;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						url = new _url.URL(link);

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

						throw new Error('Requested URL is not a valid: ' + url.href);

					case 5:
						userAgent = new _userAgents2.default();
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

						client = _gotScraping.gotScraping.extend(options);
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
						return _context3.abrupt('return', res.body || null);

					case 18:
						_context3.prev = 18;
						_context3.t0 = _context3['catch'](9);
						throw new ResponseError(_context3.t0.message, _context3.t0.code || 500, _context3.t0);

					case 21:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[9, 18]]);
	}));

	return function fetchAPI(_x4, _x5) {
		return _ref3.apply(this, arguments);
	};
}();

var sanitizeHTML = function sanitizeHTML(html) {
	/**
  * Sanitize the possibly nasty HTML from some web pages
  */
	return (0, _sanitizeHtml2.default)(html, {
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
	var blackBodyElems = new RegExp(_regexp.REGEXP.blackBodyElems);
	var unlikelyCandidates = new RegExp(_regexp.REGEXP.unlikelyCandidates);
	var negative = new RegExp(_regexp.REGEXP.negative);
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
		if ('' === $(this).text().trim()) {
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

exports.isUrl = isUrl;
exports.fetchHTML = fetchHTML;
exports.fetchAPI = fetchAPI;
exports.bodyHTML = bodyHTML;
exports.bodyText = bodyText;
exports.cleanBody = cleanBody;
exports.sanitizeHTML = sanitizeHTML;
exports.omitUnnecessaryTags = omitUnnecessaryTags;