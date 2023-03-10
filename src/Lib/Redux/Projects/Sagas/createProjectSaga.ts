import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {projectService} from '../../../../Services/project.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {popupActions} from '../../Popup/Actions/PopupActions';
import {projectsActions} from '../Actions/ProjectsActions';
import {Project, TCreateProject} from '../slice';

function* createProjectSaga(action: PayloadAction<TCreateProject>) {
	try {
		const response: Response = yield projectService.create(action.payload);
		if (response.status === 200 || response.status === 201) {
			const data: Project = yield response.json();
			yield* put(popupActions.close());
			yield* put(projectsActions.handler(data.id));
		}
		yield* put(projectsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'createProjectSaga'});
	}
}

export default createProjectSaga;
