'use strict';

var _utils = require('../../utils');

var toUpperCase = function toUpperCase(str) {
	if (!str) {
		return '';
	}
	str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	return str.toUpperCase();
};

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
		if ((0, _utils.isUrl)(value)) return;
		if (value.indexOf('www.') === 0) return;
		if (value.includes('|')) return;

		// trim extra whitespace
		value = value.replace(/\s+/g, ' ');
		value = value.trim();

		// remove any extra "by" in the start of the string
		value = value.replace(/^[\s\n]*by[\s\n]*/im, '');

		// make it title case, since some sites have it in weird casing
		value = toUpperCase(value);

		return value;
	};
};

/**
 * Enforce stricter matching for a `rule`.
 *
 * @param {Function} rule
 * @return {Function} stricter
 */

var strict = function strict(rule) {
	return function ($) {
		var value = rule($);
		var regexp = /^\S+\s+\S+/;
		if (!regexp.test(value)) return;

		// trim extra whitespace
		value = value.replace(/\s+/g, ' ');
		value = value.trim();

		// remove any extra "by" in the start of the string
		value = value.replace(/^[\s\n]*by[\s\n]*/im, '');

		// make it title case, since some sites have it in weird casing
		value = toUpperCase(value);

		return value;
	};
};

var getFirst = function getFirst($, collection) {
	return collection.filter(function (i, el) {
		return $(el).text().trim();
	}).first().text();
};

/**
 * Rules.
 */

module.exports = [wrap(function ($) {
	return $('meta[property="author"]').attr('content');
}), wrap(function ($) {
	return $('meta[property="article:author"]').attr('content');
}), wrap(function ($) {
	return $('meta[name="author"]').attr('content');
}), wrap(function ($) {
	return $('meta[name="sailthru.author"]').attr('content');
}), wrap(function ($) {
	return $('[class*="article-author"]').text();
}), wrap(function ($) {
	return $('[rel="author"]').first().text();
}), wrap(function ($) {
	return $('[itemprop*="author"] [itemprop="name"]').first().text();
}), wrap(function ($) {
	return $('[itemprop*="author"]').first().text();
}), wrap(function ($) {
	return $('meta[property="book:author"]').attr('content');
}), strict(wrap(function ($) {
	return $('a[class*="author"]').first().text();
})), strict(wrap(function ($) {
	return $('[class*="author"] a').first().text();
})), strict(wrap(function ($) {
	return getFirst($, $('a[href*="/author/"]'));
})), wrap(function ($) {
	return $('a[class*="screenname"]').first().text();
}), strict(wrap(function ($) {
	return $('[class*="author"]').first().text();
})), strict(wrap(function ($) {
	return $('[class*="byline"]').first().text();
})), wrap(function ($) {
	return getFirst($, $('.fullname'));
}), wrap(function ($) {
	return $('[class*="user-info"]').text();
})];