import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {EnumNestedAddresses} from '../../../../Containers/Panel/type';
import {restaurantService} from '../../../../Services/restaurant.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {projectsActions} from '../Actions/ProjectsActions';
import {ProjectInfo} from '../slice';

function* handlerProjectSaga(action: PayloadAction<number>) {
	try {
		const data_str = JSON.stringify({id: action.payload});
		yield* put(
			menuActions.handler({
				address: `${EnumItemsMenu.PROJECTS}>${EnumNestedAddresses.ELEMENT}>${data_str}`,
			}),
		);

		const response_current: Response = yield restaurantService.getById(action.payload);
		const data_current: ProjectInfo[] = yield response_current.json();
		yield* put(projectsActions.entryCurrent(data_current));
	} catch (error) {
		ServiceFactory.error(error, {saga: 'handlerProjectSaga'});
	}
}

export default handlerProjectSaga;
