import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {DishesType} from '../Dishes/slice';
import {menuElementsActions} from './Actions/MenuElemetsActions';

const initialState = {
	data: [],
	isLoading: false,
	isErorr: false,
	current: {
		data: null,
		isLoading: false,
		isErorr: false,
	},
};

export const menuElementsSlice = createSlice<
	MenuElementsType,
	SliceCaseReducers<MenuElementsType>,
	EnumStore
>({
	name: EnumStore.MENU_ELEMETS,
	initialState,
	reducers: {},
	extraReducers: {
		[menuElementsActions.getList.type]: (state) => {
			state.isLoading = true;
		},
		[menuElementsActions.entryList.type]: (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		},
		[menuElementsActions.handler.type]: (state) => {
			state.current.isLoading = true;
		},
		[menuElementsActions.entryCurrent.type]: (state, action) => {
			state.current.isLoading = false;
			state.current.data = {
				...action.payload,
				dishes: {
					data: [],
					isLoading: true,
					isErorr: false,
				},
			};
		},
		[menuElementsActions.entryDishListToCurrent.type]: (state, action) => {
			if (state.current.data) {
				state.current.data.dishes = {
					data: action.payload,
					isLoading: false,
					isErorr: false,
				};
			}
		},
	},
});

export type ElementMenuRoot = {
	id: number;
	name: string;
	restaurant_ids?: number[];
};

export type ElementMenu = ElementMenuRoot & {
	dishes?: DishesType;
};

export interface MenuElementsTypeRestaurant {
	data: ElementMenuRoot[];
	isLoading: boolean;
	isErorr: boolean;
}
export type CurrentElementMenu = {
	data: ElementMenu | null;
	isLoading: boolean;
	isErorr: boolean;
};

export interface MenuElementsType {
	data: ElementMenuRoot[];
	isLoading: boolean;
	isErorr: boolean;
	current: CurrentElementMenu;
}

export const menuElementsReducer = menuElementsSlice.reducer;
