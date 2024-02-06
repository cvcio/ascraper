const { load } = require('cheerio');
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const { URL } = require('url');

const {
	fetchAPI,
	sanitizeHTML,
	omitUnnecessaryTags,
	cleanBody,
	bodyHTML,
	bodyText
} = require('./utils');
const { scrapeMetadata } = require('./meta');

const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-description')(),
	require('metascraper-image')(),
	require('metascraper-logo')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')(),
	require('metascraper-lang')()
]);

/**
 * Extract article object from HTML.
 * @param link The Url to fetch.
 * @param proxy The proxy to use.
 * @returns Article Object.
 */
const extract = async (link, proxy) => {
	const url = new URL(link);
	const html = await fetchAPI(url.href, proxy);

	let dom = load(sanitizeHTML(html), {
		withDomLvl1: true,
		normalizeWhitespace: false,
		xmlMode: false,
		decodeEntities: false
	});

	// html = null;
	dom = omitUnnecessaryTags(dom);

	const doc = new JSDOM(dom.html(), { url: url.href });
	const reader = new Readability(doc.window.document);
	const res = reader.parse();

	const body = cleanBody(load(res.content || '', {
		withDomLvl1: true,
		normalizeWhitespace: false,
		xmlMode: false,
		decodeEntities: false
	}));

	const article = {
		body: bodyHTML(body('.page')) || '',
		text: bodyText(body) || ''
	};

	const metadata = await metascraper({ html, url });
	const meta = await scrapeMetadata(dom);

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

	return article;
};

module.exports = {
	extract
};
