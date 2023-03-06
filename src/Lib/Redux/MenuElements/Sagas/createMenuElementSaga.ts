import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {menuService} from '../../../../Services/menu.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {menuElementsActions} from '../Actions/MenuElemetsActions';
import {ElementMenu} from '../slice';

function* createMenuElementSaga(action: PayloadAction<ElementMenu>) {
	try {
		const response: Response = yield menuService.create(action.payload);
		if (response.status === 200 || response.status === 201) {
			const data: ElementMenu = yield response.json();
			yield* put(popupActions.close());
			yield* put(menuElementsActions.handler(data.id));
		}
		yield* put(menuElementsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default createMenuElementSaga;
