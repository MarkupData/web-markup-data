import {takeEvery} from 'typed-redux-saga';

import {menuElementsActions} from './Actions/MenuElemetsActions';
import createMenuElementSaga from './Sagas/createMenuElementSaga';
import deleteMenuElementSaga from './Sagas/deleteMenuElementSaga';
import getMenusSaga from './Sagas/getMenusSaga';
import handlerMenuElementSaga from './Sagas/handlerMenuElementSaga';
import updateMenuElementSaga from './Sagas/updateMenuElementSaga';

export default function* menuElementSagaWatcher() {
	yield* takeEvery([menuElementsActions.getList.type], getMenusSaga);
	yield* takeEvery(menuElementsActions.handler, handlerMenuElementSaga);
	yield* takeEvery(menuElementsActions.create, createMenuElementSaga);
	yield* takeEvery(menuElementsActions.update, updateMenuElementSaga);
	yield* takeEvery(menuElementsActions.delete, deleteMenuElementSaga);
}
