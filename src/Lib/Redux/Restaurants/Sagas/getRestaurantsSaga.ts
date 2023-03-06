import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {restaurantService} from '../../../../Services/restaurant.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {restaurantsActions} from '../Actions/RestaurantsActions';
import {Restaurant} from '../slice';

function* getRestaurantsSaga() {
	try {
		const response: Response = yield restaurantService.getList();
		const data: Restaurant[] = yield response.json();
		yield* put(restaurantsActions.entryList(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'getRestaurantsSaga'});
	}
}

export default getRestaurantsSaga;
