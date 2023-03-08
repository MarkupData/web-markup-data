import {PayloadAction} from '@reduxjs/toolkit';
import {labelService} from '../../../../Services/label.service';
import ServiceFactory from '../../../../Services/ServiceFactory';
import {TLabelProps} from '../slice';

type TCreateLabelSaga = {
	project_id: number;
	data: TLabelProps;
};

function* createLabelSaga(action: PayloadAction<TCreateLabelSaga>) {
	try {
		yield labelService.create(action.payload.project_id, action.payload.data);
	} catch (error) {
		ServiceFactory.error(error, {saga: 'createLabelSaga'});
	}
}

export default createLabelSaga;
