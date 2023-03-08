import {createSelector} from '../../../../Utils/Redux';
import {selectProjectsState} from './selectProjectsState';

export const selectTaskClasses = createSelector(
	[selectProjectsState],
	(projectsState) => projectsState.task_classes,
);
