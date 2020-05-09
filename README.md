[![NPM version](https://img.shields.io/npm/v/@overlook/util-make-symbols.svg)](https://www.npmjs.com/package/@overlook/util-make-symbols)
[![Build Status](https://img.shields.io/travis/overlookjs/util-make-symbols/master.svg)](http://travis-ci.org/overlookjs/util-make-symbols)
[![Dependency Status](https://img.shields.io/david/overlookjs/util-make-symbols.svg)](https://david-dm.org/overlookjs/util-make-symbols)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookjs/util-make-symbols.svg)](https://david-dm.org/overlookjs/util-make-symbols)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookjs/util-make-symbols.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookjs/util-make-symbols/master.svg)](https://coveralls.io/r/overlookjs/util-make-symbols)

# Overlook framework utility to create global symbols

Part of the [Overlook framework](https://overlookjs.github.io/).

## Usage

Create symbols for use in Overlook [plugins](https://www.npmjs.com/package/@overlook/plugin) etc.

Returns an object containing the specified Symbols. Symbols are created with descriptions matching symbol names, to help with debugging.

```js
const makeSymbols = require('@overlook/util-make-symbols');

const symbols = makeSymbols( [ 'FOO', 'BAR' ] );

symbols.FOO // => Symbol(FOO)
symbols.BAR // => Symbol(BAR)
```

### Published modules

When publishing your code as an NPM module, any Symbols you define should be created with `makeSymbols()` and module name provided as namespace.

The namespace is included in Symbol descriptions to aid debugging.

```js
const symbols = makeSymbols(
  'my-module',
  [ 'FOO', 'BAR' ]
);

symbols.FOO // => Symbol(my-module.FOO)
symbols.BAR // => Symbol(my-module.BAR)
```

When a namespace is provided, Symbols are cached in a global store, so creating a Symbol with same name and namespace anywhere in an app will return the same symbol.

```js
const symbols1 = makeSymbols( 'my-module', [ 'FOO' ] );
const symbols2 = makeSymbols( 'my-module', [ 'FOO' ] );
symbols1.FOO === symbols2.FOO // => true
```

### Usage in plugins

```js
// Published to npm as `overlook-plugin-wango`
const makeSymbols = require('@overlook/util-make-symbols');

const symbols = makeSymbols(
  require('./package.json').name,
  [ 'FOO', 'BAR' ]
);

const wangoPlugin = /* ... define plugin ... */;
wangoPlugin.FOO = symbols.FOO;
wangoPlugin.BAR = symbols.BAR;

module.exports = wangoPlugin;
```

Now regardless of whether someone imports version `1.0.0` or `2.3.5` of your plugin, `require('overlook-plugin-wango').FOO` will be the same Symbol.

## Versioning

This module follows [semver](https://semver.org/). Breaking changes will only be made in major version updates.

All active NodeJS release lines are supported (v10+ at time of writing). After a release line of NodeJS reaches end of life according to [Node's LTS schedule](https://nodejs.org/en/about/releases/), support for that version of Node may be dropped at any time, and this will not be considered a breaking change. Dropping support for a Node version will be made in a minor version update (e.g. 1.2.0 to 1.3.0). If you are using a Node version which is approaching end of life, pin your dependency of this module to patch updates only using tilde (`~`) e.g. `~1.2.3` to avoid breakages.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookjs/util-make-symbols/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookjs/util-make-symbols/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
* do not add an entry to Changelog (Changelog is created when cutting releases)
