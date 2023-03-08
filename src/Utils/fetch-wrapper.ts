import EnumStore from '../BusinessLogic/EnumStore';
import {store} from '../Lib/Redux/store';
import jwt_decode, {JwtHeader, JwtPayload} from 'jwt-decode';
import {ApiUrl} from '../const';
import {userClientOnlyActions} from '../Lib/Redux/User/Actions/userClientOnlyActions';

export const fetchWrapper = {
	get,
	post,
	put,
	delete: _delete,
};

async function get(url: string) {
	const auth = await authHeader();
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: auth ? auth : {},
	};
	return await fetch(url, requestOptions);
}

async function post(url: string, body: object, isLogin?: boolean) {
	const auth = isLogin ? {} : await authHeader();
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {'Content-Type': 'application/json', ...auth},
		body: JSON.stringify(body),
	};
	return await fetch(url, requestOptions);
}

async function put(url: string, body: object) {
	const auth = await authHeader();
	const requestOptions: RequestInit = {
		method: 'PUT',
		headers: {'Content-Type': 'application/json', ...auth},
		body: JSON.stringify(body),
	};
	return await fetch(url, requestOptions);
}

async function _delete(url: string) {
	const auth = await authHeader();
	const requestOptions: RequestInit = {
		method: 'DELETE',
		headers: auth ? auth : {},
	};

	return await fetch(url, requestOptions);
}

async function getAccessUsingRefresh(refresh: string) {
	const url = `${ApiUrl}/auth/token/refresh/`;
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({refresh}),
	};
	return fetch(url, requestOptions);
}

async function authHeader() {
	const token: string | null = await getVerifiedKeys();
	if (token) {
		return {Authorization: `Bearer ${token}`};
	} else {
		return {Authorization: ``};
	}
}

function isTokenExpired(token: string) {
	const decoded: JwtHeader & JwtPayload = jwt_decode(token);

	if (decoded.exp && decoded.exp < Date.now() / 1000) {
		return true;
	} else {
		return false;
	}
}

async function getVerifiedKeys(): Promise<string | null> {
	const state = store.getState();
	const user = state[EnumStore.USER];

	if (user && user.token) {
		if (!isTokenExpired(user.token)) {
			return user.token;
		} else {
			if (!isTokenExpired(user.refreshToken)) {
				// get update token
				const response = await getAccessUsingRefresh(user.refreshToken);
				const {access: token}: IToken = await response.json();
				// udate state token
				store.dispatch(userClientOnlyActions.update({...user, ...{token}}));

				return token;
			} else {
				store.dispatch(userClientOnlyActions.logout());
				return null;
			}
		}
	} else {
		return null;
	}
}

interface IToken {
	access: string;
	refresh: string;
	detail?: string;
}
