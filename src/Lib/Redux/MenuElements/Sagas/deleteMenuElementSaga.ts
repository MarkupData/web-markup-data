import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {EnumNestedAddresses} from '../../../../Containers/Panel/type';
import {menuService} from '../../../../Services/menu.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {menuElementsActions} from '../Actions/MenuElemetsActions';

function* deleteMenuElementSaga(action: PayloadAction<number>) {
	try {
		const response: Response = yield menuService.delete(action.payload);
		if (response.status === 200 || response.status === 201) {
			yield* put(
				menuActions.handler({address: `${EnumItemsMenu.MENU}>${EnumNestedAddresses.LIST}`}),
			);
		}
		yield* put(menuElementsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default deleteMenuElementSaga;
