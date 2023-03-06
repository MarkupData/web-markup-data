import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {restaurantService} from '../../../../Services/restaurant.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {restaurantsActions} from '../Actions/RestaurantsActions';
import {Restaurant} from '../slice';

function* createRestaurantSaga(action: PayloadAction<Restaurant>) {
	try {
		const response: Response = yield restaurantService.create(action.payload);
		if (response.status === 200 || response.status === 201) {
			const data: Restaurant = yield response.json();
			yield* put(popupActions.close());
			yield* put(restaurantsActions.handler(data.id));
		}
		yield* put(restaurantsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'createRestaurantSaga'});
	}
}

export default createRestaurantSaga;
