const { isUrl } = require('../../utils');
/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

const wrap = rule => {
	return $ => {
		let value = rule($);
		if (typeof value !== 'string') return;

		// make sure it's a url
		value = value.trim();
		if (!isUrl(value)) return;

		return value;
	};
};

/**
 * Rules.
 */

module.exports = [
	wrap($ => $('meta[property="og:url"]').attr('content')),
	wrap($ => $('meta[name="twitter:url"]').attr('content')),
	wrap($ => $('link[rel="canonical"]').attr('href')),
	wrap($ => $('link[rel="alternate"][hreflang="x-default"]').attr('href')),
	wrap(($, url) => url)
];
