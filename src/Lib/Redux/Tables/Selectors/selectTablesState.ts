import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectTablesState = (state: any) => {
	return state[EnumStore.TABLES];
};
