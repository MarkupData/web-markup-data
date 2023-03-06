import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {dishService} from '../../../../Services/dish.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {dishesActions} from '../Actions/DishesActions';
import {Dish} from '../slice';

function* createDishSaga(action: PayloadAction<Dish>) {
	try {
		const response: Response = yield dishService.create(action.payload);
		if (response.status === 200 || response.status === 201) {
			const data: Dish = yield response.json();
			yield* put(popupActions.close());
			yield* put(dishesActions.handler(data.id));
		}
		yield* put(dishesActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default createDishSaga;
