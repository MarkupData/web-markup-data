import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {getProjectIdFromProps} from './getProjectIdFromProps';
import {selectProjectsList} from './selectProjectsList';

export const selectProjectById = createSelector(
	[selectProjectsList, getProjectIdFromProps],
	(projects, id) => (!_.isUndefined(id) ? _.find(projects, {id}) : undefined),
);
