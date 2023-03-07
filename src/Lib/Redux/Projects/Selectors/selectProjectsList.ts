import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import {selectProjectsState} from './selectProjectsState';

export const selectProjectsList = createSelector([selectProjectsState], (projectsState) =>
	_.isUndefined(projectsState) ? undefined : projectsState.data,
);
