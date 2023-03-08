import EnumStore from '../../../../BusinessLogic/EnumStore';
import IRootState from '../../IRootState';

export const selectMenuState = (state: IRootState) => {
	return state[EnumStore.MENU];
};
