import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import EnumStore from '../../../BusinessLogic/EnumStore';
import {projectsActions} from './Actions/ProjectsActions';

const initialState = {
	data: [{id: 4, name: 'test', task_class: 'test', labels: []}],
	isLoading: false,
	isErorr: false,
	current: {
		isLoading: false,
		isErorr: false,
		data: undefined,
	},
	task_classes: undefined,
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
		[projectsActions.getById.type]: (state) => {
			state.current.isLoading = true;
		},
		[projectsActions.entryCurrent.type]: (state, action) => {
			state.current.data = action.payload;
			state.current.isLoading = false;
		},
		[projectsActions.clearCurrent.type]: (state) => {
			state.current.data = undefined;
			state.current.isLoading = false;
			state.current.isErorr = false;
		},
		[projectsActions.entryTaskClasses.type]: (state, action) => {
			state.task_classes = action.payload;
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
	task_class?: string | number;
	labels?: TLabelProps[];
};

type TProjectCurrentProps = {
	isLoading: boolean;
	isErorr: boolean;
	data: Project | undefined;
};

export type TTaskClassesProps = {
	id: number;
	name: string;
	tool_selections: string[];
};

export interface ProjectsType {
	data: Project[];
	isLoading: boolean;
	isErorr: boolean;
	current: TProjectCurrentProps;
	task_classes: TTaskClassesProps[] | undefined;
}

export enum TYPE_INPUT {
	SELECT = 'select',
	CHECKBOX = 'checkbox',
	RADIO = 'radio',
	TEXT = 'text',
	NUMBER = 'number',
}

export const projectsReducer = projectsSlice.reducer;
