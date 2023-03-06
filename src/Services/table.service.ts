import {ApiUrl} from '../const';
import {Table} from '../Lib/Redux/Tables/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const tableService = {
	getList,
	getById,
	getListToRestaurant,
	create,
	update,
	delete: _delete,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/tables/`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/tables/${id}/`);
}

async function getListToRestaurant(restaurantId: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/tables/?restaurant_id=${restaurantId}`);
}

async function create(table: Table) {
	return fetchWrapper.post(`${ApiUrl}/restaurants-admin/tables/`, table);
}

async function update(table: Table) {
	return fetchWrapper.put(`${ApiUrl}/restaurants-admin/tables/${table.id}/`, table);
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/restaurants-admin/tables/${id}/`);
}
