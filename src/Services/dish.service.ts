import {ApiUrl} from '../const';
import {Dish} from '../Lib/Redux/Dishes/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const dishService = {
	getList,
	getListToMenu,
	getById,
	create,
	update,
	delete: _delete,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/dishes/`);
}

async function getListToMenu(menuId: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/dishes/?menu_id=${menuId}`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/dishes/${id}/`);
}

async function create(dish: Dish) {
	return fetchWrapper.post(`${ApiUrl}/restaurants-admin/dishes/`, dish);
}

async function update(dish: Dish) {
	return fetchWrapper.put(`${ApiUrl}/restaurants-admin/dishes/${dish.id}/`, dish);
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/restaurants-admin/dishes/${id}/`);
}
