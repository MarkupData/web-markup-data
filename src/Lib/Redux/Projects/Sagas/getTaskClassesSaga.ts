import {put} from 'typed-redux-saga';
import {projectService} from '../../../../Services/project.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {projectsActions} from '../Actions/ProjectsActions';
import {TTaskClassesProps} from '../slice';

function* getTaskClassesSaga() {
	try {
		const response: Response = yield projectService.getListTaskClasses();
		const data: TTaskClassesProps[] = yield response.json();
		yield* put(projectsActions.entryTaskClasses(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'getTaskClassesSaga'});
	}
}

export default getTaskClassesSaga;
