import {put} from 'typed-redux-saga';
import ServiceFactory from '../../../../Services/ServiceFactory';

function* updateUserSaga() {
	try {
		yield put({type: 'LOGIN_USER_REQUEST'});
	} catch (error) {
		ServiceFactory.error(error, {saga: 'updateUserSaga'});
	}
}

export default updateUserSaga;
