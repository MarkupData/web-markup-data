import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {EnumNestedAddresses} from '../../../../Containers/Panel/type';
import {dishService} from '../../../../Services/dish.service';
import {menuService} from '../../../../Services/menu.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {menuElementsActions} from '../Actions/MenuElemetsActions';
import {ElementMenuRoot} from '../slice';

function* handlerMenuElementSaga(action: PayloadAction<number>) {
	try {
		const data_str = JSON.stringify({id: action.payload});
		yield* put(
			menuActions.handler({
				address: `${EnumItemsMenu.MENU}>${EnumNestedAddresses.ELEMENT}>${data_str}`,
			}),
		);

		const response_current: Response = yield menuService.getById(action.payload);
		const data_current: ElementMenuRoot[] = yield response_current.json();
		yield* put(menuElementsActions.entryCurrent(data_current));
		const response: Response = yield dishService.getListToMenu(action.payload);
		const data: ElementMenuRoot[] = yield response.json();
		yield* put(menuElementsActions.entryDishListToCurrent(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default handlerMenuElementSaga;
