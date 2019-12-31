/* --------------------
 * @overlook/util-make-symbols module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const makeSymbols = require('symbols-collection'),
	store = require('@overlook/symbol-store'),
	{isArray} = require('is-it-type');

// Exports
module.exports = function(namespace, names) {
	// Conform arguments
	if (isArray(namespace)) {
		names = namespace;
		namespace = null;
	}

	// Make symbols
	// Use overlook's global store if namespace provided
	let options;
	if (namespace != null) options = {store};

	return makeSymbols(namespace, names, options);
};
