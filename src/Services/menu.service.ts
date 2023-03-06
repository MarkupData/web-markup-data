import {ApiUrl} from '../const';
import {ElementMenu} from '../Lib/Redux/MenuElements/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const menuService = {
	getList,
	getById,
	getListToRestaurant,
	create,
	update,
	delete: _delete,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/menus/`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/menus/${id}/`);
}

async function getListToRestaurant(restaurantId: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/menus/?restaurant_id=${restaurantId}`);
}

async function create(menu: ElementMenu) {
	return fetchWrapper.post(`${ApiUrl}/restaurants-admin/menus/`, menu);
}

async function update(menu: ElementMenu) {
	return fetchWrapper.put(`${ApiUrl}/restaurants-admin/menus/${menu.id}/`, menu);
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/restaurants-admin/menus/${id}/`);
}
