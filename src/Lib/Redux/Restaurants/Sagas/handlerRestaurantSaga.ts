import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {EnumNestedAddresses} from '../../../../Containers/Panel/type';
import {restaurantService} from '../../../../Services/restaurant.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {restaurantsActions} from '../Actions/RestaurantsActions';
import {Restaurant} from '../slice';

function* handlerRestaurantSaga(action: PayloadAction<number>) {
	try {
		const data_str = JSON.stringify({id: action.payload});
		yield* put(
			menuActions.handler({
				address: `${EnumItemsMenu.RESTAURANT}>${EnumNestedAddresses.ELEMENT}>${data_str}`,
			}),
		);

		const response_current: Response = yield restaurantService.getById(action.payload);
		const data_current: Restaurant[] = yield response_current.json();
		yield* put(restaurantsActions.entryCurrent(data_current));
		yield* put(restaurantsActions.getMenuListToCurrent());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default handlerRestaurantSaga;
