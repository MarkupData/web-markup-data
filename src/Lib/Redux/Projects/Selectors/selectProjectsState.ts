import EnumStore from '../../../../BusinessLogic/EnumStore';
import IRootState from '../../IRootState';

export const selectProjectsState = (state: IRootState) => {
	return state[EnumStore.PROJECTS];
};
