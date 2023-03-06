import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectTablesState} from './selectTablesState';

export const selectTablesList = createSelector([selectTablesState], (tablesState) =>
	_.isUndefined(tablesState) ? undefined : tablesState.data,
);
