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

export type Project = {
	id?: number;
	name: string;
	task_class: string;
	labels?: TLabelProps[];
};

export interface ProjectsType {
	data: Project[];
	isLoading: boolean;
	isErorr: boolean;
	current: Project | undefined;
}

export const projectsReducer = projectsSlice.reducer;
