import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {projectService} from '../../../../Services/project.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {projectsActions} from '../Actions/ProjectsActions';
import {Project} from '../slice';

function* getProjectByIdSaga(action: PayloadAction<number>) {
	try {
		const response: Response = yield projectService.getById(action.payload);
		const data: Project = yield response.json();
		yield* put(projectsActions.entryCurrent(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'getProjectByIdSaga'});
	}
}

export default getProjectByIdSaga;
