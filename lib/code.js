'use strict';

var path = require('path');
var languages = require('lang-map');
var concat = require('helper-concat');
var omit = require('object-omit');
var mdu = require('markdown-utils');
var utils = require('../utils');

/**
 * Embed code from an external file as preformatted text.
 *
 * ```js
 * <%= embed('path/to/file.js') %>
 *
 * // specify the language to use
 * <%= embed('path/to/file.hbs', 'html') %>
 * ```
 *
 * @param {String} `fp` filepath to the file to embed.
 * @param {String} `language` Optionally specify the language to use for syntax highlighting.
 * @return {String}
 * @api public
 */

exports.embed = function embed(fp, language) {
  var ext = typeof language !== 'string'
    ? path.extname(fp).slice(1)
    : language;

  var str = concat.sync(fp);
  var lang = languages.lang(ext);

  // escape backticks in fenced code blocks (inside examples)
  if (lang === 'markdown') {
    str = str.replace(/^(```)/gm, '&#x60;&#x60;&#x60;');
  }
  return mdu.pre(str, lang);
};

/**
 * Embed a jsFiddle with the given `params`
 *
 * ```js
 * <%= jsfiddle({id: '0dfk10ks', {tabs: true}}) %>
 * ```
 *
 * @param {Object} `params`
 * @return {String}
 * @api public
 */

exports.jsfiddle = function jsFiddle(params) {
  params = params || {};
  var attr = params.attr || {};

  attr.id = 'http://jsfiddle.net/' + (attr.id || '');
  attr.width = attr.width || '100%';
  attr.height = attr.height || '300';
  attr.skin = attr.skin || '/presentation/';
  attr.tabs = (attr.tabs || 'result,js,html,css') + attr.skin;
  attr.src = attr.id + '/embedded/' + attr.tabs;
  attr.allowfullscreen = attr.allowfullscreen || 'allowfullscreen';
  attr.frameborder = attr.frameborder || '0';

  attr = omit(attr, ['id', 'tabs', 'skin']);
  return '<iframe ' + utils.toAttributes(attr) + '></iframe>';
};

/**
 * Embed a GitHub Gist with the given `id`.
 *
 * ```js
 * <%=  gist("5854601") %>
 * ```
 *
 * @param {String} `id` The id of the gist to embed.
 * @return {String}
 * @api public
 */

exports.gist = function gist(id) {
  return '<script src="https://gist.github.com/' + id + '.js"></script>';
};
