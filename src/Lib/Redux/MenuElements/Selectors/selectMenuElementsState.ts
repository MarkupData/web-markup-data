import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectMenuElementsState = (state: any) => {
	return state[EnumStore.MENU_ELEMETS];
};
