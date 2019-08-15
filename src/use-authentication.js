import { useCallback, useDebugValue, useEffect } from 'react';
import useEventEmitter from 'use-event-emitter';

import useSetting from './use-setting';
import { HAS_ATTEMPTED_AUTHENTICATION, IS_AUTHENTICATED } from './constants';

function useAuthentication(app) {
	const [isAuthenticated, setIsAuthenticated] = useSetting(app, IS_AUTHENTICATED, null);

	useEffect(() => {
		async function checkStorage() {
			let value;

			try {
				await app.authenticate();

				value = true;
			} catch (err) {
				value = false;
			}

			setIsAuthenticated(value);
		}

		if (app.get(HAS_ATTEMPTED_AUTHENTICATION)) {
			return;
		}
		app.set(HAS_ATTEMPTED_AUTHENTICATION, true);

		checkStorage();
	}, [app, setIsAuthenticated]);

	useEventEmitter(
		app,
		'authenticated',
		useCallback(() => {
			setIsAuthenticated(true);
		}, [setIsAuthenticated])
	);

	useEventEmitter(
		app,
		'logout',
		useCallback(() => {
			setIsAuthenticated(false);
		}, [setIsAuthenticated])
	);

	useDebugValue(isAuthenticated);

	return isAuthenticated;
}

export default useAuthentication;
