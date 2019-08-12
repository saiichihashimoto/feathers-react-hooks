/* istanbul ignore file */
import { useDebugValue, useEffect } from 'react';

function useEventEmitter(emitter, name, handler) {
	// TODO Publish useEventEmitter to npm

	useDebugValue(handler);

	useEffect(() => {
		emitter.on(name, handler);

		return () => emitter.removeListener(name, handler);
	}, [handler, emitter, name]);
}

export {
	useEventEmitter,
};
