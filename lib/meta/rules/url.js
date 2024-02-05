'use strict';

var _utils = require('../../utils');

/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

var wrap = function wrap(rule) {
	return function ($) {
		var value = rule($);
		if (typeof value !== 'string') return;

		// make sure it's a url
		value = value.trim();
		if (!(0, _utils.isUrl)(value)) return;

		return value;
	};
};

/**
 * Rules.
 */

module.exports = [wrap(function ($) {
	return $('meta[property="og:url"]').attr('content');
}), wrap(function ($) {
	return $('meta[name="twitter:url"]').attr('content');
}), wrap(function ($) {
	return $('link[rel="canonical"]').attr('href');
}), wrap(function ($) {
	return $('link[rel="alternate"][hreflang="x-default"]').attr('href');
}), wrap(function ($, url) {
	return url;
})];