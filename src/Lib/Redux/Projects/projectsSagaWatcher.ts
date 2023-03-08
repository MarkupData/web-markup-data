import {takeEvery} from 'typed-redux-saga';

import {projectsActions} from './Actions/ProjectsActions';
import getProjectsSaga from './Sagas/getProjectsSaga';
import handlerProjectSaga from './Sagas/handlerProjectSaga';
import createProjectSaga from './Sagas/createProjectSaga';
import updateProjectSaga from './Sagas/updateProjectSaga';
import deleteProjectSaga from './Sagas/deleteProjectSaga';
import getProjectByIdSaga from './Sagas/getProjectByIdSaga';
import getTaskClassesSaga from './Sagas/getTaskClassesSaga';

export default function* projectsSagaWatcher() {
	yield* takeEvery([projectsActions.getList.type], getProjectsSaga);
	yield* takeEvery(projectsActions.handler, handlerProjectSaga);
	yield* takeEvery(projectsActions.create.type, createProjectSaga);
	yield* takeEvery(projectsActions.update.type, updateProjectSaga);
	yield* takeEvery(projectsActions.delete.type, deleteProjectSaga);
	yield* takeEvery(projectsActions.getById.type, getProjectByIdSaga);
	yield* takeEvery(projectsActions.getTaskClasses.type, getTaskClassesSaga);
}
