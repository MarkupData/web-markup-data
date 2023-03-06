import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {dishesActions} from './Actions/DishesActions';

const initialState = {
	data: [],
	isLoading: false,
	isErorr: false,
};

export const dishesSlice = createSlice<DishesType, SliceCaseReducers<DishesType>, EnumStore>({
	name: EnumStore.DISHES,
	initialState,
	reducers: {},
	extraReducers: {
		[dishesActions.getList.type]: (state) => {
			state.isLoading = true;
		},
		[dishesActions.entryList.type]: (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		},
	},
});

export type Dish = {
	id: number;
	name: string;
	price: string;
	menu_ids?: number[];
};

export interface DishesType {
	data: Dish[];
	isLoading: boolean;
	isErorr: boolean;
}

export const dishesReducer = dishesSlice.reducer;
