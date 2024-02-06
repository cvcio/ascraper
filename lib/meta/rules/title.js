"use strict";

/**
 * Wrap a rule with validation and formatting logic.
 *
 * @param {Function} rule
 * @return {Function} wrapped
 */

var wrap = function wrap(rule) {
  return function ($) {
    var value = rule($);
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

module.exports = [wrap(function ($) {
  return $('meta[property="og:title"]').attr('content');
}), wrap(function ($) {
  return $('meta[property="dc:title"]').attr('content');
}), wrap(function ($) {
  return $('meta[property="dcterm:title"]').attr('content');
}), wrap(function ($) {
  return $('meta[name="twitter:title"]').attr('content');
}), wrap(function ($) {
  return $('h1[class="post-title"]').text();
}), wrap(function ($) {
  return $('h2[class="post-title"]').text();
}), wrap(function ($) {
  return $('h1[class="entry-title"]').text();
}), wrap(function ($) {
  return $('h2[class="entry-title"]').text();
}), wrap(function ($) {
  return $('.post-title').text();
}), wrap(function ($) {
  return $('.entry-title').text();
}), wrap(function ($) {
  return $('[itemtype="http://schema.org/BlogPosting"] [itemprop="name"]').text();
}), wrap(function ($) {
  return $('title').text();
}), wrap(function ($) {
  return $('h1[class*="title"] a').text();
}), wrap(function ($) {
  return $('h1[class*="title"]').text();
}), wrap(function ($) {
  return $('h1').text();
}), wrap(function ($) {
  return $('h2').text();
})];