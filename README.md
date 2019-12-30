[![NPM version](https://img.shields.io/npm/v/@overlook/util-make-symbols.svg)](https://www.npmjs.com/package/@overlook/util-make-symbols)
[![Build Status](https://img.shields.io/travis/overlookjs/util-make-symbols/master.svg)](http://travis-ci.org/overlookjs/util-make-symbols)
[![Dependency Status](https://img.shields.io/david/overlookjs/util-make-symbols.svg)](https://david-dm.org/overlookjs/util-make-symbols)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookjs/util-make-symbols.svg)](https://david-dm.org/overlookjs/util-make-symbols)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookjs/util-make-symbols.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookjs/util-make-symbols/master.svg)](https://coveralls.io/r/overlookjs/util-make-symbols)

# Overlook framework utility to create global symbols

Part of the [Overlook framework](https://overlookjs.github.io/).

## Usage

Create global Symbols, namespaced by module name.

Returns an object containing the specified Symbols. Symbols are created with descriptions including namespace and name, to help with debugging.

When publishing a [Router](https://www.npmjs.com/package/@overlook/router) as an NPM module, any Symbols you define should be created with `makeSymbols()`. This ensures the Symbols that module uses will be the same, no matter what version of your NPM module is imported.

```js
const makeSymbols = require('@overlook/util-make-symbols');

const symbols = makeSymbols(
  'my-module',
  [ 'FOO', 'BAR' ]
);

symbols.FOO // => Symbol(my-module.FOO)
symbols.BAR // => Symbol(my-module.BAR)
```

Symbols are cached in a global store, so creating a Symbol with same name and namespace anywhere in an app will return the same symbol.

```js
const symbols1 = makeSymbols( 'my-module', [ 'FOO' ] );
const symbols2 = makeSymbols( 'my-module', [ 'FOO' ] );
symbols1.FOO === symbols2.FOO // => true
```

### Usage in a `Router`

```js
// Published to npm as `overlook-router-wango`
const makeSymbols = require('@overlook/util-make-symbols');

const symbols = makeSymbols(
  require('./package.json').name,
  [ 'FOO', 'BAR' ]
);

const wangoRouter = /* ... define router here ... */;
wangoRouter.FOO = symbols.FOO;
wangoRouter.BAR = symbols.BAR;

module.exports = wangoRouter;
```

Now regardless of whether someone imports version `1.0.0` or `2.3.5` of your module, `require('overlook-router-wango').FOO` will be the same Symbol.

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
