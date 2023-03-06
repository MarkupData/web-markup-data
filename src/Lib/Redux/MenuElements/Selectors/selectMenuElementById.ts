import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {getMenuElementIdFromProps} from './getMenuElementIdFromProps';
import {selectMenuElementsList} from './selectMenuElementsList';

export const selectMenuElementById = createSelector(
	[selectMenuElementsList, getMenuElementIdFromProps],
	(menuElements, id) => (!_.isUndefined(id) ? _.find(menuElements, {id}) : undefined),
);
