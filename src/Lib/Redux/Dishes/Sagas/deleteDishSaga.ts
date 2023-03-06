import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {EnumNestedAddresses} from '../../../../Containers/Panel/type';
import {dishService} from '../../../../Services/dish.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {dishesActions} from '../Actions/DishesActions';

function* deleteDishSaga(action: PayloadAction<number>) {
	try {
		const response: Response = yield dishService.delete(action.payload);
		if (response.status === 200 || response.status === 201) {
			yield* put(
				menuActions.handler({address: `${EnumItemsMenu.DISHES}>${EnumNestedAddresses.LIST}`}),
			);
		}
		yield* put(dishesActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default deleteDishSaga;
