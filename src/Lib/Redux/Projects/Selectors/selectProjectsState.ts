import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectProjectsState = (state: any) => {
	return state[EnumStore.PROJECTS];
};
