import EnumStore from '../../../../BusinessLogic/EnumStore';
import IRootState from '../../IRootState';

export const selectUserState = (state: IRootState) => {
	return {user: state[EnumStore.USER]};
};
