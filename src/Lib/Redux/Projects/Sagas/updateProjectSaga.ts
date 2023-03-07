import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {restaurantService} from '../../../../Services/restaurant.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {projectsActions} from '../Actions/ProjectsActions';
import {ProjectInfo} from '../slice';

function* updateProjectSaga(action: PayloadAction<ProjectInfo>) {
	try {
		const response: Response = yield restaurantService.update(action.payload);
		if (response.status === 200 || response.status === 201) {
			const data: ProjectInfo = yield response.json();
			yield* put(popupActions.close());
			yield* put(projectsActions.handler(data.id));
		}
		yield* put(projectsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'updateProjectSaga'});
	}
}

export default updateProjectSaga;
