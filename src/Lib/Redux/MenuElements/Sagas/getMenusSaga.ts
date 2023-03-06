import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {menuService} from '../../../../Services/menu.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuElementsActions} from '../Actions/MenuElemetsActions';
import {ElementMenuRoot} from '../slice';

function* getMenusSaga() {
	try {
		const response: Response = yield menuService.getList();
		const data: ElementMenuRoot[] = yield response.json();
		yield* put(menuElementsActions.entryList(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default getMenusSaga;
