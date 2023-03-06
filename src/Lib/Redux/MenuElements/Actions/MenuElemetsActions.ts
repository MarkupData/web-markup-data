import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	HANDLER_ITEM = 'HANDLER_ITEM',
	GET_LIST = 'GET_LIST',
	ENTRY_LIST = 'ENTRY_LIST',
	ENTRY_CURRENT = 'ENTRY_CURRENT',
	ENTRY_DISH_LIST_TO_CURRENT = 'ENTRY_DISH_LIST_TO_CURRENT',
	CREATE = 'CREATE',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
}

class MenuElemetsActions extends ClientOnlyActions<EnumStore.MENU_ELEMETS> {
	readonly scope = EnumStore.MENU_ELEMETS;

	create = this.createAction(EnumActions.CREATE);

	update = this.createAction(EnumActions.UPDATE);

	delete = this.createAction(EnumActions.DELETE);

	handler = this.createAction(EnumActions.HANDLER_ITEM);

	entryCurrent = this.createAction(EnumActions.ENTRY_CURRENT);

	entryDishListToCurrent = this.createAction(EnumActions.ENTRY_DISH_LIST_TO_CURRENT);

	getList = this.createAction(EnumActions.GET_LIST);

	entryList = this.createAction(EnumActions.ENTRY_LIST);
}

export const menuElementsActions = new MenuElemetsActions();
