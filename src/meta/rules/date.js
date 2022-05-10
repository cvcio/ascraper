const chrono = require('chrono-node');

const format = '^\\d{4}-\\d{2}-\\d{2}' + // Match YYYY-MM-DD
	'((T\\d{2}:\\d{2}(:\\d{2})?)' + // Match THH:mm:ss
	'(\\.\\d{1,6})?' + // Match .sssss
	'(Z|(\\+|-)\\d{2}:\\d{2})?)?$'; // Time zone (Z or +hh:mm)

const isIso = (val) => {
	const matcher = new RegExp(format);
	return typeof val === 'string' && matcher.test(val) && !isNaN(Date.parse(val));
};

const regexpRules = [
	{
		match: /μμ/ig,
		replace: 'pm'
	},
	{
		match: /πμ/ig,
		replace: 'am'
	},
	{
		match: /(δευ(τέρα)?|δευ(τερα)?)/ig,
		replace: 'Mon'
	},
	{
		match: /(τρί(τη)?|τρι(τη)?)/ig,
		replace: 'Tue'
	},
	{
		match: /(τε(τάρτη)?|τε(ταρτη)?)/ig,
		replace: 'Wed'
	},
	{
		match: /(πέμ(πτη)?|πεμ(πτη)?)/ig,
		replace: 'Thu'
	},
	{
		match: /(παρ(ασκευή)?|παρ(ασκευη)?)/ig,
		replace: 'Fri'
	},
	{
		match: /(σαβ(βάτο)?|σαβ(βατο)?|σάβ(βατο)?)/ig,
		replace: 'Sat'
	},
	{
		match: /(κυρ(ιακή)?|κυρ(ιακη)?)/ig,
		replace: 'Sun'
	},
	{
		match: /(ιαν(ουαρίου)?|ιαν(ουαριου)?)/gi,
		replace: 'Jan'
	},
	{
		match: /(φεβ(ρουαρίου)?|φεβ(ρουαριου)?)/gi,
		replace: 'Feb'
	},
	{
		match: /(μαρ(τίου)?|μαρ(τιου)?)/gi,
		replace: 'Mar'
	},
	{
		match: /(απρ(ιλίου)?|απρ(λίου)?)/gi,
		replace: 'Apr'
	},
	{
		match: /(μαΐ(ου)?|μαι(ου)?)/gi,
		replace: 'May'
	},
	{
		match: /(ιουν(ίου)?|ιουν(ιου)?)/gi,
		replace: 'Jun'
	},
	{
		match: /(ιουλ(ίου)?|ιουλ(ιου)?)/gi,
		replace: 'Jul'
	},
	{
		match: /(αυγ(ούστου)?|αύγ(ουστου)?)/gi,
		replace: 'Aug'
	},
	{
		match: /(σεπ(τεβρίου)?|σεπ(τεβριου)?)/gi,
		replace: 'Sep'
	},
	{
		match: /(οκτ(ωβρίου)?|οκτ(ωβριου)?)/gi,
		replace: 'Oct'
	},
	{
		match: /(νοε(μβρίου)?|νοε(μβριου)?)/gi,
		replace: 'Nov'
	},
	{
		match: /(δεκ(εμβρίου)?|δεκ(εμβριου)?)/gi,
		replace: 'Dec'
	},
	{
		match: /Δημοσίευση/gi,
		replace: ''
	},
	{
		match: /Ανανέωση/gi,
		replace: ''
	}
];

/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

const wrap = (rule) => {
	return function ($) {
		let value = rule($);
		if (!value) return;

		value = value.replace(/\|/g, '');
		value = value.replace(/\./g, '-');
		value = value.replace(' - ', '-');
		value = value.replace(/\s{2,}/g, ' ');
		regexpRules.forEach((r) => {
			value = value.replace(r.match, r.replace);
		});

		// remove whitespace for easier parsing
		value = value.trim();

		// convert isodates to restringify, because sometimes they are truncated
		if (isIso(value)) {
			return new Date(value).toISOString();
		}

		// try to parse with the built-in date parser
		const native = new Date(value);
		if (!isNaN(native.getTime())) {
			return native.toISOString();
		}

		value = value.replace(/-/g, '/');

		// try to parse a complex date string
		const parsed = chrono.parseDate(value);
		if (parsed) {
			/**
			 *
			 * Add Support for Locale Dates
			 *
			 */
			return parsed.toISOString();
		}

		return '';
	};
};

/**
 * Rules.
 */

module.exports = [
	wrap($ => $('meta[property="article:published_time"]').attr('content')),
	wrap($ => $('meta[name="dc.date"]').attr('content')),
	wrap($ => $('meta[name="dc.date.issued"]').attr('content')),
	wrap($ => $('meta[name="dc.date.created"]').attr('content')),
	wrap($ => $('meta[name="date"]').attr('content')),
	wrap($ => $('meta[name="dcterms.date"]').attr('content')),

	wrap($ => $('time[class*="article-date"]').attr('content')),
	wrap($ => $('time[class*="article-date"]').attr('datetime')),
	wrap($ => $('time[class*="article-date"]').text()),

	wrap($ => $('[itemprop="datePublished"]').attr('content')),
	wrap($ => $('[itemprop="datePublished"]').text()),
	wrap($ => $('[itemprop="datePublished"]').attr('datetime')),

	wrap($ => $('time[itemprop*="pubdate"]').attr('datetime')),
	wrap($ => $('time[itemprop*="dateCreated"]').attr('datetime')),
	wrap($ => $('time[itemprop="dateCreated"]').text()),

	wrap($ => $('[property*="dc:date"]').attr('content')),
	wrap($ => $('[property*="dc:created"]').attr('content')),

	wrap($ => $('time[datetime][pubdate]').attr('datetime')),
	wrap($ => $('time[datetime]').attr('datetime')),

	wrap($ => $('[class*="article__date"]').text()),
	wrap($ => $('[class*="itemDateCreated"]').text()),
	wrap($ => $('[class*="date"]').text()),
	wrap($ => $('[class*="byline"]').text()),
	wrap($ => $('[class*="dateline"]').text()),
	wrap($ => $('[id*="date"]').text()),
	wrap($ => $('[class*="dtcn"]').text()),
	wrap($ => $('[id*="publish"]').text()),
	wrap($ => $('[class*="publish"]').text()),
	wrap($ => $('[id*="post-timestamp"]').text()),
	wrap($ => $('[class*="post-timestamp"]').text()),
	wrap($ => $('[id*="post-date"]').text()),
	wrap($ => $('[class*="post-date"]').text()),
	wrap($ => $('[id*="post-meta"]').text()),
	wrap($ => $('[class*="post-meta"]').text()),
	wrap($ => $('[id*="metadata"]').text()),
	wrap($ => $('[class*="metadata"]').text()),
	wrap($ => $('[id*="time"]').text()),
	wrap($ => $('[class*="time"]').text()),
	wrap($ => $('[class*="article-created-time"]').text()),
	wrap($ => $('[class*="article-details-social"]').text()),

	wrap($ => $('meta[name="sailthru.date"]').attr('content')),
	wrap($ => $('meta[property="book:release_date"]').attr('content'))
];
