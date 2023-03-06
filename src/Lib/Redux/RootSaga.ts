import {fork} from 'typed-redux-saga';
import dishSagaWatcher from './Dishes/dishSagaWatcher';
import employeeSagaWatcher from './Employees/employeeSagaWatcher';
import menuElementSagaWatcher from './MenuElements/menuElementSagaWatcher';
import restaurantSagaWatcher from './Restaurants/restaurantSagaWatcher';
import userSagaWatcher from './User/userSagaWatcher';

/**
 * @link https://words.thisishugo.com/how-to-pass-an-api-client-to-a-redux-saga-f35170356c53
 * @constructor
 */
export default function* RootSaga() {
	yield* fork(userSagaWatcher);
	yield* fork(restaurantSagaWatcher);
	yield* fork(dishSagaWatcher);
	yield* fork(menuElementSagaWatcher);
	yield* fork(employeeSagaWatcher);
}
