import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {dishService} from '../../../../Services/dish.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {dishesActions} from '../Actions/DishesActions';
import {Dish} from '../slice';

function* getDishesSaga() {
	try {
		const response: Response = yield dishService.getList();
		const data: Dish[] = yield response.json();
		yield* put(dishesActions.entryList(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default getDishesSaga;
