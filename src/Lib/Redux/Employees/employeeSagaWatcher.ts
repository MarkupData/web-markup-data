import {takeEvery} from 'typed-redux-saga';

import {employeesActions} from './Actions/EmployeesActions';
import getEmployeesSaga from './Sagas/getEmployeesSaga';
import createEmployeeSaga from './Sagas/createEmployeeSaga';
import updateEmployeeSaga from './Sagas/updateEmployeeSaga';
import deleteEmployeeSaga from './Sagas/deleteEmployeeSaga';

export default function* employeeSagaWatcher() {
	yield* takeEvery([employeesActions.getList.type], getEmployeesSaga);
	yield* takeEvery(employeesActions.create.type, createEmployeeSaga);
	yield* takeEvery(employeesActions.update.type, updateEmployeeSaga);
	yield* takeEvery(employeesActions.delete.type, deleteEmployeeSaga);
}
