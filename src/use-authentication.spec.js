import React from 'react';
import feathers from '@feathersjs/feathers';
import { act, renderHook } from '@testing-library/react-hooks';

import useAuthentication from './use-authentication';

let app;

beforeEach(() => {
	app = feathers();
	app.authenticate = jest.fn(() => new Promise());
	app.logout = jest.fn();
});

afterEach(() => {
	jest.resetAllMocks();
});

it('is initially `null`', () => {
	app.authenticate = jest.fn(() => new Promise(() => {}));
	const { result } = renderHook(() => useAuthentication(app));
	const { current: isAuthenticated } = result;

	expect(isAuthenticated).toBeNull();
});

it('is `true` after successful authenticate', async () => {
	app.authenticate = jest.fn(() => Promise.resolve());
	const { result, waitForNextUpdate } = renderHook(() => useAuthentication(app));

	await waitForNextUpdate();

	const { current: isAuthenticated } = result;

	expect(isAuthenticated).toBe(true);
});

it('is `false` after failed authenticate', async () => {
	app.authenticate = jest.fn(() => Promise.reject());
	const { result, waitForNextUpdate } = renderHook(() => useAuthentication(app));

	await waitForNextUpdate();

	const { current: isAuthenticated } = result;

	expect(isAuthenticated).toBe(false);
});

it('only calls authenticate once', () => {
	renderHook(() => useAuthentication(app));
	renderHook(() => useAuthentication(app));

	expect(app.authenticate).toHaveBeenCalledTimes(1);
});

it('remembers value from previous instances', async () => {
	app.authenticate = jest.fn(() => Promise.resolve());
	const { waitForNextUpdate } = renderHook(() => useAuthentication(app));

	await waitForNextUpdate();

	const { result } = renderHook(() => useAuthentication(app));
	const { current: isAuthenticated } = result;

	expect(isAuthenticated).toBe(true);
});

it('responds to being authenticated', async () => {
	app.authenticate = jest.fn(() => Promise.reject());
	const { result, waitForNextUpdate } = renderHook(() => useAuthentication(app));

	await waitForNextUpdate();

	act(() => {
		app.emit('authenticated');
	});

	const { current: isAuthenticated } = result;

	expect(isAuthenticated).toBe(true);
});

it('responds to logging out', async () => {
	app.authenticate = jest.fn(() => Promise.resolve());
	const { result, waitForNextUpdate } = renderHook(() => useAuthentication(app));

	await waitForNextUpdate();

	act(() => {
		app.emit('logout');
	});

	const { current: isAuthenticated } = result;

	expect(isAuthenticated).toBe(false);
});

it('useDebugValue', async () => {
	jest.spyOn(React, 'useDebugValue');

	app.authenticate = jest.fn(() => Promise.resolve());
	const { waitForNextUpdate } = renderHook(() => useAuthentication(app));

	expect(React.useDebugValue).toHaveBeenCalledWith(null);

	await waitForNextUpdate();

	expect(React.useDebugValue).toHaveBeenCalledWith(true);
});
