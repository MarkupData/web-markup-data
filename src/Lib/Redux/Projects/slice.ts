import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {projectsActions} from './Actions/ProjectsActions';

const initialState = {
	data: [],
	isLoading: false,
	isErorr: false,
	current: undefined,
};

export const projectsSlice = createSlice<ProjectsType, SliceCaseReducers<ProjectsType>, EnumStore>({
	name: EnumStore.PROJECTS,
	initialState,
	reducers: {},
	extraReducers: {
		[projectsActions.getList.type]: (state) => {
			state.isLoading = true;
		},
		[projectsActions.entryList.type]: (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		},
	},
});

export type ProjectItem = {
	id: number;
	name: string;
	address: string;
};

export type ProjectInfo = {
	id: number;
	name: string;
	address: string;
};

export interface ProjectsType {
	data: ProjectItem[];
	isLoading: boolean;
	isErorr: boolean;
	current: ProjectInfo | undefined;
}

export type TAttributeProps = {
	name: string;
	input_type: string;
	mutable: boolean;
	values: string[];
	default_value: string;
};

export type TLabelProps = {
	name: string;
	type: string[];
	color?: string;
	attributes?: TAttributeProps[];
};

export const projectsReducer = projectsSlice.reducer;
