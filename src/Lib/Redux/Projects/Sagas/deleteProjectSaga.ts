import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {EnumNestedAddresses} from '../../../../Containers/Panel/type';
import {restaurantService} from '../../../../Services/restaurant.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {menuActions} from '../../Menu/Actions/menuActions';
import {EnumItemsMenu} from '../../Menu/slice';
import {projectsActions} from '../Actions/ProjectsActions';

function* deleteProjectSaga(action: PayloadAction<number>) {
	try {
		const response: Response = yield restaurantService.delete(action.payload);
		if (response.status === 200 || response.status === 201) {
			yield* put(
				menuActions.handler({address: `${EnumItemsMenu.PROJECTS}>${EnumNestedAddresses.LIST}`}),
			);
		}
		yield* put(projectsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'deleteProjectSaga'});
	}
}

export default deleteProjectSaga;
