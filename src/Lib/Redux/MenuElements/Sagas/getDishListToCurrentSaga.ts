import {put, select} from 'typed-redux-saga';
import {dishService} from '../../../../Services/dish.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {Dish} from '../../Dishes/slice';
import {menuElementsActions} from '../Actions/MenuElemetsActions';
import {selectMenuElementCurrent} from '../Selectors/selectMenuElementCurrent';

function* getDishListToCurrentSaga() {
	try {
		const menu_current = yield* select(selectMenuElementCurrent);
		const response: Response = yield dishService.getListToMenu(menu_current.data.id);
		const data: Dish[] = yield response.json();
		yield* put(menuElementsActions.entryDishListToCurrent(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default getDishListToCurrentSaga;
