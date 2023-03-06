import {put} from 'typed-redux-saga';
import {employeeService} from '../../../../Services/employee.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {employeesActions} from '../Actions/EmployeesActions';
import {Employee} from '../slice';

function* getEmployeesSaga() {
	try {
		const response: Response = yield employeeService.getList();
		const data: Employee[] = yield response.json();
		yield* put(employeesActions.entryList(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'loginUserSaga'});
	}
}

export default getEmployeesSaga;
