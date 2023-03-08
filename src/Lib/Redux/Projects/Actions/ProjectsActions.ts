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
	GET_BY_ID = 'GET_BY_ID',
	CLEAR_CURRENT = 'CLEAR_CURRENT',
	ENTRY_TASK_CLASSES = 'ENTRY_TASK_CLASSES',
	GET_TASK_CLASSES = 'GET_TASK_CLASSES',
	CREATE_LABEL = 'CREATE_LABEL',
	UPDATE_LABEL = 'UPDATE_LABEL',
	DELETE_LABEL = 'DELETE_LABEL',
}

class ProjectsActions extends ClientOnlyActions<EnumStore.PROJECTS> {
	readonly scope = EnumStore.PROJECTS;

	create = this.createAction(EnumActions.CREATE);

	update = this.createAction(EnumActions.UPDATE);

	delete = this.createAction(EnumActions.DELETE);

	handler = this.createAction(EnumActions.HANDLER_ITEM);

	getList = this.createAction(EnumActions.GET_LIST);

	startLoading = this.createAction(EnumActions.START_LOADING);

	stopLoading = this.createAction(EnumActions.STOP_LOADING);

	entryList = this.createAction(EnumActions.ENTRY_LIST);

	entryCurrent = this.createAction(EnumActions.ENTRY_CURRENT);

	getById = this.createAction(EnumActions.GET_BY_ID);

	clearCurrent = this.createAction(EnumActions.CLEAR_CURRENT);

	entryTaskClasses = this.createAction(EnumActions.ENTRY_TASK_CLASSES);

	getTaskClasses = this.createAction(EnumActions.GET_TASK_CLASSES);

	createLabel = this.createAction(EnumActions.CREATE_LABEL);

	updateLabel = this.createAction(EnumActions.UPDATE_LABEL);

	deleteLabel = this.createAction(EnumActions.DELETE_LABEL);
}
export const projectsActions = new ProjectsActions();
