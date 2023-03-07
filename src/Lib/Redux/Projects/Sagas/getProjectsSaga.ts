import {put} from 'typed-redux-saga';
import {restaurantService} from '../../../../Services/restaurant.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {projectsActions} from '../Actions/ProjectsActions';
import {ProjectItem} from '../slice';

function* getProjectsSaga() {
	try {
		const response: Response = yield restaurantService.getList();
		const data: ProjectItem[] = yield response.json();
		yield* put(projectsActions.entryList(data));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'getProjectsSaga'});
	}
}

export default getProjectsSaga;
