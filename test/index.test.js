/* --------------------
 * @overlook/util-make-symbols module
 * Tests
 * ------------------*/

'use strict';

// Modules
const store = require('@overlook/symbol-store'),
	makeSymbols = require('../index');

// Tests

// Clear store before each test
beforeEach(() => {
	for (const key in store) {
		delete store[key];
	}

	expect(store).toContainAllKeys([]); // eslint-disable-line jest/no-standalone-expect
});

it('exports a function', () => {
	expect(makeSymbols).toBeFunction();
});

it('returns an object containing symbols', () => {
	const symbols = makeSymbols('foo', ['BAR', 'QUX']);
	expect(symbols).toBeObject();
	expect(symbols).toContainAllKeys(['BAR', 'QUX']);
	expect(typeof symbols.BAR).toBe('symbol');
	expect(typeof symbols.QUX).toBe('symbol');
	expect(String(symbols.BAR)).toBe('Symbol(foo.BAR)');
	expect(String(symbols.QUX)).toBe('Symbol(foo.QUX)');
});

describe('saves symbol to store when', () => {
	it('1st use of namespace', () => {
		const symbols = makeSymbols('foo', ['BAR']);
		expect(store).toContainAllKeys(['foo']);
		expect(store.foo).toContainAllKeys(['BAR']);
		expect(store.foo.BAR).toBe(symbols.BAR);
	});

	it('2nd use of namespace', () => {
		makeSymbols('foo', ['QUX']);

		const symbols = makeSymbols('foo', ['BAR']);
		expect(store).toContainAllKeys(['foo']);
		expect(store.foo).toContainAllKeys(['BAR', 'QUX']);
		expect(store.foo.BAR).toBe(symbols.BAR);
	});
});

describe('reuses existing symbol when', () => {
	it('1st use of namespace', () => {
		const symbols1 = makeSymbols('foo', ['BAR']);
		const symbols2 = makeSymbols('foo', ['BAR']);
		expect(symbols1).toContainAllKeys(['BAR']);
		expect(symbols2).toContainAllKeys(['BAR']);
		expect(symbols2.BAR).toBe(symbols1.BAR);
	});

	it('2nd use of namespace', () => {
		makeSymbols('foo', ['QUX']);

		const symbols1 = makeSymbols('foo', ['BAR']);
		const symbols2 = makeSymbols('foo', ['BAR']);
		expect(symbols1).toContainAllKeys(['BAR']);
		expect(symbols2).toContainAllKeys(['BAR']);
		expect(symbols2.BAR).toBe(symbols1.BAR);
	});
});
