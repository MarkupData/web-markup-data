import {combineReducers} from 'redux';
import {enableBatching} from 'redux-batched-actions';
import EnumStore from '../../BusinessLogic/EnumStore';
import {dishesReducer} from '../Redux/Dishes/slice';
import {employeesReducer} from '../Redux/Employees/slice';
import {menuReducer} from '../Redux/Menu/slice';
import {menuElementsReducer} from '../Redux/MenuElements/slice';
import {popupReducer} from '../Redux/Popup/slice';
import {restaurantsReducer} from '../Redux/Restaurants/slice';
import {tablesReducer} from '../Redux/Tables/slice';
import {userReducer} from '../Redux/User/slice';

const reducers = {
	[EnumStore.USER]: userReducer,
	[EnumStore.MENU]: menuReducer,
	[EnumStore.EMPLOYEES]: employeesReducer,
	[EnumStore.MENU_ELEMETS]: menuElementsReducer,
	[EnumStore.TABLES]: tablesReducer,
	[EnumStore.DISHES]: dishesReducer,
	[EnumStore.RESTAURANTS]: restaurantsReducer,
	[EnumStore.POPUP]: popupReducer,
};

const rootReducer = enableBatching(combineReducers(reducers));

export default rootReducer;
