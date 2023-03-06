import {takeEvery} from 'typed-redux-saga';

import {restaurantsActions} from './Actions/RestaurantsActions';
import getEmployeeListToCurrentSaga from './Sagas/getEmployeeListToCurrentSaga';
import getMenuListToCurrentSaga from './Sagas/getMenuListToCurrentSaga';
import getRestaurantsSaga from './Sagas/getRestaurantsSaga';
import getTableListToCurrentSaga from './Sagas/getTableListToCurrentSaga';
import handlerRestaurantSaga from './Sagas/handlerRestaurantSaga';
import createRestaurantSaga from './Sagas/createRestaurantSaga';
import updateRestaurantSaga from './Sagas/updateRestaurantSaga';
import deleteRestaurantSaga from './Sagas/deleteRestaurantSaga';

export default function* restaurantSagaWatcher() {
	yield* takeEvery([restaurantsActions.getList.type], getRestaurantsSaga);
	yield* takeEvery(restaurantsActions.handler, handlerRestaurantSaga);
	yield* takeEvery(restaurantsActions.getMenuListToCurrent.type, getMenuListToCurrentSaga);
	yield* takeEvery(restaurantsActions.getEmployeeListToCurrent.type, getEmployeeListToCurrentSaga);
	yield* takeEvery(restaurantsActions.getTableListToCurrent.type, getTableListToCurrentSaga);
	yield* takeEvery(restaurantsActions.create.type, createRestaurantSaga);
	yield* takeEvery(restaurantsActions.update.type, updateRestaurantSaga);
	yield* takeEvery(restaurantsActions.delete.type, deleteRestaurantSaga);
}
