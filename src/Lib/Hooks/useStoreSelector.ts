import {useSelector} from 'react-redux';

import IRootState from '../Redux/IRootState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStoreSelector = <T, P extends any[]>(
	selector: (state: IRootState, ...params: P) => T,
	...params: P
): T => {
	const selectorFunc = (state: IRootState) => selector(state, ...params);

	return useSelector(selectorFunc);
};
