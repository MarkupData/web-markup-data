import {PayloadAction} from '@reduxjs/toolkit';
import {labelService} from '../../../../Services/label.service';
import ServiceFactory from '../../../../Services/ServiceFactory';

type TDeleteLabelSaga = {
	project_id: number;
	id: number;
};

function* deleteLabelSaga(action: PayloadAction<TDeleteLabelSaga>) {
	try {
		yield labelService.delete(action.payload.project_id, action.payload.id);
	} catch (error) {
		ServiceFactory.error(error, {saga: 'deleteLabelSaga'});
	}
}

export default deleteLabelSaga;
