'use strict';

var chrono = require('chrono-node');

var format = '^\\d{4}-\\d{2}-\\d{2}' + // Match YYYY-MM-DD
'((T\\d{2}:\\d{2}(:\\d{2})?)' + // Match THH:mm:ss
'(\\.\\d{1,6})?' + // Match .sssss
'(Z|(\\+|-)\\d{2}:\\d{2})?)?$'; // Time zone (Z or +hh:mm)

var isIso = function isIso(val) {
	var matcher = new RegExp(format);
	return typeof val === 'string' && matcher.test(val) && !isNaN(Date.parse(val));
};

var regexpRules = [{
	match: /μμ/ig,
	replace: 'pm'
}, {
	match: /πμ/ig,
	replace: 'am'
}, {
	match: /(δευ(τέρα)?|δευ(τερα)?)/ig,
	replace: 'Mon'
}, {
	match: /(τρί(τη)?|τρι(τη)?)/ig,
	replace: 'Tue'
}, {
	match: /(τε(τάρτη)?|τε(ταρτη)?)/ig,
	replace: 'Wed'
}, {
	match: /(πέμ(πτη)?|πεμ(πτη)?)/ig,
	replace: 'Thu'
}, {
	match: /(παρ(ασκευή)?|παρ(ασκευη)?)/ig,
	replace: 'Fri'
}, {
	match: /(σαβ(βάτο)?|σαβ(βατο)?|σάβ(βατο)?)/ig,
	replace: 'Sat'
}, {
	match: /(κυρ(ιακή)?|κυρ(ιακη)?)/ig,
	replace: 'Sun'
}, {
	match: /(ιαν(ουαρίου)?|ιαν(ουαριου)?)/gi,
	replace: 'Jan'
}, {
	match: /(φεβ(ρουαρίου)?|φεβ(ρουαριου)?)/gi,
	replace: 'Feb'
}, {
	match: /(μαρ(τίου)?|μαρ(τιου)?)/gi,
	replace: 'Mar'
}, {
	match: /(απρ(ιλίου)?|απρ(λίου)?)/gi,
	replace: 'Apr'
}, {
	match: /(μαΐ(ου)?|μαι(ου)?)/gi,
	replace: 'May'
}, {
	match: /(ιουν(ίου)?|ιουν(ιου)?)/gi,
	replace: 'Jun'
}, {
	match: /(ιουλ(ίου)?|ιουλ(ιου)?)/gi,
	replace: 'Jul'
}, {
	match: /(αυγ(ούστου)?|αύγ(ουστου)?)/gi,
	replace: 'Aug'
}, {
	match: /(σεπ(τεβρίου)?|σεπ(τεβριου)?)/gi,
	replace: 'Sep'
}, {
	match: /(οκτ(ωβρίου)?|οκτ(ωβριου)?)/gi,
	replace: 'Oct'
}, {
	match: /(νοε(μβρίου)?|νοε(μβριου)?)/gi,
	replace: 'Nov'
}, {
	match: /(δεκ(εμβρίου)?|δεκ(εμβριου)?)/gi,
	replace: 'Dec'
}, {
	match: /Δημοσίευση/gi,
	replace: ''
}, {
	match: /Ανανέωση/gi,
	replace: ''
}];

/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

var wrap = function wrap(rule) {
	return function ($) {
		var value = rule($);
		if (!value) return;

		value = value.replace(/\|/g, '');
		value = value.replace(/\./g, '-');
		value = value.replace(' - ', '-');
		value = value.replace(/\s{2,}/g, ' ');
		regexpRules.forEach(function (r) {
			value = value.replace(r.match, r.replace);
		});

		// remove whitespace for easier parsing
		value = value.trim();

		// convert isodates to restringify, because sometimes they are truncated
		if (isIso(value)) {
			return new Date(value).toISOString();
		}

		// try to parse with the built-in date parser
		var native = new Date(value);
		if (!isNaN(native.getTime())) {
			return native.toISOString();
		}

		value = value.replace(/-/g, '/');

		// try to parse a complex date string
		var parsed = chrono.parseDate(value);
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

module.exports = [wrap(function ($) {
	return $('meta[property="article:published_time"]').attr('content');
}), wrap(function ($) {
	return $('meta[name="dc.date"]').attr('content');
}), wrap(function ($) {
	return $('meta[name="dc.date.issued"]').attr('content');
}), wrap(function ($) {
	return $('meta[name="dc.date.created"]').attr('content');
}), wrap(function ($) {
	return $('meta[name="date"]').attr('content');
}), wrap(function ($) {
	return $('meta[name="dcterms.date"]').attr('content');
}), wrap(function ($) {
	return $('time[class*="article-date"]').attr('content');
}), wrap(function ($) {
	return $('time[class*="article-date"]').attr('datetime');
}), wrap(function ($) {
	return $('time[class*="article-date"]').text();
}), wrap(function ($) {
	return $('[itemprop="datePublished"]').attr('content');
}), wrap(function ($) {
	return $('[itemprop="datePublished"]').text();
}), wrap(function ($) {
	return $('[itemprop="datePublished"]').attr('datetime');
}), wrap(function ($) {
	return $('time[itemprop*="pubdate"]').attr('datetime');
}), wrap(function ($) {
	return $('time[itemprop*="dateCreated"]').attr('datetime');
}), wrap(function ($) {
	return $('time[itemprop="dateCreated"]').text();
}), wrap(function ($) {
	return $('[property*="dc:date"]').attr('content');
}), wrap(function ($) {
	return $('[property*="dc:created"]').attr('content');
}), wrap(function ($) {
	return $('time[datetime][pubdate]').attr('datetime');
}), wrap(function ($) {
	return $('time[datetime]').attr('datetime');
}), wrap(function ($) {
	return $('[class*="article__date"]').text();
}), wrap(function ($) {
	return $('[class*="itemDateCreated"]').text();
}), wrap(function ($) {
	return $('[class*="date"]').text();
}), wrap(function ($) {
	return $('[class*="byline"]').text();
}), wrap(function ($) {
	return $('[class*="dateline"]').text();
}), wrap(function ($) {
	return $('[id*="date"]').text();
}), wrap(function ($) {
	return $('[class*="dtcn"]').text();
}), wrap(function ($) {
	return $('[id*="publish"]').text();
}), wrap(function ($) {
	return $('[class*="publish"]').text();
}), wrap(function ($) {
	return $('[id*="post-timestamp"]').text();
}), wrap(function ($) {
	return $('[class*="post-timestamp"]').text();
}), wrap(function ($) {
	return $('[id*="post-date"]').text();
}), wrap(function ($) {
	return $('[class*="post-date"]').text();
}), wrap(function ($) {
	return $('[id*="post-meta"]').text();
}), wrap(function ($) {
	return $('[class*="post-meta"]').text();
}), wrap(function ($) {
	return $('[id*="metadata"]').text();
}), wrap(function ($) {
	return $('[class*="metadata"]').text();
}), wrap(function ($) {
	return $('[id*="time"]').text();
}), wrap(function ($) {
	return $('[class*="time"]').text();
}), wrap(function ($) {
	return $('[class*="article-created-time"]').text();
}), wrap(function ($) {
	return $('[class*="article-details-social"]').text();
}), wrap(function ($) {
	return $('meta[name="sailthru.date"]').attr('content');
}), wrap(function ($) {
	return $('meta[property="book:release_date"]').attr('content');
})];