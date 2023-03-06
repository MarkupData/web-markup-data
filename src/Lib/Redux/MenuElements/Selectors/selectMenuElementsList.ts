import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectMenuElementsState} from './selectMenuElementsState';

export const selectMenuElementsList = createSelector(
	[selectMenuElementsState],
	(menuElementsState) => (_.isUndefined(menuElementsState) ? undefined : menuElementsState.data),
);
