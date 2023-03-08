import {put} from 'typed-redux-saga';
import {projectService} from '../../../../Services/project.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {projectsActions} from '../Actions/ProjectsActions';
import {Project} from '../slice';

function* getProjectsSaga() {
	try {
		const response: Response = yield projectService.getList();
		const data: Project[] = yield response.json();
		yield* put(projectsActions.entryList(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'getProjectsSaga'});
	}
}

export default getProjectsSaga;
