import { useCallback, useDebugValue, useEffect } from 'react';

import useSetting from './use-setting';
import { useEventEmitter } from './hooks';

function useAuthentication(app) {
	const [isAuthenticated, setIsAuthenticated] = useSetting(app, 'isAuthenticated', null);

	useDebugValue(isAuthenticated);

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

		if (!app.get('hasAttemptedAuthentication')) {
			app.set('hasAttemptedAuthentication', true);

			checkStorage();
		}
	}, [app, setIsAuthenticated]);

	const setIsAuthenticatedTrue = useCallback(() => {
		setIsAuthenticated(true);
	}, [setIsAuthenticated]);

	const setIsAuthenticatedFalse = useCallback(() => {
		setIsAuthenticated(false);
	}, [setIsAuthenticated]);

	useEventEmitter(app, 'authenticated', setIsAuthenticatedTrue);
	useEventEmitter(app, 'logout', setIsAuthenticatedFalse);

	return isAuthenticated;
}

export default useAuthentication;
