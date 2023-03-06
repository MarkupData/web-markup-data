import EnumStore from '../../../../BusinessLogic/EnumStore';

export const selectRestaurantsState = (state: any) => {
	return state[EnumStore.RESTAURANTS];
};
