import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectDishesState = (state: any) => {
	return state[EnumStore.DISHES];
};
