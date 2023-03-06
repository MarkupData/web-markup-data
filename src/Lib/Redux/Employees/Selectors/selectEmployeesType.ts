import _ from 'lodash';
import {createSelector} from '../../../../Utils/Redux';
import getPropsEmployeesType from './getPropsEmployeesType';
import {selectEmployeesState} from './selectEmployeesState';

export const selectEmployeesType = createSelector(
	[selectEmployeesState, getPropsEmployeesType],
	(employeesState, type) => (_.isUndefined(type) ? undefined : employeesState[type]),
);
