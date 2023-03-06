import {put, select} from 'typed-redux-saga';
import {employeeService} from '../../../../Services/employee.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {tableService} from '../../../../Services/table.service';
import {restaurantsActions} from '../Actions/RestaurantsActions';
import {selectRestaurantsCurrent} from '../Selectors/selectRestaurantsCurrent';
import {Restaurant} from '../slice';

function* getTableListToCurrentSaga() {
	try {
		const restaurant_current = yield* select(selectRestaurantsCurrent);
		const response: Response = yield tableService.getListToRestaurant(restaurant_current.data.id);
		const data: Restaurant[] = yield response.json();
		yield* put(restaurantsActions.entryTableListToCurrent(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default getTableListToCurrentSaga;
