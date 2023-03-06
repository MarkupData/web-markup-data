import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';

const initialState = {
	data: [
		{id: 0, name: '11111'},
		{id: 1, name: '33333'},
	],
	isLoading: false,
	isErorr: false,
};

export const tablesSlice = createSlice<TablesType, SliceCaseReducers<TablesType>, EnumStore>({
	name: EnumStore.TABLES,
	initialState,
	reducers: {},
	extraReducers: {},
});

export type Table = {
	id: number;
	name: string;
	date_online?: string;
	isOnline?: boolean;
};

export interface TablesType {
	data: Table[];
	isLoading: boolean;
	isErorr: boolean;
}

export const tablesReducer = tablesSlice.reducer;
