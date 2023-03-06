import {takeEvery} from 'typed-redux-saga';

import {dishesActions} from './Actions/DishesActions';
import createDishSaga from './Sagas/createDishSaga';
import deleteDishSaga from './Sagas/deleteDishSaga';
import getDishesSaga from './Sagas/getDishesSaga';
import updateDishSaga from './Sagas/updateDishSaga';

export default function* dishSagaWatcher() {
	yield* takeEvery([dishesActions.getList.type], getDishesSaga);
	yield* takeEvery(dishesActions.create.type, createDishSaga);
	yield* takeEvery(dishesActions.update.type, updateDishSaga);
	yield* takeEvery(dishesActions.delete.type, deleteDishSaga);
}
