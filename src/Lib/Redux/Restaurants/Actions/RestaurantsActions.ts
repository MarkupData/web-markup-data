import EnumStore from '../../../../BusinessLogic/EnumStore';
import {ClientOnlyActions} from '../../../Hooks/ActionCreator';

enum EnumActions {
	HANDLER_ITEM = 'HANDLER_ITEM',
	GET_LIST = 'GET_LIST',
	START_LOADING = 'START_LOADING',
	STOP_LOADING = 'STOP_LOADING',
	ENTRY_LIST = 'ENTRY_LIST',
	ENTRY_CURRENT = 'ENTRY_CURRENT',
	GET_MENU_LIST_TO_CURRENT = 'GET_MENU_LIST_TO_CURRENT',
	GET_EMPLOYEE_LIST_TO_CURRENT = 'GET_EMPLOYEE_LIST_TO_CURRENT',
	GET_TABLE_LIST_TO_CURRENT = 'GET_TABLE_LIST_TO_CURRENT',
	ENTRY_MENU_LIST_TO_CURRENT = 'ENTRY_MENU_LIST_TO_CURRENT',
	ENTRY_EMPLOYEE_LIST_TO_CURRENT = 'ENTRY_EMPLOYEE_LIST_TO_CURRENT',
	ENTRY_TABLE_LIST_TO_CURRENT = 'ENTRY_TABLE_LIST_TO_CURRENT',
	CREATE = 'CREATE',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
	MENU_UPDATE_ITEM = 'MENU_UPDATE_ITEM',
}

class RestaurantsActions extends ClientOnlyActions<EnumStore.RESTAURANTS> {
	readonly scope = EnumStore.RESTAURANTS;

	create = this.createAction(EnumActions.CREATE);

	update = this.createAction(EnumActions.UPDATE);

	delete = this.createAction(EnumActions.DELETE);

	handler = this.createAction(EnumActions.HANDLER_ITEM);

	getList = this.createAction(EnumActions.GET_LIST);

	startLoading = this.createAction(EnumActions.START_LOADING);

	stopLoading = this.createAction(EnumActions.STOP_LOADING);

	entryList = this.createAction(EnumActions.ENTRY_LIST);

	entryCurrent = this.createAction(EnumActions.ENTRY_CURRENT);

	getMenuListToCurrent = this.createAction(EnumActions.GET_MENU_LIST_TO_CURRENT);

	getEmployeeListToCurrent = this.createAction(EnumActions.GET_EMPLOYEE_LIST_TO_CURRENT);

	getTableListToCurrent = this.createAction(EnumActions.GET_TABLE_LIST_TO_CURRENT);

	entryMenuListToCurrent = this.createAction(EnumActions.ENTRY_MENU_LIST_TO_CURRENT);

	entryEmployeeListToCurrent = this.createAction(EnumActions.ENTRY_EMPLOYEE_LIST_TO_CURRENT);

	entryTableListToCurrent = this.createAction(EnumActions.ENTRY_TABLE_LIST_TO_CURRENT);

	menuUpdateItem = this.createAction(EnumActions.MENU_UPDATE_ITEM);
}

export const restaurantsActions = new RestaurantsActions();
