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

var _regexp = require('./regexp');

var _url = require('url');

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _socksProxyAgent = require('socks-proxy-agent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isUrl = function isUrl(str) {
	return (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-|.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(str)
	);
};

var fetchHTML = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(link, proxy) {
		var url, userAgent, req, torProxyAgent, html;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						url = new _url.URL(link);

						if (url.href) {
							_context.next = 3;
							break;
						}

						throw new Error('Please specify a URL');

					case 3:
						if (isUrl(url.href)) {
							_context.next = 5;
							break;
						}

						throw new Error('Requested URL is not a valid: ' + url.href);

					case 5:
						userAgent = new _userAgents2.default();

						_axios2.default.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8;text/html;text/plain';
						_axios2.default.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
						_axios2.default.defaults.headers.get['User-Agent'] = userAgent.toString();

						req = {
							method: 'get',
							url: url.href,
							insecureHTTPParser: true,
							timeout: 60000
						};


						if (proxy) {
							torProxyAgent = new _socksProxyAgent.SocksProxyAgent(proxy);


							req.timeout = 60000;
							req.httpsAgent = torProxyAgent;
							req.httpAgent = torProxyAgent;
						}

						_context.next = 13;
						return (0, _axios2.default)(req);

					case 13:
						html = _context.sent;

						if (!(html.status >= 400)) {
							_context.next = 16;
							break;
						}

						throw new Error('Error Not Found or Not Authorized: ' + html.status + ' ' + html.statusText);

					case 16:
						return _context.abrupt('return', html.data);

					case 17:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function fetchHTML(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var fetchAPI = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
		var url, userAgent, options, _ref3, html;

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
						options = {
							headers: {
								'Content-Type': 'application/json;charset=utf-8;text/html;text/plain',
								'Access-Control-Allow-Origin': '*',
								'User-Agent': userAgent.toString()
							}
						};
						_context2.prev = 7;
						_context2.next = 10;
						return (0, _got2.default)(url.href, { method: 'GET' }, options);

					case 10:
						_ref3 = _context2.sent;
						html = _ref3.body;
						return _context2.abrupt('return', html || null);

					case 15:
						_context2.prev = 15;
						_context2.t0 = _context2['catch'](7);
						return _context2.abrupt('return', _context2.t0);

					case 18:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[7, 15]]);
	}));

	return function fetchAPI(_x3) {
		return _ref2.apply(this, arguments);
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