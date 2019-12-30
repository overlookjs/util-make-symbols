/* --------------------
 * @overlook/util-make-symbols module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const makeSymbols = require('symbols-collection'),
	store = require('@overlook/symbol-store');

// Exports
module.exports = function(namespace, names) {
	return makeSymbols(namespace, names, {store});
};
