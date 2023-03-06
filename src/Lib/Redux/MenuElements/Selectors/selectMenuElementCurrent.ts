import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectMenuElementsState} from './selectMenuElementsState';

export const selectMenuElementCurrent = createSelector(
	[selectMenuElementsState],
	(menuElementsState) => (_.isUndefined(menuElementsState) ? undefined : menuElementsState.current),
);
