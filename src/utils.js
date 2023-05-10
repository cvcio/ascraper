import axios from 'axios';
import sanitize from 'sanitize-html';
import UserAgent from 'user-agents';
import { REGEXP } from './regexp';
import { URL } from 'url';
import got from 'got';
import { SocksProxyAgent } from 'socks-proxy-agent';
const isUrl = (str) => {
	return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-|.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(str);
};

const fetchHTML = async (link, proxy) => {
	const url = new URL(link);

	if (!url.href) throw new Error(`Please specify a URL`);
	if (!isUrl(url.href)) throw new Error(`Requested URL is not a valid: ${url.href}`);

	const userAgent = new UserAgent();
	axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8;text/html;text/plain';
	axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
	axios.defaults.headers.get['User-Agent'] = userAgent.toString();

	const req = {
		method: 'get',
		url: url.href,
		insecureHTTPParser: true,
		timeout: 60000,
	};

	if (proxy) {
		const torProxyAgent = new SocksProxyAgent(proxy);

		req.timeout = 60000;
		req.httpsAgent = torProxyAgent;
		req.httpAgent = torProxyAgent;
	}

	const html = await axios(req);
	if (html.status >= 400) {
		throw new Error(`Error Not Found or Not Authorized: ${html.status} ${html.statusText}`);
	}
	return html.data;
};

const fetchAPI = async (link) => {
	const url = new URL(link);

	if (!url.href) throw new Error(`Please specify a URL`);
	if (!isUrl(url.href)) throw new Error(`Requested URL is not a valid: ${url.href}`);

	const userAgent = new UserAgent();
	const options = {
		headers: {
			'Content-Type': 'application/json;charset=utf-8;text/html;text/plain',
			'Access-Control-Allow-Origin': '*',
			'User-Agent': userAgent.toString()
		}
	};

	try {
		const { body: html } = await got(url.href, { method: 'GET' }, options);
		return html  || null;
	} catch (error) {
		return error;
	}
};


const sanitizeHTML = (html) => {
	/**
     * Sanitize the possibly nasty HTML from some web pages
     */
	return sanitize(html, {
		nonTextTags: ['iframe', 'link', 'noscript', 'script', 'style'],
		allowedAttributes: {
			'*': [
				'id',
				'class',
				'data-type',
				'href',
				'itemprop',
				'itemtype',
				'datetime',
				'rel',
				'src',
				'title'
			],
			article: ['*'],
			main: ['*'],
			meta: ['*']
	    },
		allowedTags: [
			'a',
			'article',
			'aside',
			'b',
			'blockquote',
			'body',
			'br',
			'cite',
			'code',
			'div',
			'em',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'head',
			'header',
			'html',
			'i',
			'img',
			'li',
			'main',
			'meta',
			'ol',
			'p',
			'pre',
			'section',
			'small',
			'strike',
			'strong',
			'span',
			'time',
			'title',
			'ul',
			'link'
		]
	});
};

const omitUnnecessaryTags = ($) => {
	$('script').remove();
   	$('style').remove();
   	$('#header').remove();
   	$('#page-header').remove();
   	$('#footer').remove();
   	$('#navigation').remove();
	$('#comments').remove();
	$('#sidebar').remove();
	return $;
};

const cleanBody = ($) => {
	let copy = $;
	let blackBodyElems = new RegExp(REGEXP.blackBodyElems);
	let unlikelyCandidates = new RegExp(REGEXP.unlikelyCandidates);
	let negative = new RegExp(REGEXP.negative);
	copy('*').filter(function () {
		if (blackBodyElems.test($(this).get(0).name)) {
			$(this).remove();
		}
	});
	copy('*').filter(function () {
		if (unlikelyCandidates.test($(this).get(0).name)) {
			$(this).remove();
		}
	});
	copy('*').filter(function () {
		if (negative.test($(this).get(0).name)) {
			$(this).remove();
		}
	});

	copy('*').filter(function () {
		if ('' === $(this).text().trim()) {
			$(this).remove();
		}
	});
	return $;
};

const bodyHTML = ($) => {
	return $.html()
		.replace(/<\s*br[^>]?>/, '\n\n')
		// .replace(/(<([^>]+)>)/g, ' ')
		.replace(/[\s\t]+/g, ' ')
		.trim();
};

const bodyText = ($) => {
	return $.html()
		.replace(/<\s*br[^>]?>/, '\n\n')
		.replace(/(<([^>]+)>)/g, ' ')
		.replace(/[\s\t]+/g, ' ')
		.trim();
};

export {
	isUrl,
	fetchHTML,
	fetchAPI,
	bodyHTML,
	bodyText,
	cleanBody,
	sanitizeHTML,
	omitUnnecessaryTags
};
