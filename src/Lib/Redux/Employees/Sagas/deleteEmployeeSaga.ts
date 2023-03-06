import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {EnumNestedAddresses} from '../../../../Containers/Panel/type';
import {employeeService} from '../../../../Services/employee.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {employeesActions} from '../Actions/EmployeesActions';

function* deleteEmployeeSaga(action: PayloadAction<number>) {
	try {
		const response: Response = yield employeeService.delete(action.payload);
		if (response.status === 200 || response.status === 201) {
			yield* put(
				menuActions.handler({address: `${EnumItemsMenu.EMPLOYEES}>${EnumNestedAddresses.LIST}`}),
			);
		}
		yield* put(employeesActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default deleteEmployeeSaga;
