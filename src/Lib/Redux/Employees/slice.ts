import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {employeesActions} from './Actions/EmployeesActions';

export enum EnumTypeEmployees {
	WAITER = 'waiter',
	COOK = 'cook',
}

const initialState = {
	cook: [],
	waiter: [],
	isLoading: false,
	isErorr: false,
};

export const employeesSlice = createSlice<
	EmployeesType,
	SliceCaseReducers<EmployeesType>,
	EnumStore
>({
	name: EnumStore.EMPLOYEES,
	initialState,
	reducers: {},
	extraReducers: {
		[employeesActions.getList.type]: (state) => {
			state.isLoading = true;
		},
		[employeesActions.entryList.type]: (state, action) => {
			state.cook = action.payload.cook;
			state.waiter = action.payload.waiter;
			state.isLoading = false;
		},
	},
});

export type Employee = {
	id: number;
	name: string;
	type: EnumTypeEmployees;
	restaurant_id: number;
};

export type EmployeesTypeMenu = {
	data: Employee[];
	isLoading: boolean;
	isErorr: boolean;
};

export interface EmployeesType {
	cook: Employee[];
	waiter: Employee[];
	isLoading: boolean;
	isErorr: boolean;
}

export const employeesReducer = employeesSlice.reducer;
