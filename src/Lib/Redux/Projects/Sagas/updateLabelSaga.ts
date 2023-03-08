import {PayloadAction} from '@reduxjs/toolkit';
import {put} from 'typed-redux-saga';
import {labelService} from '../../../../Services/label.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {projectsActions} from '../Actions/ProjectsActions';
import {TLabelProps} from '../slice';

type TUpdateLabelSaga = {
	project_id: number;
	data: TLabelProps;
};

function* updateLabelSaga(action: PayloadAction<TUpdateLabelSaga>) {
	try {
		yield labelService.update(action.payload.project_id, action.payload.data);
		yield* put(projectsActions.getList());
	} catch (error) {
		ServiceFactory.error(error, {saga: 'updateLabelSaga'});
	}
}

export default updateLabelSaga;
