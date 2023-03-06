import {ApiUrl} from '../const';
import {Restaurant} from '../Lib/Redux/Restaurants/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const restaurantService = {
	getList,
	getById,
	create,
	update,
	delete: _delete,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/restaurants/`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/restaurants/${id}/`);
}

async function create(restaurant: Restaurant) {
	return fetchWrapper.post(`${ApiUrl}/restaurants-admin/restaurants/`, restaurant);
}

async function update(restaurant: Restaurant) {
	return fetchWrapper.put(`${ApiUrl}/restaurants-admin/restaurants/${restaurant.id}/`, restaurant);
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/restaurants-admin/restaurants/${id}/`);
}