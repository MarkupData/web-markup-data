import {User} from '../../Lib/Redux/User/slice';
import {authService} from '../../Services/auth.service';
import {TUserContainerConnectedDispatches} from './AuthContainer';

interface Props {
	user: User;
	login: TUserContainerConnectedDispatches['loginUser'];
}

interface IToken {
	access: string;
	refresh: string;
	detail?: string;
}

const useAuthSection = ({user, login}: Props) => {
	const loginUserClient = async (username: string, password: string) => {
		try {
			const response: Response = await authService.getToken(username, password);
			if (response.status === 200) {
				await updateUser(response);
				return '';
			} else {
				return 'Не верный логин или пароль';
			}
		} catch {
			throw new Error();
		}
	};

	const updateUser = async (response: Response) => {
		const {access: token, refresh: refreshToken}: IToken = await response.json();
		login({...user, ...{token, refreshToken}});
	};

	return {
		loginUserClient,
	};
};

export default useAuthSection;
