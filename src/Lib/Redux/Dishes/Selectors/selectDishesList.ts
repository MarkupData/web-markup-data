import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectDishesState} from './selectDishesState';

export const selectDishesList = createSelector([selectDishesState], (dishesState) => {
	return _.isUndefined(dishesState) ? undefined : dishesState.data;
});
