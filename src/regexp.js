const REGEXP = {
	// NOTE: These two regular expressions are duplicated in
	// Readability-readerable.js. Please keep both copies in sync.
	unlikelyCandidates:
		/aside|iframe|link|noscript|script|style|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|foot|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote|caption|category/i,
	okMaybeItsACandidate: /and|article|body|column|main|shadow|story/i,
	divToPElements: /<(a|blockquote|dl|div|img|ol|p|pre|table|ul)/i,
	positive:
		/article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
	negative:
		/hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
	extraneous:
		/print|archive|comment|discuss|e[-]?mail|share|reply|all|login|sign|single|utility/i,
	byline: /byline|author|dateline|writtenby|p-author/i,
	replaceFonts: /<(\/?)font[^>]*>/gi,
	normalize: /\s{2,}/g,
	videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
	nextLink: /(next|weiter|continue|>([^|]|$)|»([^|]|$))/i,
	prevLink: /(prev|earl|old|new|<|«)/i,
	whitespace: /^\s*$/,
	hasContent: /\S$/,
	trimRe: /^\s+|\s+$/g,
	whiteBodyElems:
		/^a|blockquote|div|^ol|^p|^pre|table|ul|^li|h1|h2|h3|h4|span|strong|^b|^br|^i|^em|html|body/g,
	blackBodyElems: /^head|time|meta|img|itemprop="keywords"/g
};

module.exports = {
	REGEXP
};
