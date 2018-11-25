'use strict';

const string = require('./string');

/**
 * Escape HTML characters in a string.
 *
 * ```js
 * <%= escapeHtml("<span>foo</span>") %>
 * //=> &lt;span&gt;foo&lt;&#x2F;span&gt;
 * ```
 *
 * @param {String} `str` String of HTML with characters to escape.
 * @return {String}
 * @api public
 */

exports.escapeHtml = str => {
  if (!string.isString(str)) return '';
  return str.replace(/[/"'&<>]/g, ch => {
    return ({
      '"': '&quot;',
      '&': '&amp;',
      '/': '&#x2F;',
      '<': '&lt;',
      '>': '&gt;',
      '\'': '&#39;'
    })[ch];
  });
};

/**
 * Strip HTML tags from a string, so that only the text nodes
 * are preserved.
 *
 * ```js
 * <%= sanitize("<span>foo</span>") %>
 * //=> 'foo'
 * ```
 *
 * @param  {String} `str` The string of HTML to sanitize.
 * @return {String}
 * @api public
 */

exports.sanitize = str => {
  return string.isString(str) ? str.replace(/(<([^>]+)>)/g, '').trim() : '';
};
