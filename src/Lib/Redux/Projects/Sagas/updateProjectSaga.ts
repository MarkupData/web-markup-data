import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {projectService} from '../../../../Services/project.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {projectsActions} from '../Actions/ProjectsActions';
import {TCreateProject} from '../slice';

function* updateProjectSaga(action: PayloadAction<TCreateProject>) {
	try {
		const response: Response = yield projectService.update(action.payload);
		if (response.status === 200 || response.status === 201) {
			yield* put(popupActions.close());
		}
		yield* put(projectsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'updateProjectSaga'});
	}
}

export default updateProjectSaga;
