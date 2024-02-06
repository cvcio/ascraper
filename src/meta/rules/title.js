/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

const wrap = rule => {
	return $ => {
		let value = rule($);
		if (typeof value !== 'string' || !value) return;

		value = value.replace(/\s+/g, ' ');
		value = value.split('|')[0];
		value = value.trim();

		return value;
	};
};

/**
 * Rules.
 */

module.exports = [
	wrap($ => $('meta[property="og:title"]').attr('content')),
	wrap($ => $('meta[property="dc:title"]').attr('content')),
	wrap($ => $('meta[property="dcterm:title"]').attr('content')),
	wrap($ => $('meta[name="twitter:title"]').attr('content')),
	wrap($ => $('h1[class="post-title"]').text()),
	wrap($ => $('h2[class="post-title"]').text()),
	wrap($ => $('h1[class="entry-title"]').text()),
	wrap($ => $('h2[class="entry-title"]').text()),
	wrap($ => $('.post-title').text()),
	wrap($ => $('.entry-title').text()),
	wrap($ =>
		$('[itemtype="http://schema.org/BlogPosting"] [itemprop="name"]').text()),
	wrap($ => $('title').text()),
	wrap($ => $('h1[class*="title"] a').text()),
	wrap($ => $('h1[class*="title"]').text()),
	wrap($ => $('h1').text()),
	wrap($ => $('h2').text())
];
