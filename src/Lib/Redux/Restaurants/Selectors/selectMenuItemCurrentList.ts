import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectRestaurantsState} from './selectRestaurantsState';

export const selectMenuItemCurrentList = createSelector(
	[selectRestaurantsState],
	(restaurantsState) =>
		_.isUndefined(restaurantsState) ? undefined : restaurantsState.menuElementCurrent,
);
