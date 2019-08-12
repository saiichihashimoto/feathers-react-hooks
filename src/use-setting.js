import { useCallback, useEffect, useDebugValue, useState } from 'react';

import { HAS_BEEN_WRAPPED, SETTING_CHANGED } from './constants';
import { useEventEmitter } from './hooks';

function wrapSet(app) {
	const wrappedSet = app.set.bind(app);

	app.set = (name, value) => { // eslint-disable-line no-param-reassign
		wrappedSet(name, value);

		app.emit(SETTING_CHANGED(name), value);
	};
}

function useSetting(app, name, initialState) {
	const [state, setState] = useState(() => {
		const currentValue = app.get(name);

		return currentValue === undefined
			? typeof initialState === 'function'
				? initialState()
				: initialState
			: currentValue;
	});

	useEffect(() => {
		if (app.get(HAS_BEEN_WRAPPED)) {
			return;
		}
		app.set(HAS_BEEN_WRAPPED, true);

		wrapSet(app);
	}, [app]);

	useEventEmitter(app, SETTING_CHANGED(name), setState);

	useDebugValue(state);

	return [
		state,
		useCallback((value) => {
			app.set(name, value);
		}, [app, name]),
	];
}

export default useSetting;
