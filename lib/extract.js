'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.extract = undefined;

var _utils = require('./utils');

var _meta = require('./meta');

var _cheerio = require('cheerio');

var _readability = require('@mozilla/readability');

var _jsdom = require('jsdom');

var _url = require('url');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var metascraper = require('metascraper')([require('metascraper-author')(), require('metascraper-date')(), require('metascraper-description')(), require('metascraper-image')(), require('metascraper-logo')(), require('metascraper-publisher')(), require('metascraper-title')(), require('metascraper-url')(), require('metascraper-lang')()]);

/**
 * Extract article object from HTML.
 * @param link The Url to fetch.
 * @param proxy The proxy to use.
 * @returns Article Object.
 */
var extract = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(link, proxy) {
		var url, html, dom, doc, reader, res, body, article, metadata, meta;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						url = new _url.URL(link);
						_context.next = 3;
						return (0, _utils.fetchHTML)(url.href, proxy);

					case 3:
						html = _context.sent;
						dom = (0, _cheerio.load)((0, _utils.sanitizeHTML)(html), {
							withDomLvl1: true,
							normalizeWhitespace: false,
							xmlMode: false,
							decodeEntities: false
						});

						// html = null;

						dom = (0, _utils.omitUnnecessaryTags)(dom);

						doc = new _jsdom.JSDOM(dom.html(), { url: url.href });
						reader = new _readability.Readability(doc.window.document);
						res = reader.parse();
						body = (0, _utils.cleanBody)((0, _cheerio.load)(res.content, {
							withDomLvl1: true,
							normalizeWhitespace: false,
							xmlMode: false,
							decodeEntities: false
						}));
						article = {
							body: (0, _utils.bodyHTML)(body('.page')) || '',
							text: (0, _utils.bodyText)(body) || ''
						};
						_context.next = 13;
						return metascraper({ html: html, url: url });

					case 13:
						metadata = _context.sent;
						_context.next = 16;
						return (0, _meta.scrapeMetadata)(dom);

					case 16:
						meta = _context.sent;


						article.author = metadata.author || null;
						article.date = meta.date || null;
						article.description = meta.description || '';
						article.keywords = meta.keywords || null;
						article.title = metadata.title || '';
						article.url = meta.url || null;

						article.lang = metadata.lang || null;
						article.image = metadata.image || null;
						article.logo = metadata.logo || null;
						article.publisher = metadata.publisher || null;

						return _context.abrupt('return', article);

					case 28:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function extract(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.extract = extract;