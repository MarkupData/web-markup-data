import {put, select} from 'typed-redux-saga';
import {employeeService} from '../../../../Services/employee.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {restaurantsActions} from '../Actions/RestaurantsActions';
import {selectRestaurantsCurrent} from '../Selectors/selectRestaurantsCurrent';
import {Restaurant} from '../slice';

function* getEmployeeListToCurrentSaga() {
	try {
		const restaurant_current = yield* select(selectRestaurantsCurrent);
		const response: Response = yield employeeService.getListToRestaurant(
			restaurant_current.data.id,
		);
		const data: Restaurant[] = yield response.json();
		yield* put(restaurantsActions.entryEmployeeListToCurrent(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default getEmployeeListToCurrentSaga;
