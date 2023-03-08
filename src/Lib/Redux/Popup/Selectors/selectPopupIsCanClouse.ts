import {createSelector} from '../../../../Utils/Redux';
import {selectPopupState} from './selectPopupState';

export const selectPopupIsCanClouse = createSelector(
	[selectPopupState],
	(popupState) => popupState.isCanClouse,
);
