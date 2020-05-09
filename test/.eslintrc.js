/* --------------------
 * @overlook/util-make-symbols module
 * Tests ESLint config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	extends: [
		'@overlookmotel/eslint-config-jest'
	],
	rules: {
		'import/no-unresolved': ['error', {ignore: ['^@overlook/util-make-symbols$']}],
		'node/no-missing-require': ['error', {allowModules: ['@overlook/util-make-symbols']}]
	}
};
