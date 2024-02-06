const axios = require('axios');
const sanitize = require('sanitize-html');
const UserAgent = require('user-agents');
const { URL } = require('url');
const { gotScraping } = require('got-scraping');
const https = require('https');
const http = require('http');
const { REGEXP } = require('./regexp');


class ResponseError extends Error {
	constructor (message, code, error) {
		super(message);
		this.code = code || error.code || 500;
		this.name = 'ResponseError';
	}
}

const isUrl = str => {
	return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-|.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(str);
};

const request = async options => {
	const source = axios.CancelToken.source();
	let id =
		options.timeout &&
		setTimeout(() => {
			id = 0;
			source.cancel(`Timeout of ${options.timeout}ms.`);
		}, options.timeout);

	options.cancelToken = source.token;
	return axios(options).finally(() => {
		id && clearTimeout(id);
	});
};

const fetchHTML = async (link, proxy) => {
	const url = new URL(link);

	if (!url.href) throw new Error('Please specify a URL');
	if (!isUrl(url.href)) {
		throw new Error(`Requested URL is not a valid: ${url.href}`);
	}

	const userAgent = new UserAgent();
	axios.defaults.headers.get['Content-Type'] =
		'application/json;charset=utf-8;text/html;text/plain';
	axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
	axios.defaults.headers.get['User-Agent'] = userAgent.toString();
	axios.defaults.headers.get.Referer = 'https://news.google.com/';

	const req = {
		method: 'get',
		url: url.href,
		insecureHTTPParser: true,
		timeout: 10000,
		httpAgent: new http.Agent({
			keepAlive: true,
			rejectUnauthorized: false
		}),
		httpsAgent: new https.Agent({
			keepAlive: true,
			rejectUnauthorized: false
		})
	};

	if (proxy && proxy !== '') {
		req.proxy = proxy;
	}

	const html = await request(req);
	if (html.status >= 400) {
		throw new Error(`Error Not Found or Not Authorized: ${html.status} ${html.statusText}`);
	}
	return html.data;
};

const fetchAPI = async (link, proxy) => {
	const url = new URL(link);

	if (!url.href) throw new Error('Please specify a URL');
	if (!isUrl(url.href)) {
		throw new Error(`Requested URL is not a valid: ${url.href}`);
	}

	const userAgent = new UserAgent();
	const options = {
		throwHttpErrors: false,
		url: url.href,
		responseType: 'text',
		followRedirect: true,
		http2: false,
		maxRedirects: 3,
		headers: {
			'Content-Type':
				'application/json;charset=utf-8;text/html;text/plain',
			'Access-Control-Allow-Origin': '*',
			'User-Agent': userAgent.toString()
		}
	};

	if (proxy && proxy !== '') {
		options.proxyUrl = proxy;
	}

	const client = gotScraping.extend(options);

	try {
		const res = await client(options);
		if (!res.ok || res.statusCode >= 400) {
			throw new ResponseError(res.statusMessage,
				res.statusCode,
				res.ResponseError);
		}

		return res.body || null;
	} catch (err) {
		throw new ResponseError(err.message, err.code || 500, err);
	}
};

const sanitizeHTML = html => {
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

const omitUnnecessaryTags = $ => {
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

const cleanBody = $ => {
	const copy = $;
	const blackBodyElems = new RegExp(REGEXP.blackBodyElems);
	const unlikelyCandidates = new RegExp(REGEXP.unlikelyCandidates);
	const negative = new RegExp(REGEXP.negative);
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
		if ($(this).text().trim() === '') {
			$(this).remove();
		}
	});
	return $;
};

const bodyHTML = $ => {
	return (
		$.html()
			.replace(/<\s*br[^>]?>/, '\n\n')
			// .replace(/(<([^>]+)>)/g, ' ')
			.replace(/[\s\t]+/g, ' ')
			.trim()
	);
};

const bodyText = $ => {
	return $.html()
		.replace(/<\s*br[^>]?>/, '\n\n')
		.replace(/(<([^>]+)>)/g, ' ')
		.replace(/[\s\t]+/g, ' ')
		.trim();
};

module.exports = {
	isUrl,
	fetchHTML,
	fetchAPI,
	bodyHTML,
	bodyText,
	cleanBody,
	sanitizeHTML,
	omitUnnecessaryTags
};
