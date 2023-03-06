import {ApiUrl} from '../const';
import {Employee} from '../Lib/Redux/Employees/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const employeeService = {
	getList,
	getById,
	getListToRestaurant,
	create,
	update,
	delete: _delete,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/waiters-and-cooks/`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/waiters-and-cooks/${id}/`);
}

async function getListToRestaurant(restaurantId: number) {
	return fetchWrapper.get(
		`${ApiUrl}/restaurants-admin/waiters-and-cooks/?restaurant_id=${restaurantId}`,
	);
}

async function create(employee: Employee) {
	return fetchWrapper.post(`${ApiUrl}/restaurants-admin/waiters-and-cooks/`, employee);
}

async function update(employee: Employee) {
	return fetchWrapper.put(
		`${ApiUrl}/restaurants-admin/waiters-and-cooks/${employee.id}/`,
		employee,
	);
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/restaurants-admin/waiters-and-cooks/${id}/`);
}
