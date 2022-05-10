'use strict';

var author = require('./author');
var date = require('./date');
var publisher = require('./publisher');
var title = require('./title');
var description = require('./description');
var keywords = require('./keywords');
var url = require('./url');

/**
 * Export.
 */

module.exports = {
	author: author,
	date: date,
	publisher: publisher,
	title: title,
	description: description,
	keywords: keywords,
	url: url
};