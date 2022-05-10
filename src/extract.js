import { fetchHTML, sanitizeHTML, omitUnnecessaryTags, cleanBody, bodyHTML, bodyText } from './utils';
import { scrapeMetadata } from './meta';

import { load } from 'cheerio';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { URL } from 'url';

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
 * @param lang Language ISO 639-1 Code.
 * @param fallback Classpath object used by (cheerio)[https://github.com/cheeriojs/cheerio] to use when extract fails.
 * @returns Article Object.
 */
const extract = async (link) => {
	const url = new URL(link);

	let html = await fetchHTML(url.href);
	let dom = load(sanitizeHTML(html), {
		withDomLvl1: true,
		normalizeWhitespace: false,
		xmlMode: false,
		decodeEntities: false
	});

	// html = null;
	dom = omitUnnecessaryTags(dom);

	let doc = new JSDOM(dom.html(), { url: url.href });
	let reader = new Readability(doc.window.document);
	let res = reader.parse();

	let body = cleanBody(load(res.content, {
		withDomLvl1: true,
		normalizeWhitespace: false,
		xmlMode: false,
		decodeEntities: false
	}));

	let article = {
		body: bodyHTML(body('.page')) || '',
		text: bodyText(body) || ''
	};

	const metadata = await metascraper({ html, url });
	let meta = await scrapeMetadata(dom);

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

export {
	extract
};
