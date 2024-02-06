"use strict";

var wrap = function wrap(rule) {
  return function ($) {
    var value = rule($);
    if (typeof value !== 'string') return;

    // remove extra whitespace
    return value.trim();
  };
};

/**
 * Rules.
 */

module.exports = [wrap(function ($) {
  return $('meta[property="article:tag"]').map(function () {
    return $(this).attr('content');
  }).get().join();
}), wrap(function ($) {
  return $('meta[name="keywords"]').attr('content');
}), wrap(function ($) {
  return $('a[rel="tag"]').map(function () {
    return $(this).text();
  }).get().join();
})];