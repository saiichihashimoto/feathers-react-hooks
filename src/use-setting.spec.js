import React from 'react';
import feathers from '@feathersjs/feathers';
import { act, renderHook } from '@testing-library/react-hooks';

import useSetting from './use-setting';

let app;

beforeEach(() => {
	app = feathers();
});

afterEach(() => {
	jest.resetAllMocks();
});

it('uses default value', () => {
	const { result } = renderHook(() => useSetting(app, 'name', 'default value'));
	const { current:[setting] } = result;

	expect(setting).toStrictEqual('default value');
});

it('uses default value as function', () => {
	const { result } = renderHook(() => useSetting(app, 'name', () => 'default value'));
	const { current:[setting] } = result;

	expect(setting).toStrictEqual('default value');
});

it('uses previous setting value', () => {
	app.set('name', 'previous value');

	const { result } = renderHook(() => useSetting(app, 'name'));
	const { current:[setting] } = result;

	expect(setting).toStrictEqual('previous value');
});

it('setSetting sets the value', () => {
	const { result } = renderHook(() => useSetting(app, 'name'));
	const { current:[, setSetting] } = result;

	act(() => {
		setSetting('new value');
	});

	const { current:[setting] } = result;

	expect(setting).toStrictEqual('new value');
});

it('setSetting sets the setting', () => {
	const { result } = renderHook(() => useSetting(app, 'name'));
	const { current:[, setSetting] } = result;

	act(() => {
		setSetting('new value');
	});

	expect(app.get('name')).toStrictEqual('new value');
});

it('app.set sets the value', () => {
	const { result } = renderHook(() => useSetting(app, 'name'));

	act(() => {
		app.set('name', 'new value');
	});

	const { current:[setting] } = result;

	expect(setting).toStrictEqual('new value');
});

it('setSetting affects other instances', () => {
	const { result } = renderHook(() => useSetting(app, 'name'));
	const { current:[, setSetting] } = result;

	const { result: result2 } = renderHook(() => useSetting(app, 'name'));

	act(() => {
		setSetting('new value');
	});

	const { current:[setting2] } = result2;

	expect(setting2).toStrictEqual('new value');
});

it('has separate settings per app', () => {
	const { result } = renderHook(() => useSetting(app, 'name'));
	const { current:[, setSetting] } = result;

	const otherApp = feathers();
	const { result: result2 } = renderHook(() => useSetting(otherApp, 'name'));

	act(() => {
		setSetting('new value');
	});

	const { current:[setting2] } = result2;

	expect(setting2).not.toStrictEqual('new value');
});

it('handles app changing', () => {
	const { result, rerender } = renderHook(() => useSetting(app, 'name'));

	app = feathers();
	rerender();
	const { current:[, setSetting] } = result;

	act(() => {
		setSetting('new value');
	});

	const { current:[setting] } = result;

	expect(setting).toStrictEqual('new value');
});

it('useDebugValue', () => {
	jest.spyOn(React, 'useDebugValue');

	const { result } = renderHook(() => useSetting(app, 'name', 'default value'));
	const { current:[, setSetting] } = result;

	expect(React.useDebugValue).toHaveBeenCalledWith('default value');

	act(() => {
		setSetting('new value');
	});

	expect(React.useDebugValue).toHaveBeenCalledWith('new value');
});
