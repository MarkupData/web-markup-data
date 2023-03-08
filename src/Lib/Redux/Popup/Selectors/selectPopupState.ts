import EnumStore from '../../../../BusinessLogic/EnumStore';
import IRootState from '../../IRootState';

export const selectPopupState = (state: IRootState) => {
	return state[EnumStore.POPUP];
};
