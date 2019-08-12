import { useCallback, useDebugValue, useState } from 'react';

import { useEventEmitter } from './hooks';

function useSetting(app, name, initialState) {
	const [state, setState] = useState(() => {
		const currentValue = app.get(name);

		return currentValue === undefined
			? typeof initialState === 'function'
				? initialState()
				: initialState
			: currentValue;
	});

	useDebugValue(state);

	useEventEmitter(app, `settingchange:${name}`, setState);

	return [
		state,
		useCallback((value) => {
			app.set(name, value);
			app.emit(`settingchange:${name}`, value);
		}, [app, name]),
	];
}

export default useSetting;
