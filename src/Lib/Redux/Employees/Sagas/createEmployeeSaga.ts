import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {employeeService} from '../../../../Services/employee.service';
import {restaurantService} from '../../../../Services/restaurant.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {employeesActions} from '../Actions/EmployeesActions';
import {Employee} from '../slice';

function* createEmployeeSaga(action: PayloadAction<Employee>) {
	try {
		const response: Response = yield employeeService.create(action.payload);
		if (response.status === 200 || response.status === 201) {
			const data: Employee = yield response.json();
			yield* put(popupActions.close());
			yield* put(employeesActions.handler(data.id));
		}
		yield* put(employeesActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default createEmployeeSaga;
