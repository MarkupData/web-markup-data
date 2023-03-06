import {put, select} from 'typed-redux-saga';
import {menuService} from '../../../../Services/menu.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {restaurantsActions} from '../Actions/RestaurantsActions';
import {selectRestaurantsCurrent} from '../Selectors/selectRestaurantsCurrent';
import {Restaurant} from '../slice';

function* getMenuListToCurrentSaga() {
	try {
		const restaurant_current = yield* select(selectRestaurantsCurrent);
		const response: Response = yield menuService.getListToRestaurant(restaurant_current.data.id);
		const data: Restaurant[] = yield response.json();
		yield* put(restaurantsActions.entryMenuListToCurrent(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'getMenuListToCurrentSaga'});
	}
}

export default getMenuListToCurrentSaga;
