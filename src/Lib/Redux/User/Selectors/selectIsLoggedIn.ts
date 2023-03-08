import {selectUserState} from './selectUserState';
import {User} from '../slice';
import {createSelector} from '../../../../Utils/Redux';

export const selectIsLoggedIn = createSelector(
	[selectUserState],
	(userState: {user: User}) => userState.user.token !== '',
);
