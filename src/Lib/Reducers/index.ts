import {combineReducers} from 'redux';
import {enableBatching} from 'redux-batched-actions';
import EnumStore from '../../BusinessLogic/EnumStore';
import {menuReducer} from '../Redux/Menu/slice';
import {popupReducer} from '../Redux/Popup/slice';
import {projectsReducer} from '../Redux/Projects/slice';
import {userReducer} from '../Redux/User/slice';

const reducers = {
	[EnumStore.USER]: userReducer,
	[EnumStore.MENU]: menuReducer,
	[EnumStore.PROJECTS]: projectsReducer,
	[EnumStore.POPUP]: popupReducer,
};

const rootReducer = enableBatching(combineReducers(reducers));

export default rootReducer;
