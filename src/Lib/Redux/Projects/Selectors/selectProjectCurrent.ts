import {createSelector} from '../../../../Utils/Redux';
import {selectProjectsState} from './selectProjectsState';

export const selectProjectCurrent = createSelector(
	[selectProjectsState],
	(projectsState) => projectsState.current,
);
