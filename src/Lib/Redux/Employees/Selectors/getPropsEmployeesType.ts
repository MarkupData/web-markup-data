import _ from 'lodash';
import {ParametricSelector} from '@reduxjs/toolkit';

import IRootState from '../../IRootState';
import {EnumTypeEmployees} from '../slice';

const getPropsEmployeesType: ParametricSelector<
	IRootState,
	{type?: EnumTypeEmployees},
	string | undefined
> = (_state: IRootState, props?: {type?: EnumTypeEmployees}) =>
	_.isUndefined(props) ? undefined : props.type;

export default getPropsEmployeesType;
