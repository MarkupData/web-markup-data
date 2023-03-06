import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {getRestaurantIdFromProps} from './getRestaurantIdFromProps';
import {selectRestaurantsList} from './selectRestaurantsList';

export const selectRestaurantById = createSelector(
	[selectRestaurantsList, getRestaurantIdFromProps],
	(restaurants, id) => (!_.isUndefined(id) ? _.find(restaurants, {id}) : undefined),
);
