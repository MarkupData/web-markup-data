import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {EmployeesTypeMenu} from '../Employees/slice';
import {EnumItemsMenu} from '../Menu/slice';
import {MenuElementsTypeRestaurant} from '../MenuElements/slice';
import {Table, TablesType} from '../Tables/slice';
import {restaurantsActions} from './Actions/RestaurantsActions';

const initialState = {
	data: [],
	isLoading: false,
	isErorr: false,
	current: {
		data: null,
		isLoading: false,
		isErorr: false,
	},
	menuElementCurrent: EnumItemsMenu.MENU,
};

export const restaurantsSlice = createSlice<
	RestaurantsType,
	SliceCaseReducers<RestaurantsType>,
	EnumStore
>({
	name: EnumStore.RESTAURANTS,
	initialState,
	reducers: {},
	extraReducers: {
		[restaurantsActions.getList.type]: (state) => {
			state.isLoading = true;
		},
		[restaurantsActions.entryList.type]: (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		},
		[restaurantsActions.handler.type]: (state) => {
			state.current.isLoading = true;
		},
		[restaurantsActions.entryCurrent.type]: (state, action) => {
			state.current.isLoading = false;
			state.current.data = {
				...action.payload,
				menus: {
					data: [],
					isLoading: false,
					isErorr: false,
				},
				employees: {
					data: [],
					isLoading: false,
					isErorr: false,
				},
				tables: {
					data: [],
					isLoading: false,
					isErorr: false,
				},
			};
		},
		[restaurantsActions.entryEmployeeListToCurrent.type]: (state, action) => {
			if (state.current.data) {
				state.current.data.employees = {
					data: action.payload,
					isLoading: false,
					isErorr: false,
				};
			}
		},
		[restaurantsActions.entryTableListToCurrent.type]: (state, action) => {
			if (state.current.data) {
				state.current.data.tables = {
					data: action.payload,
					isLoading: false,
					isErorr: false,
				};
			}
		},
		[restaurantsActions.entryMenuListToCurrent.type]: (state, action) => {
			if (state.current.data) {
				state.current.data.menus = {
					data: action.payload,
					isLoading: false,
					isErorr: false,
				};
			}
		},
		[restaurantsActions.getEmployeeListToCurrent.type]: (state) => {
			state.menuElementCurrent = EnumItemsMenu.EMPLOYEES;
			if (state.current.data?.employees) {
				state.current.data.employees.isLoading = true;
			}
		},
		[restaurantsActions.getTableListToCurrent.type]: (state) => {
			state.menuElementCurrent = EnumItemsMenu.TABLE_QR;
			if (state.current.data?.tables) {
				state.current.data.tables.isLoading = true;
			}
		},
		[restaurantsActions.getMenuListToCurrent.type]: (state) => {
			state.menuElementCurrent = EnumItemsMenu.MENU;
			if (state.current.data?.menus) {
				state.current.data.menus.isLoading = true;
			}
		},
		// [restaurantsActions.menuUpdateItem.type]: (state, action) => {
		// 	state.menuElementCurrent = action.payload;
		// },
	},
});

export type Restaurant = {
	id: number;
	name: string;
	address: string;
};

export type CurrentRestaurantData = Restaurant & {
	menus?: MenuElementsTypeRestaurant;
	employees?: EmployeesTypeMenu;
	tables?: TablesType;
};

export type CurrentRestaurant = {
	data: CurrentRestaurantData | null;
	isLoading: boolean;
	isErorr: boolean;
};

export interface RestaurantsType {
	data: Restaurant[];
	isLoading: boolean;
	isErorr: boolean;
	current: CurrentRestaurant;
	menuElementCurrent: EnumItemsMenu;
}

export const restaurantsReducer = restaurantsSlice.reducer;
