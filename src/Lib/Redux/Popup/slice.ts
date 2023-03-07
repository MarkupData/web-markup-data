import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {ReactNode} from 'react';

import EnumStore from '../../../BusinessLogic/EnumStore';
import {popupActions} from './Actions/PopupActions';

const initialState = {
	children: null,
	isView: false,
	isCanClouse: false,
};

export const popupSlice = createSlice<PopupType, SliceCaseReducers<PopupType>, EnumStore>({
	name: EnumStore.POPUP,
	initialState,
	reducers: {},
	extraReducers: {
		[popupActions.open.type]: (state, action) => {
			state.children = action.payload.children;
			state.isCanClouse = action.payload.isCanClouse ?? false;
			state.isView = true;
		},
		[popupActions.close.type]: (state) => {
			state.children = null;
			state.isView = false;
			state.isCanClouse = false;
		},
	},
});

export interface PopupType {
	children: ReactNode | null;
	isView: boolean;
	isCanClouse: boolean;
}

export const popupReducer = popupSlice.reducer;
