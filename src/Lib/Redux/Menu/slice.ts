import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {menuActions} from './Actions/menuActions';

export enum EnumItemsMenu {
	HOME = 'home',
	RESTAURANT = 'restaurant',
	MENU = 'menu',
	EMPLOYEES = 'employee',
	TABLE_QR = 'table_qr',
	REPORTS = 'reports',
	DISHES = 'dish',
}

const initialState = {address: `${EnumItemsMenu.HOME}>`};

export const menuSlice = createSlice<MenuType, SliceCaseReducers<MenuType>, EnumStore>({
	name: EnumStore.MENU,
	initialState,
	reducers: {},
	extraReducers: {
		[menuActions.handler.type]: (state, action) => {
			state.prev_address = state.address;
			state.address = action.payload.address;
		},
	},
});

export interface MenuType {
	address: string;
	prev_address?: string;
	next_address?: string;
}

export const menuReducer = menuSlice.reducer;
