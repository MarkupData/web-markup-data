import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectEmployeesState = (state: any) => {
	return state[EnumStore.EMPLOYEES];
};
